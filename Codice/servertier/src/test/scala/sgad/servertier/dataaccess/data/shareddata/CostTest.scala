/**
 * FILE: CostTest.scala
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
import sgad.servertier.dataaccess.data.shareddata.{Cost, QuantityResource, Resource}

/**
 * Classe per il Test della classe Cost
 */
class CostTest extends FlatSpec {
	var gold = new Resource("oro")
	var potion = new Resource("pozione")
	var quantityResource1 = Vector(new QuantityResource(gold, 100), new QuantityResource(potion, 300))
	var quantityResource2 = Vector(new QuantityResource(gold, 20), new QuantityResource(potion, 70))

	"Un costo " must " mantenere il tempo necessario come viene espresso nel costruttore" in {
		val cost1 = new Cost(10, quantityResource1)
		val cost2 = new Cost(40, quantityResource2)
		assert(cost1.getRelativeTime == 10)
		assert(cost1.getRelativeTime != cost2.getRelativeTime)
	}

	"Un costo " must " mantenere le risorse richieste come vengono espresse nel costruttore" in {
		val cost1 = new Cost(10, quantityResource2)
		val cost2 = new Cost(40, quantityResource1)
		assert(cost2.getQuantityResource.equals(quantityResource1))
		assert(!cost1.getQuantityResource.equals(quantityResource1))
	}

	it must " essere uguale solo ad uno stesso costo " in {
		val cost1 = new Cost(10, quantityResource2)
		val cost2 = new Cost(40, quantityResource1)
		val cost3 = new Cost(10, quantityResource2)
		val cost4 = new Cost(10, Vector(new QuantityResource(potion, 70), new QuantityResource(gold, 20)))
		val resource1 = new Resource("prova")
		assert(cost1 equals cost3)
		assert(cost1 equals cost1)
		assert(cost1 == cost3)
		assert(!cost1.equals(cost2))
		assert(!cost1.equals(resource1))
		assert(cost4 equals cost3)
	}

	it must "throw illegalArgument exception con costruttore illegale" in {
		intercept[IllegalArgumentException] {
			new Cost(10, null)
		}
	}
}