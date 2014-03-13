/**
 * FILE: AttackResultMenuFactory.js
 * PERCORSO /Codice/sgad/clienttier/controller/menufactory/AttackResultMenuFactory.js
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-24 - Implementazione dei metodi createWinWidget(frame), createLostWidget(frame),
 * createReportWidget(frame) e createCloseFrameAction(frame) - Battistella Stefano
 * 2014-02-23 - Creazione della classe - Battistella Stefano
 */

//Eredita da MenuFactory
AttackResultMenuFactory.prototype = new MenuFactory();

//Costruttore della classe.
AttackResultMenuFactory.prototype.constructor = AttackResultMenuFactory;

/**
 * Classe per la creazione di un menu che permetta all'utente di visualizzare l'esito dello scontro.
 * @implements MenuFactory
 * @constructor
 * @param {bool} result Il risultato, positivo o negativo, della battaglia.
 * @param {Object} userUnits Le unità perse dall'utente.
 * @param {Object} otherUserUnits Le unità perse dal giocatore attaccato.
 * @param {Object} avversaryVillage Il villaggio del giocatore attaccato.
 */
function AttackResultMenuFactory(result, userUnits, otherUserUnits, avversaryVillage) {
	/**
	 * Indica se la battaglia è stata vinta o meno.
	 * @type {bool}
     * @private
	 */
	this.result = result;
    /**
     * Le unità perse dall'utente.
     * @type {Object}
     * @private
     */
    this.userUnits = userUnits;
    /**
     * Le unità perse dal giocatore attaccato.
     * @type {Object}
     * @private
     */
    this.otherUserUnits = otherUserUnits;
    /**
     * Il villaggio del giocatore attaccato.
     * @type {Object}
     * @private
     */
	this.avversaryVillage = avversaryVillage;
}

/**
 * Fornisce il frame contenente il menù col risultato della battaglia.
 * @override
 * @return {FrameWidget} Il frame che contiene il menù.
 */
AttackResultMenuFactory.prototype.buildMenu = function () {
	var bound = Bound.getInstance();

	var title = "Risultato della battaglia - ";
	if(this.result)
		title += "Vittoria!";
	else
		title += "Sconfitta!";

	var frame = new FrameWidget(title, new Point2D(0, 0)); //creo il frame per visualizzare la richiesta

	if(this.result)
		this.createWinWidget(frame);
	else
		this.createLostWidget(frame);

	var positionX = (bound.getWidth() - frame.getWidth()) / 2; //posiziono il frame al centro della schermata
	var positionY = (bound.getHeight() - frame.getHeight()) / 2;

	frame.shiftPosition(new Point2D(positionX, positionY));

	frame.setIsShiftable(false);
	frame.setZIndex(1000);
	return frame;
};

/**
 * Crea il frame col menù del risultato per il vincitore.
 * @param {FrameWidget} frame Il frame che contiene il menù.
 * @return {void}
 */
AttackResultMenuFactory.prototype.createWinWidget = function(frame) {
	var winImage = new ImageWidget("canvas/images/win.jpg", new Point2D(0, 0), 400, 200);

	var topOffset = this.createReportWidget(frame);

	var continueButton = new ButtonWidget("Prosegui", new Point2D(160, 210 + topOffset), 80, 25);

	frame.addWidget(continueButton);

	frame.addWidget(winImage);

	var action = this.createCloseFrameAction(frame);
	action.addAction(new LoadAnotherUser(this.avversaryVillage));
	continueButton.setOnClickEvent(action);
};

/**
 * Crea il frame col menù del risultato per il perdente.
 * @param {FrameWidget} frame Il frame che contiene il menù.
 * @return {void}
 */
AttackResultMenuFactory.prototype.createLostWidget = function(frame) {
	var lostImage = new ImageWidget("canvas/images/lost.jpg", new Point2D(0, 0), 400, 200);

	var topOffset = this.createReportWidget(frame);

	var closeButton = new ButtonWidget("Chiudi", new Point2D(160, 210 + topOffset), 80, 25);

	frame.addWidget(closeButton);

	frame.addWidget(lostImage);

	var action = this.createCloseFrameAction(frame);
	closeButton.setOnClickEvent(action);
};

/**
 * Crea il frame col menù che mostra il report finale della battaglia.
 * @param {FrameWidget} frame Il frame che contiene il menù.
 * @return {int} L'altezza dell'area testuale.
 */
AttackResultMenuFactory.prototype.createReportWidget = function(frame) {

	var attackUser = new TextWidget("Attaccante", new Point2D(0, 200), 200);
	var topOffset = attackUser.getHeight();

	for(var i = 0; i < this.userUnits.length; i++) {
		var sendToAttack = this.userUnits[i]["sendToAttack"];
		var attackLost = this.userUnits[i]["lost"];
		var survivingUnitAttack = sendToAttack - attackLost;
		var unitsAttackLost = this.userUnits[i]["unit"] + ": " + survivingUnitAttack + " = " + sendToAttack + " - " + attackLost;
		var unitsAttacckWidget = new TextWidget(unitsAttackLost, new Point2D(0, 200 + topOffset), 200);
		topOffset += unitsAttacckWidget.getHeight();
		frame.addWidget(unitsAttacckWidget);
	}

	var defenceUser = new TextWidget("Difensore", new Point2D(200, 200), 200);
	topOffset = defenceUser.getHeight();

	for(var j = 0; j < this.otherUserUnits.length; j++) {
		var sendToDefence = this.otherUserUnits[j]["sendToAttack"];
		var defenceLost = this.otherUserUnits[j]["lost"];
		var survivingUnitDefence = sendToDefence - defenceLost;
		var unitsDefenceLost = this.otherUserUnits[j]["unit"] + ": " + survivingUnitDefence + " = " + sendToDefence + " - " + defenceLost;
		var unitsDefenceWidget = new TextWidget(unitsDefenceLost, new Point2D(200, 200 + topOffset), 200);
		topOffset += unitsDefenceWidget.getHeight();
		frame.addWidget(unitsDefenceWidget);
	}

	frame.addWidget(attackUser);
	frame.addWidget(defenceUser);

	return topOffset;
};

/**
 * Crea l'azione associata alla chiusura del menù generale col risultato della battaglia.
 * @param {FrameWidget} frame Il frame che contiene il menù.
 * @return {ActionListener} Lista di azioni da eseguire.
 */
AttackResultMenuFactory.prototype.createCloseFrameAction = function(frame) {
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