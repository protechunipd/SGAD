/**
 * FILE: UserDataDAOTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/databaseaccess/userdatadao
 * DATA CREAZIONE: 21 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-21 - Creazione della classe - Segantin Fabio
 */

import org.joda.time.IllegalFieldValueException
import org.scalatest.FlatSpec
import scala.collection._
import scala.collection.mutable.ArrayBuffer
import sgad.servertier.dataaccess.data.shareddata._
import sgad.servertier.dataaccess.data.userdata._
import sgad.servertier.dataaccess.databaseaccess.userdatadao._
import com.mongodb.casbah.Imports._

/**
 * Classe di test per la classe UnitPossessionDAO
 */
class UserDataDAOTest extends FlatSpec {

	DataFactory.setUnits(immutable.Map())
	DataFactory.setResources(immutable.Map())
	DataFactory.setBuildings(immutable.Map())
	var authentication = new AuthenticationData("uno", "due", "tre")

	//Creo due uniPossession e la mappa per costruire un userData
	val gold = new Resource("oro")
	val cream = new Resource("panna")
	val chap = new `Unit`("fante", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	val horse = new `Unit`("cavallo", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	val chapUp = new UnitPossession(10, chap)
	val knightUp = new UnitPossession(15, chap)
	val mapUnitPossession = immutable.Map(chapUp.getKey -> chapUp, knightUp.getKey -> knightUp)

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
	var buildingWithLevel1 = new BuildingWithLevel(true, bonus, cost, 2, "Torre", preconditions, productedResource1, productedUnit1, 2, false)
	var buildingWithLevel2 = new BuildingWithLevel(true, bonus, cost, 2, "Miniera", preconditions, productedResource1, productedUnit1, 2, false)
	var position1 = new Position(3, 8)
	var position2 = new Position(1, 12)
	var unitInProgress = new UnitInProgress(productedUnit2, 1392902384789L, 1)
	val buildingPossession1 = new BuildingPossession(buildingWithLevel1, position1, true, 1392902385004L, unitInProgress)
	val buildingPossession2 = new BuildingPossession(buildingWithLevel1, position2, true, 1392902385004L, unitInProgress)
	val buildingPossession3 = new BuildingPossession(buildingWithLevel2, position2, true, 1392902385004L, unitInProgress)
	val mapBuildingPossession = mutable.Map(buildingPossession1.getKey -> buildingPossession1, buildingPossession2.getKey -> buildingPossession2)

	//Creo la mappa di possessione risorse per l'utente
	val ownedPotions = new OwnedResource(potion, 100)
	val ownedGold = new OwnedResource(gold, 200)
	val ownedCream = new OwnedResource(cream, 100)
	val mapResourcePossession: immutable.Map[String, OwnedResource] = immutable.Map(ownedGold.getKey -> ownedGold, ownedPotions.getKey -> ownedPotions)

	val userData = new UserData(authentication, mapResourcePossession, mapBuildingPossession, mapUnitPossession)

	val buildingvector: Vector[DBObject] = mapBuildingPossession //recupero il vettore
		.map((couple: (String, BuildingPossession)) => {
		//lo mappo prendendo solo le building
		couple._2 //restituisce il secondo elemento della coppia
	}).toVector //lo casto a vettore
		.map((b: BuildingPossession) => {
		//trasformo le building in MongoObject
		BuildingPossessionDAO.getMongoObject(b)
	})

	DataFactory.setResources(immutable.Map("oro" -> gold, "panna" -> cream, "pozione" -> potion))
	DataFactory.setUnits(immutable.Map("fante" -> chap, "cavallo" -> horse, "soldato2" -> productedUnit2))
	DataFactory.setBuildings(immutable.Map[String, BuildingWithLevel](buildingWithLevel1.getKey -> buildingWithLevel1, buildingWithLevel2.getKey -> buildingWithLevel2))


	val resourcevector: Vector[DBObject] = mapResourcePossession //recupero il vettore
		.map((couple: (String, OwnedResource)) => {
		//lo mappo prendendo solo le risorse
		couple._2
	}).toVector //lo casto a vettore
		.map((b: OwnedResource) => {
		//trasformo le risorse in MongoObject
		OwnedResourceDAO.getMongoObject(b)
	})

	val unitvector: Vector[DBObject] = mapUnitPossession //recupero il vettore
		.map((couple: (String, UnitPossession)) => {
		//lo mappo prendendo solo le unità
		couple._2
	}).toVector //lo casto a vettore
		.map((b: UnitPossession) => {
		//trasformo le unità in MongoObject
		UnitPossessionDAO.getMongoObject(b)
	})
	val mongoObject = MongoDBObject(
		"authenticationData" -> AuthenticationDataDAO.getMongoObject(authentication),
		"ownedBuildings" -> buildingvector,
		"ownedResources" -> resourcevector,
		"ownedUnits" -> unitvector,
		"piggyBack" -> ArrayBuffer[String]()
	)
	val resourcevector2 = Vector[DBObject](OwnedResourceDAO.getMongoObject(ownedCream))

	val mongoObject2 = MongoDBObject(
		"authenticationData" -> AuthenticationDataDAO.getMongoObject(authentication),
		"ownedBuildings" -> buildingvector,
		"ownedResources" -> resourcevector2,
		"ownedUnits" -> unitvector,
		"piggyBack" -> ArrayBuffer[String]()
	)

	"UserDataDAO" must "restituire un mongoObject appropriato" in {
		assert(mongoObject == UserDataDAO.getMongoObject(userData))
		assert(mongoObject2 != UserDataDAO.getMongoObject(userData))
	}

	it must "restituire una UserData appropriata" in {
		val returnedUserData = UserDataDAO.getObject(mongoObject)
		assert(userData.getOwnedBuilding(buildingPossession1.getKey) == returnedUserData.getOwnedBuilding(buildingPossession1.getKey))
		assert(userData.getOwnedResource("oro") == returnedUserData.getOwnedResource("oro"))
	}

	it must "lanciare una eccezione se manacano dei dati" in {
		intercept[IllegalFieldValueException] {
			UserDataDAO.getObject(MongoDBObject(
				"ownedBuildings" -> buildingvector,
				"ownedResources" -> resourcevector2,
				"ownedUnits" -> unitvector
			))
		}
		intercept[IllegalFieldValueException] {
			UserDataDAO.getObject(MongoDBObject(
				"authenticationData" -> AuthenticationDataDAO.getMongoObject(authentication),
				"ownedResources" -> resourcevector2,
				"ownedUnits" -> unitvector
			))
		}
		intercept[IllegalFieldValueException] {
			UserDataDAO.getObject(MongoDBObject(
				"authenticationData" -> AuthenticationDataDAO.getMongoObject(authentication),
				"ownedBuildings" -> buildingvector,
				"ownedUnits" -> unitvector
			))
		}
		intercept[IllegalFieldValueException] {
			UserDataDAO.getObject(MongoDBObject(
				"authenticationData" -> AuthenticationDataDAO.getMongoObject(authentication),
				"ownedBuildings" -> buildingvector,
				"ownedResources" -> resourcevector2
			))
		}
		intercept[IllegalFieldValueException] {
			UserDataDAO.getObject(MongoDBObject(
				"authenticationData" -> AuthenticationDataDAO.getMongoObject(authentication),
				"ownedBuildings" -> "pippo",
				"ownedResources" -> resourcevector2,
				"ownedUnits" -> unitvector
			))
		}
	}
}