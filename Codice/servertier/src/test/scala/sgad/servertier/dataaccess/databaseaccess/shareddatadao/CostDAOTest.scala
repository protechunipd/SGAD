/**
 * FILE: CostDAOTest.scala
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

import sgad.servertier.dataaccess.data.shareddata.{Cost, QuantityResource, Resource, DataFactory}
import com.mongodb.casbah.commons.Imports.MongoDBObject
import org.scalatest._
import org.joda.time.IllegalFieldValueException
import sgad.servertier.dataaccess.databaseaccess.shareddatadao.{CostDAO, QuantityResourceDAO}


/**
 * Classe di test per l'object CostDAO
 */
class CostDAOTest extends FlatSpec {

	DataFactory.setUnits(Map())
	DataFactory.setResources(Map())
	DataFactory.setBuildings(Map())
	var gold = new Resource("oro")
	var potion = new Resource("pozione")
	DataFactory.setResources(Map(gold.getKey -> gold, potion.getKey -> potion))
	var costQuantity1 = Vector(new QuantityResource(gold, 100), new QuantityResource(potion, 300))
	var costQuantity2 = Vector(new QuantityResource(gold, 20), new QuantityResource(potion, 70))
	var cost1 = new Cost(10, costQuantity1)
	var vectorMongoOBJ = costQuantity1.map((qr: QuantityResource) => {
		QuantityResourceDAO.getMongoObject(qr)
	})
	var vectorMongoOBJ2 = costQuantity2.map((qr: QuantityResource) => {
		QuantityResourceDAO.getMongoObject(qr)
	})
	val mongoObject = MongoDBObject("relativeTime" -> 10, "quantityResource" -> vectorMongoOBJ)
	val mongoObject2 = MongoDBObject("relativeTime" -> 30, "quantityResource" -> vectorMongoOBJ2)

	"CostDAO" must "creare un MongoObject adeguato" in {
		assert(mongoObject == CostDAO.getMongoObject(cost1))
		assert(mongoObject2 != CostDAO.getMongoObject(cost1))
	}
	it must "creare un costo relativo al mongoObject giusto" in {
		assert(cost1 == CostDAO.getObject(mongoObject))
		assert(cost1 != CostDAO.getObject(mongoObject2))
	}
	it must "lanciare una eccezione se il mongoObject non ha le informazioni relative" in {
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject("relativeTime" -> 10)
			CostDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject("quantityResource" -> vectorMongoOBJ)
			CostDAO.getObject(mongoObject2)
		}
	}
	it must "lanciare una eccezione se il tipo dei dati non è corretto" in {
		val mongoObject3 = MongoDBObject("relativeTime" -> 10, "quantityResource" -> "[{}]")
		intercept[IllegalFieldValueException] {
			CostDAO.getObject(mongoObject3)
		}
	}

}