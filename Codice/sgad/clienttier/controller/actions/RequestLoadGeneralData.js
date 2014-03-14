/**
 * FILE: RequestLoadGeneralData.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/RequestLoadGeneralData.js
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
RequestLoadGeneralData.prototype = new Action();

//Costruttore della classe.
RequestLoadGeneralData.prototype.constructor = RequestLoadGeneralData;

/**
 * Classe per la richiesta di caricamento dei dati globali.
 * @implements Action
 * @constructor
 */
function RequestLoadGeneralData() {

}

/**
 * Invia la richiesta di caricamento dei dati al server.
 * @override
 * @return {void}
 */
RequestLoadGeneralData.prototype.performAction = function() {
	var request = "operation=LoadGlobalData&data="; //creo la richiesta per il caricamento

	var onSuccessActions = new ActionListener();
	var loadGlobalData = new LoadGeneralData(); //creo l'azione che si occuperà di caricare i dati
	var requestLoadPersonalData = new RequestLoadPersonalData(); //creo l'azione che si occuperà di caricare i dati personali
	onSuccessActions.addAction(loadGlobalData);
	onSuccessActions.addAction(requestLoadPersonalData);
	var showOperationFailureMenu = new ShowOperationFailureMenu(); //creo l'azione che si occuperà di ricaricare la pagina al fallimento della richiesta

	var requester = new AJAXRequester(request, loadGlobalData, showOperationFailureMenu, loadGlobalData); //creo l'oggetto che gestirà la richiesta
	requester.sendRequest(false); //invio la richiesta al server
};