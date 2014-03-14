/**
 * FILE: Click.js
 * PERCORSO /Codice/sgad/clienttier/view/commands/Click.js
 * DATA CREAZIONE: 15 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-15 - Creazione della classe - Gallo Francesco
 */

//Eredita da Command.
Click.prototype = new Command();

//Costruttore della classe.
Click.prototype.constructor = Click;

/**
 * Classe per la gestione di un evento, di tipo click sinistro del mouse, nell'area di gioco.
 * @extends Command
 * @constructor
 */
function Click() {
}

/**
 * Individua l'oggetto con minore profondità sul quale si è verificato l'evento. Delega poi ad esso la gestione.
 * @override
 * @param {Event} event L'evento contenente le coordinate nel quale si è verificato.
 * @param {Iterator} iterator L'iteratore che permette di scorrersi la collezione di elementi.
 * @return {void}
 */
Click.prototype.execute = function (event, iterator) {
	var clicked = false;
	var object = null;
	var posx = 0;
	var posy = 0;

	if (!event) //controllo se il browser supporta l'evento
		event = window.event; //ottengo l'evento se il browser supporta la posizione dell'evento mediante page
	if (event.pageX || event.pageY) { //controllo se la posizione viene accettata mediante pageX e pageY
		posx = event.pageX; //imposto la coordinata x
		posy = event.pageY; //imposto la coordinata y
	}
	else if (event.clientX || event.clientY) { //controllo se il browser supporta la posizione dell'evento mediante client
		posx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; //ottengo la coordinata x
		posy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop; //ottengo la cooridinata y
	}
	//ora posx e posy contengono le corrette coordinate del mouse nella finestra
	var point = new Point2D(posx, posy);
	iterator.last(); //posiziono l'iteratore in ultima posizione
	for (; !iterator.isDone() && !clicked; iterator.previous()) { //proseguo finchè un oggetto non cattura l'evento
		object = iterator.getItem(); //ottengo l'oggetto
		clicked = object.areYouClicked(point) && !object.getIgnoreEvents(); //controllo se l'oggetto è cliccato e se cattura gli eventi
	}
	if (clicked)
		object.onClick(); //eseguo l'evento sull'oggetto
};
