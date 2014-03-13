/**
 * FILE: MenuFactory.js
 * PERCORSO /Codice/sgad/clienttier/controller/menufactory/MenuFactory.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-18 - Creazione della classe - Battistella Stefano
 */

/**
 * Interfaccia per i possibili menu che possono essere visualizzati durante l'interazione dell'utente con il mondo di gioco.
 * @constructor
 * @interface
 */
function MenuFactory() {}

/**
 * Costruisce il menu.
 * @abstract
 * @return {FrameWidget} Il frame contenente il menu.
 */
MenuFactory.prototype.buildMenu = function() {};