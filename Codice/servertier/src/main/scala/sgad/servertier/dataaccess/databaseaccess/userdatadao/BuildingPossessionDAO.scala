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
import sgad.servertier.dataaccess.data.userdata.BuildingPossession
import org.joda.time.IllegalFieldValueException
import sgad.servertier.dataaccess.data.shareddata.DataFactory

/**
 * Classe per l'interazione con il database di una classe di tipo BuildingPossession.
 */
object BuildingPossessionDAO {
	/**
	 * Fornisce il corrispettivo MongoDBObject della classe BuildingPossession fornita in input.
	 * @param object L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return Il corrispettivo MongoDBObject.
	 */
	def getMongoObject(`object`: BuildingPossession) = {
		MongoDBObject(
			"building" -> `object`.getBuilding.getKey,
			//inserisco la chiave della costruzione relativa
			"isFinished" -> `object`.getIsFinished,
			//inserisco se è stato già completato da costruire
			"position" -> PositionDAO.getMongoObject(
				`object`.getPosition),
			//recupero tramite il DAO l'oggetto relativo alla posizione
			"time" -> `object`.getTime,
			//recupero l'attributo relativo al tempo.
			"unitInProgress" -> (if (`object`.getUnitInProgress != null) UnitInProgressDAO.getMongoObject(
				`object`.getUnitInProgress)
			else MongoDBObject())
			//recupero l'oggetto delle unità in progress relativo
		)
	}

	/**
	 * Ritorna il corrispettivo BuildingPossession istanziato a partire da un oggetto MongoDBObject.
	 * @param mongoObject L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return L'oggetto BuildingPossession creato.
	 */
	def getObject(mongoObject: DBObject) = {
		try {
			new BuildingPossession(
				building = DataFactory.getBuilding(
					mongoObject.getAsOrElse[String]("building", throw new IllegalFieldValueException("building", ""))),
				//recupero tramite la chiave la costruzione relativa
				isFinished = mongoObject.getAsOrElse[Boolean]("isFinished", throw new IllegalFieldValueException("isFinished", "")),
				//recupero l'attributo isFinished
				position = PositionDAO.getObject(
					mongoObject.getAsOrElse[DBObject]("position", throw new IllegalFieldValueException("position", ""))
				),
				//recupero la poszione tramite il DAO relativo.
				time = mongoObject.getAsOrElse[Long]("time", throw new IllegalFieldValueException("time", "")),
				//recipero il tempo dal database
				unitInProgress = UnitInProgressDAO.getObject(mongoObject.getAsOrElse[DBObject]("unitInProgress", throw new IllegalFieldValueException("unitInProgress", "")))
				//recupero le unità in corso tramite il dao relativo a partire dall'oggetto recuperato dal database
			)
		} catch {
			case c: ClassCastException => throw new IllegalFieldValueException(c.getLocalizedMessage, "Not Castable")
		}
	}
}