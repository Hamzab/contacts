MongoClient = require("mongodb").MongoClient
Server = require("mongodb").Server
db = undefined
mongoClient = new MongoClient(new Server("localhost", 27017))
mongoClient.open (err, mongoClient) ->
  db = mongoClient.db("contactdb")
  db.collection "contacts",
    strict: true
  , (err, collection) ->
    console.log "The 'contacts' collection doesn't exist. "  if err



# Affiche formulaire ajouter un contact
exports.add = (req, res) ->
  res.render "contact_new",
    title: "Ajouter un contact"



# Affiche formulaire Modifier contact
exports.edit = (req, res) ->
  res.render "contact_edit",
    title: "Mise a jour d'un contact"



# Affiche formulaire infos du contact
exports.info = (req, res) ->
  res.render "contact_info",
    title: "Informations du contact"



# Affiche formulaire recherche des contacts
exports.search = (req, res) ->
  res.render "contact_rech",
    title: "Informations du contact"



# Affiche la liste des contacts
exports.listeContacts = (req, res) ->
  res.render "index",
    title: "Liste des contacts"


exports.findById = (req, res) ->
  id = req.params["id"]
  db.collection "contacts", (err, collection) ->
    collection.findOne
      _id: collection.db.bson_serializer.ObjectID.createFromHexString(id)
    , (err, item) ->
      res.jsonp item



exports.insert = (req, res) ->
  db.collection "contacts", (err, collection) ->
    collection.insert req.body, (err, items) ->
      if err
        console.log "Erreur ajout du contact: " + err
      else
        res.redirect "/"



exports.update = (req, res) ->
  contact = req.body
  db.collection "contacts", (err, collection) ->
    collection.update
      _id: collection.db.bson_serializer.ObjectID.createFromHexString(req.params.id)
    ,
      $set: contact
    ,
      safe: true
    , (err, item) ->
      if err
        console.log "Erreur modification du contact: " + err
      else
        res.redirect "/"



exports.remove = (req, res) ->
  id = req.body["_id"]
  db.collection "contacts", (err, collection) ->
    collection.remove
      _id: collection.db.bson_serializer.ObjectID.createFromHexString(id)
    , (err, items) ->
      if err
        console.log "Erreur suppression du contact: " + err
      else
        res.redirect "/"



exports.findAll = (req, res) ->
  db.collection "contacts", (err, collection) ->
    collection.find(archiver: "noarchive").toArray (err, items) ->
      res.jsonp items



exports.find = (req, res) ->
  mot = req.params["mot"]
  db.collection "contacts", (err, collection) ->
    if mot
      collection.find($or: [
        nom: new RegExp(mot, "i")
      ,
        prenom: new RegExp(mot, "i")
      ,
        nom_organisation: new RegExp(mot, "i")
      ]).toArray (err, items) ->
        res.jsonp items

