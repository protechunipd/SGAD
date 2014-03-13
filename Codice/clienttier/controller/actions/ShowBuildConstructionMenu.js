/**
 * FILE: ShowBuildConstructionMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowBuildConstructionMenu.js
 * DATA CREAZIONE: 24 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-24 - Creazione della classe - Gallo Francesco
 */

//Eredita da Action
ShowBuildConstructionMenu.prototype = new Action();

//Costruttore della classe.
ShowBuildConstructionMenu.prototype.constructor = ShowBuildConstructionMenu;

/**
 * Classe per la visualizzazione del menù che mostra gli edifici che è possibile costruire.
 * @implements Action
 * @constructor
 * @param {TileComponent} tileComponent La casella della mappa dove costruire l'edificio.
 * @param {string} key Il tipo di edificio da costruire.
 */
function ShowBuildConstructionMenu(tileComponent, key) {
    /**
     * La casella della mappa dove costruire l'edificio.
     * @type {TileComponent}
     * @private
     */
    this.tileComponent = tileComponent;
    /**
     * Tipo di edificio da costruire.
     * @type {string}
     * @private
     */
    this.key = key;
}

/**
 * Si occupa di mostrare all'utente il menù.
 * @override
 * @return {void}
 */
ShowBuildConstructionMenu.prototype.performAction = function() {
	var confirmMenu = (new ConfirmMenuFactory(new RequestBuildConstruction(this.tileComponent, this.key), new CloseContextualMenu())).buildMenu();

	var widgets = confirmMenu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	context.disableRightClick();
	for (var i = 0; i < widgets.length; i++) {
		context.addGraphicObject(widgets[i]); //aggiungo i widget per poterli visualizzare
	}
	context.addGraphicObject(confirmMenu); //aggiungo il frame
};