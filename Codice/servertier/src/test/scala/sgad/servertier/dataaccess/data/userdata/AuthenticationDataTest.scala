/**
 * FILE: AuthenticationDataTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/data/userdata
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Segantin Fabio
 */

import org.scalatest._
import sgad.servertier.dataaccess.data.userdata.AuthenticationData

/**
 * Classe di Test per la classe AuthenticationData
 */
class AuthenticationDataTest extends FlatSpec with PrivateMethodTester {
	val setHashPassword = PrivateMethod[Unit]('setHashPassword)

	"una AuthenticationDataTest" must "essere costruito solo con valori validi altrimenti lancia eccezione" in {
		intercept[IllegalArgumentException] {
			new AuthenticationData(null, "due", "tre")
		}
		intercept[IllegalArgumentException] {
			new AuthenticationData("uno", null, "tre")
		}
		intercept[IllegalArgumentException] {
			new AuthenticationData("uno", "due", null)
		}
		intercept[IllegalArgumentException] {
			new AuthenticationData("uno", null, null)
		}
		intercept[IllegalArgumentException] {
			new AuthenticationData(null, "due", null)
		}
		intercept[IllegalArgumentException] {
			new AuthenticationData(null, null, "tre")
		}
		intercept[IllegalArgumentException] {
			new AuthenticationData(null, null, null)
		}
		intercept[IllegalArgumentException] {
			new AuthenticationData("uno", "due", "tre").setHashPassword(null)
		}
		new AuthenticationData("uno", "due", "tre")
	}
	it must "mantenere la stessa email passata durante il costruttore" in {
		val authentication = new AuthenticationData("uno", "due", "tre")
		assert(authentication.getEmail == "due")
	}
	it must "mantenere lo stesso username passato al costruttore" in {
		val authentication = new AuthenticationData("uno", "due", "tre")
		assert(authentication.getUser == "uno")
	}
	it must "mantenere la hashPassword in maniera adeguata a seconda del costruttore o del metodo setter" in {
		val authentication = new AuthenticationData("uno", "due", "tre")
		assert(authentication.getHashPassword == "tre")
		val hash = authentication.getHashPassword
		authentication.setHashPassword("pippo")
		assert(hash != authentication.getHashPassword)
		assert(authentication.getHashPassword == "pippo")
		assert(authentication != hash)
	}
  it must "calcolare lo SHA-1 corretto della stringa passata in input" in {
    val authenticationData = new AuthenticationData("utente1", "passwordDiProva2014", "a9c0d4b0b3d5dbfeee15428bc9ad2c58b34748fd")
    assert(authenticationData.getHashPassword.equals(AuthenticationData.computeHash("passwordDiProva2014")))
  }
}