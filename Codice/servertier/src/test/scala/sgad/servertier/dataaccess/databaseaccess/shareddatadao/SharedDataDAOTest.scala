/**
 * FILE: SharedDataDAOTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/databaseaccess/shareddatadao
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Segantin Fabio
 */

import sgad.servertier.dataaccess.databaseaccess.shareddatadao._
import org.scalatest.FlatSpec
import sgad.servertier.dataaccess.data.shareddata._
import com.mongodb.casbah.Imports._

/**
 * Classe per il Test di SharedDataDAO
 */
class SharedDataDAOTest extends FlatSpec {

	DataFactory.setUnits(Map())
	DataFactory.setResources(Map())
	DataFactory.setBuildings(Map())
	var preconditions = Vector[String]()
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
	var tower = new BuildingWithLevel(true, bonus, cost, 2, "Torre", preconditions, productedResource1, productedUnit1, 2, false)
	productedUnit1 = Vector[`Unit`](productedUnit2)
	preconditions = Vector[String](tower.getKey)
	var cave = new BuildingWithLevel(true, bonus, cost, 2, "Miniera", preconditions, productedResource1, productedUnit1, 2, false)
	DataFactory.setBuildings(Map(tower.getKey -> tower, cave.getKey -> cave))

	val buildings = Map(tower.getKey -> tower, cave.getKey -> cave).values.toVector
		.map(
	        edificio => BuildingWithLevelDAO.getMongoObject(edificio)
		)
	val units = productedUnit1
		.map(//trasformo in mongoobject
	        unita => UnitDAO.getMongoObject(unita)
		)
	val resources = Map("oro" -> gold, "pozione" -> potion)
		.values
		.toVector
		.map(
	        risorsa => ResourceDAO.getMongoObject(risorsa)
		)
	val mongo = MongoDBObject(
		"buildings" -> buildings,
		"units" -> units,
		"resources" -> resources
	)

	"SharedDataDAO" must "ritornare un DBObject adeguato" in {
		assert(SharedDataDAO.getMongoObject == mongo)
		DataFactory.setUnits(Map())
		val mongo2 = MongoDBObject(
			"buildings" -> buildings,
			"units" -> Vector(),
			"resources" -> resources
		)
		assert(SharedDataDAO.getMongoObject == mongo2)
	}
}
