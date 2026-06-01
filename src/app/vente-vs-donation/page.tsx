import type { Metadata } from 'next'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const VenteVsDonationCalculator = dynamic(
  () => import('@/components/Calculator/VenteVsDonationCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import MethodologieSection from '@/components/MethodologieSection'

export const metadata: Metadata = {
  title: 'Vendre ou donner un bien à un proche : comparateur 2026',
  description: 'Comparez le coût fiscal d\'une vente (plus-value + droits d\'enregistrement) et d\'une donation (droits Art. 777 CGI) d\'un bien immobilier à un proche : enfant, petit-enfant, neveu, etc.',
  keywords: 'vendre ou donner, vente vs donation, transmission bien immobilier proche, droits donation neveu, plus-value vente intrafamiliale, droits enregistrement DMTO, art 777 CGI, abattement donation',
  alternates: { canonical: 'https://calculpatrimoine.fr/vente-vs-donation' },
}

const LIMITES = [
  'Le calculateur traite la transmission d\'un bien immobilier autre que la résidence principale. La vente d\'une RP est exonérée de plus-value (Art. 150 U II 1° CGI) ; la donation d\'une RP suit les règles communes.',
  'Les frais de notaire (émoluments + débours) sont applicables aux deux opérations et ne sont pas chiffrés. Ils dépendent de la valeur du bien selon un barème dégressif réglementé.',
  'Le don familial 790 G (+31 865 € d\'abattement) n\'est PAS applicable ici : il est réservé aux dons de sommes d\'argent, pas aux donations en nature comme un bien immobilier.',
  'L\'angle "le vendeur garde le cash et le retransmet plus tard" n\'est pas modélisé. En pratique, le cash de la vente rentre dans le patrimoine du vendeur, donc dans sa future succession.',
  'Pour neutraliser le cash flow côté acheteur, un prêt intrafamilial peut être consenti par le vendeur (voir /pret-intrafamilial). Cette combinaison n\'est pas calculée ici.',
  'Le taux DMTO par défaut (5,80665 %) est le standard national. Certains départements ont relevé le DMTO départemental à 5 % (au lieu de 4,50 %), portant le total à environ 6,32 %. Ajustez le champ "Taux DMTO" selon votre département.',
  'Le risque de requalification en donation déguisée (prix sous-évalué, paiement non effectif) n\'est pas modélisé.',
]

export default function VenteVsDonationPage() {
  return (
    <CalculateurPageLayout
      breadcrumb={[
        { href: '/', label: 'Accueil' },
        { label: 'Vendre ou donner' },
      ]}
      titre={<>Vendre ou donner<br />un bien à un proche</>}
      description="Comparez le coût fiscal cumulé d'une vente (plus-value immobilière + droits d'enregistrement)
        et d'une donation (droits de mutation à titre gratuit, Art. 777 CGI) d'un bien immobilier à un membre
        de la famille. Particulièrement utile pour les transmissions à neveux/nièces, frères/sœurs ou
        non-parents, où le barème de donation est très défavorable."
      features={[
        'PV immobilière avec abattements durée',
        'DMTO 5,80665 % ajustable',
        'Barème Art. 777 selon lien',
        'Rappel 15 ans Art. 784',
        'Comparaison coût cumulé',
      ]}
      calculator={<VenteVsDonationCalculator />}
      currentHref="/vente-vs-donation"
      methodologie={
        <MethodologieSection
          slug="vente-vs-donation"
          limites={LIMITES}
          note={
            <>
              Régime applicable 2026. Sources : Art. 150 U et VC CGI (plus-value),
              Art. 1609 nonies G CGI (surtaxe), Art. 1594 D / 1594 F sexies CGI (DMTO),
              Art. 777 / 779 / 784 CGI (donation). Le calcul de la plus-value réutilise
              le module partagé /plus-value-immobiliere ; les droits de donation
              réutilisent le module fiscal partagé `baremesArt777`.
            </>
          }
        />
      }
    />
  )
}
