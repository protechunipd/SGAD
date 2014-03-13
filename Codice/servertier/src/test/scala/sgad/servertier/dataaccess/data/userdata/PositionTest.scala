/**
 * FILE: PositionTest.scala
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
import sgad.servertier.dataaccess.data.userdata.Position

/**
 * Classe di Test per la classe Position
 */
class PositionTest extends FlatSpec {

	"Una posizione" must "mantenere la stessa coordinata x fornita al costruttore" in {
		val position = new Position(1, 2)
		assert(position.getX == 1)
	}

	it must "mantenere la stessa coordinata y fornita al costruttore" in {
		val position = new Position(1, 2)
		assert(position.getY == 2)
	}
	it must "essere uguale solo a posizioni equivalenti" in {
		val position1 = new Position(0, 0)
		val position2 = new Position(1, 1)
		val position3 = new Position(0, 0)
		assert(position1 == position3)
		assert(position1 != position2)
		assert(position1 != "ca")
	}
}