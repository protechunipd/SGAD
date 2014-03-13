/**
 * FILE: LoadAnotherUser.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/LoadAnotherUser.js
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
LoadAnotherUser.prototype = new Action();

//Costruttore della classe
LoadAnotherUser.prototype.constructor = LoadAnotherUser;

/**
 * Classe per il caricamento di un altro utente.
 * @implements Action
 * @constructor
 */
function LoadAnotherUser(anotherVillage) {
    /**
     * Il villaggio del giocatore attaccato.
     * @type {Object}
     * @private
     */
	this.anotherVillage = anotherVillage;
}

/**
 * Esegue le istruzioni necessarie per il caricamento di un altro utente.
 * @override
 * @return {void}
 */
LoadAnotherUser.prototype.performAction = function() {
	BackupManager.getInstance().saveDatas(); //salvo i dati dell'utente attaccante
	Context.getInstance().setGraphicObjects(new GraphicObjectCollection()); //creo una nuova collezione di oggetti per l'utente da caricare
	var loadPersonalData = new LoadPersonalData(); //creo un'azione per caricare i dati dell'utente attaccato
	loadPersonalData.setActionDatas(this.anotherVillage);
	loadPersonalData.performAction();
	var showAnotherUserMenu = new ShowAnotherUserMenu(); //visualizzo il menu per tornare al proprio villaggio.
	showAnotherUserMenu.performAction();
};