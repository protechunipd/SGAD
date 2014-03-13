/**
 * FILE: ButtonWidget.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/widget/ButtonWidget.js
 * DATA CREAZIONE: 13 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-15 - Implementazione del metodo draw(drawArea) - Gallo Francesco
 */

//Eredita da Widget.
ButtonWidget.prototype = new Widget();

//Costruttore della classe.
ButtonWidget.prototype.constructor = ButtonWidget;

/**
 * Classe per la gestione di un generico bottone nell'interfaccia grafica.
 * @extends Widget
 * @constructor
 * @param {string} text Il testo da visualizzare all'interno del bottone.
 * @param {Point2D} topLeftOffset La posizione del punto in alto a sinistra del bottone.
 * @param {int} width La larghezza del bottone.
 * @param {int} height L'altezza del bottone.
 */
function ButtonWidget(text, topLeftOffset, width, height) {
	/**
	 * Testo da visualizzare all'interno del bottone.
	 * @type {string}
     * @private
	 */
	this.text = text;
	/**
	 * La larghezza del bottone.
	 * @type {int}
     * @private
	 */
	this.width = width;
	/**
	 * L'altezza del bottone.
	 * @type {int}
     * @private
	 */
	this.height = height;
	/**
	 * Il padding del del bottone.
	 * @type {int}
     * @private
	 */
	this.padding = 5;
	/**
	 * Altezza del testo del bottone.
	 * @type {int}
     * @private
	 */
	this.textHeight = 12;
    /**
     * La posizione del punto in alto a sinistra.
     * @type {Point2D}
     * @private
     */
	this.topLeftOffset = topLeftOffset;
    /**
     * Il poligono del bottone.
     * @type {Shape}
     * @private
     */
	this.shape = new Shape();
	this.shape.addPoint(new Point2D(0, 0));
	this.shape.addPoint(new Point2D(this.width, 0));
	this.shape.addPoint(new Point2D(this.width, this.height));
	this.shape.addPoint(new Point2D(0, this.height));
}
/**
 * Fornisce il testo del bottone.
 * @return {string} Il testo del bottone.
 */
ButtonWidget.prototype.getText = function() {
	return this.text;
};
/**
 * Fornisce la larghezza del bottone.
 * @return {int} La larghezza del bottone.
 */
ButtonWidget.prototype.getWidth = function() {
	return this.width;
};
/**
 * Fornisce l'altezza del bottone.
 * @return {int} L'altezza del bottone.
 */
ButtonWidget.prototype.getHeight = function() {
	return this.height;
};
/**
 * Fornisce il padding del bottone.
 * @return {int} Il padding del bottone.
 */
ButtonWidget.prototype.getPadding = function() {
	return this.padding;
};
/**
 * Fornisce l'altezza del testo del bottone.
 * @return {int} L'altezza del testo del bottone.
 */
ButtonWidget.prototype.getTextHeight = function() {
	return this.textHeight;
};
/**
 * Invoca l'azione da eseguire al verificarsi dell'evento click.
 * @return {void}
 */
ButtonWidget.prototype.onClick = function() {
	if (this.enabled && this.onClickAction)
		this.onClickAction.performAction();
};
/**
 * Invoca l'azione da eseguire al verificarsi dell'evento rightclick.
 * @return {void}
 */
ButtonWidget.prototype.onRightClick = function() {
	if (this.enabled && this.onRightClickAction)
		this.onRightClickAction.performAction();
};
/**
 * Disegna l'oggetto nell'area indicata.
 * @param {Object} drawArea L'area nella quale deve essere rappresentato l'oggetto.
 * @return {void}
 */
ButtonWidget.prototype.draw = function(drawArea) {
	var points = this.shape.getPoints();
	var offset = this.topLeftOffset;
	var text = this.text;
	var width = this.width;
	var height = this.height;

	drawArea.beginPath();
	//inizio del percorso

	drawArea.fillStyle = "rgb(83, 44, 11)";
	drawArea.strokeStyle = "rgb(30, 16, 4)";

	drawArea.font = this.textHeight + "px Arial";
	//impostazione del font

	drawArea.moveTo(offset.getX(), offset.getY());

	//posizionamento sull'offset
	for (var i = 1; i < points.length; i++)
		drawArea.lineTo(points[i].getX() + offset.getX(), points[i].getY() + offset.getY());

	var textLength = drawArea.measureText(text).width;
	//ottengo la larghezza del testo
	var xPositionText = offset.getX() + (width - textLength) / 2 - 1;
	//posizione per centrare orizzontalmente il testo
	var yPositionText = offset.getY() + (height + this.textHeight) / 2 - 1;
	//posizione per centrare verticalmente il testo
	drawArea.closePath();

	drawArea.stroke();
	drawArea.fill();

	//rappresento il testo del bottone
	drawArea.beginPath();

	drawArea.fillStyle = "#FFF";
	drawArea.fillText(text, xPositionText, yPositionText);

	drawArea.closePath();
	//fine del percorso

	drawArea.fill();
	//disegna

	if (!this.enabled) {
		
		drawArea.beginPath();
		//inizio del percorso

		drawArea.fillStyle = "#000";
		
		drawArea.moveTo(offset.getX(), offset.getY());

		//posizionamento sull'offset
		for (var j = 1; j < points.length; j++)
			drawArea.lineTo(points[j].getX() + offset.getX(), points[j].getY() + offset.getY());
			
		drawArea.globalAlpha = 0.4;

		drawArea.closePath();

		drawArea.fill();
		
		drawArea.globalAlpha = 1;
	}
};
