require('dotenv').config()// Cache BDD Mongoose
const express = require('express');
const helmet = require("helmet");// Sécuriser =>  permet de gérer la création des Headers pour utiliser les headers les plus appropriés et les plus sécurité pour l'application.
const rateLimit = require("express-rate-limit");// Utilisez pour limiter les demandes répétées aux API publiques et / ou aux points de terminaison tels que la réinitialisation du mot de passe (Empeche une entrée de force brute)
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')// Analyser les cookies pour chaque requête effectué
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');// autorise les requêtes

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/users')

const app = express();
app.use(cookieParser())
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20 // limite chaque IP à 100 requêtes par fenêtre 
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());// Formater le json
  
  mongoose.connect('mongodb+srv://so-pekocko:NgBL0rDrFf7jE4rO@cluster0.z8zqc.mongodb.net/so-pekocko-sauces?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

 mongoose.set('useCreateIndex', true);

//debug mod of mongoose//
mongoose.set('debug', true);

  app.use('/images', express.static(path.join(__dirname, 'images')))

  app.use(limiter);

  app.use('/api/sauces', saucesRoutes);
  app.use('/api/auth', userRoutes);
  
module.exports = app;