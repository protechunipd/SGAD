/**
 * FILE: ImageWidget.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/widget/ImageWidget.js
 * DATA CREAZIONE: 14 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-15 - Implementazione del metodo draw(drawArea) - Gallo Francesco
 * 2014-02-14 - Creazione della classe - Gallo Francesco
 */

//Eredita da Widget.
ImageWidget.prototype = new Widget();

//Costruttore della classe.
ImageWidget.prototype.constructor = ImageWidget;

/**
 * Classe per la gestione di una generica immagine nell'interfaccia grafica.
 * @extends Widget
 * @constructor
 * @param {string} image Immagine rappresentante il widget.
 * @param {Point2D} topLeftOffset
 * @param {int} width La larghezza dell'oggetto grafico.
 * @param {int} height L'altezza dell'oggetto grafico.
 */
function ImageWidget(image, topLeftOffset, width, height) {
	/**
	 * L'altezza dell'oggetto grafico.
	 * @type {int}
     * @private
	 */
	this.height = height ;
	/**
	 * La larghezza dell'oggetto grafico.
	 * @type {int}
     * @private
	 */
	this.width = width;
	/**
	 * Immagine rappresentante il widget.
	 * @type {Image}
     * @private
	 */
	this.image = new Image();
    /**
     * Immagine rappresentante il widget.
     * @type {Image}
     * @private
     */
	this.image.src = image;
    /**
     * La posizione del punto in alto a sinistra.
     * @type {Point2D}
     * @private
     */
	this.topLeftOffset = topLeftOffset;
    /**
     * Il poligono dell'immagine.
     * @type {Shape}
     * @private
     */
	this.shape = new Shape();
	this.shape.addPoint(new Point2D(0, 0));
	this.shape.addPoint(new Point2D(width, 0));
	this.shape.addPoint(new Point2D(width, height));
	this.shape.addPoint(new Point2D(0, height));
}
/**
 * Disegna l'oggetto nell'area indicata.
 * @override
 * @param {CanvasRenderingContext2D} drawArea L'area nella quale deve essere rappresentato l'oggetto.
 * @return {void}
 */
ImageWidget.prototype.draw  = function(drawArea) {
	var points = this.shape.getPoints();
	var offset = this.topLeftOffset;

	if(this.image)
		drawArea.drawImage(this.image, offset.getX(), offset.getY(), this.width, this.height);
	
	if(!this.enabled)
	{
		drawArea.beginPath();
		//inizio del percorso

		drawArea.strokeStyle = "red";
		
		drawArea.moveTo(offset.getX(), offset.getY());

		//posizionamento sull'offset

		drawArea.lineTo(points[2].getX() + offset.getX(), points[2].getY() + offset.getY());
		drawArea.moveTo(points[1].getX() + offset.getX(), points[1].getY() + offset.getY());
		drawArea.lineTo(points[3].getX() + offset.getX(), points[3].getY() + offset.getY());

		drawArea.closePath();
		drawArea.stroke();

		drawArea.strokeStyle = "black";
	}
};

/**
 * Invoca l'azione da eseguire al verificarsi dell'evento click.
 * @override
 * @return {void}
 */
ImageWidget.prototype.onClick = function() {
	if(this.enabled && this.onClickAction)
		this.onClickAction.performAction();
};

/**
 * Invoca l'azione da eseguire al verificarsi dell'evento rightclick.
 * @override
 * @return {void}
 */
ImageWidget.prototype.onRightClick = function() {
	if(this.enabled&& this.onRightClickAction)
		this.onRightClickAction.performAction();
};
