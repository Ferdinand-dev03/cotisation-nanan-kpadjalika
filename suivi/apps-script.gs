/**
 * Suivi des cotisations des obsèques de Nanan KPADJALIKA.
 * À coller dans Extensions > Apps Script d'un Google Sheet, lancer « installer », puis déployer en application Web
 * (Exécuter en tant que : Moi, Accès : Tout le monde). Coller l'URL /exec dans CONFIG.sheetUrl de index.html.
 *
 * Onglets :
 *  - Cotisations : une ligne par déclaration « Prévenir le comité », avec « Numéro copié » (oui si la personne
 *    a cliqué sur « Copier le numéro » avant de déclarer) et « Reçu vérifié » à remplir à la main
 *  - Copies : une ligne à chaque clic sur « Copier le numéro »
 *  - Visites : une ligne par personne qui ouvre la page (une fois par session)
 *  - Bilan : calculé tout seul
 */
const ONGLET = "Cotisations";
const ENTETES = ["Date", "Référence", "Nom", "Famille / ville", "Montant déclaré (FCFA)", "Moyen", "Appareil", "Numéro copié", "Reçu vérifié (oui/non)"];
const ONGLET_COPIES = "Copies";
const ENTETES_COPIES = ["Date", "Appareil", "Numéro copié"];
const ONGLET_VISITES = "Visites";
const ENTETES_VISITES = ["Date", "Appareil"];

// À LANCER UNE FOIS : choisir « installer » dans la liste en haut, puis Exécuter. Crée les onglets et le bilan
function installer() {
  feuille(ONGLET, ENTETES);
  feuille(ONGLET_COPIES, ENTETES_COPIES);
  feuille(ONGLET_VISITES, ENTETES_VISITES);
  const classeur = SpreadsheetApp.getActiveSpreadsheet();
  const bilan = classeur.getSheetByName("Bilan") || classeur.insertSheet("Bilan", 0);
  bilan.clear();
  bilan.getRange("A1:B9").setValues([
    ["Indicateur", "Valeur"],
    ["Visites de la page", "=MAX(0,COUNTA(Visites!A:A)-1)"],
    ["Numéro copié (clics sur « Copier »)", "=MAX(0,COUNTA(Copies!A:A)-1)"],
    ["Déclarations reçues", "=MAX(0,COUNTA(Cotisations!B:B)-1)"],
    ["Déclarations après avoir copié le numéro", "=COUNTIF(Cotisations!H:H,\"oui\")"],
    ["Total déclaré (FCFA)", "=SUM(Cotisations!E:E)"],
    ["Total vérifié sur les reçus (FCFA)", "=SUMIF(Cotisations!I:I,\"oui\",Cotisations!E:E)"],
    ["Par Wave (FCFA)", "=SUMIF(Cotisations!F:F,\"Wave\",Cotisations!E:E)"],
    ["Par Orange Money (FCFA)", "=SUMIF(Cotisations!F:F,\"Orange Money\",Cotisations!E:E)"]
  ]);
  bilan.getRange("A1:B1").setFontWeight("bold");
  bilan.autoResizeColumn(1);
}

function feuille(nom, entetes) {
  const classeur = SpreadsheetApp.getActiveSpreadsheet();
  let f = classeur.getSheetByName(nom);
  if (!f) {
    f = classeur.insertSheet(nom);
    f.appendRow(entetes);
    f.getRange(1, 1, 1, entetes.length).setFontWeight("bold");
    f.setFrozenRows(1);
  }
  return f;
}

// Texte court et sans formule, pour qu'une saisie ne s'exécute jamais dans le tableau
function propre(v, max) {
  return String(v == null ? "" : v).replace(/^[=+\-@]+/, "").slice(0, max || 120);
}

function doPost(e) {
  const verrou = LockService.getScriptLock();
  verrou.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.type === "cotisation") {
      const montant = Math.max(0, Math.min(10000000, parseInt(d.montant, 10) || 0));
      feuille(ONGLET, ENTETES).appendRow([new Date(), propre(d.code, 12), propre(d.nom, 80), propre(d.famille, 80), montant,
        propre(d.moyen, 20), propre(d.appareil, 20), d.copie === "oui" ? "oui" : "non", ""]);
    } else if (d.type === "visite") {
      feuille(ONGLET_VISITES, ENTETES_VISITES).appendRow([new Date(), propre(d.appareil, 20)]);
    } else if (d.type === "copie") {
      feuille(ONGLET_COPIES, ENTETES_COPIES).appendRow([new Date(), propre(d.appareil, 20), "oui"]);
    }
    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("erreur");
  } finally {
    verrou.releaseLock();
  }
}
