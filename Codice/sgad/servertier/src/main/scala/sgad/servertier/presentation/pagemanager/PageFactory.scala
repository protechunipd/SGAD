/**
 * FILE: PageFactory.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/presentation/pagemanager
 * DATA CREAZIONE: 27 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-27 - Creazione della classe - Biancucci Maurizio
 * 2014-02-27 - Stesura metodo getHomePageWithErrors - Segantin Fabio
 */
package sgad.servertier.presentation.pagemanager

import scala.collection._
import scala.collection.mutable.ArrayBuffer
import java.io._
import scala.io._
import scala.sys.process._

/**
 * Classe che gestisce le pagine HTML da inviare ai client.
 */
object PageFactory {

	/**
	 * Indirizzo su cui il server HTTP è reperibile.
	 */
	private var addressRequest = ""

	/**
	 *  Contiene il codice HTML della home page.
	 */
	private var homePage = "Home"

	/**
	 * La prima parte del codice della pagina di gioco.
	 */
	private var canvas1 = "Canvas"
	/**
	 * La seconda parte della pagina di gioco, localizza un punto dove iniettare le personalizzazioni nel codice JavaScript lato client.
	 */
	private var canvas2ToReplace = ""

	/**
	 * Terza ed ultima parte della pagina di gioco.
	 */
	private var canvas3 = ""

	/**
	 * Decide se il codice di gioco lato client viene minimizzato al caricamento.
	 */
	private var isCodeToMinimize = false

	/**
	 * Metodo getter per l'attributo addressRequest.
	 * @return L'indirizzo publico in cui il server HTTP è reperibile.
	 */
	def getAddressRequest = addressRequest

	/**
	 * Esegue l'inizializzazione caricando le risorse esterne come le pagine del sito e il codice di gioco lato client, eventualmente minimizzandolo.
	 * @param addressRequest L'indirizzo su cui l'applicazione risponde alle richieste HTTP.
	 * @param isCodeToMinimize Decide se il codice di gioco lato client viene minimizzato al caricamento.
	 */
	def inizialize(addressRequest: String, isCodeToMinimize: Boolean): Boolean = {
		this.addressRequest = addressRequest
		this.isCodeToMinimize = isCodeToMinimize
		loadWebPages() & loadCanvas()
	}

	/**
	 * Carica il codice di gioco in memoria ed eventualmente lo minimizza in base all'attributo isCodeToMinimize.
	 * @return True se il load del codice di gioco va a buon fine.
	 */
	private def loadCanvas(): Boolean = {
		try {
			//Carica la lista dei dei sorgenti javascript client da inserire nella prima parte del canvas.
			val list1 = Source.fromFile("src/main/resources/canvas/ListaJS1.conf")
			//Carica la lista dei dei sorgenti javascript client da inserire nella seconda parte del canvas.
			val list2 = Source.fromFile("src/main/resources/canvas/ListaJS2.conf")
			//Carica la prima parte della pagina html contenente il canvas HTML5
			val canvasPage1 = scala.io.Source.fromFile("src/main/resources/canvas/canvas1.html").mkString
			//Carica la seconda parte della pagina html contenente il canvas HTML5
			val canvasPage2 = scala.io.Source.fromFile("src/main/resources/canvas/canvas2.html").mkString

			if (isCodeToMinimize)
				println("Minimizzando il codice client.... l'operazione impiegherà qualche minuto.")

			//Carica grazie nella variabile minimized1 il codice di canvasPage1 e tutto il javascript nella list1 e lo mette in canvas1
			val minimized1 = new StringBuilder
			list1.getLines().toArray.foreach((line: String) => {
				if (isCodeToMinimize) //Chiama la minimizzazione grazie alla libreria esterna oppure leggere semplicemente il file
					minimized1.append(Process("java -jar src/main/java/yuicompressor-2.4.8.jar ../" + line).!!)
				else
					minimized1.append(scala.io.Source.fromFile("../" + line).mkString)
			})
			canvas1 = canvasPage1 + minimized1.toString

			//Carica grazie nella variabile minimized2 il codice della list2 e lo mette in canvas2
			val minimized2 = new StringBuilder
			list2.getLines().toArray.foreach((line: String) => {
				if (isCodeToMinimize) //Chiama la minimizzazione grazie alla libreria esterna oppure leggere semplicemente il file
					minimized2.append(Process("java -jar src/main/java/yuicompressor-2.4.8.jar ../" + line).!!)
				else
					minimized2.append(scala.io.Source.fromFile("../" + line).mkString)
			})
			canvas2ToReplace = minimized2.toString()

			//Carica in canvas 3 il codice della seconda parte della pagina HTML
			canvas3 = canvasPage2
		}
		catch {
			//Se trovo errori nella lettura dei file restituisco false
			case e: IOException => println("Errore di un'operazione di input durante il caricamento del codice di gioco"); println(e); return false
		}
		true
	}

	/**
	 * Metodo getter per l'attributo canvas1.
	 * @return La prima parte del codice della pagina di gioco.
	 */
	def getCanvas1 = canvas1

	/**
	 * Metodo getter per l'attributo canvas2ToReplace.
	 * @return La seconda parte della pagina di gioco, localizza un punto dove iniettare le personalizzazioni nel codice JavaScript lato client.
	 */
	def getCanvas2ToReplace = canvas2ToReplace

	/**
	 * Metodo getter per l'attributo canvas3.
	 * @return Terza e ultima parte della pagina di gioco.
	 */
	def getCanvas3 = canvas3

	/**
	 * Carica in memoria tutto il codice delle web pages del sito del gioco.
	 */
	private def loadWebPages(): Boolean = {
		try {
			homePage = scala.io.Source.fromFile("src/main/resources/webpages/index.html").mkString
		}
		catch {
			//In caso di errori retistuisci false
			case e: IOException => println("Errore durante il caricamento delle web pages"); println(e); return false
		}
		true
	}

	/**
	 * Metodo getter che ritorna la homepage del sito.
	 * @return La home page del sito.
	 */
	def getHomePage: String = homePage

	/**
	 * Metodo utilizzato dal pageManager per poter resituire la Homepage con gli errori.
	 * @param data I dati passati dalla pagina.
	 * @param errors Una lista di errori riscontrati.
	 * @return La pagina comprensiva degli errori.
	 */
	def getHomePageWithErrors(data: Map[String, String], errors: ArrayBuffer[String]): String = {
		var finalPage: String = homePage
		var registration = true
		//vengono salvati i valori passati dal form in una mappa che se non contiene il valore restituisce la stringa vuota
		val reinsertData = (mutable.Map() ++ data).withDefaultValue("")
		errors.foreach({
			case "RExistingUser" =>
				//Viene fatto visualizzare il messaggio relativo all'username già in uso cercando il div con id user_usato
			finalPage = """(?s)(<div(.)*?id=\"user_usato\"(.)*?)(>)""".r.replaceAllIn(finalPage, "$1 style=\"display:block\" $4")
			case "RInvalidUser" =>
				//Viene fatto visualizzare il messaggio relativo all'username non conforme cercando il div con id user_vuoto
			finalPage = """(?s)(<div(.)*?id=\"user_vuoto\"(.)*?)(>)""".r.replaceAllIn(finalPage, "$1 style=\"display:block\" $4")
			case "RInvalidEmail" =>
				//Viene fatto visualizzare il messaggio relativo all'email non valida cercando il div con id errore_email
			finalPage = """(?s)(<div(.)*?id=\"errore_email\"(.)*?)(>)""".r.replaceAllIn(finalPage, "$1 style=\"display:block\" $4")
			case "RExistingEmail" =>
				//Viene fatto visualizzare il messaggio relativo all'email già in uso cercando il div con id email_usata
			finalPage = """(?s)(<div(.)*?id=\"email_usata\"(.)*?)(>)""".r.replaceAllIn(finalPage, "$1 style=\"display:block\" $4")
			case "RInvalidPassword" =>
				//Viene fatto visualizzare il messaggio relativo alla password non conforme cercando il div con id errore_password
			finalPage = """(?s)(<div(.)*?id=\"errore_password\"(.)*?)(>)""".r.replaceAllIn(finalPage, "$1 style=\"display:block\" $4")
			case "RNonMatchingPassword" =>
				//Viene fatto visualizzare il messaggio relativo alle password non corrispondenti cercando il div con id errore_password2
			finalPage = """(?s)(<div(.)*?id=\"errore_password2\"(.)*?)(>)""".r.replaceAllIn(finalPage, "$1 style=\"display:block\" $4")
			case "IncorrectLogin" =>
				//Viene fatto visualizzare il messaggio relativo alla login errata cercando il div con id login_errato
			registration = false
				finalPage = """(?s)(<div(.)*?id=\"login_errato\"(.)*?)(>)""".r.replaceAllIn(finalPage, "$1 style=\"display:block\" $4")
		})
		if (registration) {
			//se si è trattato di un errore di registrazione resetto i campi imput con i valori passati
			finalPage = """(?s)(<input(.)*?id=\"register_username\"(.)*?)(>)""".r.replaceAllIn(finalPage, "$1 value=\"" + reinsertData("user") + "\" $4")
			finalPage = """(?s)(<input(.)*?id=\"register_email\"(.)*?)(>)""".r.replaceAllIn(finalPage, "$1 value=\"" + reinsertData("email") + "\" $4")
		} else {
			//altrimenti resetto i campi di login
			finalPage = """(?s)(<input(.)*?id=\"log_username\"(.)*?)(>)""".r.replaceAllIn(finalPage, "$1 value=\"" + reinsertData("user") + "\" $4")
			finalPage = """(?s)(<input(.)*?id=\"log_password\"(.)*?)(>)""".r.replaceAllIn(finalPage, "$1 value=\"" + reinsertData("password") + "\" $4")
		}
		finalPage
	}

	/**
	 * Metodo per ricevere la pagina di registrazione avvenuta.
	 * @return La pagina di registrazione avvenuta.
	 */
	def getHomePageRegistrationSuccessful = {
		"""(?s)(<div id=\"inner_maincontent\">)((.)*?</form>[^<]*?)(</div>)""".r.replaceAllIn(homePage, "$1<h1>La registrazione è andata a buon fine</h1>$4")
	}

	/**
	 * Metodo per ricevere la pagina ricevuta quando il servizio non è disponibile.
	 * @return la pagina visualizzata quando il database non è raggiungibile.
	 */
	def getHomePageServiceIsDown = {
		"""(?s)(<div id=\"inner_maincontent\">)((.)*?</form>[^<]*?)(</div>)""".r.replaceAllIn(homePage, "$1<h1>Il servizio è momentaneamente non disponibile, ci scusiamo per il disagio.</h1>$4")
	}

}
