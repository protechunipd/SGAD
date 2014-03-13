/**
 * FILE: Resize.js
 * PERCORSO /Codice/sgad/clienttier/view/commands/Resize.js
 * DATA CREAZIONE: 16 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-16 - Creazione della classe - Battistella Stefano
 */

//Eredita da Command.
Resize.prototype = new Command();

//Costruttore della classe.
Resize.prototype.constructor = Resize;

/**
 * Classe per la gestione di un evento, di tipo resize, nell'area di gioco.
 * @extends Command
 * @constructor
 */
function Resize() {}

/**
 * Ridimensiona il bound dello stesso valore indicato nell'evento.
 * @override
 * @param {Event} event L'evento verificatosi.
 * @param {Iterator} iterator L'iteratore può essere imposto a null. Il metodo non necessita di iteratori.
 * @return {void}
 */
Resize.prototype.execute = function(event, iterator) {
	Bound.getInstance().setWidth(document.body.offsetWidth);
	Bound.getInstance().setHeight(document.body.offsetHeight);
};
