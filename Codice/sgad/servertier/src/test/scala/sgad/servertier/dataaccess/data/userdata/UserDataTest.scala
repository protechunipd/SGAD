/**
 * FILE: UserData.tex
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/dataaccess/data/userdata
 * DATA CREAZIONE: 21 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-21 - Creazione della classe - Biancucci Maurizio
 */

import org.scalatest.{PrivateMethodTester, FlatSpec}
import scala.collection.mutable
import sgad.servertier.dataaccess.data.shareddata._
import sgad.servertier.dataaccess.data.userdata._

/**
 * Classe di test della classe UserData
 */
class UserDataTest extends FlatSpec with PrivateMethodTester {

	var authentication = new AuthenticationData("uno", "due", "tre")

	//Creo due uniPossession e la mappa per costruire un userData
	val gold = new Resource("oro")
	val chap = new `Unit`("fante", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	val horse = new `Unit`("cavallo", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	val chapUp = new UnitPossession(10, chap)
	val knightUp = new UnitPossession(15, horse)
	val mapUnitPossession = Map(chapUp.getKey -> chapUp, knightUp.getKey -> knightUp)

	//Creo una buildingpossession e la mappa per creare l'userdata
	var timeNow = 1392902385004L
	val quantityResource = Array[QuantityResource]()
	var preconditions = Vector[BuildingWithLevel]()
	var bonus = new Bonus("bonus1", 2, 3)
	var potion = new Resource("pozione")
	var quantityResourceVector = Vector(new QuantityResource(gold, 100), new QuantityResource(potion, 300))
	var cost = new Cost(1000, quantityResourceVector)
	var productedResource1 = new ProductedResource(gold, 50, 100, 800)
	var productedUnit1 = Vector[`Unit`]()
	var productedUnit2 = new `Unit`("soldato2", 1, 3, cost, true)
	var buildingWithLevel = new BuildingWithLevel(true, bonus, cost, 1, "Torre", preconditions, productedResource1, productedUnit1, 2, false)
	var buildingWithLevel1 = new BuildingWithLevel(true, bonus, cost, 2, "Torre", preconditions, productedResource1, productedUnit1, 2, false)
	var buildingWithLevel2 = new BuildingWithLevel(true, bonus, cost, 2, "Miniera", preconditions, productedResource1, productedUnit1, 2, false)
	var position = new Position(3, 8)
	var position2 = new Position(1, 12)
	var unitInProgress = new UnitInProgress(productedUnit2, 1392902384789L, 1)
	val buildingPossession1 = new BuildingPossession(buildingWithLevel1, position, true, 1392902385004L, unitInProgress)
	val buildingPossession2 = new BuildingPossession(buildingWithLevel1, position2, true, 1392902385004L, unitInProgress)
	val buildingPossession3 = new BuildingPossession(buildingWithLevel2, position2, true, 1392902385004L, unitInProgress)
	val mapBuildingPossession = mutable.HashMap(buildingPossession1.getKey -> buildingPossession1, buildingPossession2.getKey -> buildingPossession2)

	//Creo la mappa di possessione risorse per l'utente
	val ownedPotions = new OwnedResource(potion, 100)
	val ownedGold = new OwnedResource(gold, 200)
	val mapResourcePoss: Map[String, OwnedResource] = Map(ownedGold.getKey -> ownedGold, ownedPotions.getKey -> ownedPotions)

	val userData = new UserData(authentication, mapResourcePoss, mapBuildingPossession, mapUnitPossession)

	DataFactory.setBuildings(Map(buildingWithLevel.getKey -> buildingWithLevel, buildingWithLevel1.getKey -> buildingWithLevel1, buildingWithLevel2.getKey -> buildingWithLevel2))

	"UserData" must "mantenere uno stato adeguato a seguito ai cambiamenti dovuti al set o alla costruzione" in {
		//test con le buildingPossession
		assert(userData.getOwnedBuilding(buildingPossession1.getKey) == buildingPossession1)
		assert(userData.getOwnedBuilding(buildingPossession1.getKey) != buildingPossession2)

		//test con le risorse
		assert(userData.getOwnedResource(ownedPotions.getKey) == ownedPotions)
		assert(userData.getOwnedResource(ownedPotions.getKey) != ownedGold)

		//test con le unità
		assert(userData.getOwnedUnit(chapUp.getKey).getKey == chapUp.getKey)
		assert(userData.getOwnedUnit(chapUp.getKey).getKey != knightUp.getKey)
		intercept[NoSuchElementException] {
			userData.getOwnedBuilding(buildingPossession3.getKey)
		}
		userData.addBuildingPossession(buildingPossession3)
		assert(userData.getOwnedBuilding(buildingPossession3.getKey) == buildingPossession3)
		assert(userData.getAuthenticationData == authentication)
		userData.addUserAttacked("pippo")
		userData.removeUserAttacked("pippo")
	}

	it must "ritornare la mappa adeguata se richiesta da un DAO" in {
		val getOwnedBuildingsMap = PrivateMethod[mutable.Map[String, BuildingPossession]]('getOwnedBuildingsMap)
		val getOwnedResourceMap = PrivateMethod[Map[String, OwnedResource]]('getOwnedResourceMap)
		val getOwnedUnitMap = PrivateMethod[Map[String, UnitPossession]]('getOwnedUnitMap)
		assert((userData invokePrivate getOwnedBuildingsMap()) == mapBuildingPossession)
		assert((userData invokePrivate getOwnedResourceMap()) == mapResourcePoss)
		assert((userData invokePrivate getOwnedUnitMap()) == mapUnitPossession)
	}
	it must "ritornare il valore giusto se si chiede la possessione" in {
		assert(userData.buildingIsOwned("TorreL1"))
	}
}
