/**
 * FILE: ResourceDAO.scala
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

import sgad.servertier.dataaccess.data.shareddata.Resource
import com.mongodb.casbah.commons.Imports._
import org.joda.time.IllegalFieldValueException

/**
 * Classe per l'interazione con il database di una classe di tipo Resource.
 *
 */
object ResourceDAO {
	/**
	 * Fornisce il corrispettivo MongoDBObject della classe Resource fornita in input.
	 * @param object L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return Il corrispettivo MongoDBObject.
	 */
	def getMongoObject(`object`: Resource) = {
		MongoDBObject(
			"resourceName" -> `object`.getResourceName
		)
	}

	/**
	 * Ritorna il corrispettivo Resource istanziato a partire da un oggetto MongoDBObject.
	 * @param mongoObject L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return La risorsa corrispettiva.
	 */
	def getObject(mongoObject: DBObject) = {
		new Resource(
			mongoObject.getAsOrElse[String]("resourceName", throw new IllegalFieldValueException("resourceName", "null"))
		)

	}
}