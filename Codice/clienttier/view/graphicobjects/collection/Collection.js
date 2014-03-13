/**
 * FILE: Collection.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/collection/Collection.js
 * DATA CREAZIONE: 13 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-13 - Creazione della classe - Gallo Francesco
 */

/**
 * Interfaccia per le classi che rappresentano collezioni di oggetti
 * @interface
 * @constructor
 */
function Collection() {}

/**
 * Fornisce un oggetto per accedere alla collezione.
 * @abstract
 * @return {Iterator} Oggetto iteratore della collezione.
 */
Collection.prototype.createIterator = function(){};
