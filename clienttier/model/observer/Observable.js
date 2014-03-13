/**
 * FILE: Observable.js
 * PERCORSO /Codice/sgad/clienttier/model/observer/Observable.js
 * DATA CREAZIONE: 11 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-11 - Creazione della classe - Battistella Stefano
 */

 /**
 * Classe astratta per la gestione di oggetti osservabili.
 * Essi, al cambiamento di stato, notificheranno tutti gli oggetti osservatori che richiedono di conoscere tali cambiamenti.
 * @constructor
 */

function Observable() {
	/**
	 * Lista di osservatori che richiedono di essere notificati ad un cambiamento di stato.
	 * @type {Array.<Observer>}
	 * @private
	 */
	this.observers = [];

}

/**
 * Notifica a tutti gli osservatori che è avvenuto un aggiornamento.
 * @return {void}
 */
Observable.prototype.notify = function() {
	var i;
    var observers = this.observers;
	for (i = 0; i < observers.length; i++) {
		observers[i].update();
	}
};

/**
 * Fornisce un valore numerico rappresentante una quantità.
 * @return {int} La quantità.
 * @abstract
 */
Observable.prototype.getState = function() {
};

/**
 * Aggiunge un osservatore alla lista degli osservatori.
 * @param {Observer} observer Osservatore che deve essere aggiunto.
 * @return {void}
 */
Observable.prototype.addObserver = function(observer) {
	var observers = this.observers;
	observers.push(observer);
};

/**
 * Rimuove un osservatore dalla lista degli osservatori.
 * @param {Observer} observer Osservatore che deve essere rimosso.
 * @return {void}
 */
Observable.prototype.removeObserver = function(observer) {
	var observers = this.observers;
	var index = observers.indexOf(observer);
	if (index > -1)
		observers.splice(index, 1);
};
