/**
 * FILE: BuildingContextualMenuFactory.js
 * PERCORSO /Codice/sgad/clienttier/controller/menufactory/BuildingContextualMenuFactory.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Implementato i metodi createTrainUnitsWidget(frame) e createTrainUnitsQueueWidget(frame) - Battistella Stefano
 * 2014-02-19 - Implementato i metodi createUpgradeWidget(frame) e createDemolishWidget(frame) - Battistella Stefano
 * 2014-02-18 - Creazione della classe - Battistella Stefano
 */

//Eredita da MenuFactory
BuildingContextualMenuFactory.prototype = new MenuFactory();

//Costruttore della classe.
BuildingContextualMenuFactory.prototype.constructor = BuildingContextualMenuFactory;

/**
 * Classe per la creazione di un menu di tipo contestuale relativo ad una costruzione.
 * @implemets MenuFactory
 * @constructor
 * @param {BuildingComponent} buildingComponent L'edificio di riferimento dal quale recuperare i dati.
 * @param {Point2D} topLeftOffset La posizione del punto in alto a sinistra.
 */
function BuildingContextualMenuFactory(buildingComponent, topLeftOffset) {
    /**
     * L'edificio di riferimento dal quale recuperare i dati.
     * @type {BuildingComponent}
     * @private
     */
    this.buildingComponent = buildingComponent;
    /**
     * Il tipo dell'edificio dal quale recuperare i dati.
     * @type {BuildingPossession}
     * @private
     */
    this.buildingPossession = buildingComponent.getBuildingPossession();
    /**
     * La posizione del punto in alto a sinistra.
     * @type {Point2D}
     * @private
     */
    this.topLeftOffset = topLeftOffset;
    /**
     * Grandezza dell'edificio.
     * @type {int}
     * @int
     */
    this.size = 60;
}

/**
 * Costruisce il menu contestuale.
 * @override
 * @return {FrameWidget} Il frame contenente il menu contestuale.
 */
BuildingContextualMenuFactory.prototype.buildMenu = function () {
	var building = this.buildingPossession.getBuilding();
	var title = building.getNameBuilding() + " - Lv " + building.getLevel(); //creo il titolo del menu contestuale

	var point = new Point2D(0, 0);
	point.addPoint2D(this.topLeftOffset);
	point.addPoint2D(Bound.getInstance().getTopLeftOffset());
	var frame = new FrameWidget(title, point); //costruisco il frame del menu contestuale

	if (this.buildingPossession.getIsFinished()) {
		this.createUpgradeWidget(frame); //costruisco un widget per migliorare l'edificio
		if(this.buildingPossession.getBuilding().getIsDestructible())
			this.createDemolishWidget(frame); //costruisco un widget per demolire l'edificio

		if (building.getProductedUnits().length > 0) //controllo se posso addestrare unità
			this.createTrainUnitsWidget(frame); //costruisco un widget per addestrare unità

		this.createProductedResourcesWidget(frame);

		if (this.buildingPossession.getUnitInProgress() !== null) //controllo se ci sono unità in coda
			this.createTrainUnitsQueueWidget(frame); //costruisco un widget per visualizzare le unità in coda

		this.createPreconditionsWidget(frame);
	}
	else {
		this.createRemainingTimeWidget(frame);
	}
	var closeButton = new ButtonWidget("Chiudi", new Point2D(frame.getWidth() - 50, frame.getHeight() - 25), 50, 25); //costruisco un bottone per chiudere il frame
	var closeContextualMenu = new CloseContextualMenu();
	closeButton.setOnClickEvent(closeContextualMenu);
	frame.addWidget(closeButton); //aggiungo il bottone per chiudere il frame

	var bound = Bound.getInstance();
	var frameHeight = frame.getHeight();
	var frameWidth = frame.getWidth();

	if(this.topLeftOffset.getX() + frameWidth > bound.getWidth())
		point.subPoint2D(new Point2D(frameWidth, 0));
	if(this.topLeftOffset.getY() + frameHeight > bound.getHeight())
		point.subPoint2D(new Point2D(0, frameHeight));

	frame.setZIndex(900);

	return frame;
};

/**
 * Costruisce un widget per il miglioramento di un edificio.
 * @param {FrameWidget} frame Il frame nel quale inserire il widget.
 * @return {void}
 */
BuildingContextualMenuFactory.prototype.createUpgradeWidget = function (frame) {
	var userData = UserDataManager.getInstance().getUserData();
	var building = this.buildingPossession.getBuilding();
	var titleUpgrade = new TextWidget("Migliora", new Point2D(0, 0), this.size); //titolo del widget
	var topOffset = titleUpgrade.getHeight(); //l'altezza del titolo
	var imageUpgrade = new ImageWidget("canvas/images/upgrade.png", new Point2D(0, topOffset), this.size, this.size); //immagine del widget
	var actionListener = new ActionListener();
	actionListener.addAction(new CloseContextualMenu());
	actionListener.addAction(new ShowUpgradeMenu(this.buildingPossession));
	imageUpgrade.setOnClickEvent(actionListener);
	var textTitleCost = new TextWidget("Costo", new Point2D(0, this.size + 5 + topOffset), this.size); //titolo per riepilogare i costi
	textTitleCost.setFontWeight("bold");
	textTitleCost.setTextHeight(13);
	topOffset += textTitleCost.getHeight();
	var textCosts = [];
	var imageCosts = [];
	var nextLevel = DataFactory.getInstance().getBuilding(building.getNextLevelKey()); //ottengo il livello successivo
	if (nextLevel !== null) { //controllo se esiste il livello successivo
		var cost = nextLevel.getCost(); //ottengo i costi del livello successivo
		var resources = cost.getQuantityResource(); //ottengo le risorse necessarie per il livello successivo
		var possibleUpdate = true;
		for (var i = 0; i < resources.length; i++) {
			var resourceName = resources[i].getResource().getResourceName(); //ottengo il nome della risorsa
			var resourceKey = resources[i].getResource().getKey(); //ottengo la chiave della risorsa
			var quantity = resources[i].getQuantity(); //ottengo la quantità richiesta
			if (userData.getOwnedResource(resourceKey).getQuantity() < quantity) //controllo se la quantità richiesta sia posseduta dal'utente
				possibleUpdate &= false; //disabilito la possibilità di costruire l'edificio
			imageCosts[i] = new ImageWidget("canvas/images/" + resourceName + ".png", new Point2D(0, this.size + 9 + topOffset), 15, 15);
			textCosts[i] = new TextWidget(quantity.toString(), new Point2D(20, this.size + 5 + topOffset), this.size - 20);
			topOffset += textCosts[i].getHeight();
		}
		var time = cost.getRelativeTime();
		var timeImage = new ImageWidget("canvas/images/time.png", new Point2D(0, this.size + 9 + topOffset), 15, 15);
		var textCost = new TextWidget(time.toString(), new Point2D(20, this.size + 5 + topOffset), this.size - 20);
		textCost.setUseDateFormat(true);
		imageCosts.push(timeImage);
		textCosts.push(textCost);
		imageUpgrade.setEnabled(possibleUpdate);
	} else {
		imageUpgrade.setEnabled(false); //se non esiste il livello successivo disabilito l'immagine
		textCosts[0] = new TextWidget("Livello massimo raggiunto.", new Point2D(0, this.size + 5 + topOffset), this.size);
	}

	frame.addWidget(titleUpgrade); //aggiungo il titolo
	frame.addWidget(imageUpgrade); //aggiungo l'immagine
	frame.addWidget(textTitleCost); //aggiungo la didascalia dei costi
	for (var j = 0; j < imageCosts.length; j++)
		frame.addWidget(imageCosts[j]); //aggiungo i vari costi
	for (var k = 0; k < textCosts.length; k++)
		frame.addWidget(textCosts[k]); //aggiungo i vari costi
};

/**
 * Costruice un widget per demolire l'edificio.
 * @param {FrameWidget} frame Il frame nel quale inserire il widget.
 * @return {void}
 */
BuildingContextualMenuFactory.prototype.createDemolishWidget = function (frame) {
	var building = this.buildingPossession.getBuilding();
	var titleDemolish = new TextWidget("Demolisci", new Point2D(this.size, 0), this.size); //titolo del widget
	var topOffset = titleDemolish.getHeight();
	var imageDemolish = new ImageWidget("canvas/images/demolish.png", new Point2D(this.size + 5, topOffset), this.size, this.size); //immagine del widget
	var actionListener = new ActionListener();
	actionListener.addAction(new CloseContextualMenu());
	actionListener.addAction(new ShowDemolishMenu(this.buildingComponent));
	imageDemolish.setOnClickEvent(actionListener);
	var textTitleDemolish = new TextWidget("Rimborso", new Point2D(this.size + 5, this.size + 5 + topOffset), this.size); //titolo per riepilogare le risorse guadagnate
	textTitleDemolish.setFontWeight("bold");
	textTitleDemolish.setTextHeight(13);
	topOffset += textTitleDemolish.getHeight();
	var imageEarn = [];
	var textEarn = [];
	var costs = building.getCost().getQuantityResource(); //ottengo le risorse guadagnate
	var resourceName;
	var cost;
	for (var i = 0; i < costs.length; i++) {
		resourceName = costs[i].getResource().getResourceName(); //ottengo il nome della risorsa
		cost = costs[i].getQuantity() / 2; //la quantità guadagnata è pari alla metà del costo
		imageEarn[i] = new ImageWidget("canvas/images/" + resourceName + ".png", new Point2D(this.size + 5, this.size + 9 + topOffset), 15, 15);
		textEarn[i] = new TextWidget(cost.toString(), new Point2D(this.size + 25, this.size + 5 + topOffset), this.size); //creo il widget per visualizzare il costo
		topOffset += textEarn[i].getHeight();
	}

	frame.addWidget(titleDemolish); //aggiungo il titolo al frame
	frame.addWidget(imageDemolish); //aggiungo l'immagine al frame
	frame.addWidget(textTitleDemolish); //aggiungo la didascalia al frame
	for (var j = 0; j < textEarn.length; j++) {
		frame.addWidget(imageEarn[j]); //aggiungo la risorsa
		frame.addWidget(textEarn[j]);
	}
};

/**
 * Costruisce un widget per addestrare unità.
 * @param {FrameWidget} frame Il frame al quale aggiungere il widget.
 * @return {void}
 */
BuildingContextualMenuFactory.prototype.createTrainUnitsWidget = function (frame) {
	var titleTrainUnits = new TextWidget("Addestra", new Point2D((this.size + 5)* 2, 0), this.size); //testo del widget
	var topOffset = titleTrainUnits.getHeight();
	var imageTrainUnits = new ImageWidget("canvas/images/train.png", new Point2D((this.size + 5)* 2, topOffset), this.size, this.size); //immagine del widget
	var actionListener = new ActionListener();
	actionListener.addAction(new CloseContextualMenu());
	actionListener.addAction(new ShowUnitSelectionMenu(this.buildingPossession));
	imageTrainUnits.setOnClickEvent(actionListener);
	frame.addWidget(titleTrainUnits); //aggiungo il titolo al frame
	frame.addWidget(imageTrainUnits); //aggiungo l'immagine al frame
};

/**
 * Costruisce un widget per visualizzare le unità in coda.
 * @param {FrameWidget} frame Il frame al quale aggiungere il widget.
 * @return {void}
 */
BuildingContextualMenuFactory.prototype.createTrainUnitsQueueWidget = function (frame) {
	var frameHeight = frame.getInnerHeight(); //ottengo l'altezza interna del frame
	var titleTrainUnitsQueue = new TextWidget("Unità in coda", new Point2D(0, frameHeight), this.size * 3); //creo il titolo
	titleTrainUnitsQueue.setFontWeight("bold");
	titleTrainUnitsQueue.setTextHeight(13);
	var unitInProgress = this.buildingPossession.getUnitInProgress(); //ottengo l'unità in coda
	if (unitInProgress === null)
		return;
	var unit = unitInProgress.getUnit(); //ottengo il tipo di unità in coda
	var unitName = unit.getName(); //ottengo il nome dell'unità in coda
	var unitQuantity = unitInProgress.getQuantity(); //ottengo la quantità di unità in coda
	var textTrainUnitsName = new ImageWidget("canvas/images/" + unitName + ".png", new Point2D(0, frameHeight + titleTrainUnitsQueue.getHeight() + 5), 25, 25);
	var textTrainUnitsQuantity = new TextWidget(unitQuantity.toString(), new Point2D(30, frameHeight + titleTrainUnitsQueue.getHeight() + 5), this.size); //creo il testo per visualizzare le unità in coda
	textTrainUnitsQuantity.addObservable(unitInProgress);
	var imageTime = new ImageWidget("canvas/images/time.png", new Point2D(this.size * 1.5 + 5, frameHeight + titleTrainUnitsQueue.getHeight() + 5), 25, 25);
	var textTime = new TextWidget(unitInProgress.getRemainingTime().toString(), new Point2D(this.size * 1.5 + 35, frameHeight + titleTrainUnitsQueue.getHeight() + 5), this.size); //creo il testo per visualizzare il tempo rimanente
	textTime.setUseDateFormat(true);
	textTime.addObservable(unitInProgress);
	textTime.setCallback("getRemainingTime");

	frame.addWidget(titleTrainUnitsQueue); //aggiungo il titolo al frame
	frame.addWidget(textTrainUnitsQuantity); //aggiungo le unità in coda al frame
	frame.addWidget(textTrainUnitsName); //aggiungo le unità in coda al frame
	frame.addWidget(imageTime); //aggiungo l'immagine del tempo rimanente al frame
	frame.addWidget(textTime); //aggiungo il tempo rimanente al frame
};

/**
 * Costruisce un widget per visualizzare le risorse prodotte.
 * @param {FrameWidget} frame Il frame nel quale inserire il widget.
 * @return {void}
 */
BuildingContextualMenuFactory.prototype.createProductedResourcesWidget = function (frame) {
	var frameHeight = frame.getInnerHeight(); //ottengo l'altezza interna del frame
	var titleProductedResourcesQueue = new TextWidget("Risorse prodotte", new Point2D(0, frameHeight), this.size * 3); //creo il titolo
	titleProductedResourcesQueue.setFontWeight("bold");
	titleProductedResourcesQueue.setTextHeight(13);
	var productedResources = this.buildingPossession.getBuilding().getProductedResource(); //ottengo le quantità prodotte
	if (productedResources === null)
		return;
	var resource = productedResources.getResource(); //ottengo il tipo di risorsa
	var resourceName = resource.getResourceName(); //ottengo il nome della risorsa
	var resourceQuantity = this.buildingPossession.getStoredResources(); //ottengo la quantità di risorsa
	var imageResourceName = new ImageWidget("canvas/images/" + resourceName + ".png", new Point2D(0, frameHeight + titleProductedResourcesQueue.getHeight() + 5), 25, 25);
	var textResourceQuantity = new TextWidget(resourceQuantity.toString(), new Point2D(30, frameHeight + titleProductedResourcesQueue.getHeight() + 5), this.size); //creo il testo per visualizzare la risorsa
	textResourceQuantity.addObservable(this.buildingPossession);
	textResourceQuantity.setCallback("getStoredResources");
	textResourceQuantity.setRatioFormat(true, productedResources.getMaxQuantity());
	var imageTime = new ImageWidget("canvas/images/time.png", new Point2D(this.size * 1.5 + 5, frameHeight + titleProductedResourcesQueue.getHeight() + 5), 25, 25);
	var textTime = new TextWidget(this.buildingPossession.getTime().toString(), new Point2D(this.size * 1.5 + 35, frameHeight + titleProductedResourcesQueue.getHeight() + 5), this.size); //creo il testo per visualizzare il tempo rimanente
	textTime.setUseDateFormat(true);
	textTime.addObservable(this.buildingPossession);

	frame.addWidget(titleProductedResourcesQueue); //aggiungo il titolo al frame
	frame.addWidget(textResourceQuantity); //aggiungo le risorse al frame
	frame.addWidget(imageResourceName); //aggiungo le immagini delle risorse al frame
	frame.addWidget(imageTime); //aggiungo l'immagine del tempo rimanente al frame
	frame.addWidget(textTime); //aggiungo il tempo rimanente al frame
};

/**
 * Costruisce un widget per visualizzare una precondizione.
 * @param {FrameWidget} frame Il frame nel quale inserire il widget.
 * @return {void}
 */
BuildingContextualMenuFactory.prototype.createPreconditionsWidget = function (frame) {
	var frameHeight = frame.getInnerHeight() - 5; //ottengo l'altezza interna del frame
	var titlePrecondition = new TextWidget("Precondizioni necessarie", new Point2D(0, frameHeight), this.size * 3); //creo il titolo
	titlePrecondition.setFontWeight("bold");
	titlePrecondition.setTextHeight(13);
	var topOffset = titlePrecondition.getHeight();
	var dataFactory = DataFactory.getInstance();
	var nextLevelKey = this.buildingPossession.getBuilding().getNextLevelKey(); //ottengo la chiave del livello successivo
	var nextLevel = dataFactory.getBuilding(nextLevelKey); //ottengo l'edificio rappresentante il livello successiv
	if(!nextLevel) //controllo se esite il livello successivo
		return;
	var preconditions = nextLevel.getPrecondition(); //ottengo le precondizioni
	if ((Object.keys(preconditions)).length === 0) //controllo se ci sono precondizioni
		return;
	frame.addWidget(titlePrecondition);
	for(var key in preconditions) {
		var precondition = preconditions[key].getNameBuilding() + " - Lv " + preconditions[key].getLevel();
		var textPrecondition = new TextWidget(precondition, new Point2D(0, frameHeight + topOffset + 5), this.size * 3); //creo il testo per visualizzare la precondizione
		topOffset += textPrecondition.getHeight();
		frame.addWidget(textPrecondition); //aggiungo la precondizione al frame
	}
};

/**
 * Costruisce un widget per visualizzare il tempo rimanente.
 * @param {FrameWidget} frame Il frame nel quale inserire il widget.
 * @return {void}
 */
BuildingContextualMenuFactory.prototype.createRemainingTimeWidget = function (frame) {
	var time = this.buildingPossession.getTime();
	var timeImage = new ImageWidget("canvas/images/time.png", new Point2D(0, 4), 15, 15); //immagine del tempo residuo
	var timeText = new TextWidget(time.toString(), new Point2D(20, 0), 175); //testo relativo al tempo residuo
	timeText.setUseDateFormat(true); //indico al widget di utilizzare il formato data
	timeText.addObservable(this.buildingPossession); //imposto che il timer osservi l'edificio associato
	frame.addWidget(timeImage);
	frame.addWidget(timeText);
};