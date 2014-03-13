/**
 * FILE: ShowOperationFailureMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowOperationFailureMenu.js
 * DATA CREAZIONE: 22 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-22 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
ShowOperationFailureMenu.prototype = new Action();

//Costruttore della classe.
ShowOperationFailureMenu.prototype.constructor = ShowOperationFailureMenu;

/**
 * Classe per la visualizzazione di un menu al fallimento di un'operazione.
 * @implements Action
 * @constructor
 */
function ShowOperationFailureMenu() {}

/**
 * Visualizza un menu per indicare che l'operazione non è andata a buon fine.
 * @override
 * @return {void}
 */
ShowOperationFailureMenu.prototype.performAction = function() {
	var notifyText = "Attenzione! E' stata persa la connessione con il server oppure è passato troppo tempo dall'ultima azione. La pagina verrà ricaricata.";
	var notifyMenu = (new NotifyMenuFactory(notifyText, new ReloadPageAction())).buildMenu();

	var widgets = notifyMenu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	for (var i = 0; i < widgets.length; i++) {
		context.addGraphicObject(widgets[i]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(notifyMenu); //aggiungo il frame
};