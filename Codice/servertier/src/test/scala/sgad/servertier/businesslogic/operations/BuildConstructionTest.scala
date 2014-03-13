/**
 * FILE: BuildConstructionTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/servertier/businesslogic/operations
 * DATA CREAZIONE: 25 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-25 - Creazione della classe - Segantin Fabio
 */

import org.scalatest.FlatSpec
import scala.collection.mutable
import sgad.servertier.businesslogic.operations.BuildConstruction
import sgad.servertier.dataaccess.data.shareddata._
import sgad.servertier.dataaccess.data.userdata._

/**
 * Classe per il test di BuildConstruction.
 */
class BuildConstructionTest extends FlatSpec {
	var autenticazione = new AuthenticationData("uno", "due", "tre")

	//Creo due uniPossession e la mappa per costruire un userData
	val gold = new Resource("oro")
	val chap = new `Unit`("fante", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	val horse = new `Unit`("cavallo", 15, 15, new Cost(20, Vector(new QuantityResource(gold, 200))), true)
	val chapUp = new UnitPossession(10, chap)
	val knightUp = new UnitPossession(15, horse)
	val mapUnitPossession = Map(chapUp.getKey -> chapUp, knightUp.getKey -> knightUp)

	//Creo una buildingpossession e la mappa per creare l'userdata
	var timeNow = System.currentTimeMillis / 1000L
	val quantityResource = Array[QuantityResource]()
	var preconditions = Vector[BuildingWithLevel]()
	var bonus = new Bonus("bonus1", 2, 3)
	var potion = new Resource("pozione")
	var quantityResourceVector = Vector(new QuantityResource(gold, 300), new QuantityResource(potion, 300))
	var cost = new Cost(4, quantityResourceVector)
	var productedResource1 = new ProductedResource(gold, 10, 100, 200)
	var productedUnit1 = Vector[`Unit`]()
	var productedUnit2 = new `Unit`("fante", 1, 3, new Cost(1, Vector(new QuantityResource(gold, 200))), true)
	var buildingWithLevel1 = new BuildingWithLevel(true, bonus, cost, 2, "Torre", preconditions, null, productedUnit1, 2, false)
	var buildingWithLevel2 = new BuildingWithLevel(true, bonus, cost, 2, "Miniera", preconditions, productedResource1, productedUnit1, 2, false)
	var buildingWithLevel5 = new BuildingWithLevel(isConstructible = false, bonus, new Cost(1, Vector(new QuantityResource(gold, 200000000))), 1, "Scuola di Danza", preconditions, productedResource1, productedUnit1, 2, false)
	var buildingWithLevel3 = new BuildingWithLevel(true, bonus, new Cost(1, Vector(new QuantityResource(gold, 200000000))), 2, "Scuola di Danza", preconditions, productedResource1, productedUnit1, 2, false)
	var buildingWithLevel4 = new BuildingWithLevel(true, bonus, cost, 2, "Scuola di balletto", Vector("Scuola di DanzaL1"), productedResource1, productedUnit1, 2, false)
	var position1 = new Position(3, 8)
	var position2 = new Position(1, 12)
	var unitInProgress = new UnitInProgress(productedUnit2, timeNow, 500)
	val buildingPossession1 = new BuildingPossession(buildingWithLevel1, position1, false, timeNow, null)
	val buildingPossession2 = new BuildingPossession(buildingWithLevel1, position2, true, timeNow, unitInProgress)
	val buildingPossession3 = new BuildingPossession(buildingWithLevel2, position2, true, timeNow, null)
	val mapBuildingPossession = mutable.HashMap(buildingPossession1.getKey -> buildingPossession1, buildingPossession2.getKey -> buildingPossession2, buildingPossession3.getKey -> buildingPossession3)
	//Creo la mappa di possessione risorse per l'utente
	val ownedPotions = new OwnedResource(potion, 10000)
	val ownedGold = new OwnedResource(gold, 20000)
	val mapResourcePossession: Map[String, OwnedResource] = Map(ownedGold.getKey -> ownedGold, ownedPotions.getKey -> ownedPotions)

	val userData = new UserData(autenticazione, mapResourcePossession, mapBuildingPossession, mapUnitPossession)

	DataFactory.setBuildings(Map(buildingWithLevel1.getKey -> buildingWithLevel1, buildingWithLevel2.getKey -> buildingWithLevel2, buildingWithLevel4.getKey -> buildingWithLevel4, buildingWithLevel3.getKey -> buildingWithLevel3, buildingWithLevel5.getKey -> buildingWithLevel5))
	DataFactory.setResources(Map("oro" -> gold, "pozione" -> potion))
	DataFactory.setUnits(Map(chap.getKey -> chap, horse.getKey -> horse))

	"BuildConstruction" must "costruire un edificio se vengono passati i dati corretti" in {
		val buildConstruction = new BuildConstruction
		val previousResources = Vector(userData.getOwnedResource("oro").getQuantity, userData.getOwnedResource("pozione").getQuantity)
		val newBuilding = new BuildingPossession(buildingWithLevel2, new Position(4, 5), false, timeNow, null)
		assert(buildConstruction.execute(userData, "{key:" + buildingWithLevel2.getKey + ",x:" + 4 + ",y:" + 5 + ",authentication:471038b0dc530621b038559a5b840942b10b7623}", userAuthorization = true) == "{data:true, messages:[]}")
		assert(userData.getOwnedBuilding(newBuilding.getKey) == newBuilding)
		assert(userData.getOwnedResource("oro").getQuantity == previousResources(0) - 300)
		assert(userData.getOwnedResource("pozione").getQuantity == previousResources(1) - 300)
	}

	it must "ritornare falso se è già occupato" in {
		val buildConstruction = new BuildConstruction
		assert(buildConstruction.execute(userData, "{key:" + buildingWithLevel2.getKey + ",x:" + 1 + ",y:" + 12 + ",authentication:471038b0dc530621b038559a5b840942b10b7623}", userAuthorization = true) == "{data:false, position:false, messages:[]}")
	}

	it must "ritornare falso se non si possiedono le risorse" in {
		val buildConstruction = new BuildConstruction
		assert(buildConstruction.execute(userData, "{key:" + buildingWithLevel3.getKey + ",x:" + 4 + ",y:" + 5 + ",authentication:42}", userAuthorization = true) == "{data:false, authentication:false}")
		assert(buildConstruction.execute(userData, "{key:" + buildingWithLevel3.getKey + ",x:" + 4 + ",y:" + 5 + ",authentication:471038b0dc530621b038559a5b840942b10b7623}", userAuthorization = true) == "{data:false, position:false, messages:[]}")
	}
	it must "ritornare falso se non si possiedono le costruzioni o se non è costruibile" in {
		val buildConstruction = new BuildConstruction
		assert(buildConstruction.execute(userData, "{key:" + buildingWithLevel4.getKey + ",x:" + 14 + ",y:" + 5 + ",authentication:471038b0dc530621b038559a5b840942b10b7623}", userAuthorization = true) == "{data:false, condition:false, messages:[]}")
		assert(buildConstruction.execute(userData, "{key:" + buildingWithLevel5.getKey + ",x:" + 15 + ",y:" + 5 + ",authentication:471038b0dc530621b038559a5b840942b10b7623}", userAuthorization = true) == "{data:false, costructible:false, messages:[]}")
	}
	it must "ritornare falso se ci sono problemi con i dati" in {
		val buildConstruction = new BuildConstruction
		assert(buildConstruction.execute(userData, "{key:" + buildingWithLevel4.getKey + ",x:" + 14 + ",y:" + 5 + "}", userAuthorization = true) == "{data:false, parameters:false}")
		assert(buildConstruction.execute(userData, "{key:" + buildingWithLevel5.getKey + ",x:" + gold + ",y:" + 5 + ",authentication:471038b0dc530621b038559a5b840942b10b7623}", userAuthorization = true) == "{data:false, parameters:false}")
	}
}