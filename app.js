
/**
 * Module dependencies.
 */
require('coffee-script');
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


// Affiche la page d'acceuil (Liste des contacts)
app.get('/', routes.listeContacts);  
// Affiche formulaire ajouter un contact
app.get('/contact/add', routes.add );
// Affiche formulaire modifier un contact
app.get('/contact/update', routes.edit);
// Affiche la recherche des contacts
app.get('/contact/rech', routes.search);
// Affiche formulaire infos d'un contact    
app.get('/contact/info', routes.info); 

// Les services REST
app.post('/contact',routes.insert);
app.get('/contact/:id', routes.findById);
app.get('/contact', routes.findAll);
app.put('/contact/:id', routes.update);
app.del('/contact/:id', routes.remove);

// Service recherche des contacts
app.get('/contact/rech/:mot', routes.find);

app.listen(3000);
console.log('Listening on port 3000...');