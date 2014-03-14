test("Test su TrainUnit", function () {

    // Inizio JSON per LocalPeronalData
    var datasTwo = {
        realUser: true,
		userData:{
        authenticationData: {user: "Bishop92", email: "stefano.battistella.92@gmail.com"},
        ownedResources: [
            { resource: "Oro", quantity: 5},
            { resource: "Pozioni", quantity: 5}
        ],
        ownedUnits: [
            {unit: "Lavoratore", quantity: 2},
            {unit: "Cavaliere", quantity: 10},
            {unit: "Carro d'assalto", quantity: 2},
            {unit: "Fante", quantity: 5}
        ],
        ownedBuildings: [
			{building: "CasermaL1", position: {x: 3, y: 9}, isFinished: 1, time: 10000, unitInProgress: {startedTime: 10000, unit: "Cavaliere", quantity: 50}},
			{building: "MinieraL1", position: {x: 4, y: 9}, isFinished: 1, time: 10000, unitInProgress: {}},
            {building: "MinieraL2", position: {x: 5, y: 9}, isFinished: 1, time: 10000, unitInProgress: {}}
        ]
    }};

    // Inizio JSON per LocalGeneralData
    var datasOne = {
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

    var dataUnit = {
        name: "Cavaliere",
        attack: 18,
        defence: 12,
        cost: {
            relativeTime: 10800,
            quantityResource: [
                { quantity: 5, resource: {
                        resourceName: "Oro"
                    }
                },
                { quantity: 15, resource: {
                        resourceName: "Pozioni"
                    }
                }
            ]
        }
    };

    var dataBuilding = {
        buildings: {
            bonus: {
                bonusName: "Bonus tempo di produzione unità",
                quantity: 1,
                type: 1
            },
            cost: {
                relativeTime: 3600,
                quantityResource: [
                    { resource: "Oro", quantity: 50 },
                    { resource: "Pozioni", quantity: 0 }
                ]
            },
            level: 1,
            nameBuilding: "Miniera",
            precondition: [ ],
            productedResource: {
                resource: "Oro",
                relativeTime: 3600,
                quantity: 10,
                maxQuantity: 100
            },
            productedUnits: [ ],
            unitsSpace: 0,
            isConstructible: 1
        },
        isFinished: 1,
        position: {
            x:4 ,
            y: 9
        },
        time: 40000,
        unitInProgress: {
            startedtime: 5000,
            unitPossession: {
                unit: "Cavaliere",
                quantity: 50
            }
        }
    };

    // Carico e setto i GeneralData
    var loadGeneralData = new LoadGeneralData();
    loadGeneralData.setActionDatas(datasOne);
    loadGeneralData.performAction();

    // Carico e setto i PersonalData
    var loadPersonalData = new LoadPersonalData();
    loadPersonalData.setActionDatas(datasTwo);
    loadPersonalData.performAction();

	var ownedBuilding = UserDataManager.getInstance().getUserData().getOwnedBuildings();
	alert(ownedBuilding.length);

    // Test su TrainUnit
    var trainUnit = new TrainUnit(DataFactory.getInstance().getUnit("Cavaliere"), 3, UserDataManager.getInstance().getUserData().ownedBuildings[0]);
	try {
		trainUnit.setActionDatas(false);
	} catch(e) {}
    deepEqual(UserDataManager.getInstance().getUserData().getUnitPossession("Cavaliere").getQuantity(), 10, "Test su TrainUnit");
	trainUnit.setActionDatas(true);
	trainUnit.performAction();
    notDeepEqual(UserDataManager.getInstance().getUserData().getUnitPossession("Cavaliere").getQuantity(), 10, "Test su TrainUnit");
    deepEqual(UserDataManager.getInstance().getUserData().getUnitPossession("Cavaliere").getQuantity(), 13, "Test su TrainUnit");

});