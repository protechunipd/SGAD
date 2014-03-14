/**
 * FILE: BuiuldingPossessionDAOTest.scala
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
import sgad.servertier.dataaccess.data.shareddata._
import sgad.servertier.dataaccess.data.userdata.{BuildingPossession, UnitInProgress, Position}
import sgad.servertier.dataaccess.databaseaccess.userdatadao.{PositionDAO, UnitInProgressDAO, BuildingPossessionDAO}
import com.mongodb.casbah.Imports._

/**
 * Classe di test per la classe BuildingPossessionDAO
 */
class BuildingPossessionDAOTest extends FlatSpec {
	DataFactory.setUnits(Map())
	DataFactory.setResources(Map())
	DataFactory.setBuildings(Map())
	var timeNow = 1392902385004L
	val quantityResource = Array[QuantityResource]()
	var preconditions = Vector[String]()
	var bonus = new Bonus("bonus1", 2, 3)
	var gold = new Resource("oro")
	var potion = new Resource("pozione")
	var quantityResource1 = Vector(new QuantityResource(gold, 100), new QuantityResource(potion, 300))
	var cost = new Cost(1000, quantityResource1)
	var productedResource1 = new ProductedResource(new Resource("risorsaDiProva"), 1223, 1, 2)
	var productedUnit1 = Vector[`Unit`]()
	var productedUnit2 = new `Unit`("soldato2", 1, 3, cost, true)
	var productedUnit3 = new `Unit`("soldato", 1, 3, cost, true)
	var tower = new BuildingWithLevel(true, bonus, cost, 2, "Torre", preconditions, productedResource1, productedUnit1, 2, false)
	productedUnit1 = Vector[`Unit`](productedUnit2)
	preconditions = Vector[String](tower.getKey)
	var cave = new BuildingWithLevel(true, bonus, cost, 2, "Miniera", preconditions, productedResource1, productedUnit1, 2, false)
	var position1 = new Position(3, 8)
	var position2 = new Position(1, 12)
	var unitInProgress = new UnitInProgress(productedUnit2, 1392902384789L, 1)
	var unitInProgress2 = new UnitInProgress(productedUnit3, 1392902384789L, 1)
	var buildingPossession = new BuildingPossession(tower, position1, true, 1392902385004L, unitInProgress)
	var buildingPossession2 = new BuildingPossession(cave, position1, true, 1392902385004L, unitInProgress)
	var buildingPossession3 = new BuildingPossession(cave, position1, true, 1392902385004L, unitInProgress2)

	DataFactory.setBuildings(Map(tower.getKey -> tower, cave.getKey -> cave))
	DataFactory.setUnits(Map("soldato2" -> productedUnit2, "soldato" -> productedUnit3))

	val mongoObject = MongoDBObject(
		"building" -> buildingPossession.getBuilding.getKey,
		"isFinished" -> buildingPossession.getIsFinished,
		"position" -> PositionDAO.getMongoObject(
			buildingPossession.getPosition),
		"time" -> buildingPossession.getTime,
		"unitInProgress" -> UnitInProgressDAO.getMongoObject(
			buildingPossession.getUnitInProgress)
	)
	val mongoObject2 = MongoDBObject(
		"building" -> buildingPossession2.getBuilding.getKey,
		"isFinished" -> buildingPossession2.getIsFinished,
		"position" -> PositionDAO.getMongoObject(
			buildingPossession2.getPosition),
		"time" -> buildingPossession2.getTime,
		"unitInProgress" -> UnitInProgressDAO.getMongoObject(
			buildingPossession2.getUnitInProgress)
	)
	val mongoObject3 = MongoDBObject(
		"building" -> buildingPossession3.getBuilding.getKey,
		"isFinished" -> buildingPossession3.getIsFinished,
		"position" -> PositionDAO.getMongoObject(
			buildingPossession3.getPosition),
		"time" -> buildingPossession3.getTime,
		"unitInProgress" -> UnitInProgressDAO.getMongoObject(
			buildingPossession3.getUnitInProgress)
	)

	"BuildingPossessionDAO" must "restituire un mongoObject appropriato" in {
		assert(mongoObject != BuildingPossessionDAO.getMongoObject(buildingPossession2))
		assert(mongoObject3 != BuildingPossessionDAO.getMongoObject(buildingPossession2))
		assert(mongoObject2 == BuildingPossessionDAO.getMongoObject(buildingPossession2))
	}

	it must "restituire una BuildingPossession appropriata" in {
		assert(buildingPossession2 == BuildingPossessionDAO.getObject(mongoObject2))
		assert(buildingPossession2 != BuildingPossessionDAO.getObject(mongoObject))
	}

	it must "lanciare una eccezione se manacano dei dati" in {
		intercept[IllegalFieldValueException] {
			BuildingPossessionDAO.getObject(MongoDBObject(
				"isFinished" -> buildingPossession.getIsFinished,
				"position" -> PositionDAO.getMongoObject(
					buildingPossession.getPosition),
				"time" -> buildingPossession.getTime,
				"unitInProgress" -> UnitInProgressDAO.getMongoObject(
					buildingPossession.getUnitInProgress)
			))
		}
		intercept[IllegalFieldValueException] {
			BuildingPossessionDAO.getObject(MongoDBObject(
				"building" -> buildingPossession.getBuilding.getKey,
				"position" -> PositionDAO.getMongoObject(
					buildingPossession.getPosition),
				"time" -> buildingPossession.getTime,
				"unitInProgress" -> UnitInProgressDAO.getMongoObject(
					buildingPossession.getUnitInProgress)
			))
		}
		intercept[IllegalFieldValueException] {
			BuildingPossessionDAO.getObject(MongoDBObject(
				"building" -> buildingPossession.getBuilding.getKey,
				"isFinished" -> buildingPossession.getIsFinished,
				"time" -> buildingPossession.getTime,
				"unitInProgress" -> UnitInProgressDAO.getMongoObject(
					buildingPossession.getUnitInProgress)
			))
		}
		intercept[IllegalFieldValueException] {
			BuildingPossessionDAO.getObject(MongoDBObject(
				"building" -> buildingPossession.getBuilding.getKey,
				"isFinished" -> buildingPossession.getIsFinished,
				"position" -> PositionDAO.getMongoObject(
					buildingPossession.getPosition),
				"unitInProgress" -> UnitInProgressDAO.getMongoObject(
					buildingPossession.getUnitInProgress)
			))
		}
		intercept[IllegalFieldValueException] {
			BuildingPossessionDAO.getObject(MongoDBObject(
				"building" -> buildingPossession.getBuilding.getKey,
				"isFinished" -> buildingPossession.getIsFinished,
				"position" -> PositionDAO.getMongoObject(
					buildingPossession.getPosition),
				"time" -> buildingPossession.getTime
			))
		}
		intercept[IllegalFieldValueException] {
			BuildingPossessionDAO.getObject(MongoDBObject(
				"building" -> buildingPossession3.getBuilding.getKey,
				"isFinished" -> buildingPossession3.getIsFinished,
				"position" -> PositionDAO.getMongoObject(
					buildingPossession3.getPosition),
				"time" -> buildingPossession3.getTime,
				"unitInProgress" -> "unitInProgress"
			))
		}
	}
}
