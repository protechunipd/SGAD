/**
 * FILE: RequestBuildConstruction.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/RequestBuildConstruction.js
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
RequestBuildConstruction.prototype = new Action();

//Costruttore della classe.
RequestBuildConstruction.prototype.constructor = RequestBuildConstruction;

/**
 * Classe per la richiesta di costruzione di un nuovo edificio.
 * @implements Action
 * @constructor
 * @param {TileComponent} tileComponent La casella della mappa dove costruire l'edificio.
 * @param {string} key Il tipo di edificio da costruire.
 */
function RequestBuildConstruction(tileComponent, key) {
    /**
     * La casella della mappa dove costruire l'edificio.
     * @type {TileComponent}
     * @private
     */
    this.tileComponent = tileComponent;
    /**
     * Tipo di edificio da rappresentare.
     * @type {string}
     * @private
     */
    this.key = key;
}

/**
 * Gestisce le operazioni per la richiesta di costruzione dell'edificio.
 * @override
 * @return {void}
 */
RequestBuildConstruction.prototype.performAction = function() {
	var position = this.tileComponent.getPosition();
	var request = "operation=BuildConstruction&data=key:" + this.key + ",x:" + position.getX() + ",y:" + position.getY(); //creo la richiesta per il miglioramento

	var buildConstruction = new BuildConstruction(this.tileComponent, this.key); //creo l'azione che si occuperà di costruire l'edificio
	var showOperationFailureMenu = new ShowOperationFailureMenu(); //creo l'azione che si occuperà di ricaricare la pagina al fallimento della richiesta

	var requester = new AJAXRequester(request, buildConstruction, showOperationFailureMenu, buildConstruction); //creo l'oggetto che gestirà la richiesta
	requester.sendRequest(false); //invio la richiesta al server
};