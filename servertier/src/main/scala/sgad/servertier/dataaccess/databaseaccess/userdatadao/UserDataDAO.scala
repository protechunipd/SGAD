/**
 * FILE: BuildingPossessionDAO.scala
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
import org.joda.time.IllegalFieldValueException
import sgad.servertier.dataaccess.data.userdata.{UnitPossession, OwnedResource, BuildingPossession, UserData}
import scala.collection
import com.mongodb.casbah.commons.Imports
import scala.collection.mutable.ArrayBuffer

/**
 * Classe per l'interazione con il database di una classe di tipo BuildingPossession.
 */
object UserDataDAO {
	/**
	 * Fornisce il corrispettivo MongoDBObject della classe UserData fornita in input.
	 * @param object L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return Il corrispettivo MongoDBObject.
	 */
	def getMongoObject(`object`: UserData): Imports.DBObject = {
		val buildingVector: Vector[DBObject] = `object`.getOwnedBuildingsMap //recupero il vettore
			.map((couple: (String, BuildingPossession)) => {
			//lo mappo prendendo solo le building
			couple._2
			//restituisce il secondo elemento della coppia
		}).toVector //lo casto a vettore
			.map((b: BuildingPossession) => {
			//trasformo le building in MongoObject
			BuildingPossessionDAO.getMongoObject(b)
		})

		val resourceVector: Vector[DBObject] = `object`.getOwnedResourceMap //recupero il vettore
			.map((couple: (String, OwnedResource)) => {
			//lo mappo prendendo solo le risorse
			couple._2
		}).toVector
			//lo casto a vettore
			.map((b: OwnedResource) => {
			//trasformo le risorse in MongoObject
			OwnedResourceDAO.getMongoObject(b)
		})

		val unitVector: Vector[DBObject] = `object`.getOwnedUnitMap
			//recupero il vettore
			.map((couple: (String, UnitPossession)) => {
			//lo mappo prendendo solo le unità
			couple._2
		}).toVector
			//lo casto a vettore
			.map((b: UnitPossession) => {
			//trasformo le unità in MongoObject
			UnitPossessionDAO.getMongoObject(b)
		})

		val piggy = `object`.getPiggyLog
			.map((message: String) => {
			MongoDBObject(
				"message" -> message
			)
		})

		MongoDBObject(
			"authenticationData" -> AuthenticationDataDAO.getMongoObject(`object`.getAuthenticationData),
			"ownedBuildings" -> buildingVector,
			"ownedResources" -> resourceVector,
			"ownedUnits" -> unitVector,
			"piggyBack" -> piggy
		)
	}

	/**
	 * Ritorna il corrispettivo UserData istanziato a partire da un oggetto MongoDBObject.
	 * @param mongoObject L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return L'oggetto UserData creato.
	 */
	def getObject(mongoObject: DBObject) = {
		try {
			val buildingMap = collection.mutable.Map() ++
				mongoObject.getAsOrElse[MongoDBList]("ownedBuildings", throw new IllegalFieldValueException("ownedBuildings", "")).toVector
					.map(
				        //Recupero il vettore di oggetti Mongo
				        (build: Any) => {
					        val nuovabuild = BuildingPossessionDAO.getObject(build.asInstanceOf[DBObject])
					        //Li trasformo con il relativo DAO
					        (nuovabuild.getKey, nuovabuild)
					        //Restituisco la coppia chiave Valore
				        }
					).toMap //e creo una Mappa

			val resourceMap = mongoObject.getAsOrElse[MongoDBList]("ownedResources", throw new IllegalFieldValueException("ownedResources", "")).toVector
				.map(
			        //Recupero il vettore di oggetti Mongo
			        (build: Any) => {
				        val nuovabuild = OwnedResourceDAO.getObject(build.asInstanceOf[DBObject])
				        //Li trasformo con il relativo DAO
				        (nuovabuild.getKey, nuovabuild)
				        //Restituisco la coppia chiave Valore
			        }
				).toMap
			//e creo una Mappa

			val unitMap = mongoObject.getAsOrElse[MongoDBList]("ownedUnits", throw new IllegalFieldValueException("ownedUnits", "")).toVector
				.map(
			        //Recupero il vettore di oggetti Mongo
			        (build: Any) => {
				        val nuovabuild = UnitPossessionDAO.getObject(build.asInstanceOf[DBObject])
				        //Li trasformo con il relativo DAO
				        (nuovabuild.getKey, nuovabuild)
				        //Restituisco la coppia chiave Valore
			        }
				).toMap
			//e creo una Mappa

			val piggy: ArrayBuffer[String] = mongoObject.getAsOrElse[MongoDBList]("piggyBack", throw new IllegalFieldValueException("piggyBack", "")).map(
				(message) => {
					message.asInstanceOf[DBObject].getAsOrElse[String]("message", throw new IllegalFieldValueException("piggyBack", ""))
				}
			).to[ArrayBuffer]

			new UserData(
				ownedBuildings = buildingMap,
				ownedResources = resourceMap,
				ownedUnits = unitMap,
				authenticationData = AuthenticationDataDAO.getObject(
					mongoObject.getAsOrElse[DBObject]("authenticationData", throw new IllegalFieldValueException("authenticationData", ""))
				),
				piggyBackLog = piggy

			)
		} catch {
			case c: ClassCastException => throw new IllegalFieldValueException(c.getLocalizedMessage, "Not Castable")
		}
	}
}
