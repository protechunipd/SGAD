/**
 * FILE: LoginTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 27 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-27 - Creazione della classe - Biancucci Maurizio
 */

import sgad.servertier.businesslogic.operations.{InternalLogin, Registration}
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import org.scalatest.{BeforeAndAfterAll, FlatSpec}
import akka.actor.{Props, ActorSystem}
import sgad.servertier.presentation.usermanager.{UserActor, IsUserActorAliveRequester, PublisherActor}

/**
 * Classe di test per la classe Registration
 */
class InternalLoginTest extends FlatSpec with BeforeAndAfterAll{
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
	val internalLogin = new InternalLogin

	"Se non passo l'autorizzazione di login l'operazione" must  "ritornare la stringa \"{data: false, unauthorized: true}\"" in {
		assert(internalLogin.execute(null, " ") == "{data: false, unauthorized: true}")
		assert(internalLogin.execute(null, "user:asfLç", internalAuthorization = true) == "No")
	}

	"Se passo falsa l'autorizzazione di login l'operazione" must  "ritornare la stringa \"{data: false, unauthorized: true}\"" in {
		assert(internalLogin.execute(null, " ", internalAuthorization = false) == "{data: false, unauthorized: true}")
	}

	"Se non passo l'user" must  "ritornare la stringa \"Parametri richiesta errati\"" in {
		val data = ""
		assert(internalLogin.execute(null, data, internalAuthorization = true) == "{data: false, parameters: false }")
	}

	"Se passo l'user  di un utente non registrato" must  "ritornare la stringa \"Username inesistente\"" in {
		val data = "user:4232"
		assert(internalLogin.execute(null, data, internalAuthorization = true) == "Username inesistente")
	}

	"Se passo l'user e la password di un utente registrato" must  "ritornare la stringa \"Yes\"" in {
		val registrationData = "user:lupin,email:lupen@lupen.com,password1:lupen3rzo,password2:lupen3rzo"
		val loginData = "user:lupin"
		assert(registration.execute(null, registrationData, registrationAuthorization = true) == "Home")
		assert(internalLogin.execute(null, loginData, internalAuthorization = true) == "Yes")
	}

	"Gli utenti precedentemente registrati" must " essere eliminati con successo" in {
		assert(DataBaseManager.deleteUser("lupin"))
	}

	override def afterAll() {
		actorSystem.shutdown()
	}
}
