/**
 * FILE: QuantityResourceDAOTest.scala
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

import sgad.servertier.dataaccess.data.shareddata.{Resource, QuantityResource, DataFactory}
import com.mongodb.casbah.commons.Imports.MongoDBObject
import org.scalatest._
import org.joda.time.IllegalFieldValueException
import sgad.servertier.dataaccess.databaseaccess.shareddatadao.QuantityResourceDAO


/**
 * Classe di test per l'object QuantityResourceDAO
 */
class QuantityResourceDAOTest extends FlatSpec {

	DataFactory.setUnits(Map())
	DataFactory.setResources(Map())
	DataFactory.setBuildings(Map())
	var gold = new Resource("oro")
	var potion = new Resource("pozione")
	DataFactory.setResources(Map(gold.getKey -> gold, potion.getKey -> potion))
	var quantityResource1 = new QuantityResource(potion, 200)
	var quantityResource2 = new QuantityResource(gold, 100)
	val mongoObject = MongoDBObject("resource" -> gold.getKey, "quantity" -> 100)
	"QuantityResourceDAO" must "ritornare lo stesso oggetto QuantityResource solo se riceve il relativo mongoObject" in {
		val mongoObject2 = MongoDBObject("resource" -> potion.getKey, "quantity" -> 100)
		assert(quantityResource2 == QuantityResourceDAO.getObject(mongoObject))
		assert(quantityResource2 != QuantityResourceDAO.getObject(mongoObject2))
	}

	it must "ritornare lo stesso mongoobject solo se riceve il relativo QuantityResource" in {
		assert(mongoObject != QuantityResourceDAO.getMongoObject(quantityResource1))
		assert(mongoObject == QuantityResourceDAO.getMongoObject(quantityResource2))
	}
	it must "lanciare una eccezione se il mongoObject non ha le informazioni relative" in {
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject("quantity" -> 10)
			QuantityResourceDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject("resource" -> gold.getKey)
			QuantityResourceDAO.getObject(mongoObject2)
		}

		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject("resource" -> gold.getKey,
				"quantity" -> "giovanni")
			QuantityResourceDAO.getObject(mongoObject2)
		}

		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject("resource" -> gold.getKey,
				"quantity" -> "12a")
			QuantityResourceDAO.getObject(mongoObject2)
		}
	}
}