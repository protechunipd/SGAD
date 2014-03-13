/**
 * FILE: InteractionMenuFactory.js
 * PERCORSO /Codice/sgad/clienttier/controller/menufactory/InteractionMenuFactory.js
 * DATA CREAZIONE: 19 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Creazione della classe - Battistella Stefano
 */

//Eredita da MenuFactory
InteractionMenuFactory.prototype = new MenuFactory();

//Costruttore della classe.
InteractionMenuFactory.prototype.constructor = InteractionMenuFactory;

/**
 * Classe per la creazione di un menu interattivo.
 * @implements MenuFactory
 * @constructor
 */
function InteractionMenuFactory() {

}

/**
 * Costruisce il menu interattivo.
 * @override
 * @return {FrameWidget} Il frame contenente il menù.
 */
InteractionMenuFactory.prototype.buildMenu = function() {
	var bound = Bound.getInstance();
	var frame = new FrameWidget(null, new Point2D(0, bound.getHeight() - 85)); //imposta il frame in basso a sinistra

	var showBuildMode = new ButtonWidget("Modalità costruzione", new Point2D(0, 0), 120, 30); //creo un bottone per entrare in modalità costruzione
	var setBuildModeFilter = new SetBuildModeFilter();
	showBuildMode.setOnClickEvent(setBuildModeFilter); //imposto la visualizzazione in modalità costruzione

	var showNormalMode = new ButtonWidget("Modalità normale", new Point2D(0, 45), 120, 30); //creo un bottone per entrare in modalità normale
	var setVoidFilter = new SetAllVoidFilter();
	showNormalMode.setOnClickEvent(setVoidFilter); //imposto la visualizzazione in modalità normale

	frame.addWidget(showBuildMode);
	frame.addWidget(showNormalMode);

	frame.setIsShiftable(false); //imposto che il frame abbia una posizione fissa
	frame.setZIndex(10000);
	return frame;
};