/**
 * FILE: BackupManager.js
 * PERCORSO /Codice/sgad/clienttier/controller/backupmanager/BackupManager.js
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
 * Classe che si occupa di gestire il mantenimento dei dati e delle viste dell'utente proprietario dell'account.
 * @constructor
 */
var BackupManager = (function() {
	/**
	 * Unica istanza dell'oggetto creato.
	 * @type {BackupManager}
     * @private
	 */
	var instance;

	function init() {

		var graphicObjectCollectionBackup = null;
		var userDataBackup = null;
		return {
			getUserDataBackup : function() {
				return userDataBackup;
			},

			saveDatas : function() {
				graphicObjectCollectionBackup = Context.getInstance().getGraphicObjects();
				userDataBackup = UserDataManager.getInstance().getUserData();
			},

			restoreDatas : function() {
				Context.getInstance().setGraphicObjects(graphicObjectCollectionBackup);
				UserDataManager.getInstance().setUserData(userDataBackup);
			}
		};
	}
	return {
		/**
		 * Restituisce l'unica istanza dell'oggetto già creata, nel qual caso l'oggetto sia già stato richies to.
		 * Oppure la crea al momento se è la prima volta.
		 * @return {BackupManager} L'unica istanza dell'oggetto.
		 */
		getInstance : function() {
			if (!instance)
				instance = init(); //inizializza la variabile se è la prima volta che viene richiesta
			return instance;
		}
	};
})();