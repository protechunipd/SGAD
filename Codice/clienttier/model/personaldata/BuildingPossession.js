/**
 * FILE: BuildingPossession.js
 * PERCORSO /Codice/sgad/clienttier/model/personaldata/BuildingPossession.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Implementazione dei metodi getBuilding(), getKey(), getIsFinished(), getPosition(),
 * getTime(), getUnitInProgress() e valueOf() - Gatto Francesco
 * 2014-02-18 - Creazione della classe - Gatto Francesco
 */

//Eredita da Observable.
BuildingPossession.prototype = new Observable();

//Costruttore della classe.
BuildingPossession.prototype.constructor = BuildingPossession;
/**
 * Classe per la gestione di un edificio posseduto da un utente.
 * @extends Observable
 * @constructor
 * @param {BuildingWithLevel} building Il tipo di costruzione.
 * @param {bool} isFinished Indica se la costruzione dell'edificio è completa.
 * @param {Position} position Indica le coordinate in cui l'edificio è posizionato nel mondo di gioco.
 * @param {int} time Indica una data con orario preciso al secondo.
 * Se l'edificio è completamente costruito indica il momento in cui è stata effettuata l'ultima raccolta delle risorse prodotte.
 * Se l'edificio è in costruzione indica il momento in cui la costruzione è iniziata.
 * @param {int} storedResources Indica la quantità di risorse immagazzinate nell'edificio.
 * @param {UnitInProgress} unitInProgress Indica le eventuali unità in costruzione presso l'edificio.
 **/
function BuildingPossession(building, isFinished, position, time, storedResources, unitInProgress) {
	/**
	 * Il tipo di costruzione.
	 * @type {BuildingWithLevel}
	 * @private
	 */
	this.building = building;
	/**
	 * Indica se la costruzione dell'edificio è completa.
	 * @type {bool}
	 * @private
	 */
	this.isFinished = isFinished;
	/**
	 * Indica le coordinate in cui l'edificio è posizionato nel mondo di gioco.
	 * @type {Position}
	 * @private
	 */
	this.position = position;
	/**
	 * Indica una data con orario preciso al secondo.
	 * Se l'edificio è completamente costruito indica il momento in cui è stata effettuata l'ultima raccolta delle risorse prodotte.
	 * Se l'edificio è in costruzione indica il momento in cui la costruzione è iniziata.
	 * @type {int}
	 * @private
	 */
	this.time = time + 1;
	/**
	 * Indica la quantità di risorse immagazzinate nell'edificio.
	 * @type {int}
	 */
	this.storedResources = storedResources;
	/**
	 * Indica le eventuali unità in costruzione presso l'edificio.
	 * @type {UnitInProgress}
	 * @private
	 */
	this.unitInProgress = unitInProgress;
	/**
	 * Indica i dati dell'utente.
	 * @type {Object}
	 * @private
	 */
	this.userData = null;
	/**
	 * Invoca la funzione startTimer().
	 * @return {void}
	 */
	this.startTimer();
}
/**
 * Metodo getter per building.
 * @return {BuildingWithLevel} Il tipo di costruzione.
 */
BuildingPossession.prototype.getBuilding = function () {
	return this.building;
};

/**
 * Ritorna la chiave univoca.
 * @return {string} La chiave univoca.
 */
BuildingPossession.prototype.getKey = function () {
	return this.building.getKey() + "X" + this.position.getX() + "Y" + this.position.getY();
};

/**
 * Ritorna la data con orario preciso al secondo.
 * @return {string} La chiave univoca.
 */
BuildingPossession.prototype.getState = function() {
	return this.time.toString();
};

/**
 * Metodo getter per isFinished.
 * @return {boolean} Indica il completamento della costruzione.
 */
BuildingPossession.prototype.getIsFinished = function () {
	return this.isFinished;
};

/**
 * Metodo getter per position.
 * @return {Position} Indica le coordinate di posizionamento.
 */
BuildingPossession.prototype.getPosition = function () {
	return this.position;
};

/**
 * Metodo getter per time.
 * @return {int} Indica una data con orario.
 */
BuildingPossession.prototype.getTime = function () {
	return this.time;
};

/**
 * Metodo getter per productedResources.
 * @return {int} Indica la quantità di risorse immagazzinate.
 */
BuildingPossession.prototype.getStoredResources = function () {
	return this.storedResources;
};

/**
 * Metodo setter per productedResources.
 * @param {int} storedResources La quantità di risorse da impostare.
 * @return {void}
 */
BuildingPossession.prototype.setStoredResources = function (storedResources) {
	this.storedResources = storedResources;
};

/**
 * Metodo getter per unitinprogress.
 * @return {UnitInProgress} Indica le eventuali unità in costruzione.
 */
BuildingPossession.prototype.getUnitInProgress = function () {
	return this.unitInProgress;
};

/**
 * Imposta le unità in coda nell'edificio.
 * @param {UnitInProgress} unitInProgress Le unità da impostare nella coda.
 * @return {void}
 */
BuildingPossession.prototype.setUnitInProgress = function (unitInProgress) {
	this.unitInProgress = unitInProgress;
};

/**
 * Imposta i dati dell'utente.
 * @param {Object} userData I dati dell'utente.
 * @return {void}
 */
BuildingPossession.prototype.setUserData = function(userData) {
	this.userData = userData;
};

/**
 * Ridefinizione del metodo valueOf per BuildingPossession.
 * @override
 * @return {string} L'identificativo per la BuildingPossession.
 */
BuildingPossession.prototype.valueOf = function () {
	return  JSON.stringify({building: this.getBuilding(), position: this.getPosition(), isFinished: this.getIsFinished(), time: this.getTime(), unitInProgress: this.getUnitInProgress()});
};

/**
 * Avvia il timer relativo all'edificio.
 * @return {void}
 */
BuildingPossession.prototype.startTimer = function () {
	var productedResources = this.building.getProductedResource();
	var userData = this.userData;
	if (this.time === 1) {
		if (!this.isFinished) {
			this.isFinished = true;
			if (productedResources !== null)
				this.time = this.building.getProductedResource().getRelativeTime();
			userData.initializeTotalUnitSpaces();
			this.notify();
		} else if (productedResources !== null) {
			var quantity = productedResources.getQuantity();
			var maxQuantity = productedResources.getMaxQuantity();
			this.storedResources += Math.min(quantity, maxQuantity - this.storedResources);
			this.time = productedResources.getRelativeTime();
			this.notify();
		}
	} else {
		var step = true;
		if(productedResources !== null)
			if(this.storedResources === productedResources.getMaxQuantity())
				step = false;
		if(step) {
			this.time--;
			this.notify();
		}
	}
	if (this.unitInProgress !== null) {
		var time = this.unitInProgress.getRemainingTime();
		if (time > 1 && this.unitInProgress.getQuantity() > 0)
			this.unitInProgress.setRemainingTime(time - 1);
		else {
			var unitQuantity = this.unitInProgress.getQuantity();
			if (unitQuantity > 0) {
				var key = this.unitInProgress.getUnit().getKey();
				var ownedUnits = userData.getUnitPossession(key);
				ownedUnits.setQuantity(ownedUnits.getQuantity() + 1);
				this.unitInProgress.setQuantity(unitQuantity - 1);
				var bonus = this.building.getBonus().getBonusQuantity();
				this.unitInProgress.setRemainingTime(ownedUnits.getUnit().getCost().getRelativeTime() * bonus);
			} else {
				this.unitInProgress = null;
			}
		}
	}
	setTimeout(this.startTimer.bind(this), 1000);
};