/**
 * FILE: BonusTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/data/shareddata
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
import sgad.servertier.dataaccess.data.shareddata.Bonus

/**
 * Classe per il Test della classe Bonus
 */

class BonusTest extends FlatSpec {

	var bonus = new Bonus("bonus1", 2, 1)

	"Un bonus " must " mantenere il nome del bonus come viene espresso nel costruttore" in {
		assert(bonus.getBonusName.equals("bonus1"))
	}

	"Un bonus " must " mantenere la potenza del bonus come viene espresso nel costruttore" in {
		assert(bonus.getType == 2)
	}

	"Un bonus " must " mantenere il codice identificativo del bonus come viene espresso nel costruttore" in {
		assert(bonus.getQuantity == 1)
	}

	it must " essere uguale solo ad uno stesso costo " in {
		val bonus1 = new Bonus("bonus1", 2, 3)
		val bonus2 = new Bonus("bonus1", 1, 2)
		val bonus3 = new Bonus("bonus1", 2, 3)
		val bonus4 = new Bonus("bonus1", 1, 2)

		assert(bonus1 equals bonus3)
		assert(bonus1 != "pippo")
		assert(bonus2 equals bonus4)
		assert(bonus1 == bonus3)
		assert(!bonus1.equals(bonus2))
		assert(!bonus2.equals(bonus3))
		assert(bonus4 equals bonus2)
	}

	it must "throw illegalArgument exception con costruttore illegale" in {
		intercept[IllegalArgumentException] {
			new Bonus(null, 1, 2)
		}
	}
}