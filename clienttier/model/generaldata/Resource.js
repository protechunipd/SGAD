/**
 * FILE: Resource.js
 * PERCORSO /Codice/sgad/clienttier/model/generaldata/Resource.js
 * DATA CREAZIONE: 12 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-12 - Creazione della classe - Gatto Francesco
 */
 
 /**
 * Classe che rappresenta una risorsa.
  * @constructor
  * @param {string} resourceName Il nome della risorsa.
 */
function Resource(resourceName) {
	/**
	 * Il nome della risorsa.
	 * @type {string}
	 * @private
	 */
	this.resourceName = resourceName;

}

/**
 * Controlla l'accesso al nome della risorsa.
 * @return {string} Nome della risorsa.
 */
Resource.prototype.getResourceName = function() {
	return this.resourceName;
};

/**
 * Fornisce la chiave che identifica la risorsa.
 * @returns {string} La chiave che identifica la risorsa.
 */
Resource.prototype.getKey = function() {
    return this.getResourceName();
};

/**
 * Ridefinizione del metodo valueOf di Resource.
 * @override
 * @returns {string} L'identificativo della risorsa.
 */
Resource.prototype.valueOf = function() {
    return JSON.stringify({resourceName : this.getKey()});
};