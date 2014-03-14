/**
 * FILE: Command.js
 * PERCORSO /Codice/sgad/clienttier/view/commands/Command.js
 * DATA CREAZIONE: 16 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-16 - Creazione della classe - Gallo Francesco
 */

/**
 * Interfaccia per la gestione di un evento nell'area di gioco. Le sottoclassi determineranno quale evento gestire.
 * @constructor 
 */
function Command() {
	
}

/**
 * Gestisce il verificarsi di un determinato evento.
 * @abstract
 * @param {Event} event L'evento verificatosi.
 * @param {Iterator} iterator Un iteratore per delegare l'evento all'oggetto a cui punta.
 * @return {void}
 */
Command.prototype.execute = function(event, iterator) {};
