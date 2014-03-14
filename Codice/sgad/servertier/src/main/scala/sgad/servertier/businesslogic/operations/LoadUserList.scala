/**
 * FILE: LoadUserList.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 3 Marzo 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-03-03 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.businesslogic.operations

import sgad.servertier.dataaccess.data.userdata.UserData
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager

/**
 * Classe per la gestione dell'operazione di scelta degli utenti con i quali un utente può interagire.
 */
class LoadUserList extends Operation{
	/**
	 * Computa gli user con i quali un utente può interagire.
	 * @param userData Dati dell'utente su cui verrà effettuata l'operazione.
	 * @param data Dati accompagnatori alla richiesta dell'operazione.
	 * @param loginAuthorization Autorizzazione a operare richieste di login. Di default è false.
	 * @param registrationAuthorization Autorizzazione a operare richieste di registrazione. Di default è false.
	 * @param userAuthorization Autorizzazione a operare richieste di user. Di default è false.
	 * @param internalAuthorization Autorizzazione a operare richieste interne. Di default è false.
	 * @return Stringa da restituire.
	 */
	def execute(userData: UserData, data: String, loginAuthorization: Boolean, registrationAuthorization: Boolean,
	            userAuthorization: Boolean, internalAuthorization: Boolean): String = {
		if(userAuthorization)
		{
			try{
				val mapData = decodeData(data)
				//Ritorna il valore del blocco if
				if(userData.getAuthenticationData.getAuthenticationString == mapData("authentication"))
				{
					val userList = DataBaseManager.loadRandomUsers(userData.getAuthenticationData.getUser, 5)
					var answer = new StringBuilder("{ data: [")
					var first = true
					userList.foreach( (user: String) => {
						if(!first)
							answer ++= ","
						else
							first = false
						answer ++= "\""+ user +"\"" })

					(answer ++= "]}").toString()
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
