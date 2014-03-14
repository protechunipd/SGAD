/**
 * FILE: RequestUpgradeBuilding.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/RequestUpgradeBuilding.js
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Gatto Francesco
 */

//Eredita da Action
RequestUpgradeBuilding.prototype = new Action();

//Costruttore della classe.
RequestUpgradeBuilding.prototype.constructor = RequestUpgradeBuilding;

/**
 * Classe per la richiesta di miglioramento di un edificio.
 * @implements Action
 * @constructor
 * @param {BuildingPossession} buildingPossession L'edificio da migliorare.
 */
function RequestUpgradeBuilding(buildingPossession) {
    /**
     * L'edificio da migliorare.
     * @type {BuildingPossession}
     * @private
     */
    this.buildingPossession = buildingPossession;
}

/**
 * Invia la richiesta di miglioramento dell'edificio al server.
 * @override
 * @return {void}
 */
RequestUpgradeBuilding.prototype.performAction = function() {
	var request = "operation=UpgradeBuilding&data=key:" + this.buildingPossession.getKey(); //creo la richiesta per il miglioramento

	var upgradeBuilding = new UpgradeBuilding(this.buildingPossession); //creo l'azione che si occuperà di migliorare l'edificio
	var showOperationFailureMenu = new ShowOperationFailureMenu(); //creo l'azione che si occuperà di ricaricare la pagina al fallimento della richiesta

	var requester = new AJAXRequester(request, upgradeBuilding, showOperationFailureMenu, upgradeBuilding); //creo l'oggetto che gestirà la richiesta
	requester.sendRequest(false); //invio la richiesta al server
};