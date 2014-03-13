/**
 * FILE: BuildingPossessionTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/data/userdata
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Nessi Alberto
 */


import org.scalatest._
import sgad.servertier.dataaccess.data.shareddata._
import sgad.servertier.dataaccess.data.userdata.{BuildingPossession, UnitInProgress, Position}

/**
 * Classe per il Test della classe BuildingPossession
 */

class BuildingPossessionTest extends FlatSpec {

	var timeNow = 1392902385004L
	val quantityResource = Array[QuantityResource]()
	var preconditions = Vector[BuildingWithLevel]()
	var bonus = new Bonus("bonus1", 2, 3)
	var gold = new Resource("oro")
	var potion = new Resource("pozione")
	var resourceQuantityVector = Vector(new QuantityResource(gold, 100), new QuantityResource(potion, 300))
	var cost = new Cost(1000, resourceQuantityVector)
	var productedResource1 = new ProductedResource(new Resource("risorsaDiProva"), 1223, 1, 2)
	var productedUnit1 = Vector[`Unit`]()
	var productedUnit2 = new `Unit`("soldato2", 1, 3, cost, true)
	var productedUnit3 = new `Unit`("soldato3", 1, 3, cost, true)
	var buildingWithLevel1 = new BuildingWithLevel(true, bonus, cost, 2, "Torre", preconditions, productedResource1, productedUnit1, 2, false)
	var position = new Position(3, 8)
	var position2 = new Position(1, 12)
	var unitInProgress = new UnitInProgress(productedUnit2, 1392902384789L, 1)
	var unitInProgress2 = new UnitInProgress(productedUnit3, 1392902384789L, 1)
	var buildingPossession = new BuildingPossession(buildingWithLevel1, position, true, 1392902385004L, unitInProgress)

	"Un BuildingPossession " must " mantenere il tipo di costruzione così come viene espresso nel costruttore" in {
		assert(buildingPossession.getBuilding.equals(buildingWithLevel1))
	}

	"Un BuildingPossession " must " mantenere le coordinate di un edificio di gioco così come viene espresso nel costruttore" in {
		assert(buildingPossession.getPosition.equals(position))
	}

	"Un BuildingPossession " must " mantenere lo stato di isFinished così come viene espresso nel costruttore" in {
		assert(buildingPossession.getIsFinished.equals(true))
	}

	"Un BuildingPossession " must " mantenere l'attributo time così come viene espresso nel costruttore" in {
		assert(buildingPossession.getTime.equals(1392902385004L))
	}

	"Un BuildingPossession " must " mantenere l'attributo unitInProgress così come viene espresso nel costruttore" in {
		assert(buildingPossession.getUnitInProgress.equals(unitInProgress))
	}

	"Il costruttore " must " throw illegalArgument exception con costruttore illegale" in {
		intercept[IllegalArgumentException] {
			// building
			new BuildingPossession(null, position, true, 1392902385004L, unitInProgress)
		}
		intercept[IllegalArgumentException] {
			// position
			new BuildingPossession(buildingWithLevel1, null, true, 1392902385004L, unitInProgress)
		}
	}

	it must " essere uguale solo ad uno stesso BuildingPossession " in {
		val buildingPossession1 = new BuildingPossession(buildingWithLevel1, position, true, 1392902385004L, unitInProgress)
		val buildingPossession2 = new BuildingPossession(buildingWithLevel1, position, true, 1392902385004L, unitInProgress)
		val buildingPossession3 = new BuildingPossession(buildingWithLevel1, position2, false, 1392902385123L, unitInProgress)

		assert(buildingPossession1 equals buildingPossession2)
		assert(buildingPossession1 == buildingPossession2)
		assert(!buildingPossession1.equals(buildingPossession3))
		assert(!buildingPossession2.equals(buildingPossession3))
		assert(buildingPossession != buildingWithLevel1)
	}

	it must "inserire correttamente le unità in coda" in {
		buildingPossession.addUnit(unitInProgress)
		assert(buildingPossession.addUnit(unitInProgress))
		assert(!buildingPossession.addUnit(unitInProgress2))
	}

	"Il metodo getKey" must " restituire la chiave nel formato valido" in {
		assert(buildingPossession.getKey.equals(buildingWithLevel1.getNameBuilding + "L" + buildingWithLevel1.getLevel + "X" + position.getX + "Y" + position.getY))
	}
}