var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    db;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
    db = mongoClient.db("contactdb");
    db.collection('contacts', {strict:true}, function(err, collection) {
        if (err) {
            console.log("The 'contacts' collection doesn't exist. ");
        }
    });
});

// Affiche formulaire ajouter un contact
exports.add = function(req, res) {
            res.render('contact_new', {
            title: 'Ajouter un contact'          
         });
};

// Affiche formulaire Modifier contact
exports.edit = function(req, res) {
			res.render('contact_edit', { 
			title: "Mise a jour d'un contact"
			});
};

// Affiche formulaire infos du contact
exports.info = function(req, res) {
			res.render('contact_info', { 
			title: "Informations du contact"
			});
};

// Affiche formulaire recherche des contacts
exports.search = function(req, res) {
			res.render('contact_rech', { 
			title: "Informations du contact"
    });
};
// Affiche la liste des contacts
exports.listeContacts = function(req, res) {
            res.render('index', {
            title: 'Liste des contacts'
            });
};

 exports.findById = function(req, res) {
    var id = req.params["id"];
    db.collection('contacts', function(err, collection) {
        collection.findOne({'_id': collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(err, item) {
            res.jsonp(item);
        });
    });
};

exports.insert = function(req, res) { 
    db.collection('contacts', function(err, collection) {         
            collection.insert(req.body,function(err, items) {
			if (err) {
                console.log('Erreur ajout du contact: ' + err);
            } else {			
				res.redirect('/');
            }
		});   
	});
};

exports.update = function(req, res) {
	var contact = req.body;
    db.collection('contacts', function(err, collection) {
        collection.update({'_id': collection.db.bson_serializer.ObjectID.createFromHexString(req.params.id)}, {$set: contact}, {safe: true}, function(err, item) {                     			            
			if (err) {
                console.log('Erreur modification du contact: ' + err);
            } else {			
				res.redirect('/');
            }
		});
    });
};

exports.remove = function(req, res) {  
    var id = req.body["_id"];
    db.collection('contacts', function(err, collection) {
    collection.remove({'_id': collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(err,items) {
			if (err) {
                console.log('Erreur suppression du contact: ' + err);
            } else {			
				res.redirect('/');
            }
		});
    });
};

exports.findAll = function(req, res) {
    db.collection('contacts', function(err, collection) {
       collection.find({archiver: 'noarchive'}).toArray(function(err, items) {
            res.jsonp(items);       
		});
    });
};

 exports.find = function(req, res) {
    var mot = req.params["mot"];
    db.collection('contacts', function(err, collection) {
        if (mot) {
            collection.find({$or:[{ "nom": new RegExp(mot, "i")}, {"prenom": new RegExp(mot, "i")} , {"nom_organisation": new RegExp(mot, "i")}]}).toArray(function(err, items) {
				res.jsonp(items);  
            });
        }  
    });
};
