	function validate() {		
	 var nom=document.getElementById('nom').value;
	 var prenom=document.getElementById('prenom').value;
	 var nom_org=document.getElementById('nom_organisation').value;
	 if((nom=="" && prenom==""&& nom_org!="" )
	 || (nom !="" && prenom !="" && nom_org=="")
	 ){
		document.getElementById('validateMsg').innerHTML = '';
	 } else{ 
		document.getElementById('validateMsg').innerHTML = 'Erreur dans les champs nom, prénom ou nom d\'organisation';
	  return false;  
	 }
	}	

//  Fonction création de XMLHttpRequest
	function getXMLHttpRequest() {
    var xmlhttp = null;
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    } else {
        xmlhttp = new XMLHttpRequest(); 
    }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    return xmlhttp;
    }

 // Fonction récuperation des infos d'un contact a partir du service web en fonction du id
	function getContacts() {  
    var url1 =  window.location.toString();
	var id =url1.substring(url1.lastIndexOf("=")+1);
	var url = "/contact/";	
	var contacts = {};
	var xmlhttp = getXMLHttpRequest();
	xmlhttp.open("GET", url, false);
	xmlhttp.onreadystatechange = function () {
	     if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            contacts = JSON.parse(xmlhttp.responseText);
         }
     }; 
    xmlhttp.send(null);
	var text = '';
	text += '<p id="nb">Nombre de contact(s) : <b>' + contacts.length + '</b></p>';	
	for(var i = 0; i < contacts.length ; i++){
	text += '<div class="contact">';
 
	if(contacts[i].nom_organisation){
	text += '<div class="title"><img src="images/user-group.png" width="20" height="20"><a id="nom" href="/contact/info?_id=' +  contacts[i]._id + '">' + contacts[i].nom_organisation + '</a></div>';
	}
	else{
	text += '<div class="title"><img src="images/user.png" width="20" height="20"><a id="nom" href="/contact/info?_id=' +contacts[i]._id + '">' + contacts[i].nom + ' ' + contacts[i].prenom + '</a></div>';
	}

	text += '<div class="notes"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td width="80%">';

	if(contacts[i].notes){
	text += '<div>' + contacts[i].notes + '</div>'
	}
	else{
	text += '<p id="msg">(Aucune note).</p>';
	}

	text += '</td><td width="10%"><form method="post" action="/contact/'+ contacts[i]._id +'">';
	text += '<input name="_id" type="hidden" value='+ contacts[i]._id +'>';
	text += '<input name="_method" type="hidden" value="delete"><input id="delete" value="Supprimer" type="submit" class="submit">';
	text += '</form></td><td width="10%"><form method="get" action="/contact/update">';
	text += '<input name="_id" type="hidden" value='+ contacts[i]._id +'>';
	text += '<input id="edit" value="Modifier" type="submit" class="submit"></form></td></tr></table></div></div>';

		}
	text += '<a id="add" href="/contact/add">Ajouter un contact</a>';	
	if(contacts.length == 0)
	text = '<p id="msg" align="center">Aucun contact</p><a id="add" href="/contact/add">Ajouter un contact</a>';
	document.getElementById('contacts').innerHTML = text ;		
}
// Fonction récuperation des infos d'un contact a partir du service web en fonction du id
	function findContacts() {  
    var url1 =  window.location.toString();
	var mot =url1.substring(url1.lastIndexOf("=")+1);
	var url = "/contact/rech/"+mot;	
	var contacts = {};
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", url, false);
	xmlhttp.onreadystatechange = function () {
	     if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            contacts = JSON.parse(xmlhttp.responseText);
         }
     }; 
    xmlhttp.send(null);
    var text = '';	
	text += '<p id="nb">Nombre de contact(s) : <b>' + contacts.length + '</b></p>';	
	for(var i = 0; i < contacts.length ; i++){
	text += '<div class="contact">';
	if(contacts[i].nom_organisation){
	text += '<div class="title"><img src="../images/user-group.png" width="20" height="20"><a id="nom" href="/contact/info?_id=' +  contacts[i]._id + '">' + contacts[i].nom_organisation + '</a></div>';
	}
	else{
	text += '<div class="title"><img src="../images/user.png" width="20" height="20"><a id="nom" href="/contact/info?_id=' +contacts[i]._id + '">' + contacts[i].nom + ' ' + contacts[i].prenom + '</a></div>';
	}

	text += '<div class="notes"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td width="80%">';

	if(contacts[i].notes){
	text += '<div>' + contacts[i].notes + '</div>'
	}
	else{
	text += '<p id="msg">(Aucune note).</p>';
	}

	text += '</td><td width="10%"><form method="post" action="/contact/'+ contacts[i]._id +'">';
	text += '<input name="_id" type="hidden" value='+ contacts[i]._id +'>';
	text += '<input name="_method" type="hidden" value="delete"><input id="delete" value="Supprimer" type="submit" class="submit">';
	text += '</form></td><td width="10%"><form method="get" action="/contact/update/">';
	text += '<input name="_id" type="hidden" value='+ contacts[i]._id +'>';	
	text += '<input id="edit" value="Modifier" type="submit" class="submit"></form></td></tr></table></div></div>';
	if(contacts.length == 0)
	text = '<p id="msg" align="center">Aucun contact</p><a id="add" href="/contact/add">Ajouter un contact</a>';
	document.getElementById('contacts').innerHTML = text ;
		}
}
// Fonction récuperation des infos d'un contact a partir du service web en fonction du id
	function getContact() {  
    var url1 =  window.location.toString();
	var id =url1.substring(url1.lastIndexOf("=")+1);
	var url = "/contact/"+id;	
	var contact = {};
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", url, false);
	xmlhttp.onreadystatechange = function () {
	     if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            contact = JSON.parse(xmlhttp.responseText);
         }
     }; 
    xmlhttp.send(null);
	
	document.getElementById('myForm').action= '/contact/'+id;
	document.getElementById('nom').value = contact.nom ;
	document.getElementById('prenom').value = contact.prenom ;
	document.getElementById('nom_organisation').value = contact.nom_organisation ;
	document.getElementById('titre').value = contact.titre ;
	document.getElementById('profession').value = contact.profession ;
	document.getElementById('date_de_naissance').value = contact.date_de_naissance ;
	
	
	if(contact.sexe == "Masculin")
		document.getElementById('sexe').options[1].selected = true;
	else if(contact.sexe == "Feminin")
		document.getElementById('sexe').options[2].selected = true;	
	else
		document.getElementById('sexe').options[0].selected = true;
		
	if(contact.archiver == "archive")
	document.getElementById('archiver').options[0].selected = true;
	else
	document.getElementById('archiver').options[1].selected = true;
	
	document.getElementById('num1').value = contact.num1 ;
	
	document.getElementById('disc_num1').value = contact.disc_num1 ;
	document.getElementById('num2').value = contact.num2 ;
	document.getElementById('disc_num2').value = contact.disc_num2 ;
	document.getElementById('num3').value = contact.num3 ;
	document.getElementById('disc_num3').value = contact.disc_num3 ;	
	
	document.getElementById('adresse1').value = contact.adresse1 ;
	document.getElementById('disc_adr1').value = contact.disc_adr1 ;
	document.getElementById('adresse2').value = contact.adresse2 ;
	document.getElementById('disc_adr2').value = contact.disc_adr2 ;
	document.getElementById('adresse3').value = contact.adresse3 ;
	document.getElementById('disc_adr3').value = contact.disc_adr3 ;
		
	document.getElementById('email1').value = contact.email1 ;
	document.getElementById('disc_email1').value = contact.disc_email1 ;
	document.getElementById('email2').value = contact.email2 ;
	document.getElementById('disc_email2').value = contact.disc_email2 ;
	document.getElementById('email3').value = contact.email3 ;
	document.getElementById('disc_email3').value = contact.disc_email3 ;
	
	document.getElementById('site1').value = contact.site1 ;
	document.getElementById('disc_site1').value = contact.disc_site1 ;
	document.getElementById('site2').value = contact.site2 ;
	document.getElementById('disc_site2').value = contact.disc_site2 ;
	document.getElementById('site3').value = contact.site3 ;
	document.getElementById('disc_site3').value = contact.disc_site3 ;	
		
	document.getElementById('date1').value = contact.date1 ;
	document.getElementById('disc_date1').value = contact.disc_date1 ;
	document.getElementById('date2').value = contact.date2 ;
	document.getElementById('disc_date2').value = contact.disc_date2 ;
	document.getElementById('date3').value = contact.date3 ;
	document.getElementById('disc_date3').value = contact.disc_date3 ;	
	
	document.getElementById('notes').value = contact.notes ;
	


	
}