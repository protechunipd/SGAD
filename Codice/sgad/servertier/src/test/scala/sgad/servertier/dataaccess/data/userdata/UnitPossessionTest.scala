/**
 * FILE: UnitPossessionTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/data/userdata
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Segantin Fabio
 */

import org.scalatest._
import sgad.servertier.dataaccess.data.shareddata.{Cost, Resource, QuantityResource, `Unit`}
import sgad.servertier.dataaccess.data.userdata.UnitPossession

/**
 * Classe di Test per la classe UnitPossession
 */
class UnitPossessionTest extends FlatSpec with PrivateMethodTester {
	val setQuantity = PrivateMethod[Unit]('setQuantity)

	val gold = new Resource("oro")
	val chap = new `Unit`("fante", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	val horse = new `Unit`("cavallo", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	"Una UnitPossession" must "mantenere lo stesso tipo di unità" in {
		val units = new UnitPossession(10, chap)
		assert(units.getUnit == chap)
	}
	it must "mantenere la quantità idonea ai cambiamenti dovuti al costruttore o al setter" in {
		val units = new UnitPossession(10, chap)
		assert(units.getQuantity == 10)
		units invokePrivate setQuantity(50)
		assert(units.getQuantity == 50)
	}
	it must "essere uguale solo a UnitPossession equivalenti" in {
		val units = new UnitPossession(10, chap)
		val unit1 = new UnitPossession(42, horse)
		val unit2 = new UnitPossession(10, chap)
		val unit3 = new UnitPossession(10, horse)
		assert(units == unit2)
		assert(units != unit1)
		assert(units != unit3)
		assert(unit1 != unit3)
		assert(units != gold)
	}

	it must "avere la stessa key della unità che possiede" in {
		val units = new UnitPossession(10, chap)
		assert(units.getKey == chap.getKey)
	}

	it must "lanciare una eccezione se viene invocato un metodo con parametri non adatti" in {
		intercept[IllegalArgumentException] {
			new UnitPossession(10, null)
		}
		intercept[IllegalArgumentException] {
			new UnitPossession(-10, chap)
		}
		intercept[IllegalArgumentException] {
			new UnitPossession(-10, null)
		}
		intercept[IllegalArgumentException] {
			val nuoveunita = new UnitPossession(10, chap)
			nuoveunita invokePrivate setQuantity(-20)
		}
	}
}