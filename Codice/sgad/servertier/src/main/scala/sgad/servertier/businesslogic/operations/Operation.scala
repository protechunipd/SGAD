/**
 * FILE: Operation.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Biancucci Maurizio
 * 2014-02-23 - Aggiunta implementazione decodeData - Segantin Fabio
 */
package sgad.servertier.businesslogic.operations

import sgad.servertier.dataaccess.data.userdata.UserData
import scala.collection.immutable.Map
import scala.util.matching.Regex
import scala.collection.mutable.ArrayBuffer
import java.text.SimpleDateFormat

/**
 * Classe astratta per l'esecuzione di un'operazione.
 */
trait Operation {

	/**
	 * Decodifica i dati in input restituendo una mappa facile da utilizzare.
	 * @param data Stringa dei dati in input da decodificare.
	 * @return Mappa da restituire.
	 */
	protected def decodeData(data: String): Map[String, String] = {
		val replacedData = data.replaceAll("\\$", " ") //Il client manda $ al posto degli spazi e prima di valutarla li reinserisco
		val pattern = new Regex("((\\{|,)*([^,:]+?)(:))([^,}]*)(\\})*")
		pattern.findAllIn(replacedData).matchData.map[(String, String)](
			m => {
				if (m.group(5).length > 0)
					(m.group(3), m.group(5))
				else
					(null, null)
			}
		).toMap
	}

	/**
	 * Metodo utilizzato per fare il parsing dei messaggi PiggyBack per restituirli al client.
	 * @param piggy Il riferimento all'arraybuffer dei messaggi.
	 * @return Il messaggio finale.
	 */
	def parsePiggy(piggy: ArrayBuffer[String]) = {
		val ritorno = if (piggy.size > 0) piggy.mkString("[", ",", "]")
		else "[]"
		piggy.trimEnd(piggy.size)
		ritorno
	}

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
	def execute(userData: UserData, data: String, loginAuthorization: Boolean = false, registrationAuthorization: Boolean = false,
	            userAuthorization: Boolean = false, internalAuthorization: Boolean = false): String
}

/**
 * Companion Object per Operation.
 */
object Operation {
	/**
	 * Attributo utilizzato per restituire la data corrente formattata in maniera adeguata.
	 */
	val dateFormat: SimpleDateFormat = new java.text.SimpleDateFormat("dd/MM/yy HH:mm:ss")
}