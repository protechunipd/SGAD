/**
 * FILE: UnitInProgressTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/data/userdata
 * DATA CREAZIONE: 19 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Creazione della classe - Segantin Fabio
 */

import org.scalatest._
import sgad.servertier.dataaccess.data.shareddata.{Cost, Resource, QuantityResource, `Unit`}
import sgad.servertier.dataaccess.data.userdata.UnitInProgress

/**
 * Classe di Test per la classe UnitPossession
 */
class UnitInProgressTest extends FlatSpec with PrivateMethodTester {

	val gold = new Resource("oro")
	val chap = new `Unit`("fante", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	val horse = new `Unit`("cavallo", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	"Una UnitInProgress" must "mantenere lo stesso tipo di unità" in {
		val newUnits = new UnitInProgress(chap, 10, 200)
		assert(newUnits.getUnit == chap)
	}
	it must "mantenere la quantità idonea ai cambiamenti dovuti al costruttore o al setter" in {
		val newUnits = new UnitInProgress(chap, 10, 200)
		assert(newUnits.getQuantity == 200)
		newUnits.updateQuantity(50)
		assert(newUnits.getQuantity == 150)
		newUnits.updateQuantity(-1)
		assert(newUnits.getQuantity == 150)
	}
	it must "essere uguale solo a UnitPossession equivalenti" in {
		val newUnits = new UnitInProgress(chap, 10, 10)
		val unit2 = new UnitInProgress(horse, 10, 42)
		val unit3 = new UnitInProgress(horse, 20, 42)
		val unit4 = new UnitInProgress(chap, 10, 10)
		val unit5 = new UnitInProgress(horse, 10, 10)
		assert(newUnits == unit4)
		assert(newUnits != unit2)
		assert(newUnits != unit5)
		assert(unit2 != unit5)
		assert(unit2 != unit3)
		assert(newUnits != gold)
	}

	it must "lanciare una eccezione se viene invocato un metodo con parametri non adatti" in {
		intercept[IllegalArgumentException] {
			new UnitInProgress(null, 10, 10)
		}
		intercept[IllegalArgumentException] {
			new UnitInProgress(chap, -10, 10)
		}
		intercept[IllegalArgumentException] {
			new UnitInProgress(chap, 10, -10)
		}
		intercept[IllegalArgumentException] {
			new UnitInProgress(chap, -10, -10)
		}
		intercept[IllegalArgumentException] {
			new UnitInProgress(null, -10, 10)
		}
		intercept[IllegalArgumentException] {
			new UnitInProgress(null, 10, -10)
		}
		intercept[IllegalArgumentException] {
			new UnitInProgress(null, -10, -10)
		}
	}
}