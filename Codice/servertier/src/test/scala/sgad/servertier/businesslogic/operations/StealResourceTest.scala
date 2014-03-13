/**
 * FILE: StealResourceTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 11 Marzo 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-03-11 - Creazione della classe - Segantin Fabio
 */

import akka.actor.ActorSystem
import org.scalatest.{PrivateMethodTester, BeforeAndAfterAll, FlatSpec}
import scala.collection.mutable
import sgad.servertier.application.Application
import sgad.servertier.businesslogic.operations.{Registration, StealResource}
import sgad.servertier.dataaccess.data.shareddata._
import sgad.servertier.dataaccess.data.userdata._
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import sgad.servertier.presentation.pagemanager.PageFactory

/**
 * Classe di Test per StealResource.
 */
class StealResourceTest extends FlatSpec with BeforeAndAfterAll with PrivateMethodTester {
	Application.main(new Array[String](0))

	override def afterAll() {
		DataBaseManager.deleteUser("lupinuno")
		DataBaseManager.deleteUser("lupindue")
		val actorSystemGetter = PrivateMethod[ActorSystem]('actorSystem)

		val systemActor = Application invokePrivate actorSystemGetter()
		systemActor.shutdown()

		val c = PageFactory.getClass.getDeclaredConstructor()
		c.setAccessible(true)
		c.newInstance()


		println("HOME: " + PageFactory.getHomePage)
	}

	var authentication = new AuthenticationData("lupinuno", "lupen@lupen.com", "tre")
	val createNewUser = PrivateMethod[UserData]('createNewUser)

	val registration = new Registration
	//Creo due uniPossession e la mappa per costruire un userData
	val gold = new Resource("Oro")
	val chap = new `Unit`("Fante", 15, 15, new Cost(10, Vector(new QuantityResource(gold, 200))), true)
	val horse = new `Unit`("Cavaliere", 15, 15, new Cost(20, Vector(new QuantityResource(gold, 200))), true)
	val chapUp = new UnitPossession(10, chap)
	val knightUp = new UnitPossession(15, horse)
	val mapUnitPossession = Map(chapUp.getKey -> chapUp, knightUp.getKey -> knightUp)

	//Creo una buildingpossession e la mappa per creare l'userdata
	var timeNow = System.currentTimeMillis / 1000L
	val quantityResource = Array[QuantityResource]()
	var preconditions = Vector[BuildingWithLevel]()
	var bonus = new Bonus("bonus1", 2, 3)
	var potion = new Resource("pozione")
	var quantityResourceVector = Vector(new QuantityResource(gold, 100), new QuantityResource(potion, 300))
	var cost = new Cost(4, quantityResourceVector)
	var productedResource1 = new ProductedResource(gold, 10, 100, 200)
	var productedUnit1 = Vector[`Unit`]()
	var productedUnit2 = new `Unit`("Fante", 1, 3, new Cost(1, Vector(new QuantityResource(gold, 200))), true)
	var buildingWithLevel1 = new BuildingWithLevel(true, bonus, cost, 2, "Torre", preconditions, null, productedUnit1, 2, false)
	var buildingWithLevel2 = new BuildingWithLevel(true, bonus, cost, 2, "Miniera", preconditions, productedResource1, productedUnit1, 2, false)
	var position = new Position(3, 8)
	var position2 = new Position(1, 12)
	var unitInProgress = new UnitInProgress(productedUnit2, timeNow, 500)
	val buildingPossession1 = new BuildingPossession(buildingWithLevel1, position, false, timeNow, null)
	val buildingPossession2 = new BuildingPossession(buildingWithLevel1, position2, true, timeNow, unitInProgress)
	val buildingPossession3 = new BuildingPossession(buildingWithLevel2, position2, true, timeNow, null)
	val mapBuildingPossession = mutable.HashMap(buildingPossession1.getKey -> buildingPossession1, buildingPossession2.getKey -> buildingPossession2, buildingPossession3.getKey -> buildingPossession3)
	//Creo la mappa di possessione risorse per l'utente
	val ownedPotions = new OwnedResource(potion, 100)
	val ownedGold = new OwnedResource(gold, 200)
	val mapResourcePoss: Map[String, OwnedResource] = Map(ownedGold.getKey -> ownedGold, ownedPotions.getKey -> ownedPotions)

	DataFactory.setResources(Map(gold.getKey -> gold))

	registration.execute(null, "user:lupindue,email:lupen2@lupen.com,password1:lupen3rzo,password2:lupen3rzo", registrationAuthorization = true)
	val userData = registration invokePrivate createNewUser("lupinuno", "lupen@lupen.com", "tre")
	println(userData.getAuthenticationData.getAuthenticationString)

	val steal = new StealResource

	"StealResource" must "" in {
		assert(steal.execute(userData, "{user:lupindue,authentication:e4694d97ebc260b158cba66d032c5b3f0e65fa55,key:MinieraL1X6Y9}", userAuthorization = false) == "{data: false, unauthorized: true}")
		assert(steal.execute(userData, "{user:lupindue,authentication:e4694d97ebc260b158cba66d032c5b3f0e65fa55,key:MinieraL1X6Y9}", userAuthorization = true) == "{data: false, userAttacked: false}")
		assert(steal.execute(userData, "{user:lupindue,authentication:e4694d97ebc260b158cba66d032c5b3f0e65fa,key:MinieraL1X6Y9}", userAuthorization = true) == "{data: false, authentication: false}")
		assert(steal.execute(userData, "{authentication:e4694d97ebc260b158cba66d032c5b3f0e65fa55,key:MinieraL1X6Y9}", userAuthorization = true) == "{data: false, parameters: false}")
		assert(steal.execute(null, "{user:lupindue,authentication:e4694d97ebc260b158cba66d032c5b3f0e65fa55,key:MinieraL1X6Y9}", userAuthorization = true) == "{data: false, internalError: true}")
		userData.addUserAttacked("chuck")
		assert(steal.execute(userData, "{user:chuck,authentication:e4694d97ebc260b158cba66d032c5b3f0e65fa55,key:MinieraL1X6Y9}", userAuthorization = true) contains "otherUser: false")
		userData.addUserAttacked("lupindue")
		userData.getOwnedResource(gold.getKey).setQuantity(0)
		assert(steal.execute(userData, "{user:lupindue,authentication:e4694d97ebc260b158cba66d032c5b3f0e65fa55,key:MinieraL1X6Y9}", userAuthorization = true) contains "data: {")
		assert(userData.getOwnedResource(gold.getKey).getQuantity > 0)
		assert(steal.execute(userData, "{user:lupindue,authentication:e4694d97ebc260b158cba66d032c5b3f0e65fa55,key:MinieraL1X6Y9}", userAuthorization = true) == "{data: false, userAttacked: false}")
		userData.addUserAttacked("lupindue")
		userData.getOwnedResource(gold.getKey).setQuantity(0)
		assert(steal.execute(userData, "{user:lupindue,authentication:e4694d97ebc260b158cba66d032c5b3f0e65fa55,key:MinieraL1X16Y9}", userAuthorization = true) contains "data: {")
		assert(userData.getOwnedResource(gold.getKey).getQuantity == 0)

	}

}
