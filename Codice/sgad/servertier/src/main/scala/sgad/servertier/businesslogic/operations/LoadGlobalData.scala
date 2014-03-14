/**
 * FILE: LoadGlobalData.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.businesslogic.operations

import sgad.servertier.dataaccess.data.userdata.UserData

import scala.language.postfixOps
import sgad.servertier.dataaccess.databaseaccess.shareddatadao.SharedDataDAO

/**
 * Classe per la gestione del caricamento da parte del client dei dati globali di gioco.
 */
class LoadGlobalData extends Operation {
	/**
	 * Metodo di load dei dati generali di gioco.
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
				//Ritorna il valore del blocco if
				if(userData.getAuthenticationData.getAuthenticationString == mapData("authentication"))
					"{data: " + SharedDataDAO.getMongoObject.toString + "}"
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
