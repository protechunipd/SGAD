/**
 * FILE: EnableRightClick.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/EnableRightClick.js
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
EnableRightClick.prototype = new Action();

//Costruttore della classe.
EnableRightClick.prototype.constructor = EnableRightClick;

/**
 * Classe per permettere di abilitare la gestione dell'evento click destro del mouse.
 * @implements Action
 * @constructor
 */
function EnableRightClick() {}

/**
 * Abilita il click destro del mouse.
 * @override
 * @return {void}
 */
EnableRightClick.prototype.performAction = function () {
	Context.getInstance().enableRightClick();
};