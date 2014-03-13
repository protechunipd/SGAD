/**
 * FILE: ResourceTest.scala
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
import sgad.servertier.dataaccess.data.shareddata.{QuantityResource, Resource}

/**
 * Classe per il Test della Classe Resource
 */
class ResourceTest extends FlatSpec {

	val gold = new Resource("oro")
	val potion = new Resource("pozione")
	val potion2 = new Resource("pozione")

	"Una pozione " must " avere il nome uguale a pozione" in {
		assert(potion.getResourceName === "pozione")
	}

	"L'oro " must " avere il nome uguale a oro" in {
		assert(gold.getResourceName === "oro")
	}

	"Una pozione " must " essere uguale ad un'altra pozione" in {
		assert(potion.equals(potion2))
	}

	it must " essere uguale a se stessa" in {
		assert(potion.equals(potion))
	}

	it must " non essere uguale all'oro " in {
		assert(!potion.equals(gold))
	}

	it must " non essere uguale ad un oggetto diverso " in {
		assert(!potion.equals(new QuantityResource(potion, 20)))
	}

	it must "lanciare una eccezione quando viene costruito illegalmente" in {
		intercept[IllegalArgumentException] {
			new Resource(null)
		}
	}

	it must "ritornare la chiave corretta" in {
		assert(gold.getKey == "oro")
	}
}