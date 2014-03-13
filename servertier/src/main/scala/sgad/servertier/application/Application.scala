/**
 * FILE: Application.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/application
 * DATA CREAZIONE: 24 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-24 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.application

import akka.actor.{Props, ActorSystem}
import sgad.servertier.presentation.httpresponder.ResponderActor
import sgad.servertier.presentation.usermanager.{InternalRequester, IsUserActorAliveRequester, PublisherActor, UserActor}
import akka.io.IO
import akka.pattern.ask
import spray.can.Http
import scala.concurrent.duration._
import akka.util.Timeout
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import java.util.Properties
import java.io.FileInputStream
import java.io.IOException
import sgad.servertier.presentation.pagemanager.PageFactory
import sgad.servertier.presentation.timeout.STimeout
import akka.cluster.Cluster
import sgad.servertier.presentation.cluster.ClusterListener
import akka.cluster.ClusterEvent.ClusterDomainEvent

/**
 * Componente che si occupa del bootstrap dell'applicazione.
 */
object Application extends App {

	//Creazione dell'actor System che gestirà gli attori Akka
	private implicit val actorSystem: ActorSystem = ActorSystem("sgadSystem")

	//Inizializzo passando l'actorSystem dandogli la possibilità di creare attori
	IsUserActorAliveRequester.inizializeActorFactory(actorSystem)

	//Inizializzo passando l'actorSystem dandogli la possibilità di creare attori
	UserActor.inizializeActorFactory(actorSystem)

	//Inizializzo passando l'actorSystem dandogli la possibilità di creare attori
	InternalRequester.inizializeActorFactory(actorSystem)

	//Creo e attivo l'attore Publisher per l'inoltro dei messaggi agli attori
	actorSystem.actorOf(Props[PublisherActor], "PublisherActor")

	//Attivo la connessione al database e il caricamento dei dati generali di gioco
	//Se la connessione fallisce fermo l'applicazione
	if (!DataBaseManager.connect()) {
		println("DATABASE NON CONNESSO")
		actorSystem.shutdown()
		System.exit(-1)
	}
	println("DATABASE CONNESSO")

	// Leggo da file indirizzo ip e porta se ci sono problemi uso i valori di defalut sotto definiti
	/**
	 * Idirizzo su cui il server HTTP sarò in ascolto.
	 */
	private var hostname = "localhost"
	/**
	 * Porta su cui il server HTTP sarà in ascolto.
	 */
	private var portNumber = 80
	/**
	 * Valore standard che indica se minimizzare il codice da passare al client al caricamento.
	 */
	private var isCodeToMinize = false

	try {
		//Apre il file di configurazione del server HTTP
		val properties = new Properties()
		val inputStream = new FileInputStream("src/main/resources/serverhttp.conf")
		//Legge le proprietà
		properties.load(inputStream)

		//Controlla che i valori immessi nel file di configurazione siano validi
		if (properties.getProperty("hostname") != null && properties.getProperty("port") != null &&
			properties.getProperty("port").toInt > 0 && properties.getProperty("port").toInt <= 65535 &&
			properties.getProperty("httpRequestTimeoutS").toFloat > 0 &&
			properties.getProperty("httpRequestWorkerTimeoutS").toFloat > 0 &&
			properties.getProperty("verifyUserActorAliveTimeoutS").toFloat > 0 &&
			properties.getProperty("userActorLiveTimeoutS").toFloat > 0 &&
			properties.getProperty("internalRequestTimeoutS").toFloat > 0) {
			//Se i file sono validi allora setta i valori letti.
			hostname = properties.getProperty("hostname")
			portNumber = properties.getProperty("port").toInt
			STimeout.inizialize(
				properties.getProperty("httpRequestTimeoutS").toFloat,
				properties.getProperty("httpRequestWorkerTimeoutS").toFloat,
				properties.getProperty("verifyUserActorAliveTimeoutS").toFloat,
				properties.getProperty("userActorLiveTimeoutS").toFloat,
				properties.getProperty("internalRequestTimeoutS").toFloat)
			isCodeToMinize = properties.getProperty("minimizeCode").toBoolean

		}
		else
			println("File di configurazione serverhttp.conf con valori non validi. Usata configurazione di default.")
	}
	catch {
		//Raccoglie i possibili errori nella lettura del file di confugurazione e comunica all'utente l'errore.
		case _: IllegalArgumentException => println("Inserito testo dove erano aspettati numeri. Usata configurazione di default.")
		case _: NumberFormatException => println("Inserita porta non valida. Usata configurazione di default.")
		case _: IOException => println("File di configurazione serverhttp.conf non trovato. Usata configurazione di default.")
		case _: NullPointerException => println("Non trovati alcuni parametri nel file di configurazione del server http. Usata configurazione di default.")
	}

	//Lancio l'inizializzazione della gestione delle pagine web, se fallisce fermo l'applicazione
	if (!PageFactory.inizialize(hostname + ":" + portNumber, isCodeToMinize)) {
		println("WEB PAGES NON DISPONIBILI")
		actorSystem.shutdown()
		System.exit(-1)
	}
	println("WEB PAGES DISPONIBILI")

	//Attivo l'attore che gestirà il cluster
	private val clusterListener = actorSystem.actorOf(Props[ClusterListener], name = "clusterListener")

	//Eseguo la join nel cluster tramite i seed-node specificati nell'application.conf
	Cluster(actorSystem).subscribe(clusterListener, classOf[ClusterDomainEvent])

	//Timeout implicito per la successiva ask di start del servizio HTTP
	private implicit val timeout = Timeout(5.seconds)

	//Ottengo la working directory di base
	private val workingDirectory: String = System.getProperty("user.dir")
	System.out.println("The Current Working Directory is ::" + workingDirectory)

	//Creo l'attore che getirà le richieste Http
	private val service = actorSystem.actorOf(Props(classOf[ResponderActor], workingDirectory), "ResponderActor")

	//Attivo il servizio Http in ascolto sull'ip e sulla porta specificata
	IO(Http) ? Http.Bind(service, interface = hostname, port = portNumber)
}
