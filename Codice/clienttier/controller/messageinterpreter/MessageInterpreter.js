/**
 * FILE: MessageInterpreter.js
 * PERCORSO /Codice/sgad/clienttier/controller/messageinterpreter/MessageInterpreter.js
 * DATA CREAZIONE: 11 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-11 - Creazione della classe - Battistella Stefano
 */

/**
 * Classe per l'interpretazione di una risposta che è stata ricevuta dal server in seguito ad una determinata richiesta.
 * @constructor
 */
var MessageInterpreter = (function () {
	/**
	 * Unica istanza dell'oggetto creato.
	 * @type {MessageInterpreter}
	 * @private
	 */
	var instance;

	/**
	 * Inizializza l'oggetto.
	 * @return {{analyzeMessage: analyzeMessage}}
	 */
	function init() {
		return {
			/**
			 * Analizza una un oggetto in formato JSON per determinare se all'interno della stessa compare più di un singolo messaggio.
			 * @param {Object} json JSON che deve essere analizzato.
			 * @return {JSON} Ritorna un oggetto rappresentante i dati principali del messaggio analizzato
			 */
			analyzeMessage: function (json) {
				var messages = json.messages; //ottengo i messaggi nel pacchetto
				if (messages !== undefined) {
					var logs = [];
					for (var i = messages.length - 1; i > -1; i--) {
						var operation = messages[i].operation; //operazione è stata aggiunta in piggybacking
						var data = messages[i].data; //dati che sono stati aggiunti in piggybacking
						switch (operation) {
							case "Log":
								logs.push(data); break;
							case "GetAttack":
								var units = data["lostUnits"];
								for(var j = 0; j < units.length; j++) {
									var unit = DataFactory.getInstance().getUnit(units[j]["unit"]);
									var dismissUnits = new DismissUnits(unit, units[j]["quantity"]);
									dismissUnits.setActionDatas(true);
									dismissUnits.performAction();
								}
								break;
							case "GetStealResource":
								var userData = UserDataManager.getInstance().getUserData();
								var ownedBuilding = userData.getOwnedBuildings()[data["key"]];
								var building = ownedBuilding.getBuilding();
								var productedResource = building.getProductedResource();
								var time = data["time"];
								var quantity = productedResource.getQuantity();
								var relativeTime = productedResource.getRelativeTime();
								var nTimes = Math.min(Math.floor(time / relativeTime), productedResource.getMaxQuantity()/quantity); //controllo se la capacità massima è stata raggiunta
								var resources = nTimes * quantity; //determino le risorse immagazzinate
								ownedBuilding.setStoredResources(resources);
								break;
						}
					}
					if (logs.length > 0)
						(new ShowLogMenu(logs)).performAction();
				}

				return json.data; //dati del messaggio principale in risposta dal server
			}
		};
	}

	return {
		/**
		 * Restituisce l'istanza dell'oggetto già creata nel qual caso l'oggetto sia già stato richiesto.
		 * Oppure la crea al momento se è la prima volta.
		 * @return {MessageInterpreter} Ritorna l'unica istanza dell'oggetto.
		 */
		getInstance: function () {
			if (!instance)
				instance = init(); //inizializza la variabile se è la prima volta che viene richiesta
			return instance;
		}
	};
})(); 