/**
 * FILE: ToWorkerRegistrationRequest.scala
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
 * Classe per il messaggio di elaborazione di una richiesta di registrazione al WorkerActor.
 * @constructor
 * @param user Username dell'utente.
 * @param email Email dell'utente.
 * @param password1 Password dell'utente.
 * @param password2 Password dell'utente ripetuta per doppia conferma.
 */
case class ToWorkerRegistrationRequest(user: String, email: String, password1: String, password2: String){
	/**
	 * Converte la classe nel formato di dati compatibili per le operations.
	 * @return i dati della richiesta nel formato compitibile dalle operations.
	 */
	def data = "user:"+user+",email:"+email+",password1:"+password1+",password2:"+password2
}
