/**
 * FILE: CloseContextualMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/CloseContextualMenu.js
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
 CloseContextualMenu.prototype = new Action();

//Costruttore della classe.
CloseContextualMenu.prototype.constructor = CloseContextualMenu;

/**
 * Classe per la gestione della chiusura del menu contestuale visualizzato alla pressione del pulsante destro del mouse.
 * @implements Action
 * @constructor
 */
function CloseContextualMenu() {
}
/**
 * Chiude il menu contestuale attualemente visualizzato.
 * @override
 * @return {void}
 */
CloseContextualMenu.prototype.performAction = function () {
	var context = Context.getInstance();
	var oldContextualMenu = context.getContextualMenu(); //ottengo il menu contestuale attualmente visualizzato
	if (oldContextualMenu !== null) //controllo se esiste effettivamente il menu contestuale
	{
		var oldWidgets = oldContextualMenu.getWidgets(); //ottengo i widgets da visualizzare
		for (var i = 0; i < oldWidgets.length; i++)
			context.removeGraphicObject(oldWidgets[i]); //rimuovo gli oggetti grafici
		context.removeGraphicObject(oldContextualMenu); //rimuovo il menu contestuale
		context.setContextualMenu(null);
	}
};