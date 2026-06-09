# Sources - Prêt intrafamilial in fine

**Dernière vérification** : 2026-06-09 (création rétrospective)
**Millésime fiscal** : 2026 (référence aux barèmes donation/succession Art. 779)
**Calculateur concerné** : `src/app/pret-intrafamilial/page.tsx`

---

## Avertissement crawl

Les URLs Légifrance LEGIARTI sont structurellement instables. La référence textuelle prime. Cf. `docs/broken-links-to-fix.md`.

Ce calculateur **n'introduit aucun chiffre fiscal propre** : il compare un coût de prêt (intérêts) au coût d'une donation équivalente (sources mutualisées avec `donation/droits`).

---

## Textes de loi

### Code civil

- **Articles 1892 et suivants du Code civil** - Régime juridique du prêt à usage et du prêt de consommation
  - Statut : ☐ NON TESTÉE
  - URL probable : https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006070721/LEGISCTA000006150221/
  - Point clé : encadrement du prêt entre particuliers, présomption de gratuité réfragable.

### Code général des impôts

- **Article 757 B CGI** - Régime applicable en cas de remise de dette (assimilée à un don)
  - Statut : ✅ OK (LEGIARTI000047288569 — via cross-check transmission)
  - URL : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047288569
  - Point clé : si le prêteur renonce au remboursement, la dette est requalifiée en libéralité taxable.

- **Article 779 CGI** - Abattements personnels par lien de parenté (cf. donation/droits.md)
  - Statut : ✅ OK (LEGIARTI000026292566)

- **Article 784 CGI** - Rappel fiscal des donations antérieures (15 ans)
  - Statut : ❌ 404 (LEGIARTI000041464760)

### Doctrine administrative

- **Instruction fiscale 7G-3-12** - Prêts familiaux, déclaration obligatoire
  - Statut : ☐ NON TESTÉE
  - Point clé : seuil de déclaration (formulaire 2062) à 5 000 € cumulés par prêteur sur l'année. Intérêts > 1 000 €/an = revenus de capitaux mobiliers à déclarer (formulaire 2778).

---

## Sources de vérification croisée (URLs stables)

- **service-public.gouv.fr** - "Reconnaissance de dette"
  - Statut : ☐ NON TESTÉE
  - URL probable : https://www.service-public.gouv.fr/particuliers/vosdroits/F31750

- **impots.gouv.fr** - "Prêts à déclarer"
  - Statut : ☐ NON TESTÉE
  - URL : https://www.impots.gouv.fr/particulier/quels-prets-suis-je-tenu-de-declarer

- **Banque de France** - Taux moyen mensuel (TMM)
  - URL : https://www.banque-france.fr/
  - Référence du taux d'intérêt minimum admissible pour éviter la requalification.

---

## Barèmes et seuils appliqués

| Paramètre | Valeur | Source | Millésime |
|-----------|--------|--------|-----------|
| Seuil déclaration prêt (formulaire 2062) | 5 000 € cumulés par prêteur | Instruction 7G-3-12 | 2026 |
| Seuil intérêts imposables RCM (formulaire 2778) | 1 000 €/an | Instruction 7G-3-12 | 2026 |
| Abattement donation enfant (point de comparaison) | 100 000 € | Art. 779-I CGI | 2026 |
| Abattement petit-enfant | 31 865 € | Art. 790 B CGI | 2026 |
| Abattement frère/sœur | 15 932 € | Art. 779-IV CGI | 2026 |
| Rappel fiscal | 15 ans | Art. 784 CGI | 2026 |

---

## URLs vérifiées manuellement par Nicolas

| URL ouverte | Article/donnée vérifié | Chiffre code | Confirmé ? | Date |
|-------------|------------------------|--------------|------------|------|
| (à compléter) | Seuil 5 000 € formulaire 2062 (instruction 7G-3-12) | 5 000 € | ☐ | - |
| (à compléter) | Seuil 1 000 € intérêts imposables RCM | 1 000 € | ☐ | - |

---

## Exemples de référence

### Exemple 1 - Prêt 100 000 € à un enfant, 10 ans, 2 %, prêteur 70 ans, espérance 85
Source : JSDoc inline `src/lib/pretIntrafamilial.ts:53-57`.

**Inputs** :
- Montant prêté : 100 000 €
- Durée : 10 ans
- Taux : 2 %
- Âge prêteur : 70 ans
- Espérance de vie : 85 ans
- Lien : enfant
- Donations antérieures : 0

**Résultat attendu** :
- Intérêts annuels = 2 000 €
- Intérêts cumulés sur 10 ans = 20 000 € (imposables côté prêteur > 1 000 €/an)
- Décès avant terme : non (durée restante 15 > 10)
- Droits succession sur créance : 0 (prêt remboursé avant décès)
- Droits donation équivalente : 0 (100 000 € < abattement 100 000 €)
- Option : selon le contexte, le prêt évite une donation immédiate tout en conservant la liquidité pour le prêteur.

### Exemple 2 - Prêt sans intérêt 50 000 € à un enfant, 5 ans
- Warning : taux 0 % > 5 000 € → risque de requalification en donation déguisée si pas de reconnaissance de dette écrite et de plan de remboursement.

### Exemple 3 - Prêt 100 000 € à un neveu, décès avant terme
- Lien neveu : abattement 7 967 €
- Capital non remboursé entre dans la succession.
- Droits sur 92 033 € au taux 55 % (Art. 777 Tableau IV) ≈ 50 618 €.

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- Prêt in fine (remboursement du capital à terme, intérêts annuels seuls).
- Comparaison avec donation équivalente (mêmes abattement et barème).
- Risque successoral : si le prêteur décède avant terme, la créance entre dans l'actif successoral.
- Imposition des intérêts pour le prêteur (> 1 000 €/an).
- Alertes : taux 0 %, requalification, déclaration obligatoire.

### Ce que le calculateur **ne traite pas** (volontairement)

- Prêt amortissable (mensualités constantes capital + intérêts).
- Prêt à taux variable.
- Prêt entre conjoints / PACS (régime spécifique au régime matrimonial).
- Modulation du taux pour respecter le seuil TMM (Banque de France).
- Cession de créance du vivant.

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| 2026-06-09 | Claude Code (/verif-sources rétrospectif) | Création initiale du fichier sources | _audit-2026-06-09_ |

### Points de vigilance

- Le calculateur retient un seuil de 1 000 €/an pour la déclaration des intérêts (commentaire `src/lib/pretIntrafamilial.ts:53`). À cross-checker contre l'instruction 7G-3-12 (à confirmer par Nicolas).
- Le taux minimum acceptable pour éviter la requalification n'est pas implémenté : référence Banque de France TMM à signaler dans l'UI.
- Hypothèse "décès = transfert intégral de la créance à l'héritier" : simplification — en pratique, la créance est inscrite à l'actif successoral et fait l'objet d'un partage entre les héritiers selon la dévolution.
