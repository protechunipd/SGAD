/**
 * FILE: UpdateUserData.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 24 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-24 - Creazione della classe - Segantin Fabio
 */
package sgad.servertier.businesslogic.operations

import sgad.servertier.dataaccess.data.userdata.{UnitInProgress, BuildingPossession, UserData}
import sgad.servertier.dataaccess.data.shareddata.BuildingWithLevel

/**
 * Mantiene aggiornati i dati dell'utente in merito alle costruzioni e alle unità in coda di produzione.
 */
class UpdateUserData extends Operation {
	/**
	 * Metodo per eseguire l'update dei dati dell'utente riguardanti le costruzioni e le unità in coda di produzione.
	 * @param userData Dati dell'utente su cui verrà effettuata l'operazione.
	 * @param data Dati accompagnatori alla richiesta dell'operazione.
	 * @param loginAuthorization Autorizzazione a operare richieste di login. Di default è false.
	 * @param registrationAuthorization Autorizzazione a operare richieste di registrazione. Di default è false.
	 * @param userAuthorization Autorizzazione a operare richieste di user. Di default è false.
	 * @param internalAuthorization Autorizzazione a operare richieste interne. Di default è false.
	 * @return Stringa da restituire.
	 */
	def execute(userData: UserData, data: String, loginAuthorization: Boolean = false, registrationAuthorization: Boolean = false,
	            userAuthorization: Boolean = false, internalAuthorization: Boolean = false): String = {
		if (internalAuthorization) {
			val buildings = userData.getOwnedBuildingsMap.values
			val unitInProgress = buildings.map((building: BuildingPossession) => {
				if (!building.getIsFinished)
					updateBuildings(building, userData)
				(building.getUnitInProgress, building.getBuilding)
			})
			unitInProgress.foreach((unit: (UnitInProgress, BuildingWithLevel)) => updateUnits(unit._1, userData, unit._2))
		}
		""
	}

	/**
	 * Update delle unità.
	 * @param unit Indica la unitInProgress da aggiornare.
	 * @param userData L'userdata a cui le unità appartengono.
	 * @param building Il tipo di edificio che produce le unità da aggiornare.
	 * @return Unit
	 */
	private def updateUnits(unit: UnitInProgress, userData: UserData, building: BuildingWithLevel) = {
		if (unit != null) {
			val start: Long = unit.getStartedTime
			val currentUnit = unit.getUnit
			val timeCost = Math.floor(currentUnit.getCost.getRelativeTime * (if (building.getBonus.getType == 1) building.getBonus.getQuantity else 1)).toInt
			var numberOfUnits = Math.floor(((System.currentTimeMillis / 1000L)
				- start) / timeCost).toInt
			numberOfUnits = if (unit.getQuantity < numberOfUnits)
				unit.getQuantity
			else
				numberOfUnits
			val unitPossession = userData.getOwnedUnit(currentUnit.getKey)
			unitPossession.setQuantity(unitPossession.getQuantity + numberOfUnits)
			unit.updateTime(timeCost * numberOfUnits)
			unit.updateQuantity(numberOfUnits)
		}
	}

	/**
	 * Update degli edifici.
	 * @param building Indica la BuildingPossession da aggiornare.
	 * @param userData Sono i dati dell'utente che richiede l'operazione.
	 * @return Unit
	 */
	private def updateBuildings(building: BuildingPossession, userData: UserData): Unit = {
		val timeDifference = (System.currentTimeMillis / 1000L) - (building.getTime + building.getBuilding.getCost.getRelativeTime)
		if (timeDifference > 0) {
			userData.addOwnedBuildingWithLevel(building.getBuilding.getKey)
			building.setIsFinished(state = true)
			building.setTime((System.currentTimeMillis / 1000L) - timeDifference)
		}
	}
}