/**
 * FILE: TrainUnit.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 26 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-26 - Creazione della classe - Segantin Fabio
 */
package sgad.servertier.businesslogic.operations

import sgad.servertier.dataaccess.data.userdata.{UnitInProgress, UserData}
import sgad.servertier.dataaccess.data.shareddata.DataFactory

/**
 * Classe che rappresenta l'operazione di arruolamento di unità.
 */
class TrainUnit extends Operation {
	/**
	 * Metodo per l'esecuzione dell'addestramento delle unità.
	 * @param userData Dati dell'utente su cui verrà effettuata l'operazione.
	 * @param data Dati accompagnatori alla richiesta dell'operazione.
	 * @param loginAuthorization Autorizzazione a operare richieste di login. Di default è false.
	 * @param registrationAuthorization Autorizzazione a operare richieste di registrazione. Di default è false.
	 * @param userAuthorization Autorizzazione a operare richieste di user. Di default è false.
	 * @param internalAuthorization Autorizzazione a operare richieste interne. Di default è false.
	 * @return Stringa da restituire.
	 */
	def execute(userData: UserData, data: String, loginAuthorization: Boolean, registrationAuthorization: Boolean,
	            userAuthorization: Boolean, internalAuthorization: Boolean): String = {

		OperationFactory.getOperation("UpdateUserData").execute(userData, "", internalAuthorization = true)
		var answer = "data:false, unauthorized:true"

		if (userAuthorization) {
			//controllo autorizzazione
			val dataMap = decodeData(data)
			try {
				if (userData.getAuthenticationData.getAuthenticationString == dataMap("authentication")) {
					//controllo autenticazione della richiesta
					val requestBuilding = userData.getOwnedBuilding(dataMap("key"))
					//richiedo la costruzione di partenza
					val spawningUnit = DataFactory.getUnit(dataMap("unit"))
					//richiedo l'unità in questione
					val quantity = dataMap("quantity").toInt
					//richiedo la quantità di unità
					val avaiblePositions = userData.getOwnedBuildingsMap.values.foldLeft(0)((current: Int, building) => {
						//per ogni edificio posseduto sommo i posti disponibili
						var count = building.getBuilding.getUnitsSpace + current
						if (building.getUnitInProgress != null) {
							count -= building.getUnitInProgress.getQuantity
						}
						count
					}) - userData.getOwnedUnitMap.values.foldLeft(0)(
						_ + _.getQuantity //ci sottraggo i posti occupati
					) //ottengo i posti disponibili
					if (quantity <= avaiblePositions) {
						//controllo che i posti disponibili siano sufficienti per addestrare le unità
						val unitNotProducted = requestBuilding.getBuilding.getProductedUnits.forall((productedUnit) => {
							productedUnit.getKey != spawningUnit.getKey
						})
						//controllo che le unità vengano prodotte dall'edificio in questione.
						val ownedResouces = spawningUnit.getCost.getQuantityResource.forall((resource) => {
							resource.getQuantity * quantity <= userData.getOwnedResource(resource.getResource.getKey).getQuantity
						})
						//controllo che le risorse possedute siano sufficienti a sopportare il costo della transazione.
						if (!unitNotProducted && ownedResouces) {
							//controlo che l'unità possa essere prodotta
							if (requestBuilding.addUnit(new UnitInProgress(spawningUnit, System.currentTimeMillis / 1000L, quantity))) {
								//cerco di aggiungere le unità alla coda, se possono essere aggiunte allora entra in questo branch.
								answer = "data:true, messages:" + parsePiggy(userData.getPiggy)
								spawningUnit.getCost.getQuantityResource.foreach((resource) => {
									val owned = userData.getOwnedResource(resource.getResource.getKey)
									owned.setQuantity(owned.getQuantity - (resource.getQuantity * quantity))
								})
							} else
								//altrimenti la coda è già occupata da un altro tipo di unità
								answer = "data:false, full:true, messages:" + parsePiggy(userData.getPiggy)
						} else
							//non possiede le risorse o la costruzione non è valida
							answer = "data:false, cost:false, messages:" + parsePiggy(userData.getPiggy)
					} else
						//non possiede i posti necessari
						answer = "data:false, notavaible:true, messages:" + parsePiggy(userData.getPiggy)
				} else
					//la richiesta non può essere autenticata
					answer = "data:false, authentication:false"
			} catch {
				case _: IllegalArgumentException => answer = "data:false, parameters:false"
				//restituisco false e errore di parametri
				case _: ClassCastException => answer = "data:false, parameters:false"
				//restituisco false e errore di parametri
				case _: NoSuchElementException => answer = "data:false, parameters:false"
				//restituisco false e errore di parametri
			}
		}
		"{" + answer + "}"
	}
}
