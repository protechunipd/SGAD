/**
 * FILE: WorkerActor.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/presentation/httpresponder
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.presentation.httpresponder

import akka.actor._
import scala.concurrent.duration._
import scala.language.postfixOps

import sgad.servertier.presentation.usermanager.{RegistrationActor, LoginActor}
import sgad.servertier.presentation.messages._
import sgad.servertier.presentation.messages.ToWorkerUserRequest
import sgad.servertier.presentation.messages.ToRegistrationActorRequest
import sgad.servertier.presentation.messages.ToPublisherAndUserRequest
import sgad.servertier.presentation.messages.ToLoginActorRequest
import sgad.servertier.presentation.messages.ToWorkerRegistrationRequest
import sgad.servertier.presentation.messages.ToWorkerLoginRequest
import sgad.servertier.presentation.timeout.STimeout

/**
 * Classe per la gestione asincrona delle richieste in arrivo dai client.
 */
class WorkerActor extends Actor with ActorLogging {

	/**
	 * Setta un timeout che rappresenta il tempo massimo di una richiesta, dopo di che il worker va stoppato.
	 */
	import context.dispatcher
	val timeoutMessager: Cancellable = context.system.scheduler.scheduleOnce(STimeout.getHttpRequestWorkerTimeoutS seconds) {
		self ! WorkerActorTimeoutMessage
	}

	/**
	 * Sender iniziale che ha richiesto il servizio a cui si risponderà ottenuta la risposta.
	 */
	var originalSender : ActorRef = null

	/**
	 * Gestisce le richieste di login, registrazione e di gioco e chiede ad altri attori la risposta.
	 * Ottiene la risposta e la manda all'attore che ha chiesto il servizio.
	 */
	def receive = {
		// Nel caso sia una richiesta di Login.
		case loginRequest: ToWorkerLoginRequest =>
			originalSender = sender
			//Creo un nuovo attore per gestire la richiesta di login
			context.actorOf(Props[LoginActor]) ! ToLoginActorRequest(loginRequest.data)

		//Nel casi sia una richiesta di Registrazione
		case registrationRequest: ToWorkerRegistrationRequest =>
			originalSender = sender
			//Creo un nuovo attore per gestire la richiesta di registrazione
			context.actorOf(Props[RegistrationActor]) ! ToRegistrationActorRequest(registrationRequest.data)

		// Nel caso sia una richiesta di gioco.
		case userRequest: ToWorkerUserRequest =>
			originalSender = sender
			//Mando la richiesta al Publisher che si occuoperà di inviarla al UserActor giusto senza sapere dove esso sia locato.
			context.actorSelection("akka://sgadSystem/user/PublisherActor") ! ToPublisherAndUserRequest(self, userRequest.user, userRequest.operation, userRequest.data)

		// Ha ricevuto una risposta, la rimanda al sender.
		case s: String =>
			timeoutMessager.cancel() //Ferma il timeout
			//Risponde al sender originale
			originalSender ! s
			//Uccide l'attore poichè terminato il suo ciclo di vita.
			context stop self

		// Ha ricevuto il messaggio di scaduto timeout.
		case WorkerActorTimeoutMessage =>
			originalSender ! "Timeout"
			context stop self

	}
}
