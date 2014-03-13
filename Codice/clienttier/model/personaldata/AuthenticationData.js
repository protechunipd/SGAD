/**
 * FILE: AuthenticationData.js
 * PERCORSO /Codice/sgad/clienttier/model/personaldata/AuthenticationData.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-18 - Creazione della classe - Gatto Francesco
 */

 /**
 * Classe per la gestione delle informazioni personali e di accesso di un utente.
 * @constructor
 * @param {string} email L'email dell'utente.
 * @param {string} user Il nome utente univoco dell'utente.
 **/
function AuthenticationData(email, user) {
	/**
	 * L'email dell'utente.
	 * @type {string}
	 * @private
	 */
	this.email = email;
	/**
	 * Il nome utente univoco dell'utente.
	 * @type {string}
	 * @private
	 */
	this.user = user;
}

/**
 * Metodo getter per email.
 * @return {string} L'email.
 */
AuthenticationData.prototype.getEmail = function() {
    return this.email;
};
/**
 * Metodo getter per l'identificativo utente.
 * @return {string} L'utente.
 */
AuthenticationData.prototype.getUser = function() {
    return this.user;
};
/**
 * Ridefinizione del metodo valueOf per AuthenticationData.
 * @override
 * @return {string} L'identificativo per l'AuthenticationData.
 */
AuthenticationData.prototype.valueOf = function() {
    return  JSON.stringify({email : this.getEmail(), user :this.getUser()});
};