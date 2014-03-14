/**
 * FILE: BuildingWithLevelTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/data/shareddata
 * DATA CREAZIONE: 19 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Creazione della classe - Nessi Alberto
 */

import org.scalatest._
import sgad.servertier.dataaccess.data.shareddata._

/**
 * Classe per il Test della classe BuildingWithLevel
 */
class BuildingWithLevelTest extends FlatSpec {

	var preconditions = Vector[BuildingWithLevel]()
	var bonus = new Bonus("bonus1", 2, 3)
	var gold = new Resource("oro")
	var potion = new Resource("pozione")
	var quantityResourceVector = Vector(new QuantityResource(gold, 100), new QuantityResource(potion, 300))
	var cost = new Cost(1000, quantityResourceVector)
	var productedResource1 = new ProductedResource(new Resource("risorsa1"), 4000, 1, 4)
	var productedUnit1 = Vector[`Unit`]()
	var productedUnit2 = new `Unit`("soldato2", 1, 3, cost, true)

	var buildingWithLevel1 = new BuildingWithLevel(true, bonus, cost, 2, "Torre", preconditions, productedResource1, productedUnit1, 2, isDestructible = false)

	"Un BuildingWithLevel " must " mantenere il bonus come viene espresso nel costruttore" in {
		assert(buildingWithLevel1.getBonus.equals(bonus))
	}

	"Un BuildingWithLevel " must " mantenere il costo di costruzione così come viene espresso nel costruttore" in {
		assert(buildingWithLevel1.getCost.equals(cost))
	}

	"Un BuildingWithLevel " must " mantenere il livello della costruzione così come viene espresso nel costruttore" in {
		assert(buildingWithLevel1.getLevel == 2)
	}

	"Un BuildingWithLevel " must " mantenere il nome della costruzione così come viene espresso nel costruttore" in {
		assert(buildingWithLevel1.getNameBuilding.equals("Torre"))
	}

	"Un BuildingWithLevel " must " mantenere le precondizioni così come sono espresse nel costruttore" in {
		assert(buildingWithLevel1.getPrecondition.equals(preconditions))
	}

	"Un BuildingWithLevel " must " mantenere le risorse che l'edificio costruisce così come sono espresse nel costruttore" in {
		assert(buildingWithLevel1.getProductedResource.equals(productedResource1))
	}

	"Un BuildingWithLevel " must " mantenere le unità che l'edificio può produrre così come sono espresse nel costruttore" in {
		assert(buildingWithLevel1.getProductedUnits.equals(productedUnit1))
	}

	"Un BuildingWithLevel " must " mantenere i posti per le unità che offre l'edificio così come sono espresse nel costruttore" in {
		assert(buildingWithLevel1.getUnitsSpace == 2)
	}

	it must "essere uguale solo a oggetti della stessa classe" in {
		assert(buildingWithLevel1 != gold)
	}

	it must "throw illegalArgument exception con costruttore illegale" in {
		intercept[IllegalArgumentException] {
			// bonus
			new BuildingWithLevel(true, null, cost, 2, "Torre", preconditions, productedResource1, productedUnit1, 2, isDestructible = false)
		}
		intercept[IllegalArgumentException] {
			// cost
			new BuildingWithLevel(true, bonus, null, 2, "Torre", preconditions, productedResource1, productedUnit1, 2, isDestructible = false)
		}
		intercept[IllegalArgumentException] {
			// level
			new BuildingWithLevel(true, bonus, null, -1, "Torre", preconditions, productedResource1, productedUnit1, 2, isDestructible = false)
		}
		intercept[IllegalArgumentException] {
			// nameBuilding
			new BuildingWithLevel(true, bonus, cost, 2, null, preconditions, productedResource1, productedUnit1, 2, isDestructible = false)
		}
		intercept[IllegalArgumentException] {
			// precondition
			new BuildingWithLevel(true, bonus, cost, 2, "Torre", null, productedResource1, productedUnit1, 2, isDestructible = false)
		}
		intercept[IllegalArgumentException] {
			// productedUnit
			new BuildingWithLevel(true, bonus, cost, 2, "Torre", preconditions, productedResource1, null, 2, isDestructible = false)
		}
		intercept[IllegalArgumentException] {
			// unitsSpace
			new BuildingWithLevel(true, bonus, cost, 2, "Torre", preconditions, productedResource1, null, 0, isDestructible = false)
		}
	}

}