/**
 * FILE: WorldComponent.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponent/WorldComponent.js
 * DATA CREAZIONE: 17 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-17 - Creazione della classe - Battistella Stefano
 */

//Eredita da GraphicObject.
WorldComponent.prototype = new GraphicObject();

//Costruttore della classe.
WorldComponent.prototype.constructor = WorldComponent;

/**
 * Classe astratta per la gestione di un qualsiasi edificio o casella all'interno del mondo di gioco.
 * @extends GraphicObject
 * @abstract
 * @constructor
 */
function WorldComponent() {}