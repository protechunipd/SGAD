/**
 * FILE: UserData.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/dataaccess/data/userdata
 * DATA CREAZIONE: 19 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.dataaccess.data.userdata

import scala.collection.mutable
import sgad.servertier.dataaccess.data.shareddata.DataFactory
import scala.collection.mutable.ArrayBuffer

/**
 * Classe per la gestione dei dati di un utente.
 * @constructor
 * @param authenticationData I dati personali dell'utente.
 * @param ownedResources Le risorse possedute dall'utente.
 * @param ownedBuildings Gli edifici presenti nel villaggio dell'utente.
 * @param ownedUnits Le unità possedute dall'utente.
 * @param piggyBackLog Attributo relativo ai piggyBack di log.
 */
class UserData(private[this] val authenticationData: AuthenticationData, private val ownedResources: Map[String, OwnedResource], private val ownedBuildings: mutable.Map[String, BuildingPossession],
               private val ownedUnits: Map[String, UnitPossession], private val piggyBackLog: ArrayBuffer[String] = ArrayBuffer[String]()) {

	/**
	 * Rappresenta l'insieme degli utenti attaccati con successo.
	 */
	private val userAttacked = mutable.Set[String]()

	/**
	 * Attributo relativo ai piggyBack di operazioni.
	 */
	private val piggyBackOp = ArrayBuffer[String]()

	/**
	 * Attributo di possessione del tipo di costruzione.
	 */
	private val ownedBuildingWithLevel: mutable.Set[String] = mutable.Set() ++ ownedBuildings.values.filter((building) => {
		//filtro solo le costruzioni che sono finite
		building.getIsFinished
	}).map((building: BuildingPossession) => {
		//le aggiungo al set
		building.getBuilding.getKey
	})

	/**
	 * Metodo per controllare la possessione di un edificio.
	 * @param key La chiave dell'edificio in questione.
	 * @return Un booleano che indica il possesso di un edificio.
	 */
	def buildingIsOwned(key: String) = {
		var building = DataFactory.getBuilding(key)
		var founded = ownedBuildingWithLevel.contains(key)
		if (!founded) {
			try {
				while (!founded) {
					// Il ciclo conclude sicuramente in quanto se non esiste la costruzione di livello successivo viene lanciata l'eccezione e viene ritornato false
					building = DataFactory.getBuilding(building.getNextLevelKey)
					founded = ownedBuildingWithLevel.contains(building.getKey)
				}
			} catch {
				case _: NoSuchElementException => founded = false
			}
		}
		founded
	}

	/**
	 * Fornisce la risorsa posseduta in base alla chiave determinata.
	 * @param key Chiave identificativa della risorsa posseduta.
	 */
	def getOwnedResource(key: String) = ownedResources(key)

	/**
	 * Fornisce l'edificio posseduto in base alla chiave determinata.
	 * @param key Chiave identificativa dell'edificio posseduto.
	 */
	def getOwnedBuilding(key: String) = ownedBuildings(key)

	/**
	 * Fornisce l'unità posseduta in base alla chiave determinata.
	 * @param key Chiave identificativa dell'unità posseduta.
	 * @return `Unit` posseduta.
	 */
	def getOwnedUnit(key: String) = ownedUnits(key)

	/**
	 * Metodo getter per l'attributo AuthenticationData.
	 * @return Il relativo AuthenticationData.
	 */
	def getAuthenticationData = authenticationData

	/**
	 * Metodo getter per il DAO che restituisce la collezione ownedBuildings.
	 * @return La mappa di ownedBuildings.
	 */
	def getOwnedBuildingsMap = ownedBuildings

	/**
	 * Metodo getter per il DAO che restituisce la collezione ownedResources.
	 * @return La mappa di ownedResources.
	 */
	def getOwnedResourceMap = ownedResources

	/**
	 * Metodo getter per il DAO che restituisce la collezione ownedUnits.
	 * @return La mappa di ownedUnits.
	 */
	def getOwnedUnitMap = ownedUnits

	/**
	 * Metodo per aggiungere una Building a quelle possedute.
	 * @param building La nuova Costruzione.
	 */
	def addBuildingPossession(building: BuildingPossession) {
		ownedBuildings += (building.getKey -> building)
	}

	/**
	 * Metodo per rimuovere una Building da quelle possedute.
	 * @param building La Costruzione da distruggere.
	 */
	def removeBuildingPossession(building: BuildingPossession) {
		ownedBuildings -= building.getKey
		val otherBuildings = ownedBuildings.values.filter((otherBuilding: BuildingPossession) => {
			otherBuilding.getBuilding == building.getBuilding
		})
		if (otherBuildings.isEmpty)
			ownedBuildingWithLevel.remove(building.getBuilding.getKey)
	}

	/**
	 * Metodo per aggiungere un elemento ai tipi di edificio posseduti.
	 * @param building La nuova costruzione.
	 */
	def addOwnedBuildingWithLevel(building: String) = ownedBuildingWithLevel += building

	/**
	 * Aggiunge all'insieme degli utenti attaccati con successo l'utente in input.
	 * @param user Utente attaccato con successo.
	 */
	def addUserAttacked(user: String) = {
		userAttacked += user
	}

	/**
	 * Rimuove un utente dalla lista degli utenti attaccati con successo.
	 * @param user Utente da rimuovere.
	 */
	def removeUserAttacked(user: String) = {
		userAttacked -= user
	}

	/**
	 * Verifica se l'utente in input è stato attaccato con successo.
	 * @param user Utente da verificare se attaccato con successo.
	 */
	def isUserAttacked(user: String) = {
		userAttacked contains user
	}

	/**
	 * Metodo utilizzato per ricevere la mappa dei messaggi di piggy.
	 * @return piggyBack.
	 */
	def getPiggy: ArrayBuffer[String] = {
		piggyBackOp ++= piggyBackLog
		piggyBackLog.trimEnd(piggyBackLog.size)
		piggyBackOp
	}

	/**
	 * Metodo di get per ricevere solo i piggy di Log.
	 * @return L'array buffer dei messaggi di Log.
	 */
	def getPiggyLog = {
		piggyBackLog
	}

	/**
	 * Metodo utilizzato per aggiungere operazioni al piggy.
	 * @param operation L'operazione da aggiungere al piggy.
	 */
	def addOperationToPiggy(operation: String) {
		piggyBackOp.append(operation)
	}

	/**
	 * Metodo utilizzato per aggiungere un log al piggy.
	 * @param log Una operazione di log.
	 */
	def addLogToPiggy(log: String) {
		piggyBackLog.append(log)
	}

}