(function () {
  "use strict";

  var DIMS = [
    { name: "Qualit\u00e9 des donn\u00e9es cr\u00e9ances", short: "Donn\u00e9es",     col: "#1D9E75", bg: "#E1F5EE" },
    { name: "Automatisation du reporting",          short: "Reporting",   col: "#7F77DD", bg: "#EEEDFE" },
    { name: "Conformit\u00e9 COBAC / DEC\u00a02001",        short: "Conformit\u00e9", col: "#BA7517", bg: "#FAEEDA" },
    { name: "Surveillance NPL",                     short: "NPL",         col: "#D85A30", bg: "#FAECE7" },
    { name: "Gouvernance SI & tra\u00e7abilit\u00e9",         short: "Gouvernance", col: "#378ADD", bg: "#E6F1FB" }
  ];

  var QS = [
    { d: 0, q: "Vos donn\u00e9es cr\u00e9ances sont-elles consolid\u00e9es dans une source unique ?",
      o: ["Aucune consolidation \u2014 chaque agence g\u00e8re ses propres donn\u00e9es", "Consolidation manuelle mensuelle par fichiers Excel", "Entrep\u00f4t centralis\u00e9 mais mis \u00e0 jour manuellement", "Source unique automatis\u00e9e avec r\u00e9conciliation quotidienne"] },
    { d: 0, q: "Quelle est la fra\u00eecheur de vos donn\u00e9es cr\u00e9ances en production ?",
      o: ["Donn\u00e9es du mois pr\u00e9c\u00e9dent au mieux", "Donn\u00e9es hebdomadaires avec retard de 5 \u00e0 7 jours", "Donn\u00e9es quotidiennes via extraction manuelle", "Donn\u00e9es J-1 ou temps r\u00e9el, automatis\u00e9es"] },
    { d: 0, q: "Votre historique de donn\u00e9es cr\u00e9ances remonte \u00e0 combien d\u2019ann\u00e9es ?",
      o: ["Moins de 1 an disponible", "1 \u00e0 2 ans, format h\u00e9t\u00e9rog\u00e8ne", "2 \u00e0 3 ans, partiellement nettoy\u00e9", "Plus de 3 ans, format homog\u00e8ne et document\u00e9"] },
    { d: 0, q: "Les donn\u00e9es cr\u00e9ances sont-elles r\u00e9concili\u00e9es avec le core banking ?",
      o: ["Aucune r\u00e9conciliation syst\u00e9matique", "R\u00e9conciliation manuelle trimestrielle", "R\u00e9conciliation mensuelle semi-automatis\u00e9e", "R\u00e9conciliation automatique avec piste d\u2019audit compl\u00e8te"] },
    { d: 0, q: "Quelle est la qualit\u00e9 de la documentation de vos donn\u00e9es cr\u00e9ances ?",
      o: ["Aucun dictionnaire de donn\u00e9es ni documentation", "Documentation partielle dans des fichiers dispers\u00e9s", "Dictionnaire existant mais non maintenu \u00e0 jour", "Dictionnaire complet, maintenu et partag\u00e9 par les \u00e9quipes"] },
    { d: 1, q: "Combien de jours pour produire votre rapport mensuel COBAC ?",
      o: ["Plus de 7 jours ouvrables", "5 \u00e0 7 jours ouvrables", "3 \u00e0 5 jours ouvrables", "Moins de 2 jours, processus automatis\u00e9"] },
    { d: 1, q: "La production du reporting repose-t-elle sur une seule personne ?",
      o: ["Oui, tout d\u00e9pend d\u2019un seul analyste sans proc\u00e9dure \u00e9crite", "Oui, avec une proc\u00e9dure partiellement document\u00e9e", "2 \u00e0 3 personnes ma\u00eetrisent le processus", "Processus document\u00e9, automatis\u00e9, sans d\u00e9pendance individuelle"] },
    { d: 1, q: "Utilisez-vous un outil BI d\u00e9di\u00e9 (Power BI, Tableau, etc.) ?",
      o: ["Non, uniquement Excel et Word", "Excel avec quelques macros basiques", "Outil BI en cours de d\u00e9ploiement, usage partiel", "Outil BI en production, dashboards actualis\u00e9s automatiquement"] },
    { d: 1, q: "Comment vos \u00e9quipes acc\u00e8dent-elles aux donn\u00e9es de reporting ?",
      o: ["Extraction manuelle depuis le core banking sur demande", "Exports planifi\u00e9s envoy\u00e9s par email", "Connexion directe en lecture via requ\u00eates SQL", "Acc\u00e8s via couche s\u00e9mantique ou entrep\u00f4t de donn\u00e9es structur\u00e9"] },
    { d: 1, q: "Votre processus de reporting est-il document\u00e9 et auditable ?",
      o: ["Aucune documentation des processus", "Documentation informelle dans les t\u00eates des analystes", "Proc\u00e9dures \u00e9crites pour les \u00e9tats principaux", "Proc\u00e9dures compl\u00e8tes, versionn\u00e9es, test\u00e9es et r\u00e9vis\u00e9es annuellement"] },
    { d: 2, q: "Vos ratios prudentiels COBAC sont-ils calcul\u00e9s automatiquement ?",
      o: ["Calculs enti\u00e8rement manuels sous Excel", "Semi-automatis\u00e9 mais validation manuelle syst\u00e9matique", "Automatis\u00e9 pour les principaux ratios, sans alertes", "Automatis\u00e9 avec alertes, historique et piste d\u2019audit compl\u00e8te"] },
    { d: 2, q: "Avez-vous re\u00e7u des observations COBAC lors du dernier contr\u00f4le ?",
      o: ["Oui, plusieurs observations majeures avec mise en demeure", "Oui, des observations mineures sur la forme ou les d\u00e9lais", "Non, mais sans certitude totale sur la conformit\u00e9", "Non, conformit\u00e9 document\u00e9e et v\u00e9rifi\u00e9e en interne"] },
    { d: 2, q: "Vos \u00e9tats DEC\u00a02001 sont-ils produits dans les d\u00e9lais r\u00e9glementaires ?",
      o: ["Souvent en retard, d\u00e9rogations fr\u00e9quentes", "Parfois en retard selon la complexit\u00e9 du mois", "Dans les d\u00e9lais mais avec tension sur les \u00e9quipes", "Toujours dans les d\u00e9lais avec marge de s\u00e9curit\u00e9"] },
    { d: 2, q: "Vos rapprochements comptables li\u00e9s aux cr\u00e9ances sont-ils automatis\u00e9s ?",
      o: ["Enti\u00e8rement manuels avec risque d\u2019erreurs \u00e9lev\u00e9", "Partiellement automatis\u00e9s, contr\u00f4les manuels importants", "Principaux rapprochements automatis\u00e9s", "Rapprochements complets, automatis\u00e9s et alertes en temps r\u00e9el"] },
    { d: 2, q: "Disposez-vous d\u2019une cartographie de vos obligations COBAC ?",
      o: ["Aucune cartographie formalis\u00e9e", "Liste informelle connue des \u00e9quipes", "Cartographie document\u00e9e mais non tenue \u00e0 jour", "Cartographie compl\u00e8te, mise \u00e0 jour et int\u00e9gr\u00e9e au calendrier de production"] },
    { d: 3, q: "Disposez-vous d\u2019alertes automatiques sur les cr\u00e9ances en souffrance ?",
      o: ["Pas d\u2019alerte \u2014 d\u00e9tection en fin de mois", "Alerte manuelle bas\u00e9e sur le rapport mensuel", "Alerte hebdomadaire semi-automatique par extraction", "Alerte en temps r\u00e9el d\u00e8s d\u00e9passement des seuils d\u2019impay\u00e9s"] },
    { d: 3, q: "Votre taux de couverture NPL est-il suivi en temps r\u00e9el ?",
      o: ["Calcul\u00e9 manuellement une fois par mois", "Calcul\u00e9 en fin de mois avec d\u00e9lai de 3 \u00e0 5 jours", "Calcul\u00e9 hebdomadairement par requ\u00eate SQL", "Suivi quotidien automatique avec tableau de bord d\u00e9di\u00e9"] },
    { d: 3, q: "Votre mod\u00e8le de provisionnement est-il conforme IFRS\u00a09 / ECL ?",
      o: ["Provisionnement forfaitaire, non align\u00e9 IFRS\u00a09", "En cours de mise en conformit\u00e9 IFRS\u00a09", "Conforme mais calcul ECL encore manuel", "Mod\u00e8le ECL automatis\u00e9, calibr\u00e9 et auditable"] },
    { d: 3, q: "Pouvez-vous identifier les clients \u00e0 risque de d\u00e9faut dans les 90 jours ?",
      o: ["Non, aucun syst\u00e8me de d\u00e9tection pr\u00e9coce", "Via des r\u00e8gles heuristiques simples dans Excel", "Via un scoring basique avec crit\u00e8res limit\u00e9s", "Via un mod\u00e8le de scoring comportemental int\u00e9gr\u00e9"] },
    { d: 3, q: "Votre portefeuille de cr\u00e9ances est-il segment\u00e9 pour l\u2019analyse de risque ?",
      o: ["Aucune segmentation, analyse globale uniquement", "Segmentation par type de cr\u00e9dit uniquement", "Segmentation multi-crit\u00e8res en cours de structuration", "Segmentation compl\u00e8te : secteur, taille, garantie, g\u00e9ographie"] },
    { d: 4, q: "Existe-t-il un dictionnaire des donn\u00e9es formalis\u00e9 pour les cr\u00e9ances ?",
      o: ["Aucune documentation des donn\u00e9es", "Documentation partielle non maintenue", "Dictionnaire existant mais incomplet", "Dictionnaire complet, maintenu et accessible \u00e0 tous"] },
    { d: 4, q: "Les acc\u00e8s aux donn\u00e9es sensibles cr\u00e9ances sont-ils trac\u00e9s ?",
      o: ["Aucun contr\u00f4le d\u2019acc\u00e8s ni tra\u00e7abilit\u00e9", "Contr\u00f4les basiques sur le core banking uniquement", "Tra\u00e7abilit\u00e9 partielle sur les outils BI", "Tra\u00e7abilit\u00e9 compl\u00e8te avec logs, alertes et revues r\u00e9guli\u00e8res"] },
    { d: 4, q: "Disposez-vous d\u2019une piste d\u2019audit sur les modifications de donn\u00e9es ?",
      o: ["Aucune piste d\u2019audit \u2014 modifications non trac\u00e9es", "Tra\u00e7abilit\u00e9 dans le core banking uniquement", "Piste d\u2019audit partielle sur les outils principaux", "Piste d\u2019audit compl\u00e8te, archiv\u00e9e et consultable"] },
    { d: 4, q: "Vos outils BI et de reporting sont-ils int\u00e9gr\u00e9s au SI bancaire ?",
      o: ["Silos complets \u2014 aucune int\u00e9gration", "Int\u00e9gration via fichiers plats \u00e9chang\u00e9s manuellement", "Int\u00e9gration partielle via ETL ou connecteurs", "Int\u00e9gration compl\u00e8te avec actualisation automatique"] },
    { d: 4, q: "Avez-vous une politique de gouvernance des donn\u00e9es formalis\u00e9e ?",
      o: ["Aucune politique de gouvernance des donn\u00e9es", "R\u00e8gles informelles non document\u00e9es", "Politique en cours de r\u00e9daction", "Politique formalis\u00e9e, approuv\u00e9e et appliqu\u00e9e"] }
  ];

  var CMT = [
    ["Votre qualit\u00e9 de donn\u00e9es est critique. Sans donn\u00e9es fiables, tous vos calculs NPL et ratios COBAC sont expos\u00e9s \u00e0 des erreurs majeures.", "La base est pr\u00e9sente mais fragile. Des processus manuels introduisent des risques d\u2019erreurs sur votre reporting.", "Bonne fondation. Quelques automatisations cibl\u00e9es peuvent encore am\u00e9liorer la fiabilit\u00e9 et r\u00e9duire la charge.", "Excellent niveau. Votre qualit\u00e9 de donn\u00e9es est un atout comp\u00e9titif r\u00e9el pour votre institution."],
    ["Votre reporting est enti\u00e8rement manuel et vuln\u00e9rable. Un d\u00e9part cl\u00e9 peut bloquer toute la production r\u00e9glementaire.", "Le reporting fonctionne mais avec une forte d\u00e9pendance humaine. Le risque op\u00e9rationnel est \u00e9lev\u00e9 \u00e0 chaque arr\u00eat\u00e9.", "Bonne structuration. Automatiser davantage r\u00e9duit les risques et lib\u00e8re du temps pour l\u2019analyse.", "Reporting mature et industrialis\u00e9. Votre \u00e9quipe se concentre sur l\u2019analyse plut\u00f4t que la production."],
    ["Risque de non-conformit\u00e9 \u00e9lev\u00e9. Des observations COBAC peuvent entra\u00eener des p\u00e9nalit\u00e9s ou restrictions d\u2019activit\u00e9.", "La conformit\u00e9 est g\u00e9r\u00e9e mais avec tension. Les d\u00e9lais et la qualit\u00e9 peuvent \u00eatre am\u00e9lior\u00e9s.", "Bonne conformit\u00e9 op\u00e9rationnelle. Des automatisations suppl\u00e9mentaires r\u00e9duiraient encore les risques.", "Conformit\u00e9 exemplaire. Vous \u00eates bien positionn\u00e9 face aux contr\u00f4les COBAC et aux \u00e9volutions r\u00e9glementaires."],
    ["Surveillance NPL r\u00e9active et non pr\u00e9ventive. Le co\u00fbt de d\u00e9tection tardive est significatif pour votre bilan.", "Surveillance en place mais avec des d\u00e9lais. Les alertes tardives limitent la capacit\u00e9 d\u2019action pr\u00e9ventive.", "Bonne surveillance. La d\u00e9tection pr\u00e9coce automatis\u00e9e r\u00e9duirait encore votre co\u00fbt du risque.", "Surveillance NPL de haut niveau. Votre dispositif de d\u00e9tection pr\u00e9coce vous prot\u00e8ge efficacement."],
    ["Gouvernance SI tr\u00e8s faible. Risques de conformit\u00e9, d\u2019erreurs et de perte de donn\u00e9es critiques.", "Gouvernance basique. Les risques d\u2019acc\u00e8s non autoris\u00e9s et d\u2019erreurs non trac\u00e9es sont pr\u00e9sents.", "Gouvernance en d\u00e9veloppement. La formalisation restante est un investissement \u00e0 faible co\u00fbt, fort impact.", "Gouvernance SI solide. Tra\u00e7abilit\u00e9 et contr\u00f4les d\u2019acc\u00e8s r\u00e9pondent aux exigences des auditeurs."]
  ];

  var RECS = [
    ["Consolider les donn\u00e9es cr\u00e9ances dans une source unique", "Mettre en place une r\u00e9conciliation automatique avec le core banking", "Construire un dictionnaire de donn\u00e9es cr\u00e9ances document\u00e9"],
    ["Automatiser la production des \u00e9tats COBAC avec Power BI / Power Query", "Documenter les proc\u00e9dures de reporting pour \u00e9liminer les d\u00e9pendances cl\u00e9s", "R\u00e9duire le d\u00e9lai de production mensuel \u00e0 moins de 2 jours"],
    ["Automatiser le calcul des ratios prudentiels COBAC avec alertes de seuil", "Mettre en place un calendrier DEC\u00a02001 avec marges de s\u00e9curit\u00e9", "Formaliser la cartographie des obligations r\u00e9glementaires COBAC"],
    ["D\u00e9ployer des alertes automatiques sur les cr\u00e9ances en souffrance", "Mettre en conformit\u00e9 le provisionnement avec les exigences IFRS\u00a09 / ECL", "Construire un mod\u00e8le de scoring pour la d\u00e9tection pr\u00e9coce des d\u00e9fauts"],
    ["Mettre en place une tra\u00e7abilit\u00e9 compl\u00e8te des acc\u00e8s aux donn\u00e9es sensibles", "Formaliser la politique de gouvernance des donn\u00e9es cr\u00e9ances", "Int\u00e9grer les outils BI au SI bancaire pour \u00e9liminer les exports manuels"]
  ];

  var LEVELS = [
    { min: 0,  max: 39,  label: "Fragile",              col: "#E24B4A", bg: "#FCEBEB", tc: "#791F1F" },
    { min: 40, max: 59,  label: "En d\u00e9veloppement", col: "#BA7517", bg: "#FAEEDA", tc: "#633806" },
    { min: 60, max: 79,  label: "Structur\u00e9",         col: "#378ADD", bg: "#E6F1FB", tc: "#0C447C" },
    { min: 80, max: 100, label: "Avanc\u00e9",            col: "#1D9E75", bg: "#E1F5EE", tc: "#085041" }
  ];

  var DLV = [
    { label: "\u00c0 am\u00e9liorer",       bg: "#FCEBEB", tc: "#791F1F" },
    { label: "En d\u00e9veloppement", bg: "#FAEEDA", tc: "#633806" },
    { label: "Satisfaisant",    bg: "#E6F1FB", tc: "#0C447C" },
    { label: "Ma\u00eetris\u00e9",          bg: "#E1F5EE", tc: "#085041" }
  ];

  var prof = { role: null, size: null, country: null };
  var ans  = new Array(25).fill(null);
  var curQ = 0;
  var ddIsLast = false;
  var chart = null;

  function $(id) { return document.getElementById(id); }

  function showScreen(id) {
    var all = document.querySelectorAll(".screen");
    for (var i = 0; i < all.length; i++) all[i].classList.remove("on");
    $(id).classList.add("on");
    window.scrollTo(0, 0);
  }

  function dimScore(d) {
    var s = 0, c = 0;
    for (var i = 0; i < QS.length; i++) {
      if (QS[i].d === d) { s += (ans[i] !== null ? ans[i] : 0); c++; }
    }
    return Math.round((s / (c * 3)) * 20);
  }

  function renderQ() {
    var q = QS[curQ], dim = DIMS[q.d];
    $("prog-f").style.width = Math.round((curQ / 25) * 100) + "%";
    $("q-cnt").textContent = "Question " + (curQ + 1) + " / 25";
    var lbl = $("q-lbl");
    lbl.textContent = dim.name;
    lbl.style.color = dim.col;
    $("q-txt").textContent = q.q;

    var container = $("q-opts");
    container.innerHTML = "";
    for (var i = 0; i < q.o.length; i++) {
      var b = document.createElement("button");
      b.className = "opt" + (ans[curQ] === i ? " sel" : "");
      b.textContent = q.o[i];
      b.dataset.i = i;
      b.addEventListener("click", onOpt);
      container.appendChild(b);
    }

    $("btn-prev").style.display = curQ === 0 ? "none" : "inline-block";
    var nxt = $("btn-next");
    nxt.textContent = curQ === 24 ? "Voir mon r\u00e9sultat \u2192" : "Suivant \u2192";
    nxt.disabled = ans[curQ] === null;
  }

  function onOpt() {
    var i = parseInt(this.dataset.i, 10);
    ans[curQ] = i;
    var opts = $("q-opts").querySelectorAll(".opt");
    for (var j = 0; j < opts.length; j++) opts[j].classList.toggle("sel", j === i);
    $("btn-next").disabled = false;
  }

  function showDimScore(d, isLast) {
    ddIsLast = isLast;
    var sc = dimScore(d), dim = DIMS[d];
    var li = sc < 8 ? 0 : sc < 13 ? 1 : sc < 17 ? 2 : 3;
    var dn = $("dd-name");
    dn.textContent = dim.name;
    dn.style.color = dim.col;
    $("dd-num").textContent = sc;
    $("dd-pill").innerHTML = "<span class=\"lpill\" style=\"background:" + DLV[li].bg + ";color:" + DLV[li].tc + ";\">" + DLV[li].label + "</span>";
    $("dd-cmt").textContent = CMT[d][li];
    $("btn-dd-next").textContent = isLast ? "Acc\u00e9der \u00e0 mon rapport \u2192" : "Dimension suivante \u2192";
    showScreen("s-dim");
  }

  function buildReport() {
    var ds = [], sum = 0;
    for (var d = 0; d < 5; d++) { ds.push(dimScore(d)); sum += ds[d]; }
    var total = Math.round((sum / 5) * 5);
    var lv = LEVELS[0];
    for (var i = 0; i < LEVELS.length; i++) {
      if (total >= LEVELS[i].min && total <= LEVELS[i].max) { lv = LEVELS[i]; break; }
    }

    var scEl = $("rep-sc");
    scEl.textContent = total;
    scEl.style.color = lv.col;
    $("rep-lv").innerHTML = "<span class=\"lpill\" style=\"background:" + lv.bg + ";color:" + lv.tc + ";\">" + lv.label + "</span>";

    var rl = { DAF: "DAF", DC: "Directeur du cr\u00e9dit", DSI: "DSI", DR: "Directeur des risques" };
    var role = rl[prof.role] || "vous";
    $("rep-sm").textContent = "En tant que " + role + ", votre dispositif data pr\u00e9sente un niveau " + lv.label.toLowerCase() + ". " +
      (total < 60 ? "Des axes prioritaires ont \u00e9t\u00e9 identifi\u00e9s pour renforcer votre conformit\u00e9 et votre efficacit\u00e9." :
                    "Votre maturit\u00e9 data est un atout. Des optimisations cibl\u00e9es peuvent encore renforcer votre position.");

    var strong = 0, weak = 0;
    for (var i = 0; i < ds.length; i++) { if (ds[i] >= 14) strong++; if (ds[i] < 10) weak++; }
    $("rep-mc").innerHTML =
      "<div class=\"mc\" style=\"background:" + lv.bg + ";\"><div class=\"mc-l\">Score global</div><div class=\"mc-v\" style=\"color:" + lv.tc + ";\">" + total + "/100</div><div class=\"mc-s\">" + lv.label + "</div></div>" +
      "<div class=\"mc\"><div class=\"mc-l\">Points forts</div><div class=\"mc-v\">" + strong + " / 5</div><div class=\"mc-s\">dim. \u2265\u00a014/20</div></div>" +
      "<div class=\"mc\"><div class=\"mc-l\">\u00c0 am\u00e9liorer</div><div class=\"mc-v\">" + weak + " / 5</div><div class=\"mc-s\">dimensions prioritaires</div></div>";

    var bh = "";
    for (var i = 0; i < DIMS.length; i++) {
      bh += "<div class=\"dbar\"><div class=\"dbar-l\">" + DIMS[i].short + "</div>" +
            "<div class=\"dbar-t\"><div class=\"dbar-f\" style=\"width:" + Math.round(ds[i] / 20 * 100) + "%;background:" + DIMS[i].col + ";\"></div></div>" +
            "<div class=\"dbar-v\" style=\"color:" + DIMS[i].col + ";\">" + ds[i] + "/20</div></div>";
    }
    $("rep-bars").innerHTML = bh;

    var sorted = ds.map(function (s, i) { return { s: s, i: i }; }).sort(function (a, b) { return a.s - b.s; });
    var recs = [];
    for (var w = 0; w < sorted.length && recs.length < 3; w++) {
      var di = sorted[w].i;
      for (var r = 0; r < RECS[di].length && recs.length < 3; r++) {
        recs.push({ dim: DIMS[di], txt: RECS[di][r] });
      }
    }
    var sl = prof.size === "L" ? "grande institution" : prof.size === "M" ? "institution interm\u00e9diaire" : "institution de taille r\u00e9duite";
    var rh = "";
    for (var i = 0; i < recs.length; i++) {
      rh += "<div class=\"rec\" style=\"border-left-color:" + recs[i].dim.col + ";\">" +
            "<div class=\"rec-p\">Priorit\u00e9 " + (i + 1) + " \u00b7 " + recs[i].dim.short + "</div>" +
            "<div class=\"rec-t\">" + recs[i].txt + "</div>" +
            "<div class=\"rec-d\">Recommandation DP-Tech pour votre profil " + sl + " CEMAC.</div></div>";
    }
    $("rep-recs").innerHTML = rh;

    setTimeout(function () {
      var ctx = $("rc");
      if (!ctx || typeof Chart === "undefined") return;
      if (chart) { chart.destroy(); chart = null; }
      chart = new Chart(ctx, {
        type: "radar",
        data: {
          labels: DIMS.map(function (d) { return d.short; }),
          datasets: [{ label: "Score", data: ds, fill: true,
            backgroundColor: "rgba(29,158,117,0.15)", borderColor: "#1D9E75",
            borderWidth: 2, pointBackgroundColor: "#1D9E75", pointRadius: 5 }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { r: {
            min: 0, max: 20,
            ticks: { stepSize: 5, color: "#888780", font: { size: 10 }, backdropColor: "transparent" },
            grid: { color: "rgba(0,0,0,0.08)" },
            pointLabels: { color: "#444444", font: { size: 11, weight: "500" } },
            angleLines: { color: "rgba(0,0,0,0.08)" }
          }}
        }
      });
    }, 150);
  }

  function checkProfile() {
    var ok = prof.role && prof.size && prof.country;
    $("btn-startq").disabled = !ok;
  }

  document.addEventListener("DOMContentLoaded", function () {

    // Profile selection buttons
    ["role", "size", "country"].forEach(function (grp) {
      var btns = $("grp-" + grp).querySelectorAll(".sopt");
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
          var val = this.dataset.val;
          prof[grp] = val;
          var siblings = $("grp-" + grp).querySelectorAll(".sopt");
          for (var j = 0; j < siblings.length; j++) siblings[j].classList.remove("sel");
          this.classList.add("sel");
          checkProfile();
        });
      }
    });

    $("btn-intro").addEventListener("click", function () { showScreen("s-profile"); });
    $("btn-back").addEventListener("click", function () { showScreen("s-intro"); });

    $("btn-startq").addEventListener("click", function () {
      if (this.disabled) return;
      curQ = 0; renderQ(); showScreen("s-question");
    });

    $("btn-prev").addEventListener("click", function () {
      if (curQ > 0) { curQ--; renderQ(); }
    });

    $("btn-next").addEventListener("click", function () {
      if (ans[curQ] === null) return;
      var prevD = QS[curQ].d;
      var isLast = curQ === 24;
      var isDimEnd = isLast || QS[curQ + 1].d !== prevD;
      if (isDimEnd) { showDimScore(prevD, isLast); }
      else { curQ++; renderQ(); }
    });

    $("btn-dd-next").addEventListener("click", function () {
      if (ddIsLast) { showScreen("s-capture"); }
      else { curQ++; renderQ(); showScreen("s-question"); }
    });

    $("btn-report").addEventListener("click", function () { buildReport(); showScreen("s-report"); });
    $("btn-skip").addEventListener("click", function () { buildReport(); showScreen("s-report"); });

    $("btn-restart").addEventListener("click", function () {
      ans = new Array(25).fill(null);
      curQ = 0;
      prof = { role: null, size: null, country: null };
      if (chart) { chart.destroy(); chart = null; }
      var sopts = document.querySelectorAll(".sopt");
      for (var i = 0; i < sopts.length; i++) sopts[i].classList.remove("sel");
      $("btn-startq").disabled = true;
      showScreen("s-intro");
    });

  });

})();
