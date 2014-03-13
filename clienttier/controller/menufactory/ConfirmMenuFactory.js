/**
 * FILE: ConfirmMenuFactory.js
 * PERCORSO /Codice/sgad/clienttier/controller/menufactory/ConfirmMenuFactory.js
 * DATA CREAZIONE: 19 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Creazione della classe - Battistella Stefano
 */

//Eredita da MenuFactory
ConfirmMenuFactory.prototype = new MenuFactory();

//Costruttore della classe.
ConfirmMenuFactory.prototype.constructor = ConfirmMenuFactory;

/**
 * Classe per la creazione di un menu che permetta di confermare una generica azione.
 * @implements MenuFactory
 * @constructor
 * @param {Action} confirmAction L'azione da eseguire alla conferma.
 * @param {Action} denyAction L'azione da eseguire all'annullamento.

 */
function ConfirmMenuFactory(confirmAction, denyAction) {
	/**
	 * L'azione da eseguire alla conferma.
	 * @type {Action}
     * @private
	 */
	this.confirmAction = confirmAction;
	/**
	 * L'azione da eseguire all'annullamento.
	 * @type {Action}
     * @private
	 */
	this.denyAction = denyAction;
}

/**
 * Costruisce il menu per la conferma dell'azione.
 * @override
 * @return {FrameWidget} Il frame contente il menu di conferma.
 */
ConfirmMenuFactory.prototype.buildMenu = function () {
	var bound = Bound.getInstance();
	var frame = new FrameWidget("Conferma operazione", new Point2D(0, 0)); //creo il frame per visualizzare la richiesta

	var text = "Sei sicuro di voler proseguire con l'operazione?";
	var textWidget = new TextWidget(text, new Point2D(0, 0), 150); //testo della richiesta
	var textHeight = textWidget.getHeight();

	var denyButton = new ButtonWidget("Annulla", new Point2D(0, textHeight + 5), 60, 30); //bottone per l'annullamento della richiesta
	var confirmButton = new ButtonWidget("Conferma", new Point2D(90, textHeight + 5), 60, 30); //bottone per la conferma della richiesta

	frame.addWidget(textWidget);
	frame.addWidget(denyButton);
	frame.addWidget(confirmButton);

	var denyActionListener = new ActionListener();
	var confirmActionListener = new ActionListener();
	denyActionListener.addAction(new EnableRightClick());
	confirmActionListener.addAction(new EnableRightClick());
	var widgets = frame.getWidgets();

	for (var i = 0; i < widgets.length; i++) { //per ogni widget nel frame creo un'azione che me lo rimuoverà
		var removeGraphicObjectAction = new RemoveGraphicObjectAction(widgets[i]);
		denyActionListener.addAction(removeGraphicObjectAction);
		confirmActionListener.addAction(removeGraphicObjectAction);
	}

	var removeFrameAction = new RemoveGraphicObjectAction(frame); //rimuovo anche il frame
	denyActionListener.addAction(removeFrameAction);
	confirmActionListener.addAction(removeFrameAction);
	denyActionListener.addAction(this.denyAction);
	confirmActionListener.addAction(this.confirmAction);

	denyButton.setOnClickEvent(denyActionListener); //imposto l'azione da eseguire all'annullamento
	confirmButton.setOnClickEvent(confirmActionListener); //imposto l'azione da eseguire alla conferma
	var positionX = (bound.getWidth() - frame.getWidth()) / 2; //posiziono il frame al centro della schermata
	var positionY = (bound.getHeight() - frame.getHeight()) / 2;

	frame.shiftPosition(new Point2D(positionX, positionY));

	frame.setIsShiftable(false);
	frame.setZIndex(1000);
	return frame;
};