/**
 * FILE: UnitTest.scala
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
import sgad.servertier.dataaccess.data.shareddata.{Cost, QuantityResource, Resource, `Unit`}

/**
 * Classe di Test per la classe Unit
 */
class UnitTest extends FlatSpec {
	var gold = new Resource("oro")
	var potion = new Resource("pozione")
	var quantityResource1 = Vector(new QuantityResource(gold, 100), new QuantityResource(potion, 300))
	var quantityResource2 = Vector(new QuantityResource(gold, 20), new QuantityResource(potion, 70))
	var externalUnit = new `Unit`("fante", 5, 30, new Cost(20, quantityResource2), true)

	"una Unità" must "mantenere la stessa forza di attacco che è stata definita dal costruttore" in {
		val unit1 = new `Unit`("cavaliere", 10, 5, new Cost(10, quantityResource1), true)
		assert(unit1.getAttack == 10)
		assert(externalUnit.getAttack == 5)
	}

	it must "mantenere la stessa forza di difesa che è stata definita dal costruttore" in {
		val unit1 = new `Unit`("cavaliere", 10, 5, new Cost(10, quantityResource1), true)
		assert(unit1.getDefence == 5)
		assert(externalUnit.getDefence == 30)
	}

	it must "mantenere lo stesso nome definito dal costruttore" in {
		val unit1 = new `Unit`("cavaliere", 10, 5, new Cost(10, quantityResource1), true)
		assert(unit1.getName == "cavaliere")
		assert(externalUnit.getName == "fante")
	}

	it must "mantenere lo stesso costo definito dal costruttore" in {
		val cost1 = new Cost(10, quantityResource1)
		val unit1 = new `Unit`("cavaliere", 10, 5, cost1, true)
		assert(unit1.getCost.equals(cost1))
		assert(externalUnit.getCost.equals(new Cost(20, quantityResource2)))
	}

	it must "lanciare una eccezione quando viene costruito illegalmente" in {
		intercept[IllegalArgumentException] {
			new `Unit`(null, 10, 5, new Cost(10, quantityResource1), true)
		}
		intercept[IllegalArgumentException] {
			new `Unit`("cavaliere", 10, 5, null, true)
		}
		intercept[IllegalArgumentException] {
			new `Unit`(null, 10, 5, null, true)
		}
	}

	it must "ricevere la chiave dell'unità" in {
		val unit1 = new `Unit`("cavaliere", 10, 5, new Cost(10, quantityResource1), true)
		assert(unit1.getKey == "cavaliere")
	}

	it must "essere uguale solo a elementi della stessa classe" in {
		assert(externalUnit != gold)
	}
}