/**
 * FILE: DismissUnit.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 26 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-26 - Creazione della classe - Segantin Fabio
 */

package sgad.servertier.businesslogic.operations

import sgad.servertier.dataaccess.data.userdata.UserData
import java.util.NoSuchElementException

/**
 * Classe che rappresenta l'operazione di congedo di unità.
 */
class DismissUnit extends Operation {
	/**
	 * Metodo per eseguire la distruzione di unità.
	 * @param userData Dati dell'utente su cui verrà effettuata l'operazione.
	 * @param data Dati accompagnatori alla richiesta dell'operazione.
	 * @param loginAuthorization Autorizzazione a operare richieste di login. Di default è false.
	 * @param registrationAuthorization Autorizzazione a operare richieste di registrazione. Di default è false.
	 * @param userAuthorization Autorizzazione a operare richieste di user. Di default è false.
	 * @param internalAuthorization Autorizzazione a operare richieste interne. Di default è false.
	 * @return Stringa da restituire.
	 */
	def execute(userData: UserData, data: String, loginAuthorization: Boolean, registrationAuthorization: Boolean, userAuthorization: Boolean, internalAuthorization: Boolean): String = {
		OperationFactory.getOperation("UpdateUserData").execute(userData, "", internalAuthorization = true)
		var answer = "data:false, authorization:false"
		if (userAuthorization) {
			//viene controllata l'autorizzazione della richiesta
			val dataMap = decodeData(data)
			try {
				if (userData.getAuthenticationData.getAuthenticationString == dataMap("authentication")) {
					//vengono controllate le stringhe di autenticazione
					val unit = userData.getOwnedUnit(dataMap("type"))
					val quantity = dataMap("quantity").toInt
					if (unit.getQuantity >= quantity) {
						//si controlla che il numero di unità possedute siano maggiori o uguali al numero di unità da congedare.
						unit.setQuantity(unit.getQuantity - quantity)
						answer = "data:true, messages:" + parsePiggy(userData.getPiggy)
					} else {
						//le unità da congedare sono superiori a quelle possedute
						answer = "data:false, notenough:false, messages:" + parsePiggy(userData.getPiggy)
					}
				} else {
					//l'autenticazione della richiesta non è andata a buon fine.
					answer = "data:false, authentication:false"
				}
			} catch {
				case _: NoSuchElementException => //risposta falsa di default
				case _: NumberFormatException => //risposta falsa di default
			}
		}
		"{" + answer + "}"
	}
}
