/**
 * FILE: RegistrationTest.scala
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

import sgad.servertier.businesslogic.operations.Registration
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import org.scalatest.FlatSpec

/**
 * Classe di test per la classe Registration
 */
class RegistrationTest extends FlatSpec{
	val connected = DataBaseManager.connect()
	if (connected)
		println("DATABASE CONNESSO")
	else
		println("DATABASE NON CONNESSO")

	assume(connected)

	val registration = new Registration

	"Se non passo l'autorizzazione di registrazione l'operazione" must  " ritonare \"{data: false, unauthorized: true}\"" in {
		assert(registration.execute(null, " ") == "{data: false, unauthorized: true}")
	}

	"Se passo falsa l'autorizzazione di registrazione l'operazione" must  "ritornare \"{data: false, unauthorized: true}\"" in {
		assert(registration.execute(null, " ", registrationAuthorization = false) == "{data: false, unauthorized: true}")
	}

	"Se non passo l'user" must  "ritornare la stringa \"{data: false, parameters: false}\"" in {
		val data = ""
		assert(registration.execute(null, data, registrationAuthorization = true) == "{data: false, parameters: false}")
	}

	"Se passo l'user di lunghezza minore di 4" must  "ritornare la stringa \"Home\"" in {
		val data = "user:122,email:k@k.it,password1:ciao1234,password2:ciao1234"
		assert(registration.execute(null, data, registrationAuthorization = true) == "Home")
	}

	"Se passo l'user di lunghezza maggiore di 14" must  "ritornare la stringa \"Home\"" in {
		val data = "user:123456789012345,email:k@k.it,password1:ciao1234,password2:ciao1234"
		assert(registration.execute(null, data, registrationAuthorization = true) == "Home")
	}

	"Se passo l'user di lunghezza uguale a 14" must  "ritornare la stringa \"Home\"" in {
		val data = "user:12345678901234,email:k@k.it,password1:ciao1234,password2:ciao1234"
		assert(registration.execute(null, data, registrationAuthorization = true) =="Home")
		assert(DataBaseManager.internalLoadUserData("12345678901234")._1 != null)
		assert(DataBaseManager.deleteUser("12345678901234"))
	}

}
