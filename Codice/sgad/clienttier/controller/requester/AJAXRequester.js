/**
 * FILE: AJAXRequester.js
 * PERCORSO /Codice/sgad/clienttier/controller/requester/AJAXRequester.js
 * DATA CREAZIONE: 11 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-14 - Implementato i metodi onChangeState() e sendRequest(synchronous) e  - Gallo Francesco
 * 2014-02-13 - Implementato i metodi getRequest(), getRequester(), getOnSuccess() e getOnFailure() - Gallo Francesco
 * 2014-02-11 - Creazione della classe - Gallo Francesco
 */

 /**
 * Classe per la gestione dell'invio delle richieste al server da parte del client.
 * @param {string} request La richiesta che dovrà essere inviata.
 * @param {Action} onSuccess L'azione che deve essere eseguita al successo della richiesta.
 * @param {Action} onFailure L'azione che deve essere eseguita al fallimento della richiesta.
 * @param {Object} actionToSetDatas Azioni da impostare.
 * @constructor
 */
function AJAXRequester(request, onSuccess, onFailure, actionToSetDatas) {
	/**
	 * Richiesta che deve essere trasmessa al server.
	 * @type {string}
     * @private
	 */
	this.request = request;
	/**
	 * Azione da eseguire al successo della richiesta.
	 * @type {Action}
     * @private
	 */
	this.onSuccess = onSuccess;
	/**
	 * Azione da eseguire al fallimento della richiesta.
	 * @type {Action}
     * @private
	 */
	this.onFailure = onFailure;
     /**
      * Azioni da impostare.
      * @type {Object}
      * @private
      */
	this.actionToSetDatas = actionToSetDatas;
	/**
	 * Oggetto che gestisce la richiesta.
	 * @type {XMLHttpRequest}
     * @private
	 */
	this.requester = new XMLHttpRequest();
}
/**
 * Fornisce la richiesta.
 * @return {string} La richiesta.
 */
AJAXRequester.prototype.getRequest = function() {
	return this.request;
};

/**
 * Fornisce l'oggetto che gestisce la richiesta.
 * @return {XMLHttpRequest} L'oggetto che gestisce richiesta.
 */
AJAXRequester.prototype.getRequester = function() {
	return this.requester;
};

/**
 * Fornisce l'azione da eseguire al successo della richiesta.
 * @return {Action} L'azione da eseguire al successo della richiesta.
 */
AJAXRequester.prototype.getOnSuccess = function() {
	return this.onSuccess;
};

/**
 * Fornisce l'azione da eseguire al fallimento della richiesta.
 * @return {Action} L'azione da eseguire al fallimento della richiesta.
 */
AJAXRequester.prototype.getOnFailure = function() {
	return this.onFailure;
};

/**
 * Gestisce la modifica dello stato della richiesta inviata.
 * @return {void}
 */
AJAXRequester.prototype.onChangeState = function() {
	var requester = this.requester;
	var onSuccess = this.onSuccess;
	var actionToSetDatas = this.actionToSetDatas;
	var onFailure = this.onFailure;
	requester.onreadystatechange = function() {
		if (requester.readyState == 4 && requester.status == 200) {//la trasmissione ha avuto successo
			var messageInterpreter = MessageInterpreter.getInstance();
			var datas;
			try {
				datas = messageInterpreter.analyzeMessage(eval('(' + requester.responseText + ')'));
			} catch (exception) {
				onFailure.performAction();
				return;
			}
			actionToSetDatas.setActionDatas(datas);
			onSuccess.performAction();
		}
		if (requester.status === 404)
            onFailure.performAction();
		if (requester.readyState === 4 && requester.status === 0)
			onFailure.performAction();
	};
};

/**
 * Invia la richiesta al server.
 * @param {bool} synchronous Indica se la richiesta deve essere sincrona, valore pari a true, o asincrona, valore pari a false.
 * @return {void}
 */
AJAXRequester.prototype.sendRequest = function(synchronous) {
	var requester = this.requester;
	requester.open("POST", "http://ADDRESSTOREPLACE/user", !synchronous);
	//viene aperta la connessione
	requester.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//appendo la stringa di autenticazione alla richiesta
	var request = "user=" + "USERTOREPLACE" + "&" + this.request + ",authentication:" + "AUTHENTICATIONTOREPLACE";
	request = request.replace(/ /g,'$');
	try {
		requester.send(request);
		//invio la richiesta
		if (synchronous) {//se la richiesta è sincrona eseguo l'azione ed esco
			var messageInterpreter = MessageInterpreter.getInstance();
			var datas = messageInterpreter.analyzeMessage(eval('(' + requester.responseText + ')'));
			this.actionToSetDatas.setActionDatas(datas);
			this.onSuccess.performAction();
		}
	} catch (exception) {
		this.onFailure.performAction();
		return;
	}
	this.onChangeState();
	//la richiesta è asincrona e modifico il comportamento al cambiamento dello stato
};
