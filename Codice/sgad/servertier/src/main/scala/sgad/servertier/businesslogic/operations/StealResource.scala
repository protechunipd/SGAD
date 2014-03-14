/**
 * FILE: StealResource.scala
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
import sgad.servertier.presentation.usermanager.InternalRequester

/**
 * Classe che rappresenta l'operazione di saccheggio dopo aver vinto una battaglia.
 */
class StealResource extends Operation{
	/**
	 * Esegue l'operazione di saccheggio dopo aver vinto una battaglia.
	 * @param userData Dati dell'utente su cui verrà effettuata l'operazione.
	 * @param data Dati accompagnatori alla richiesta dell'operazione.
	 * @param loginAuthorization Autorizzazione a operare richieste di login. Di default è false.
	 * @param registrationAuthorization Autorizzazione a operare richieste di registrazione. Di default è false.
	 * @param userAuthorization Autorizzazione a operare richieste di user. Di default è false.
	 * @param internalAuthorization Autorizzazione a operare richieste interne. Di default è false.
	 * @return Stringa da restituire.
	 */
	def execute(userData: UserData, data: String, loginAuthorization: Boolean,
	            registrationAuthorization: Boolean, userAuthorization: Boolean, internalAuthorization: Boolean): String =  {
		if(userAuthorization){
			try{
				val mapData = decodeData(data)
				if(userData.getAuthenticationData.getAuthenticationString == mapData("authentication"))
				{
					if(userData.isUserAttacked(mapData("user")))
					{
						//user in mappa dati è l'utente da saccheggiare
						//Devo assicurarmi che l'attore dell'user che voglio ataccare sia vivo
						val internalLoginResponse = OperationFactory.getOperation("InternalLogin").execute(userData, "user:" + mapData("user"), internalAuthorization = true)
						internalLoginResponse match {
							case "Username inesistente" => return "{data: false, otherUser: false, messages: " + parsePiggy(userData.getPiggy) + "}"
							case "Errore interno" => return "{data: false, service: false, messages: " + parsePiggy(userData.getPiggy) + "}"
							case "Servizio momentameamente non disponibile" => return "{data: false, service: false, messages: " + parsePiggy(userData.getPiggy) + "}"
							case "Yes" => //do nothing and go on
						}

						val requestData = "userFrom:" + userData.getAuthenticationData.getUser + ",key:"+mapData("key")

						val result = InternalRequester.sendInternalRequest(mapData("user"), "ReceiveStealResource", requestData)

						//Nel caso in cui l'attore sia morto tra il controllo e il mandare il messaggio rispondo false
						result match {
							case "Attore non disponibile" => return "{data: false, actor: false, messages: " + parsePiggy(userData.getPiggy) + "}"
							case _ => //Rimuvo l'user dagli attacchi vinti
								userData.removeUserAttacked(mapData("user"))
						}

						var answer = "quantity: 0"

						//Controlla lo stato della risposta e nel caso aggiungi le risorse rubate
						val responseMap = decodeData(result)
						if(responseMap("result").toBoolean)
						{
							val ownedResource = userData.getOwnedResource(responseMap("resource"))
							ownedResource.setQuantity( ownedResource.getQuantity + responseMap("quantity").toInt )
							answer = "quantity: " + responseMap("quantity").toInt
						}

						"{data: {" + answer + "},messages: " + parsePiggy(userData.getPiggy) + "}"
					}
					else
						"{data: false, userAttacked: false}"
				}
				else
					"{data: false, authentication: false}"
			}
			catch {
				case _: NoSuchElementException => return "{data: false, parameters: false}"
				case _: Exception => return "{data: false, internalError: true}"
			}
		}
		else
			"{data: false, unauthorized: true}"
	}
}
