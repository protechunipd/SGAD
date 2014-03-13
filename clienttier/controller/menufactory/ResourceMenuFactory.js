/**
 * FILE: ResourceMenuFactory.js
 * PERCORSO /Codice/sgad/clienttier/controller/menufactory/ResourceMenuFactory.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Implementato il metodo createUnitPossessionWidget(frame) - Gallo Francesco
 * 2014-02-19 - Implementato il metodo createOwnedResourceWidget(frame) - Gallo Francesco
 * 2014-02-18 - Creazione della classe - Gallo Francesco
 */

//Eredita da MenuFactory
ResourceMenuFactory.prototype = new MenuFactory();

//Costruttore della classe.
ResourceMenuFactory.prototype.constructor = ResourceMenuFactory;

/**
 * Classe per la creazione di un menu che visualizzi le risorse e le unità possedute dall'utente.
 * @implements MenuFactory
 * @constructor
 */
function ResourceMenuFactory() {
    /**
     * I dati dell'utente.
     * @type {UserData}
     * @private
     */
    this.userData = UserDataManager.getInstance().getUserData();
}

/**
 * Costruisce il menu delle risorse.
 * @override
 * @return {FrameWidget} Il frame contenente il menu delle risorse.
 */
ResourceMenuFactory.prototype.buildMenu = function() {
	var frame = new FrameWidget(null, new Point2D(0, 0)); //creo il frame

	this.createOwnedResourceWidget(frame);
	this.createUnitPossessionWidget(frame);
	this.createUserWidget(frame);

	frame.setIsShiftable(false);
	frame.setZIndex(10000);

	return frame;
};

/**
 * Crea un widget per le risorse possedute dall'utente.
 * @param {FrameWidget} frame Il frame al quale aggiungere il widget.
 * @return {void}
 */
ResourceMenuFactory.prototype.createOwnedResourceWidget = function(frame) {
	var resources = DataFactory.getInstance().getResources(); //ottengo la lista delle risorse
	var boundWidth = Bound.getInstance().getWidth(); //ottengo la larghezza del bound
	var userData = UserDataManager.getInstance().getUserData();

	var logoutButton = new ButtonWidget("Logout", new Point2D(boundWidth - 70, 0), 60, 25);
	logoutButton.setOnClickEvent(new Logout());
	frame.addWidget(logoutButton);

	var i = 1;
	for(var key in resources)
	{
		var ownedResource = userData.getOwnedResource(resources[key].getKey()); //ottengo la risorsa posseduta
		if(ownedResource !== null)
		{
			var resourceName = resources[key].getResourceName(); //il testo per indicare il nome della risorsa
			var resourceQuantity = ownedResource.getQuantity().toString(); //il testo per indicare la quantità della risorsa
			var resourceNameWidget = new ImageWidget("canvas/images/" + resourceName + ".png", new Point2D(boundWidth - 75 - 70 * i, 0), 25, 25);
			var resourceQuantityWidget = new TextWidget(resourceQuantity, new Point2D(boundWidth - 45 - 70 * i, 0), 40);
			resourceQuantityWidget.addObservable(ownedResource); //imposto che la quantità si aggiorni in base alla risorsa posseduta
			frame.addWidget(resourceNameWidget);
			frame.addWidget(resourceQuantityWidget);
		}
		i++;
	}
};

/**
 * Crea un widget per le unità possedute dall'utente.
 * @param {FrameWidget} frame Il frame al quale aggiungere il widget.
 * @return {void}
 */
ResourceMenuFactory.prototype.createUnitPossessionWidget = function(frame) {
	var units = DataFactory.getInstance().getUnits(); //ottengo la lista delle unità
	var userData = this.userData;

	var unitSpaceOccupyText = new TextWidget("", new Point2D(0, 0), 40);

	var i = 0;
	var spaceOccupy = 0;
	for(var key in units)
	{
		var unitPossession = userData.getUnitPossession(units[key].getKey()); //ottengo l'unità posseduta
		if(unitPossession !== null)
		{
			var unitName = units[key].getName(); //il testo per indicare il nome dell'unità
			var unitQuantity = unitPossession.getQuantity().toString(); //il testo per indicare la quantità della risorsa
			var unitNameWidget = new ImageWidget("canvas/images/" + unitName + ".png", new Point2D(65 * i, 0), 25, 25);
			var unitQuantityWidget = new TextWidget(unitQuantity, new Point2D(65 * i + 30, 0), 40);
			unitQuantityWidget.addObservable(unitPossession); //imposto che la quantità si aggiorni in base alle unità possedute
			unitSpaceOccupyText.addObservable(unitPossession);
			spaceOccupy += unitPossession.getQuantity();
			frame.addWidget(unitNameWidget);
			frame.addWidget(unitQuantityWidget);
		}
		i++;
	}

	unitSpaceOccupyText.setText(spaceOccupy.toString());
	unitSpaceOccupyText.shiftPosition(new Point2D(65 * i + 30, 0));

	var unitSpaceImage = new ImageWidget("canvas/images/Unit_Space.png", new Point2D(65 * i, 0), 25, 25);
	var unitSpaceText = new TextWidget(userData.getTotalUnitSpaces().toString(), new Point2D(65 * i + 70, 0), 40);
	var slash = new TextWidget('/', new Point2D(65 * i + 65, 0), 40);
	unitSpaceText.addObservable(userData);
	unitSpaceText.setCallback("getTotalUnitSpaces");
	frame.addWidget(unitSpaceOccupyText);
	frame.addWidget(unitSpaceText);
	frame.addWidget(unitSpaceImage);
	frame.addWidget(slash);
};

/**
 * Crea un widget per il nome dell'utente.
 * @param {FrameWidget} frame Il frame al quale aggiungere il widget.
 * @return {void}
 */
ResourceMenuFactory.prototype.createUserWidget = function (frame) {
	var authenticationData = this.userData.getAuthenticationData();
	var user;
	if(authenticationData)
		user = authenticationData.getUser();
	else
		user = "";
	var boundWidth = Bound.getInstance().getWidth();

	var userWidget = new ButtonWidget(user, new Point2D(boundWidth / 2 - 75, 0), 100, 25); //posiziono al centro il nome dell'utente
	userWidget.setOnClickEvent(new ShowAccountManagerMenu());
	frame.addWidget(userWidget);
};