/**
 * FILE: DemolishBuildings.scala
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

import sgad.servertier.dataaccess.data.userdata.UserData
import java.util.NoSuchElementException

/**
 * Classe che rappresenta la demolizione di un edificio.
 */
class DemolishBuilding extends Operation {
	/**
	 * Metodo di esecuzione della demolizione.
	 * @param userData Dati dell'utente su cui verrà effettuata l'operazione.
	 * @param data Dati accompagnatori alla richiesta dell'operazione.
	 * @param loginAuthorization Autorizzazione a operare richieste di login. Di default è false.
	 * @param registrationAuthorization Autorizzazione a operare richieste di registrazione. Di default è false.
	 * @param userAuthorization Autorizzazione a operare richieste di user. Di default è false.
	 * @param internalAuthorization Autorizzazione a operare richieste interne. Di default è false.
	 * @return Stringa di risposta a seguito dell'esecuzione della demolizione.
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
					//controllo stringhe di autenticazione
					val building = userData.getOwnedBuilding(dataMap("key"))
					if (building.getBuilding.getIsDestructible) {
						//controllo che la costruzione sia distruttibile
						userData.removeBuildingPossession(building)
						building.getBuilding
							.getCost
							.getQuantityResource
							.foreach((resource) => {
							val owned = userData.getOwnedResource(resource.getResource.getKey)
							owned.setQuantity(owned.getQuantity + (resource.getQuantity / 2))
						})
						//recupero il costo necessario per la sua costruzione e ne restituisco la metà.
						answer = "data:true, messages:" + parsePiggy(userData.getPiggy)
					} else {
						//l'edificio è indistruttibile
						answer = "data:false, undestructible:true, messages:" + parsePiggy(userData.getPiggy)
					}
				} else {
					//l'autenticazione della richiesta non è riuscita
					answer = "data:false, authentication:false"
				}
			} catch {
				case _: NoSuchElementException => //risposta falsa di default
			}
		}
		"{" + answer + "}"
	}
}
