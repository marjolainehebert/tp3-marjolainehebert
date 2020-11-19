/* variables globales */
var divEntete, tailleTableau, codeEtablissement, nomEtablissement, posEtabChoisi, specParEtab;
var enteteTabPatient = '<table class="w3-table-all centrer-tableau mb-md shadow"><tr class="table-header-border"><th>No. dossier</th><th>Nom</th><th>Prénom</th><th>Date de naissance</th><th>Sexe</th></tr>';
var enteteTabEtablissement = '<table class="w3-table-all centrer-tableau mb-md shadow"><tr class="table-header-border"><th> No. &eacute;tablissement</th><th>Nom</th><th>Adresse</th><th>Code Postal</th><th>Téléphone</th></tr>';
var enteteTabHospitalisations = '<table class="w3-table-all centrer-tableau mb-md shadow"><tr class="table-header-border"><th> Code &eacute;tablissement</th><th>No. Dossier Patient</th><th>Date arrivée</th><th>Date sortie</th><th>Spécialités</th></tr>';

var ouvrirRangee = "<tr>"
var fermerRangee = "</tr>"
var ouvrirCellule = "<td>"
var fermerCellule = "</td>"
var fermerTableau = "</table>"

var d = new Date();
var n = d.getFullYear();
var xmlPatients = null;
var xmlEtab = null;
var xmlHosp = null;

/* ---------- Lister les patients ---------- */
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
    let tableauPatient = enteteTabPatient; // on peut prendre grid ou div
    let patient;
    effacer();// vider le tableau
    
    //Entête du tableau
    divEntete='<i class="fas fa-hospital-user"></i> Liste des patients';
    afficherEntete(divEntete); // affiher la nouvelle entête

    //remplir le tableau
    for (patient of tabPatients){
        let dossier = patient.getElementsByTagName('dossier')[0].firstChild.nodeValue;
        let nom = patient.getElementsByTagName('nom')[0].firstChild.nodeValue;
        let prenom = patient.getElementsByTagName('prenom')[0].firstChild.nodeValue;
        let naissance = patient.getElementsByTagName('naissance')[0].firstChild.nodeValue;
        let sexe = patient.getElementsByTagName('sexe')[0].firstChild.nodeValue;
        tableauPatient += ouvrirRangee + ouvrirCellule + dossier + fermerCellule + ouvrirCellule + nom + fermerCellule + ouvrirCellule + prenom + fermerCellule + ouvrirCellule + naissance + fermerCellule + ouvrirCellule + sexe + fermerCellule + fermerRangee;
    }

    tableauPatient += fermerTableau;
    document.getElementById("afficheTableau").innerHTML = tableauPatient; //afficher le tableau en javascript
    
    // afficher messages
    document.getElementById("champStatus").innerHTML = "Il y a <span class='vert'>" + tailleTableau + " patients</span> enregistrés dans la base de donnée.";
}




/* ---------- Lister les établissements ---------- */
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
    let tableauEtablissement = enteteTabEtablissement; // on peut prendre grid ou div
    let etab;
    effacer();// vider le tableau
    
    //Entête du tableau
    divEntete='<i class="far fa-hospital"></i> Liste des &eacute;tablissements';
    afficherEntete(divEntete); // affiher la nouvelle entête

    //remplir le tableau
    tableauEtablissement = enteteTabEtablissement;
    for (etab of tabEtablissements) { // pour chaque etab dans tabEtablissements
        let codeEtab = etab.getElementsByTagName('codeEtab')[0].firstChild.nodeValue;
        let nomEtab = etab.getElementsByTagName('nomEtab')[0].firstChild.nodeValue;
        let adresseEtab = etab.getElementsByTagName('adresseEtab')[0].firstChild.nodeValue;
        let postalEtab = etab.getElementsByTagName('postalEtab')[0].firstChild.nodeValue;
        let telEtab = etab.getElementsByTagName('telEtab')[0].firstChild.nodeValue;
        
        tableauEtablissement += ouvrirRangee + ouvrirCellule + codeEtab + fermerCellule + ouvrirCellule + nomEtab + fermerCellule + ouvrirCellule + adresseEtab + fermerCellule + ouvrirCellule + postalEtab + fermerCellule + ouvrirCellule + telEtab + fermerCellule + fermerRangee;// fermer la rangée
    };
    tableauEtablissement += fermerTableau;// fermer le tableau
    document.getElementById("afficheTableau").innerHTML = tableauEtablissement; //afficher le tableau

    // afficher message
    document.getElementById("champStatus").innerHTML =  "Il y a <span class='vert'>" + tailleTableau + " établissements</span> dans le réseau hospitalier.";
}




/* ---------- Lister les hospitalisations ---------- */
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
    let tableauHospitalisations = enteteTabHospitalisations; // on peut prendre grid ou div
    let hospitalisations;
    effacer();// vider le tableau
    
    //Entête du tableau
    divEntete='<i class="fas fa-ambulance"></i> Liste des hospitalisations';
    afficherEntete(divEntete); // affiher la nouvelle entête

    // Remplir le tableau des hospitalisations
    tableauHospitalisations = enteteTabHospitalisations;
    for (hospitalisations of tabHospitalisations) { // pour chaque hospitalisations dans le tableau tabHospitalisations
        let codeEtab = hospitalisations.getElementsByTagName('codeEtab')[0].firstChild.nodeValue;
        let dossier = hospitalisations.getElementsByTagName('dossier')[0].firstChild.nodeValue;
        let dateAdmission = hospitalisations.getElementsByTagName('dateAdmission')[0].firstChild.nodeValue;
        let dateSortie = hospitalisations.getElementsByTagName('dateSortie')[0].firstChild.nodeValue;
        let specialite = hospitalisations.getElementsByTagName('specialite')[0].firstChild.nodeValue;
        tableauHospitalisations += ouvrirRangee + ouvrirCellule + codeEtab + fermerCellule + ouvrirCellule + dossier + fermerCellule + ouvrirCellule + dateAdmission + fermerCellule + ouvrirCellule + dateSortie + fermerCellule + ouvrirCellule + specialite + fermerCellule + fermerRangee;// fermer la rangée

    }
    tableauHospitalisations += fermerTableau; // fermer le tableau
    document.getElementById("afficheTableau").innerHTML = tableauHospitalisations; // afficher le tableau dans l'espace prévu

    // afficher message
    document.getElementById("champStatus").innerHTML = "Il y a eu <span class='vert'>" + tailleTableau + " hospitalisations</span> depuis le début de Gestion Hospitalière Hébert.";
}




/* ---------- Lister les hospitalisations par patient  ---------- */
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
        },
        fail : function() { //si ça ne fonctionne pas
            alert("Il y a une erreur côté serveur avec le fichier tab-hospitalisations.xml");
        }
    });
    remplirSelHosParPatients();
    
}

/* remplir le sélecteur patient */
function remplirSelHosParPatients(){
    let selPatient=document.querySelector('#selectPatient');
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
    let posPatientChoisi = patientSelect.selectedIndex-1;
    let tabPatients = xmlPatients.getElementsByTagName('patient');
    let tabHospitalisations = xmlHosp.getElementsByTagName('etablissement');
    let patientChoisi = tabPatients[posPatientChoisi];
    let nominParGenre = "";
    let compteurHospitalisations = 0 ;
    let compteurSpecialite = 0 ;
    let listeSpecialite = "";
    let categoriePatient = "";
    let tableauParPatient, tableauHospParPatient, dossierPatient, hospPatient, prop, agePatient, anneeNaissance;
    
    // afficher les données du patient
    tableauParPatient = enteteTabPatient;
    let dossier = patientChoisi.getElementsByTagName('dossier')[0].firstChild.nodeValue;
    let nom = patientChoisi.getElementsByTagName('nom')[0].firstChild.nodeValue;
    let prenom = patientChoisi.getElementsByTagName('prenom')[0].firstChild.nodeValue;
    let naissance = patientChoisi.getElementsByTagName('naissance')[0].firstChild.nodeValue;
    let sexe = patientChoisi.getElementsByTagName('sexe')[0].firstChild.nodeValue;
    tableauParPatient += ouvrirRangee + ouvrirCellule + dossier + fermerCellule + ouvrirCellule + nom + fermerCellule + ouvrirCellule + prenom + fermerCellule + ouvrirCellule + naissance + fermerCellule + ouvrirCellule + sexe + fermerCellule + fermerRangee;
    tableauParPatient += fermerTableau; // fermer la rangée et le tableau

    // afficher les données d'hospitalisation du patient
    dossierPatient = dossier;
    tableauHospParPatient = enteteTabHospitalisations;
    tableauHospParPatient += ouvrirRangee; // ajouter une rangée
    for (hospPatient of tabHospitalisations) { // pour chaque hospitalisations dans le tableau tabHospitalisations
        let codeEtab = hospPatient.getElementsByTagName('codeEtab')[0].firstChild.nodeValue;
        let dossierHosp = hospPatient.getElementsByTagName('dossier')[0].firstChild.nodeValue;
        let dateAdmission = hospPatient.getElementsByTagName('dateAdmission')[0].firstChild.nodeValue;
        let dateSortie = hospPatient.getElementsByTagName('dateSortie')[0].firstChild.nodeValue;
        let specialite = hospPatient.getElementsByTagName('specialite')[0].firstChild.nodeValue;
        if (dossierHosp == dossierPatient){
            compteurHospitalisations++;
            tableauHospParPatient += ouvrirRangee + ouvrirCellule + codeEtab + fermerCellule + ouvrirCellule + dossier + fermerCellule + ouvrirCellule + dateAdmission + fermerCellule + ouvrirCellule + dateSortie + fermerCellule + ouvrirCellule + specialite + fermerCellule + fermerRangee;// fermer la rangée
            if (!listeSpecialite.includes(specialite)){
                compteurSpecialite++
                if (compteurSpecialite > 1){ //si il y en a plus que un, ajouter une virgule entre
                    listeSpecialite += ", "
                }
                listeSpecialite += specialite;
            }
        }
        tableauHospParPatient += fermerRangee; // fermer la rangée
    }
    tableauHospParPatient += fermerTableau; // fermer le tableau*/

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
        document.getElementById("afficheTableau").innerHTML = tableauParPatient; // afficher le tableau dans l'espace prévu
        document.getElementById("champStatus").innerHTML = "<span class='rouge'>" + nominParGenre + " " + prenom + " " + nom + " n'a pas encore été hospitalisé.</span>" + categoriePatient;
    } else {
        document.getElementById("afficheTableau").innerHTML = tableauParPatient + tableauHospParPatient; // afficher le tableau dans l'espace prévu
        document.getElementById("champStatus").innerHTML = nominParGenre + " <span class='vert'>" + prenom + " " + nom + "</span> a été hospitalisé <span class='vert'>" + compteurHospitalisations + " fois</span> (" + listeSpecialite + ")." + categoriePatient;
    }
}




/* ---------- Lister les hospitalisations par établissements et par spécialités ---------- */
/* remplir le sélecteur Établissement */
function selHosParEtab(){
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
        selEtab.options[selEtab.options.length]=new Option(etab.codeEtab + " - " + etab.nomEtab);
    }
    
}

/* remplir le sélecteur des spécialités */
function remplirSpecialites(hospitSelect) {
    let selSpecial, chaineSpec = "", compteurSpecialite = 0;
    posEtabChoisi = hospitSelect.selectedIndex-1;
    nomEtablissement = tabEtablissements[posEtabChoisi].nomEtab;

    codeEtablissement = tabEtablissements[posEtabChoisi].codeEtab;
    document.getElementById("afficheTableau").innerHTML="";  // vider l'espace
    document.getElementById("champStatus").innerHTML = "Choisir ensuite la <span class='vert'>Spécialité</span> à afficher"; // afficher les instructions
    document.getElementById("selectSpecialite").className="selSpecialVisible"; // rendre le select visible
    
    // remplir le sélecteur des spécialités
    selSpecial=document.querySelector('#selectSpecialite');
    selSpecial.options.length = 0; // pour vider la liste
    selSpecial.options[selSpecial.options.length]=new Option("Choisir une spécialité"); // ajouter texte à la première option du sélect
    
    for (prop of tabHospitalisations){ // pour chaque propriété dans la tabHospitalisation
        if (prop.codeEtab == codeEtablissement){ //si la propriété codeEtab est de la même valeur que celui sélectionné dans le sélecteur d'établissement
            if (!chaineSpec.includes(prop.spécialité)){ // si la propriété spécialité ne se retrouve pas déjà dans la liste
                chaineSpec += prop.spécialité; // ajouter la propriété dans une variable pour faire la validation
                selSpecial.options[selSpecial.options.length]=new Option(prop.spécialité); // ajouter la spécialité dans le sélecteur
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
    let etabChoisi = tabEtablissements[posEtabChoisi];
    let compteurSpecialite = 0;
    
    // manipulation des données du tabEtablissement
    tableauEtablissement = enteteTabEtablissement;
    tableauEtablissement += ouvrirRangee; // ajouter une rangée
    for (prop in etabChoisi) { // pour chaque prop dans patient
        tableauEtablissement += ouvrirCellule + etabChoisi[prop] + fermerCellule; //ajouter une cellule au tableau
    }
    tableauEtablissement += fermerRangee + fermerTableau; // fermer la rangée et le tableau

    // afficher les données d'hospitalisation en rapport à l'établissement et à la spécialité
    tableauParSpecialite = enteteTabHospitalisations;
    tableauParSpecialite += ouvrirRangee; // ajouter une rangée
    for (prop of tabHospitalisations) { // pour chaque hospitalisations dans le tableau tabHospitalisations
        if (prop.codeEtab == codeEtablissement){
            if (prop.spécialité == specialiteChoisi){
                compteurSpecialite++;
                for (champs in prop) { // pour chaque prop dans les hospitalisations
                    tableauParSpecialite += ouvrirCellule + prop[champs] + fermerCellule; // ajouter une cellule au tableau
                }
            }
        }
        tableauParSpecialite += fermerRangee; // fermer la rangée
    }
    tableauParSpecialite += fermerTableau; // fermer le tableau



    // afficher
    document.getElementById("afficheTableau").innerHTML = tableauEtablissement + tableauParSpecialite; // afficher le tableau dans l'espace prévu
    document.getElementById("champStatus").innerHTML = "Il y a eu <span class='vert'>" + compteurSpecialite + " hospitalisations</span> à l'établissement <span class='vert'> " + codeEtablissement + " (" + nomEtablissement + ")</span> pour la spécialité <span class='vert'>" + specialiteChoisi + "</span>.";

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