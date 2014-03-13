/**
 * FILE: DataBaseManager.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/databaseaccess/databasemanager
 * DATA CREAZIONE: 19 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Creazione della classe - Biancucci Maurizio
 */

import com.mongodb.casbah.Imports._
import org.scalatest.FlatSpec
import scala.collection.{mutable, immutable}
import sgad.servertier.dataaccess.data.shareddata._
import sgad.servertier.dataaccess.data.userdata._
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import sgad.servertier.dataaccess.databaseaccess.userdatadao.BuildingPossessionDAO
import java.io.FileInputStream
import sgad.servertier.businesslogic.operations.Registration

/**
 * Classe di test per la classe DatabaseManager
 */
class DataBaseManagerTest extends FlatSpec {

	val connected = DataBaseManager.connect()
	if (connected)
		println("DATABASE CONNESSO")
	else
		println("DATABASE NON CONNESSO")

	assume(connected)

	"Dopo la connessione al database DataFactory " must " avere la risorsa Oro" in {
		assert(DataFactory.getResource("Oro").getResourceName == "Oro")
	}

	"Dopo la connessione al database DataFactory " must " avere la risorsa Pozioni" in {
		assert(DataFactory.getResource("Pozioni").getResourceName == "Pozioni")
	}

	"La risorsa Carciofi " must "non essere ritornata e lanciata l'eccezione NoSuchElementException" in {
		intercept[NoSuchElementException] {
			DataFactory.getResource("Carciofi")
		}
	}

	"Dopo la connessione al database DataFactory " must " avere l'unità Fante" in {
		assert(DataFactory.getUnit("Fante").getName == "Fante")
	}

	"Dopo la connessione al database DataFactory questo " must " avere l'unità Cavaliere" in {
		assert(DataFactory.getUnit("Cavaliere").getName == "Cavaliere")
	}

	"Dopo la connessione al database DataFactory questo " must " avere l'unità Carro d'assalto" in {
		assert(DataFactory.getUnit("Carro d'assalto").getName == "Carro d'assalto")
	}

	"Dopo la connessione al database DataFactory questo " must " avere l'unità Lavoratore" in {
		assert(DataFactory.getUnit("Lavoratore").getName == "Lavoratore")
	}
	"L'unità Paracadutista" must "non essere ritornata e lanciata l'eccezione NoSuchElementException" in {
		intercept[NoSuchElementException] {
			DataFactory.getUnit("Paracadutista")
		}
	}

	"Dopo la connessione al database DataFactory " must " avere l'edificio MinielaL1" in {
		assert(DataFactory.getBuilding("MinieraL1").getKey == "MinieraL1")
	}
	"Dopo la connessione al database DataFactory " must " avere l'edificio MinielaL2" in {
		assert(DataFactory.getBuilding("MinieraL2").getKey == "MinieraL2")
	}
	"Dopo la connessione al database DataFactory " must "non deve avere l'edificio ProfumeriaL500" in {
		intercept[NoSuchElementException] {
			DataFactory.getBuilding("ProfumeriaL500")
		}
	}

	var authentication = new AuthenticationData("uno", "due", "tre")
	var authentication2 = new AuthenticationData("user1", "user9", "hash2")
	var authentication3 = new AuthenticationData("user2", "pass3", "hash3")
	var authentication4 = new AuthenticationData("user3", "pass4", "hash4")
	var authentication5 = new AuthenticationData("user4", "pass5", "hash5")
	var authentication6 = new AuthenticationData("user5", "pass6", "hash6")
	var authentication7 = new AuthenticationData("user6", "pass7", "hash7")
	var authentication8 = new AuthenticationData("user7", "pass8", "hash8")

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
	val userData2 = new UserData(authentication2, mapResourcePoss, mapBuildingPossession, mapUnitPossession)
	val userData3 = new UserData(authentication3, mapResourcePoss, mapBuildingPossession, mapUnitPossession)
	val userData4 = new UserData(authentication4, mapResourcePoss, mapBuildingPossession, mapUnitPossession)
	val userData5 = new UserData(authentication5, mapResourcePoss, mapBuildingPossession, mapUnitPossession)
	val userData6 = new UserData(authentication6, mapResourcePoss, mapBuildingPossession, mapUnitPossession)
	val userData7 = new UserData(authentication7, mapResourcePoss, mapBuildingPossession, mapUnitPossession)
	val userData8 = new UserData(authentication8, mapResourcePoss, mapBuildingPossession, mapUnitPossession)

	val buildingVector: Vector[DBObject] = mapBuildingPossession //recupero il vettore
		.map((couple: (String, BuildingPossession)) => {
		//lo mappo prendendo solo le building
		couple._2 //restituisce il secondo elemento della coppia
	}).toVector //lo casto a vettore
		.map((b: BuildingPossession) => {
		//trasformo le building in MongoObject
		BuildingPossessionDAO.getMongoObject(b)
	})

	"L'user Uno " must "essere inserito senza problemi nel database" in {
		DataBaseManager.deleteUser("uno")
		assert(DataBaseManager.insertNewUser(userData) == 1)
	}

	"L'user Uno " must "essere presente senza problemi nel database" in {
		val loadedUser = DataBaseManager.loadUserData("uno", "tre")
		assert(loadedUser != null)
		assert(loadedUser._1.getAuthenticationData.getUser == "uno")
	}

	"Non " must "riuscire a inserire un utente con lo stesso user e la stessa mail nel database" in {
		assert(DataBaseManager.insertNewUser(userData) == 2)
	}

	"Non " must "riuscire a inserire un utente con lo stesso user ma mail diversa nel database" in {
		val authentication = new AuthenticationData("uno", "due3", "tre")
		val userData = new UserData(authentication, mapResourcePoss, mapBuildingPossession, mapUnitPossession)
		assert(DataBaseManager.insertNewUser(userData) == 2)
	}

	"Non " must "riuscire a inserire un utente con la stessa mail ma diversa user nel database" in {
		val authentication = new AuthenticationData("uno2", "due", "tre")
		val userData = new UserData(authentication, mapResourcePoss, mapBuildingPossession, mapUnitPossession)
		assert(DataBaseManager.insertNewUser(userData) == 3)
	}

	"L'user Uno " must "essere aggiornato correttamente nel database" in {
		userData.getAuthenticationData.setHashPassword("NuovaPassowrd")
		assert(DataBaseManager.save(userData))
		val loadedUser = DataBaseManager.loadUserData("uno", "NuovaPassowrd")
		assert(loadedUser._1.getAuthenticationData.getUser == "uno" && loadedUser._1.getAuthenticationData.getHashPassword == "NuovaPassowrd")
	}

	"L'user Uno " must "essere rimosso senza problemi dal database" in {
		assert(DataBaseManager.deleteUser("uno"))
		assert(DataBaseManager.loadUserData("uno", "NuovaPassowrd") == (null, 1))
	}

	"La chiamata a loadRandomUsers con parametro number < 0 " must "sollevare IllegalArgumentException" in {
		intercept[IllegalArgumentException] {
			DataBaseManager.loadRandomUsers("user1", -1)
		}
	}

	"La chiamata a loadRandomUsers inserendo come parametro number un numero >= 1 ma minore del numero di utenti presenti nel database " must "restituire una lista di number numeri random" in{
		// elimino eventuali utenti già presenti
		DataBaseManager.deleteUser("uno")
		DataBaseManager.deleteUser("user1")
		DataBaseManager.deleteUser("user2")
		DataBaseManager.deleteUser("user3")
		DataBaseManager.deleteUser("user4")
		DataBaseManager.deleteUser("user5")
		DataBaseManager.deleteUser("user6")
		DataBaseManager.deleteUser("user7")

		// creo alcuni utenti
		DataBaseManager.insertNewUser(userData)
		DataBaseManager.insertNewUser(userData2)
		DataBaseManager.insertNewUser(userData3)
		DataBaseManager.insertNewUser(userData4)
		DataBaseManager.insertNewUser(userData5)
		DataBaseManager.insertNewUser(userData6)
		DataBaseManager.insertNewUser(userData7)
		DataBaseManager.insertNewUser(userData8)

		// invoco loadRandomUsers
		val listaRandom = DataBaseManager.loadRandomUsers("user3", 4)
		assert(listaRandom.size == 4)

		// elimino gli utenti appena creati
		DataBaseManager.deleteUser("uno")
		DataBaseManager.deleteUser("user1")
		DataBaseManager.deleteUser("user2")
		DataBaseManager.deleteUser("user3")
		DataBaseManager.deleteUser("user4")
		DataBaseManager.deleteUser("user5")
		DataBaseManager.deleteUser("user6")
		DataBaseManager.deleteUser("user7")
	}
}