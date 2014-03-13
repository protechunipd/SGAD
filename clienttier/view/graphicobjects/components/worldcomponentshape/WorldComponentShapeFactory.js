/**
 * FILE: WorldComponentShapeFactory.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/components/worldcomponentshape/WorldComponentShapeFactory.js
 * DATA CREAZIONE: 13 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-13 - Creazione della classe - Battistella Stefano
 */

/**
 * Classe per la gestione del controllo ai vari oggetti di tipo WorldComponentShapeImg.
 * @constructor
 */

var WorldComponentShapeFactory = (function() {
	/**
	 * Unica istanza dell'oggetto creato.
	 * @type {WorldComponentShapeFactory}
	 * @private
	 */
	var instance;
	function init() {
		
		/**
		 * Aggregazione di oggetti accessibili mediante chiave.
		 * @type {Array.<WorldComponentShapeImg>} 
		 * @private
		 */
		var worldComponentShapeImg = [];
		
		worldComponentShapeImg["CasermaL1"] = new BarracksL1Shape();
		worldComponentShapeImg["CasermaL2"] = new BarracksL2Shape();
		worldComponentShapeImg["CasermaL3"] = new BarracksL3Shape();
		worldComponentShapeImg["InCostruzione"] = new InConstructionShape();
		worldComponentShapeImg["MinieraL1"] = new MineL1Shape();
		worldComponentShapeImg["MinieraL2"] = new MineL2Shape();
		worldComponentShapeImg["MinieraL3"] = new MineL3Shape();
		worldComponentShapeImg["Scuola di magiaL1"] = new SchoolOfMagicL1Shape();
		worldComponentShapeImg["Scuola di magiaL2"] = new SchoolOfMagicL2Shape();
		worldComponentShapeImg["Scuola di magiaL3"] = new SchoolOfMagicL3Shape();
		worldComponentShapeImg["StallaL1"] = new StableL1Shape();
		worldComponentShapeImg["StallaL2"] = new StableL2Shape();
		worldComponentShapeImg["StallaL3"] = new StableL3Shape();
		worldComponentShapeImg["Tile"] = new TileShape();
		worldComponentShapeImg["Torre dello stregoneL1"] = new WizardTowerL1Shape();
		worldComponentShapeImg["Torre dello stregoneL2"] = new WizardTowerL2Shape();
		worldComponentShapeImg["Torre dello stregoneL3"] = new WizardTowerL3Shape();
		
		return {
			/**
			 * Fornisce l'oggetto associato alla relativa chiave.
			 * @param {string} key Chiave per accedere all'oggetto.
			 * @return {WorldComponentShapeImg}
			 */
			getWorldComponentShapeImg : function(key) {
				return worldComponentShapeImg[key];
			}
		};
    }
    return {
		/**
		 * Restituisce l'istanza dell'oggetto già creata nel qual caso l'oggetto sia già stato richiesto.
		 * Oppure la crea al momento se è la prima volta.
		 * @return {WorldComponentShapeFactory} L'unica istanza dell'oggetto.
		 */
		getInstance : function() {
			if (!instance)
				instance = init(); //inizializza la variabile se ? la prima volta che viene richiesta
			return instance;
		}
	};
})();