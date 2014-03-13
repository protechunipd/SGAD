/**
 * FILE: ToWorkerLoginRequest.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/presentation/messages
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.presentation.messages

/**
 * Classe per il messaggio di elaborazione di una richiesta di login al WorkerActor.
 * @constructor
 * @param user Username dell'utente.
 * @param password Password dell'utente.
 */
case class ToWorkerLoginRequest(user: String, password: String){
	/**
	 * Converte la classe nel formato di dati compatibili per le operations.
	 * @return I dati della richiesta nel formato compitibile dalle operations.
	 */
	def data = "user:"+user+",password:"+password
}
