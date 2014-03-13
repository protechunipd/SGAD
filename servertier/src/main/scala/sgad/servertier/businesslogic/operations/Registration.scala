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

import sgad.servertier.dataaccess.data.userdata._
import sgad.servertier.dataaccess.data.shareddata._
import scala.util.matching.Regex
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import scala.collection.mutable.ArrayBuffer
import sgad.servertier.presentation.pagemanager.PageFactory

/**
 * Classe per la gestione dell'operazione di registrazione.
 */
class Registration extends Operation {

	/**
	 * Crea i dati di un nuovo utente con le costruzioni e le risorse standard.
	 * @param user Usermane del nuovo utente.
	 * @param email Email del nuovo utente.
	 * @param password Password del nuovo utente NON hashata.
	 * @return I dati del nuovo utente.
	 */
	private def createNewUser(user: String, email: String, password: String): UserData = {
		//Classe di autenticazione del nuovo utente
		val authentication = new AuthenticationData(user, email, AuthenticationData.computeHash(password))

		//Creo la mappa di OwnedResource del nuovo utente per ogni risorsa disponibile
		val mapOwnedResources = DataFactory.getResourcesMap.map {
			case (key: String, resource: Resource) => (key, new OwnedResource(resource, 0))
		}

		//Creo la mappa di BuildingPossession del nuovo utente
		val now: Long = System.currentTimeMillis / 1000L
		val torreDelloStregone = new BuildingPossession(DataFactory.getBuilding("Torre dello stregoneL1"), new Position(5, 7), true, now, null)
		val scuolaDiMagia = new BuildingPossession(DataFactory.getBuilding("Scuola di magiaL1"), new Position(4, 9), true, now, null)
		val miniera = new BuildingPossession(DataFactory.getBuilding("MinieraL1"), new Position(6, 9), true, now, null)
		val mapBuildingPossession = scala.collection.mutable.Map(torreDelloStregone.getKey -> torreDelloStregone, scuolaDiMagia.getKey -> scuolaDiMagia, miniera.getKey -> miniera)

		//Creo la mappa di UnitPossession del nuovo utente per ogni unità disponibile
		val mapUnitPossession = DataFactory.getUnitsMap.map {
			case (key: String, unit: `Unit`) => (key, new UnitPossession(0, unit))
		}
		//Lo doto di due unità Lavoratore
		mapUnitPossession("Lavoratore").setQuantity(2)

		val userData = new UserData(authentication, mapOwnedResources, mapBuildingPossession, mapUnitPossession)
		userData
	}

	/**
	 * Controlla i dati in input e li valida restituendo la lista degli errori.
	 * @param mapData Mappa contenete i parametri in input alla registrazione.
	 * @return La lista degli errori.
	 */
	def validateInput(mapData: Map[String, String]): ArrayBuffer[String] = {
		val errors = new ArrayBuffer[String]

		//Controllo che l'user sia bene formtata: solo caratteri esadecimali e _, lunga tra 4 e 14 caratteri compresi
		val user = mapData("user")
		val userlMatch = new Regex("^\\w{4,14}$").findFirstMatchIn(user)
		userlMatch match {
			case Some(s) => //Non fai niente
			case None => errors += "RInvalidUser"
		}

		val email = mapData("email")
		//Controllo che l'email sia bene formtata: qualsiasi caratteri seguito da un @ e un dominio, lunga massimo 100 caratteri
		if (email.length > 100)
			errors += "RInvalidEmail"
		else
		{
			val emailMatch = new Regex("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$").findFirstMatchIn(email)
			emailMatch match {
				case Some(s) => //Non fai niente
				case None => errors += "RInvalidEmail"
			}
		}

		val password = mapData("password1")
		//Controllo che la password sia formata da almeno un numero e almeno un carattere, sia lungo 8 caratteri minimo e 16 massimo
		val passwordMatch = new Regex("^(?=.*\\d)(?=.*[a-zA-Z]).{8,16}$").findFirstMatchIn(password)
		passwordMatch match {
			case Some(s) => //Non fai niente
			case None => errors += "RInvalidPassword"
		}

		if(mapData("password2") != password)
			errors += "RNonMatchingPassword"

		errors
	}

	/**
	 * Metodo che esegue la registrazione di un nuovo utente.
	 * @param userdata Dati dell'utente su cui verrà effettuata l'operazione.
	 * @param data Dati accompagnatori alla richiesta dell'operazione.
	 * @param loginAuthorization Autorizzazione a operare richieste di login. Di default è false.
	 * @param registrationAuthorization Autorizzazione a operare richieste di registrazione. Di default è false.
	 * @param userAuthorization Autorizzazione a operare richieste di user. Di default è false.
	 * @param internalAuthorization Autorizzazione a operare richieste interne. Di default è false.
	 * @return Stringa di risposta.
	 */
	def execute(userdata: UserData, data: String, loginAuthorization: Boolean = false, registrationAuthorization: Boolean = false,
	            userAuthorization: Boolean = false, internalAuthorization: Boolean = false): String = {
		if (registrationAuthorization) {
			val mapData = decodeData(data)
			var answer = ""
			try {
				val errors = validateInput(mapData)

				//Se ci sono stati errori ritorno la home page con gli errori segnalati
				if(errors.length > 0)
					return PageFactory.getHomePageWithErrors(mapData,errors)

				//Tento di inserire e valuto i risultati.
				val result: Int = DataBaseManager.insertNewUser(createNewUser(mapData("user"), mapData("email"), mapData("password1")))

				result match {
					case 1 => answer = PageFactory.getHomePageRegistrationSuccessful
					case 2 => errors += "RExistingUser"
					case 3 => errors += "RExistingEmail"
					case 4 => answer = PageFactory.getHomePageServiceIsDown
				}

				//Se ci sono stati errori ritorno la home page con gli errori segnalati
				if(errors.length > 0)
					return PageFactory.getHomePageWithErrors(mapData,errors)

				answer
			}
			catch {
				case _: NoSuchElementException => return "{data: false, parameters: false}"
			}
		}
		else
			"{data: false, unauthorized: true}"
	}
}
