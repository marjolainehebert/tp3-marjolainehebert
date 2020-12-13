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
    let tableauPatient = document.createElement("TABLE"); 
    tableauPatient.setAttribute("class","w3-table-all centrer-tableau mb-md shadow");
    let thead = document.createElement("THEAD");
    thead.setAttribute("class","table-header-border");
    let th = document.createElement("TH");
    let noDossier = document.createTextNode("No. dossier");
    th.appendChild(noDossier); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let leNom = document.createTextNode("Nom");
    th.appendChild(leNom); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let lePrenom = document.createTextNode("Prénom");
    th.appendChild(lePrenom); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let laDateDeNaissance = document.createTextNode("Date de naissance");
    th.appendChild(laDateDeNaissance); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let leSexe = document.createTextNode("Sexe");
    th.appendChild(leSexe); 
    thead.appendChild(th); 

    let tbody = document.createElement("TBODY");
    let tr, td, tdTexte;

    /* Remplir les données du tableau */
    for (patient of tabPatients){
        tr = document.createElement("TR");
        td = document.createElement("TD");
        let dossier = patient.getElementsByTagName('dossier')[0].firstChild.nodeValue;
        tdTexte = document.createTextNode(dossier);
        td.appendChild(tdTexte);
        tr.appendChild(td);
        
        td = document.createElement("TD");
        let nom = patient.getElementsByTagName('nom')[0].firstChild.nodeValue;
        tdTexte = document.createTextNode(nom);
        td.appendChild(tdTexte);
        tr.appendChild(td);
        
        td = document.createElement("TD");
        let prenom = patient.getElementsByTagName('prenom')[0].firstChild.nodeValue;
        tdTexte = document.createTextNode(prenom);
        td.appendChild(tdTexte);
        tr.appendChild(td);
        
        td = document.createElement("TD");
        let naissance = patient.getElementsByTagName('naissance')[0].firstChild.nodeValue;
        tdTexte = document.createTextNode(naissance);
        td.appendChild(tdTexte);
        tr.appendChild(td);
        
        td = document.createElement("TD");
        let sexe = patient.getElementsByTagName('sexe')[0].firstChild.nodeValue;
        tdTexte = document.createTextNode(sexe);
        td.appendChild(tdTexte);
        tr.appendChild(td);

        tbody.appendChild(tr);
    }
    tableauPatient.appendChild(thead);
    tableauPatient.appendChild(tbody)
    document.getElementById("afficheTableau").appendChild(tableauPatient);
    
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
    let tableauEtablissement = document.createElement("TABLE"); 
    tableauEtablissement.setAttribute("class","w3-table-all centrer-tableau mb-md shadow");
    let thead = document.createElement("THEAD");
    thead.setAttribute("class","table-header-border");
    let th = document.createElement("TH");
    let leNoEtab = document.createTextNode("No. établissement");
    th.appendChild(leNoEtab); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let leNom = document.createTextNode("Nom");
    th.appendChild(leNom); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let lAdresse = document.createTextNode("Adresse");
    th.appendChild(lAdresse); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let leCodePostal = document.createTextNode("Code Postal");
    th.appendChild(leCodePostal); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let leTelephone = document.createTextNode("Téléphone");
    th.appendChild(leTelephone); 
    thead.appendChild(th); 


    /* Remplir les données du tableau Etablissements */
    let tbody = document.createElement("TBODY");
    let tr, td, tdTexte;
    for (etab of tabEtablissements) { // pour chaque etab dans tabEtablissements
        tr = document.createElement("TR");
        td = document.createElement("TD");
        let codeEtab = etab.getElementsByTagName('codeEtab')[0].firstChild.nodeValue;
        tdTexte = document.createTextNode(codeEtab);
        td.appendChild(tdTexte);
        tr.appendChild(td);
        
        td = document.createElement("TD");
        let nomEtab = etab.getElementsByTagName('nomEtab')[0].firstChild.nodeValue;
        tdTexte = document.createTextNode(nomEtab);
        td.appendChild(tdTexte);
        tr.appendChild(td);
        
        td = document.createElement("TD");
        let adresseEtab = etab.getElementsByTagName('adresseEtab')[0].firstChild.nodeValue;
        tdTexte = document.createTextNode(adresseEtab);
        td.appendChild(tdTexte);
        tr.appendChild(td);
        
        td = document.createElement("TD");
        let postalEtab = etab.getElementsByTagName('postalEtab')[0].firstChild.nodeValue;
        tdTexte = document.createTextNode(postalEtab);
        td.appendChild(tdTexte);
        tr.appendChild(td);
        
        td = document.createElement("TD");
        let telEtab = etab.getElementsByTagName('telEtab')[0].firstChild.nodeValue;
        tdTexte = document.createTextNode(telEtab);
        td.appendChild(tdTexte);
        tr.appendChild(td);

        tbody.appendChild(tr);
    };
    tableauEtablissement.appendChild(thead);
    tableauEtablissement.appendChild(tbody)
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
    let tableauHospitalisations = document.createElement("TABLE"); 
    tableauHospitalisations.setAttribute("class","w3-table-all centrer-tableau mb-md shadow");
    let thead = document.createElement("THEAD");
    thead.setAttribute("class","table-header-border");
    let th = document.createElement("TH");
    let leCodeEtab = document.createTextNode("Code établissement");
    th.appendChild(leCodeEtab); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let leNoDossier = document.createTextNode("No. Dossier Patient");
    th.appendChild(leNoDossier); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let laDateArrivee = document.createTextNode("Date arrivée");
    th.appendChild(laDateArrivee); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let laDateSortie = document.createTextNode("Date sortie");
    th.appendChild(laDateSortie); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let laSpecialite = document.createTextNode("Spécialité");
    th.appendChild(laSpecialite); 
    thead.appendChild(th); 

    /* Remplir les données du tableau Hospitalisations */
    let tbody = document.createElement("TBODY");
    let tr, td, tdTexte;
    for (hospitalisations of tabHospitalisations) { // pour chaque hospitalisations dans le tableau tabHospitalisations
        tr = document.createElement("TR");
        td = document.createElement("TD");
        let codeEtab = hospitalisations.getElementsByTagName('codeEtab')[0].firstChild.nodeValue;
        tdTexte = document.createTextNode(codeEtab);
        td.appendChild(tdTexte);
        tr.appendChild(td);
        
        td = document.createElement("TD");
        let dossier = hospitalisations.getElementsByTagName('dossier')[0].firstChild.nodeValue;
        tdTexte = document.createTextNode(dossier);
        td.appendChild(tdTexte);
        tr.appendChild(td);
        
        td = document.createElement("TD");
        let dateAdmission = hospitalisations.getElementsByTagName('dateAdmission')[0].firstChild.nodeValue;
        tdTexte = document.createTextNode(dateAdmission);
        td.appendChild(tdTexte);
        tr.appendChild(td);
        
        td = document.createElement("TD");
        let dateSortie = hospitalisations.getElementsByTagName('dateSortie')[0].firstChild.nodeValue;
        tdTexte = document.createTextNode(dateSortie);
        td.appendChild(tdTexte);
        tr.appendChild(td);
        
        td = document.createElement("TD");
        let specialite = hospitalisations.getElementsByTagName('specialite')[0].firstChild.nodeValue;
        tdTexte = document.createTextNode(specialite);
        td.appendChild(tdTexte);
        tr.appendChild(td);

        tbody.appendChild(tr);
    };
    tableauHospitalisations.appendChild(thead);
    tableauHospitalisations.appendChild(tbody);
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
    tailleTableau = tabPatients.length;
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
	for (patient of tabPatients) {
        let dossier = patient.getElementsByTagName('dossier')[0].firstChild.nodeValue;
        let nom = patient.getElementsByTagName('nom')[0].firstChild.nodeValue;
        let prenom = patient.getElementsByTagName('prenom')[0].firstChild.nodeValue;
        selPatient.options[selPatient.options.length]=new Option(dossier + " - " + prenom + " " + nom);
	}
}

/* Afficher les attributs du patient sélectionné dans des tableaux */
function afficherInfosDuPatient(patientSelect) {
    document.getElementById("afficheTableau").innerHTML=""; // vider l'espace d'affichage
    posPatientChoisi = patientSelect.selectedIndex-1;
    let tabPatients = xmlPatients.getElementsByTagName('patient');
    let tabHospitalisations = xmlHosp.getElementsByTagName('etablissement');
    let patientChoisi = tabPatients[posPatientChoisi];
    let nominParGenre = "";
    let compteurHospitalisations = 0 ;
    let compteurSpecialite = 0 ;
    let listeSpecialite = "";
    let categoriePatient = "";
    let tableauParPatient, tableauHospParPatient, dossierPatient, hospPatient, agePatient, anneeNaissance;
    
    // afficher les données du patient
    /* Entête du tableau patients */
    tableauParPatient = document.createElement("TABLE"); 
    tableauParPatient.setAttribute("class","w3-table-all centrer-tableau mb-md shadow");
    let thead = document.createElement("THEAD");
    thead.setAttribute("class","table-header-border");
    let th = document.createElement("TH");
    let noDossier = document.createTextNode("No. dossier");
    th.appendChild(noDossier); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let leNom = document.createTextNode("Nom");
    th.appendChild(leNom); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let lePrenom = document.createTextNode("Prénom");
    th.appendChild(lePrenom); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let laDateDeNaissance = document.createTextNode("Date de naissance");
    th.appendChild(laDateDeNaissance); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let leSexe = document.createTextNode("Sexe");
    th.appendChild(leSexe); 
    thead.appendChild(th); 

    /* Remplir les données du tableau patient */
    let tbody = document.createElement("TBODY");
    let tr, td, tdTexte;
    tr = document.createElement("TR");
    td = document.createElement("TD");
    let dossier = patientChoisi.getElementsByTagName('dossier')[0].firstChild.nodeValue;
    tdTexte = document.createTextNode(dossier);
    td.appendChild(tdTexte);
    tr.appendChild(td);
    
    td = document.createElement("TD");
    let nom = patientChoisi.getElementsByTagName('nom')[0].firstChild.nodeValue;
    tdTexte = document.createTextNode(nom);
    td.appendChild(tdTexte);
    tr.appendChild(td);
    
    td = document.createElement("TD");
    let prenom = patientChoisi.getElementsByTagName('prenom')[0].firstChild.nodeValue;
    tdTexte = document.createTextNode(prenom);
    td.appendChild(tdTexte);
    tr.appendChild(td);
        
    td = document.createElement("TD");
    let naissance = patientChoisi.getElementsByTagName('naissance')[0].firstChild.nodeValue;
    tdTexte = document.createTextNode(naissance);
    td.appendChild(tdTexte);
    tr.appendChild(td);
    
    td = document.createElement("TD");
    let sexe = patientChoisi.getElementsByTagName('sexe')[0].firstChild.nodeValue;
    tdTexte = document.createTextNode(sexe);
    td.appendChild(tdTexte);
    tr.appendChild(td);

    tbody.appendChild(tr);
    tableauParPatient.appendChild(thead);
    tableauParPatient.appendChild(tbody)
    

    // afficher les données d'hospitalisation du patient
    dossierPatient = dossier; 
    /* Entête du tableau hospitalisations */
    tableauHospParPatient = document.createElement("TABLE"); 
    tableauHospParPatient.setAttribute("class","w3-table-all centrer-tableau mb-md shadow");
    thead = document.createElement("THEAD");
    thead.setAttribute("class","table-header-border");
    th = document.createElement("TH");
    let leCodeEtab = document.createTextNode("Code établissement");
    th.appendChild(leCodeEtab); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let leNoDossier = document.createTextNode("No. Dossier Patient");
    th.appendChild(leNoDossier); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let laDateArrivee = document.createTextNode("Date arrivée");
    th.appendChild(laDateArrivee); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let laDateSortie = document.createTextNode("Date sortie");
    th.appendChild(laDateSortie); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let laSpecialite = document.createTextNode("Spécialité");
    th.appendChild(laSpecialite); 
    thead.appendChild(th); 

    /* Remplir les données du tableau Hospitalisations*/
    tbody = document.createElement("TBODY");
    for (hospPatient of tabHospitalisations) { // pour chaque hospitalisations dans le tableau tabHospitalisations
        let codeEtab = hospPatient.getElementsByTagName('codeEtab')[0].firstChild.nodeValue;
        let dossierHosp = hospPatient.getElementsByTagName('dossier')[0].firstChild.nodeValue;
        let dateAdmission = hospPatient.getElementsByTagName('dateAdmission')[0].firstChild.nodeValue;
        let dateSortie = hospPatient.getElementsByTagName('dateSortie')[0].firstChild.nodeValue;
        let specialite = hospPatient.getElementsByTagName('specialite')[0].firstChild.nodeValue;
        if (dossierHosp == dossierPatient){
            compteurHospitalisations++;

            tr = document.createElement("TR");
            td = document.createElement("TD");
            tdTexte = document.createTextNode(codeEtab);
            td.appendChild(tdTexte);
            tr.appendChild(td);
            
            td = document.createElement("TD");
            tdTexte = document.createTextNode(dossierHosp);
            td.appendChild(tdTexte);
            tr.appendChild(td);
            
            td = document.createElement("TD");
            tdTexte = document.createTextNode(dateAdmission);
            td.appendChild(tdTexte);
            tr.appendChild(td);
            
            td = document.createElement("TD");
            tdTexte = document.createTextNode(dateSortie);
            td.appendChild(tdTexte);
            tr.appendChild(td);
            
            td = document.createElement("TD");
            tdTexte = document.createTextNode(specialite);
            td.appendChild(tdTexte);
            tr.appendChild(td);

            tbody.appendChild(tr);

            if (!listeSpecialite.includes(specialite)){
                compteurSpecialite++
                if (compteurSpecialite > 1){ //si il y en a plus que un, ajouter une virgule entre
                    listeSpecialite += ", "
                }
                listeSpecialite += specialite;
            }
        }
    }
    
    tableauHospParPatient.appendChild(thead);
    tableauHospParPatient.appendChild(tbody);
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
        let codeEtabHosp = hosp.getElementsByTagName('codeEtab')[0].firstChild.nodeValue; 
        let specialite = hosp.getElementsByTagName('specialite')[0].firstChild.nodeValue; 
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
    let tableauEtablissement = document.createElement("TABLE"); 
    tableauEtablissement.setAttribute("class","w3-table-all centrer-tableau mb-md shadow");
    let thead = document.createElement("THEAD");
    thead.setAttribute("class","table-header-border");
    let th = document.createElement("TH");
    let leNoEtab = document.createTextNode("No. établissement");
    th.appendChild(leNoEtab); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let leNom = document.createTextNode("Nom");
    th.appendChild(leNom); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let lAdresse = document.createTextNode("Adresse");
    th.appendChild(lAdresse); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let leCodePostal = document.createTextNode("Code Postal");
    th.appendChild(leCodePostal); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let leTelephone = document.createTextNode("Téléphone");
    th.appendChild(leTelephone); 
    thead.appendChild(th); 

    /* Remplir les données du tableau des Établissements*/
    let tbody = document.createElement("TBODY");
    let tr, td, tdTexte;
    tr = document.createElement("TR");
    td = document.createElement("TD");
    let codeEtab = etabChoisi.getElementsByTagName('codeEtab')[0].firstChild.nodeValue;
    tdTexte = document.createTextNode(codeEtab);
    td.appendChild(tdTexte);
    tr.appendChild(td);
        
    td = document.createElement("TD");
    let nomEtab = etabChoisi.getElementsByTagName('nomEtab')[0].firstChild.nodeValue;
    tdTexte = document.createTextNode(nomEtab);
    td.appendChild(tdTexte);
    tr.appendChild(td);
        
    td = document.createElement("TD");
    let adresseEtab = etabChoisi.getElementsByTagName('adresseEtab')[0].firstChild.nodeValue;
    tdTexte = document.createTextNode(adresseEtab);
    td.appendChild(tdTexte);
    tr.appendChild(td);
        
    td = document.createElement("TD");
    let postalEtab = etabChoisi.getElementsByTagName('postalEtab')[0].firstChild.nodeValue;
    tdTexte = document.createTextNode(postalEtab); 
    td.appendChild(tdTexte);
    tr.appendChild(td);
        
    td = document.createElement("TD");
    let telEtab = etabChoisi.getElementsByTagName('telEtab')[0].firstChild.nodeValue;
    tdTexte = document.createTextNode(telEtab);
    td.appendChild(tdTexte);
    tr.appendChild(td);

    tbody.appendChild(tr);
    tableauEtablissement.appendChild(thead);
    tableauEtablissement.appendChild(tbody);

    // afficher les données d'hospitalisation en rapport à l'établissement et à la spécialité
    /* Entête du tableau hospitalisations */
    let tableauParSpecialite = document.createElement("TABLE"); 
    tableauParSpecialite.setAttribute("class","w3-table-all centrer-tableau mb-md shadow");
    thead = document.createElement("THEAD");
    thead.setAttribute("class","table-header-border");
    th = document.createElement("TH");
    let leCodeEtab = document.createTextNode("Code établissement");
    th.appendChild(leCodeEtab); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let leNoDossier = document.createTextNode("No. Dossier Patient");
    th.appendChild(leNoDossier); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let laDateArrivee = document.createTextNode("Date arrivée");
    th.appendChild(laDateArrivee); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let laDateSortie = document.createTextNode("Date sortie");
    th.appendChild(laDateSortie); 
    thead.appendChild(th); 
    th = document.createElement("TH");
    let laSpecialite = document.createTextNode("Spécialité");
    th.appendChild(laSpecialite); 
    thead.appendChild(th); 

    // remplir les données du tableau Hospitalisations par spécialités
    tbody = document.createElement("TBODY");
    for (prop of tabHospitalisations) { // pour chaque hospitalisations dans le tableau tabHospitalisations
        let codeEtabHosp = prop.getElementsByTagName('codeEtab')[0].firstChild.nodeValue;
        let dossierHosp = prop.getElementsByTagName('dossier')[0].firstChild.nodeValue;
        let dateAdmission = prop.getElementsByTagName('dateAdmission')[0].firstChild.nodeValue;
        let dateSortie = prop.getElementsByTagName('dateSortie')[0].firstChild.nodeValue;
        let specialite = prop.getElementsByTagName('specialite')[0].firstChild.nodeValue;

        if (codeEtabHosp == codeEtab){
            if (specialite == specialiteChoisi){
                compteurSpecialite++;
                tr = document.createElement("TR");
                td = document.createElement("TD");
                tdTexte = document.createTextNode(codeEtab);
                td.appendChild(tdTexte);
                tr.appendChild(td);
                
                td = document.createElement("TD");
                tdTexte = document.createTextNode(dossierHosp);
                td.appendChild(tdTexte);
                tr.appendChild(td);
                
                td = document.createElement("TD");
                tdTexte = document.createTextNode(dateAdmission);
                td.appendChild(tdTexte);
                tr.appendChild(td);
                
                td = document.createElement("TD");
                tdTexte = document.createTextNode(dateSortie);
                td.appendChild(tdTexte);
                tr.appendChild(td);
                
                td = document.createElement("TD");
                tdTexte = document.createTextNode(specialite);
                td.appendChild(tdTexte);
                tr.appendChild(td);

                tbody.appendChild(tr);
            }
        }
    }
    tableauParSpecialite.appendChild(thead);
    tableauParSpecialite.appendChild(tbody)
    // afficher
    document.getElementById("afficheTableau").appendChild(tableauEtablissement);
    document.getElementById("afficheTableau").appendChild(tableauParSpecialite); // afficher le tableau dans l'espace prévu
    document.getElementById("champStatus").innerHTML = "Il y a eu <span class='vert'>" + compteurSpecialite + " hospitalisations</span> à l'établissement <span class='vert'> " + codeEtab + " (" + nomEtab + ")</span> pour la spécialité <span class='vert'>" + specialiteChoisi + "</span>.";

}







/* ---------- vider la section tableau ---------- */
function effacer(){
    document.getElementById("afficheTableau").innerHTML=""; // vider l'espace d'affichage
    document.getElementById("entete").className="invisible"; // rendre l'entête invisible
    document.getElementById("selectionPatient").className="invisible"; // rendre le div du sélecteur invisible
    document.getElementById("selectEtabSpecialite").className="invisible"; // rendre le div du sélecteur invisible
}




/* ---------- afficher dans la section tableau ---------- */
function afficherEntete(contenu){
    document.getElementById("enteteTitre").innerHTML = contenu;
    document.getElementById("entete").className="visible";
}