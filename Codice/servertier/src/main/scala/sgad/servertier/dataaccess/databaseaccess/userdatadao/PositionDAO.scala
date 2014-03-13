/**
 * FILE: PositionDAO.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/dataaccess/databaseaccess/userdatadao
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Segantin Fabio
 */
package sgad.servertier.dataaccess.databaseaccess.userdatadao

import sgad.servertier.dataaccess.data.userdata.Position
import com.mongodb.casbah.commons.Imports._
import org.joda.time.IllegalFieldValueException

/**
 * Classe per l'interazione con il database di una classe di tipo Position.
 */
object PositionDAO {
	/**
	 * Fornisce il corrispettivo MongoDBObject della classe Position fornita in input.
	 * @param object L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return Il corrispettivo MongoDBObject.
	 */
	def getMongoObject(`object`: Position) = {
		MongoDBObject(
			"x" -> `object`.getX,
			"y" -> `object`.getY
		)
	}

	/**
	 * Ritorna il corrispettivo Position istanziato a partire da un oggetto MongoDBObject.
	 * @param mongoObject L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return L'oggetto Position creato.
	 */
	def getObject(mongoObject: DBObject) = {
		try {
			new Position(
				mongoObject.getAsOrElse[Int]("x", throw new IllegalFieldValueException("x", "")),
				mongoObject.getAsOrElse[Int]("y", throw new IllegalFieldValueException("y", ""))
			)
		} catch {
			case c: ClassCastException => throw new IllegalFieldValueException(c.getLocalizedMessage, "Not Castable")
		}
	}
}
