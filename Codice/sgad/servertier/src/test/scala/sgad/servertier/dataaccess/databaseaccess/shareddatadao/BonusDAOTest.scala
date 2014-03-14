/**
 * FILE: BonusDAOTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/databaseaccess/shareddatadao
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Segantin Fabio
 */

import sgad.servertier.dataaccess.data.shareddata.{DataFactory, Bonus}
import com.mongodb.casbah.commons.Imports.MongoDBObject
import org.scalatest._
import org.joda.time.IllegalFieldValueException
import sgad.servertier.dataaccess.databaseaccess.shareddatadao.BonusDAO

/**
 * Classe di test per l'object BonusDAO
 */
class BonusDAOTest extends FlatSpec {

	DataFactory.setUnits(Map())
	DataFactory.setResources(Map())
	DataFactory.setBuildings(Map())
	val bonus = new Bonus("test", 1, 10)
	val mongoObject = MongoDBObject("bonusName" -> "test", "type" -> 1, "quantity" -> 10.0D)


	"BonusDAO" must "ritornare lo stesso oggetto bonus solo se riceve il relativo mongoObject" in {
		val mongoObject2 = MongoDBObject("bonusName" -> "test", "type" -> 1, "quantity" -> 30.0D)
		assert(bonus == BonusDAO.getObject(mongoObject))
		assert(bonus != BonusDAO.getObject(mongoObject2))
	}

	it must "ritornare lo stesso mongoobject solo se riceve il relativo bonus" in {
		val bonus2 = new Bonus("test", 1, 20)
		assert(mongoObject == BonusDAO.getMongoObject(bonus))
		assert(mongoObject != BonusDAO.getMongoObject(bonus2))
	}
	it must "lanciare una eccezione se il mongoObject non ha le informazioni relative" in {
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject("type" -> 1, "quantity" -> 10.0D)
			BonusDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject("bonusName" -> "1", "quantity" -> 10.0D)
			BonusDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			val mongoObject2 = MongoDBObject("type" -> 1, "bonusName" -> "10.0F")
			BonusDAO.getObject(mongoObject2)
		}
	}
	it must "lanciare una eccezione se il tipo dei dati non è corretto" in {
		val mongoObject2 = MongoDBObject("bonusName" -> "test", "type" -> 1, "quantity" -> 30)
		val mongoObject3 = MongoDBObject("bonusName" -> "test", "type" -> "1", "quantity" -> 30.0D)
		val mongoObject4 = MongoDBObject("bonusName" -> 20, "type" -> 1, "quantity" -> 30.0D)
		intercept[IllegalFieldValueException] {
			BonusDAO.getObject(mongoObject2)
		}
		intercept[IllegalFieldValueException] {
			BonusDAO.getObject(mongoObject3)
		}
		intercept[IllegalFieldValueException] {
			BonusDAO.getObject(mongoObject4)
		}
	}
}