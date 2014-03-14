/**
 * FILE: ProductedResourceDAOTest.scala
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

import sgad.servertier.dataaccess.data.shareddata.{ProductedResource, Resource, DataFactory}
import com.mongodb.casbah.commons.Imports.MongoDBObject
import org.scalatest._
import org.joda.time.IllegalFieldValueException
import sgad.servertier.dataaccess.databaseaccess.shareddatadao.ProductedResourceDAO

/**
 * Classe di test per l'object ProductedResourceDAO
 */
class ProductedResourceDAOTest extends FlatSpec {

	DataFactory.setUnits(Map())
	DataFactory.setResources(Map())
	DataFactory.setBuildings(Map())
	var gold = new Resource("oro")
	var potion = new Resource("pozione")
	DataFactory.setResources(Map(gold.getKey -> gold, potion.getKey -> potion))
	var productedResource1 = new ProductedResource(gold, 10, 20, 40)
	var productedResource2 = new ProductedResource(potion, 10, 20, 40)
	val mongoObject = MongoDBObject(
		"maxQuantity" -> 40,
		"quantity" -> 20,
		"relativeTime" -> 10,
		"resource" -> gold.getKey)
	val mongoObject2 = MongoDBObject(
		"maxQuantity" -> 40,
		"quantity" -> 20,
		"relativeTime" -> 10,
		"resource" -> potion.getKey)

	"ProductedResourceDAO" must "creare un MongoObject adeguato" in {
		assert(mongoObject == ProductedResourceDAO.getMongoObject(productedResource1))
		assert(mongoObject2 != ProductedResourceDAO.getMongoObject(productedResource1))
	}
	it must "creare un costo relativo al mongoObject giusto" in {
		assert(productedResource1 == ProductedResourceDAO.getObject(mongoObject))
		assert(productedResource1 != ProductedResourceDAO.getObject(mongoObject2))
	}
	it must "lanciare una eccezione se il mongoObject non ha le informazioni relative" in {
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"quantity" -> 20,
				"relativeTime" -> 10,
				"resource" -> gold.getKey)
			ProductedResourceDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"maxQuantity" -> 40,
				"relativeTime" -> 10,
				"resource" -> gold.getKey)
			ProductedResourceDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"maxQuantity" -> 40,
				"quantity" -> 20,
				"resource" -> gold.getKey)
			ProductedResourceDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject(
				"maxQuantity" -> 40,
				"quantity" -> 20,
				"relativeTime" -> 10)
			ProductedResourceDAO.getObject(mongoObject2)
		}
	}
	it must "lanciare una eccezione se il tipo dei dati non è corretto" in {
		intercept[IllegalFieldValueException] {
			val mongoObject3 = MongoDBObject(
				"maxQuantity" -> 40.0,
				"quantity" -> 20,
				"relativeTime" -> 10,
				"resource" -> potion.getKey)
			ProductedResourceDAO.getObject(mongoObject3)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject3 = MongoDBObject(
				"maxQuantity" -> 40,
				"quantity" -> 20.0,
				"relativeTime" -> 10,
				"resource" -> potion.getKey)
			ProductedResourceDAO.getObject(mongoObject3)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject3 = MongoDBObject(
				"maxQuantity" -> 40,
				"quantity" -> 20,
				"relativeTime" -> 10.0,
				"resource" -> potion.getKey)
			ProductedResourceDAO.getObject(mongoObject3)
		}
	}
}