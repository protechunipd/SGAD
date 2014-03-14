/**
 * FILE: OwnedResourceDAO.scala
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

import com.mongodb.casbah.Imports._
import sgad.servertier.dataaccess.data.userdata.OwnedResource
import org.joda.time.IllegalFieldValueException
import sgad.servertier.dataaccess.data.shareddata.DataFactory

/**
 * Classe per l'interazione con il database di una classe di tipo OwnedResource.
 */
object OwnedResourceDAO {
	/**
	 * Fornisce il corrispettivo MongoDBObject della classe OwnedResource fornita in input.
	 * @param object L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return Il corrispettivo MongoDBObject.
	 */
	def getMongoObject(`object`: OwnedResource) = MongoDBObject(
		"quantity" -> `object`.getQuantity,
		"resource" -> `object`.getResource.getKey
	)

	/**
	 * Ritorna il corrispettivo OwnedResource istanziato a partire da un oggetto MongoDBObject.
	 * @param mongoObject L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return L'oggetto OwnedResource creato.
	 */
	def getObject(mongoObject: DBObject) = {
		try {
			new OwnedResource(
				quantity = mongoObject.getAsOrElse[Int]("quantity", throw new IllegalFieldValueException("quantity", "")),
				resource = DataFactory.getResource(
					mongoObject.getAsOrElse[String]("resource", throw new IllegalFieldValueException("resource", "")))
			)
		} catch {
			case c: ClassCastException => throw new IllegalFieldValueException(c.getLocalizedMessage, "Not Castable")
		}
	}
}
