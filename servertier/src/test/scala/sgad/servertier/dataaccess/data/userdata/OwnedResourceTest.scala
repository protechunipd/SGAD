/**
 * FILE: OwnedResourceTest.scala
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
import sgad.servertier.dataaccess.data.shareddata.Resource
import sgad.servertier.dataaccess.data.userdata.OwnedResource

/**
 * Classe di Test per la classe OwnedResource
 */
class OwnedResourceTest extends FlatSpec with PrivateMethodTester {

	val gold = new Resource("oro")
	val potion = new Resource("pozione")
	val setQuantity = PrivateMethod[Unit]('setQuantity)

	"Una OwnedResource" must "mantenere la stessa risorsa fornita durante il costruttore" in {
		val ownedPotions = new OwnedResource(potion, 100)
		val ownedGold = new OwnedResource(gold, 200)
		assert(ownedPotions.getResource == potion)
		assert(ownedGold.getResource == gold)
	}

	it must "mantenere la stessa quantità in maniera analoga al setter e al costruttore" in {
		val ownedPotions = new OwnedResource(potion, 100)
		val ownedGold = new OwnedResource(gold, 200)
		assert(ownedGold.getQuantity == 200)
		assert(ownedPotions.getQuantity == 100)
		val goldQuantity = ownedGold.getQuantity
		val potionQuantity = ownedPotions.getQuantity
		ownedGold invokePrivate setQuantity(100)
		assert(ownedGold.getQuantity == 100)
		assert(!(goldQuantity != 100 && ownedGold.getQuantity == goldQuantity))
		assert(ownedPotions.getQuantity == potionQuantity)
	}

	it must "essere uguale solo ad oggetti equivalenti" in {
		val ownedPotions1 = new OwnedResource(potion, 100)
		val ownedGold1 = new OwnedResource(gold, 200)
		val ownedPotions2 = new OwnedResource(potion, 100)
		val ownedGold2 = new OwnedResource(gold, 200)
		val ownedPotions3 = new OwnedResource(potion, 200)
		val ownedGold3 = new OwnedResource(gold, 100)
		val resource1 = new Resource("panna")
		assert(ownedPotions1 == ownedPotions2)
		assert(ownedGold1 == ownedGold2)
		assert(ownedGold3 != ownedGold2)
		assert(ownedGold3 != ownedPotions1)
		assert(ownedPotions3 != resource1)
	}

	it must "lanciare una eccezione se viene chiamato un metodo con parametri non adatti" in {
		intercept[IllegalArgumentException] {
			new OwnedResource(null, 200)
		}
		intercept[IllegalArgumentException] {
			val ownedGold = new OwnedResource(gold, 200)
			ownedGold invokePrivate setQuantity(-1)
		}
	}

	it must "avere la stessa chiave della risorsa" in {
		val ownedGold = new OwnedResource(gold, 200)
		assert(gold.getKey == ownedGold.getKey)
	}
}