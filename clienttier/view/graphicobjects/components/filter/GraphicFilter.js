/**
 * FILE: GraphicFilter.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/filter/GraphicFilter.js
 * DATA CREAZIONE: 15 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-15 - Creazione della classe - Gatto Francesco
 */

/**
 * Interfaccia per i possibili filtri che possono essere applicati ad un edificio.
 * @interface
 * @constructor
 */
function GraphicFilter() {}
/**
 * Imposta un frame come menu contestuale.
 * @abstract
 * @param {CanvasRenderingContext2D} drawArea Rappresenta l'oggetto grafico all'interno del mondo di gioco.
 * @return {void}
 */
GraphicFilter.prototype.draw = function(drawArea) {};
/**
 * Fornisce il poligono che rappresenta l'oggetto grafico.
 * @abstract
 * @return {Shape}
 */
GraphicFilter.prototype.getShape = function() {};