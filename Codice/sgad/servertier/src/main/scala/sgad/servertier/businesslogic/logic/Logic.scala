/**
 * FILE: Logic.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/businesslogic/logic
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.businesslogic.logic

import sgad.servertier.dataaccess.data.userdata.UserData
import sgad.servertier.businesslogic.operations.OperationFactory

import scala.language.postfixOps

/**
 * Classe per la gestione dell'operazione richiesta dall'utente. Essa si occupa di instradare la richiesta tramite l'invocazione dell'operazione giusta.
 * @constructor
 * @param userData I dati dell'utente a cui la classe Logic è associata.
 * @param loginAuthorization Autorizzazione a operare richieste di login. Di default è false.
 * @param registrationAuthorization Autorizzazione a operare richieste di registrazione. Di default è false.
 * @param userAuthorization Autorizzazione a operare richieste di user. Di default è false.
 * @param internalAuthorization Autorizzazione a operare richieste interne. Di default è false.
 */
class Logic(userData: UserData, loginAuthorization: Boolean = false, registrationAuthorization: Boolean = false, userAuthorization: Boolean = false,
            internalAuthorization: Boolean = false) {
	/**
	 * Analizza ed esegue una richiesta.
	 * @param operation Il tipo di richiesta desiderata.
	 * @param data I dati in input alla richiesta.
	 * @return Stringa con la risposta
	 */
	def analizeRequest(operation: String, data: String): String = {
		try {
			OperationFactory.getOperation(operation).execute(userData, data, loginAuthorization, registrationAuthorization,
				userAuthorization, internalAuthorization)
		}
		catch {
			case _: NoSuchElementException => return "-"
		}
	}
}
