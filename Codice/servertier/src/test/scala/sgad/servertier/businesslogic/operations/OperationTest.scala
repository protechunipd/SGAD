/**
 * FILE: OperationTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Biancucci Maurizio
 */

import scala.collection.mutable.ArrayBuffer
import sgad.servertier.businesslogic.operations.Operation
import sgad.servertier.dataaccess.data.userdata.UserData
import org.scalatest._

/**
 * Classe di test per la classe Operation
 */
class OperationTest extends FlatSpec with PrivateMethodTester {
	val operazione = new Operation {
		def execute(userdata: UserData, data: String, login: Boolean, registration: Boolean, user: Boolean, internalAuthorization: Boolean): String = "prova"
	}
	val decode = PrivateMethod[Map[String, String]]('decodeData)

	"Operation" must "ritornare una mappa corretta in seguito ad un input corretto" in {
		val input = "user:Bishop92,authentication:abcdefghilmnopqrstuvz0123456789,op:upgradeBuilding,x:5,y:6"
		val map: Map[String, String] = operazione invokePrivate decode(input)
		assert(map.get("user").get == "Bishop92")
		assert(map.get("authentication").get == "abcdefghilmnopqrstuvz0123456789")
		assert(map.get("op").get == "upgradeBuilding")
		assert(map.get("x").get == "5")
		assert(map.get("y").get == "6")
	}
	it must "ritornare una mappa vuota se non ci sono elementi validi" in {
		val input = "user"
		val map2: Map[String, String] = operazione invokePrivate decode(input)
		assert(map2.isEmpty)
		val input2 = ""
		val map3: Map[String, String] = operazione invokePrivate decode(input2)
		assert(map3.isEmpty)
	}
	it must "non aggiungere una coppia se non è del tipo chiave:valore" in {
		val input = "user:,authentication:abcdefghilmnopqrstuvz0123456789,op:upgradeBuilding,x:5,y:6"
		val map4: Map[String, String] = operazione invokePrivate decode(input)
		assert(!map4.contains("user"))
		val input2 = ":Bishop92,authentication:abcdefghilmnopqrstuvz0123456789,op:upgradeBuilding,x:5,y:6"
		val map5: Map[String, String] = operazione invokePrivate decode(input2)
		assert(!map5.values.exists(_ == "Bishop92"))
	}
}
