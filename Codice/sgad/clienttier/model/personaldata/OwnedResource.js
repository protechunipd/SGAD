/**
 * FILE: OwnedResource.js
 * PERCORSO /Codice/sgad/clienttier/model/personaldata/OwnedResource.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-18 - Creazione della classe - Gatto Francesco
 */

//Eredita da Observable.
OwnedResource.prototype = new Observable();

//Costruttore della classe.
OwnedResource.prototype.constructor = OwnedResource;
/**
 * Classe che rappresenta una risorsa posseduta da un utente.
 * @extends Observable
 * @constructor
 * @param {int} quantity La quantità di risorsa posseduta.
 * @param {Resource} resource Il tipo di risorsa.
 */
function OwnedResource(quantity, resource) {
	/**
	 * La quantità di risorsa posseduta.
	 * @type {int}
	 * @private
	 */
	this.quantity = quantity;
	/**
	 * Il tipo di risorsa.
	 * @type {Resource}
	 * @private
	 */
	this.resource = resource;
}

/**
 * Metodo getter per quantity.
 * @return {int} La quantità della risorsa.
 */
OwnedResource.prototype.getQuantity = function() {
    return this.quantity;
};

/**
 * Metodo setter per quantity.
 * @param {int} quantity La quantità da impostare.
 * @return {void}
 */
OwnedResource.prototype.setQuantity = function(quantity) {
	this.quantity = quantity;
	this.notify();
};

/**
 * Metodo getter per resource.
 * @return {Resource} La risorsa.
 */
OwnedResource.prototype.getResource = function() {
    return this.resource;
};

/**
 * Metodo getter per key.
 * @return {string} La chiave.
 */
OwnedResource.prototype.getKey = function() {
	return this.resource.getKey();
};

/**
 * Ridefinizione del metodo valueOf per OwnedResource.
 * @override
 * @return {string} Identificativo per la risorsa posseduta.
 */
OwnedResource.prototype.valueOf = function() {
    return  JSON.stringify({resource : this.getResource(), quantity : this.getQuantity()});
};

/**
 * Fornisce lo stato della risorsa.
 * @override
 * @return {Number} Lo stato della risorsa.
 */
OwnedResource.prototype.getState = function() {
	return this.quantity;
};