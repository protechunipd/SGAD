test("Test su BuildConstruction", function () {

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

    var data = DataFactory.getInstance();

    var ris1 = new Resource("pane");
    var ris2 = new Resource("miele");
    var ris3 = new Resource("nutella");

    var arrayrisorse = {"pan":ris1, "miel":ris2, "nut":ris3};

    var ris4 = new Resource("cavolo");
    var ris5 = new Resource("capra");
    var ris6 = new Resource("mucca");

    var arrayrisorse2 = {"cav":ris4, "cap":ris5, "muc":ris6};

    data.setResources(arrayrisorse);

    var uni1 = new Unit("cavaliere", 5, 6, null);
    var uni2 = new Unit("pedone", 5, 6, null);

    var arrayunits = {"cav" : uni1, "ped" : uni2};

    data.setUnits(arrayunits);

    var buil1 = new BuildingWithLevel(null,  null, 2, "stalla", null, null, null, 2, true);
    var buil2 = new BuildingWithLevel(null,  null, 3, "torre", null, null, null, 3, false);

    var arraybuild = {"sta" : buil1, "tor" : buil2};

    data.setBuildings(arraybuild);


    var manager = UserDataManager.getInstance();

    var bui1 = new BuildingPossession(new BuildingWithLevel(null, null, 2, "Caserma", null, null, null, 2,true, true), true, new Position(2,1), 20, 20, null);
    var bui3 = new BuildingPossession(new BuildingWithLevel(null, null, 2, "Stalla", null, null, null, 2,true, true), true, new Position(2,2), 20, 20, null);
    var own1 = {"CasermaL1X2Y1" : bui1, "StallaL2X2Y2" : bui3 };
    uni1 = {"cav" : new UnitPossession(2, new Unit("cavaliere",1,2, null)), "ban" : new UnitPossession(3, new Unit("bananiere",2,3,null))};
    var res1 = {"Per" : new OwnedResource(2, new Resource("Pera")), "Ban" : new OwnedResource(3, new Resource("Banana"))};
    var usr1 = new UserData(new AuthenticationData("mail@mail.it", "user"), own1, res1, uni1);
    manager.setUserData(usr1);


    var build = new BuildingWithLevel(null, null, 2, "Stalla", null, null,null, 2, true, true);
    var action = new BuildConstruction(new TileComponent(new Position(1,1)), "StallaL2");

    action.setActionDatas(build);
    action.performAction();

});