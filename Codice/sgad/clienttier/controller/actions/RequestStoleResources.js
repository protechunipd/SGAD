/**
 * FILE: RequestStoleResources.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/RequestStoleResources.js
 * DATA CREAZIONE: 24 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-24 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
RequestStoleResources.prototype = new Action();

//Costruttore della classe.
RequestStoleResources.prototype.constructor = RequestStoleResources;

/**
 * Classe per la richiesta di furto di risorse
 * @implements Action
 * @constructor
 * @param {BuildingPossession} buildingPossession L'edificio da cui rubare le risorse.
 */
function RequestStoleResources(buildingPossession) {
    /**
     * L'edificio da cui rubare le risorse.
     * @type {BuildingPossession}
     * @private
     */
    this.buildingPossession = buildingPossession;
}

/**
 * Invia la richiesta di furto al server.
 * @override
 * @return {void}
 */
RequestStoleResources.prototype.performAction = function() {
	var userData = UserDataManager.getInstance().getUserData();
	var user = userData.getAuthenticationData().getUser();
	var request = "operation=StealResource&data=user:" + user + ",key:" + this.buildingPossession.getKey();

	var stoleResources = new StealResources(this.buildingPossession);
	var showOperationFailureMenu = new ShowOperationFailureMenu(); //creo l'azione che si occuperà di ricaricare la pagina al fallimento della richiesta

	var requester = new AJAXRequester(request, stoleResources, showOperationFailureMenu, stoleResources); //creo l'oggetto che gestirà la richiesta
	requester.sendRequest(false); //invio la richiesta al server
};