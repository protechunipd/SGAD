/**
 * FILE: SharedDataDAO.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/dataaccess/databaseaccess/shareddatadao
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Segantin Fabio
 */

package sgad.servertier.dataaccess.databaseaccess.shareddatadao

import sgad.servertier.dataaccess.data.shareddata.DataFactory
import com.mongodb.casbah.Imports._

/**
 * Classe per la trasformazione dei dati di gioco generali contenuti nel DataFactory in formato JSON.
 */
object SharedDataDAO {
	/**
	 * Fornisce il corrispettivo DBObject dei dati di gioco generali contenuti nel DataFactory.
	 * @return DBOject in formato JSON per poterlo spedire al Client.
	 */
	def getMongoObject = {
		val buildings = DataFactory.getBuildingsMap
			//recupero mappa
			.values
			//prendo solo i valori
			.toVector
			//rendo vettore
			.map(
		        //trasformo in mongoobject
		        edificio => BuildingWithLevelDAO.getMongoObject(edificio)
			)
		val units = DataFactory.getUnitsMap
			//recupero mappa
			.values
			//prendo solo i valori
			.toVector
			//rendo vettore
			.map(
		        //trasformo in mongoobject
		        unita => UnitDAO.getMongoObject(unita)
			)
		val resources = DataFactory.getResourcesMap
			//recupero mappa
			.values
			//prendo solo i valori
			.toVector
			//rendo vettore
			.map(
		        //trasformo in mongoobject
		        risorsa => ResourceDAO.getMongoObject(risorsa)
			)
		MongoDBObject(
			"buildings" -> buildings,
			"units" -> units,
			"resources" -> resources
		)
	}
}
