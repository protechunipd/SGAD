/**
 * FILE: DeleteAccountTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/servertier/businesslogic/operations
 * DATA CREAZIONE: 7 Marzo 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-03-07 - Creazione della classe - Biancucci Maurizio
 */

import sgad.servertier.businesslogic.operations.{DeleteAccount, Registration}
import sgad.servertier.dataaccess.data.userdata.UserData
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import org.scalatest.{BeforeAndAfterAll, PrivateMethodTester, FlatSpec}

/**
 * Classe di test per la classe DeleteAccount
 */
class DeleteAccountTest extends FlatSpec with PrivateMethodTester with BeforeAndAfterAll {
	val connected = DataBaseManager.connect()
	if (connected)
		println("DATABASE CONNESSO")
	else
		println("DATABASE NON CONNESSO")

	assume(connected)

	override def afterAll() {
		assert(DataBaseManager.deleteUser("user45"))
	}

	val createNewUser = PrivateMethod[UserData]('createNewUser)

	val registration = new Registration
	val deleteAccount = new DeleteAccount

	"Se non passo l'autorizzazione di registrazione l'operazione" must " ritonare \"{data: false, unauthorized: true}\"" in {
		assert(deleteAccount.execute(null, " ") == "{data: false, unauthorized: true}")
	}

	"Se passo falsa l'autorizzazione di user l'operazione" must "ritornare \"{data: false, unauthorized: true}\"" in {
		assert(deleteAccount.execute(null, " ", userAuthorization = false) == "{data: false, unauthorized: true}")
		assert(deleteAccount.execute(userData, " ", userAuthorization = true) == "{data: false, parameters: false}")
	}

	val userData = registration invokePrivate createNewUser("user45", "emal@sgad.it", "pass")

	"Se passo l'autorizzazione user e un userData ma l'authorizationStringErrata" must "ritornare la stringa \"{data: false, authentication: false}\"" in {
		val data = "authentication:dawaw,user:user45,email:emal@sgad.it,password:pass"
		assert(deleteAccount.execute(userData, data, userAuthorization = true) == "{data: false, authentication: false}")
	}

	"Se passo l'autorizzazione user e un userData non registrato" must "ritornre \"{data: true}\"" in {
		val data = "authentication:dawaw,user:user45,email:emal@sgad.it,password:pass"
		assert(deleteAccount.execute(userData, data, userAuthorization = true) != "{data: true}")
	}

	"Se passo l'autorizzazione user e un userData" must "eliminare un utente registrato dal database" in {

		val data = "user:user45,email:emal@sgad.it,password1:pass,password2:pass"
		assert(registration.execute(null, data, registrationAuthorization = true) == "Home")

		val data2 = "authentication:" + userData.getAuthenticationData.getAuthenticationString
		assert(deleteAccount.execute(userData, data2, userAuthorization = true) != "")

		assert(DataBaseManager.internalLoadUserData("user45") ==(null, 1))
		assert(DataBaseManager.deleteUser("user45"))
	}
}
