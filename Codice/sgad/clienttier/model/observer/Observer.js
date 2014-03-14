/**
 * FILE: Observer.js
 * PERCORSO /Codice/sgad/clienttier/model/observer/Observer.js
 * DATA CREAZIONE: 11 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-11 - Creazione della classe - Battistella Stefano
 */

 /**
 * Interfaccia per la gestione di oggetti che osservano altri oggetti.
 * @interface
 */
function Observer() {}

/**
 * Richiede l'aggiornamento dell'oggetto.
 * @abstract
 * @return {void}
 */
Observer.prototype.update = function() {}; 