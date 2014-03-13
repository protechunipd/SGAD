/**
 * FILE: OwnedResourceDAOTest.scala
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
import sgad.servertier.dataaccess.data.shareddata.{DataFactory, Resource}
import sgad.servertier.dataaccess.data.userdata.OwnedResource
import sgad.servertier.dataaccess.databaseaccess.userdatadao.OwnedResourceDAO
import com.mongodb.casbah.Imports._

/**
 * Classe di test per la classe OwnedResource
 */
class OwnedResourceDAOTest extends FlatSpec {

	DataFactory.setUnits(Map())
	DataFactory.setResources(Map())
	DataFactory.setBuildings(Map())
	val gold = new Resource("oro")
	val baloons = new Resource("fumetti")
	DataFactory.setResources(Map("oro" -> gold, "fumetti" -> baloons))
	val ownedResource1 = new OwnedResource(gold, 20)
	val ownedResource2 = new OwnedResource(baloons, 50)
	val mongoObject = MongoDBObject(
		"resource" -> gold.getKey,
		"quantity" -> 20
	)
	val mongoObject2 = MongoDBObject(
		"resource" -> baloons.getKey,
		"quantity" -> 50
	)

	"OwnedResourceDAO" must "restituire un mongoObject appropriato" in {
		assert(mongoObject == OwnedResourceDAO.getMongoObject(ownedResource1))
		assert(mongoObject2 != OwnedResourceDAO.getMongoObject(ownedResource1))
	}

	it must "restituire una Position appropriata" in {
		assert(ownedResource1 == OwnedResourceDAO.getObject(mongoObject))
		assert(ownedResource1 != OwnedResourceDAO.getObject(mongoObject2))
	}

	it must "lanciare una eccezione se manacano dei dati" in {
		intercept[IllegalFieldValueException] {
			OwnedResourceDAO.getObject(MongoDBObject(
				"quantity" -> 1
			))
		}
		intercept[IllegalFieldValueException] {
			OwnedResourceDAO.getObject(MongoDBObject(
				"resource" -> 55,
				"quantity" -> 10
			))
		}
	}
}