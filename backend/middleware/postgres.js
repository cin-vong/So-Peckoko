const postgres = require('pg')// Permet de se défendre contre les attaques d'injections

var q = 'SELECT name FROM books WHERE id = $1';
client.query(q, ['3'], function(err, result) {});

module.exports = postgres;