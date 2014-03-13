/**
 * FILE: UpgradeBuildingTest.scala
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

import org.scalatest._
import scala.collection.mutable
import sgad.servertier.businesslogic.operations.OperationFactory
import sgad.servertier.dataaccess.data.shareddata._
import sgad.servertier.dataaccess.data.userdata._

/**
 * Classe per il test di UpgradeBuilding.
 */
class UpgradeBuildingTest extends FlatSpec {
	var authentication = new AuthenticationData("uno", "due", "tre")

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
	var quantityResouceVector = Vector(new QuantityResource(gold, 300), new QuantityResource(potion, 300))
	var cost = new Cost(1, quantityResouceVector)
	var productedResource1 = new ProductedResource(gold, 10, 100, 200)
	var productedUnit1 = Vector[`Unit`]()
	var productedUnit2 = new `Unit`("fante", 1, 3, new Cost(1, Vector(new QuantityResource(gold, 200))), true)
	var buildingWithLevel1 = new BuildingWithLevel(true, bonus, cost, 1, "Torre", preconditions, null, productedUnit1, 2, false)
	var buildingWithLevel2 = new BuildingWithLevel(true, bonus, cost, 1, "Miniera", preconditions, productedResource1, productedUnit1, 2, false)
	var buildingWithLevel3 = new BuildingWithLevel(true, bonus, new Cost(0, Vector(new QuantityResource(gold, 200000))), 2, "Torre", preconditions, productedResource1, productedUnit1, 2, false)
	var buildingWithLevel4 = new BuildingWithLevel(true, bonus, cost, 2, "Miniera", Vector("TorreL2"), productedResource1, productedUnit1, 2, false)
	var position1 = new Position(3, 8)
	var position2 = new Position(1, 12)
	var unitInProgress = new UnitInProgress(productedUnit2, timeNow, 500)
	val buildingPossession1 = new BuildingPossession(buildingWithLevel1, position1, false, timeNow, null)
	val buildingPossession2 = new BuildingPossession(buildingWithLevel1, position2, true, timeNow, unitInProgress)
	val buildingPossession3 = new BuildingPossession(buildingWithLevel2, position2, true, timeNow, null)
	val buildingPossession4 = new BuildingPossession(buildingWithLevel3, position1, true, timeNow, null)
	val mapBuildingPossession = mutable.HashMap(buildingPossession1.getKey -> buildingPossession1, buildingPossession2.getKey -> buildingPossession2, buildingPossession3.getKey -> buildingPossession3)
	//Creo la mappa di possessione risorse per l'utente
	val ownedPotions = new OwnedResource(potion, 10000)
	val ownedGold = new OwnedResource(gold, 20000)
	val mapResourcePoss: Map[String, OwnedResource] = Map(ownedGold.getKey -> ownedGold, ownedPotions.getKey -> ownedPotions)

	val userData = new UserData(authentication, mapResourcePoss, mapBuildingPossession, mapUnitPossession)

	DataFactory.setBuildings(Map(buildingWithLevel1.getKey -> buildingWithLevel1, buildingWithLevel2.getKey -> buildingWithLevel2, buildingWithLevel4.getKey -> buildingWithLevel4, buildingWithLevel3.getKey -> buildingWithLevel3))
	DataFactory.setResources(Map("oro" -> gold, "pozione" -> potion))
	DataFactory.setUnits(Map(chap.getKey -> chap, horse.getKey -> horse))

	"UpgradeBuilding" must "non permettere l'upgrade di una costruzione in assenza di prerequisiti" in {
		val upgrade = OperationFactory.getOperation("UpgradeBuilding")
		assert(upgrade.execute(userData, "{key:" + buildingPossession3.getKey + ",authentication:471038b0dc530621b038559a5b840942b10b7623}", userAuthorization = true) == "{data:false, resources:true, precondition:false, workers:24, messages:[]}")
	}
	it must "impedire l'upgrade di una costruzione in assenza di risorse" in {
		val upgrade = OperationFactory.getOperation("UpgradeBuilding")
		assert(upgrade.execute(userData, "{key:" + buildingPossession2.getKey + ",authentication:471038b0dc530621b038559a5b840942b10b7623}", userAuthorization = true) == "{data:false, resources:false, precondition:true, workers:24, messages:[]}")
	}
	it must "iniziare l'upgrade se si possiedono risorse e requisiti" in {
		userData.getOwnedResource("oro").setQuantity(200000)
		val upgrade = OperationFactory.getOperation("UpgradeBuilding")
		assert(upgrade.execute(userData, "{key:" + buildingPossession2.getKey + ",authentication:471038b0dc530621b038559a5b840942b10b7623}", userAuthorization = true) == "{data:true, messages:[]}")
		assert(userData.getOwnedResource("oro").getQuantity == 0)
		Thread.sleep(1500)
		userData.getOwnedResource("oro").setQuantity(200000)
		assert(upgrade.execute(userData, "{key:" + buildingPossession3.getKey + ",authentication:471038b0dc530621b038559a5b840942b10b7623}", userAuthorization = true) == "{data:true, messages:[]}")
		assert(upgrade.execute(userData, "{authentication:471038b0dc530621b038559a5b840942b10b7623}", userAuthorization = true) == "{data:false, parameters:false}")
		assert(upgrade.execute(userData, "{key:" + buildingPossession3.getKey + ",authentication:471038dc530621b038559a5b840942b10b7623}", userAuthorization = true) == "{data:false, authentication:false}")
	}
}
