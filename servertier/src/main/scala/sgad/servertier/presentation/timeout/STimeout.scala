/**
 * FILE: STimeout.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/presentation/timeout
 * DATA CREAZIONE: 26 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-26 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.presentation.timeout

/**
 * Classe che rappresenta i timeout delle richieste all'interno dell'applicazione.
 */
object STimeout {
	/**
	 * Timeout della richiesta HTTP in secondi.
	 */
	var httpRequestTimeoutS: Float	= 22.0F

	/**
	 * Timeout della vita di un worker. Dovrebbe essere più alto di quello della richiesta HTTP in secondi.
	 */
	var httpRequestWorkerTimeoutS: Float = 21.0F

	/**
	 * Timeout della ricerca se l'attore di un utente è vivo. Ogni richiesta di login impiega almeno questo tempo in secondi.
	 */
	var verifyUserActorAliveTimeoutS: Float = 3.0F

	/**
	 * Tempo di vita di una sessione utente senza che l'utente non interagisca con il server in secondi.
	 */
	var userActorLiveTimeoutS: Float = 300.0F

	/**
	 * Timeout di una richiesta interna fra user.
	 */
	var internalRequestTimeoutS: Float = 3.0F

	/**
	 * Inizializza i parametri dei timeout con valori diversi da quelli di default.
	 * @param httpRequestTimeoutS Timeout della richiesta HTTP in secondi.
	 * @param httpRequestWorkerTimeoutS Timeout della vita di un worker. Dovrebbe essere più alto di quello della richiesta HTTP in secondi.
	 * @param verifyUserActorAliveTimeoutS Timeout della ricerca se l'attore di un utente è vivo. Ogni richiesta di login impiega almeno questo tempo in secondi.
	 * @param userActorLiveTimeoutS Tempo di vita di una sessione utente senza che l'utente non interagisca con il server in secondi.
	 * @param internalRequestTimeoutS Timeout di una richiesta interna fra user.
	 */
	def inizialize(httpRequestTimeoutS : Float, httpRequestWorkerTimeoutS: Float, verifyUserActorAliveTimeoutS: Float, userActorLiveTimeoutS: Float,
	               internalRequestTimeoutS: Float) = {
		this.httpRequestTimeoutS = httpRequestTimeoutS
		this.httpRequestWorkerTimeoutS = httpRequestWorkerTimeoutS
		this.verifyUserActorAliveTimeoutS = verifyUserActorAliveTimeoutS
		this.userActorLiveTimeoutS = userActorLiveTimeoutS
		this.internalRequestTimeoutS = internalRequestTimeoutS
	}

	/**
	 * Metodo getter per l'attributo httpRequestTimeoutS.
	 * @return Timeout della richiesta HTTP in secondi.
	 */
	def getHttpRequestTimeoutS = httpRequestTimeoutS

	/**
	 * Metodo getter per l'attributo httpRequestWorkerTimeoutS.
	 * @return Timeout della vita di un worker. Dovrebbe essere più alto di quello della richiesta http in secondi.
	 */
	def getHttpRequestWorkerTimeoutS = httpRequestWorkerTimeoutS

	/**
	 * Metodo getter per l'attributo verifyUserActorAliveTimeoutS.
	 * @return Timeout della ricerca se l'attore di un utente è vivo. Ogni richiesta di login inmpiega almeno questo tempo in secondi.
	 */
	def getVerifyUserActorAliveTimeoutS	= verifyUserActorAliveTimeoutS

	/**
	 * Metodo getter per l'attributo userActorLiveTimeoutS.
	 * @return Tempo di vita di una sessione utente senza che l'utente non interagisca con il server in secondi.
	 */
	def getUserActorLiveTimeoutS = userActorLiveTimeoutS

	/**
	 * Metodo getter per l'attributo internalRequestTimeoutS.
	 * @return Tempo massimo per cui si aspetta una internal Request.
	 */
	def getInternalRequestTimeoutS = internalRequestTimeoutS
}
