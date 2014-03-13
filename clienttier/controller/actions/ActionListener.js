/**
 * FILE: ActionListener.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ActionListener.js
 * DATA CREAZIONE: 19 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
 ActionListener.prototype = new Action();
 
//Costruttore della classe
ActionListener.prototype.constructor = ActionListener;

/**
 * Classe per permettere di memorizzare una coda di azioni da eseguire in successione.
 * Queste verranno invocate quando viene eseguito il metodo per eseguire l'azione su tale classe.
 * @implements Action
 * @constructor
 */
function ActionListener() {
    /**
     * La collezione di azioni da eseguire.
     * @type {Array.<Action>}
     * @private
     */
    this.actions = [];
}

/**
 * Inserisce una nuova azione nella lista delle azioni da eseguire.
 * L'azione viene eseguita dopo tutte le azioni già inserite.
 * @param {Action} action L'azione da inserire.
 * @return {void}
 */
ActionListener.prototype.addAction = function (action) {
    this.actions.push(action);
};

/**
 * Esegue la lista di azioni che è stata precedentemente memorizzata.
 * @override
 * @return {void}
 */
ActionListener.prototype.performAction = function () {
    for (var i = 0; i < this.actions.length; i++)
		if(this.actions[i])
			this.actions[i].performAction();
};