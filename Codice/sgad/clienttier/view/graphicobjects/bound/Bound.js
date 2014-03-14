/**
 * FILE: Bound.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/bound/Bound.js
 * DATA CREAZIONE: 11 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-11 - Creazione della classe - Gallo Francesco
 */

/**
 * Classe per la gestione dei limiti della porzione dell'area di gioco effettivamente visualizzata.
 * @constructor
 */
var Bound = (function() {
	/**
	 * Unica istanza dell'oggetto di tipo "Bound".
	 * @type {Bound}
     * @private
	 */
	var instance;
	function init() {
		/**
		 * Posizione del punto in alto a sinistra del rettangolo.
		 * @type {Point2D}
		 */
		var topLeftOffset = new Point2D(-100, -100);
		/**
		 * La posizione massima del punto in alto a sinistra.
		 * @type {Point2D}
		 */
		var maxTopLeftOffset = new Point2D(5800, 2000);
		/**
		 * La posizione minima del punto in alto a sinistra.
		 * @type {Point2D}
		 */
		var minTopLeftOffset = new Point2D(-150, -150);
		/**
		 * Larghezza del rettangolo.
		 * @type {int}
		 */
		var width = 0;
		/**
		 * Altezza del rettangolo.
		 * @type {int}
		 */
		var height = 0;
		return {
			/**
			 * Imposta l'altezza del rettangolo.
			 * @param {int} _height La nuova altezza del rettangolo.
			 * @return {void}
			 */
			setHeight : function(_height) {
				height = _height;
			},
			/**
			 * Imposta la larghezza del rettangolo.
			 * @param {int} _width La nuova larghezza del rettangolo.
			 * @return {void}
			 */
			setWidth : function(_width) {
				width = _width;
			},
			/**
			 * Imposta la posizione del punto in alto a sinistra del rettangolo.
			 * @param {Point2D} point La nuova posizione del punto in alto a sinistra del rettangolo.
			 * @return {void}
			 */
			setTopLeftOffset : function(point) {
				topLeftOffset = point;
			},
			/**
			 * Imposta la posizione massima del punto in alto a sinistra.
			 * @param {Point2D} _maxTopLeftOffset La posizione massima del punto in alto a sinistra.
			 * @return {void}
			 */
			setMaxTopLeftOffset : function(_maxTopLeftOffset) {
				maxTopLeftOffset = _maxTopLeftOffset;
			},
			/**
			 * Imposta la posizione minima del punto in alto a sinistra.
			 * @param {Point2D} _minTopLeftOffset La posizione minima del punto in alto a sinistra.
			 * @return {void}
			 */
			setMinTopLeftOffset : function(_minTopLeftOffset) {
				minTopLeftOffset = _minTopLeftOffset;
			},
			/**
			 * Fornisce l'altezza del rettangolo.
			 * @return {int} L'altezza del rettangolo.
			 */
			getHeight : function() {
				return height;
			},
			/**
			 * Ottiene la larghezza del rettangolo.
			 * @return {int} La larghezza del rettangolo.
			 */
			getWidth : function() {
				return width;
			},
			/**
			 * Fornisce la posizione del punto in alto a sinistra del rettangolo.
			 * @return {Point2D} La posizione del punto in alto a sinistra.
			 */
			getTopLeftOffset : function() {
				return topLeftOffset;
			},
			/**
			 * Fornisce la posizione massima del punto in alto a sinistra.
			 * @return {Point2D} La posizione massima del punto in alto a sinistra.
			 */
			getMaxTopLeftOffset : function() {
				return maxTopLeftOffset;
			},
			/**
			 * Fornisce la posizione minima del punto in alto a sinistra.
			 * @return {Point2D} La posizione minima del punto in alto a sinistra.
			 */
			getMinTopLeftOffset : function() {
				return minTopLeftOffset;
			},
			/**
			 * Trasla il rettangolo.
			 * @param {Point2D} point Punto rappresentante le coordinate di quanto verrà traslato il rettangolo.
			 * @return {void}
			 */
			shift: function(point) {
                //Prendo i dati attuali
				var minX = this.getMinTopLeftOffset().getX();
                var minY = this.getMinTopLeftOffset().getY();
                var maxX = this.getMaxTopLeftOffset().getX();
                var maxY = this.getMaxTopLeftOffset().getY();
                //Creo dati temporanei
                var nowX = this.getTopLeftOffset().getX() - point.getX();
                var nowY = this.getTopLeftOffset().getY() - point.getY();
                //Controllo e, in caso, adatto i nuovi limiti
                if (nowX > maxX-width) nowX = maxX-width;
                else if (nowX < minX) nowX = minX;
                if (nowY > maxY-height) nowY = maxY-height;
                else if (nowY < minY) nowY = minY;
                //Setto il nuovo topLeftOffset con i valori calcolati
				this.setTopLeftOffset(new Point2D(nowX, nowY));
            }
		};
    }
    return {
		/**
		 * Fornisce l'unica istanza dell'oggetto di tipo Bound.
		 * @return {Bound} L'istanza dell'oggetto.
		 */
		getInstance : function() {
			if (!instance)
				instance = init();
			//inizializza la variabile se è la prima volta che viene richiesta
			return instance;
		}
	};
})(); 