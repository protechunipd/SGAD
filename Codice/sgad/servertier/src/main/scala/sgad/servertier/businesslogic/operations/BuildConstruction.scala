/**
 * FILE: BuildConstruction.scala
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

import sgad.servertier.dataaccess.data.userdata.{Position, BuildingPossession, UserData}
import sgad.servertier.dataaccess.data.shareddata.{BuildingWithLevel, DataFactory}
import java.util.NoSuchElementException

/**
 * Classe che rappresenta l'operazione di costruzione di un edificio.
 */
class BuildConstruction extends Operation {
	/**
	 * Esecuzione della costruzione.
	 * @param userData Dati dell'utente su cui verrà effettuata l'operazione.
	 * @param data Dati accompagnatori alla richiesta dell'operazione.
	 * @param loginAuthorization Autorizzazione a operare richieste di login. Di defalut è false.
	 * @param registrationAuthorization Autorizzazione a operare richieste di registrazione. Di defalut è false.
	 * @param userAuthorization Autorizzazione a operare richieste di user. Di defalut è false.
	 * @param internalAuthorization Autorizzazione a operare richieste interne. Di defalut è false.
	 * @return Stringa contenente la risposta.
	 */
	def execute(userData: UserData, data: String, loginAuthorization: Boolean, registrationAuthorization: Boolean,
	            userAuthorization: Boolean, internalAuthorization: Boolean): String = {

		OperationFactory.getOperation("UpdateUserData").execute(userData, "", internalAuthorization = true)
		var answer = "data:false, unauthorized:true"
		if (userAuthorization) {
			//viene controllata l'autorizzazione
			val dataMap = decodeData(data)
			try {
				if (userData.getAuthenticationData.getAuthenticationString == dataMap("authentication")) {
					//controllata la stringa di autenticazione
					val newPosition = new Position(dataMap("x").toInt, dataMap("y").toInt)
					val existanceCheck = userData.getOwnedBuildingsMap.values.forall((building: BuildingPossession) => {
						building.getPosition != newPosition
					}) //controllo non sovrapposizione di edifici
					if (existanceCheck) {
						val objectBuilding = DataFactory.getBuilding(dataMap("key"))
						if (objectBuilding.getIsConstructible) {
							//viene controllato che l'edificio sia costruibile per statistica.
							val preconditionCheck = objectBuilding.getPrecondition.forall((building) => {
								userData.buildingIsOwned(building.asInstanceOf[BuildingWithLevel].getKey)
							}) //controllo le precondizioni
							val resourceCheck = objectBuilding.getCost.getQuantityResource.forall((resource) => {
									userData.getOwnedResource(resource.getResource.getKey).getQuantity >= resource.getQuantity
								}) //controllo se possiede le risorse
							val workersavaible = userData.getOwnedUnitMap.values.foldLeft(0)((current, unit) => {
									//sommo tutti gli elementi conenuti nella mappa delle unità possedute solo se sono lavoratori
									var count = current
									if (unit.getUnit.getIsBuilder)
										count += unit.getQuantity
									count
								}) - userData.getOwnedBuildingsMap.values.foldLeft(0)((current: Int, building) => {
									//per ogni edificio posseduto sommo 1 se non è finito
									var count = current
									if (!building.getIsFinished)
										count += 1
									count
								})
							//ottengo il numero di lavoratori che non stanno eseguendo un lavoro
							if (preconditionCheck && resourceCheck && workersavaible > 0) {
								//gli edifici richiesti, le risorse richieste e i lavoratori disponibili permettono la costruzione dell'edificio in questione
								build(objectBuilding, userData, newPosition)
								answer = "data:true, messages:" + parsePiggy(userData.getPiggy)
							} else
								//non possiede risorse, precondizioni o lavoratori a sufficienza
								answer = "data:false, condition:false, messages:" + parsePiggy(userData.getPiggy)
						} else
							//l'edificio non è costruibile
							answer = "data:false, costructible:false, messages:" + parsePiggy(userData.getPiggy)
					} else
						//l'edificio non può essere costruito sopra ad un altro edificio.
						answer = "data:false, position:false, messages:" + parsePiggy(userData.getPiggy)
				} else
					//l'autenticazione della richiesta non è andata a buon fine.
					answer = "data:false, authentication:false"
			} catch {
				case _: IllegalArgumentException => answer = "data:false, parameters:false" //C'è stato un errore nella costruzione di un elemento
				case _: ClassCastException => answer = "data:false, parameters:false" //C'è stato un errore durante la parserizzazione di un elemento
				case _: NoSuchElementException => answer = "data:false, parameters:false" //l'elemento non è posseduto e non esiste nel sistema.
			}
		}
		"{" + answer + "}" //ritorno la risposta
	}

	/**
	 * Metodo utilizzato dalla classe per effettuare la costruzione, il metodo richiede che i test di consistenza con i dati siano stati eseguiti.
	 * @param objectBuilding È la BuildingWithLevel da costruire.
	 * @param userData I dati utente di chi richieda la costruzione.
	 * @param newPosition È la posizione in cui si costruisce la costruzione.
	 * @return Unit
	 */
	private def build(objectBuilding: BuildingWithLevel, userData: UserData, newPosition: Position) = {
		//i controlli di consistenza sono già stati eseguiti
		//la successiva rimozione di risorse prevede di non settare le risorse a meno di 0.
		objectBuilding.getCost.getQuantityResource.foreach((resource) => {
			//riduco le risorse possedute
			val ownedResource = userData.getOwnedResource(resource.getResource.getKey)
			ownedResource.setQuantity(ownedResource.getQuantity - resource.getQuantity)
		})
		userData.addBuildingPossession(//aggiungo
			//avendo già controllato la posizione e i requisiti sono sicuro di non creare situazioni di inconsistenza
			new BuildingPossession(
				objectBuilding,
				newPosition,
				isFinished = false,
				time = System.currentTimeMillis() / 1000L,
				null
			)
		)
	}
}
