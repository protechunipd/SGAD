/**
 * FILE: QuantityResource.js
 * PERCORSO /Codice/sgad/clienttier/model/generaldata/QuantityResource.js
 * DATA CREAZIONE: 16 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-17 - Implementazione del metodo valueOf() - Gatto Francesco
 * 2014-02-16 - Creazione della classe - Gatto Francesco
 */
 
 /**
 * Classe per la gestione della quantità di una particolare risorsa.
 * @constructor
 * @param {int} quantity Il numero di unità della data risorsa.
 * @param {Resource} resource La risorsa.
 */
function QuantityResource(quantity, resource) {
	/**
	 * Il numero di unità della data risorsa.
	 * @type {int}
	 * @private 
	 */
	this.quantity = quantity;
	/**
	 * La risorsa
	 * @type {Resource}
	 * @private
	 */
	this.resource = resource;
}
/**
 * Metodo getter della quantità della risorsa.
 * @returns {int} La quantità della risorsa.
 */
QuantityResource.prototype.getQuantity = function() {
    return this.quantity;
};
/**
 * Metodo getter della risorsa.
 * @returns {Resource} La risorsa.
 */
QuantityResource.prototype.getResource = function() {
    return this.resource;
};

/**
 * Ridefinizione del metodo valueOf di QuantityResource.
 * @override
 * @returns {string} Identificativo del QuantityResource.
 */
QuantityResource.prototype.valueOf = function() {
    return JSON.stringify({quantity : this.getQuantity(), resource : this.getResource()});
};