/**
 * FILE: UserActor.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/presentation/usermanager
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.presentation.usermanager

import sgad.servertier.dataaccess.data.userdata.UserData
import sgad.servertier.presentation.messages.{ToPublisherAndUserInternalRequest, UserActorTimeoutMessage, ToPublisherAndUserRequest}
import sgad.servertier.businesslogic.logic.Logic


import akka.actor._
import scala.concurrent.duration._
import scala.language.postfixOps
import akka.contrib.pattern.{DistributedPubSubExtension, DistributedPubSubMediator}
import sgad.servertier.presentation.timeout.STimeout

/**
 * Classe per la gestione della sessione di un particolare utente. Essa è l'unico accesso per le richieste di manipolazione ai dati di quell'utente.
 * @constructor
 * @param userData Dati dell'utente associati all'attore.
 */
class UserActor(userData : UserData) extends Actor with ActorLogging {
	import DistributedPubSubMediator.{ Subscribe, SubscribeAck }

	/**
	 * Riferimento all'attore mediatore del sistema fornito da Akka.
	 */
	val mediator: ActorRef = DistributedPubSubExtension(context.system).mediator

	/**
	 * Setta un timeout che rappresenta il tempo massimo di vita dopo ogni richiesta, dopo di che lo UserActor va stoppato salvando prima i dati di gioco sul database.
	 */
	import context.dispatcher
	var timeoutMessager: Cancellable = new Cancellable {
		def isCancelled: Boolean = true
		def cancel(): Boolean = true
	}

	/**
	 * Cancella il vecchio timeout e ne crea uno nuovo.
	 */
	private def setTimeout() = {
		//Imposto un nuovo timeout
		timeoutMessager = context.system.scheduler.scheduleOnce(STimeout.getUserActorLiveTimeoutS seconds) {
			self ! UserActorTimeoutMessage
		}
	}

	/**
	 * Oggetto di logica che esegue tutte le operazioni richieste dai client.
	 */
	val logic = new Logic(userData, userAuthorization = true)

	/**
	 * Oggetto di logica interna che esegue le operazioni interne.
	 */
	val internalLogic = new Logic(userData, internalAuthorization = true)

	/**
	 * Nome del topic a cui l'attore si iscrive, uguale al nome dell'utente associato.
	 */
	val topicName = userData.getAuthenticationData.getUser
	// Sottoscrivi al topic chiamato come l'user associato all'attore.
	mediator ! Subscribe(topicName, self)

	/**
	 * Crea e avvia un attore che risponderà alle richieste di isAlive.
	 */
	val isUserActorAliveResponder = context.actorOf(Props[IsUserActorAliveResponder], name = topicName+"-IsUserActorAliveResponder")

	/**
	 * Riceve ed elabora il messaggio di confermata sottoscrizione al topic
	 * settando come nuovo receive dei messaggi il metodo ready.
	 */
	def receive = {
		//Reagisce all'ack di sottoscrizione al topic cambiando il metodo receive con il metodo ready sotto definito.
		case SubscribeAck(Subscribe(this.topicName, `self`)) =>
			context become ready
			setTimeout()
	}

	/**
	 * Elabora i messaggi in arrivo all'attore dopo che questo si è sottoscritto con successo al topic.
	 */
	def ready: Actor.Receive = {
		//Risponde alla richiesta tramite l'oggetto logic con autorizzazione user, risponde al sender con una stringa.
		case userRequest: ToPublisherAndUserRequest =>
			//Cancello il timeout prima che parta
			timeoutMessager.cancel()

			userRequest.sender ! logic.analizeRequest(userRequest.operation, userRequest.data)
			//Cancella e rilancia il timeout
			setTimeout()

		//Risponde alla richiesta tramite l'oggetto internalLogic con autorizzazione internal, risponde al sender con una stringa.
		case internalRequest: ToPublisherAndUserInternalRequest =>
			//Cancello il timeout prima che parta
			timeoutMessager.cancel()

			internalRequest.sender ! internalLogic.analizeRequest(internalRequest.operation, internalRequest.data)
			//Cancella e rilancia il timeout
			setTimeout()

		//Ha ricevuto il messaggio di scaduto timeout
		case UserActorTimeoutMessage =>
			if(internalLogic.analizeRequest("SaveUser", "") == "Yes"){
				context stop isUserActorAliveResponder
				context stop self
			}
			else
				setTimeout()
	}
}

/**
 * Factory che si occupa della costruzione e partenza degli attori di tipo UserActor
 */
object UserActor {
	/**
	 * ActorSystem del sistema con il quale creare nuovi attori.
	 */
	var actorFactory: ActorSystem = null

	/**
	 * Crea e fa partire un attore di tipo UserActor.
	 * @param user Nome del nuovo attore.
	 * @param userData Dati dell'utente associato.
	 * @return Il riferimento al nuovo attore creato
	 */
	def apply(user: String, userData: UserData): ActorRef = {
		actorFactory.actorOf(Props(classOf[UserActor], userData), name = user )
	}

	/**
	 * Manda il messaggio di Timeout per richiedere lo stop all'UserActor in input. La richiesta deve essere inviata dallo stesso server in cui risiede l'attore.
	 * @param user Username dell'utente a cui l'UserActor è associato.
	 */
	def sendLogoutRequest(user: String) {
		//Anche se l'attore che gestisce l'user è attivo su più server per login contemporaneo, ognuno eseguira l'operazione logout e ognuno si uscciderà
		//Quindi posso mandare la richiesta senza passare per il publisher
		actorFactory.actorSelection("akka://sgadSystem/user/"+user) ! UserActorTimeoutMessage
	}

	/**
	 * Inizializza la classe settando l'actorSystem con cui questa potrà creare attori.
	 * @param actorFactory L'actorSystem del sistema con cui verranno creati gli attori.
	 */
	def inizializeActorFactory(actorFactory: ActorSystem) {
		this.actorFactory = actorFactory
	}
}