/**
 * FILE: LogoutTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 25Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-25 - Creazione della classe - Biancucci Maurizio
 */

import sgad.servertier.businesslogic.operations.{Logout, Registration, Login}
import sgad.servertier.dataaccess.data.userdata.{AuthenticationData, UserData}
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import org.scalatest.{BeforeAndAfterAll, FlatSpec}
import akka.actor.{Props, ActorSystem}
import sgad.servertier.presentation.usermanager.{UserActor, IsUserActorAliveRequester, PublisherActor}

/**
 * Classe di test per la classe Logout
 */
class LogoutTest extends FlatSpec with BeforeAndAfterAll {
	//Creazione dell'actor System che gestirà gli attori Akka
	implicit val actorSystem = ActorSystem("sgadSystem")

	//Creo e attivo l'attore Publisher per l'inoltro dei messaggi agli attori
	val publisher = actorSystem.actorOf(Props[PublisherActor], "PublisherActor")

	IsUserActorAliveRequester.inizializeActorFactory(actorSystem)
	UserActor.inizializeActorFactory(actorSystem)

	val connected = DataBaseManager.connect()
	if (connected)
		println("DATABASE CONNESSO")
	else
		println("DATABASE NON CONNESSO")

	assume(connected)

	val registration = new Registration
	val login = new Login
	val logout = new Logout

	var userData: UserData = null

	"Se passo l'user e la password di un utente registrato" must "ritornare la stringa \"Canvas\"" in {
		val registrationData = "user:lupenQuarto,email:lupenQuarto@lupen.com,password1:lupen3rzo,password2:lupen3rzo"
		val loginData = "user:lupenQuarto,password:lupen3rzo"
		assert(registration.execute(null, registrationData, registrationAuthorization = true) == "Home")
		assert(login.execute(null, loginData, loginAuthorization = true) == "Canvas")
		userData = DataBaseManager.loadUserData("lupenQuarto", AuthenticationData.computeHash("lupen3rzo"))._1
		assert(userData != null)
	}

	"Effettuato prima il login l'user lupenQuarto" must "essere riconosciuto come vivo nel sistema" in {
		Thread.sleep(2500)
		assert(IsUserActorAliveRequester.isAlive("lupenQuarto"))
	}

	"Dopo richiesto il logout l'user lupenQuarto" must "essere riconosciuto come morto nel sistema" in {
		assert(logout.execute(userData, "authentication:" + userData.getAuthenticationData.getAuthenticationString, userAuthorization = true) ==
			"Logout effettuato con successo")
		Thread.sleep(2500)
		assert(!IsUserActorAliveRequester.isAlive("lupenQuarto"))
	}

	"Se passo l'autorizzazione user e un userData ma l'authorizationStringErrata" must "ritornare la stringa \"{data: false, authentication: false}\"" in {
		val data = "authentication:dawaw"
		assert(logout.execute(userData, data, userAuthorization = true) == "{data: false, authentication: false}")
	}

	"Se non passa l'autorizzazione" must "ritornare la stringa \"{data: false, unauthorized: true}\" " in {
		assert(logout.execute(userData, "authentication:" + userData.getAuthenticationData.getAuthenticationString, userAuthorization = false) == "{data: false, unauthorized: true}")
	}

	"Se non ha i parametri giusti" must "ritornare \"{data: false, parameters: false }\"" in {
		assert(logout.execute(userData, "", userAuthorization = true) == "{data: false, parameters: false }")
	}

	"Gli utenti precedentemente registrati" must " essere eliminati con successo" in {
		assert(DataBaseManager.deleteUser("lupenQuarto"))
	}

	override def afterAll() {
		actorSystem.shutdown()
	}
}