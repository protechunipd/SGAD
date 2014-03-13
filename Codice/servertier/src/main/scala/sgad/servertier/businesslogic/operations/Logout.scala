/**
 * FILE: Logout.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 25 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-25 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.businesslogic.operations

import sgad.servertier.dataaccess.data.userdata.UserData
import sgad.servertier.presentation.usermanager.UserActor

import scala.language.postfixOps

/**
 * Classe che rappresenta l'operazione di login.
 */
class Logout extends Operation {
	/**
	 * Metodo per il logout di un utente.
	 * @param userData Dati dell'utente su cui verrà effettuata l'operazione.
	 * @param data Dati accompagnatori alla richiesta dell'operazione.
	 * @param loginAuthorization Autorizzazione a operare richieste di login. Di default è false.
	 * @param registrationAuthorization Autorizzazione a operare richieste di registrazione. Di default è false.
	 * @param userAuthorization Autorizzazione a operare richieste di user. Di default è false.
	 * @param internalAuthorization Autorizzazione a operare richieste interne. Di default è false.
	 * @return Stringa di risposta.
	 */
	def execute(userData: UserData, data: String, loginAuthorization: Boolean, registrationAuthorization: Boolean,
	            userAuthorization: Boolean, internalAuthorization: Boolean): String = {
		if (userAuthorization) {
			try{
				val mapData = decodeData(data)
				if(userData.getAuthenticationData.getAuthenticationString == mapData("authentication"))
				{
					UserActor.sendLogoutRequest(userData.getAuthenticationData.getUser)
					"Logout effettuato con successo"
				}
				else
					"{data: false, authentication: false}"
			}
			catch {
				case _: NoSuchElementException => return "{data: false, parameters: false }"
			}
		}
		else
			"{data: false, unauthorized: true}"
	}
}