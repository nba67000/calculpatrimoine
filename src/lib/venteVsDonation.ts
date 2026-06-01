// src/lib/venteVsDonation.ts
//
// Comparateur Vente vs Donation d'un bien immobilier à un proche.
//
// Côté vente : plus-value immobilière (Art. 150 U, VB, VC CGI) côté vendeur +
// droits d'enregistrement DMTO (~5,80665 %) côté acheteur.
//
// Côté donation : droits de mutation à titre gratuit (Art. 777 CGI) après
// abattement personnel (Art. 779/790 B/790 E CGI), avec rappel fiscal 15 ans
// (Art. 784 CGI).
//
// La comparaison est faite sur le coût fiscal cumulé donateur/vendeur +
// donataire/acheteur pour la même opération de transmission de propriété.
// Les frais de notaire (émoluments) sont applicables dans les deux cas et
// ne sont donc pas chiffrés ici.

import type {
  VenteVsDonationInputs,
  VenteVsDonationResults,
  LienBeneficiaire,
} from '@/types/venteVsDonation'
import type { CalculatorModule, HowToSchema } from '@/lib/calculators/types'
import type { FAQSchemaItem } from '@/components/SchemaFAQ'
import { calculerPlusValueImmobiliere } from '@/lib/plusValueImmobiliere'
import {
  appliquerBareme,
  getBaremePourLien,
  ABATTEMENTS_ART_779,
  type LienFiscal,
} from '@/lib/fiscal/baremesArt777'
import { formatEurRounded as eur, formatLigne as ligne } from '@/lib/formatters'

export const SOURCES_VENTE_VS_DONATION = [
  { label: 'Article 150 U du CGI', desc: "Plus-values immobilières des particuliers (champ d'application)" },
  { label: 'Article 150 VC du CGI', desc: 'Abattements pour durée de détention (IR)' },
  { label: 'Article L136-7 CSS (VI 2)', desc: 'Abattements pour durée de détention (PS)' },
  { label: 'Article 1609 nonies G du CGI', desc: 'Surtaxe sur PV > 50 000 €' },
  { label: 'Article 777 du CGI', desc: 'Barème des droits de mutation à titre gratuit (donation)' },
  { label: 'Article 779 du CGI', desc: 'Abattements personnels en donation/succession' },
  { label: 'Article 784 du CGI', desc: 'Rappel fiscal des donations antérieures (15 ans)' },
  { label: 'Articles 1594 D et 1594 F sexies du CGI', desc: 'Droits d\'enregistrement (DMTO) sur ventes immobilières : taux départemental, taxe communale, frais d\'assiette (~5,80665 % standard, jusqu\'à 6,32 % selon les départements ayant majoré le DMTO)' },
]

// Mapping lien interne → clé LienFiscal du module baremesArt777
const LIEN_TO_FISCAL: Record<LienBeneficiaire, LienFiscal> = {
  enfant: 'enfant',
  petit_enfant: 'petit_enfant',
  frere_soeur: 'frere_soeur',
  neveu_niece: 'neveu_niece',
  autre: 'non_parent',
}

/**
 * Compare le coût fiscal d'une vente et d'une donation d'un même bien
 * immobilier à un proche.
 *
 * Côté vente : on calcule la plus-value imposable (IR 19 % + PS 17,2 % +
 * surtaxe éventuelle) puis on ajoute les droits d'enregistrement DMTO payés
 * par l'acheteur (~5,80665 % par défaut).
 *
 * Côté donation : on applique le barème Art. 777 CGI selon le lien, après
 * déduction de l'abattement personnel et du rappel des donations antérieures
 * sur 15 ans (Art. 784).
 *
 * @example
 * // Bien acquis 200k en 2010, valorisé 400k, transmis à un neveu en 2026.
 * // Vente : PV 200k - abattements 16 ans détention.
 * //         DMTO 400k × 5,80665 % ≈ 23 226 €.
 * // Donation : abattement 7967 €, base 392 033 €, barème 55 % → 215 618 €.
 * calculerVenteVsDonation({
 *   valeurBien: 400000,
 *   dateAcquisition: '2010-01-01',
 *   prixAcquisition: 200000,
 *   fraisAcquisitionMode: 'forfait', fraisAcquisitionReels: 0,
 *   travauxMode: 'forfait', travauxReels: 0,
 *   lienBeneficiaire: 'neveu_niece',
 *   donationsAnterieures: 0,
 *   tauxDroitsEnregistrement: 5.80665,
 * })
 * // → optionAvantageuse = 'vente' (l'écart de barème 55 % vs 19/17 % est massif)
 */
export function calculerVenteVsDonation(
  inputs: VenteVsDonationInputs,
): VenteVsDonationResults {
  const warnings: VenteVsDonationResults['warnings'] = []
  const optimisations: VenteVsDonationResults['optimisations'] = []

  // 1. Calcul côté vente : plus-value immobilière sur bien "autre" (pas RP)
  const pvResults = calculerPlusValueImmobiliere({
    dateAcquisition: inputs.dateAcquisition,
    prixAcquisition: inputs.prixAcquisition,
    fraisAcquisition: inputs.fraisAcquisitionMode,
    fraisAcquisitionReels: inputs.fraisAcquisitionReels,
    travaux: inputs.travauxMode === 'forfait' ? 'forfait' : inputs.travauxMode === 'reel' ? 'reel' : 'aucun',
    travauxReels: inputs.travauxReels,
    dateCession: new Date().toISOString().slice(0, 10),
    prixCession: inputs.valeurBien,
    typeBien: 'autre',
    premiereCession: false,
  })

  // 2. Droits d'enregistrement DMTO côté acheteur
  const droitsEnregistrement = Math.round(
    (inputs.valeurBien * inputs.tauxDroitsEnregistrement) / 100,
  )

  const totalImpotsVente = pvResults.totalImpots
  const coutFiscalVente = totalImpotsVente + droitsEnregistrement

  // 3. Calcul côté donation : application du barème Art. 777 CGI
  const lienFiscal = LIEN_TO_FISCAL[inputs.lienBeneficiaire]
  const abattement = ABATTEMENTS_ART_779[lienFiscal] ?? 0
  const abattementResiduel = Math.max(0, abattement - inputs.donationsAnterieures)
  const tranchesConsommees = Math.max(0, inputs.donationsAnterieures - abattement)
  const baseTaxable = Math.max(0, inputs.valeurBien - abattementResiduel)

  const { droits: droitsDonationRaw } = appliquerBareme(
    baseTaxable,
    tranchesConsommees,
    getBaremePourLien(lienFiscal),
  )
  const droitsDonation = Math.round(droitsDonationRaw)

  // 4. Synthèse
  const ecart = Math.abs(coutFiscalVente - droitsDonation)
  let optionAvantageuse: VenteVsDonationResults['optionAvantageuse']
  if (ecart === 0) optionAvantageuse = 'egalite'
  else if (coutFiscalVente < droitsDonation) optionAvantageuse = 'vente'
  else optionAvantageuse = 'donation'

  // 5. Warnings
  if (inputs.lienBeneficiaire === 'neveu_niece' || inputs.lienBeneficiaire === 'autre') {
    warnings.push({
      type: 'warning',
      message: `Lien fiscal éloigné : le barème de donation applique un taux unique de ${inputs.lienBeneficiaire === 'neveu_niece' ? '55' : '60'} % au-delà de l'abattement (${eur(abattement)}). Sur un bien immobilier, la vente est souvent moins coûteuse, à condition que le bénéficiaire puisse financer l'achat.`,
    })
  }

  if (pvResults.surtaxe > 0) {
    warnings.push({
      type: 'warning',
      message: `Surtaxe Art. 1609 nonies G applicable : la PV nette IR dépasse 50 000 €. Surtaxe estimée ${eur(pvResults.surtaxe)}. Calculée définitivement par le notaire.`,
    })
  }

  if (inputs.donationsAnterieures > 0 && inputs.donationsAnterieures < abattement) {
    warnings.push({
      type: 'info',
      message: `Rappel Art. 784 CGI : ${eur(inputs.donationsAnterieures)} de donations antérieures consomment l'abattement. Il reste ${eur(abattementResiduel)} disponible avant taxation.`,
    })
  }

  if (inputs.donationsAnterieures >= abattement) {
    warnings.push({
      type: 'info',
      message: `L'abattement personnel ${eur(abattement)} est intégralement consommé par les donations antérieures (${eur(inputs.donationsAnterieures)}). La nouvelle donation démarre directement au barème.`,
    })
  }

  // 6. Optimisations
  if (optionAvantageuse === 'vente' && ecart > 5000) {
    optimisations.push({
      type: 'success',
      message: `La vente est ${eur(ecart)} moins coûteuse fiscalement. Attention : le bénéficiaire doit disposer du capital ${eur(inputs.valeurBien)} pour l'achat, et l'argent encaissé par le vendeur rentre dans son patrimoine (donc dans sa future succession). Pour neutraliser, le vendeur peut prêter le prix d'achat à l'acheteur (voir /pret-intrafamilial).`,
    })
  }

  if (optionAvantageuse === 'donation' && ecart > 5000) {
    optimisations.push({
      type: 'success',
      message: `La donation est ${eur(ecart)} moins coûteuse fiscalement, principalement grâce à l'abattement ${eur(abattement)} et au barème progressif favorable. Cumul possible avec un démembrement (donation de la nue-propriété uniquement) pour réduire encore l'assiette (voir /donation/demembrement).`,
    })
  }

  if (
    pvResults.anneesDetention < 22 &&
    pvResults.anneesAvantExoIR > 0 &&
    pvResults.anneesAvantExoIR <= 5
  ) {
    optimisations.push({
      type: 'info',
      message: `À ${pvResults.anneesDetention} ans de détention, l'exonération IR n'est pas encore acquise. En attendant ${pvResults.anneesAvantExoIR} année(s) supplémentaire(s) avant la vente, vous économiseriez l'IR 19 % sur la PV. L'exonération PS totale (17,2 %) est acquise à 30 ans.`,
    })
  }

  return {
    pvBrute: pvResults.pvBrute,
    pvNetteIR: pvResults.pvNetteIR,
    irPlusValue: pvResults.impotRevenu,
    psPlusValue: pvResults.prelevementsSociaux,
    surtaxePV: pvResults.surtaxe,
    totalImpotsVente,
    droitsEnregistrement,
    coutFiscalVente,
    abattementDonation: abattement,
    abattementResiduel,
    baseTaxableDonation: baseTaxable,
    droitsDonation,
    optionAvantageuse,
    ecart: Math.round(ecart),
    warnings,
    optimisations,
  }
}

// ─────────────────────────────────────────────────────────────
// Schémas SEO
// ─────────────────────────────────────────────────────────────

const FAQ_VENTE_VS_DONATION: FAQSchemaItem[] = [
  {
    question: "Quand préférer la vente à la donation d'un bien à un proche ?",
    answer: "La vente est généralement moins coûteuse fiscalement quand le lien de parenté est éloigné (neveu, nièce, non parent), car le barème de donation applique alors 55 % ou 60 % au-delà d'un abattement faible (7 967 € pour un neveu, 0 € pour un non parent). À l'inverse, pour un enfant, l'abattement de 100 000 € et le barème progressif (5 à 20 % sur les premiers 552 324 €) rendent la donation souvent plus avantageuse.",
  },
  {
    question: "Quels sont les droits d'enregistrement sur une vente immobilière ?",
    answer: "Les droits d'enregistrement (DMTO) sont payés par l'acheteur. Le taux standard est de 5,80665 % du prix (taxe départementale 4,50 % + taxe communale 1,20 % + frais d'assiette 2,37 % de la taxe départementale). Certains départements ont relevé le DMTO à 5 %, portant le total à environ 6,32 %. Le notaire applique le taux du département où se trouve le bien.",
  },
  {
    question: "L'abattement de donation est-il rechargé tous les 15 ans ?",
    answer: "Oui. L'article 784 du CGI prévoit un rappel fiscal des donations antérieures sur 15 ans. Au-delà de 15 ans, l'abattement et les premières tranches du barème sont à nouveau disponibles. Pour un enfant, cela signifie 100 000 € transmissibles tous les 15 ans en franchise de droits.",
  },
  {
    question: "Quel est le barème pour une donation à un neveu ou une nièce ?",
    answer: "Les donations en faveur des neveux/nièces (et au-delà du 4e degré de parenté) sont taxées à 55 % au-delà de l'abattement de 7 967 € (Art. 779-V CGI, barème Art. 777 Tableau IV). Ce taux unique très élevé rend souvent la vente plus avantageuse pour ce lien, à condition que le neveu puisse financer l'achat.",
  },
  {
    question: "La vente à un proche peut-elle être requalifiée en donation déguisée ?",
    answer: "Oui, si le prix est manifestement sous-évalué ou si l'acheteur ne paie pas effectivement. L'administration fiscale peut requalifier la vente en donation et appliquer rétroactivement les droits de donation, voire des pénalités. Pour sécuriser : prix conforme à une expertise, financement réel et tracé, paiement effectif au vendeur.",
  },
  {
    question: "La résidence principale est-elle exonérée dans les deux cas ?",
    answer: "Côté vente : oui, la résidence principale est exonérée de plus-value (Art. 150 U II 1° CGI). Côté donation : la valeur transmise reste soumise au barème Art. 777 dans tous les cas, mais l'abattement personnel (100 000 € pour un enfant) peut couvrir intégralement de petites résidences. Le calculateur traite la vente d'un bien autre que la résidence principale.",
  },
  {
    question: "Le vendeur peut-il prêter le prix d'achat à l'acheteur familial ?",
    answer: "Oui. C'est une stratégie courante : le proche achète le bien à crédit, le vendeur consent un prêt à un taux raisonnable (référence : TMM Banque de France). À l'extinction du prêt, l'opération devient économiquement neutre. Attention au risque de requalification si le prêt n'est pas formalisé et remboursé effectivement. Voir /pret-intrafamilial.",
  },
  {
    question: "Peut-on cumuler donation et démembrement pour réduire les droits ?",
    answer: "Oui. La donation de la seule nue-propriété (en conservant l'usufruit) réduit l'assiette taxable selon le barème de l'Art. 669 CGI : par exemple, à 65 ans, la nue-propriété vaut 60 % de la pleine propriété, et seule cette part est taxée. Le donateur conserve la jouissance et les revenus du bien jusqu'à son décès. Voir /donation/demembrement.",
  },
]

const HOWTO_VENTE_VS_DONATION: HowToSchema = {
  name: 'Comparer vente et donation d\'un bien immobilier à un proche',
  description: 'Comparer le coût fiscal d\'une vente (PV + droits enregistrement) et d\'une donation (droits Art. 777) d\'un même bien à un membre de la famille.',
  totalTime: 'PT3M',
  steps: [
    { name: 'Saisir la valeur de marché du bien', text: 'Prix de cession en vente ou valeur transmise en donation (identique).' },
    { name: 'Renseigner l\'acquisition initiale', text: 'Date, prix d\'acquisition, frais, travaux : utilisés pour calculer la plus-value côté vente.' },
    { name: 'Choisir le lien bénéficiaire', text: 'Enfant, petit-enfant, frère/sœur, neveu/nièce ou autre. Détermine l\'abattement et le barème de donation.' },
    { name: 'Indiquer les donations antérieures', text: 'Rappel fiscal Art. 784 sur 15 ans : ces donations consomment l\'abattement.' },
    { name: 'Ajuster le taux DMTO', text: 'Taux standard 5,80665 %, jusqu\'à 6,32 % selon le département.' },
    { name: 'Lire la comparaison', text: 'Coût fiscal vente (PV + DMTO) vs coût fiscal donation (droits Art. 777).' },
  ],
}

// ─────────────────────────────────────────────────────────────
// Module
// ─────────────────────────────────────────────────────────────

export const moduleVenteVsDonation: CalculatorModule<
  VenteVsDonationInputs,
  VenteVsDonationResults
> = {
  slug: 'vente-vs-donation',
  nom: 'Vente vs donation intrafamiliale',
  sources: SOURCES_VENTE_VS_DONATION,
  faqSchema: FAQ_VENTE_VS_DONATION,
  howToSchema: HOWTO_VENTE_VS_DONATION,
  formatContexteChat: (inputs, results) =>
    [
      'CONTEXTE VENTE VS DONATION :',
      ligne('Valeur du bien', eur(inputs.valeurBien)),
      ligne('Acquisition', `${inputs.dateAcquisition} - ${eur(inputs.prixAcquisition)}`),
      ligne('Lien', inputs.lienBeneficiaire),
      ligne('Donations antérieures', eur(inputs.donationsAnterieures)),
      '',
      ligne('Côté vente - IR PV', eur(results.irPlusValue)),
      ligne('Côté vente - PS PV', eur(results.psPlusValue)),
      ligne('Côté vente - surtaxe', eur(results.surtaxePV)),
      ligne('Côté vente - droits enregistrement', eur(results.droitsEnregistrement)),
      ligne('Coût fiscal vente total', eur(results.coutFiscalVente)),
      '',
      ligne('Côté donation - abattement', eur(results.abattementDonation)),
      ligne('Côté donation - base taxable', eur(results.baseTaxableDonation)),
      ligne('Droits donation', eur(results.droitsDonation)),
      '',
      ligne('Option avantageuse', `${results.optionAvantageuse} (écart ${eur(results.ecart)})`),
    ].join('\n'),
}
