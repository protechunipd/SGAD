/**
 * FILE: UnitPossessionDAOTest.scala
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
import sgad.servertier.dataaccess.data.userdata.UnitPossession
import sgad.servertier.dataaccess.databaseaccess.userdatadao.UnitPossessionDAO
import com.mongodb.casbah.Imports._

/**
 * Classe di test per la classe UnitPossessionDAO
 */
class UnitPossessionDAOTest extends FlatSpec {

	DataFactory.setUnits(Map())
	DataFactory.setResources(Map())
	DataFactory.setBuildings(Map())
	val gold = new Resource("oro")
	DataFactory.setResources(Map("oro" -> gold))
	val chap = new `Unit`("fante", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	val horse = new `Unit`("cavallo", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	DataFactory.setUnits(Map("fante" -> chap, "cavallo" -> horse))
	val unitPossession1 = new UnitPossession(50, chap)
	val unitPossession2 = new UnitPossession(100, horse)

	val mongoObject = MongoDBObject(
		"unit" -> chap.getKey,
		"quantity" -> 50
	)
	val mongoObject2 = MongoDBObject(
		"unit" -> horse.getKey,
		"quantity" -> 100
	)

	"UnitPossessionDAO" must "restituire un mongoObject appropriato" in {
		assert(mongoObject == UnitPossessionDAO.getMongoObject(unitPossession1))
		assert(mongoObject2 != UnitPossessionDAO.getMongoObject(unitPossession1))
	}

	it must "restituire una Position appropriata" in {
		assert(unitPossession1 == UnitPossessionDAO.getObject(mongoObject))
		assert(unitPossession1 != UnitPossessionDAO.getObject(mongoObject2))
	}

	it must "lanciare una eccezione se manacano dei dati" in {
		intercept[IllegalFieldValueException] {
			UnitPossessionDAO.getObject(MongoDBObject(
				"quantity" -> 1
			))
		}
		intercept[IllegalFieldValueException] {
			UnitPossessionDAO.getObject(MongoDBObject(
				"unit" -> "pippo",
				"quantity" -> gold
			))
		}
	}
}