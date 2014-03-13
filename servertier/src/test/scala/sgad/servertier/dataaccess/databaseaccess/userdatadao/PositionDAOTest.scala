/**
 * FILE: PositionDAOTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/databaseaccess/userdatadao
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Segantin Fabio
 */

import org.joda.time.IllegalFieldValueException
import sgad.servertier.dataaccess.data.shareddata.DataFactory
import sgad.servertier.dataaccess.data.userdata.Position
import com.mongodb.casbah.commons.Imports._
import org.scalatest.FlatSpec
import sgad.servertier.dataaccess.databaseaccess.userdatadao.PositionDAO

/**
 * Classe di test per PositionDAO
 */
class PositionDAOTest extends FlatSpec {

	DataFactory.setUnits(Map())
	DataFactory.setResources(Map())
	DataFactory.setBuildings(Map())
	var position = new Position(1, 2)
	var mongoObject = MongoDBObject(
		"x" -> 1,
		"y" -> 2
	)
	var mongoObject2 = MongoDBObject(
		"x" -> 2,
		"y" -> 1
	)

	"PositionDAO" must "restituire un mongoObject appropriato" in {
		assert(mongoObject == PositionDAO.getMongoObject(position))
		assert(mongoObject2 != PositionDAO.getMongoObject(position))
	}

	it must "restituire una Position appropriata" in {
		assert(position == PositionDAO.getObject(mongoObject))
		assert(position != PositionDAO.getObject(mongoObject2))
	}

	it must "lanciare una eccezione se manacano dei dati" in {
		intercept[IllegalFieldValueException] {
			PositionDAO.getObject(MongoDBObject(
				"x" -> 1
			))
		}
		intercept[IllegalFieldValueException] {
			PositionDAO.getObject(MongoDBObject(
				"y" -> 1
			))
		}
		intercept[IllegalFieldValueException] {
			PositionDAO.getObject(MongoDBObject(
				"y" -> 1,
				"x" -> "x"
			))
		}
	}
}
