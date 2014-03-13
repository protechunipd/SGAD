/**
 * FILE: DeleteAccount.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 28 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-28 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.businesslogic.operations

import sgad.servertier.dataaccess.data.userdata.UserData
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager

/**
 * Classe che rappresenta l'operazione di eliminazione di un account utente.
 */
class DeleteAccount extends Operation{
	/**
	 * Metodo che implementa l'eliminazione di un account utente.
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
		if (userAuthorization){
			try{
				val mapData = decodeData(data)
				if(userData.getAuthenticationData.getAuthenticationString == mapData("authentication"))
				{
					if(DataBaseManager.deleteUser(userData.getAuthenticationData.getUser))
						"{data: true}"
					else
						"{data: false}"
				}
				else
					"{data: false, authentication: false}"
			}
			catch {
				case _: NoSuchElementException => return  "{data: false, parameters: false}"
			}
		}
		else
			"{data: false, unauthorized: true}"
	}
}
