/**
 * FILE: CostDAO.scala
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

import sgad.servertier.dataaccess.data.shareddata.{Cost, QuantityResource}
import com.mongodb.casbah.commons.Imports._
import org.joda.time.IllegalFieldValueException

/**
 * Classe per l'interazione con il database di una classe di tipo Cost.
 *
 */
object CostDAO {
	/**
	 * Fornisce il corrispettivo MongoDBObject della classe Cost fornita in input.
	 * @param cost L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return Il corrispettivo MongoDBObject.
	 */
	def getMongoObject(cost: Cost) = {
		val vectorMongoOBJ = cost.getQuantityResource.map((qr: QuantityResource) => {
			QuantityResourceDAO.getMongoObject(qr)
		})
		MongoDBObject(
			"relativeTime" -> cost.getRelativeTime,
			"quantityResource" -> vectorMongoOBJ
		)
	}

	/**
	 * Ritorna il corrispettivo Cost istanziato a partire da un oggetto MongoDBObject.
	 * @param mongoObject L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return Il costo corrispettivo.
	 */
	def getObject(mongoObject: DBObject): Cost = {
		try {
			val vettoreQuantita: Vector[QuantityResource] = mongoObject.getAsOrElse[MongoDBList]("quantityResource", {
				throw new IllegalFieldValueException("quantity", "null")
			}).toVector.map(
			        (obj: Any) => {
				        QuantityResourceDAO.getObject(obj.asInstanceOf[DBObject])
			        })
			new Cost(
				mongoObject.getAsOrElse[Int]("relativeTime", throw new IllegalFieldValueException("relativeTime", "null")),
				vettoreQuantita
			)
		} catch {
			case c: ClassCastException => throw new IllegalFieldValueException("CastException", c.getMessage)
		}
	}
}