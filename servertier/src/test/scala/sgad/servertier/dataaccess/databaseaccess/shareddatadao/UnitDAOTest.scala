/**
 * FILE: UnitDAOTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/databaseaccess/shareddatadao
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Segantin Fabio
 */

import sgad.servertier.dataaccess.data.shareddata.{Cost, QuantityResource, Resource, `Unit`, DataFactory}
import com.mongodb.casbah.commons.Imports.MongoDBObject
import org.scalatest._
import org.joda.time.IllegalFieldValueException
import sgad.servertier.dataaccess.databaseaccess.shareddatadao.{UnitDAO, CostDAO}


/**
 * Classe di test per l'object UnitDAO
 */
class UnitDAOTest extends FlatSpec {

	DataFactory.setUnits(Map())
	DataFactory.setResources(Map())
	DataFactory.setBuildings(Map())
	var gold = new Resource("oro")
	var potion = new Resource("pozione")
	DataFactory.setResources(Map("oro" -> gold, "pozione" -> potion))
	var quantityResource1 = Vector(new QuantityResource(gold, 100), new QuantityResource(potion, 300))
	var quantityResource2 = Vector(new QuantityResource(gold, 20), new QuantityResource(potion, 70))
	var externalUnit = new `Unit`("fante", 5, 30, new Cost(20, quantityResource2), true)
	var horse = new `Unit`("cavallo", 5, 30, new Cost(20, quantityResource1), true)
	val mongoObject = MongoDBObject(
		"name" -> externalUnit.getName,
		"attack" -> externalUnit.getAttack,
		"defence" -> externalUnit.getDefence,
		"cost" -> CostDAO.getMongoObject(externalUnit.getCost),
		"isBuilder" -> true)
	val mongoObject2 = MongoDBObject(
		"name" -> horse.getName,
		"attack" -> horse.getAttack,
		"defence" -> horse.getDefence,
		"cost" -> CostDAO.getMongoObject(horse.getCost),
		"isBuilder" -> true)

	"UnitDAO" must "creare un MongoObject adeguato" in {
		assert(mongoObject != UnitDAO.getMongoObject(horse))
		assert(mongoObject2 == UnitDAO.getMongoObject(horse))
	}
	it must "creare un costo relativo al mongoObject giusto" in {
		assert(horse != UnitDAO.getObject(mongoObject))
		assert(horse == UnitDAO.getObject(mongoObject2))
	}
	it must "lanciare una eccezione se il mongoObject non ha le informazioni relative" in {
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"attack" -> horse.getAttack,
				"defence" -> horse.getDefence,
				"cost" -> CostDAO.getMongoObject(horse.getCost))
			UnitDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"name" -> horse.getName,
				"defence" -> horse.getDefence,
				"cost" -> CostDAO.getMongoObject(horse.getCost))
			UnitDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"name" -> horse.getName,
				"attack" -> horse.getAttack,
				"cost" -> CostDAO.getMongoObject(horse.getCost))
			UnitDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"name" -> horse.getName,
				"attack" -> horse.getAttack,
				"defence" -> horse.getDefence)
			UnitDAO.getObject(mongoObject2)
		}
	}
	it must "lanciare una eccezione se il tipo dei dati non è corretto" in {

		intercept[IllegalFieldValueException] {
			val mongoObject3 = MongoDBObject(
				"name" -> "cavallo",
				"attack" -> 10.0,
				"defence" -> 10,
				"cost" -> CostDAO.getMongoObject(horse.getCost))
			UnitDAO.getObject(mongoObject3)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject3 = MongoDBObject(
				"name" -> "cavallo",
				"attack" -> 10,
				"defence" -> 10.0,
				"cost" -> CostDAO.getMongoObject(horse.getCost))
			UnitDAO.getObject(mongoObject3)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject3 = MongoDBObject(
				"name" -> "cavallo",
				"attack" -> 10,
				"defence" -> 10,
				"cost" -> "{}")
			UnitDAO.getObject(mongoObject3)
		}
	}
}