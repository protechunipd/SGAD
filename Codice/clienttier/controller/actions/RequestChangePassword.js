/**
 * FILE: RequestChangePassword.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/RequestChangePassword.js
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
RequestChangePassword.prototype = new Action();

//Costruttore della classe.
RequestChangePassword.prototype.constructor = RequestChangePassword;

/**
 * Classe per la gestione della richiesta di cambiamento password.
 * @implements Action
 * @constructor
 * @param {string} oldPassword La vecchia password.
 * @param {string} newPassword La nuova password.
 * @param {string} confirmNewPassword La nuova password.
 */
function RequestChangePassword(oldPassword, newPassword, confirmNewPassword) {
    /**
     * La vecchia password.
     * @type {string}
     * @private
     */
    this.oldPassword = oldPassword;
    /**
     * La nuova password.
     * @type {string}
     * @private
     */
    this.newPassword = newPassword;
    /**
     * La nuova password.
     * @type {string}
     * @private
     */
	this.confirmNewPassword = confirmNewPassword;
}

/**
 * Invia la richiesta di modifica della password.
 * @override
 * @return {void}
 */
RequestChangePassword.prototype.performAction = function() {
	var request = "operation=ChangeAccountData&data=oldPassword:" + this.oldPassword + ",password1:" + this.newPassword + ",password2:" + this.confirmNewPassword; //creo la richiesta per la password

	var showPasswordChangedMenu = new ShowPasswordChangedMenu();
	var showOperationFailureMenu = new ShowOperationFailureMenu(); //creo l'azione che si occuperà di ricaricare la pagina al fallimento della richiesta

	var requester = new AJAXRequester(request, showPasswordChangedMenu, showOperationFailureMenu, showPasswordChangedMenu); //creo l'oggetto che gestirà la richiesta
	requester.sendRequest(false); //invio la richiesta al server
};