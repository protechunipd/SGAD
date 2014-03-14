/**
 * FILE: UnitInProgressDAOTest.scala
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
import sgad.servertier.dataaccess.data.shareddata.{QuantityResource, Cost, DataFactory, `Unit`, Resource}
import sgad.servertier.dataaccess.data.userdata.UnitInProgress
import sgad.servertier.dataaccess.databaseaccess.userdatadao.UnitInProgressDAO
import com.mongodb.casbah.Imports._

/**
 * Classe di test per la classe UnitInProgressDAO
 */
class UnitInProgressDAOTest extends FlatSpec {

	DataFactory.setUnits(Map())
	DataFactory.setResources(Map())
	DataFactory.setBuildings(Map())
	val gold = new Resource("oro")
	DataFactory.setResources(Map("oro" -> gold))
	val chap = new `Unit`("fante", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	val horse = new `Unit`("cavallo", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	DataFactory.setUnits(Map("fante" -> chap, "cavallo" -> horse))
	val unitInProgress1 = new UnitInProgress(quantity = 50, unit = chap, startedTime = 200L)
	val unitInProgress2 = new UnitInProgress(quantity = 100, unit = horse, startedTime = 200L)

	val mongoObject = MongoDBObject(
		"unit" -> chap.getKey,
		"quantity" -> 50,
		"startedTime" -> 200L
	)
	val mongoObject2 = MongoDBObject(
		"unit" -> horse.getKey,
		"quantity" -> 100,
		"startedTime" -> 200L
	)

	"UnitInProgressDAO" must "restituire un mongoObject appropriato" in {
		assert(mongoObject == UnitInProgressDAO.getMongoObject(unitInProgress1))
		assert(mongoObject2 != UnitInProgressDAO.getMongoObject(unitInProgress1))
	}

	it must "restituire una Position appropriata" in {
		assert(unitInProgress1 == UnitInProgressDAO.getObject(mongoObject))
		assert(unitInProgress1 != UnitInProgressDAO.getObject(mongoObject2))
	}

	it must "lanciare una eccezione se manacano dei dati" in {
		intercept[IllegalFieldValueException] {
			UnitInProgressDAO.getObject(MongoDBObject(
				"quantity" -> 1,
				"startedTime" -> 200L
			))
		}
		intercept[IllegalFieldValueException] {
			UnitInProgressDAO.getObject(MongoDBObject(
				"unit" -> "DAO",
				"startedTime" -> 200L
			))
		}
		intercept[IllegalFieldValueException] {
			UnitInProgressDAO.getObject(MongoDBObject(
				"quantity" -> 1,
				"unit" -> chap.getKey
			))
		}
		intercept[IllegalFieldValueException] {
			UnitInProgressDAO.getObject(MongoDBObject(
				"quantity" -> 1,
				"startedTime" -> 200,
				"unit" -> chap.getKey
			))
		}
	}
}