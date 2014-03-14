/**
 * FILE: DataFactory.js
 * PERCORSO /Codice/sgad/clienttier/model/generaldata/DataFactory.js
 * DATA CREAZIONE: 16 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-16 - Creazione della classe - Battistella Stefano
 */
 
 /**
 * Classe che ritorna un'istanza delle componenti di gioco.
 * @constructor
 */
var DataFactory = (function () {
	/**
	 * Unica istanza dell'oggetto creato.
	 * @type {DataFactory}
	 * @private
	 */
	var instance;

	function init() {

		/**
		 * Le BuildingWithLevel disponibili nel gioco.
		 * @type {Array.<BuildingWithLevel>}
         * @private
		 */
		var buildings = [];
		/**
		 * Le Resource disponibili nel gioco.
		 * @type {Array.<Resource>}
         * @private
		 */
		var resources = [];
		/**
		 * Le Unità disponibili nel gioco.
		 * @type {Array.<Unit>}
         * @private
		 */
		var units = [];

		return {
			/**
			 * Setta le BuldingWithLevel disponibili nel gioco.
			 * @param {Array.<BuildingWithLevel>} _buildings Le costruzioni disponibili nel gioco.
			 * @return {void}
			 */
			setBuildings: function (_buildings) {
				buildings = _buildings;
			},

			/**
			 * Setta le Resource disponibili nel gioco.
			 * @param {Array.<Resource>} _resources Le risorse disponibili nel gioco.
			 * @return {void}
			 */
			setResources: function (_resources) {
				resources = _resources;
			},

			/**
			 * Setta le unità disponibili nel gioco.
			 * @param {Array.<Unit>} _units Le unità disponibili nel gioco.
			 * @return {void}
			 */
			setUnits: function (_units) {
				units = _units;
			},

			/**
			 * Fornisce un oggetto della classe BuildingWithLevel corrispondente alla key passata
			 * @param {string} key L'identificativo dell'edificio richiesto.
			 * @return {BuildingWithLevel} L'oggetto BuildingWithLevel corrispondente alla key in input.
			 */
			getBuilding: function (key) {
				var obj = buildings[key];
				if (obj === undefined) return null;
				else return obj;
			},

			/**
			 * Ritorna la Resource corripondente alla key in input.
			 * @param {string} key Chiave identificativa della Resource desiderata.
			 * @return {Resource} la Resource corripondente alla key in input.
			 */
			getResource: function (key) {
				var obj = resources[key];
				if (obj === undefined) return null;
				else return obj;
			},

			/**
			 * Ritorna la Unit corrispondente alla key in input.
			 * @param {string} key L'identificativo dell'unità richiesta.
			 * @return {Unit} L'unit corrispondente alla key in input.
			 */
			getUnit: function (key) {
				var obj = units[key];
				if (obj === undefined) return null;
				else return obj;
			},

			/**
			 * Controlla l'accesso alle BuildingWithLevel disponibili nel gioco.
			 * @return {Array.<BuildingWithLevel>} Le BuildingWithLevel disponibili nel gioco.
			 */
			getBuildings: function () {
				return buildings;
			},
			/**
			 * Controlla l'accesso alle Resource disponibili nel gioco.
			 * @return {Array.<Resource>} Le Resource disponibili nel gioco.
			 */
			getResources: function () {
				return resources;
			},

			/**
			 * Controlla l'accesso alle Unità disponibili nel gioco.
			 * @return {Array.<Unit>} Le Unità disponibili nel gioco.
			 */
			getUnits: function () {
				return units;
			}
		};
	}

	return {
		/**
		 * Restituisce l'istanza dell'oggetto gi? creata nel qual caso l'oggetto sia gi? stato richiesto.
		 * Oppure la crea al momento se è la prima volta.
		 * @return {DataFactory} Ritorna l'unica istanza dell'oggetto.
		 */
		getInstance: function () {
			if (!instance)
				instance = init();
			//inizializza la variabile se ? la prima volta che viene richiesta
			return instance;
		}
	};
})();
