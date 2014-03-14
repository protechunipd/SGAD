/**
 * FILE: ShowPasswordChangedMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowPasswordChangedMenu.js
 * DATA CREAZIONE: 22 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-24 - Creazione della classe - Gatto Francesco
 * 2014-02-22 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
ShowPasswordChangedMenu.prototype = new Action();

//Costruttore della classe.
ShowPasswordChangedMenu.prototype.constructor = ShowPasswordChangedMenu;

/**
 * Classe per la visualizzazione di un menu di conferma del cambiamento della password.
 * @implements Action
 * @constructor
 */
function ShowPasswordChangedMenu() {
    /**
     * I dati da impostare per la visualizzazione del menù.
     * @type {Object}
     * @private
     */
    this.datas = null;
}

/**
 * Si occupa di visualizzare il menù all'utente.
 * @override
 * @return {void}
 */
ShowPasswordChangedMenu.prototype.performAction = function() {
	var menu;
	if(this.datas === null) {
		var operationFailureMenu = new ShowOperationFailureMenu();
		operationFailureMenu.performAction();
	} else if(!this.datas) {
		menu = (new NotifyMenuFactory("Attenzione! E' avvenuto un errore durante la modifica della password.", null)).buildMenu();
	} else {
		menu = (new NotifyMenuFactory("La password è stata cambiata con successo.", null)).buildMenu();
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
ShowPasswordChangedMenu.prototype.setActionDatas = function(datas) {
	this.datas = datas;
};