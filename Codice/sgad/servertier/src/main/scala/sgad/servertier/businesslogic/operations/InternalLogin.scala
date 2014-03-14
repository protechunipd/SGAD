/**
 * FILE: InternalLogin.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 26 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-26 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.businesslogic.operations

import sgad.servertier.dataaccess.data.userdata.UserData
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager

import scala.language.postfixOps
import sgad.servertier.presentation.usermanager.{UserActor, IsUserActorAliveRequester}
import scala.util.matching.Regex

/**
 * Classe che rappresenta l'operazione di login.
 */
class InternalLogin extends Operation {
	/**
	 * Metodo di esecuzione del login interno senza controllo della password.
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
		if (internalAuthorization) {
			val mapData = decodeData(data)
			var answer = ""
			try {
				//Controllo che l'user sia bene formattato: solo caratteri alfanumerici e _, lunga tra 4 e 14 caratteri compresi
				val user = mapData("user")
				val userlMatch = new Regex("^\\w{4,14}$").findFirstMatchIn(user)
				userlMatch match {
					case Some(s) => //Non fai niente
					case None => return "No"
				}

				//Se l'attore è gia esistente ritorno subito vero senza andare a chiamare il database.
				if (IsUserActorAliveRequester.isAlive(user))
					return "Yes"

				val loginResponse: (UserData, Int) = DataBaseManager.internalLoadUserData(user)
				loginResponse match {
					case (null, 1) => return "Username inesistente"
					case (null, 2) | (null, 3) => return "Errore interno"
					case (null, 4) => return "Servizio momentameamente non disponibile"
					case _ => //Risposta ok, do nothing
				}

				//Creo il nuovo attore associato all'utente
				UserActor(user, loginResponse._1)
				answer = "Yes"
			}
			catch {
				case _: NoSuchElementException => return "{data: false, parameters: false }"
			}
			answer
		}
		else
			"{data: false, unauthorized: true}"
	}
}
