/**
 * FILE: ReceiveStealResource.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 28 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-28 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.businesslogic.operations

import sgad.servertier.dataaccess.data.userdata.UserData
import java.util.NoSuchElementException

/**
 * Classe che rappresenta l'operazione interna di ricezione di un attacco e computo dell'esito dello scontro.
 */
class ReceiveStealResource extends Operation{
	/**
	 * Metodo astratto che rappresenta l'esecuzione di un'operazione.
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
		var answer = "result:false"
		if(internalAuthorization){
			//richiesta autorizzata
			OperationFactory.getOperation("UpdateUserData").execute(userData, "", internalAuthorization = true)
			//aggiorno i dati utente
			try {
				val dataMap = decodeData(data)
				val harvestTime = System.currentTimeMillis / 1000L
				//recupero il tempo di raccolta
				val building = userData.getOwnedBuilding(dataMap("key"))
				//recupero il riferimento alla costruzione da raziare
				val resource = building.getBuilding.getProductedResource
				//recupero le risorse prodotte dall'edificio
				val user = dataMap("userFrom")
				if (resource != null && building.getIsFinished) {
					val productionTime = resource.getRelativeTime
					//prendo il tempo necessario alla produzioneì
					val productedResources = Math.min(((harvestTime - building.getTime) / productionTime).toInt * resource.getQuantity, resource.getMaxQuantity)
					//calcolo la quantita di risorse che ha prodotto confrontando il numero effettivo con il massimo immagazzinabile.
					val stealTime = if (productedResources == resource.getMaxQuantity)
						harvestTime
					else
						harvestTime - harvestTime % productionTime
					building.setTime(
						//setto correttamente il tempo di ultima raccolta
						stealTime
					)
					userData.addLogToPiggy("{operation: \"Log\", data:\"" + Operation.dateFormat.format(System.currentTimeMillis) + ": " + user + " ha razziato " + productedResources + " " + resource.getResource.getKey + " da un tuo edificio.\"}")
					userData.addOperationToPiggy("{operation: \"GetStealResource\", data:{ key:\"" + building.getKey + "\", quantity:" + productedResources + ", time:" + stealTime + "}}")
					answer = "result:true,resource:" + resource.getResource.getKey + ",quantity:" + productedResources
				}
				else answer = "result:false"

			} catch {
				case _: NoSuchElementException => answer = "result:false" //l'elemento non è posseduto e non esiste nel sistema.
			}
		}
		answer
	}
}
