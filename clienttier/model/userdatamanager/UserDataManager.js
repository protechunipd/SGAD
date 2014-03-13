/**
 * FILE: UserDataManager.js
 * PERCORSO /Codice/sgad/clienttier/model/userdatamanager/UserDataManager.js
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Battistella Stefano
 */

/**
 * Classe che si occupa di mantenere l'accesso globale ai dati dell'utente di cui si sta attualmente visualizzando il villaggio.
 * @constructor
 */
var UserDataManager = (function() {
	/**
	 * Unica istanza dell'oggetto creato.
	 * @type {UserDataManager}
     * @private
	 */
	var instance;
    /**
     * ??
     */
	function init() {

		var userData = null;
		return {
			getUserData : function() {
				return userData;
			},

			setUserData : function(_userData) {
				userData = _userData;
			}
		};
	}
	return {
		/**
		 * Restituisce l'istanza dell'oggetto già creata nel qual caso l'oggetto sia già stato richiesto.
		 * Oppure la crea al momento se è la prima volta.
		 * @return {UserDataManager} Ritorna l'unica istanza dell'oggetto.
		 */
		getInstance : function() {
			if (!instance)
				instance = init(); //inizializza la variabile se è la prima volta che viene richiesta
			return instance;
		}
	};
})();