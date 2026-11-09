# Page de cotisation des obsèques de Nanan KPADJALIKA

- **Créée le :** 2026-11-08, à la demande du comité d'organisation
- **But :** faciliter les cotisations des Boukebofouès pour les obsèques de Nanan DIBY KOUASSI Albert Kpadjalika (4 décembre 2026)
- **Statut :** **en ligne** depuis le 2026-11-09 sur https://cotisation-nanan-kpadjalika.netlify.app. Titulaire du numéro : Mme Assié Bessessa (donné le 2026-11-08)

## Ce que fait la page

- Affiche le numéro du comité **07 97 82 12 60** (Wave et Orange Money) avec un bouton « Copier » et le nom de la titulaire, Mme Assié Bessessa
- Avertit de ne jamais donner son code secret (protection contre les arnaques)
- Formulaire « Prévenez le comité » : nom (obligatoire), famille ou ville, montant (libre, avec des raccourcis 1 000 à 25 000 FCFA), Wave ou Orange Money. Ouvre WhatsApp avec un message prêt et une référence `CT-XXXX`, et invite à joindre la capture de l'envoi
- Suivi dans un Google Sheet (`suivi/apps-script.gs`), actif dès que `sheetUrl` est rempli :
  - onglet **Visites** : une ligne par personne qui ouvre la page (une fois par session), avec l'appareil
  - onglet **Copies** : une ligne à chaque clic sur « Copier le numéro » (date, appareil, numéro copié)
  - onglet **Cotisations** : une ligne par déclaration, avec une colonne **Numéro copié** (oui si la personne a copié le numéro avant de déclarer) et « Reçu vérifié » à remplir à la main
  - onglet **Bilan** : clics sur « Copier », déclarations, total déclaré, total vérifié, par Wave et par Orange Money

## Ce que la page ne fait pas

- **Elle ne prend pas l'argent.** Le paiement se fait dans l'appli Wave ou Orange Money, vers le numéro du comité. Un vrai lien de paiement demanderait un compte Wave Business ou un agrégateur (CinetPay, PayDunya...), avec dossier et frais
- **Une déclaration n'est pas une preuve de paiement** : seul le relevé du compte fait foi. Le trésorier coche « oui » dans le tableau après vérification

## À compléter avant la mise en ligne (dans `index.html`, objet `CONFIG`)

1. ~~`titulaire`~~ : fait (Mme Assié Bessessa). Vider ce champ remet la bande « Brouillon »
2. ~~`whatsapp`~~ : les déclarations arrivent sur le WhatsApp du **07 07 43 57 74** (corrigé le 2026-11-09 : le 07 97 82 12 60 n'a pas WhatsApp, le bouton ne s'ouvrait pas). Le numéro de paiement reste le 07 97 82 12 60
3. ~~`sheetUrl`~~ : fait le 2026-11-09, tableau « Cotisations Nanan KPADJALIKA » sur le compte Google de Ferdinand

## Limites connues

- Anti-doublon (2026-11-09) : la même déclaration (nom, montant, moyen) renvoyée pendant la visite garde sa référence et n'ajoute pas de ligne. Un envoi direct au script Google reste possible pour qui connaît l'URL : seul le « Total vérifié » du Bilan fait foi

- Le hero utilise la photo du pagne. Si le comité fournit l'affiche d'hommage en bonne qualité, la mettre dans `images/` et l'afficher

## Mise en ligne

**Vercel depuis le 2026-11-09** (le lien Netlify n'avait pas encore été partagé). Dépôt public séparé `Ferdinand-dev03/cotisation-nanan-kpadjalika` (https://github.com/Ferdinand-dev03/cotisation-nanan-kpadjalika) : page, image, script de suivi, README, `vercel.json` (en-têtes de sécurité) et `.gitignore`. Aucun secret. Le workspace reste privé.

**Pour une mise à jour :** cloner le dépôt, y recopier les fichiers de ce dossier, vérifier qu'aucun secret n'y figure, commit, push : Vercel remet en ligne tout seul.

Ancien hébergement : Netlify Drop (https://cotisation-nanan-kpadjalika.netlify.app), à supprimer une fois Vercel vérifié.
