/**
 * FILE: ShowAttackResultMenu.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/ShowAttackResultMenu.js
 * DATA CREAZIONE: 24 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-24 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
ShowAttackResultMenu.prototype = new Action();

//Costruttore della classe.
ShowAttackResultMenu.prototype.constructor = ShowAttackResultMenu;

/**
 * Classe per la visualizzazione del menù che mostra il risultato dell'attacco.
 * @implements Action
 * @constructor
 * @param {Object} user L'utente a cui visualizzare il risultato dell'attacco.
 */
function ShowAttackResultMenu(user) {
    /**
     * L'utente a cui visualizzare il risultato dell'attacco.
     * @type {Object}
     * @private
     */
    this.user = user;
    /**
     * Dati sulle unità riguardo il risultato della battaglia.
     * @type {Object}
     * @private
     */
    this.datas = null;
}

/**
 * Si occupa di mostrare all'utente il menù.
 * @override
 * @return {void}
 */
ShowAttackResultMenu.prototype.performAction = function() {
	if(!this.datas) {
		var menu = (new NotifyMenuFactory("Attenzione! Non siamo stati in grado di attaccare l'utente desiderato. Vuoi provare ad attaccarne un altro?", null)).buildMenu();
		var widgets = menu.getWidgets(); //ottengo i widgets memorizzati nel frame
		var context = Context.getInstance();
		for (var j = 0; j < widgets.length; j++)
			context.addGraphicObject(widgets[j]); //aggiungo i widget per poterli visualizzare
		context.addGraphicObject(menu); //aggiungo il frame
		return;
	}
	var units = this.datas["ownedUnits"];
	var resultMenu = (new AttackResultMenuFactory(this.datas["result"], units, this.datas["avversaryUnits"], this.datas["otherVillage"])).buildMenu();

	var userData = UserDataManager.getInstance().getUserData();
	var ownedUnits = userData.getOwnedUnits();
	for(var i = 0; i < units.length; i++) {
		var unitName = units[i]["unit"];
		var ownedUnit = ownedUnits[unitName];
		ownedUnit.setQuantity(ownedUnit.getQuantity() - units[i]["lost"]);
	}

	var widgets = resultMenu.getWidgets(); //ottengo i widgets memorizzati nel frame
	var context = Context.getInstance();
	context.disableRightClick();
	for (var k = 0; k < widgets.length; k++)
		context.addGraphicObject(widgets[k]); //aggiungo i widget per poterli visualizzare
	context.addGraphicObject(resultMenu); //aggiungo il frame
};

/**
 * Imposta i dati sulle unità rispetto alla battaglia.
 * @param {Object} datas I dati sulle unità rispetto alla battaglia.
 * @return {void}
 */
ShowAttackResultMenu.prototype.setActionDatas = function(datas) {
	this.datas = datas;
};

var resultAttack = {
	result: true,
		ownedUnits: [
	{
		unit: "Fante",
		sendToAttack: 50,
		lost: 20
	},
	{
		unit: "Cavaliere",
		sendToAttack: 50,
		lost: 20
	},
	{
		unit: "Carro d'assalto",
		sendToAttack: 50,
		lost: 20
	}
],
	avversaryUnits: [
	{
		unit: "Fante",
		sendToAttack: 50,
		lost: 20
	},
	{
		unit: "Cavaliere",
		sendToAttack: 50,
		lost: 20
	},
	{
		unit: "Carro d'assalto",
		sendToAttack: 50,
		lost: 20
	}
],
	otherVillage : {
	realUser : false,
		userData : {authenticationData: {user: "Bishop92", email: "stefano.battistella.92@gmail.com"},
		ownedResources: [
			{ resource: "Oro", quantity: 5},
			{ resource: "Pozioni", quantity: 5}
		],
			ownedUnits: [
			{unit: "Fante", quantity: 4},
			{unit: "Carro d'assalto", quantity: 6},
			{unit: "Cavaliere", quantity: 9},
			{unit: "Lavoratore", quantity: 2}
		],
			ownedBuildings: [
			{building: "MinieraL1", position: {x: 5, y: 5}, isFinished: 0, time: 5, storedResources: 0, unitInProgress: { }},
			{building: "MinieraL1", position: {x: 3, y: 4}, isFinished: 0, time: 5, storedResources: 0, unitInProgress: { }},
			{building: "MinieraL1", position: {x: 6, y: 5}, isFinished: 0, time: 5, storedResources: 0, unitInProgress: { }},
			{building: "MinieraL1", position: {x: 7, y: 5}, isFinished: 0, time: 5, storedResources: 0, unitInProgress: { }},
			{building: "CasermaL1", position: {x: 3, y: 5}, isFinished: 1, time: 5, storedResources: 0, unitInProgress: {startedTime: 3, unitPossession: {unit: "Cavaliere", quantity: 5}}},
			{building: "Torre dello stregoneL1", position: {x: 7, y: 9}, isFinished: 1, time: 5, storedResources: 0, unitInProgress: { }},
			{building: "Scuola di magiaL1", position: {x: 3, y: 11}, isFinished: 1, time: 5, storedResources: 0, unitInProgress: { }}
		]
	}
}
};