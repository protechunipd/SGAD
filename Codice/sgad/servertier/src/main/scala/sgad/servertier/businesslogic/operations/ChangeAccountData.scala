/**
 * FILE: ChangeAccountData.scala
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

import sgad.servertier.dataaccess.data.userdata.{AuthenticationData, UserData}
import scala.util.matching.Regex
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager

/**
 * Classe che rappresenta l'operazione di modifica dei dati dell'account utente.
 */
class ChangeAccountData extends Operation {
	/**
	 * Implementa l'operazione di modifica dei dati dell'account.
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
		var answer = "data: false, unauthorized: true"

		if (userAuthorization) {
			//controllo autorizzazione
			try {
				val mapData = decodeData(data)

				if (userData.getAuthenticationData.getAuthenticationString == mapData("authentication")) {

					val oldPassword = mapData("oldPassword")
					if (userData.getAuthenticationData.getHashPassword != AuthenticationData.computeHash(oldPassword))
						return "{data: false, messages:" + parsePiggy(userData.getPiggy) + "}"

					val password = mapData("password1")
					//Controllo che la password sia formata da almeno un numero e almeno un carattere, sia lungo 8 caratteri minimo e 16 massimo
					val passwordMatch = new Regex("^(?=.*\\d)(?=.*[a-zA-Z]).{8,16}$").findFirstMatchIn(password)
					passwordMatch match {
						case Some(s) => //Non fai niente
						case None => return "{data: false, messages:" + parsePiggy(userData.getPiggy) + "}"
					}

					//Controllo che la seconda password sia uguale alla prima.
					if (mapData("password2") != password)
						return "{data: false, messages:" + parsePiggy(userData.getPiggy) + "}"

					//Salvo anche sul database perchè la login la faccio da database.
					if (DataBaseManager.save(userData)) {
						answer = "data: true, messages:" + parsePiggy(userData.getPiggy)
						//Cambio la password nell'userdata
						userData.getAuthenticationData.setHashPassword(AuthenticationData.computeHash(password))
					}
					else
						answer = "data: false, messages:" + parsePiggy(userData.getPiggy)
				}
				else {
					answer = "data: false, authentication:false"
				}
			} catch {
				case _: NoSuchElementException => answer = "data: false, parameters: false"
			}
		}
		"{" + answer + "}"
	}
}
