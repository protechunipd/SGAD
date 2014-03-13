/**
 * FILE: DataFactoryTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/data/shareddata
 * DATA CREAZIONE: 24 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-24 - Creazione della classe - Biancucci Maurizio
 */

import org.scalatest._
import sgad.servertier.dataaccess.data.shareddata._

/**
 * Classe per il Test della classe DataFactory
 */
class DataFactoryTest extends FlatSpec {

	DataFactory.setUnits(Map())
	DataFactory.setResources(Map())
	DataFactory.setBuildings(Map())

	val gold = new Resource("oro")
	val potion = new Resource("pozione")
	val potion2 = new Resource("pozione")
	val dataFactory = DataFactory

	//Testo con la classe vuota appena costruita

	"Data Factory" must "Ritornare NoSuchElementException se chiedo una BuildingWithLevel non presente" in {
		intercept[NoSuchElementException] {
			dataFactory.getBuilding("CasermaL500")
		}
	}

	it must "Ritornare NoSuchElementException se chiedo una Resource non presente" in {
		intercept[NoSuchElementException] {
			dataFactory.getResource("Oro diverso")
		}
	}

	it must "Ritornare NoSuchElementException se chiedo una Unit non presente" in {
		intercept[NoSuchElementException] {
			dataFactory.getUnit("cavaliere 3")
		}
	}

	//Testo il setter e il getter per le Risorse

	"Se setto una mappa null per le risorse " must "ritornare IllegalArgumentException" in {
		intercept[IllegalArgumentException] {
			dataFactory.setResources(null)
		}
	}

	"Se setto una mappa con le risorse Oro e Pozioni, la risorsa Oro " must "essere ritornata" in {
		val gold = new Resource("Oro")
		val potion = new Resource("Pozioni")
		dataFactory.setResources(Map("Oro" -> gold, "Pozioni" -> potion))
		assert(dataFactory.getResource("Oro") == gold)
	}

	"Se setto una mappa con le risorse Oro e Pozioni, la risorsa Pozioni " must "essere ritornata" in {
		dataFactory.setResources(Map("Oro" -> gold, "Pozioni" -> potion))
		assert(dataFactory.getResource("Pozioni") == potion)
	}

	"Se setto una mappa con le risorse Oro e Pozioni, la risorsa Carciofi " must "non essere ritornata e lanciata l'eccezione NoSuchElementException" in {
		val gold = new Resource("Oro")
		val potion = new Resource("Pozioni")
		dataFactory.setResources(Map("Oro" -> gold, "Pozioni" -> potion))
		intercept[NoSuchElementException] {
			dataFactory.getResource("Carciofi")
		}
	}

	//Testo il setter e il getter per le Unità
	var gold1 = new Resource("oro")
	var potion1 = new Resource("pozione")
	var costQuantity1 = Vector(new QuantityResource(gold1, 100), new QuantityResource(potion1, 300))
	var costQuantity2 = Vector(new QuantityResource(gold1, 20), new QuantityResource(potion1, 70))

	"Se setto una mappa null per le unità " must "ritornare IllegalArgumentException" in {
		intercept[IllegalArgumentException] {
			dataFactory.setUnits(null)
		}
	}

	"Se setto una mappa con le Unità Cavaliere e Fante, l'unità Cavaliere " must "essere ritornata" in {
		val knight = new `Unit`("Cavaliere", 10, 5, new Cost(10, costQuantity1), true)
		val chap = new `Unit`("Fante", 10, 5, new Cost(10, costQuantity1), true)
		dataFactory.setUnits(Map("Cavaliere" -> knight, "Fante" -> chap))
		assert(dataFactory.getUnit("Cavaliere") == knight)
	}

	"Se setto una mappa con le Unità Cavaliere e Fante, l'unità Fante " must "essere ritornata" in {
		val knight = new `Unit`("Cavaliere", 10, 5, new Cost(10, costQuantity1), true)
		val chap = new `Unit`("Fante", 10, 5, new Cost(10, costQuantity1), true)
		dataFactory.setUnits(Map("Cavaliere" -> knight, "Fante" -> chap))
		assert(dataFactory.getUnit("Fante") == chap)
	}

	"Se setto una mappa con le Unità Cavaliere e Fante, l'unità PopolanoArmato " must "non essere ritornata e lanciata l'eccezione NoSuchElementException" in {
		val knight = new `Unit`("Cavaliere", 10, 5, new Cost(10, costQuantity1), true)
		val chap = new `Unit`("Fante", 10, 5, new Cost(10, costQuantity1), true)
		dataFactory.setUnits(Map("Cavaliere" -> knight, "Fante" -> chap))
		intercept[NoSuchElementException] {
			dataFactory.getUnit("PopolanoArmato")
		}
	}

	//Testo il setter e il getter per gli edifici
	var preconditions = Vector[BuildingWithLevel]()
	var bonus = new Bonus("bonus1", 2, 3)
	var gold3 = new Resource("oro")
	var potion3 = new Resource("pozione")
	var quantityResourceVector = Vector(new QuantityResource(gold, 100), new QuantityResource(potion, 300))
	var cost = new Cost(1000, quantityResourceVector)
	var productedResource1 = new ProductedResource(new Resource("risorsaDiProva"), 1223, 1, 2)
	var productedUnit1 = Vector[`Unit`]()
	var productedUnit2 = new `Unit`("soldato2", 1, 3, cost, true)

	var buildingWithLevel1 = new BuildingWithLevel(true, bonus, cost, 2, "Torre", preconditions, productedResource1, productedUnit1, 2, false)
	var buildingWithLevel2 = new BuildingWithLevel(true, bonus, cost, 2, "Casa", preconditions, productedResource1, productedUnit1, 1, false)

	"Se setto una mappa null per gli edifici " must "ritornare IllegalArgumentException" in {
		intercept[IllegalArgumentException] {
			dataFactory.setBuildings(null)
		}
	}

	"Se setto una mappa con gli edifici, l'edificio Torre " must " deve essere ritornato" in {
		dataFactory.setBuildings(Map("Torre" -> buildingWithLevel1, "Casa" -> buildingWithLevel2))
		assert(dataFactory.getBuilding("Torre").equals(buildingWithLevel1))
	}

	"Se setto una mappa con gli edifici, l'edificio Casa " must " deve essere ritornato" in {
		dataFactory.setBuildings(Map("Torre" -> buildingWithLevel1, "Casa" -> buildingWithLevel2))
		assert(dataFactory.getBuilding("Casa").equals(buildingWithLevel2))
	}

	"Se accedo ad un elemento non contenuto nella mappa degli edifici " must "ritornare NoSuchElementException" in {
		intercept[NoSuchElementException] {
			dataFactory.getBuilding("Casa2")
		}
	}
}