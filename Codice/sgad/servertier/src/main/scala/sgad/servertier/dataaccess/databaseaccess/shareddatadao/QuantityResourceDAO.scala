/**
 * FILE: QuantityResourceDAO.scala
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

import sgad.servertier.dataaccess.data.shareddata.{QuantityResource, DataFactory}
import com.mongodb.casbah.commons.Imports._
import org.joda.time.IllegalFieldValueException

/**
 * Classe per l'interazione con il database di una classe di tipo QuantityResource.
 *
 */
object QuantityResourceDAO {
	/**
	 * Fornisce il corrispettivo MongoDBObject della classe QuantityResource fornita in input.
	 * @param object L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return Il corrispettivo MongoDBObject.
	 */
	def getMongoObject(`object`: QuantityResource) = {
		MongoDBObject(
			"resource" -> `object`.getResource.getKey,
			"quantity" -> `object`.getQuantity)
	}

	/**
	 * Ritorna il corrispettivo QuantityResource istanziato a partire da un oggetto MongoDBObject.
	 * @param mongoObject L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return L'oggetto QuantityResource corrispettivo.
	 */
	def getObject(mongoObject: DBObject) = {
		try {
			new QuantityResource(
				DataFactory.getResource(
					mongoObject.getAsOrElse[String]("resource", throw new IllegalFieldValueException("resource", "null"))),
				mongoObject.getAsOrElse[Int]("quantity", throw new IllegalFieldValueException("quantity", "null")))
		} catch {
			case c: ClassCastException => throw new IllegalFieldValueException("ClassCast", c.getMessage)
		}
	}
}