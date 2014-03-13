/**
 * FILE: ProductedResource.js
 * PERCORSO /Codice/sgad/clienttier/model/generaldata/ProductedResource.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Implementazione dei metodi getMaxQuantity(), getQuantity(), getRelativeTime(), getResource() e valueOf() - Gatto Francesco
 * 2014-02-18 - Creazione della classe - Gatto Francesco
 */

/**
 * Classe per la gestione delle informazioni relative alla risorsa prodotta da un edificio.
 * @constructor
 * @param {int} maxQuantity Il massimo numero di unità di risorse accumulabili nell'edificio.
 * @param {int} quantity Il numero di risorse prodotte ogni multiplo di 'relativeTime' che passa.
 * @param {int} relativeTime Indica ogni quanto l'edificio produce 'quantity' unità di risorsa 'resource'.
 * @param {Resource} resource La risorsa prodotta.
 */
function ProductedResource(maxQuantity, quantity, relativeTime, resource) {
	/**
	 * Il massimo numero di unità di risorse accumulabili nell'edificio.
	 * @type {int}
	 * @private 
	 */
	this.maxQuantity = maxQuantity;
	/**
	 * Il numero di risorse prodotte ogni multiplo di 'relativeTime' che passa.
	 * @type {int}
	 * @private
	 */
	this.quantity = quantity;
	/**
	 * Indica ogni quanto l'edificio produce 'quantity' unità di risorsa 'resource'.
	 * @type {int}
	 * @private
	 */
	this.relativeTime = relativeTime;
	/**
	 * La risorsa prodotta.
	 * @type {Resource}
	 * @private
	 */
	this.resource = resource;
}
/**
 * Controlla l'accesso alla quantità massima possibile della risorsa.
 * @return {int} Il massimo numero di risorse accumulabili nell'edificio.
 */
ProductedResource.prototype.getMaxQuantity = function() {
	return this.maxQuantity;
};
/**
 * Controlla l'accesso alla quantità della risorsa.
 * @return {int} Il numero di risorse prodotte ogni multiplo di 'relativeTime' che passa.
 */
ProductedResource.prototype.getQuantity = function() {
	return this.quantity;
};
/**
 * Controlla l'accesso all'unità di tempo necessaria per la produzione della risorsa.
 * @return {int} Indica ogni quanto l'edificio produce 'quantity' unità di risorsa 'resource'.
 */
ProductedResource.prototype.getRelativeTime = function() {
	return this.relativeTime;
};
/**
 * Controlla l'accesso alla risorsa.
 * @return {Resource} La risorsa prodotta.
 */
ProductedResource.prototype.getResource = function() {
	return this.resource;
};

/**
 * Ridefinizione del metodo valueOf di ProductedResource.
 * @override
 * @returns {string} la risorsa da confrontare.
 */
ProductedResource.prototype.valueOf = function() {
    return  JSON.stringify({relativeTime : this.getRelativeTime(), quantity : this.getQuantity(), maxQuantity : this.getMaxQuantity(), resource : this.getResource()});
};