//Bisogna essere autenticati con l'utente amministratore del database di gioco: sgaddb

//Elimina la collezione di risorse
db.resources.drop()

//Elimina la collezione delle unità
db.units.drop()

//Elimina la collezione degli edifici
db.buildings.drop()

//Inserisce le risorse
db.resources.insert( [ { resourceName: "Oro" },
                       { resourceName: "Pozioni" } ] )
					   
//Inserisce le unita
db.units.insert( [ { name: "Fante", attack: NumberInt(6), defence: NumberInt(15), cost: { relativeTime: NumberInt(5), quantityResource: [ { resource: "Oro", quantity: NumberInt(2) },
	{ resource: "Pozioni", quantity: NumberInt(3) }] }, isBuilder: false },
	{ name: "Cavaliere", attack: NumberInt(18), defence: NumberInt(12), cost: { relativeTime: NumberInt(5), quantityResource: [ { resource: "Oro", quantity: NumberInt(5) },
		{ resource: "Pozioni", quantity: NumberInt(15) }] }, isBuilder: false },
	{ name: "Carro d'assalto", attack: NumberInt(45), defence: NumberInt(40), cost: { relativeTime: NumberInt(5), quantityResource: [ { resource: "Oro", quantity: NumberInt(40) },
		{ resource: "Pozioni", quantity: NumberInt(40) }] }, isBuilder: false },
	{ name: "Lavoratore", attack: NumberInt(0), defence: NumberInt(0), cost: { relativeTime: NumberInt(0), quantityResource: [ { resource: "Oro", quantity: NumberInt(0) },
		{ resource: "Pozioni", quantity: NumberInt(0) }] }, isBuilder: true }
] )

//Inserisce gli edifici
db.buildings.insert( [
						{ nameBuilding: "Miniera", level: NumberInt(1), cost: { relativeTime: NumberInt(5), quantityResource: [{ resource: "Oro", quantity: NumberInt(50) },
																											{ resource: "Pozioni", quantity: NumberInt(0) }] }, 
							precondition: [ ], unitsSpace: NumberInt(0), productedResource: { resource: "Oro", relativeTime: NumberInt(5), quantity: NumberInt(10), maxQuantity: NumberInt(100) },
							productedUnits: [ ], bonus : { bonusName: "Bonus tempo di produzione unità", type: NumberInt(1), quantity: 1 }, isConstructible: true, isDestructible: true},
								
						{ nameBuilding: "Miniera", level: NumberInt(2), cost: { relativeTime: NumberInt(5), quantityResource: [{ resource: "Oro", quantity: NumberInt(300) },
																											 { resource: "Pozioni", quantity: NumberInt(0) }] }, 
							precondition: ["Torre dello stregoneL2"], unitsSpace: NumberInt(0), productedResource: { resource: "Oro", relativeTime: NumberInt(5), quantity: NumberInt(20), maxQuantity: NumberInt(200) },
							productedUnits: [ ], bonus : { bonusName: "Bonus tempo di produzione unità", type: NumberInt(1), quantity: 1 },  isConstructible: false, isDestructible: true },
							
						{ nameBuilding: "Miniera", level: NumberInt(3), cost: { relativeTime: NumberInt(5), quantityResource: [{ resource: "Oro", quantity: NumberInt(800) },
																											 { resource: "Pozioni", quantity: NumberInt(0) }] }, 
							precondition: ["Torre dello stregoneL3"], unitsSpace: NumberInt(0), productedResource: { resource: "Oro", relativeTime: NumberInt(5), quantity: NumberInt(40), maxQuantity: NumberInt(400) },
							productedUnits: [ ], bonus : { bonusName: "Bonus tempo di produzione unità", type: NumberInt(1), quantity: 1 },  isConstructible: false, isDestructible: true },
							
						{ nameBuilding: "Scuola di magia", level: NumberInt(1), cost: { relativeTime: NumberInt(5), quantityResource: [{ resource: "Oro", quantity: NumberInt(100) },
																													{ resource: "Pozioni", quantity: NumberInt(10) }] }, 
							precondition: [ ], unitsSpace: NumberInt(0), productedResource: { resource: "Pozioni", relativeTime: NumberInt(5), quantity: NumberInt(10), maxQuantity: NumberInt(100) },
							productedUnits: [ ], bonus : { bonusName: "Bonus tempo di produzione unità", type: NumberInt(1), quantity: 1 },  isConstructible: true, isDestructible: true },
							
						{ nameBuilding: "Scuola di magia", level: NumberInt(2), cost: { relativeTime: NumberInt(5), quantityResource: [{ resource: "Oro", quantity: NumberInt(300) },
																													{ resource: "Pozioni", quantity: NumberInt(20) }] }, 
							precondition: ["Torre dello stregoneL2"], unitsSpace: NumberInt(0), productedResource: { resource: "Pozioni", relativeTime: NumberInt(5), quantity: NumberInt(15), maxQuantity: NumberInt(150) },
							productedUnits: [ ], bonus : { bonusName: "Bonus tempo di produzione unità", type: NumberInt(1), quantity: 1 },  isConstructible: false, isDestructible: true },
							
						{ nameBuilding: "Scuola di magia", level: NumberInt(3), cost: { relativeTime: NumberInt(5), quantityResource: [{ resource: "Oro", quantity: NumberInt(500) },
																													{ resource: "Pozioni", quantity: NumberInt(30) }] },
							precondition: ["Torre dello stregoneL3"], unitsSpace: NumberInt(0), productedResource: { resource: "Pozioni", relativeTime: NumberInt(5), quantity: NumberInt(25), maxQuantity: NumberInt(200) },
							productedUnits: [ ], bonus : { bonusName: "Bonus tempo di produzione unità", type: NumberInt(1), quantity: 1 },  isConstructible: false, isDestructible: true },
							
						{ nameBuilding: "Stalla", level: NumberInt(1), cost: { relativeTime: NumberInt(5), quantityResource: [{ resource: "Oro", quantity: NumberInt(200) },
																													{ resource: "Pozioni", quantity: NumberInt(50) }] }, 
							precondition: [ ], unitsSpace: NumberInt(15), productedResource: { },
							productedUnits: [ ], bonus : { bonusName: "Bonus tempo di produzione unità", type: NumberInt(1), quantity: 1 },  isConstructible: true, isDestructible: true },
						
						{ nameBuilding: "Stalla", level: NumberInt(2), cost: { relativeTime: NumberInt(5), quantityResource: [{ resource: "Oro", quantity: NumberInt(200) },
																													{ resource: "Pozioni", quantity: NumberInt(50) }] }, 
							precondition: ["Torre dello stregoneL2"], unitsSpace: NumberInt(30), productedResource: { },
							productedUnits: [ ], bonus : { bonusName: "Bonus tempo di produzione unità", type: NumberInt(1), quantity: 1 },  isConstructible: false, isDestructible: true },
							
						{ nameBuilding: "Stalla", level: NumberInt(3), cost: { relativeTime: NumberInt(5), quantityResource: [{ resource: "Oro", quantity: NumberInt(400) },
																													{ resource: "Pozioni", quantity: NumberInt(100) }] }, 
							precondition: ["Torre dello stregoneL3"], unitsSpace: NumberInt(50), productedResource: { },
							productedUnits: [ ], bonus : { bonusName: "Bonus tempo di produzione unità", type: NumberInt(1), quantity: 1 },  isConstructible: false, isDestructible: true },
							
						{ nameBuilding: "Caserma", level: NumberInt(1), cost: { relativeTime: NumberInt(5), quantityResource: [{ resource: "Oro", quantity: NumberInt(100) },
																													{ resource: "Pozioni", quantity: NumberInt(100) }] }, 
							precondition: [ ], unitsSpace: NumberInt(15), productedResource: { },
							productedUnits: ["Fante", "Cavaliere" , "Carro d'assalto"], bonus : { bonusName: "Bonus tempo di produzione unità", type: NumberInt(1), quantity: 1 },  isConstructible: true, isDestructible: true },
							
						{ nameBuilding: "Caserma", level: NumberInt(2), cost: { relativeTime: NumberInt(5), quantityResource: [{ resource: "Oro", quantity: NumberInt(150) },
																													{ resource: "Pozioni", quantity: NumberInt(150) }] }, 
							precondition: ["Torre dello stregoneL2", "StallaL2"], unitsSpace: NumberInt(25), productedResource: { },
							productedUnits: ["Fante", "Cavaliere" , "Carro d'assalto"], bonus : { bonusName: "Bonus tempo di produzione unità", type: NumberInt(1), quantity: 0.9 },  isConstructible: false, isDestructible: true },
							
						{ nameBuilding: "Caserma", level: NumberInt(3), cost: { relativeTime: NumberInt(5), quantityResource: [{ resource: "Oro", quantity: NumberInt(200) },
																													{ resource: "Pozioni", quantity: NumberInt(200) }] }, 
							precondition: ["Torre dello stregoneL3", "StallaL2"], unitsSpace: NumberInt(50), productedResource: { },
							productedUnits: ["Fante", "Cavaliere" , "Carro d'assalto"], bonus : { bonusName: "Bonus tempo di produzione unità", type: NumberInt(1), quantity: 0.8 },  isConstructible: false, isDestructible: true },
							
						{ nameBuilding: "Torre dello stregone", level: NumberInt(1), cost: { relativeTime: NumberInt(5), quantityResource: [{ resource: "Oro", quantity: NumberInt(0) },
																													{ resource: "Pozioni", quantity: NumberInt(0) }] }, 
							precondition: [ ], unitsSpace: NumberInt(0), productedResource: { },
							productedUnits: [ ], bonus : { bonusName: "Bonus tempo di produzione unità", type: NumberInt(1), quantity: 1 },  isConstructible: false, isDestructible: false },
							
						{ nameBuilding: "Torre dello stregone", level: NumberInt(2), cost: { relativeTime: NumberInt(5), quantityResource: [{ resource: "Oro", quantity: NumberInt(400) },
																													{ resource: "Pozioni", quantity: NumberInt(400) }] }, 
							precondition: [ ], unitsSpace: NumberInt(0), productedResource: { },
							productedUnits: [ ], bonus : { bonusName: "Bonus tempo di produzione unità", type: NumberInt(1), quantity: 1 },  isConstructible: false, isDestructible: false },
							
						{ nameBuilding: "Torre dello stregone", level: NumberInt(3), cost: { relativeTime: NumberInt(5), quantityResource: [{ resource: "Oro", quantity: NumberInt(800) },
																													{ resource: "Pozioni", quantity: NumberInt(300) }] }, 
							precondition: [ ], unitsSpace: NumberInt(0), productedResource: { },
							productedUnits: [ ], bonus : { bonusName: "Bonus tempo di produzione unità", type: NumberInt(1), quantity: 1 },  isConstructible: false, isDestructible: false }
						] )