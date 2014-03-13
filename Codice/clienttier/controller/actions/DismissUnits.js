/**
 * FILE: DismissUnits.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/DismissUnits.js
 * DATA CREAZIONE: 21 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-21 - Creazione della classe - Gatto Francesco
 */

//Eredita da Action
DismissUnits.prototype = new Action();

//Costruttore della classe.
DismissUnits.prototype.constructor = DismissUnits;

/**
 * Classe per la gestione del congedo di unità arruolate in precedenza dall'utente.
 * @implements Action
 * @constructor
 * @param {Unit} unit Il tipo di unità da dimettere.
 * @param {int} quantity La quantità di unità da dimettere.
 */
function DismissUnits(unit, quantity) {
    /**
     * Il tipo di unità da dimettere.
     * @type {Unit}
     * @private
     */
    this.unit = unit;
    /**
     * La quantità di unità da dimettere.
     * @type {int}
     * @private
     */
    this.quantity = quantity;
    /**
     * Dati da impostare per eseguire l'azione.
     * @type {Object}
     * @private
     */
    this.datas = null;
}

/**
 * Rimuove le unità da dimettere.
 * @override
 * @return {void}
 */
DismissUnits.prototype.performAction = function() {
	if (!this.datas) { //controllo se è avvenuto qualche errore
		var operationFailureMenu = new ShowOperationFailureMenu();
		operationFailureMenu.performAction();
		return;
	}
	var userData = UserDataManager.getInstance().getUserData();
	var unitPossession = userData.getOwnedUnits()[this.unit.getKey()]; //ottengo le unità possedute del tipo da congedare
	unitPossession.setQuantity(unitPossession.getQuantity() - this.quantity); //rimuovo le unità congedate dalle unità possedute
};

/**
 * Imposta i dati necessari per eseguire l'azione.
 * @override
 * @param {Object} datas I dati da impostare.
 * @return {void}
 */
DismissUnits.prototype.setActionDatas = function(datas) {
	this.datas = datas;
};