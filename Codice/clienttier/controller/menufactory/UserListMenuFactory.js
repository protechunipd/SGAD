/**
 * FILE: UserListMenuFactory.js
 * PERCORSO /Codice/sgad/clienttier/controller/menufactory/UserListMenuFactory.js
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Battistella Stefano
 */

//Eredita da MenuFactory
UserListMenuFactory.prototype = new MenuFactory();

//Costruttore della classe.
UserListMenuFactory.prototype.constructor = UserListMenuFactory;

/**
 * Classe per la visualizzazione della lista di altri giocatori connessi.
 * @implements MenuFactory
 * @constructor
 * @param {Object} users La lista degli utenti giocatori connessi.
 */
function UserListMenuFactory(users) {
    /**
     * La lista degli utenti giocatori connessi.
     * @type {Object}
     * @private
     */
    this.users = users;
}

/**
 * Costruisce il menu interattivo che visualizza gli altri giocatori e le operazioni possibili.
 * @override
 * @return {FrameWidget} Il frame contenente il menù.
 */
UserListMenuFactory.prototype.buildMenu = function() {
	var bound = Bound.getInstance();
	var frame = new FrameWidget(null, new Point2D(131, bound.getHeight() - 70));

	for(var i = 0; i < this.users.length && i < 5; i++) {
		var userButton = new ButtonWidget(this.users[i], new Point2D(95 * i, 0), 90, 25);
		var attackImage = new ImageWidget("canvas/images/Attack.gif", new Point2D(95 * i + 30, 30), 30, 30);
		frame.addWidget(userButton);
		frame.addWidget(attackImage);
		attackImage.setOnClickEvent(new ShowAttackMenu(this.users[i]));
	}

	frame.setIsShiftable(false);
	frame.setZIndex(10000);
	return frame;
};