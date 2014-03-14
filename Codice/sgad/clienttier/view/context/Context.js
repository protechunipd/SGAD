/**
 * FILE: Context.js
 * PERCORSO /Codice/sgad/clienttier/view/context/Context.js
 * DATA CREAZIONE: 17 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-17 - Creazione della classe - Battistella Stefano
 */

/**
 * Classe per la gestione dell'area del mondo di gioco.
 * La classe permetterà di trasferire gli eventi verificatisi durante l'interazione con il mondo di gioco ai vari oggetti grafici.
 * @constructor
 */
var Context = (function () {

	/**
	 * L'unica istanza dell'oggetto.
	 * @type {Context}
     * @private
	 */
	var instance;

	function init() {
		/**
		 * L'area sulla quale vengono rappresentanti gli oggetti del mondo di gioco.
		 * @type {CanvasRenderingContext2D}
		 */
		var drawArea = null;
		/**
		 * La collezione degli oggetti grafici per rappresentare il mondo di gioco.
		 * @type {GraphicObjectCollection}
		 */
		var graphicObjects = new GraphicObjectCollection();
		/**
		 * Gestisce l'evento click.
		 * @type {Click}
		 */
		var onClickEvent = new Click();
		/**
		 * Gestisce l'evento rightclick.
		 * @type {RightClick}
		 */
		var onRightClickEvent = new RightClick();
		/**
		 * Gestisce l'evento draganddrop.
		 * @type {DragAndDrop}
		 */
		var onDragAndDrop = new DragAndDrop();
		/**
		 * Gestisce l'evento resize.
		 * @type {Resize}
		 */
		var onResize = new Resize();
        /**
         * Abilita il click destro.
         * @type {bool}
         */
		var enableRightClick = true;
		/**
		 * Rappresenta il mondo di gioco.
		 * @return {void}
		 */
        var draw = function() {
			drawArea.beginPath();
			drawArea.fillStyle = "rgb(74, 141, 42)";
			drawArea.fillRect(0, 0, Bound.getInstance().getWidth(), Bound.getInstance().getHeight());
			drawArea.closePath();
			drawArea.fill();
            for(var iterator = graphicObjects.createIterator(); !iterator.isDone(); iterator.next())
                iterator.getItem().draw(drawArea);
           requestAnimationFrame(draw, null);
        };

		return {
			/**
			 * Imposta l'area nella quale verrà rappresentato il mondo di gioco.
			 * @param {CanvasRenderingContext2D} _drawArea L'area nella quale verrà rappresentato il mondo di gioco.
			 * @return {void}
			 */
			setDrawArea: function(_drawArea) {
				drawArea = _drawArea;
			},

			/**
			 * Imposta il menu contestuale attualmente visualizzato.
			 * @param {FrameWidget} frame Il frame rappresentante il menu contestuale.
			 * @return {void}
			 */
			setContextualMenu: function(frame) {
				graphicObjects.addContextualFrame(frame);
			},

			/**
			 * Aggiunge un oggetto grafico da visualizzare.
			 * @param {GraphicObject} graphicObject L'oggetto grafico da aggiungere.
			 * @return {void}
			 */
			addGraphicObject: function(graphicObject) {
				graphicObjects.addGraphicObject(graphicObject);
			},

			/**
			 * Fornisce l'elenco degli oggetti grafici attualmente visualizzati.
			 * @return {GraphicObjectCollection} Gli oggetti grafici attualmente visualizzati.
			 */
			getGraphicObjects: function() {
				return graphicObjects;
			},

			/**
			 * Imposta l'elenco degli oggetti grafici attualmente visualizzati.
			 * @param {GraphicObjectCollection} graphicObjectCollection Gli oggetti grafici attualmente visualizzati.
			 * @return {void}
			 */
			setGraphicObjects: function(graphicObjectCollection) {
				graphicObjects = graphicObjectCollection;
			},

			/**
			 * Rimuove un oggetto grafico visualizzato.
			 * @param {GraphicObject} graphicObject L'oggetto grafico da rimuovere.
			 * @return {void}
			 */
			removeGraphicObject: function(graphicObject) {
				graphicObjects.removeGraphicObject(graphicObject);
			},

			/**
			 * Gestisce l'evento onClick sull'area rappresentante il mondo di gioco.
			 * @return {void}
			 */
			onClick: function() {
				onClickEvent.execute(event, graphicObjects.createIterator());
			},

			/**
			 * Gestisce l'evento onRightClick sull'area rappresentante il mondo di gioco.
			 * @return {void}
			 */
			onRightClick: function() {
				if(enableRightClick)
					onRightClickEvent.execute(event, graphicObjects.createIterator());
			},

			/**
			 * Gestisce l'evento onDragStart sull'area rappresentante il mondo di gioco.
			 * @return {void}
			 */
			onDragStart: function() {
				onDragAndDrop.execute(event, graphicObjects.createIterator());
			},

			/**
			 * Gestisce l'evento onDrag sull'area rappresentante il mondo di gioco.
			 * @return {void}
			 */
			onDrag: function() {
				onDragAndDrop.execute(event, graphicObjects.createIterator());
			},

			/**
			 * Gestisce l'evento onDragEnd sull'area rappresentante il mondo di gioco.
			 * @return {void}
			 */
			onDragEnd: function() {
				onDragAndDrop.execute(event, graphicObjects.createIterator());
			},

			/**
			 * Gestisce l'evento onResize sull'area rappresentante il mondo di gioco.
			 * @return {void}
			 */
			onResize: function() {
				onResize.execute(event, graphicObjects.createIterator());
			},

			/**
			 * Fornisce il menu contestuale.
			 * @return {FrameWidget} Il menu contestuale.
			 */
			getContextualMenu: function() {
				return graphicObjects.getContextualFrame();
			},

			/**
			 * Richiede la rappresentazione del mondo di gioco.
			 * @return {void}
			 */
            startDraw: function() {
				var showInteractionMenu = new ShowInteractionMenu();
				showInteractionMenu.performAction();
                requestAnimationFrame(draw, null);
            },

			/**
			 * Disabilita la gestione del click destro.
			 * @return {void}
			 */
			enableRightClick: function() {
				enableRightClick = true;
			},

			/**
			 * Abilita la gestione del click destro.
			 * @return {void}
			 */
			disableRightClick: function() {
				enableRightClick = false;
			}
		};
	}

	return {
		/**
		 * Restituisce l'istanza dell'oggetto già creata nel qual caso l'oggetto sia già stato richiesto.
		 * Oppure la crea al momento se è la prima volta.
		 * @return {Context} Ritorna l'unica istanza dell'oggetto.
		 */
		getInstance: function() {
			if (!instance)
				instance = init(); //inizializza la variabile se è la prima volta che viene richiesta
			return instance;
		}
	};
})();