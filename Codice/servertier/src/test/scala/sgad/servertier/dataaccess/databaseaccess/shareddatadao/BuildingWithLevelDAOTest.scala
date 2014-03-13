/**
 * FILE: BuildingWithLevelDAOTest.scala
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

import sgad.servertier.dataaccess.data.shareddata._
import com.mongodb.casbah.commons.Imports.MongoDBObject
import org.scalatest._
import org.joda.time.IllegalFieldValueException
import sgad.servertier.dataaccess.databaseaccess.shareddatadao.{ProductedResourceDAO, BuildingWithLevelDAO, CostDAO, BonusDAO}


/**
 * Classe di test per l'object BuildingWithLevelDAO
 */
class BuildingWithLevelDAOTest extends FlatSpec {

	DataFactory.setUnits(Map())
	DataFactory.setResources(Map())
	DataFactory.setBuildings(Map())
	var preconditions = Vector[BuildingWithLevel]()
	var bonus = new Bonus("bonus1", 2, 3.0F)
	var gold = new Resource("oro")
	var potion = new Resource("pozione")
	DataFactory.setResources(Map("oro" -> gold, "pozione" -> potion))
	var quantityResourceVector = Vector(new QuantityResource(gold, 100), new QuantityResource(potion, 300))
	var cost = new Cost(1000, quantityResourceVector)
	var productedResource1 = new ProductedResource(gold, 1223, 1, 2)
	var productedUnit1 = Vector[`Unit`]()
	var productedUnit2 = new `Unit`("soldato2", 1, 3, cost, true)
	DataFactory.setUnits(Map("soldato2" -> productedUnit2))
	var Tower = new BuildingWithLevel(true, bonus, cost, 2, "Torre", preconditions, productedResource1, productedUnit1, 2, false)
	DataFactory.setBuildings(Map(Tower.getKey -> Tower))
	var mongoObject = MongoDBObject(
		"bonus" -> BonusDAO.getMongoObject(bonus),
		"cost" -> CostDAO.getMongoObject(cost),
		"isConstructible" -> true,
		"level" -> 2,
		"nameBuilding" -> "Torre",
		"precondition" -> preconditions,
		"productedResource" -> ProductedResourceDAO.getMongoObject(productedResource1),
		"productedUnits" -> productedUnit1,
		"unitsSpace" -> 2,
		"isDestructible" -> false
	)
	productedUnit1 = Vector[`Unit`](productedUnit2)
	preconditions = Vector[BuildingWithLevel](Tower)

	var cave = new BuildingWithLevel(true, bonus, cost, 2, "Miniera", preconditions, productedResource1, productedUnit1, 2, false)
	var vectorkeys = preconditions.map((b: BuildingWithLevel) => {
		b.getKey
	})
	var vectorUnit = productedUnit1.map((u: `Unit`) => {
		u.getKey
	})
	var mongoObject2 = MongoDBObject(
		"bonus" -> BonusDAO.getMongoObject(bonus),
		"cost" -> CostDAO.getMongoObject(cost),
		"isConstructible" -> true,
		"level" -> 2,
		"nameBuilding" -> "Miniera",
		"precondition" -> vectorkeys,
		"productedResource" -> ProductedResourceDAO.getMongoObject(productedResource1),
		"productedUnits" -> vectorUnit,
		"unitsSpace" -> 2,
		"isDestructible" -> true
	)

	"BuildingWithLevelDAO" must "creare un MongoObject adeguato" in {
		assert(mongoObject == BuildingWithLevelDAO.getMongoObject(Tower))
		assert(mongoObject != BuildingWithLevelDAO.getMongoObject(cave))
	}
	it must "creare un building relativo al mongoObject giusto" in {
		assert(Tower == BuildingWithLevelDAO.getObject(mongoObject))
		assert(Tower != BuildingWithLevelDAO.getObject(mongoObject2))
	}
	it must "lanciare una eccezione se il mongoObject non ha le informazioni relative" in {
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"cost" -> CostDAO.getMongoObject(cost),
				"isConstructible" -> true,
				"level" -> 2,
				"nameBuilding" -> "Miniera",
				"precondition" -> vectorkeys,
				"productedResource" -> ProductedResourceDAO.getMongoObject(productedResource1),
				"productedUnits" -> vectorUnit,
				"unitsSpace" -> 2
			)
			BuildingWithLevelDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"bonus" -> BonusDAO.getMongoObject(bonus),
				"isConstructible" -> true,
				"level" -> 2,
				"nameBuilding" -> "Miniera",
				"precondition" -> vectorkeys,
				"productedResource" -> ProductedResourceDAO.getMongoObject(productedResource1),
				"productedUnits" -> vectorUnit,
				"unitsSpace" -> 2
			)
			BuildingWithLevelDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"bonus" -> BonusDAO.getMongoObject(bonus),
				"cost" -> CostDAO.getMongoObject(cost),
				"level" -> 2,
				"nameBuilding" -> "Miniera",
				"precondition" -> vectorkeys,
				"productedResource" -> ProductedResourceDAO.getMongoObject(productedResource1),
				"productedUnits" -> vectorUnit,
				"unitsSpace" -> 2
			)
			BuildingWithLevelDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"bonus" -> BonusDAO.getMongoObject(bonus),
				"cost" -> CostDAO.getMongoObject(cost),
				"isConstructible" -> true,
				"nameBuilding" -> "Miniera",
				"precondition" -> vectorkeys,
				"productedResource" -> ProductedResourceDAO.getMongoObject(productedResource1),
				"productedUnits" -> vectorUnit,
				"unitsSpace" -> 2
			)
			BuildingWithLevelDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"bonus" -> BonusDAO.getMongoObject(bonus),
				"cost" -> CostDAO.getMongoObject(cost),
				"isConstructible" -> true,
				"level" -> 2,
				"precondition" -> vectorkeys,
				"productedResource" -> ProductedResourceDAO.getMongoObject(productedResource1),
				"productedUnits" -> vectorUnit,
				"unitsSpace" -> 2
			)
			BuildingWithLevelDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"bonus" -> BonusDAO.getMongoObject(bonus),
				"cost" -> CostDAO.getMongoObject(cost),
				"isConstructible" -> true,
				"level" -> 2,
				"nameBuilding" -> "Miniera",
				"productedResource" -> ProductedResourceDAO.getMongoObject(productedResource1),
				"productedUnits" -> vectorUnit,
				"unitsSpace" -> 2
			)
			BuildingWithLevelDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"bonus" -> BonusDAO.getMongoObject(bonus),
				"cost" -> CostDAO.getMongoObject(cost),
				"isConstructible" -> true,
				"level" -> 2,
				"nameBuilding" -> "Miniera",
				"precondition" -> vectorkeys,
				"productedResource" -> ProductedResourceDAO.getMongoObject(productedResource1),
				"unitsSpace" -> 2
			)
			BuildingWithLevelDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"bonus" -> BonusDAO.getMongoObject(bonus),
				"cost" -> CostDAO.getMongoObject(cost),
				"isConstructible" -> true,
				"level" -> 2,
				"nameBuilding" -> "Miniera",
				"precondition" -> vectorkeys,
				"productedResource" -> ProductedResourceDAO.getMongoObject(productedResource1),
				"productedUnits" -> vectorUnit
			)
			BuildingWithLevelDAO.getObject(mongoObject2)
		}
	}
	it must "lanciare una eccezione se il tipo dei dati non è corretto" in {
		intercept[IllegalFieldValueException] {
			val mongoObject3 = MongoDBObject(
				"bonus" -> "{}",
				"cost" -> CostDAO.getMongoObject(cost),
				"isConstructible" -> true,
				"level" -> 2,
				"nameBuilding" -> "Miniera",
				"precondition" -> vectorkeys,
				"productedResource" -> "[]",
				"productedUnits" -> vectorUnit,
				"unitsSpace" -> 2
			)
			BuildingWithLevelDAO.getObject(mongoObject3)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject3 = MongoDBObject(
				"bonus" -> BonusDAO.getMongoObject(bonus),
				"cost" -> "{}",
				"isConstructible" -> true,
				"level" -> 2,
				"nameBuilding" -> "Miniera",
				"precondition" -> vectorkeys,
				"productedResource" -> "[]",
				"productedUnits" -> vectorUnit,
				"unitsSpace" -> 2
			)
			BuildingWithLevelDAO.getObject(mongoObject3)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject3 = MongoDBObject(
				"bonus" -> BonusDAO.getMongoObject(bonus),
				"cost" -> CostDAO.getMongoObject(cost),
				"isConstructible" -> 15,
				"level" -> 2,
				"nameBuilding" -> "Miniera",
				"precondition" -> vectorkeys,
				"productedResource" -> "[]",
				"productedUnits" -> vectorUnit,
				"unitsSpace" -> 2
			)
			BuildingWithLevelDAO.getObject(mongoObject3)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject3 = MongoDBObject(
				"bonus" -> BonusDAO.getMongoObject(bonus),
				"cost" -> CostDAO.getMongoObject(cost),
				"isConstructible" -> true,
				"level" -> 2.5,
				"nameBuilding" -> "Miniera",
				"precondition" -> vectorkeys,
				"productedResource" -> "[]",
				"productedUnits" -> vectorUnit,
				"unitsSpace" -> 2
			)
			BuildingWithLevelDAO.getObject(mongoObject3)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject3 = MongoDBObject(
				"bonus" -> BonusDAO.getMongoObject(bonus),
				"cost" -> CostDAO.getMongoObject(cost),
				"isConstructible" -> true,
				"level" -> 2,
				"nameBuilding" -> 15,
				"precondition" -> vectorkeys,
				"productedResource" -> "[]",
				"productedUnits" -> vectorUnit,
				"unitsSpace" -> 2
			)
			BuildingWithLevelDAO.getObject(mongoObject3)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject3 = MongoDBObject(
				"bonus" -> BonusDAO.getMongoObject(bonus),
				"cost" -> CostDAO.getMongoObject(cost),
				"isConstructible" -> true,
				"level" -> 2,
				"nameBuilding" -> "Miniera",
				"precondition" -> vectorkeys,
				"productedResource" -> "[]",
				"productedUnits" -> vectorUnit,
				"unitsSpace" -> 2.5
			)
			BuildingWithLevelDAO.getObject(mongoObject3)
		}
	}

}