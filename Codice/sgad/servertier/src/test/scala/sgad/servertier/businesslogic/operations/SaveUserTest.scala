/**
 * FILE: SaveUserTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 26 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-26 - Creazione della classe - Biancucci Maurizio
 */

import sgad.servertier.businesslogic.operations.{SaveUser, Registration}
import sgad.servertier.dataaccess.data.userdata.AuthenticationData
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import org.scalatest.FlatSpec

/**
 * Classe di test per la classe SaveUser
 */
class SaveUserTest extends FlatSpec {
	val connected = DataBaseManager.connect()
	if (connected)
		println("DATABASE CONNESSO")
	else
		println("DATABASE NON CONNESSO")

	assume(connected)

	val registration = new Registration
	val saveUser = new SaveUser

	"Se registro 6 user con nomi e email simili" must "ritornare tutte le volte la stringa \"Home\"" in {
		val data1 = "user:user1,email:user1@gmail.com,password1:123456789012345a,password2:123456789012345a"
		val data2 = "user:user2,email:user2@gmail.com,password1:123456789012345a,password2:123456789012345a"
		val data3 = "user:user,email:user@gmail.com,password1:123456789012345a,password2:123456789012345a"
		val data4 = "user:userr,email:userr@gmail.com,password1:123456789012345a,password2:123456789012345a"
		val data5 = "user:uuser1,email:ciao@gmail.com,password1:123456789012345a,password2:123456789012345a"
		val data6 = "user:11user11,email:ciao3@gmail.com,password1:123456789012345a,password2:123456789012345a"
		val data7 = "user:ciao@gmail.com,email:11user11gmail.com@gmail.com,password1:123456789012345a,password2:123456789012345a"
		assert(registration.execute(null, data1, registrationAuthorization = true) == "Home")
		assert(registration.execute(null, data2, registrationAuthorization = true) == "Home")
		assert(registration.execute(null, data3, registrationAuthorization = true) == "Home")
		assert(registration.execute(null, data4, registrationAuthorization = true) == "Home")
		assert(registration.execute(null, data5, registrationAuthorization = true) == "Home")
		assert(registration.execute(null, data6, registrationAuthorization = true) == "Home")
		assert(registration.execute(null, data7, registrationAuthorization = true) == "Home")
	}

	"Se carico l'utente user prima registrato e lo modifico, lo salvo nel database e lo ricarico " must "trovare le nodifiche eseguite" in {
		assert(DataBaseManager.loadUserData("user", AuthenticationData.computeHash("123456789012345a"))._1 != null)
		val beforeUserData = DataBaseManager.loadUserData("user", AuthenticationData.computeHash("123456789012345a"))._1
		beforeUserData.getOwnedResource("Oro").setQuantity(500)
		assert(beforeUserData.getOwnedResource("Oro").getQuantity == 500)
		beforeUserData.getOwnedUnit("Lavoratore").setQuantity(1000)
		assert(beforeUserData.getOwnedUnit("Lavoratore").getQuantity == 1000)
		println("Before fare la save")
		assert(saveUser.execute(beforeUserData, "", internalAuthorization = true) == "Yes")
		assert(saveUser.execute(beforeUserData, "", internalAuthorization = false) == "{data: false, unauthorized: true}")
		println("After fare la save")
		val afterUserData = DataBaseManager.loadUserData("user", AuthenticationData.computeHash("123456789012345a"))._1
		assert(afterUserData.getOwnedResource("Oro").getQuantity == 500)
		assert(afterUserData.getOwnedUnit("Lavoratore").getQuantity == 1000)
	}

	"Gli utenti precedentemente registrati" must " essere eliminati con successo" in {
		assert(DataBaseManager.deleteUser("user1"))
		assert(DataBaseManager.deleteUser("user2"))
		assert(DataBaseManager.deleteUser("user"))
		assert(DataBaseManager.deleteUser("userr"))
		assert(DataBaseManager.deleteUser("uuser1"))
		assert(DataBaseManager.deleteUser("11user11"))
		assert(DataBaseManager.deleteUser("ciao@gmail.com"))
		assert(DataBaseManager.loadUserData("user1", AuthenticationData.computeHash("123456789012345a")) ==(null, 1))
		assert(DataBaseManager.loadUserData("user2", AuthenticationData.computeHash("123456789012345a")) ==(null, 1))
		assert(DataBaseManager.loadUserData("user", AuthenticationData.computeHash("123456789012345a")) ==(null, 1))
		assert(DataBaseManager.loadUserData("userr", AuthenticationData.computeHash("123456789012345a")) ==(null, 1))
		assert(DataBaseManager.loadUserData("uuser1", AuthenticationData.computeHash("123456789012345a")) ==(null, 1))
		assert(DataBaseManager.loadUserData("11user11", AuthenticationData.computeHash("123456789012345a")) ==(null, 1))
		assert(DataBaseManager.loadUserData("ciao@gmail.com", AuthenticationData.computeHash("123456789012345a")) ==(null, 1))
	}
}
