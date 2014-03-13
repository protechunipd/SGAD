/**
 * FILE: ShowAccountDeletedMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowAccountDeletedMenu.js
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
ShowAccountDeletedMenu.prototype = new Action();

//Costruttore della classe.
ShowAccountDeletedMenu.prototype.constructor = ShowAccountDeletedMenu;

/**
 * Si occupa di visualizzare il menù all'utente.
 * Classe per la visualizzazione di un menu indicante l'esito dell'operazione di eliminazione dell'account.
 * @implements Action
 * @constructor
 */
function ShowAccountDeletedMenu() {
	/**
	 * I dati da impostare per la visualizzazione del menu.
	 * @type {object}
     * @private
	 */
	this.datas = null;
}

/**
 * Si occupa di visualizzare il menu all'utente.
 * @override
 * @return {void}
 */
ShowAccountDeletedMenu.prototype.performAction = function() {
	var menu;
	if(this.datas === null) {
		var operationFailureMenu = new ShowOperationFailureMenu();
		operationFailureMenu.performAction();
	} else if(!this.datas) {
		menu = (new NotifyMenuFactory("Attenzione! E' avvenuto un errore durante l'eliminazione dell'account.", null)).buildMenu();
	} else {
		(new Logout()).performAction();
		return;
	}
	var widgets = menu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	for (var j = 0; j < widgets.length; j++) {
		context.addGraphicObject(widgets[j]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(menu); //aggiungo il frame
};

/**
 * Imposta i dati per la visualizzazione del menù all'utente.
 * @param {Object} datas I dati da impostare.
 * @override
 * @return {void}
 */
ShowAccountDeletedMenu.prototype.setActionDatas = function(datas) {
	this.datas = datas;
};