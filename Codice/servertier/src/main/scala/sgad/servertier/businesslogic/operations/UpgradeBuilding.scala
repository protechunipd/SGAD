/**
 * FILE: UpgradeBuilding.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 25 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-25 - Creazione della classe - Segantin Fabio
 */
package sgad.servertier.businesslogic.operations

import sgad.servertier.dataaccess.data.userdata.{BuildingPossession, UserData}
import java.util.NoSuchElementException
import sgad.servertier.dataaccess.data.shareddata.{BuildingWithLevel, DataFactory}

/**
 * Classe che rappresenta l'operazione di avanzamento di livello di un edificio posseduto dall'utente.
 */
class UpgradeBuilding extends Operation {

	/**
	 * Metodo per l'esecuzione di un upgrade di un edificio.
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
			//controllo l'autorizzazione
			val dataMap = decodeData(data)
			try {
				if (userData.getAuthenticationData.getAuthenticationString == dataMap("authentication")) {
					//controllo l'autenticazione della richiesta
					val building = userData.getOwnedBuilding(dataMap("key"))
					val nextLevelBuilding = DataFactory.getBuilding(building.getBuilding.getNextLevelKey)
					val preconditionCheck = nextLevelBuilding.getPrecondition.forall((building) => {
						userData.buildingIsOwned(building.asInstanceOf[BuildingWithLevel].getKey)
					}) //controllo le precondizioni
					val resourceCheck = nextLevelBuilding.getCost.getQuantityResource.forall((resource) => {
							userData.getOwnedResource(resource.getResource.getKey).getQuantity >= resource.getQuantity
						})
					//controllo delle risorse
					val workersavaible = userData.getOwnedUnitMap.values.foldLeft(0)((current, unit) => {
						//sommo uno per ogni unità posseduta che è lavoratore
						var count = current
						if (unit.getUnit.getIsBuilder)
							count += unit.getQuantity
						count
					}) - userData.getOwnedBuildingsMap.values.foldLeft(0)((current: Int, building) => {
						//per ogni edificio posseduto sommo 1 se non è finito
						var count = current
						if (!building.getIsFinished) {
							count += 1
						}
						count
					})
					//e sottraggo gli edifici dai lavoratori in modo da avere il numero di lavoratori impegnati
					answer = "data:false, resources:" + resourceCheck + ", precondition:" + preconditionCheck + ", workers:" + workersavaible + ", messages:" + parsePiggy(userData.getPiggy)
					if (preconditionCheck && resourceCheck && workersavaible > 0) {
						//se entro in questo ramo significa che ho tutte le condizioni soddisfatte per poter potenziare una costruzione
						upgradeBuilding(userData, building, nextLevelBuilding)
						//chiamo il metodo ausiliario che mi permette di potenziare l'edificio
						answer = "data:true, messages:" + parsePiggy(userData.getPiggy)
					}
				} else {
					//autenticazione non andata a buon fine
					answer = "data:false, authentication:false"
				}
			} catch {
				case _: NoSuchElementException => answer = "data:false, parameters:false"
			}
		}
		"{" + answer + "}"
	}

	/**
	 * Metodo utilizzato dalla classe per effettuare l'upgrade, il metodo richiede che i test di consistenza con i dati siano stati eseguiti.
	 * @param data I dati utente di chi richieda l'upgrade.
	 * @param possession La BuildingPossession corrente.
	 * @param level Il modello della costruzione di livello superiore.
	 * @return Unit
	 */
	private def upgradeBuilding(data: UserData, possession: BuildingPossession, level: BuildingWithLevel) = {
		val building = data.getOwnedBuilding(possession.getKey)
		//mi prendo la costruzione in questione
		data.removeBuildingPossession(possession)
		//rimuovo la costruzione corrente da quelle possedute
		building.setBuilding(level)
		//cambio il modello di costruzione alla costruzione da migliorare
		data.addBuildingPossession(building)
		//e lo aggiungo alle costruzione possedute.
		building.setTime(System.currentTimeMillis / 1000L)
		//imposto il tempo di inizio costruzione al tempo corrente in secondi.
		val unitInProgress = building.getUnitInProgress
		//prendo le unità che erano in coda
		if (unitInProgress != null) //se ci sono
			building.getUnitInProgress.setQuantity(0) //le metto a zero
		level.getCost.getQuantityResource.foreach((resource) => {
			//per ogni risorsa richiesta
			val owned = data.getOwnedResource(resource.getResource.getKey)
			owned.setQuantity(owned.getQuantity - resource.getQuantity)
			//la rimuovo da quelle possedute.
		})
	}

}
