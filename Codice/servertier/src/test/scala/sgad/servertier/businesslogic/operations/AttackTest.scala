/**
 * FILE: ReceiveAttackTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 07 Marzo 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-03-07 - Creazione della classe - Segantin Fabio
 */

import akka.actor.ActorSystem
import org.scalatest.{PrivateMethodTester, BeforeAndAfterAll, FlatSpec}
import scala.collection.mutable
import sgad.servertier.application.Application
import sgad.servertier.businesslogic.operations.{OperationFactory, Attack, Registration}
import sgad.servertier.dataaccess.data.shareddata._
import sgad.servertier.dataaccess.data.userdata._
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import sgad.servertier.presentation.pagemanager.PageFactory
import sgad.servertier.presentation.usermanager.UserActor

/**
 * Classe di test per il ReceiveAttack.
 */
class AttackTest extends FlatSpec with BeforeAndAfterAll with PrivateMethodTester {

	/*
	//Da usare a posto di Application main

	val connected = DataBaseManager.connect()
	if (connected)
		println("DATABASE CONNESSO")
	else
		println("DATABASE NON CONNESSO")

	assume(connected)

	//Creazione dell'actor System che gestirà gli attori Akka
	implicit val actorSystem = ActorSystem("sgadSystem")

	//Inizializzo passando l'actorSystem dandogli la possibilità di creare attori
	IsUserActorAliveRequester.inizializeActorFactory(actorSystem)

	//Inizializzo passando l'actorSystem dandogli la possibilità di creare attori
	UserActor.inizializeActorFactory(actorSystem)

	//Inizializzo passando l'actorSystem dandogli la possibilità di creare attori
	InternalRequester.inizializeActorFactory(actorSystem)

	//Creo e attivo l'attore Publisher per l'inoltro dei messaggi agli attori
	val publisher = actorSystem.actorOf(Props[PublisherActor], "PublisherActor")
	*/

	Application.main(new Array[String](0))

	override def afterAll(){
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
	val gold = new Resource("oro")
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

	registration.execute(null, "user:lupindue,email:lupen2@lupen.com,password1:lupen3rzo,password2:lupen3rzo", registrationAuthorization = true)
	val userData = registration invokePrivate createNewUser("lupinuno", "lupen@lupen.com", "tre")
	println(userData.getAuthenticationData.getAuthenticationString)

	val attack = new Attack

	"Attack" must "Rifiutare le richieste non autorizzate correttamente" in {
		userData.getOwnedUnit("Fante").setQuantity(10)
		assert(attack.execute(userData, "{user:lupindue,Fante:50,Cavaliere:90,Carro d'assalto:0}", userAuthorization = false) == "{data: false, unauthorized: true}")
		assert(attack.execute(userData, "{user:lupindue,authentication:pippo,Fante:50,Cavaliere:90,Carro d'assalto:0}", userAuthorization = true) == "{data: false, authentication: false}")
		assert(attack.execute(userData, "{user:lupindue,authentication:e4694d97ebc260b158cba66d032c5b3f0e65fa55,Fante:50,Cavaliere:90,Carro d'assalto:0}", userAuthorization = true) == "{data: false, owned:false}")
	}
	it must "effettuare l'attacco se i dati sono corretti" in {
		userData.getOwnedUnit("Fante").setQuantity(50)
		userData.getOwnedUnit("Cavaliere").setQuantity(90)
		val result = attack.execute(userData, "user:lupindue,authentication:e4694d97ebc260b158cba66d032c5b3f0e65fa55,Fante:50,Cavaliere:90,Carro d'assalto:0,Lavoratore:0", userAuthorization = true)
		println("RISULTATO DELL'ATTACCO: "+result)
		assert(result contains "result")
		if (result contains "result:true")
			assert(userData.isUserAttacked("lupindue"))

	}
	it must "effettuare l'attacco anche dopo il logout" in {
		UserActor.sendLogoutRequest("lupindue")
		Thread.sleep(5000)
		userData.getOwnedUnit("Fante").setQuantity(50)
		userData.getOwnedUnit("Cavaliere").setQuantity(90)
		val result = attack.execute(userData, "user:lupindue,authentication:e4694d97ebc260b158cba66d032c5b3f0e65fa55,Fante:50,Cavaliere:90,Carro d'assalto:0,Lavoratore:0", userAuthorization = true)
		println("RISULTATO DELL'ATTACCO: " + result)
		assert(result contains "result")
		if (result contains "result:true")
			assert(userData.isUserAttacked("lupindue"))

	}
	it must "non effettuare l'attacco se l'utente non esiste" in {
		assume(OperationFactory.getOperation("InternalLogin").execute(userData, "user:Chuck_Norris", internalAuthorization = true) contains "Username inesistente")
		val result = attack.execute(userData, "user:Chuck_Norris,authentication:e4694d97ebc260b158cba66d032c5b3f0e65fa55,Fante:50,Cavaliere:90,Carro d'assalto:0,Lavoratore:0", userAuthorization = true)
		assert(result contains "data: false, otherUser: false")
	}
}
