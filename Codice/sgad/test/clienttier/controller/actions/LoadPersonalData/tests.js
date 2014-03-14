test("Test su LoadPersonalData", function () {

	var personalDatas = {
        realUser:true, userData:{
		authenticationData: {user: "Bishop92", email: "stefano.battistella.92@gmail.com"},
		ownedResources: [
			{ resource: "Oro", quantity: 5},
			{ resource: "Pozioni", quantity: 5}
		],
		ownedUnits: [
			{unit: "Lavoratore", quantity: 2},
			{unit: "Fante", quantity: 4}
		],
		ownedBuildings: [
			{building: "MinieraL1", position: {x: 1, y: 4}, isFinished: 1, time: 40000, unitInProgress: {startedtime: 5000, unitPossession: {unit: "Cavaliere", quantity: 50}}},
			{building: "MinieraL2", position: {x: 3, y: 5}, isFinished: 1, time: 40000, unitInProgress: {startedtime: 5000, unitPossession: {unit: "Cavaliere", quantity: 50}}}
		] }};

	var generalDatas = {
		resources: [
			{ resourceName: "Oro" },
			{ resourceName: "Pozioni" }
		],

		units: [
			{ name: "Fante", attack: 6, defence: 15, cost: { relativeTime: 3600, quantityResource: [
				{ resource: "Oro", quantity: 2 },
				{ resource: "Pozioni", quantity: 3 }
			] } },
			{ name: "Cavaliere", attack: 18, defence: 12, cost: { relativeTime: 10800, quantityResource: [
				{ resource: "Oro", quantity: 5 },
				{ resource: "Pozioni", quantity: 15 }
			] } },
			{ name: "Carro d'assalto", attack: 45, defence: 40, cost: { relativeTime: 25200, quantityResource: [
				{ resource: "Oro", quantity: 40 },
				{ resource: "Pozioni", quantity: 40 }
			] } },
			{ name: "Lavoratore", attack: 0, defence: 0, cost: { relativeTime: 0, quantityResource: [
				{ resource: "Oro", quantity: 0 },
				{ resource: "Pozioni", quantity: 0 }
			] } }
		],

		buildings: [
			{ nameBuilding: "Miniera", level: 1, cost: { relativeTime: 3600, quantityResource: [
				{ resource: "Oro", quantity: 50 },
				{ resource: "Pozioni", quantity: 0 }
			] },
				precondition: [ ], unitsSpace: 0, productedResource: { resource: "Oro", relativeTime: 3600, quantity: 10, maxQuantity: 100 },
				productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 1},

			{ nameBuilding: "Miniera", level: 2, cost: { relativeTime: 36000, quantityResource: [
				{ resource: "Oro", quantity: 300 },
				{ resource: "Pozioni", quantity: 0 }
			] },
				precondition: ["Torre dello stregoneL2"], unitsSpace: 0, productedResource: { resource: "Oro", relativeTime: 3600, quantity: 20, maxQuantity: 200 },
				productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0 },

			{ nameBuilding: "Miniera", level: 3, cost: { relativeTime: 25200, quantityResource: [
				{ resource: "Oro", quantity: 800 },
				{ resource: "Pozioni", quantity: 0 }
			] },
				precondition: ["Torre dello stregoneL3"], unitsSpace: 0, productedResource: { resource: "Oro", relativeTime: 3600, quantity: 40, maxQuantity: 400 },
				productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0 },

			{ nameBuilding: "Scuola di magia", level: 1, cost: { relativeTime: 3600, quantityResource: [
				{ resource: "Oro", quantity: 100 },
				{ resource: "Pozioni", quantity: 10 }
			] },
				precondition: [ ], unitsSpace: 0, productedResource: { resource: "Pozioni", relativeTime: 3600, quantity: 10, maxQuantity: 100 },
				productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 1 },

			{ nameBuilding: "Scuola di magia", level: 2, cost: { relativeTime: 36000, quantityResource: [
				{ resource: "Oro", quantity: 300 },
				{ resource: "Pozioni", quantity: 20 }
			] },
				precondition: ["Torre dello stregoneL2"], unitsSpace: 0, productedResource: { resource: "Pozioni", relativeTime: 3600, quantity: 15, maxQuantity: 150 },
				productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0 },

			{ nameBuilding: "Scuola di magia", level: 3, cost: { relativeTime: 72000, quantityResource: [
				{ resource: "Oro", quantity: 500 },
				{ resource: "Pozioni", quantity: 30 }
			] },
				precondition: ["Torre dello stregoneL3"], unitsSpace: 0, productedResource: { resource: "Pozioni", relativeTime: 3600, quantity: 25, maxQuantity: 200 },
				productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0 },

			{ nameBuilding: "Stalla", level: 1, cost: { relativeTime: 36000, quantityResource: [
				{ resource: "Oro", quantity: 200 },
				{ resource: "Pozioni", quantity: 50 }
			] },
				precondition: [ ], unitsSpace: 15, productedResource: { },
				productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 1 },

			{ nameBuilding: "Stalla", level: 2, cost: { relativeTime: 72000, quantityResource: [
				{ resource: "Oro", quantity: 200 },
				{ resource: "Pozioni", quantity: 50 }
			] },
				precondition: ["Torre dello stregoneL2"], unitsSpace: 30, productedResource: { },
				productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0 },

			{ nameBuilding: "Stalla", level: 3, cost: { relativeTime: 144000, quantityResource: [
				{ resource: "Oro", quantity: 400 },
				{ resource: "Pozioni", quantity: 100 }
			] },
				precondition: ["Torre dello stregoneL3"], unitsSpace: 50, productedResource: { },
				productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0 },

			{ nameBuilding: "Caserma", level: 1, cost: { relativeTime: 18000, quantityResource: [
				{ resource: "Oro", quantity: 100 },
				{ resource: "Pozioni", quantity: 100 }
			] },
				precondition: [ ], unitsSpace: 15, productedResource: { },
				productedUnits: ["Fante", "Cavaliere" , "Carro d'assalto"], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 1 },

			{ nameBuilding: "Caserma", level: 2, cost: { relativeTime: 36000, quantityResource: [
				{ resource: "Oro", quantity: 150 },
				{ resource: "Pozioni", quantity: 150 }
			] },
				precondition: ["Torre dello stregoneL2", "StallaL2"], unitsSpace: 25, productedResource: { },
				productedUnits: ["Fante", "Cavaliere" , "Carro d'assalto"], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 0.9 }, isConstructible: 0 },

			{ nameBuilding: "Caserma", level: 3, cost: { relativeTime: 108000, quantityResource: [
				{ resource: "Oro", quantity: 200 },
				{ resource: "Pozioni", quantity: 200 }
			] },
				precondition: ["Torre dello stregoneL3", "StallaL2"], unitsSpace: 50, productedResource: { },
				productedUnits: ["Fante", "Cavaliere" , "Carro d'assalto"], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 0.8 }, isConstructible: 0 },

			{ nameBuilding: "Torre dello stregone", level: 1, cost: { relativeTime: 0, quantityResource: [
				{ resource: "Oro", quantity: 0 },
				{ resource: "Pozioni", quantity: 0 }
			] },
				precondition: [ ], unitsSpace: 0, productedResource: { },
				productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0 },

			{ nameBuilding: "Torre dello stregone", level: 2, cost: { relativeTime: 36000, quantityResource: [
				{ resource: "Oro", quantity: 400 },
				{ resource: "Pozioni", quantity: 400 }
			] },
				precondition: [ ], unitsSpace: 0, productedResource: { },
				productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0 },

			{ nameBuilding: "Torre dello stregone", level: 3, cost: { relativeTime: 108000, quantityResource: [
				{ resource: "Oro", quantity: 800 },
				{ resource: "Pozioni", quantity: 300 }
			] },
				precondition: [ ], unitsSpace: 0, productedResource: { },
				productedUnits: [ ], bonus: { bonusName: "Bonus tempo di produzione unità", type: 1, quantity: 1 }, isConstructible: 0 }
		]
	};

	var loadGeneralData = new LoadGeneralData();
	loadGeneralData.setActionDatas(generalDatas);

	loadGeneralData.performAction();

	var loadPersonalData = new LoadPersonalData();
	loadPersonalData.setActionDatas(personalDatas);

	loadPersonalData.performAction();


	deepEqual(UserDataManager.getInstance().getUserData().getBuildingPossession("MinieraL1X1Y4").getPosition().getX(), 1, "Test su getBuildingPossession()");
	deepEqual(UserDataManager.getInstance().getUserData().getBuildingPossession("MinieraL1X1Y4").getPosition().getY(), 4, "Test su getBuildingPossession()");
	deepEqual(UserDataManager.getInstance().getUserData().getUnitPossession("Lavoratore").getQuantity(), 2, "Test su getUnitPossession()");
	deepEqual(UserDataManager.getInstance().getUserData().getUnitPossession("Fante").getQuantity(), 4, "Test su getUnit()");
});