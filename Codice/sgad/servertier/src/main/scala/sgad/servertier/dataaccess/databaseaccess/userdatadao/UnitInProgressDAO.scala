/**
 * FILE: UnitInProgressDAO.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/dataaccess/databaseaccess/userdatadao
 * DATA CREAZIONE: 21 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-21 - Creazione della classe - Segantin Fabio
 */
package sgad.servertier.dataaccess.databaseaccess.userdatadao

import sgad.servertier.dataaccess.data.userdata.UnitInProgress
import com.mongodb.casbah.Imports._
import org.joda.time.IllegalFieldValueException
import sgad.servertier.dataaccess.data.shareddata.DataFactory

/**
 * Classe per l'interazione con il database di una classe di tipo UnitInProgress.
 */
object UnitInProgressDAO {
	/**
	 * Fornisce il corrispettivo MongoDBObject della classe UnitInProgress fornita in input.
	 * @param object L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return Il corrispettivo MongoDBObject.
	 */
	def getMongoObject(`object`: UnitInProgress) = {
		MongoDBObject(
			"quantity" -> `object`.getQuantity,
			"unit" -> `object`.getUnit.getKey,
			"startedTime" -> `object`.getStartedTime
		)
	}

	/**
	 * Ritorna il corrispettivo UnitInProgress istanziato a partire da un oggetto MongoDBObject.
	 * @param mongoObject L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return L'oggetto UnitInProgress creato.
	 */
	def getObject(mongoObject: DBObject) = {
		if (mongoObject == MongoDBObject())
			null
		else {
			try {
				new UnitInProgress(
					quantity = mongoObject.getAsOrElse[Int]("quantity", throw new IllegalFieldValueException("quantity", "")),
					unit = DataFactory.getUnit(
						mongoObject.getAsOrElse[String]("unit", throw new IllegalFieldValueException("unit", ""))
					),
					startedTime = mongoObject.getAsOrElse[Long]("startedTime", throw new IllegalFieldValueException("startedTime", ""))
				)
			} catch {
				case c: ClassCastException => throw new IllegalFieldValueException(c.getLocalizedMessage, "Not Castable")
			}
		}
	}
}
