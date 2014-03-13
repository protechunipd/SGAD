/**
 * FILE: Cost.js
 * PERCORSO /Codice/sgad/clienttier/model/generaldata/Cost.js
 * DATA CREAZIONE: 17 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-17 - Creazione della classe - Gallo Francesco
 */
 
 /**
 * Classe per la gestione di un costo in termini di risorse e tempo.
 * @constructor
 * @param {int} relativeTime Il tempo necessario espresso in secondi.
 * @param {Array.<QuantityResource>} quantityResource Le quantità e il tipo di risorse necessarie.
 */
function Cost(relativeTime, quantityResource) {
    /**
     * Il tempo necessario espresso in secondi.
     * @type {int}
     * @private
     */
    this.relativeTime = relativeTime;
    /**
	 * Le quantità e il tipo di risorse necessarie.
	 * @type {Array.<QuantityResource>}
	 * @private
	 */
	this.quantityResource = quantityResource || [];
}
/**
 * Controlla l'accesso al tempo necessario espresso in secondi.
 * @return {int} Il tempo necessario espresso in secondi.
 */
Cost.prototype.getRelativeTime = function() {
    return this.relativeTime;
};
/**
 * Controlla l'accesso alle quantità e al tipo di risorse necessarie.
 * @return {Array.<QuantityResource>} Le quantità e il tipo di risorse necessarie.
 */
Cost.prototype.getQuantityResource = function() {
    this.quantityResource.sort();
    return this.quantityResource;
};
/**
 * Ridefinizione del metodo valueOf di Cost.
 * @override
 * @return {string} Le quantità e il nome della risorsa.
 */
Cost.prototype.valueOf = function() {
    return  JSON.stringify({relativeTime : this.getRelativeTime(), quantityResource : this.getQuantityResource()});
};
