/**
 * FILE: ResourceDAOTest.scala
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

import sgad.servertier.dataaccess.data.shareddata.{DataFactory, Resource}
import com.mongodb.casbah.commons.Imports.MongoDBObject
import org.scalatest._
import org.joda.time.IllegalFieldValueException
import sgad.servertier.dataaccess.databaseaccess.shareddatadao.ResourceDAO

/**
 * Classe di test per l'object ResourceDAO
 */
class ResourceDAOTest extends FlatSpec {

	DataFactory.setUnits(Map())
	DataFactory.setResources(Map())
	DataFactory.setBuildings(Map())
	val resource = new Resource("oro")
	val mongoObject = MongoDBObject("resourceName" -> "oro")


	"ResourceDAO" must "ritornare lo stesso oggetto Resource solo se riceve il relativo mongoObject" in {
		val mongoObject2 = MongoDBObject("resourceName" -> "pozioni")
		assert(resource == ResourceDAO.getObject(mongoObject))
		assert(resource != ResourceDAO.getObject(mongoObject2))
	}

	it must "ritornare lo stesso mongoobject solo se riceve il relativo bonus" in {
		val potions = new Resource("pozioni")
		assert(mongoObject == ResourceDAO.getMongoObject(resource))
		assert(mongoObject != ResourceDAO.getMongoObject(potions))
	}
	it must "lanciare una eccezione se il mongoObject non ha le informazioni relative" in {
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject()
			ResourceDAO.getObject(mongoObject2)
		}
	}
}