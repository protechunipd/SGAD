/**
 * FILE: UnitDAO.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/dataaccess/databaseaccess/shareddatadao
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Segantin Fabio
 */
package sgad.servertier.dataaccess.databaseaccess.shareddatadao

import sgad.servertier.dataaccess.data.shareddata.`Unit`
import com.mongodb.casbah.commons.Imports._
import org.joda.time.IllegalFieldValueException

/**
 * Classe per l'interazione con il database di una classe di tipo Unit.
 *
 */
object UnitDAO {
	/**
	 * Fornisce il corrispettivo MongoDBObject della classe Unit fornita in input.
	 * @param object L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return Il corrispettivo MongoDBObject.
	 */
	def getMongoObject(`object`: `Unit`) = {
		MongoDBObject(
			"name" -> `object`.getName,
			"attack" -> `object`.getAttack,
			"defence" -> `object`.getDefence,
			"cost" -> CostDAO.getMongoObject(`object`.getCost),
			"isBuilder" -> `object`.getIsBuilder
		)
	}

	/**
	 * Ritorna il corrispettivo Unit istanziato a partire da un oggetto MongoDBObject.
	 * @param mongoObject L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return L'unità corrispettiva.
	 */
	def getObject(mongoObject: DBObject) = {
		try {
			new `Unit`(
				mongoObject.getAsOrElse[String]("name", throw new IllegalFieldValueException("name", "null")),
				mongoObject.getAsOrElse[Int]("attack", throw new IllegalFieldValueException("attack", "null")),
				mongoObject.getAsOrElse[Int]("defence", throw new IllegalFieldValueException("defence", "null")),
				CostDAO.getObject(mongoObject.getAsOrElse[DBObject]("cost", throw new IllegalFieldValueException("cost", "null"))),
				mongoObject.getAsOrElse[Boolean]("isBuilder", throw new IllegalFieldValueException("isBuilder", "null"))
			)
		} catch {
			case c: ClassCastException => throw new IllegalFieldValueException("CastException", c.getMessage)
		}
	}
}