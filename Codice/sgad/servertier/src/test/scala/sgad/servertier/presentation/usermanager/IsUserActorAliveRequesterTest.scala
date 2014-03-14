/**
 * FILE: IsUserActorAliveRequesterTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/presentation/usermanager
 * DATA CREAZIONE: 26 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-26 - Creazione della classe - Biancucci Maurizio
 */

import sgad.servertier.dataaccess.data.shareddata.{Unit, Resource, DataFactory}
import sgad.servertier.dataaccess.data.userdata._
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import sgad.servertier.presentation.usermanager.{UserActor, IsUserActorAliveRequester, PublisherActor}
import akka.actor._
import org.scalatest.{BeforeAndAfterAll, FlatSpec}

/**
 * Classe di test per la classe e l'object IsUserActorAliveRequester
 */
class IsUserActorAliveRequesterTest extends FlatSpec with BeforeAndAfterAll{
	//Creazione dell'actor System che gestirà gli attori Akka
	implicit val actorSystem = ActorSystem("sgadSystem")

	//Creo e attivo l'attore Publisher per l'inoltro dei messaggi agli attori
	val publisher = actorSystem.actorOf(Props[PublisherActor], "PublisherActor")

	//Inizializzo passando l'actorSystem dandogli la possibilità di creare attori
	IsUserActorAliveRequester.inizializeActorFactory(actorSystem)

	//Inizializzo passando l'actorSystem dandogli la possibilità di creare attori
	UserActor.inizializeActorFactory(actorSystem)

	//Attivo la connessione al database e il caricamento dei dati generali di gioco
	val connected = DataBaseManager.connect()
	if (connected)
		println("DATABASE CONNESSO")
	else
		println("DATABASE NON CONNESSO")

	assume(connected)

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

	"La richiesta isAlive per l'UserActor User1" must "ritornare false poichè non esistente" in {
		assert(!IsUserActorAliveRequester.isAlive("User1"))
	}

	"La richista isAlive per l'UserActor User2" must "ritornare true poichè appena creato" in {
		actorSystem.actorOf(Props(classOf[UserActor], userData), name = "User2" )
		Thread.sleep(5000)
		assert(IsUserActorAliveRequester.isAlive("User2"))
	}

	override def afterAll() {
		actorSystem.shutdown()
	}
}