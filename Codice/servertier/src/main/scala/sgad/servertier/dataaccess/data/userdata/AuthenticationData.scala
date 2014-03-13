/**
 * FILE: AuthenticationData.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/dataaccess/data/userdata
 * DATA CREAZIONE: 19 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Creazione della classe - Biancucci Maurizio
 * 2014-02-19 - Aggiunta lancio eccezione Costruttore - Segantin Fabio
 */
package sgad.servertier.dataaccess.data.userdata
import java.security.MessageDigest

/**
 * Classe per la gestione delle informazioni personali e di accesso di un utente.
 * @constructor
 * @param user Il nome utente univoco dell'utente.
 * @param email L'email dell'utente.
 * @param hashPassword L'hash della password dell'utente in SHA-1.
 */
class AuthenticationData(private val user: String, private val email: String, private var hashPassword: String) {
	if (user == null
		|| email == null
		|| hashPassword == null)
		throw new IllegalArgumentException

	/**
	 * La stringa di autenticazione che il client utilizzerà per autenticare le richieste di gioco.
	 */
	private var authenticationString: String = computeAuthenticationString

	/**
	 * Esegue il caloco della stringa di autenticazione che il client utilizzerà per autenticare le richieste.
	 * @return La stringa di autenticazione che il client utilizzerà per autenticare le richieste.
	 */
	private def computeAuthenticationString = {
		AuthenticationData.computeHash("q34523q" +user + "iho7r57d6" + email + "32d1")
	}

	/**
	 * Metodo getter per l'attributo email.
	 * @return L'email dell'utente.
	 */
	def getEmail = email

	/**
	 * Metodo getter per l'attributo hashPassword.
	 * @return L'hash SHA-1 della password dell'utente.
	 */
	def getHashPassword = hashPassword

	/**
	 * Metodo getter per l'attributo user.
	 * @return Il nome utente univoco dell'utente.
	 */
	def getUser = user

	/**
	 * Metodo setter per l'attributo hashPassword.
	 * @param hashPassword Nuovo hash della password di accesso dell'utente.
	 */
	def setHashPassword(hashPassword: String) = {
		if (hashPassword == null)
			throw new IllegalArgumentException
		this.hashPassword = hashPassword
		authenticationString = computeAuthenticationString
	}

	/**
	 * Metodo per il confronto.
	 * @param other Altro oggetto da controllare.
	 * @return True o false in base all'esito del confronto.
	 */
	override def equals(other: Any): Boolean = {
		if (!other.isInstanceOf[AuthenticationData])
			false
		else
			(email == other.asInstanceOf[AuthenticationData].email
				&& user == other.asInstanceOf[AuthenticationData].user
				&& hashPassword == other.asInstanceOf[AuthenticationData].hashPassword
				)
	}

	/**
	 * Metodo getter per l'attributo autenticationString
	 * @return La stringa di autenticazione che il client utilizzerà per autenticare le richieste.
	 */
	def getAuthenticationString = authenticationString

}

object AuthenticationData {
	/**
	 * Metodo che calcola l'hash SHA-1 data una stringa in input.
	 * @param word Password in plain-text inserita e della quale calcolare l'hash SHA-1.
	 */
	def computeHash(word: String) : String = {
		val messageDigest = MessageDigest.getInstance("SHA-1")
		val data = messageDigest.digest(word.getBytes)
		val sb = new StringBuffer()
		for(b <- data) {
			sb.append("%02x".format(b))
		}
		sb.toString
	}
}