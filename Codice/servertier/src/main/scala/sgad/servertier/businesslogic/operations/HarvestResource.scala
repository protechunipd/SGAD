/**
 * FILE: HarvestResource.scala
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

import sgad.servertier.dataaccess.data.userdata.UserData

/**
 * Classe per la gestione dell'operazione di raccolta risorse da un edificio.
 */
class HarvestResource extends Operation {
	/**
	 * Metodo di esecuzione della raccolta.
	 * @param userData Dati dell'utente su cui verrà effettuata l'operazione.
	 * @param data Dati accompagnatori alla richiesta dell'operazione.
	 * @param loginAuthorization Autorizzazione a operare richieste di login. Di default è false.
	 * @param registrationAuthorization Autorizzazione a operare richieste di registrazione. Di default è false.
	 * @param userAuthorization Autorizzazione a operare richieste di user. Di default è false.
	 * @param internalAuthorization Autorizzazione a operare richieste interne. Di default è false.
	 * @return Stringa di risposta in seguito all'operazione di raccolta risorse da un edificio.
	 */
	def execute(userData: UserData, data: String, loginAuthorization: Boolean, registrationAuthorization: Boolean,
	            userAuthorization: Boolean, internalAuthorization: Boolean): String = {
		val harvestTime = System.currentTimeMillis / 1000L
		var answer = "data:false, authorization:false"
		if (userAuthorization) {
			//controllo autorizzazione
			try {
				OperationFactory.getOperation("UpdateUserData").execute(userData, "", internalAuthorization = true)
				val dataMap = decodeData(data)
				if (userData.getAuthenticationData.getAuthenticationString == dataMap("authentication")) {
					val key = dataMap("key") //controllo se i dati sono parserizzati corretamente altrimenti ritorno falso
					val building = userData.getOwnedBuilding(key)
					val resource = building.getBuilding.getProductedResource //recupero le risorse prodotte dall'edificio
					if (resource != null && building.getIsFinished) {
						//se produce
						val productionTime = resource.getRelativeTime //prendo il tempo necessario alla produzioneì
						val productedResources = Math.min(Math.floor((harvestTime - building.getTime) / productionTime).toInt * resource.getQuantity, resource.getMaxQuantity) //calcolo la quantita di risorse che avrebbe prodotto
						val currentOwnedResources = userData.getOwnedResource(resource.getResource.getKey)
						currentOwnedResources.setQuantity(currentOwnedResources.getQuantity + productedResources) //aggiorno la quantità di risorsa posseduta e ritorno true
						building.setTime(
							if (productedResources == resource.getMaxQuantity)
								harvestTime
							else
								harvestTime - harvestTime % productionTime
						)
						answer = "data:{result:true,quantity:" + productedResources + "}, messages:" + parsePiggy(userData.getPiggy)
					} else {
						answer = "data:false, precondition:false, messages:" + parsePiggy(userData.getPiggy)
					}
				} else {
					answer = "data:false, authentication:false"
				}
			} catch {
				case c: Exception => answer = "data:false, exception:true"
			}
		}
		"{" + answer + "}"
	}
}
