/**
 * FILE: Iterator.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/collection/Iterator.js
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
 * Interfaccia per i possibili iteratori che possono essere realizzati per accedere a classi per la gestione di aggregati di dati.
 * @constructor
 * @interface
 */
function Iterator() {}

/**
 * Sposta l'iteratore al primo elemento della collezione.
 * @abstract
 * @return {void}
 */
Iterator.prototype.first = function() {};

/**
 * Fornisce l'elemento associato alla posizione corrente.
 * @abstract
 * @return {GraphicObject} L'elemento associato alla posizione corrente
 */
Iterator.prototype.getItem = function() {};

/**
 * Indica se si è arrivato al termine dell'aggregato.
 * @abstract
 * @return {bool} L'arrivo o meno alla fine dell'aggregato.
 */
Iterator.prototype.isDone = function() {};

/**
 * Sposta l'iteratore all'ultimo elemento della collezione.
 * @abstract
 * @return {void}
 */
Iterator.prototype.last= function() {};

/**
 * Sposta l'iteratore al successivo elemento della collezione.
 * @abstract
 * @return {void}

 */
Iterator.prototype.next= function() {};

/**
 * Sposta l'iteratore al precendte elemento della collezione.
 * @abstract
 * @return {void}
 */
Iterator.prototype.previous = function() {};