/**
 * FILE: AnotherUserMenuFactory.js
 * PERCORSO /Codice/sgad/clienttier/controller/menufactory/AnotherUserMenuFactory.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-18 - Creazione della classe - Gatto Francesco
 */

//Eredita da MenuFactory
AnotherUserMenuFactory.prototype = new MenuFactory();

//Costruttore della classe.
AnotherUserMenuFactory.prototype.constructor = AnotherUserMenuFactory;

/**
 * Classe per la costruzione di un menu per il ritorno al villaggio dell'utente.
 * @implements MenuFactory
 * @constructor
 */
function AnotherUserMenuFactory() {

}

/**
 * Fornisce il frame contenente il menu.
 * @override
 * @return {FrameWidget} Il frame contenente il menu.
 */
AnotherUserMenuFactory.prototype.buildMenu = function() {
	var width = Bound.getInstance().getWidth();
	var frame = new FrameWidget(null, new Point2D((width - 120) / 2, 0)); //creo il frame centrandolo orizzontalmente

	var backToVillage = new ButtonWidget("Ritorna al villaggio", new Point2D(0, 0), 120, 25); //creo un bottone per tornare al villaggio
	backToVillage.setOnClickEvent(new BackToVillage()); //imposto l'azione di ritorno al villaggio

	frame.addWidget(backToVillage);

	frame.setZIndex(1000);
	frame.setIsShiftable(false);

	return frame;
};