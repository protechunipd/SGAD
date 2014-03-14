/**
 * FILE: ShowUserListMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowUserListMenu.js
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
ShowUserListMenu.prototype = new Action();

//Costruttore della classe.
ShowUserListMenu.prototype.constructor = ShowUserListMenu;

/**
 * Classe che visualizza il menù  per interagire con il mondo di gioco e i vari utenti.
 * @implements Action
 * @constructor
 */
function ShowUserListMenu() {
    /**
     * La lista degli altri utenti da poter attaccare.
     * @type {Object}
     * @private
     */
	this.datas = [{user: "User 1"}, {user: "User 2"}, {user: "User 3"}, {user: "User 4"}, {user: "User 5"}];
}

/**
 * Si occupa di mostrare all'utente il menù.
 * @override
 * @return {void}
 */
ShowUserListMenu.prototype.performAction = function() {
	if(this.datas === null)
		return;

	var userListMenu = (new UserListMenuFactory(this.datas)).buildMenu();

	var widgets = userListMenu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	for (var i = 0; i < widgets.length; i++) {
		context.addGraphicObject(widgets[i]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(userListMenu); //aggiungo il frame
};

/**
 * Carica la lista degli altri utenti.
 * @param {Object} datas La lista degli altri utenti.
 * @return {void}
 */
ShowUserListMenu.prototype.setActionDatas = function(datas) {
	this.datas = datas;
};