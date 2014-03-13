/**
 * FILE: TextWidget.js
 * PERCORSO /Codice/sgad/clienttier/view/graphicobjects/widget/TextWidget.js
 * DATA CREAZIONE: 13 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-14 - Implementazione del metodo brokeText(text), draw(drawArea) e update() - Battistella Stefano
 * 2014-02-13 - Creazione della classe - Battistella Stefano
 */

//Eredita da Widget e da Observer.
TextWidget.prototype = $.extend(new Widget(), new Observer());

//Costruttore della classe.
TextWidget.prototype.constructor = TextWidget;

/**
 * Classe per la gestione di un generico testo nell'interfaccia grafica.
 * @implements Observer
 * @constructor
 * @param {string} text Il testo dell'area di testo da visualizzare.
 * @param {Point2D} topLeftOffset La posizione del punto in alto a sinistra dell'oggetto grafico.
 * @param {int} width La larghezza dell'area di testo.
 */
function TextWidget(text, topLeftOffset, width) {
	/**
	 * Padding dell'area testuale.
	 * @type {int}
     * @private
	 */
	this.padding = 2;
	/**
	 * Altezza del testo dell'area testuale.
	 * @type {int}
     * @private
	 */
	this.textHeight = 12;
	/**
	 * L'interlinea tra le righe.
	 * @type {int}
     * @private
	 */
	this.interline = 1.2;
	/**
	 * Larghezza dell'area testuale.
	 * @type {int}
     * @private
	 */
	this.width = width;
	/**
	 * Testo da visualizzare all'interno dell'area testuale. Viene spezzato in un vettore di righe.
	 * @type {Array.<string>}
     * @private
	 */
	this.text = this.brokeText(text);
    /**
     * Il tipo di font da utilizzare.
     * @type {string}
     * @private
     */
    this.fontFamily = "Calibri";
    /**
     * Il peso del font da utilizzare.
     * @type {string}
     * @private
     */
    this.fontWeight = "normal";
	/**
	 * Altezza dell'area testuale.
	 * @type {int}
     * @private
	 */
	this.height = this.getHeight();
    /**
     * La posizione del punto in alto a sinistra.
     * @type {Point2D}
     * @private
     */
	this.topLeftOffset = topLeftOffset;
    /**
     * Indica se si usa o meno il formato data.
     * @type {bool}
     * @private
     */
	this.useDateFormat = false;
    /**
     * Indica se si usa o meno il formato rapporto.
     * @type {bool}
     * @private
     */
	this.useRatioFormat = null;
    /**
     * Indica il rapporto massimo.
     * @type {int}
     * @private
     */
	this.maxRatio = 0;
    /**
     * La funzione da invocare all'aggiornamento dello stato in seguito ad una notifica di un observer.
     * @type {string}
     * @private
     */
	this.callback = "getState";
    /**
     * Il poligono dell'area testuale.
     * @type {Shape}
     * @private
     */
	this.shape = new Shape();
	this.shape.addPoint(new Point2D(0, 0));
	this.shape.addPoint(new Point2D(this.width, 0));
	this.shape.addPoint(new Point2D(this.width, this.height));
	this.shape.addPoint(new Point2D(0, this.height));
	/**
	 * Oggetto che deve essere osservato.
	 * @type {Array.<Observable>}
     * @private
	 */
	this.observables = [];
}
/**
 * Fornisce l'altezza del testo dell'area testuale.
 * @return {int} L'altezza del testo dell'area testuale.
 */
TextWidget.prototype.getTextHeight = function() {
	return this.textHeight;
};

/**
 * Imposta l'altezza del testo dell'area testuale.
 * @param {int} _textHeight L'altezza del testo dell'area testuale.
 * @return {void}
 */
TextWidget.prototype.setTextHeight = function(_textHeight) {
	this.textHeight = _textHeight;
};

/**
 * Ritorna un timer nel formato hh/mm/ss.
 * @param {int|string} time Tempo in millisecondi.
 * @return {string}
 */
TextWidget.prototype.formatDate = function(time) {
	time = parseInt(time);
	var hours = Math.floor(time / 3600);
	var minutes = Math.floor((time - hours * 3600) / 60);
	var seconds = time - hours * 3600 - minutes * 60;
	return hours + "h " + minutes + "m " + seconds + "s";
};

/**
 * Ritorna la quantità attuale rapportata alla quantità massima.
 * @param {int} quantity Quantita corrente.
 * @param {int} maxQuantity Quantità massima possibile.
 * @return {string}
 */
TextWidget.prototype.formatRatio = function(quantity, maxQuantity) {
	return quantity + "/" + maxQuantity;
};

/**
 * Spezza il testo se troppo lungo in più righe.
 * @param {string} text Il testo da analizzare.
 * @return {void}
 */
TextWidget.prototype.brokeText = function(text) {

	var canvas = document.createElement("canvas");
	//creo un canvas momentaneo
	var context = canvas.getContext("2d");
	//ottengo il context
	context.font = this.textHeight + "px Calibri";
	//imposto il font
	var lineWidth = this.width - this.padding * 2;
	//lunghezza massima di una linea
	var words = text.split(' ');
	//ottengo la lista delle parole
	if (words.length === 0)//se non ci sono parole ritorno il testo originario
		return [text];
	var rows = [];
	//creo la lista delle righe
	rows.push(words[0]);
	//aggiungo la prima parola alla prima riga

	var rowLength = context.measureText(rows[0]).width;
	//ottengo la lunghezza della prima parola
	var j = 0;
	//indice per accedere alla riga alla quale aggiungere il testo
	for (var i = 1; i < words.length; i++) {
		var wordLength = context.measureText(' ' + words[i]).width;
		//ottengo la lunghezza del testo rappresentato nel canvas
		if (rowLength + wordLength < lineWidth) {//controllo se aggiungendo la parola alla riga sono ancora dentro il limite
			rows[j] += ' ' + words[i];
			//aggiungo la parola alla riga
			rowLength += wordLength;
			//aggiungo la lunghezza della parola alla lunghezza della riga
		} else {
			rows.push(words[i]);
			//creo una nuova riga con la parola che non posso aggiungere alla riga attuale
			j++;
			rowLength = context.measureText(rows[j]).width;
			//imposto la larghezza della nuova riga
		}
	}
	return rows;
};

/**
 * Fornisce l'altezza dell'area testuale.
 * @return {int} L'altezza dell'area testuale.
 */
TextWidget.prototype.getHeight = function() {
	return this.text.length * this.textHeight * this.interline + this.padding * 2;
};

/**
 * Aggiunge l'oggetto che deve essere osservato per poter aggiornare il testo.
 * @param {Observable} observable L'oggetto da osservare.
 * @return {void}
 */
TextWidget.prototype.addObservable = function(observable) {
	this.observables.push(observable);
	observable.addObserver(this);
};
/**
 * Imposta il testo dell'area testuale.
 * @param {string} text Il testo dell'area testuale.
 * @return {void}
 */
TextWidget.prototype.setText = function(text) {
	if(this.useDateFormat)
		text = this.formatDate(text);
	else if(this.useRatioFormat)
		text = this.formatRatio(text, this.maxRatio);
	this.text = this.brokeText(text);
};
/**
 * Imposta il tipo di font da utilizzare.
 * @param {string} fontFamily Il tipo di font da impostare.
 * @return {void}
 */
TextWidget.prototype.setFontFamily = function(fontFamily) {
	this.fontFamily = fontFamily;
};

/**
 * Imposta il peso del font da utilizzare.
 * @param {string} fontWeight Il peso del font da impostare.
 * @return {void}
 */
TextWidget.prototype.setFontWeight = function(fontWeight) {
	this.fontWeight = fontWeight;
};

/**
 * Imposta il timer.
 * @param {bool} useDateFormat Indica se deve essere utilizzato il formato data o meno.
 * @return {void}
 */
TextWidget.prototype.setUseDateFormat = function(useDateFormat) {
	if(useDateFormat)
		this.text = this.brokeText(this.formatDate(this.text));
	this.useDateFormat = useDateFormat;
};

/**
 * Imposta il rapporto quantità corrente su quantità massima possibile.
 * @param {bool} useRatioFormat Da impostare a true se deve essere utilizzato il formato rapporto.
 * @param {int} maxQuantity Quanità massima possibile.
 * @return {void}
 */
TextWidget.prototype.setRatioFormat = function(useRatioFormat, maxQuantity) {
	if(useRatioFormat)
		this.text = this.brokeText(this.formatRatio(this.text, maxQuantity));
	this.useRatioFormat = useRatioFormat;
	this.maxRatio = maxQuantity;
};
/**
 * Fornisce il testo dell'area testuale.
 * @return {Array.<string>} Il testo dell'area testuale.
 */
TextWidget.prototype.getText = function() {
	return this.text;
};

/**
 * Fornisce la larghezza dell'area testuale.
 * @return {int} La larghezza dell'area testuale.
 */
TextWidget.prototype.getWidth = function() {
	return this.width;
};

/**
 * Impsta la funzione che deve essere invocata quando si riceve un update.
 * @param {string} callback Il nome della funzione da invocare.
 * @return {void}
 */
TextWidget.prototype.setCallback = function(callback) {
	if(callback === null)
		this.callback = "getState";
	else
		this.callback = callback;
};

/**
 * Disegna l'oggetto nell'area indicata.
 * @param {Object} drawArea L'area nella quale deve essere rappresentato l'oggetto.
 * @return {void}
 */
TextWidget.prototype.draw = function(drawArea) {

	var offset = this.topLeftOffset;
	var padding = this.padding;
	var text = this.text;

	var textHeight = this.textHeight;
	var interline = this.interline;

	drawArea.beginPath();
	//inizio del percorso

	drawArea.font = this.fontWeight + " " + textHeight + "px " + this.fontFamily;
	//impostazione del font

	drawArea.fillStyle = "black";

	for (var i = 0; i < text.length; i++)
		drawArea.fillText(text[i], padding + offset.getX(), textHeight * (i + 1) * interline + padding + offset.getY());
	//disegno la riga di testo

	drawArea.closePath();
	//fine del percorso

	drawArea.stroke();
	//disegna*/
};

/**
 * Richiede l'aggiornamento dell'oggetto.
 * @override
 * @return {void}
 */
TextWidget.prototype.update = function() {
	var quantity = 0;
	for(var i = 0; i < this.observables.length; i++)
		eval("quantity += this.observables[i]." + this.callback + "()");
	this.setText(quantity.toString());
};
