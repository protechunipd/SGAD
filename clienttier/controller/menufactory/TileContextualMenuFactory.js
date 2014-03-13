/**
 * FILE: TileContextualMenuFactory.js
 * PERCORSO /Codice/sgad/clienttier/controller/menufactory/TileContextualMenuFactory.js
 * DATA CREAZIONE: 22 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-22 - Creazione della classe - Battistella Stefano
 */

//Eredita da MenuFactory
TileContextualMenuFactory.prototype = new MenuFactory();

//Costruttore della classe.
TileContextualMenuFactory.prototype.constructor = TileContextualMenuFactory;

/**
 * Classe per la creazione di un menu che visualizzi gli edifici costruibili in una casella.
 * @implements MenuFactory
 * @constructor
 * @param {TileComponent} tileComponent La casella nella quale verrà costruito l'edificio.
 * @param {Point2D} topLeftOffset La posizione del punto in alto a sinistra.
 */
function TileContextualMenuFactory(tileComponent, topLeftOffset) {
	/**
	 * La casella nella quale verrà costruito l'edificio.
	 * @type {TileComponent}
	 * @private
	 */
	this.tileComponent = tileComponent;
	/**
	 * La posizione del punto in alto a sinistra.
	 * @type {Point2D}
	 * @private
	 */
	this.topLeftOffset = topLeftOffset;
}

/**
 * Costruisce il menù contestuale per la conferma di costruzione di un edificio.
 * @override
 * @return {FrameWidget} Il frame contenente il menù.
 */
TileContextualMenuFactory.prototype.buildMenu = function () {
	var point = new Point2D(0, 0);
	point.addPoint2D(this.topLeftOffset);
	point.addPoint2D(Bound.getInstance().getTopLeftOffset());
	var frame = new FrameWidget("Costruisci", point); //costruisco il frame del menu contestuale

	this.createConstructionWidgets(frame);

	var closeButton = new ButtonWidget("Chiudi", new Point2D(frame.getWidth() - 50, frame.getHeight() - 25), 50, 25); //costruisco un bottone per chiudere il frame
	var closeContextualMenu = new CloseContextualMenu();
	closeButton.setOnClickEvent(closeContextualMenu);
	frame.addWidget(closeButton); //aggiungo il bottone per chiudere il frame

	var bound = Bound.getInstance();
	var frameHeight = frame.getHeight();
	var frameWidth = frame.getWidth();

	if(this.topLeftOffset.getX() + frameWidth > bound.getWidth()) //traslo il frame se questo è troppo a destra
		point.subPoint2D(new Point2D(frameWidth, 0));
	if(this.topLeftOffset.getY() + frameHeight > bound.getHeight()) //traslo il frame se questo è troppo in basso
		point.subPoint2D(new Point2D(0, frameHeight));

	frame.setZIndex(900);

	return frame;
};

/**
 * Costruisce il menù che contiene gli edifici che è possibile creare nel gioco.
 * @param {FrameWidget} frame Il frame contenente gli edifici costruibili.
 * @return {void}
 */
TileContextualMenuFactory.prototype.createConstructionWidgets = function (frame) {
	var buildings = DataFactory.getInstance().getBuildings(); //ottengo la lista degli edifici
	var factory = WorldComponentShapeFactory.getInstance();
	var userData = UserDataManager.getInstance().getUserData();
	var i = 0;
	var maxHeight = 75; //imposto un'altezza massima per l'immagine dell'edificio
	for (var key in buildings) {
		var building = buildings[key];
		if (building.getIsConstructible()) { //se l'edificio è costruibile allora viene visualizzato
			var image = factory.getWorldComponentShapeImg(key).getImage(); //ottengo l'immagine dell'edificio
			var path = image.src;
			var width = 80;
			var height = image.height * (width / image.width);
			var buildingImage = new ImageWidget(path, new Point2D((width + 5) * i, maxHeight - height), width, height); //creo l'immagine per visualizzare l'edificio
			var actionListener = new ActionListener();
			actionListener.addAction(new CloseContextualMenu());
			actionListener.addAction(new ShowBuildConstructionMenu(this.tileComponent, key));
			buildingImage.setOnClickEvent(actionListener); //richiedo la costruzione dell'edificio una volta premutoci sopra
			var buildingText = new TextWidget(building.getNameBuilding(), new Point2D((width + 5) * i, maxHeight), width); //visualizzo il nome dell'edificio
			buildingText.setFontWeight("bold");
			buildingText.setTextHeight(13);
			var cost = building.getCost(); //ottengo il costo dell'edificio
			var resources = cost.getQuantityResource(); //richiedo il costo in termini di risorse
			var imageCosts = [];
			var textCosts = [];
			var previousHeight = buildingText.getHeight();
			var possibleConstruction = true;
			for (var j = 0; j < resources.length; j++) {
				var resourceName = resources[j].getResource().getResourceName(); //ottengo il nome della risorsa
				var resourceKey = resources[j].getResource().getKey(); //ottengo la chiave della risorsa
				var quantity = resources[j].getQuantity(); //ottengo la quantità richiesta
				if (userData.getOwnedResource(resourceKey).getQuantity() < quantity) //controllo se la quantità richiesta sia posseduta dal'utente
					possibleConstruction = false; //disabilito la possibilità di costruire l'edificio
				imageCosts[j] = new ImageWidget("canvas/images/" + resourceName + ".png", new Point2D((width + 5) * i, maxHeight + previousHeight + 4), 15, 15);
				textCosts[j] = new TextWidget(quantity.toString(), new Point2D((width + 5) * i + 20, maxHeight + previousHeight), width - 20);
				previousHeight += textCosts[j].getHeight();
			}
			buildingImage.setEnabled(possibleConstruction);
			var time = cost.getRelativeTime(); //richiedo il costo in termini di tempo
			var imageCost = new ImageWidget("canvas/images/time.png", new Point2D((width + 5) * i, maxHeight + previousHeight + 4), 15, 15);
			var textCost = new TextWidget(time.toString(), new Point2D((width + 5) * i + 20, maxHeight + previousHeight), width - 20);
			previousHeight += textCost.getHeight();
			textCost.setUseDateFormat(true); //imposto il formato data
			imageCosts.push(imageCost);
			textCosts.push(textCost);

			frame.addWidget(buildingText);
			frame.addWidget(buildingImage);
			for (var k = 0; k < textCosts.length; k++) {
				frame.addWidget(imageCosts[k]); //aggiungo i vari costi
				frame.addWidget(textCosts[k]); //aggiungo i vari costi
			}

			this.createProductedResourcesWidget(frame, building, maxHeight + previousHeight, (width + 5) * i, width);

			i++;
		}
	}
};

/**
 * Costruisce il widget contentente le informazioni riguardo le risorse che vengono prodotte da un determinato edificio.
 * @param {FrameWidget} frame Il frame contenente gli edifici costruibili.
 * @param {BuildingWithLevel} building L'edificio che produce risorse.
 * @param {int} top Coordinata x di partenza del widget.
 * @param {int} left Coordinata y di partenza del widget.
 * @param {int} width Larghezza dell'area del widget.
 * @return {void}
 */
TileContextualMenuFactory.prototype.createProductedResourcesWidget = function (frame, building, top, left, width) {
	var productedResource = building.getProductedResource(); //ottengo le risorse producibili nell'edificio
	if (productedResource !== null) { //se l'edificio produce risorse visualizzo le risorse producibili
		var resource = productedResource.getResource(); //ottengo il tipo di risorsa
		var produceText = new TextWidget("Produce", new Point2D(left, top), width);
		produceText.setFontWeight("bold");
		var previousHeight = produceText.getHeight();
		var imageResource = new ImageWidget("canvas/images/" + resource.getKey() + ".png", new Point2D(left, top + 4 + previousHeight), 15, 15); //visualizzo l'immagine per il tipo di risorsa
		var textResource = new TextWidget(productedResource.getQuantity().toString(), new Point2D(left + 20, top + previousHeight), width - 20); //visualizzo la quantità producibile
		previousHeight += textResource.getHeight();
		var time = productedResource.getRelativeTime(); //ottengo il tempo di produzione
		var imageCost = new ImageWidget("canvas/images/time.png", new Point2D(left, top + previousHeight + 4), 15, 15);
		var textCost = new TextWidget(time.toString(), new Point2D(left + 20, top + previousHeight), width - 20); //visualizzo il tempo di produzione
		textCost.setUseDateFormat(true);

		frame.addWidget(imageCost);
		frame.addWidget(textCost);
		frame.addWidget(imageResource);
		frame.addWidget(textResource);
		frame.addWidget(produceText);
	}
};
