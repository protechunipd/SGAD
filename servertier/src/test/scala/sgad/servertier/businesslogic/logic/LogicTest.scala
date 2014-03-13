/**
 * FILE: LogicTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/businesslogic/logic
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Biancucci Maurizio
 */
import sgad.servertier.businesslogic.logic.Logic
import sgad.servertier.businesslogic.operations.OperationFactory
import org.scalatest._

/**
 * Classe di test per la classe Logic
 */
class LogicTest extends FlatSpec{

	val logic = new Logic(null)

	"Eseguendo una operation che non è diponibile in OperationFactory" must "ritornare '-'" in {
		intercept[NoSuchElementException] {
			OperationFactory.getOperation("OperazioneImprobabile")
		}
		assert(logic.analizeRequest("OperazioneImprobabile", "") == "-")
	}
}
