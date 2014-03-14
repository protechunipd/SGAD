/**
 * FILE: UnitPssessionDAO.scala
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

import sgad.servertier.dataaccess.data.userdata.UnitPossession
import com.mongodb.casbah.Imports._
import org.joda.time.IllegalFieldValueException
import sgad.servertier.dataaccess.data.shareddata.DataFactory

/**
 * Classe per l'interazione con il database di una classe di tipo UnitPossession.
 */
object UnitPossessionDAO {
	/**
	 * Fornisce il corrispettivo MongoDBObject della classe UnitPossession fornita in input.
	 * @param object L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return Il corrispettivo MongoDBObject.
	 */
	def getMongoObject(`object`: UnitPossession) = {
		MongoDBObject(
			"quantity" -> `object`.getQuantity,
			"unit" -> `object`.getUnit.getKey
		)
	}

	/**
	 * Ritorna il corrispettivo UnitPossession istanziato a partire da un oggetto MongoDBObject.
	 * @param mongoObject L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return L'oggetto UnitPossession creato.
	 */
	def getObject(mongoObject: DBObject) = {
		try {
			new UnitPossession(
				mongoObject.getAsOrElse[Int]("quantity", throw new IllegalFieldValueException("quantity", "")),
				DataFactory.getUnit(
					mongoObject.getAsOrElse[String]("unit", throw new IllegalFieldValueException("unit", ""))
				)
			)
		} catch {
			case c: ClassCastException => throw new IllegalFieldValueException(c.getLocalizedMessage, "Not Castable")
		}
	}
}
