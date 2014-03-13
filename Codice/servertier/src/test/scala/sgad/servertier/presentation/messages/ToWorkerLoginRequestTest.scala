/**
 * FILE: ToWorkerRegistrationRequestTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/presentation/messages
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.presentation.messages

import org.scalatest.FlatSpec

/**
 * Classe di test per la classe ToWorkerRegistrationRequest
 */
class ToWorkerLoginRequestTest extends FlatSpec{
	val request = ToWorkerLoginRequest("Mauxx", "soDifficult")

	"La conversione della ToWorkerRegistrationRequest" must "essere effettuata correttamente" in {
		assert(request.data == "user:Mauxx,password:soDifficult")
	}
}