/**
 * FILE: QuantityResourceTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/data/shareddata
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-18 - Creazione della classe - Segantin Fabio
 */


import org.scalatest._
import sgad.servertier.dataaccess.data.shareddata.{Resource, QuantityResource}

/**
 * Classe per il test di QuantityResource
 *
 */
class QuantityResourceTest extends FlatSpec {

	var gold = new Resource("oro")
	var potion = new Resource("pozione")
	"Una quantità " must " avere la risorsa uguale a quella passata durante il costruttore" in {
		val quantity1 = new QuantityResource(potion, 200)
		val quantity2 = new QuantityResource(gold, 100)
		assert(quantity2.getResource.equals(gold))
		assert(quantity2.getResource != quantity1.getResource)
	}

	it must " avere la quantità uguale a quella passata durante il costruttore" in {
		val quantity1 = new QuantityResource(potion, 200)
		val quantity2 = new QuantityResource(gold, 100)
		assert(quantity1.getQuantity === 200)
		assert(quantity1.getQuantity != quantity2.getQuantity)
	}
	it must "essere uguale solo alle quantità equivalenti" in {
		val quantity1 = new QuantityResource(potion, 200)
		val quantity2 = new QuantityResource(gold, 100)
		val quantity3 = new QuantityResource(gold, 100)
		val resource1 = new Resource("prova")
		assert(quantity1 equals quantity1)
		assert(quantity2 equals quantity3)
		assert(!quantity2.equals(quantity1))
		assert(!quantity2.equals(resource1))
	}

	it must "lanciare una eccezione quando viene costruito illegalmente" in {
		intercept[IllegalArgumentException] {
			new QuantityResource(null, 200)
		}
	}
}