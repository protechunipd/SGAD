/**
 * FILE: LoadGlobalDataTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 24 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-24 - Creazione della classe - Biancucci Maurizio
 */

import org.scalatest.FlatSpec
import scala.collection.mutable
import sgad.servertier.businesslogic.operations.LoadGlobalData
import sgad.servertier.dataaccess.data.shareddata._
import sgad.servertier.dataaccess.data.userdata._
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager

/**
 * Classe di test per la classe LoadGlobalData
 */
class LoadGlobalDataTest extends FlatSpec {
	val connected = DataBaseManager.connect()
	if (connected)
		println("DATABASE CONNESSO")
	else
		println("DATABASE NON CONNESSO")

	assume(connected)

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
	var quantityResourceVector = Vector(new QuantityResource(gold, 100), new QuantityResource(potion, 300))
	var cost = new Cost(4, quantityResourceVector)
	var productedResource1 = new ProductedResource(gold, 10, 100, 200)
	var productedUnit1 = Vector[`Unit`]()
	var productedUnit2 = new `Unit`("fante", 1, 3, new Cost(1, Vector(new QuantityResource(gold, 200))), true)
	var buildingWithLevel1 = new BuildingWithLevel(true, bonus, cost, 2, "Torre", preconditions, null, productedUnit1, 2, false)
	var buildingWithLevel2 = new BuildingWithLevel(true, bonus, cost, 2, "Miniera", preconditions, productedResource1, productedUnit1, 2, false)
	var position = new Position(3, 8)
	var position2 = new Position(1, 12)
	var unitInProgress = new UnitInProgress(productedUnit2, timeNow, 500)
	val buildingPossession1 = new BuildingPossession(buildingWithLevel1, position, false, timeNow, null)
	val buildingPossession2 = new BuildingPossession(buildingWithLevel1, position2, true, timeNow, unitInProgress)
	val buildingPossession3 = new BuildingPossession(buildingWithLevel2, position2, true, timeNow, null)
	val mapBuildingPossession = mutable.HashMap(buildingPossession1.getKey -> buildingPossession1, buildingPossession2.getKey -> buildingPossession2, buildingPossession3.getKey -> buildingPossession3)
	//Creo la mappa di possessione risorse per l'utente
	val ownedPotions = new OwnedResource(potion, 100)
	val ownedGold = new OwnedResource(gold, 200)
	val mapResourcePoss: Map[String, OwnedResource] = Map(ownedGold.getKey -> ownedGold, ownedPotions.getKey -> ownedPotions)

	val userData = new UserData(authentication, mapResourcePoss, mapBuildingPossession, mapUnitPossession)

	val loadGlobalData = new LoadGlobalData

	"Se non passo l'autorizzazione di user l'operazione" must "ritornare \"{data: false, unauthorized: true}\"" in {
		assert(loadGlobalData.execute(null, "") == "{data: false, unauthorized: true}")
	}

	"Se passo falsa l'autorizzazione di user l'operazione" must "ritornare \"{data: false, unauthorized: true}\"" in {
		assert(loadGlobalData.execute(null, "", userAuthorization = false) == "{data: false, unauthorized: true}")
	}

	"Se passo l'autorizzazione user e un userData ma l'authorizationStringErrata" must "ritornare la stringa \"{data: false, authentication: false}\"" in {
		val data = "authentication:dawaw"
		assert(loadGlobalData.execute(userData, data, userAuthorization = true) == "{data: false, authentication: false}")
		assert(loadGlobalData.execute(userData, "", userAuthorization = true) == "{data: false, parameters: false }")
	}

	"Se passo l'autorizzazione user" must "ritornare la stringa non vuota" in {
		val data = "authentication:" + userData.getAuthenticationData.getAuthenticationString
		assert(loadGlobalData.execute(userData, data, userAuthorization = true) != "")
	}
}
