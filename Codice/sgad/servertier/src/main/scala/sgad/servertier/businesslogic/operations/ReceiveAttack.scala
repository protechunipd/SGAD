/**
 * FILE: ReceiveAttack.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 28 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-28 - Creazione della classe - Biancucci Maurizio
 * 2014-03-06 - Stesura della classe - Segantin Fabio
 */
package sgad.servertier.businesslogic.operations

import sgad.servertier.dataaccess.data.userdata.{BuildingPossession, UnitPossession, UserData}
import sgad.servertier.dataaccess.data.shareddata.{DataFactory, Unit}
import scala.collection.mutable
import java.util.NoSuchElementException
import sgad.servertier.dataaccess.databaseaccess.userdatadao.BuildingPossessionDAO
import com.mongodb.casbah.Imports._

/**
 * Classe che gestisce la ricezione dell'attacco ed il computo del risultato della battaglie.
 */
class ReceiveAttack extends Operation{

	/**
	 * Metodo utilizzato per formattare correttamente la risposta.
	 * @param userData I dati dell'utente.
	 * @param attackWin Un booleano relativo all'esito dello scontro.
	 * @param lostAttackingUnits Una mappa che identifica le unità perse dall'attaccante.
	 * @param lostDefendingUnits Una mappa che identifica le unità perse dal difensore.
	 * @param dataMap Una mappa dei dati in ingresso all'operazione.
	 * @return La risposta formattata.
	 */
	private def getAnswer(userData: UserData, attackWin: Boolean, lostAttackingUnits: mutable.Map[String, Int], lostDefendingUnits: mutable.Map[String, Int], dataMap: Map[String, String]) = {
		"result:" + attackWin + "," +
			lostAttackingUnits.view.map((unit: (String, Int)) => {
				"originalatt" + unit._1 + ":" + dataMap(unit._1) + ",lostatt" + unit._1 + ":" + unit._2
			}).mkString(",") +
			"," +
			lostDefendingUnits.view.map((unit: (String, Int)) => {
				"originaldef" + unit._1 + ":" + userData.getOwnedUnit(unit._1).getQuantity + ",lostdef" + unit._1 + ":" + unit._2
			}).mkString(",")
	}

	/**
	 * Metodo utilizzato per aggiornare i piggyBack di un user durante un attacco.
	 * @param userData Riferimento ai dati utente.
	 * @param lostDefendingUnits Mappa contenente il numero di unità perdute dal difensore.
	 * @param lostAttackingUnits Mappa contenente il numero di unità perdute dall'attaccante.
	 * @param attackingUser Nome dell'attaccante.
	 * @param attackingUnitsLog Le unità attaccanti già formattate per il log.
	 * @param attackWin Booleano per identificare se si è vinto o perso lo scontro.
	 */
	private def updatePiggys(userData: UserData, lostDefendingUnits: mutable.Map[String, Int], lostAttackingUnits: mutable.Map[String, Int], attackingUser: String, attackingUnitsLog: String, attackWin: Boolean) {
		val lostAttackingUnitsLog = lostAttackingUnits.view.map((unit: (String, Int)) => {
			unit._1 + ": " + unit._2
		}).mkString(", ")
		//formattazione delle unità perse per il log
		val lostDefendingUnitsLog = lostDefendingUnits.view.map((unit: (String, Int)) => {
			unit._1 + ": " + unit._2
		}).mkString(", ")
		//formattazione delle unità perse per il log
		userData.addLogToPiggy("{operation:\"Log\", data:\"" + Operation.dateFormat.format(System.currentTimeMillis) + ": L'utente " + attackingUser + " ti ha attaccato con " +
			attackingUnitsLog + ", hai " +
			(if (attackWin) "perso" else "vinto") + " la battaglia. Unità perdute: Attacco: " +
			lostAttackingUnitsLog + ". Difesa: " + lostDefendingUnitsLog + ".\"}")
		userData.addOperationToPiggy("{operation:\"GetAttack\", data:{lostUnits:[" +
			lostDefendingUnits.view.map((unit: (String, Int)) => {
				"{unit:\"" + unit._1 + "\", quantity: " + unit._2 + "}"
			}).mkString(", ")
			+ "]}}")
		//viene creata una voce di log all'interno della lista di piggyBack da Log
	}

	/**
	 * Metodo che gestisce la ricezione dell'attacco e il computo del risultato della battaglie.
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
		var answer: String = "error:true"
		if(internalAuthorization)
		{
			//{userFrom:blabla,fant:2,carrod'assalto:0,cavalier:2}
			OperationFactory.getOperation("UpdateUserData").execute(userData, "", internalAuthorization = true)
			val dataMap = decodeData(data)
			try {
				val attackingUser = dataMap("userFrom")
				val attackingUnits = mutable.Map[String, Int]() ++ DataFactory.getUnitsMap.values.filter(!_.getIsBuilder).map((attackingUnit: `Unit`) => {
					(attackingUnit.getKey, dataMap(attackingUnit.getKey).toInt)
				})
				//creo una mappa contentente la quantità di unità in attacco assegnate alla chiave dell'unità in questione.
				val defendingUnits = mutable.Map[String, Int]() ++ userData.getOwnedUnitMap.values.filter(!_.getUnit.getIsBuilder).map((defendingUnit: UnitPossession) => {
					(defendingUnit.getKey, defendingUnit.getQuantity)
				}).toMap
				//creo una mappa contentente la quantità di unità in difesa assegnate alla chiave dell'unità in questione.
				val attackingUnitsLog = attackingUnits.view.map((unit: (String, Int)) => {
					unit._1 + ": " + unit._2
				}).mkString(", ")
				val lostAttackingUnits = mutable.Map[String, Int]() ++ attackingUnits.keys.map((key) => {
					(key, 0)
				})
				//mappa per memorizzare le unità perdute dall'attaccante
				val lostDefendingUnits = mutable.Map[String, Int]() ++ defendingUnits.keys.map((key) => {
					(key, 0)
				})
				//mappa per memorizzare le unità perdute dal difensore
				val attackWin = makeFight(attackingUnits, defendingUnits, lostAttackingUnits, lostDefendingUnits)
				//memorizza se l'attacco ha vinto chiamando il metodo ausiliario
				answer = getAnswer(userData, attackWin, lostAttackingUnits, lostDefendingUnits, dataMap)
				//viene assegnata al valore di answer il messaggio di risposta formattato correnttamente
				defendingUnits.foreach((unit: (String, Int)) => {
					userData.getOwnedUnit(unit._1).setQuantity(unit._2)
				})
				//vengono aggiornate le unità possedute dal dfensore
				updatePiggys(userData, lostDefendingUnits, lostAttackingUnits, attackingUser, attackingUnitsLog, attackWin)
				//Attacco alla risposta i dati delle costruzioni per permettere all'attacante vincitore di rubare risorse da un edificio
				if(attackWin)
				{
					val buildingVector: Vector[DBObject] = userData.getOwnedBuildingsMap //recupero il vettore
						.map((couple: (String, BuildingPossession)) => {
						//lo mappo prendendo solo le building
						couple._2
						//restituisce il secondo elemento della coppia
					}).toVector //lo casto a vettore
						.map((b: BuildingPossession) => {
						//trasformo le building in MongoObject
						BuildingPossessionDAO.getMongoObject(b)
					})

					val village = MongoDBObject("authenticationData" -> MongoDBObject("user" -> userData.getAuthenticationData.getUser),
						"ownedBuildings" -> buildingVector).toString.replaceAll(":", "=").replaceAll(",", "|").replaceAll("\\}", "/")

					answer += ",userAttacked:"+"{userData= " + village + "| realUser= false/"
				}
			}
			catch {
				case _: ClassCastException => answer = "parameters:false" //C'è stato un errore durante la parserizzazione di un elemento
				case _: NoSuchElementException => answer = "parameters:false" //l'elemento non è posseduto e non esiste nel sistema.
				case _: NumberFormatException => answer = "parameters:false"
			}
		}
		answer
	}

	/**
	 * Metodo ausiliario per calcolare l'esito della battaglia.
	 * @param attackingUnits Una mappa contenente la quantità mappata con la chiave delle unità in attacco.
	 * @param defendingUnits Una mappa contenente la quantità mappata con la chiave delle unità in difesa.
	 * @param lostAttackingUnits Una mappa in cui mappare le unità perse durante lo scontro per l'attaccante.
	 * @param lostDefendingUnits Una mappa in cui mappare le unità perse durante lo scontro dalla difesa.
	 * @return True se l'attaccante ha vinto, altrimenti false.
	 */
	private def makeFight(attackingUnits: mutable.Map[String, Int], defendingUnits: mutable.Map[String, Int]
	                      , lostAttackingUnits: mutable.Map[String, Int], lostDefendingUnits: mutable.Map[String, Int]) = {
		//sommo la potenza di attacco delle unità in attacco.
		var attackingPower = attackingUnits.foldLeft(0)((current, unit: (String, Int)) => {
			current + DataFactory.getUnit(unit._1).getAttack * unit._2
		})
		//sommo la potenza di attacco delle unità in difesa.
		var defendingPower = defendingUnits.foldLeft(0)((current, unit: (String, Int)) => {
			current + DataFactory.getUnit(unit._1).getAttack * unit._2
		})
		//Il ciclo continua finchè ci sono ancora unità e finchè c'è ancora potenza di attacco non consumata.
		//questo ciclo si conclude in quanto ad ogni iterazione viene rimossa una quantità di potenza pari alle unità uccise.
		//In questo modo fintantochè ci sono unità la potenza non conusumata diminuisce, quindi basta che entrambe le potenze di attacco vengano ridotte a zero o che uno dei due schieramenti non abbia più unità
		while ((attackingPower > 0 || defendingPower > 0) && !attackingUnits.values.forall(_ == 0) && !defendingUnits.values.forall(_ == 0)) {
			val defendingTotalUnit = defendingUnits.values.sum
			//calcolo il numero di unità totali presenti in difesa ad inizio iterazione.
			val attackingTotalUnit = attackingUnits.values.sum
			//calcolo il numero di unità totali presenti in attacco ad inizion iterazione.
			val initialAttackingValue = attackingPower
			//recuero la potenza di attacco iniziale.
			val initialDefendingValue = defendingPower
			//recupero la potenza di difesa iniziale.
			defendingUnits.foreach((unit: (String, Int)) => {
				//per tutte le unità in difesa
				val percentage = unit._2.toFloat / defendingTotalUnit
				//calcolo il rapporto dell'unità di un certo ripo rispetto al totale.
				val relativeAttack = (percentage * initialAttackingValue).toInt
				//calcolo il danno relativo che questa tipologia di unità riceveranno in questo "turno"
				val realUnit = DataFactory.getUnit(unit._1)
				//recupero un riferimento all'unità effettiva dal datafactory
				val quantity = Math.min(realUnit.getDefence * unit._2, relativeAttack)
				//recupero il minimo tra la quantità di attacco e la difesa delle unità possedute.
				val lostUnits = quantity / realUnit.getDefence
				//calcolo le unità perdute
				attackingPower -= quantity
				//consumo la quantità di attacco appena utilizzato.
				defendingUnits(unit._1) = unit._2 - lostUnits
				//rimuovo le unità appena uccise da quelle rimanenti
				lostDefendingUnits(unit._1) = lostDefendingUnits(unit._1) + lostUnits
				//aggiorno il contatore delle unità perse
			})
			attackingUnits.foreach((unit: (String, Int)) => {
				//per ogni unità di attacco
				val percentage = unit._2.toFloat / attackingTotalUnit
				//calcolo il rapporto dell'unità di un certo tipo rispetto al totale.
				val relativeDefence = percentage * initialDefendingValue
				//recupero la quantità di attacco difensivo che viene rivolto a questo tipo di unità
				val realUnit = DataFactory.getUnit(unit._1)
				//recupero il riferimento all'unità dal datafactory
				val quantity = Math.min(realUnit.getDefence * unit._2, relativeDefence).toInt
				//calcolo il minimo tra la quantità di attacco e la difesa delle unità attaccanti.
				val lostUnits = quantity / realUnit.getDefence
				//calcolo le unità perdute
				defendingPower -= quantity
				//consumo la quantità di attacco difensivo appena utilizzato.
				attackingUnits(unit._1) = unit._2 - lostUnits
				//rimuovo le unità appena uccise da quelle rimanenti
				lostAttackingUnits(unit._1) += lostUnits
				//aggiorno il contatore delle unità perdute
			})
		}
		//creo una mappa contente la quantità di unità in difesa assegnate alla chiave delle unità in questione.
		attackingPower = attackingUnits.foldLeft(0)((current, unit: (String, Int)) => {
			current + DataFactory.getUnit(unit._1).getAttack * unit._2
		})
		//sommo la potenza di attacco delle unità in attacco.
		defendingPower = defendingUnits.foldLeft(0)((current, unit: (String, Int)) => {
			current + DataFactory.getUnit(unit._1).getAttack * unit._2
		})
		attackingPower > defendingPower
	}
}
