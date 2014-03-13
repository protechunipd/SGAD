/**
 * FILE: ProductedResourceDAO.scala
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

import sgad.servertier.dataaccess.data.shareddata.{ProductedResource, DataFactory}
import com.mongodb.casbah.commons.Imports._
import org.joda.time.IllegalFieldValueException

/**
 * Classe per l'interazione con il database di una classe di tipo ProductedResource.
 *
 */
object ProductedResourceDAO {
	/**
	 * Fornisce il corrispettivo MongoDBObject della classe ProductedResource fornita in input.
	 * @param object L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return Il corrispettivo MongoDBObject.
	 */
	def getMongoObject(`object`: ProductedResource) = {
		MongoDBObject(
			"maxQuantity" -> `object`.getMaxQuantity,
			"quantity" -> `object`.getQuantity,
			"relativeTime" -> `object`.getRelativeTime,
			"resource" -> `object`.getResource.getKey
		)
	}

	/**
	 * Ritorna il corrispettivo ProductedResource istanziato a partire da un oggetto MongoDBObject.
	 * @param mongoObject L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return La ProductedResource relativa.
	 */
	def getObject(mongoObject: DBObject) = {
		try {
			new ProductedResource(
				DataFactory.getResource(mongoObject.getAsOrElse[String]("resource", throw new IllegalFieldValueException("resource", "null"))),
				mongoObject.getAsOrElse[Int]("relativeTime", throw new IllegalFieldValueException("relativeTime", "null")),
				mongoObject.getAsOrElse[Int]("quantity", throw new IllegalFieldValueException("quantity", "null")),
				mongoObject.getAsOrElse[Int]("maxQuantity", throw new IllegalFieldValueException("maxQuantity", "null"))
			)
		} catch {
			case c: ClassCastException => throw new IllegalFieldValueException("CastException", c.getMessage)
		}
	}
}