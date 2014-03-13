/**
 * FILE: LogMenuFactory.js
 * PERCORSO /Codice/sgad/clienttier/controller/menufactory/LogMenuFactory.js
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
LogMenuFactory.prototype = new MenuFactory();

//Costruttore della classe.
LogMenuFactory.prototype.constructor = LogMenuFactory;

/**
 * Classe per la costruzione di un menu che permetta all'utente di modificare il proprio account.
 * @implemets MenuFactory
 * @constructor
 * @param {Array.<string>} events Il log degli eventi.
 */
function LogMenuFactory(events) {
    /**
     * Il log degli eventi.
     * @type {String}
     * @private
     */
	this.events = events;
}

/**
 * Costruisce il menu contestuale.
 * @override
 * @return {FrameWidget} Il frame contenente il menu contestuale.
 */
LogMenuFactory.prototype.buildMenu = function () {
	var bound = Bound.getInstance();
	var frame = new FrameWidget("Eventi", new Point2D(0, 0)); //creo il frame per visualizzare i dati

	var offset = 0;
	for(var i = 0; i < this.events.length; i++) {
		var eventWidget = new TextWidget(this.events[i], new Point2D(0, offset), 300);
		offset += eventWidget.getHeight();
		frame.addWidget(eventWidget);
	}

	var closeButton = new ButtonWidget("Chiudi", new Point2D(250, offset), 50, 25);
	frame.addWidget(closeButton);

	closeButton.setOnClickEvent(this.createCloseFrameAction(frame));


	var positionX = (bound.getWidth() - frame.getWidth()) / 2; //posiziono il frame al centro della schermata
	var positionY = (bound.getHeight() - frame.getHeight()) / 2;

	frame.shiftPosition(new Point2D(positionX, positionY));

	frame.setIsShiftable(false); //imposto che il frame non possa essere traslato
	frame.setZIndex(10000);

	return frame;
};

/**
 * Crea l'azione associata alla chiusura del menù generale col risultato della battaglia.
 * @param {FrameWidget} frame Il frame che contiene il menù.
 * @return {ActionListener} Lista di azioni da eseguire.
 */
LogMenuFactory.prototype.createCloseFrameAction = function(frame) {
	var closeActionListener = new ActionListener();
	closeActionListener.addAction(new EnableRightClick());
	var widgets = frame.getWidgets();

	for (var i = 0; i < widgets.length; i++) { //per ogni widget nel frame creo un'azione che me lo rimuoverà
		var removeGraphicObjectAction = new RemoveGraphicObjectAction(widgets[i]);
		closeActionListener.addAction(removeGraphicObjectAction);
	}

	var removeFrameAction = new RemoveGraphicObjectAction(frame); //rimuovo anche il frame
	closeActionListener.addAction(removeFrameAction);
	return closeActionListener;
};