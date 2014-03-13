/**
 * FILE: FrameWidget.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/widget/FrameWidget.js
 * DATA CREAZIONE: 14 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-15 - Implementazione dei metodi draw(drawArea), setIsShiftable(_isShiftable), setZIndex(_zIndex) e shiftPosition(point) - Battistella Stefano
 * 2014-02-14 - Creazione della classe - Battistella Stefano
 */

//Eredita da Widget.
FrameWidget.prototype = new Widget();

//Costruttore della classe.
FrameWidget.prototype.constructor = FrameWidget;

/**
 * Classe per la gestione di un generico frame nell'interfaccia grafica.
 * @extends Widget
 * @constructor
 * @param {string} title Il titolo del frame che deve essere visualizzato. Se il valore ? pari a null allora non verr? visualizzato.
 * @param {Point2D} topLeftOffset La posizione del punto in alto a sinistra dell'oggetto grafico.
 */
function FrameWidget(title, topLeftOffset) {

	/**
	 * Titolo del frame. Se viene impostato a null allora non sarà visualizzato.
	 * @type {string}
     * @private
	 */
	this.title = title;
    /**
     * La posizione del punto in alto a sinistra.
     * @type {Point2D}
     * @private
     */
	this.topLeftOffset = new Point2D(topLeftOffset.getX(), topLeftOffset.getY());
    /**
     * Il punto iniziale in cui è stato creato il frame.
     * @type {Point2D}
     * @private
     */
	this.staticTopLeftOffset = topLeftOffset;
	/**
	 * L'insieme dei widget contenuti nel frame.
	 * @private
	 * @type {Array.<Widget>}
	 */
	this.widgets = [];
	/**
	 * Il padding del frame.
	 * @private
	 * @type {int}
	 */
	this.padding = 5;
	/**
	 * L'altezza che viene lasciata disponibile al titolo.
	 * @private
	 * @type {int}
	 */
	this.titleHeight = 25;
    /**
     * La larghezza del titolo.
     * @private
     * @type {int}
     */
	this.titleWidth = this.getTitleWidth();
    /**
     * Booleano per indicare se ignorare o meno l'evento.
     * @private
     * @type {bool}
     */
	this.ignoreEvents = true;
    /**
     * Il poligono del frame.
     * @type {Shape}
     * @private
     */
	this.shape = new Shape();
}
/**
 * Fornice la larghezza del frame basandosi sull'oggetto che occupa la posizione pi? a destra.
 * @return {int} La larghezza del frame.
 */
FrameWidget.prototype.getWidth = function () {
	var i;
	var width = 0;
	for (i = 0; i < this.widgets.length; i++) {
		var rightPos = this.widgets[i].getWidth() + this.widgets[i].getTopLeftOffset().getX() - this.topLeftOffset.getX();
		if (rightPos > width)
			width = rightPos;
	}
	if(this.title !== null)
		if(this.titleWidth > width)
			width = this.titleWidth;
	return width + this.padding;
};
/**
 * Fornice l'altezza del frame basandosi sull'oggetto che occupa la posizione più in basso.
 * @return {int} L'altezza del frame.
 */
FrameWidget.prototype.getHeight = function () {
	var height = 0;
	for (var i = 0; i < this.widgets.length; i++) {
		var bottomPos = this.widgets[i].getHeight() + this.widgets[i].getTopLeftOffset().getY() - this.topLeftOffset.getY();
		if (bottomPos > height)
			height = bottomPos;
	}
	return height + this.padding;
};
/**
 * Fornice l'altezza interna del frame basandosi sull'oggetto che occupa la posizione più in basso.
 * @return {int} L'altezza interna del frame.
 */
FrameWidget.prototype.getInnerHeight = function () {
	var titleHeight = this.titleHeight;
	if (this.title === null)
		titleHeight = 0;
	return this.getHeight() - titleHeight;
};
/**
 * Aggiorna la forma del poligono in base alla larghezza e all'altezza attuale.
 * @return {void}
 */
FrameWidget.prototype.updateShape = function () {
	this.shape = new Shape();
	this.shape.addPoint(new Point2D(0, 0));
	this.shape.addPoint(new Point2D(this.getWidth(), 0));
	this.shape.addPoint(new Point2D(this.getWidth(), this.getHeight()));
	this.shape.addPoint(new Point2D(0, this.getHeight()));
};
/**
 * Rimuove il widget indicato.
 * @param {Widget} _widget Il widget da rimuovere.
 * @return {void}
 */
FrameWidget.prototype.removeWidget = function (_widget) {
	var index = this.widgets.indexOf(_widget);
	if (index > -1)
		this.widgets.slice(index, 1);
	this.updateShape();
};
/**
 * Fornisce i widgets inclusi nel frame.
 * @return {Array.<Widget>} I widgets inclusi nel frame.
 */
FrameWidget.prototype.getWidgets = function () {
	return this.widgets;
};
/**
 * Aggiunge il widget indicato.
 * @param {Widget} _widget Il widget da aggiungere.
 * @return {void}
 */
FrameWidget.prototype.addWidget = function (_widget) {
	this.widgets.push(_widget);
	_widget.shiftPosition(this.topLeftOffset);
	_widget.shiftPosition(new Point2D(this.padding, this.padding));
	if (this.title !== null)
		_widget.shiftPosition(new Point2D(0, this.titleHeight));
	_widget.setZIndex(_widget.getZIndex() + 1);
	this.updateShape();
};
/**
 * Trasla il frame in una determinata posizione. Sposta anche le posizioni di tutti gli oggetti interni al widget.
 * @override
 * @param {Point2D} point Il punto indicante lo spostamento del frame.
 * @return {void}
 */
FrameWidget.prototype.shiftPosition = function (point) {
	if (this.isShiftable) {
		this.topLeftOffset.addPoint2D(point);
		for (var i = 0; i < this.widgets.length; i++) {
			this.widgets[i].shiftPosition(point);
		}
	}
};
/**
 * Imposta la profondità del frame.
 * @override
 * @param {int} _zIndex La profondità del frame.
 * @return {void}
 */
FrameWidget.prototype.setZIndex = function (_zIndex) {
	var diff = _zIndex - this.zIndex;
	this.zIndex = _zIndex;
	for (var i = 0; i < this.widgets.length; i++) {
		this.widgets[i].setZIndex(this.widgets[i].getZIndex() + diff);
	}
};
/**
 * Imposta il frame traslabile, valore pari a true, non traslabile, valore pari a false.
 * @param {bool} _isShiftable Indica se è traslabile o meno.
 */
FrameWidget.prototype.setIsShiftable = function (_isShiftable) {
	this.isShiftable = _isShiftable;
	for (var i = 0; i < this.widgets.length; i++)
		this.widgets[i].setIsShiftable(_isShiftable);
};
/**
 * Ritorna la larghezza del titolo.
 * @return {int} La larghezza del titolo.
 */
FrameWidget.prototype.getTitleWidth = function() {
	if(this.title === null)
		return 0;
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	context.font = "bold 15px Calibri";
	return context.measureText(this.title).width + 5;
};
/**
 * Disegna l'oggetto nell'area indicata.
 * @param {CanvasRenderingContext2D} drawArea L'area nella quale deve essere rappresentato l'oggetto.
 * @return {void}
 */
FrameWidget.prototype.draw = function (drawArea) {

	var titleHeight = this.titleHeight;
	if (this.title === null)
		titleHeight = 0;

	var points = this.shape.getPoints();
	var offset = this.topLeftOffset;
	var boundOffset = Bound.getInstance().getTopLeftOffset();

	if (this.isShiftable) {
		var staticX = this.staticTopLeftOffset.getX();
		var staticY = this.staticTopLeftOffset.getY();
		var shiftX = 0;
		var shiftY = 0;
		if (staticX !== offset.getX() + boundOffset.getX())
			shiftX = staticX - offset.getX() - boundOffset.getX();
		if (staticY !== offset.getY() + boundOffset.getY())
			shiftY = staticY - offset.getY() - boundOffset.getY();
		var point = new Point2D(shiftX, shiftY);
		this.shiftPosition(point);
	}

	//rappresento il rettangolo contenente il frame
	drawArea.beginPath();

	drawArea.fillStyle = "rgb(228, 205, 192)";
	drawArea.strokeStyle = "#000";

	drawArea.moveTo(offset.getX(), offset.getY());
	for (var i = 1; i < points.length; i++) {
		drawArea.lineTo(points[i].getX() + offset.getX(), points[i].getY() + offset.getY());
	}

	//imposto l'ombra del frame
	drawArea.shadowColor = 'rgba(185, 120, 85, 0.75)';
	drawArea.shadowBlur = 4;
	drawArea.shadowOffsetX = 3;
	drawArea.shadowOffsetY = 3;

	drawArea.closePath();

	drawArea.stroke();
	drawArea.fill();

	//ripristino l'ombra originaria
	drawArea.shadowBlur = 0;
	drawArea.shadowOffsetX = 0;
	drawArea.shadowOffsetY = 0;

	//disegno l'area per il titolo del frame
	if (this.title !== null) {
		drawArea.beginPath();

		drawArea.strokeStyle = "#000";
		drawArea.fillStyle = "rgb(83, 44, 11)";
		drawArea.moveTo(offset.getX(), offset.getY());
		drawArea.lineTo(offset.getX(), offset.getY() + titleHeight);
		drawArea.lineTo(offset.getX() + this.getWidth(), offset.getY() + titleHeight);
		drawArea.lineTo(offset.getX() + this.getWidth(), offset.getY());

		drawArea.closePath();
		drawArea.stroke();
		drawArea.fill();

		//disegno il titolo del frame
		drawArea.beginPath();

		drawArea.font = "bold 15px Calibri";
		drawArea.fillStyle = "#FFF";
		drawArea.fillText(this.title, this.padding + offset.getX(), titleHeight + offset.getY() - 6);

		drawArea.closePath();
		drawArea.fill();
	}
};
