/**
 * FILE: UnitSelectionMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/menufactory/UnitSelectionMenu.js
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Battistella Stefano
 */

//Eredita da MenuFactory
UnitSelectionMenu.prototype = new MenuFactory();

//Costruttore della classe.
UnitSelectionMenu.prototype.constructor = UnitSelectionMenu;

/**
 * Classe per la creazione di un menu che visualizzi le unità producibili in un edificio.
 * @implements MenuFactory
 * @constructor
 * @param {BuildingPossession} buildingPossession L'edificio associato alla produzione di unità.

 */
function UnitSelectionMenu(buildingPossession) {
    /**
     * L'edificio associato alla produzione di unità.
     * @type {BuildingPossession}
     * @private
     */
    this.buildingPossession = buildingPossession;
}

/**
 * Costruisce il menù per la selezione delle unità.
 * @override
 * @return {FrameWidget} Il frame contenente il menù.
 */
UnitSelectionMenu.prototype.buildMenu = function () {
	var frame = new FrameWidget("Seleziona l'unità", new Point2D(0, 0)); //costruisco il frame delle unità da scegliere
	var bound = Bound.getInstance();

	var unitWidgets = this.createUnitSelectionWidgets(frame);
	var unitImages = unitWidgets[0];
	var unitButtons = unitWidgets[1];

	var closeButton = new ButtonWidget("Chiudi", new Point2D(frame.getWidth() - 50, frame.getHeight() - 25), 50, 25); //costruisco un bottone per chiudere il frame
	frame.addWidget(closeButton); //aggiungo il bottone per chiudere il frame

	var units = this.buildingPossession.getBuilding().getProductedUnits();
	for(var i = 0; i < units.length; i++) {
		var actionListenerImages = this.createCloseFrameAction(frame);
		actionListenerImages.addAction(new ShowTrainUnitMenu(this.buildingPossession, units[i]));
		unitImages[i].setOnClickEvent(actionListenerImages);
		var actionListenerButtons = this.createCloseFrameAction(frame);
		actionListenerButtons.addAction(new ShowDismissUnitMenu(this.buildingPossession, units[i]));
		unitButtons[i].setOnClickEvent(actionListenerButtons);
	}
	closeButton.setOnClickEvent(this.createCloseFrameAction(frame));

	var positionX = (bound.getWidth() - frame.getWidth()) / 2; //posiziono il frame al centro della schermata
	var positionY = (bound.getHeight() - frame.getHeight()) / 2;

	frame.shiftPosition(new Point2D(positionX, positionY));

	frame.setIsShiftable(false);
	frame.setZIndex(1000);

	return frame;
};

/**
 * Crea dei widgets per visualizzare le unità addestrabili.
 * @param {FrameWidget} frame Il frame che contiene il menù.
 * @return {Array<ImageWidget>}
 */
UnitSelectionMenu.prototype.createUnitSelectionWidgets = function (frame) {
	var units = this.buildingPossession.getBuilding().getProductedUnits();
	var unitInProgress = this.buildingPossession.getUnitInProgress();
	var userData = UserDataManager.getInstance().getUserData();
	var i = 0;
	var width = 60;
	var height = 60;
	var unitImages = [];
	var unitButtons = [];
	for (; i < units.length; i++) {
		var unit = units[i];
		var path = "canvas/images/" + unit.getKey() + ".png";
		var unitImage = new ImageWidget(path, new Point2D((width + 5) * i, 0), width, height);
		var unitText = new TextWidget(unit.getName(), new Point2D((width + 5) * i, height), width);
		unitText.setFontWeight("bold");
		unitText.setTextHeight(13);
		var cost = unit.getCost();
		var resources = cost.getQuantityResource();
		var textCosts = [];
		var imageCosts = [];
		var previousHeight = unitText.getHeight();
		var possibleTraining = true;
		for (var j = 0; j < resources.length; j++) {
			var resourceName = resources[j].getResource().getResourceName(); //ottengo il nome della risorsa
			var resourceKey = resources[j].getResource().getKey(); //ottengo la chiave della risorsa
			var quantity = resources[j].getQuantity(); //ottengo la quantità richiesta
			if (userData.getOwnedResource(resourceKey).getQuantity() < quantity) //controllo se la quantità richiesta sia posseduta dal'utente
				possibleTraining = false; //disabilito la possibilità di costruire l'unità
			imageCosts[j] = new ImageWidget("canvas/images/" + resourceName + ".png", new Point2D((width + 5) * i, height + previousHeight + 4), 15, 15);
			textCosts[j] = new TextWidget(quantity.toString(), new Point2D((width + 5) * i + 20, height + previousHeight), width - 20);
			previousHeight += textCosts[j].getHeight();
		}
		if(unitInProgress && (unit.getKey() !== unitInProgress.getKey()))
			possibleTraining = false;
		unitImage.setEnabled(possibleTraining);
		var totalseconds = cost.getRelativeTime();
		var hours = Math.floor(totalseconds / 3600);
		var minutes = Math.floor((totalseconds - hours * 3600) / 60);
		var seconds = totalseconds - hours * 3600 - minutes * 60;
		var time = hours + "h " + minutes + "m " + seconds + "s";
		var imageCost = new ImageWidget("canvas/images/time.png", new Point2D((width + 5) * i, height + previousHeight + 4), 15, 15);
		var textCost = new TextWidget(time.toString(), new Point2D((width + 5) * i + 20, height + previousHeight), width - 20);
		textCosts.push(textCost);
		imageCosts.push(imageCost);
		previousHeight += textCost.getHeight();
		var trainButton = new ButtonWidget("Addestra", new Point2D((width + 5) * i, height + previousHeight + 5), width, 25);
		unitImages.push(trainButton);
		previousHeight += trainButton.getHeight();
		var dismissButton = new ButtonWidget("Congeda", new Point2D((width + 5) * i, height + previousHeight + 10), width, 25);
		unitButtons.push(dismissButton);

		frame.addWidget(trainButton);
		frame.addWidget(dismissButton);
		frame.addWidget(unitText);
		frame.addWidget(unitImage);
		for (var k = 0; k < textCosts.length; k++) {
			frame.addWidget(imageCosts[k]);
			frame.addWidget(textCosts[k]); //aggiungo i vari costi
		}
	}

	return [unitImages, unitButtons];
};

/**
 * Costruisce l'azione per la chiusura del menù.
 * @param {FrameWidget} frame Il frame che contiene il menù.
 * @return {ActionListener} Lista di azioni da eseguire.
 */
UnitSelectionMenu.prototype.createCloseFrameAction = function(frame) {
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