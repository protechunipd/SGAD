/**
 * FILE: Action.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/Action.js
 * DATA CREAZIONE: 19 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Creazione della classe - Battistella Stefano
 */

/**
 * Interfaccia per le possibili azioni che possono essere eseguite sull'interfaccia grafica o sul modello dei dati.
 * @interface
 * @constructor
 */
function Action() {}

/**
 * Esegue l'azione.
 * @abstract
 * @return {void}
 */
Action.prototype.performAction = function() {};