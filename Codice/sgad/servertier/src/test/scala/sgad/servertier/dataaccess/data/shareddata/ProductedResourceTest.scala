/**
 * FILE: ProductedResourceTest.scala
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
import sgad.servertier.dataaccess.data.shareddata.{ProductedResource, Resource}

/**
 * Classe necessaria per testare ProductedResource
 *
 */
class ProductedResourceTest extends FlatSpec {

	var gold = new Resource("oro")
	var potion = new Resource("pozione")
	"Una Produzione " must " avere la risorsa uguale a quella passata durante il costruttore" in {
		val producted1 = new ProductedResource(potion, 10, 20, 30)
		val producted2 = new ProductedResource(gold, 100, 90, 80)
		assert(producted2.getResource.equals(gold))
		assert(producted1.getResource != producted2.getResource)
	}

	it must " avere la quantità uguale a quella passata durante il costruttore" in {
		val producted1 = new ProductedResource(potion, 10, 20, 30)
		val producted2 = new ProductedResource(gold, 100, 90, 80)
		assert(producted1.getQuantity === 20)
		assert(producted1.getQuantity != producted2.getQuantity)
	}

	it must " avere la quantità massima uguale a quella passata durante il costruttore" in {
		val producted1 = new ProductedResource(potion, 10, 20, 30)
		val producted2 = new ProductedResource(gold, 100, 90, 80)
		assert(producted1.getMaxQuantity === 30)
		assert(producted1.getMaxQuantity != producted2.getMaxQuantity)
	}

	it must " avere il tempo di produzione uguale a quella passata durante il costruttore" in {
		val producted1 = new ProductedResource(potion, 10, 20, 30)
		val producted2 = new ProductedResource(gold, 100, 90, 80)
		assert(producted2.getRelativeTime === 100)
		assert(producted2.getRelativeTime != producted1.getRelativeTime)
	}

	it must " essere uguale solo a ProductedResource equivalenti " in {
		val producted1 = new ProductedResource(potion, 10, 20, 30)
		val producted2 = new ProductedResource(gold, 100, 90, 80)
		val producted3 = new ProductedResource(gold, 100, 90, 80)
		val resource1 = new Resource("prova")
		assert(producted2 equals producted2)
		assert(producted3 equals producted2)
		assert(!producted1.equals(producted2))
		assert(!producted1.equals(resource1))
	}

	it must "lanciare una eccezione quando viene costruito illegalmente" in {
		intercept[IllegalArgumentException] {
			new ProductedResource(null, 10, 20, 30)
		}
	}
}