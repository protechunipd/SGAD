/**
 * FILE: Registration.scala
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

import sgad.servertier.dataaccess.data.userdata.{AuthenticationData, UserData}
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager

import scala.language.postfixOps
import sgad.servertier.presentation.usermanager.{UserActor, IsUserActorAliveRequester}
import scala.collection.mutable.ArrayBuffer
import scala.util.matching.Regex
import sgad.servertier.presentation.pagemanager.PageFactory


/**
 * Classe che rappresenta l'operazione di login.
 */
class Login extends Operation {
	/**
	 * Metodo per il login di un utente.
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
		if (loginAuthorization) {
			val mapData = decodeData(data)
			var answer = ""
			try {
				val errors = new ArrayBuffer[String]

				val password = mapData("password")

				//Controllo che l'user sia bene formattata: solo caratteri alfanumerifici e _, lunga tra 4 e 14 caratteri compresi
				val user = mapData("user")
				val userlMatch = new Regex("^\\w{4,14}$").findFirstMatchIn(user)
				userlMatch match {
					case Some(s) => //Non fai niente
					//Restituisco la pagina di home con la segnalazione degli errori riscontrati.
					case None => errors += "IncorrectLogin"; return PageFactory.getHomePageWithErrors(mapData,errors)
				}

				//Leggo dal batabase i dati dell'utente e interpreto la risposta
				val loginResponse: (UserData, Int) = DataBaseManager.loadUserData(user, AuthenticationData.computeHash(password))
				loginResponse match {
					//Restituisco la pagina di home con la segnalazione degli errori riscontrati.
					case (null, 1) => errors += "IncorrectLogin"; return PageFactory.getHomePageWithErrors(mapData,errors)
					case (null, 2) | (null, 3) => errors += "IncorrectLogin"; return PageFactory.getHomePageWithErrors(mapData,errors)
					case (null, 4) => return PageFactory.getHomePageServiceIsDown
					case _ => //Riposta ok, do nothing
				}

				//Login andato a buon fine
				//Se non è gia loggato creo il nuovo attore, altrimenti non faccio niente
				if (!IsUserActorAliveRequester.isAlive(user)) {
					try {
						UserActor(user, loginResponse._1)
					} catch {
						case _: akka.actor.InvalidActorNameException => //Do nothing
					}
				}

				//Ritorno il codice del gioco lato client
				val answerBuilding = new StringBuilder ++= PageFactory.getCanvas1

				//Sostituisco nel codice di gioco lato client l'authenticationString, il nome dell'user e l'indirizzo a cui inviare le richieste.
				var canvas2 = "ADDRESSTOREPLACE".r.replaceAllIn(PageFactory.getCanvas2ToReplace, PageFactory.getAddressRequest)
				canvas2 = "USERTOREPLACE".r.replaceAllIn(canvas2, user)
				canvas2 = "AUTHENTICATIONTOREPLACE".r.replaceAllIn(canvas2, loginResponse._1.getAuthenticationData.getAuthenticationString)

				//Completo la pagina e rispondo.
				answer = (answerBuilding ++= canvas2 ++= PageFactory.getCanvas3).toString()
			}
			catch {
				case _: NoSuchElementException => return  "{data: false, parameters: false}"
			}
			answer
		}
		else
			"{data: false, unauthorized: true}"
	}
}
