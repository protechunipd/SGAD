/**
 * FILE: LoginTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 24 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-24 - Creazione della classe - Biancucci Maurizio
 */

import sgad.servertier.businesslogic.operations.{Registration, Login}
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import org.scalatest.{BeforeAndAfterAll, FlatSpec}
import akka.actor.{Props, ActorSystem}
import sgad.servertier.presentation.usermanager.{UserActor, IsUserActorAliveRequester, PublisherActor}

/**
 * Classe di test per la classe Registration
 */
class LoginTest extends FlatSpec with BeforeAndAfterAll{
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

	"Se non passo l'autorizzazione di login l'operazione" must  "ritornare \"{data: false, unauthorized: true}\"" in {
		assert(login.execute(null, " ") == "{data: false, unauthorized: true}")
	}

	"Se passo falsa l'autorizzazione di login l'operazione" must  "ritornare \"{data: false, unauthorized: true}\"a" in {
		assert(login.execute(null, " ", loginAuthorization = false) == "{data: false, unauthorized: true}")
	}

	"Se non passo l'user e la password" must  "ritornare \"{data: false, parameters: false}\"" in {
		assert(login.execute(null, " ", loginAuthorization = true) == "{data: false, parameters: false}")
	}

	"Se non passo l'user" must  "ritornare la stringa \"{data: false, parameters: false}\"" in {
		val data = ""
		assert(login.execute(null, data, loginAuthorization = true) == "{data: false, parameters: false}")
	}

	"Se passo l'user e non passo la password" must  "ritornare la stringa \"{data: false, parameters: false}\"" in {
		val data = "user:4232"
		assert(login.execute(null, data, loginAuthorization = true) == "{data: false, parameters: false}")
	}

	"Se passo l'user e la password di un utente non registrato" must  "ritornare la stringa \"Home\"" in {
		val data = "user:4232,password:452342"
		assert(login.execute(null, data, loginAuthorization = true) == "Home")
		assert(login.execute(null, "user:lupçen,password:lupen3rzo", loginAuthorization = true) == "Home")
	}

	"Se passo l'user e la password di un utente registrato" must  "ritornare la stringa \"Canvas\"" in {
		val registrationData = "user:lupen,email:lupen@lupen.com,password1:lupen3rzo,password2:lupen3rzo"
		val loginData = "user:lupen,password:lupen3rzo"
		assert(registration.execute(null, registrationData, registrationAuthorization = true) == "Home")
		assert(login.execute(null, loginData, loginAuthorization = true) == "Canvas")
	}

	"Gli utenti precedentemente registrati" must " essere eliminati con successo" in {
		assert(DataBaseManager.deleteUser("lupen"))
	}

	override def afterAll() {
		actorSystem.shutdown()
	}
}
