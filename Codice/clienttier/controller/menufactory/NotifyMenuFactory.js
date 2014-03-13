/**
 * FILE: NotifyMenuFactory.js
 * PERCORSO /Codice/sgad/clienttier/controller/menufactory/NotifyMenuFactory.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-18 - Creazione della classe - Battistella Stefano
 */

//Eredita da MenuFactory
NotifyMenuFactory.prototype = new MenuFactory();

//Costruttore della classe.
NotifyMenuFactory.prototype.constructor = NotifyMenuFactory;

/**
 * Classe per la costruzione di un menu per la visualizzazione di una notifica.
 * @implements MenuFactory
 * @constructor
 * @param {string} notifyText Il testo da visualizzare come contenuto della notifica.
 * @param {Action} onContinueAction L'azione da eseguire al proseguimento della notifica.
 */
function NotifyMenuFactory(notifyText, onContinueAction) {
	/**
	 * Il testo da visualizzare come contenuto della notifica.
	 * @type {string}
     * @private
	 */
	this.notifyText = notifyText;

	/**
	 * L'azione da eseguire al proseguimento della notifica.
	 * @type {Action}
     * @private
	 */
	this.onContinueAction = onContinueAction;
}

/**
 * Fornisce il frame contenente la notifica da visualizzare.
 * @override
 * @return {FrameWidget} frame Il frame contenente la notifica da visualizzare.
 */
NotifyMenuFactory.prototype.buildMenu = function() {
	var bound = Bound.getInstance();
	var frame = new FrameWidget("Attenzione!", new Point2D(0, 0)); //creo il frame per visualizzare la notifica

	var textWidget = new TextWidget(this.notifyText, new Point2D(0, 0), 180); //testo della notifica
	var textHeight = textWidget.getHeight();

	var continueButton = new ButtonWidget("Ok", new Point2D(120, textHeight + 20), 60, 25); //bottone per continuare e chiudere della notifica

	frame.addWidget(textWidget);
	frame.addWidget(continueButton);

	var continueActionListener = new ActionListener();
	var widgets = frame.getWidgets();

	for (var i = 0; i < widgets.length; i++) { //per ogni widget nel frame creo un'azione che me lo rimuoverà
		var removeGraphicObjectAction = new RemoveGraphicObjectAction(widgets[i]);
		continueActionListener.addAction(removeGraphicObjectAction);
	}

	var removeFrameAction = new RemoveGraphicObjectAction(frame); //rimuovo anche il frame
	continueActionListener.addAction(removeFrameAction);
	continueActionListener.addAction(this.onContinueAction);

	continueButton.setOnClickEvent(continueActionListener); //imposto l'azione da eseguire al continuamento
	var positionX = (bound.getWidth() - frame.getWidth()) / 2; //posiziono il frame al centro della schermata
	var positionY = (bound.getHeight() - frame.getHeight()) / 2;

	frame.shiftPosition(new Point2D(positionX, positionY));

	frame.setIsShiftable(false);
	frame.setZIndex(1000);
	
	return frame;
};