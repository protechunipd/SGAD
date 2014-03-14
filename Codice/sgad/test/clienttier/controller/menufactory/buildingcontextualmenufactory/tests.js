test("Test su BuildingContextualMenuFactory", function() {

    var personalDatas = {
        realUser:true, userData:{
            authenticationData: {user: "Bishop92", email: "stefano.battistella.92@gmail.com"},
            ownedResources: [
                { resource: "Oro", quantity: 5},
                { resource: "Pozioni", quantity: 5}
            ],
            ownedUnits: [
                {unit: "Cavaliere", quantity: 8},
                {unit: "Fante", quantity: 4}
            ],
            ownedBuildings: [
                {building: "MinieraL1", isFinished: true, position: {x: 1, y: 4}, time: 40000, storedResources: 40, unitInProgress: {startedtime: 5000, unitPossession: {unit: "Cavaliere", quantity: 50}}},
                {building: "MinieraL2", isFinished: true, position: {x: 3, y: 5}, time: 40000, storedResources: 40, unitInProgress: {startedtime: 5000, unitPossession: {unit: "Cavaliere", quantity: 50}}}
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

    var canvas = document.getElementById("context8");
    var ctx = canvas.getContext("2d");
    canvas.height = 300;
    canvas.width = 300;
    var context = Context.getInstance();
    context.setDrawArea(ctx);

    var bound = Bound.getInstance();
    bound.setHeight(300);
    bound.setWidth(300);

    var userData = UserDataManager.getInstance().getUserData();


    var q1 = new QuantityResource(2,new Resource("Pera"));
    var q2 = new QuantityResource(2,new Resource("Banana"));
    var quantityResource = new Array(q1,q2);
    var menu = new BuildingContextualMenuFactory(new BuildingComponent(new BuildingPossession((new BuildingWithLevel(new Bonus("Bacca",3,4), new Cost(3600,quantityResource), 2, "Stalla", null, new ProductedResource(100,50,1000,new Resource("Per")), null, 2, true, true)),true, new Position(2,2), 3600, 20, null), "Caserma"), new Point2D(2,2));
    menu.buildMenu();

    var frame = new FrameWidget("Miniera",new Point2D(0, 0));

    menu.createDemolishWidget(frame);
    menu.createPreconditionsWidget(frame);
    menu.createProductedResourcesWidget(frame);
    menu.createRemainingTimeWidget(frame);
    menu.createTrainUnitsQueueWidget(frame);
    menu.createTrainUnitsWidget(frame);
    menu.createUpgradeWidget(frame);

    deepEqual(true, true, "Disegno menu BuildingContextualMenuFactory");
});