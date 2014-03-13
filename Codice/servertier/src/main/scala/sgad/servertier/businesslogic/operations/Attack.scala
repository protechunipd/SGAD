/**
 * FILE: Attack.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 28 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-28 - Creazione della classe - Biancucci Maurizio
 * 2014-03-07 - Integrate funzionalità mancanti - Segantin Fabio
 */
package sgad.servertier.businesslogic.operations

import sgad.servertier.dataaccess.data.userdata.{UnitPossession, UserData}
import sgad.servertier.dataaccess.data.shareddata.Unit
import sgad.servertier.presentation.usermanager.InternalRequester
import sgad.servertier.dataaccess.data.shareddata.DataFactory


/**
 * Classe che rappresenta l'operazione di lancio attacco ad un altro utente.
 */
class Attack extends Operation {

	/**
	 * Esegue l'attacco vero e proprio fornendo una risposta da dare al client.
	 * @param userData Dati dell'utente su cui verrà effettuata l'operazione.
	 * @param mapData Dati in input alla operazione già codificati.
	 * @return Risposta dell'attacco da passare al client.
	 */
	private def executeAttack(userData: UserData, mapData: Map[String, String]): String = {
		var requestData = "userFrom:" + userData.getAuthenticationData.getUser
		DataFactory.getUnitsMap.keys.foreach((unitKey: String) => {
			if(DataFactory.getUnit(unitKey).getAttack != 0 && DataFactory.getUnit(unitKey).getDefence != 0)
				requestData += ("," + unitKey + ":" + mapData.getOrElse(unitKey, 0))
		})

		val response = InternalRequester.sendInternalRequest(mapData("user"), "ReceiveAttack", requestData)
		//Nel caso in cui l'attore sia morto tra il controllo e il mandare il messaggio rispondo false
		response match {
			case "Attore non disponibile" => return "{data: false, actor: false}"
			case _ => //Do nothing and go on
		}
		val responseMap = decodeData(response)

		val answer = "{result:" + responseMap("result") + ", ownedUnits:[" +
			DataFactory.getUnitsMap.values.filter(!_.getIsBuilder).map((unit: `Unit`) => {
				//per ogni unità
				val ownedUnit = userData.getOwnedUnit(unit.getKey)
				//recupero le unità possedute
				ownedUnit.setQuantity(ownedUnit.getQuantity - responseMap("lostatt" + unit.getKey).toInt)
				//rimuovo quelle perse per lo scontro

				//aggiungo all'array la risposta parserizzata
				"{unit: \"" + unit.getKey + "\", sendToAttack: " + responseMap("originalatt" + unit.getKey) + ", lost: " + responseMap("lostatt" + unit.getKey) + "}"
			}).mkString(", ") + "], avversaryUnits: [" + DataFactory.getUnitsMap.values.filter(!_.getIsBuilder).map((unit: `Unit`) => {
			//per ogni unità in difesa parserizzo correttamente la risposta
			"{unit: \"" + unit.getKey + "\", sendToAttack: " + responseMap("originaldef" + unit.getKey) + ", lost: " + responseMap("lostdef" + unit.getKey) + "}"
		}).mkString(", ") + "]"

		//gli arrray vengono spezzati con mkString per completare la risposta.

		var userAttacked = "\"void\""
		//Se l'attacco è vinto lo inserisco nella lista degli attacchi vinti cosi che poi l'azione di saccheggio venga autorizzata
		if (responseMap("result").toBoolean){
			userData.addUserAttacked(mapData("user"))
			//Aggiungo alla risposta i dati del villaggio dell'utente
			userAttacked = responseMap("userAttacked").replaceAll("\\|", ",").replaceAll("=", ":").replaceAll("/", "\\}")
		}

		//Ritorna all'utente l'esito dell'attacco e il villaggio dell'altro utente e il piggy
		"{data: " + answer + ",otherVillage:" + userAttacked + "},messages: " + parsePiggy(userData.getPiggy) + "}"
	}

	/**
	 * Metodo che esegue l'operazione di lancio di un attacco ad un altro utente.
	 * @param userData Dati dell'utente su cui verrà effettuata l'operazione.
	 * @param data Dati accompagnatori alla richiesta dell'operazione.
	 * @param loginAuthorization Autorizzazione ad operare richieste di login. Di default è false.
	 * @param registrationAuthorization Autorizzazione ad operare richieste di registrazione. Di default è false.
	 * @param userAuthorization Autorizzazione ad operare richieste di user. Di default è false.
	 * @param internalAuthorization Autorizzazione ad operare richieste interne. Di default è false.
	 * @return Stringa da restituire.
	 */
	def execute(userData: UserData, data: String, loginAuthorization: Boolean, registrationAuthorization: Boolean,
	            userAuthorization: Boolean, internalAuthorization: Boolean): String = {

		if (userAuthorization) {
			try {
				val mapData = decodeData(data)
				//Ritorna il valore del blocco if
				if (userData.getAuthenticationData.getAuthenticationString == mapData("authentication")) {

					OperationFactory.getOperation("UpdateUserData").execute(userData, "", internalAuthorization = true)

					//Devo assicurarmi che l'attore dell'user che voglio ataccare sia vivo
					val internalLoginResponse = OperationFactory.getOperation("InternalLogin").execute(userData, "user:" + mapData("user"), internalAuthorization = true)

					internalLoginResponse match {
						case "Username inesistente" => return "{data: false, otherUser: false, messages: " + parsePiggy(userData.getPiggy) + "}"
						case "Errore interno" => return "{data: false, service: false, messages: " + parsePiggy(userData.getPiggy) + "}"
						case "Servizio momentameamente non disponibile" => return "{data: false, service: false, messages: " + parsePiggy(userData.getPiggy) + "}"
						case "Yes" => //do nothing and go on
					}

					val ownedUnits: Boolean = userData.getOwnedUnitMap.values.forall((unit: UnitPossession) => {
						if(unit.getUnit.getAttack != 0 && unit.getUnit.getDefence != 0)
							unit.getQuantity >= mapData(unit.getKey).toInt
						else
							true
					})
					if (ownedUnits) {
						executeAttack(userData, mapData)
					}
					else
						"{data: false, owned:false}"
				}
				else
					"{data: false, authentication: false}"
			}
			catch {
				case _: NoSuchElementException => return "{data: false, parameters: false }"
				case _: ClassCastException => return "{data: false, parameters: false }"
				case _: NumberFormatException => return "{data: false, parameters: false }"
			}
		}
		else
			"{data: false, unauthorized: true}"
	}
}
