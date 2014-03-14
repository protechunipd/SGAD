/**
 * FILE: Bonus.js
 * PERCORSO /Codice/sgad/clienttier/model/generaldata/Bonus.js
 * DATA CREAZIONE: 12 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-13 - Implementazione dei metodi getBonusName(), getBonusQuantity(), getBonusType() e valueOf() - Gatto Francesco
 * 2014-02-12 - Creazione della classe - Gatto Francesco
 */
 
 /**
 * Classe per la gestione dei bonus eventualmente disponibili per certi edifici.
 * @constructor
 * @param {string} bonusName Rappresenta il nome del bonus.
 * @param {number} quantity Rappresenta la potenza del bonus.
 * @param {int} type Codice identificativo che rappresenta il tipo di bonus e di conseguenza i parametri che influenza con potenza pari al parametro quantity.
 **/
function Bonus(bonusName, quantity, type) {
	/**
	 * Rappresenta il nome del bonus.
	 * @type {string}
	 * @private
	 */
	this.bonusName = bonusName;
	/**
	 * Rappresenta la potenza del bonus.
	 * @type {number}
	 * @private
	 */
	this.quantity = quantity;
	/**
	 * Codice identificativo che rappresenta il tipo di bonus,
	 * e di conseguenza i parametri che influenzano con potenza pari al parametro quantity.
	 * @type {int}
	 * @private
	 */
	this.type = type;
}
/**
 * Controlla l'accesso al nome del bonus.
 * @return {string} Nome del bonus.
 */
Bonus.prototype.getBonusName = function() {
	return this.bonusName;
};
/**
 * Controlla l'accesso alla quantità del bonus.
 * @return {number} Potenza del bonus.
 */
Bonus.prototype.getBonusQuantity = function() {
	return this.quantity;
};
/**
 * Controlla l'accesso al tipo del bonus.
 * @return {int} Tipo del bonus.
 */
Bonus.prototype.getBonusType = function() {
	return this.type;
};
/**
 * Ridefinizione del metodo valueOf di Bonus
 * @override
 * @return {string} Stringa di confronto.
 */
Bonus.prototype.valueOf = function() {
    return JSON.stringify({bonusName : this.getBonusName(), quantity : this.getBonusQuantity(), type : this.getBonusType()});
};