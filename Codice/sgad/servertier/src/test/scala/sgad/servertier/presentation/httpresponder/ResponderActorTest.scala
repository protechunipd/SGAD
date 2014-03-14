/**
 * FILE: ResponderActorTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/presentation/httpresponder
 * DATA CREAZIONE: 19 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Creazione della classe - Biancucci Maurizio
 * 2014-03-12 - Stesura Classe - Segantin Fabio
 */

import org.scalatest.{WordSpec, BeforeAndAfterAll}
import akka.testkit.TestProbe
import akka.actor._
import scala.collection.{mutable, immutable}
import scala.concurrent.duration.FiniteDuration
import sgad.servertier.businesslogic.operations.OperationFactory
import sgad.servertier.dataaccess.data.shareddata._
import sgad.servertier.dataaccess.data.userdata._
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import sgad.servertier.presentation.httpresponder.ResponderActor
import sgad.servertier.presentation.pagemanager.PageFactory
import spray.httpx.RequestBuilding._
import spray.util._
import spray.http._
import spray.http.MediaTypes._
import HttpCharsets._

/**
 * Classe di test per la classe ResponderActor
 */
class ResponderActorTest extends WordSpec with BeforeAndAfterAll {

	//Creazione dell'actor System che gestirà gli attori Akka
	//implicit val actorSystem = ActorSystem("sgadSystem")


	//Ottengo la working directory di base
	private val workingDirectory: String = System.getProperty("user.dir")
	System.out.println("The Current Working Directory is ::"+workingDirectory)

	//Creo l'attore che getirà le richieste Http
	//private val service = actorSystem.actorOf(Props(classOf[ResponderActor], workingDirectory), "ResponderActor")
	val system = ActorSystem(Utils.actorSystemNameFrom(getClass))
	val rootActor = system.actorOf(Props(classOf[ResponderActor], workingDirectory))
	val registration = OperationFactory.getOperation("Registration")

	var authentication = new AuthenticationData("pippo", "due", AuthenticationData.computeHash("ciao1234"))

	//Creo due uniPossession e la mappa per costruire un userData
	val gold = new Resource("Oro")
	val potion = new Resource("Pozioni")
	val chap = new `Unit`("Fante", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	val horse = new `Unit`("Cavallo", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	val chapUp = new UnitPossession(10, chap)
	val knightUp = new UnitPossession(15, chap)
	val mapUnitPossession = immutable.Map(chapUp.getKey -> chapUp, knightUp.getKey -> knightUp)

	//Creo una buildingpossession e la mappa per creare l'userdata
	var timeNow = 1392902385004L
	val quantityResource = Array[QuantityResource]()
	var preconditions = Vector[BuildingWithLevel]()
	var bonus = new Bonus("bonus1", 2, 3)
	var potion1 = new Resource("Pozioni")
	var quantityResourceVector = Vector(new QuantityResource(gold, 100), new QuantityResource(potion1, 300))
	var cost = new Cost(1000, quantityResourceVector)
	var productedResource1 = new ProductedResource(gold, 50, 100, 800)
	var productedUnit1 = Vector[`Unit`]()
	var productedUnit2 = new `Unit`("Fante", 1, 3, cost, true)
	var buildingWithLevel1 = new BuildingWithLevel(true, bonus, cost, 2, "Stalla", preconditions, productedResource1, productedUnit1, 2, false)
	var buildingWithLevel2 = new BuildingWithLevel(true, bonus, cost, 2, "Miniera", preconditions, productedResource1, productedUnit1, 2, false)
	var position = new Position(3, 8)
	var position2 = new Position(1, 12)
	var unitInProgress = new UnitInProgress(productedUnit2, 1392902384789L, 1)
	val buildingPossession1 = new BuildingPossession(buildingWithLevel1, position, true, 1392902385004L, unitInProgress)
	val buildingPossession2 = new BuildingPossession(buildingWithLevel1, position2, true, 1392902385004L, unitInProgress)
	val buildingPossession3 = new BuildingPossession(buildingWithLevel2, position2, true, 1392902385004L, unitInProgress)
	val mapBuildingPossession = mutable.Map(buildingPossession1.getKey -> buildingPossession1, buildingPossession2.getKey -> buildingPossession2)

	//Creo la mappa di possessione risorse per l'utente
	val ownedPotions = new OwnedResource(potion1, 100)
	val ownedGold = new OwnedResource(gold, 200)
	val mapResourcePoss: immutable.Map[String, OwnedResource] = immutable.Map(ownedGold.getKey -> ownedGold, ownedPotions.getKey -> ownedPotions)

	val userData = new UserData(authentication, mapResourcePoss, mapBuildingPossession, mapUnitPossession)
	DataBaseManager.insertNewUser(userData)

	"La route del ResponderActor" must {

		"ritornare la home page se richiesta la root del sistema" in {
			val probe = TestProbe()(system)
			probe.send(rootActor, Get("/"))
			probe.expectMsg(HttpResponse(entity = HttpEntity(ContentType(`text/html`, `UTF-8`), PageFactory.getHomePage)))
		}
		"ritornare una pagina corretta se riceve una richiesta di login" in {
			val probe = TestProbe()(system)
			probe.send(rootActor, Get("/login"))
			probe.expectMsg(HttpResponse(entity = HttpEntity(ContentType(`text/html`, `UTF-8`), PageFactory.getHomePage)))
			probe.send(rootActor, Post("/login", FormData(Map("user" -> "pippo", "password" -> "ciao34"))))
			probe.expectMsg(HttpResponse(entity = HttpEntity(ContentType(`text/html`, `UTF-8`), PageFactory.getHomePage)))
			probe.send(rootActor, Post("/login", FormData(Map("user" -> "pippo", "password" -> "ciao1234"))))
			probe.expectMsg(HttpResponse(entity = HttpEntity(ContentType(`text/html`, `UTF-8`), "{data: false, parameters: false}")))
		}
		"ritornare una pagina corretta se riceve una richiesta di registration" in {
			val probe = TestProbe()(system)
			probe.send(rootActor, Get("/registration"))
			probe.expectMsg(HttpResponse(entity = HttpEntity(ContentType(`text/html`, `UTF-8`), PageFactory.getHomePage)))
			probe.send(rootActor, Post("/registration", FormData(Map("user" -> "pippo", "email" -> "pippo@pippo.pippo", "password1" -> "ciao34", "password2" -> "ciao34"))))
			probe.expectMsg(HttpResponse(entity = HttpEntity(ContentType(`text/html`, `UTF-8`), PageFactory.getHomePage)))
			probe.send(rootActor, Post("/registration", FormData(Map("user" -> "pippolo", "email" -> "pippo@pippo.pippo", "password1" -> "ciao34", "password2" -> "ciao34"))))
			probe.expectMsg(FiniteDuration(30, "seconds"), HttpResponse(entity = HttpEntity(ContentType(`text/html`, `UTF-8`), PageFactory.getHomePage)))
		}
		"ritornare una pagina corretta se riceve una richiesta di user" in {
			val probe = TestProbe()(system)
			probe.send(rootActor, Post("/user", FormData(Map("user" -> "pippo", "operation" -> "HarvestResource", "data" -> "TUA MADRE"))))
			probe.expectNoMsg(FiniteDuration(1, "seconds"))
		}
	}

	override def afterAll() = {
		DataBaseManager.deleteUser("pippo")
		system stop rootActor
		system.shutdown()
	}

}