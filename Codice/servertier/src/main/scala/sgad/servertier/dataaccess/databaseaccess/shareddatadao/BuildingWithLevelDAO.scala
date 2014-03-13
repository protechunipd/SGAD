/**
 * FILE: BuildingWithLevelDAO.scala
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

import sgad.servertier.dataaccess.data.shareddata.{ProductedResource, BuildingWithLevel, `Unit`, DataFactory}
import com.mongodb.casbah.commons.Imports._
import org.joda.time.IllegalFieldValueException

/**
 * Classe per l'interazione con il database di una classe di tipo BuildingWithLevel.
 */
object BuildingWithLevelDAO {
	/**
	 * Fornisce il corrispettivo MongoDBObject della classe BuildingWithLevel fornita in input.
	 * @param object L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return Il corrispettivo MongoDBObject.
	 */
	def getMongoObject(`object`: BuildingWithLevel): DBObject = {
		val vectorkeys = `object`.getPrecondition.map((b: Any) => {
			b.asInstanceOf[BuildingWithLevel].getKey
		})
		//recupero le chiavi degli edifici richiesti
		val resource = if (`object`.getProductedResource != null) {
			ProductedResourceDAO.getMongoObject(`object`.getProductedResource)
		} else {
			MongoDBObject()
		}
		//recupero l'oggetto relativo alle risorse prodotte altrimenti oggetto vuoto
		val vectorUnit = `object`.getProductedUnits.map((u: `Unit`) => {
			u.getKey
		})
		//recupero le chiavi delle unità prodotte.
		MongoDBObject(
			"bonus" -> BonusDAO.getMongoObject(`object`.getBonus),
			//inserisco il bonus giusto tramite il dao relativo
			"cost" -> CostDAO.getMongoObject(`object`.getCost),
			//inserisco il costo relativo tramite il dao relativo
			"isConstructible" -> `object`.getIsConstructible,
			//inserisco l'attributo relativo
			"level" -> `object`.getLevel,
			//inserisco il livello corrente
			"nameBuilding" -> `object`.getNameBuilding,
			//inserisco il nome della costruzione
			"precondition" -> vectorkeys,
			//inserisco il vettore delle chiavi della precondizione
			"productedResource" -> resource,
			//inserisco la risorsa prodotta
			"productedUnits" -> vectorUnit,
			//inserisco il vettore delle unità prodotte
			"unitsSpace" -> `object`.getUnitsSpace,
			//inserisco il valore dello spazio delle unità che viene allocato alla creazione della costruzione
			"isDestructible" -> `object`.getIsDestructible
			//inserisco se è distruttibile
		)
		//costruisco un oggetto per il database Mongo con le info recuperato
	}

	/**
	 * Ritorna il corrispettivo BuildingWithLevel istanziato a partire da un oggetto MongoDBObject.
	 * @param mongoObject L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return L'oggetto BuildingWithLevel creato.
	 */
	def getObject(mongoObject: DBObject): BuildingWithLevel = {
		try {
			val precondition = mongoObject.getAsOrElse[MongoDBList]("precondition", throw new IllegalFieldValueException("precondition", "null")).toVector.map(
				(key: Any) => {
					key.asInstanceOf[String]
					//recupero le chiavi delle costruzioni
				}
			)
			//ricreazione del vettore delle precondizioni a partire dalle chiavi
			var productedResource: ProductedResource = null
			try {
				productedResource = ProductedResourceDAO.getObject(mongoObject.getAsOrElse[DBObject]("productedResource", throw new IllegalFieldValueException("productedResource", "null")))
				//recupero le risorse prodotte
			}
			catch {
				case p: IllegalArgumentException => productedResource = null
			}
			//tento di recuperare le risorse prodotte altrimenti lascio a null
			val productedUnits = mongoObject.getAsOrElse[MongoDBList]("productedUnits", throw new IllegalFieldValueException("productedUnits", "null")).toVector.map(
				(key: Any) => {
					DataFactory.getUnit(key.asInstanceOf[String])
					//recupero le unità dal datafactory tramite la chiave
				}
			)
			//recupero le unità prodotte.

			new BuildingWithLevel(
				mongoObject.getAsOrElse[Boolean]("isConstructible", throw new IllegalFieldValueException("isConstructible", "null")),
				//creo il valore constructible degli edifici tramite il valore preso dal database
				BonusDAO.getObject(mongoObject.getAsOrElse[DBObject]("bonus", throw new IllegalFieldValueException("bonus", "null"))),
				//tramite il DAO appropriato ricreo il bonus
				CostDAO.getObject(mongoObject.getAsOrElse[DBObject]("cost", throw new IllegalFieldValueException("cost", "null"))),
				//tramite il DAO appropriato ricreo il costo
				mongoObject.getAsOrElse[Int]("level", throw new IllegalFieldValueException("level", "null")),
				//recupero il valore del livello recuperato dal database
				mongoObject.getAsOrElse[String]("nameBuilding", throw new IllegalFieldValueException("nameBuilding", "null")),
				//recuper il nome dell'edificio recuperato dal database
				precondition,
				//inserisco il vettore delle precondizione
				productedResource,
				//inserisco le risorse prodotte
				productedUnits,
				//inserisco le unità prodotte
				mongoObject.getAsOrElse[Int]("unitsSpace", throw new IllegalFieldValueException("unitsSpace", "null")),
				//inserisco il valore recuperato dal database relativo agli spazi disponibili creati
				mongoObject.getAsOrElse[Boolean]("isDestructible", throw new IllegalFieldValueException("isDestructible", "null"))
				//inserisco il valore recuperato dal database relativo all'essere distruttibile
			)
			//ricostruisco la building with level relativa.
		} catch {
			case c: ClassCastException => throw new IllegalFieldValueException(c.getLocalizedMessage, "Not Castable")
		}
	}
}