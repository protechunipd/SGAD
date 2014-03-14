/**
 * FILE: InternalRequesterTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/presentation/usermanager
 * DATA CREAZIONE: 7 Marzo 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-03-07 - Creazione della classe - Biancucci Maurizio
 */

import sgad.servertier.businesslogic.operations.{Login, Registration}
import sgad.servertier.dataaccess.data.shareddata.{Unit, Resource, DataFactory}
import sgad.servertier.dataaccess.data.userdata._
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import sgad.servertier.presentation.usermanager._
import akka.actor._
import org.scalatest.{BeforeAndAfterAll, FlatSpec}

/**
 * Classe di test per la classe e l'object InternalRequester
 */
class InternalRequesterTest extends FlatSpec with BeforeAndAfterAll{
	//Creazione dell'actor System che gestirà gli attori Akka
	implicit val actorSystem = ActorSystem("sgadSystem")

	//Creo e attivo l'attore Publisher per l'inoltro dei messaggi agli attori
	val publisher = actorSystem.actorOf(Props[PublisherActor], "PublisherActor")

	//Inizializzo passando l'actorSystem dandogli la possibilità di creare attori
	IsUserActorAliveRequester.inizializeActorFactory(actorSystem)

	//Inizializzo passando l'actorSystem dandogli la possibilità di creare attori
	UserActor.inizializeActorFactory(actorSystem)

	//Inizializzo passando l'actorSystem dandogli la possibilità di creare attori
	InternalRequester.inizializeActorFactory(actorSystem)

	//Attivo la connessione al database e il caricamento dei dati generali di gioco
	//Se la connessione fallisce fermo l'applicazione
	val connected = DataBaseManager.connect()
	if (connected)
		println("DATABASE CONNESSO")
	else
		println("DATABASE NON CONNESSO")

	assume(connected)

	IsUserActorAliveRequester.inizializeActorFactory(actorSystem)
	val registration = new Registration
	val login = new Login

	val authentication = new AuthenticationData("User2", "dwfqwqwf", AuthenticationData.computeHash("fseEAFEW"))

	//Creo la mappa di OwnedResource del nuovo utente per ogni risorsa disponibile
	val mapOwnedResources = DataFactory.getResourcesMap.map {
		case (key: String, resource: Resource) => (key, new OwnedResource(resource, 0))
	}
	//Creo la mappa di BuildingPossession del nuovo utente
	val now: Long = System.currentTimeMillis/1000L
	val cave = new BuildingPossession(DataFactory.getBuilding("MinieraL1"), new Position(6, 9), true, now, null)
	val mapBuildingPossession = scala.collection.mutable.Map(cave.getKey -> cave)
	//Creo la mappa di UnitPossession del nuovo utente per ogni unità disponibile
	val mapUnitPossession = DataFactory.getUnitsMap.map {
		case (key: String, unit: `Unit`) => (key, new UnitPossession(0, unit))
	}

	val userData = new UserData(authentication, mapOwnedResources, mapBuildingPossession, mapUnitPossession)

	val registrationData = "user:lupen44,email:lupen44@lupen.com,password1:lupen3rzo,password2:lupen3rzo"
	val loginData = "user:lupen44,password:lupen3rzo"
	val authetication = new AuthenticationData("lupen44", "lupen44@lupen.com", AuthenticationData.computeHash("lupen3rzo"))

	"La richiesta interna prima del login" must "fallire" in {
		assert(InternalRequester.sendInternalRequest("lupen44", "ReceiveAttack", "authentication:"+authetication.getAuthenticationString) == "Attore non disponibile")
	}

	"Dopo una registrazione " must "l'attore delll'utente essere attivo nel sistema" in {
		assert(registration.execute(null, registrationData, registrationAuthorization = true) == "Home")
		assert(login.execute(null, loginData, loginAuthorization = true) == "Canvas")

		Thread.sleep(5000)
		assert(IsUserActorAliveRequester.isAlive("lupen44"))

	}

	"La richiesta interna dopo del login" must "avere successo" in {
		assert(InternalRequester.sendInternalRequest("lupen44", "ReceiveAttack", "authentication:"+authetication.getAuthenticationString) != "Attore non disponibile")
	}

	override def afterAll() {
		actorSystem.shutdown()
		DataBaseManager.deleteUser("lupen44")
	}
}