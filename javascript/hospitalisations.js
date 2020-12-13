/* variables globales */
var divEntete, tailleTableau, codeEtablissement, nomEtablissement, posEtabChoisi, specParEtab;

var d = new Date();
var n = d.getFullYear();
var xmlPatients = null;
var xmlEtab = null;
var xmlHosp = null;


/* ----------------------------------------- */
/* ---------- Lister les patients ---------- */
/* ----------------------------------------- */
function listerPatients(){
    $.ajax({
        type : "GET", // pour obtenir
        url : "xml/tab-patients.xml",
        dataType : "xml",
        success : function(validPatients) { // On valide si ça fonctionne 
            xmlPatients = validPatients;
            afficherPatients();
        },
        fail : function() { //si ça ne fonctionne pas
            alert("Il y a une erreur côté serveur avec le fichier tab-patients.xml");
        }
    });
}

function afficherPatients(){
    let tabPatients = xmlPatients.getElementsByTagName('patient');
    tailleTableau = tabPatients.length;
    let patient;
    effacer();// vider le tableau
    
    //Entête du tableau
    divEntete='<i class="fas fa-hospital-user"></i> Liste des patients';
    afficherEntete(divEntete); // afficher la nouvelle entête
    
    // remplir le tableau Patient
    /* Entête du tableau patients */
    let tableauPatient = document.createElement("TABLE");  // création d'un tableau // création d'une table
    tableauPatient.setAttribute("class","w3-table-all centrer-tableau mb-md shadow"); // ajouter des styles au tableau // ajouter un style au tableau
    let thead = document.createElement("THEAD"); // créer le thead // créer le thead
    thead.setAttribute("class","table-header-border"); // ajouter un style au thead
    let th = document.createElement("TH"); // créer un th
    let noDossier = document.createTextNode("No. dossier"); // création de texte
    th.appendChild(noDossier); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let leNom = document.createTextNode("Nom"); // création de texte
    th.appendChild(leNom); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let lePrenom = document.createTextNode("Prénom"); // création de texte
    th.appendChild(lePrenom); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let laDateDeNaissance = document.createTextNode("Date de naissance"); // création de texte
    th.appendChild(laDateDeNaissance); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let leSexe = document.createTextNode("Sexe"); // création de texte
    th.appendChild(leSexe); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead

    let tbody = document.createElement("TBODY"); // créer tbody
    let tr, td, tdTexte;

    /* Remplir les données du tableau */
    for (patient of tabPatients){
        tr = document.createElement("TR"); // créer une rangée
        td = document.createElement("TD"); // créer une cellule
        let dossier = patient.getElementsByTagName('dossier')[0].firstChild.nodeValue;  // aller chercher la donnée et lea mettre dans une variable
        tdTexte = document.createTextNode(dossier); // créer un noeud texte
        td.appendChild(tdTexte); //ajouter le texte au td
        tr.appendChild(td); // ajouter le td au tr
        
        td = document.createElement("TD"); // créer une cellule
        let nom = patient.getElementsByTagName('nom')[0].firstChild.nodeValue;  // aller chercher la donnée et lea mettre dans une variable
        tdTexte = document.createTextNode(nom); // créer un noeud texte
        td.appendChild(tdTexte); //ajouter le texte au td
        tr.appendChild(td); // ajouter le td au tr
        
        td = document.createElement("TD"); // créer une cellule
        let prenom = patient.getElementsByTagName('prenom')[0].firstChild.nodeValue;  // aller chercher la donnée et lea mettre dans une variable
        tdTexte = document.createTextNode(prenom); // créer un noeud texte
        td.appendChild(tdTexte); //ajouter le texte au td
        tr.appendChild(td); // ajouter le td au tr
        
        td = document.createElement("TD"); // créer une cellule
        let naissance = patient.getElementsByTagName('naissance')[0].firstChild.nodeValue;  // aller chercher la donnée et lea mettre dans une variable
        tdTexte = document.createTextNode(naissance); // créer un noeud texte
        td.appendChild(tdTexte); //ajouter le texte au td
        tr.appendChild(td); // ajouter le td au tr
        
        td = document.createElement("TD"); // créer une cellule
        let sexe = patient.getElementsByTagName('sexe')[0].firstChild.nodeValue;  // aller chercher la donnée et lea mettre dans une variable
        tdTexte = document.createTextNode(sexe); // créer un noeud texte
        td.appendChild(tdTexte); //ajouter le texte au td
        tr.appendChild(td); // ajouter le td au tr

        tbody.appendChild(tr); // ajouter le tr au tbody
    }
    tableauPatient.appendChild(thead); // ajouter le thead au tableau
    tableauPatient.appendChild(tbody) // ajouter le tbody au tableau
    document.getElementById("afficheTableau").appendChild(tableauPatient); // ajouter  le tableau dans l'espace prévu
    
    // afficher messages
    document.getElementById("champStatus").innerHTML = "Il y a <span class='vert'>" + tailleTableau + " patients</span> enregistrés dans la base de donnée.";
}



/* ----------------------------------------------- */
/* ---------- Lister les établissements ---------- */
/* ----------------------------------------------- */
function listerEtablissements(){
    $.ajax({
        type : "GET", // pour obtenir
        url : "xml/tab-etablissements.xml",
        dataType : "xml",
        success : function(validEtab) { // On valide si ça fonctionne 
            xmlEtab = validEtab;
            afficherEtablissements();
        },
        fail : function() { //si ça ne fonctionne pas
            alert("Il y a une erreur côté serveur avec le fichier tab-etablissements.xml");
        }
    });
}

function afficherEtablissements(){
    let tabEtablissements = xmlEtab.getElementsByTagName('etablissement');
    tailleTableau = tabEtablissements.length;
    let etab;
    effacer();// vider le tableau
    
    //Entête du tableau
    divEntete='<i class="far fa-hospital"></i> Liste des &eacute;tablissements';
    afficherEntete(divEntete); // affiher la nouvelle entête
    //No. &eacute;tablissement Nom Adresse Code Postal Téléphone

    //remplir le tableau des établissements
    /* Entête du tableau établissements */
    let tableauEtablissement = document.createElement("TABLE");  // création d'un tableau
    tableauEtablissement.setAttribute("class","w3-table-all centrer-tableau mb-md shadow"); // ajouter des styles au tableau
    let thead = document.createElement("THEAD"); // créer le thead // créer le thead
    thead.setAttribute("class","table-header-border"); // ajouter un style au thead
    let th = document.createElement("TH"); // créer un th
    let leNoEtab = document.createTextNode("No. établissement"); // créer un noeud texte
    th.appendChild(leNoEtab);  // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let leNom = document.createTextNode("Nom"); // créer un noeud texte
    th.appendChild(leNom); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let lAdresse = document.createTextNode("Adresse"); // créer un noeud texte
    th.appendChild(lAdresse); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let leCodePostal = document.createTextNode("Code Postal"); // créer un noeud texte
    th.appendChild(leCodePostal); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let leTelephone = document.createTextNode("Téléphone"); // créer un noeud texte
    th.appendChild(leTelephone); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead


    /* Remplir les données du tableau Etablissements */
    let tbody = document.createElement("TBODY"); // créer tbody
    let tr, td, tdTexte;
    for (etab of tabEtablissements) { // pour chaque etab dans tabEtablissements
        tr = document.createElement("TR"); // créer une rangée
        td = document.createElement("TD"); // créer une cellule
        let codeEtab = etab.getElementsByTagName('codeEtab')[0].firstChild.nodeValue;  // aller chercher la donnée et lea mettre dans une variable
        tdTexte = document.createTextNode(codeEtab); // créer un noeud texte
        td.appendChild(tdTexte); //ajouter le texte au td
        tr.appendChild(td); // ajouter le td au tr
        
        td = document.createElement("TD"); // créer une cellule
        let nomEtab = etab.getElementsByTagName('nomEtab')[0].firstChild.nodeValue;  // aller chercher la donnée et lea mettre dans une variable
        tdTexte = document.createTextNode(nomEtab); // créer un noeud texte
        td.appendChild(tdTexte); //ajouter le texte au td
        tr.appendChild(td); // ajouter le td au tr
        
        td = document.createElement("TD"); // créer une cellule
        let adresseEtab = etab.getElementsByTagName('adresseEtab')[0].firstChild.nodeValue;  // aller chercher la donnée et lea mettre dans une variable
        tdTexte = document.createTextNode(adresseEtab); // créer un noeud texte
        td.appendChild(tdTexte); //ajouter le texte au td
        tr.appendChild(td); // ajouter le td au tr
        
        td = document.createElement("TD"); // créer une cellule
        let postalEtab = etab.getElementsByTagName('postalEtab')[0].firstChild.nodeValue;  // aller chercher la donnée et lea mettre dans une variable
        tdTexte = document.createTextNode(postalEtab); // créer un noeud texte
        td.appendChild(tdTexte); //ajouter le texte au td
        tr.appendChild(td); // ajouter le td au tr
        
        td = document.createElement("TD"); // créer une cellule
        let telEtab = etab.getElementsByTagName('telEtab')[0].firstChild.nodeValue;  // aller chercher la donnée et lea mettre dans une variable
        tdTexte = document.createTextNode(telEtab); // créer un noeud texte
        td.appendChild(tdTexte); //ajouter le texte au td
        tr.appendChild(td); // ajouter le td au tr

        tbody.appendChild(tr); // ajouter le tr au tbody
    };
    tableauEtablissement.appendChild(thead); // ajouter le thead au tableau
    tableauEtablissement.appendChild(tbody) // ajouter le tbody au tableau
    document.getElementById("afficheTableau").appendChild(tableauEtablissement);

    // afficher message
    document.getElementById("champStatus").innerHTML =  "Il y a <span class='vert'>" + tailleTableau + " établissements</span> dans le réseau hospitalier.";
}



/* ------------------------------------------------- */
/* ---------- Lister les hospitalisations ---------- */
/* ------------------------------------------------- */
function listerHospitalisations(){
    $.ajax({
        type : "GET", // pour obtenir
        url : "xml/tab-hospitalisations.xml",
        dataType : "xml",
        success : function(validHosp) { // On valide si ça fonctionne 
            xmlHosp = validHosp;
            afficherHospitalisations();
        },
        fail : function() { //si ça ne fonctionne pas
            alert("Il y a une erreur côté serveur avec le fichier tab-hospitalisations.xml");
        }
    });
}

function afficherHospitalisations(){
    let tabHospitalisations = xmlHosp.getElementsByTagName('etablissement');
    tailleTableau = tabHospitalisations.length;
    let hospitalisations;
    effacer();// vider le tableau
    
    //Entête du tableau
    divEntete='<i class="fas fa-ambulance"></i> Liste des hospitalisations';
    afficherEntete(divEntete); // affiher la nouvelle entête

    // Remplir le tableau des hospitalisations
    /* Entête du tableau hospitalisations */
    let tableauHospitalisations = document.createElement("TABLE");  // création d'un tableau
    tableauHospitalisations.setAttribute("class","w3-table-all centrer-tableau mb-md shadow"); // ajouter des styles au tableau
    let thead = document.createElement("THEAD"); // créer le thead // créer le thead
    thead.setAttribute("class","table-header-border"); // ajouter un style au thead
    let th = document.createElement("TH"); // créer un th
    let leCodeEtab = document.createTextNode("Code établissement"); // créer un noeud texte
    th.appendChild(leCodeEtab); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let leNoDossier = document.createTextNode("No. Dossier Patient"); // créer un noeud texte
    th.appendChild(leNoDossier); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let laDateArrivee = document.createTextNode("Date arrivée"); // créer un noeud texte
    th.appendChild(laDateArrivee); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let laDateSortie = document.createTextNode("Date sortie"); // créer un noeud texte
    th.appendChild(laDateSortie); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let laSpecialite = document.createTextNode("Spécialité"); // créer un noeud texte
    th.appendChild(laSpecialite); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead

    /* Remplir les données du tableau Hospitalisations */
    let tbody = document.createElement("TBODY"); // créer tbody
    let tr, td, tdTexte;
    for (hospitalisations of tabHospitalisations) { // pour chaque hospitalisations dans le tableau tabHospitalisations
        tr = document.createElement("TR"); // créer une rangée
        td = document.createElement("TD"); // créer une cellule
        let codeEtab = hospitalisations.getElementsByTagName('codeEtab')[0].firstChild.nodeValue;  // aller chercher la donnée et lea mettre dans une variable
        tdTexte = document.createTextNode(codeEtab); // créer un noeud texte
        td.appendChild(tdTexte); //ajouter le texte au td
        tr.appendChild(td); // ajouter le td au tr
        
        td = document.createElement("TD"); // créer une cellule
        let dossier = hospitalisations.getElementsByTagName('dossier')[0].firstChild.nodeValue; // aller chercher la donnée et lea mettre dans une variable
        tdTexte = document.createTextNode(dossier); // créer un noeud texte
        td.appendChild(tdTexte); //ajouter le texte au td
        tr.appendChild(td); // ajouter le td au tr
        
        td = document.createElement("TD"); // créer une cellule
        let dateAdmission = hospitalisations.getElementsByTagName('dateAdmission')[0].firstChild.nodeValue; // aller chercher la donnée et lea mettre dans une variable
        tdTexte = document.createTextNode(dateAdmission); // créer un noeud texte
        td.appendChild(tdTexte); //ajouter le texte au td
        tr.appendChild(td); // ajouter le td au tr
        
        td = document.createElement("TD"); // créer une cellule
        let dateSortie = hospitalisations.getElementsByTagName('dateSortie')[0].firstChild.nodeValue; // aller chercher la donnée et lea mettre dans une variable
        tdTexte = document.createTextNode(dateSortie); // créer un noeud texte
        td.appendChild(tdTexte); //ajouter le texte au td
        tr.appendChild(td); // ajouter le td au tr
        
        td = document.createElement("TD"); // créer une cellule
        let specialite = hospitalisations.getElementsByTagName('specialite')[0].firstChild.nodeValue; // aller chercher la donnée et lea mettre dans une variable
        tdTexte = document.createTextNode(specialite); // créer un noeud texte
        td.appendChild(tdTexte); //ajouter le texte au td
        tr.appendChild(td); // ajouter le td au tr

        tbody.appendChild(tr); // ajouter le tr au tbody
    };
    tableauHospitalisations.appendChild(thead); // ajouter le thead au tableau
    tableauHospitalisations.appendChild(tbody) // ajouter le tbody au tableau;
    document.getElementById("afficheTableau").appendChild(tableauHospitalisations); // afficher le tableau dans l'espace prévu

    // afficher message
    document.getElementById("champStatus").innerHTML = "Il y a eu <span class='vert'>" + tailleTableau + " hospitalisations</span> depuis le début de Gestion Hospitalière Hébert.";
}



/* -------------------------------------------------------------- */
/* ---------- Lister les hospitalisations par patient  ---------- */
/* -------------------------------------------------------------- */
function selHosParPatients(){
    $.ajax({
        type : "GET", // pour obtenir
        url : "xml/tab-patients.xml",
        dataType : "xml",
        success : function(validPatients) { // On valide si ça fonctionne 
            xmlPatients = validPatients;
        },
        fail : function() { //si ça ne fonctionne pas
            alert("Il y a une erreur côté serveur avec le fichier tab-patients.xml");
        }
    });

    $.ajax({
        type : "GET", // pour obtenir
        url : "xml/tab-hospitalisations.xml",
        dataType : "xml",
        success : function(validHosp) { // On valide si ça fonctionne 
            xmlHosp = validHosp;
            remplirSelHosParPatients();
        },
        fail : function() { //si ça ne fonctionne pas
            alert("Il y a une erreur côté serveur avec le fichier tab-hospitalisations.xml");
        }
    });
    
}

/* remplir le sélecteur patient */
function remplirSelHosParPatients(){
    let selPatient = document.querySelector('#selectPatient');
    let tabPatients = xmlPatients.getElementsByTagName('patient');
    tailleTableau = tabPatients.length; // déterminer ta taille du tableau
    let patient;
    effacer();// vider le tableau
    
    //Entête du tableau
    divEntete='<i class="fas fa-procedures"></i> Hospitalisatons par patients';
    afficherEntete(divEntete);

    // remplir le sélecteur de patients
    document.getElementById("selectionPatient").className="visible"; // rendre le conteneur div visible
    
    selPatient.options.length = 0; // pour vider la liste
    document.getElementById("champStatus").innerHTML = "Choisir le <span class='vert'>Code Patient</span> pour afficher toutes ses hospitalisations";
    selPatient.options[selPatient.options.length]=new Option("Choisir un patient");
	for (patient of tabPatients) { // pour chaque patients dans le tableau patient
        let dossier = patient.getElementsByTagName('dossier')[0].firstChild.nodeValue; // aller chercher le no de dossier
        let nom = patient.getElementsByTagName('nom')[0].firstChild.nodeValue; // aller chercher le nom du patient
        let prenom = patient.getElementsByTagName('prenom')[0].firstChild.nodeValue; // aller chercher le nom du patient
        selPatient.options[selPatient.options.length]=new Option(dossier + " - " + prenom + " " + nom); // ajouter les infos dans le sélecteur
	}
}

/* Afficher les attributs du patient sélectionné dans des tableaux */
function afficherInfosDuPatient(patientSelect) {
    document.getElementById("afficheTableau").innerHTML=""; // vider l'espace d'affichage
    posPatientChoisi = patientSelect.selectedIndex-1; // isoler l'index 
    let tabPatients = xmlPatients.getElementsByTagName('patient'); // aller chercher les informations patients
    let tabHospitalisations = xmlHosp.getElementsByTagName('etablissement'); // aller chercher les informations des établissements
    let patientChoisi = tabPatients[posPatientChoisi]; //sélectionner le patient choisi à l'aide de l'indice dans le sélecteur
    let nominParGenre = "";
    let compteurHospitalisations = 0 ;
    let compteurSpecialite = 0 ;
    let listeSpecialite = "";
    let categoriePatient = "";
    let tableauParPatient, tableauHospParPatient, dossierPatient, hospPatient, agePatient, anneeNaissance;
    
    // afficher les données du patient
    /* Entête du tableau patients */
    tableauParPatient = document.createElement("TABLE");  // création d'un tableau
    tableauParPatient.setAttribute("class","w3-table-all centrer-tableau mb-md shadow"); // ajouter des styles au tableau
    let thead = document.createElement("THEAD"); // créer le thead // créer le thead
    thead.setAttribute("class","table-header-border"); // ajouter un style au thead
    let th = document.createElement("TH"); // créer un th
    let noDossier = document.createTextNode("No. dossier"); // création de texte
    th.appendChild(noDossier); // ajouter texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let leNom = document.createTextNode("Nom"); // création de texte
    th.appendChild(leNom); // ajouter texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let lePrenom = document.createTextNode("Prénom"); // création de texte
    th.appendChild(lePrenom); // ajouter texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let laDateDeNaissance = document.createTextNode("Date de naissance"); // création de texte
    th.appendChild(laDateDeNaissance); // ajouter texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let leSexe = document.createTextNode("Sexe"); // création de texte
    th.appendChild(leSexe); // ajouter texte au th
    thead.appendChild(th);  // ajouter le th au thead

    /* Remplir les données du tableau patient */
    let tbody = document.createElement("TBODY"); // créer tbody
    let tr, td, tdTexte;
    tr = document.createElement("TR"); // créer une rangée
    td = document.createElement("TD"); // créer une cellule
    let dossier = patientChoisi.getElementsByTagName('dossier')[0].firstChild.nodeValue; // aller chercher la donnée et lea mettre dans une variable
    tdTexte = document.createTextNode(dossier); // création de texte
    td.appendChild(tdTexte); //ajouter le texte au td
    tr.appendChild(td); // ajouter le td au tr
    
    td = document.createElement("TD"); // créer une cellule
    let nom = patientChoisi.getElementsByTagName('nom')[0].firstChild.nodeValue; // aller chercher la donnée et lea mettre dans une variable
    tdTexte = document.createTextNode(nom); // création de texte
    td.appendChild(tdTexte); //ajouter le texte au td
    tr.appendChild(td); // ajouter le td au tr
    
    td = document.createElement("TD"); // créer une cellule
    let prenom = patientChoisi.getElementsByTagName('prenom')[0].firstChild.nodeValue; // aller chercher la donnée et lea mettre dans une variable
    tdTexte = document.createTextNode(prenom); // création de texte
    td.appendChild(tdTexte); //ajouter le texte au td
    tr.appendChild(td); // ajouter le td au tr
        
    td = document.createElement("TD"); // créer une cellule
    let naissance = patientChoisi.getElementsByTagName('naissance')[0].firstChild.nodeValue; // aller chercher la donnée et lea mettre dans une variable
    tdTexte = document.createTextNode(naissance); // création de texte
    td.appendChild(tdTexte); //ajouter le texte au td
    tr.appendChild(td); // ajouter le td au tr
    
    td = document.createElement("TD"); // créer une cellule
    let sexe = patientChoisi.getElementsByTagName('sexe')[0].firstChild.nodeValue; // aller chercher la donnée et lea mettre dans une variable
    tdTexte = document.createTextNode(sexe); // création de texte
    td.appendChild(tdTexte); //ajouter le texte au td
    tr.appendChild(td); // ajouter le td au tr

    tbody.appendChild(tr); // ajouter le tr au tbody
    tableauParPatient.appendChild(thead); // ajouter le thead au tableau
    tableauParPatient.appendChild(tbody) // ajouter le tbody au tableau
    

    // afficher les données d'hospitalisation du patient
    dossierPatient = dossier; 
    /* Entête du tableau hospitalisations */
    tableauHospParPatient = document.createElement("TABLE");  // création d'un tableau
    tableauHospParPatient.setAttribute("class","w3-table-all centrer-tableau mb-md shadow"); // ajouter des styles au tableau
    thead = document.createElement("THEAD"); // créer le thead // créer le thead
    thead.setAttribute("class","table-header-border"); // ajouter un style au thead
    th = document.createElement("TH"); // créer un th
    let leCodeEtab = document.createTextNode("Code établissement"); // création de texte
    th.appendChild(leCodeEtab); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let leNoDossier = document.createTextNode("No. Dossier Patient"); // création de texte
    th.appendChild(leNoDossier); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let laDateArrivee = document.createTextNode("Date arrivée"); // création de texte
    th.appendChild(laDateArrivee); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let laDateSortie = document.createTextNode("Date sortie"); // création de texte
    th.appendChild(laDateSortie); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let laSpecialite = document.createTextNode("Spécialité"); // création de texte
    th.appendChild(laSpecialite); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead

    /* Remplir les données du tableau Hospitalisations*/
    tbody = document.createElement("TBODY"); // créer tbody
    for (hospPatient of tabHospitalisations) { // pour chaque hospitalisations dans le tableau tabHospitalisations
        let codeEtab = hospPatient.getElementsByTagName('codeEtab')[0].firstChild.nodeValue;
        let dossierHosp = hospPatient.getElementsByTagName('dossier')[0].firstChild.nodeValue;
        let dateAdmission = hospPatient.getElementsByTagName('dateAdmission')[0].firstChild.nodeValue;
        let dateSortie = hospPatient.getElementsByTagName('dateSortie')[0].firstChild.nodeValue;
        let specialite = hospPatient.getElementsByTagName('specialite')[0].firstChild.nodeValue;
        if (dossierHosp == dossierPatient){
            compteurHospitalisations++;

            tr = document.createElement("TR"); // créer une rangée
            td = document.createElement("TD"); // créer une cellule
            tdTexte = document.createTextNode(codeEtab); // création de texte
            td.appendChild(tdTexte); //ajouter le texte au td
            tr.appendChild(td); // ajouter le td au tr
            
            td = document.createElement("TD"); // créer une cellule
            tdTexte = document.createTextNode(dossierHosp); // création de texte
            td.appendChild(tdTexte); //ajouter le texte au td
            tr.appendChild(td); // ajouter le td au tr
            
            td = document.createElement("TD"); // créer une cellule
            tdTexte = document.createTextNode(dateAdmission); // création de texte
            td.appendChild(tdTexte); //ajouter le texte au td
            tr.appendChild(td); // ajouter le td au tr
            
            td = document.createElement("TD"); // créer une cellule
            tdTexte = document.createTextNode(dateSortie); // création de texte
            td.appendChild(tdTexte); //ajouter le texte au td
            tr.appendChild(td); // ajouter le td au tr
            
            td = document.createElement("TD"); // créer une cellule
            tdTexte = document.createTextNode(specialite); // création de texte
            td.appendChild(tdTexte); //ajouter le texte au td
            tr.appendChild(td); // ajouter le td au tr

            tbody.appendChild(tr); // ajouter le tr au tbody

            if (!listeSpecialite.includes(specialite)){
                compteurSpecialite++
                if (compteurSpecialite > 1){ //si il y en a plus que un, ajouter une virgule entre
                    listeSpecialite += ", "
                }
                listeSpecialite += specialite;
            }
        }
    }
    
    tableauHospParPatient.appendChild(thead); // ajouter le thead au tableau
    tableauHospParPatient.appendChild(tbody) // ajouter le tbody au tableau;
    /** */

    // déterminer de quel Sexe est le patient pour le nommer correctement
    if (sexe == "F"){
        nominParGenre = "La patiente";
    } else {
        nominParGenre = "Le patient";
    }
    // Déterminer l'âge du patient
    anneeNaissance = naissance; // aller chercher la chaîne de caractère de la date de naissance
    anneeNaissance = anneeNaissance.replace(/.(?=.{4})/g, ''); // garder seulement les 4 derniers caractères pour obtenir l'année de naissance
    agePatient = n - parseInt(anneeNaissance); // calculer l'âge du patient
    if (agePatient >= 70){  // si le patient a plus de 70 ans ajouter un message d'alerte
        categoriePatient = "<br><span class='text-center mb-sm rouge uppercase'>Attention, " + nominParGenre + " a " + agePatient + " ans.</span> Les personnes âgées sont plus à risque de développer des complications.</span></span>";
    }

    // afficher message et le tableau
    if (compteurHospitalisations == 0){ // si il n'y a eu aucune hospitalisation
        document.getElementById("afficheTableau").appendChild(tableauParPatient); // afficher le tableau dans l'espace prévu
        document.getElementById("champStatus").innerHTML = "<span class='rouge'>" + nominParGenre + " " + prenom + " " + nom + " n'a pas encore été hospitalisé.</span>" + categoriePatient;
    } else {
        document.getElementById("afficheTableau").appendChild(tableauParPatient);
        document.getElementById("afficheTableau").appendChild(tableauHospParPatient); // afficher le tableau dans l'espace prévu
        document.getElementById("champStatus").innerHTML = nominParGenre + " <span class='vert'>" + prenom + " " + nom + "</span> a été hospitalisé <span class='vert'>" + compteurHospitalisations + " fois</span> (" + listeSpecialite + ")." + categoriePatient;
    }
}

/* --------------------------------------------------------------------------------------- */
/* ---------- Lister les hospitalisations par établissements et par spécialités ---------- */
/* --------------------------------------------------------------------------------------- */
/* Vérification XML */
function selHosParEtab(){
    $.ajax({
        type : "GET", // pour obtenir
        url : "xml/tab-etablissements.xml",
        dataType : "xml",
        success : function(validEtab) { // On valide si ça fonctionne 
            xmlEtab = validEtab;
        },
        fail : function() { //si ça ne fonctionne pas
            alert("Il y a une erreur côté serveur avec le fichier tab-etablissements.xml");
        }
    });
    $.ajax({
        type : "GET", // pour obtenir
        url : "xml/tab-hospitalisations.xml",
        dataType : "xml",
        success : function(validHosp) { // On valide si ça fonctionne 
            xmlHosp = validHosp;
            remplirSelHosParEtab();
        },
        fail : function() { //si ça ne fonctionne pas
            alert("Il y a une erreur côté serveur avec le fichier tab-hospitalisations.xml");
        }
    });
}

/* Remplir le sélecteur des établissements */
function remplirSelHosParEtab(){
    let tabEtablissements = xmlEtab.getElementsByTagName('etablissement');
    let etab, selEtab;
    effacer();// vider le tableau
    
    //Entête du tableau
    divEntete='<i class="fas fa-clinic-medical"></i> Hospitalisation par &eacute;tablissement et par sp&eacute;cialit&eacute;';
    afficherEntete(divEntete);
    document.getElementById("champStatus").innerHTML = "Choisir le <span class='vert'>Code de l'établissement</span> pour débuter";

    // remplir le sélecteur d'établissements
    document.getElementById("selectEtabSpecialite").className="visible"; // rendre le conteneur div visible
    selEtab=document.querySelector('#selectEtablissement'); // aller chercher le sélecteur et le mettre dans une variable
    selEtab.options.length = 0; // pour vider la liste
    selEtab.options[selEtab.options.length]=new Option("Choisir un établissement"); // ajouter texte à la première option du sélect
	for (etab of tabEtablissements) { // pour chaque propriété dans le tableau Etablissement, ajouter dans la liste déroulante le code de l'établissement et le nom de l'établissement
        let codeEtab = etab.getElementsByTagName('codeEtab')[0].firstChild.nodeValue;
        let nomEtab = etab.getElementsByTagName('nomEtab')[0].firstChild.nodeValue;    
        selEtab.options[selEtab.options.length]=new Option(codeEtab + " - " + nomEtab);
    }
}

/* remplir le sélecteur des spécialités */
function remplirSpecialites(hospitSelect) {
    posEtabChoisi = hospitSelect.selectedIndex-1;
    let tabEtablissements = xmlEtab.getElementsByTagName('etablissement');
    let tabHospitalisations = xmlHosp.getElementsByTagName('etablissement'); 
    let etabChoisi = tabEtablissements[posEtabChoisi];
    let nomEtablissement = etabChoisi.getElementsByTagName('nomEtab')[0].firstChild.nodeValue; 
    let codeEtablissement = etabChoisi.getElementsByTagName('codeEtab')[0].firstChild.nodeValue; 
    let selSpecial, chaineSpec = "", compteurSpecialite = 0;
    document.getElementById("afficheTableau").innerHTML="";  // vider l'espace
    document.getElementById("champStatus").innerHTML = "Choisir ensuite la <span class='vert'>Spécialité</span> à afficher"; // afficher les instructions
    document.getElementById("selectSpecialite").className="selSpecialVisible"; // rendre le select visible
    
    // remplir le sélecteur des spécialités
    selSpecial=document.querySelector('#selectSpecialite');
    selSpecial.options.length = 0; // pour vider la liste
    selSpecial.options[selSpecial.options.length]=new Option("Choisir une spécialité"); // ajouter texte à la première option du sélect
    
    for (hosp of tabHospitalisations){ // pour chaque propriété dans la tabHospitalisation
        let codeEtabHosp = hosp.getElementsByTagName('codeEtab')[0].firstChild.nodeValue;  // aller chercher la donnée et lea mettre dans une variable
        let specialite = hosp.getElementsByTagName('specialite')[0].firstChild.nodeValue;  // aller chercher la donnée et lea mettre dans une variable
        if (codeEtabHosp == codeEtablissement){ //si la propriété codeEtab est de la même valeur que celui sélectionné dans le sélecteur d'établissement
            if (!chaineSpec.includes(specialite)){ // si la propriété spécialité ne se retrouve pas déjà dans la liste
                chaineSpec += specialite; // ajouter la propriété dans une variable pour faire la validation
                selSpecial.options[selSpecial.options.length]=new Option(specialite); // ajouter la spécialité dans le sélecteur
                compteurSpecialite++; // incrémenter le compteur de spécialité
            }
        } 
    }
    // afficher message
    if (compteurSpecialite == 0){ // si il n'y a pas de spécialité pour cet établissement, afficher le message
        document.getElementById("champStatus").innerHTML = "Il n'y a eu <span class='rouge'>aucune hospitalisation</span> dans l'établissement <span class='rouge'>" + codeEtablissement + " (" + nomEtablissement + ")</span>.";
        document.getElementById("selectSpecialite").className="invisible"; // rendre le div du sélecteur invisible
    }

}

function afficherTableauParSpecialites(specialitesSelect) {
    let specialiteChoisi = specialitesSelect.options[specialitesSelect.selectedIndex].text; // mettre le texte du sélecteur dans une variable
    let tabEtablissements = xmlEtab.getElementsByTagName('etablissement');
    let tabHospitalisations = xmlHosp.getElementsByTagName('etablissement'); 
    let etabChoisi = tabEtablissements[posEtabChoisi];
    let compteurSpecialite = 0;
    document.getElementById("afficheTableau").innerHTML=""; // vider l'espace d'affichage
    // afficher le tableau tabEtablissement
    /* Entête du tableau établissements */
    let tableauEtablissement = document.createElement("TABLE");  // création d'un tableau
    tableauEtablissement.setAttribute("class","w3-table-all centrer-tableau mb-md shadow"); // ajouter des styles au tableau
    let thead = document.createElement("THEAD"); // créer le thead // créer le thead
    thead.setAttribute("class","table-header-border"); // ajouter un style au thead
    let th = document.createElement("TH"); // créer un th
    let leNoEtab = document.createTextNode("No. établissement"); // création de texte
    th.appendChild(leNoEtab); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let leNom = document.createTextNode("Nom"); // création de texte
    th.appendChild(leNom); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let lAdresse = document.createTextNode("Adresse"); // création de texte
    th.appendChild(lAdresse); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let leCodePostal = document.createTextNode("Code Postal"); // création de texte
    th.appendChild(leCodePostal); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let leTelephone = document.createTextNode("Téléphone"); // création de texte
    th.appendChild(leTelephone); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead

    /* Remplir les données du tableau des Établissements*/
    let tbody = document.createElement("TBODY"); // créer tbody
    let tr, td, tdTexte;
    tr = document.createElement("TR"); // créer une rangée
    td = document.createElement("TD"); // créer une cellule
    let codeEtab = etabChoisi.getElementsByTagName('codeEtab')[0].firstChild.nodeValue; // aller chercher la donnée et lea mettre dans une variable
    tdTexte = document.createTextNode(codeEtab); // création de texte
    td.appendChild(tdTexte); //ajouter le texte au td
    tr.appendChild(td); // ajouter le td au tr
        
    td = document.createElement("TD"); // créer une cellule
    let nomEtab = etabChoisi.getElementsByTagName('nomEtab')[0].firstChild.nodeValue; // aller chercher la donnée et lea mettre dans une variable
    tdTexte = document.createTextNode(nomEtab); // création de texte
    td.appendChild(tdTexte); //ajouter le texte au td
    tr.appendChild(td); // ajouter le td au tr
        
    td = document.createElement("TD"); // créer une cellule
    let adresseEtab = etabChoisi.getElementsByTagName('adresseEtab')[0].firstChild.nodeValue; // aller chercher la donnée et lea mettre dans une variable
    tdTexte = document.createTextNode(adresseEtab); // création de texte
    td.appendChild(tdTexte); //ajouter le texte au td
    tr.appendChild(td); // ajouter le td au tr
        
    td = document.createElement("TD"); // créer une cellule
    let postalEtab = etabChoisi.getElementsByTagName('postalEtab')[0].firstChild.nodeValue; // aller chercher la donnée et lea mettre dans une variable
    tdTexte = document.createTextNode(postalEtab);  // création de texte
    td.appendChild(tdTexte); //ajouter le texte au td
    tr.appendChild(td); // ajouter le td au tr
        
    td = document.createElement("TD"); // créer une cellule
    let telEtab = etabChoisi.getElementsByTagName('telEtab')[0].firstChild.nodeValue; // aller chercher la donnée et lea mettre dans une variable
    tdTexte = document.createTextNode(telEtab); // création de texte
    td.appendChild(tdTexte); //ajouter le texte au td
    tr.appendChild(td); // ajouter le td au tr

    tbody.appendChild(tr); // ajouter le tr au tbody
    tableauEtablissement.appendChild(thead); // ajouter le thead au tableau
    tableauEtablissement.appendChild(tbody) // ajouter le tbody au tableau;

    // afficher les données d'hospitalisation en rapport à l'établissement et à la spécialité
    /* Entête du tableau hospitalisations */
    let tableauParSpecialite = document.createElement("TABLE");  // création d'un tableau
    tableauParSpecialite.setAttribute("class","w3-table-all centrer-tableau mb-md shadow"); // ajouter des styles au tableau
    thead = document.createElement("THEAD"); // créer le thead // créer le thead
    thead.setAttribute("class","table-header-border"); // ajouter un style au thead
    th = document.createElement("TH"); // créer un th
    let leCodeEtab = document.createTextNode("Code établissement"); // création de texte
    th.appendChild(leCodeEtab); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let leNoDossier = document.createTextNode("No. Dossier Patient"); // création de texte
    th.appendChild(leNoDossier); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let laDateArrivee = document.createTextNode("Date arrivée"); // création de texte
    th.appendChild(laDateArrivee); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let laDateSortie = document.createTextNode("Date sortie"); // création de texte
    th.appendChild(laDateSortie); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead
    th = document.createElement("TH"); // créer un th
    let laSpecialite = document.createTextNode("Spécialité"); // création de texte
    th.appendChild(laSpecialite); // ajouter le texte au th
    thead.appendChild(th);  // ajouter le th au thead

    // remplir les données du tableau Hospitalisations par spécialités
    tbody = document.createElement("TBODY"); // créer tbody
    for (prop of tabHospitalisations) { // pour chaque hospitalisations dans le tableau tabHospitalisations
        let codeEtabHosp = prop.getElementsByTagName('codeEtab')[0].firstChild.nodeValue;
        let dossierHosp = prop.getElementsByTagName('dossier')[0].firstChild.nodeValue;
        let dateAdmission = prop.getElementsByTagName('dateAdmission')[0].firstChild.nodeValue;
        let dateSortie = prop.getElementsByTagName('dateSortie')[0].firstChild.nodeValue;
        let specialite = prop.getElementsByTagName('specialite')[0].firstChild.nodeValue;

        if (codeEtabHosp == codeEtab){
            if (specialite == specialiteChoisi){
                compteurSpecialite++;
                tr = document.createElement("TR"); // créer une rangée
                td = document.createElement("TD"); // créer une cellule
                tdTexte = document.createTextNode(codeEtab); // création de texte
                td.appendChild(tdTexte); //ajouter le texte au td
                tr.appendChild(td); // ajouter le td au tr
                
                td = document.createElement("TD"); // créer une cellule
                tdTexte = document.createTextNode(dossierHosp); // création de texte
                td.appendChild(tdTexte); //ajouter le texte au td
                tr.appendChild(td); // ajouter le td au tr
                
                td = document.createElement("TD"); // créer une cellule
                tdTexte = document.createTextNode(dateAdmission); // création de texte
                td.appendChild(tdTexte); //ajouter le texte au td
                tr.appendChild(td); // ajouter le td au tr
                
                td = document.createElement("TD"); // créer une cellule
                tdTexte = document.createTextNode(dateSortie); // création de texte
                td.appendChild(tdTexte); //ajouter le texte au td
                tr.appendChild(td); // ajouter le td au tr
                
                td = document.createElement("TD"); // créer une cellule
                tdTexte = document.createTextNode(specialite); // création de texte
                td.appendChild(tdTexte); //ajouter le texte au td
                tr.appendChild(td); // ajouter le td au tr

                tbody.appendChild(tr); // ajouter le tr au tbody
            }
        }
    }
    tableauParSpecialite.appendChild(thead); // ajouter le thead au tableau
    tableauParSpecialite.appendChild(tbody) // ajouter le tbody au tableau
    // afficher
    document.getElementById("afficheTableau").appendChild(tableauEtablissement);
    document.getElementById("afficheTableau").appendChild(tableauParSpecialite); // afficher le tableau dans l'espace prévu
    document.getElementById("champStatus").innerHTML = "Il y a eu <span class='vert'>" + compteurSpecialite + " hospitalisations</span> à l'établissement <span class='vert'> " + codeEtab + " (" + nomEtab + ")</span> pour la spécialité <span class='vert'>" + specialiteChoisi + "</span>.";

}

/* --------------------------------------------------------------------------------------- */
/* ------------------------------ vider la section tableau ------------------------------- */
/* --------------------------------------------------------------------------------------- */
function effacer(){
    document.getElementById("afficheTableau").innerHTML=""; // vider l'espace d'affichage
    document.getElementById("entete").className="invisible"; // rendre l'entête invisible
    document.getElementById("selectionPatient").className="invisible"; // rendre le div du sélecteur invisible
    document.getElementById("selectEtabSpecialite").className="invisible"; // rendre le div du sélecteur invisible
}


/* --------------------------------------------------------------------------------------- */
/* -------------------------- afficher dans la section tableau --------------------------- */
/* --------------------------------------------------------------------------------------- */
function afficherEntete(contenu){
    document.getElementById("enteteTitre").innerHTML = contenu;
    document.getElementById("entete").className="visible";
}