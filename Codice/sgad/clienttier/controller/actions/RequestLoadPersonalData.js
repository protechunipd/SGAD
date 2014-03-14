/**
 * FILE: RequestLoadPersonalData.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/RequestLoadPersonalData.js
 * DATA CREAZIONE: 21 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-21 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
RequestLoadPersonalData.prototype = new Action();

//Costruttore della classe.
RequestLoadPersonalData.prototype.constructor = RequestLoadPersonalData;

/**
 * Classe per la richiesta di caricamento dei dati personali.
 * @implements Action
 * @constructor
 */
function RequestLoadPersonalData() {

}

/**
 * Invia la richiesta di caricamento dei dati al server.
 * @override
 * @return {void}
 */
RequestLoadPersonalData.prototype.performAction = function() {
	var request = "operation=LoadVillage&data="; //creo la richiesta per il caricamento

	var onSuccessActions = new ActionListener();
	var loadPersonalData = new LoadPersonalData(); //creo l'azione che si occuperà di caricare i dati
	var showOperationFailureMenu = new ShowOperationFailureMenu(); //creo l'azione che si occuperà di ricaricare la pagina al fallimento della richiesta
	var showResourceMenu = new ShowResourceMenu();
	onSuccessActions.addAction(loadPersonalData);
	onSuccessActions.addAction(showResourceMenu);

	var requester = new AJAXRequester(request, onSuccessActions, showOperationFailureMenu, loadPersonalData); //creo l'oggetto che gestirà la richiesta
	requester.sendRequest(false); //invio la richiesta al server
};