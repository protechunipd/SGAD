/**
 * FILE: AuthenticationDataDAOTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/databaseaccess/userdatadao
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Nessi Alberto
 */

import sgad.servertier.dataaccess.data.shareddata.DataFactory
import sgad.servertier.dataaccess.data.userdata.AuthenticationData
import sgad.servertier.dataaccess.databaseaccess.userdatadao.AuthenticationDataDAO
import com.mongodb.casbah.commons.Imports.MongoDBObject
import org.scalatest._
import org.joda.time.IllegalFieldValueException

/**
 * Classe di test per l'object AuthenticationDataDAO
 */
class AuthenticationDataDAOTest extends FlatSpec {

	DataFactory.setUnits(Map())
	DataFactory.setResources(Map())
	DataFactory.setBuildings(Map())
	val authenticationData = new AuthenticationData("usernameTest", "emailDiTest", "hashDellaPassword")
	val mongoObject = MongoDBObject("user" -> "usernameTest", "email" -> "emailDiTest", "hashPassword" -> "hashDellaPassword")

	"AuthenticationDataDAO" must "ritornare lo stesso oggetto AuthenticationData solo se riceve il relativo mongoObject" in {
		val mongoObject2 = MongoDBObject("user" -> "usernameTestDue", "email" -> "emailDiTestDue", "hashPassword" -> "hashDellaPasswordDue")
		assert(authenticationData == AuthenticationDataDAO.getObject(mongoObject))
		assert(authenticationData != AuthenticationDataDAO.getObject(mongoObject2))
	}

	it must "ritornare lo stesso mongoobject solo se riceve il relativo authenticationData" in {
		val authenticationData = new AuthenticationData("usernameTest", "emailDiTest", "hashDellaPassword")
		val mongoObject = MongoDBObject("user" -> "usernameTest", "email" -> "emailDiTest", "hashPassword" -> "hashDellaPassword")
		val authenticationData2 = new AuthenticationData("usernameTest", "emailDiTest", "hashDellaPassword222")
		assert(mongoObject == AuthenticationDataDAO.getMongoObject(authenticationData))
		assert(mongoObject != AuthenticationDataDAO.getMongoObject(authenticationData2))
	}
	it must "lanciare una eccezione se il mongoObject non ha le informazioni relative" in {
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject("user" -> 1F, "email" -> "mail@prova.com") // hashPassword assente
			AuthenticationDataDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject("user" -> "nomeUtente", "hashPassword" -> "esempioDiHash") // email assente
			AuthenticationDataDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject("email" -> "mail@prova.com", "hashPassword" -> 42F) // user assente
			AuthenticationDataDAO.getObject(mongoObject2)
		}
	}
	it must "lanciare una eccezione se il tipo dei dati non è corretto" in {
		val mongoObject2 = MongoDBObject("user" -> 42F, "email" -> "mail@prova.com", "hashPassword" -> "esempioDiHash") // user tipo errato
		val mongoObject3 = MongoDBObject("user" -> "nomeUtente", "email" -> 14L, "hashPassword" -> "esempioDiHash") // email tipo errato
		val mongoObject4 = MongoDBObject("user" -> "nomeUtente", "email" -> "mail@prova.com", "hashPassword" -> 65) // hash tipo errato
		intercept[IllegalFieldValueException] {
			AuthenticationDataDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			AuthenticationDataDAO.getObject(mongoObject3)
		}
		intercept[IllegalFieldValueException] {
			AuthenticationDataDAO.getObject(mongoObject4)
		}
	}
}