/**
 * FILE: IsUserActorAliveRequester.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/presentation/usermanager
 * DATA CREAZIONE: 25 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-25 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.presentation.usermanager

import akka.actor.{ActorRef, ActorLogging, Actor}
import akka.contrib.pattern.{DistributedPubSubExtension, DistributedPubSubMediator}
import sgad.servertier.presentation.messages.ToPublisherAndUserIsAliveRequest

/**
 * Classe per la risposta della richiesta di esistenza dell'UserActor in modo asincrono.
 */
class IsUserActorAliveResponder extends Actor with ActorLogging {
import DistributedPubSubMediator.{ Subscribe, SubscribeAck }
	/**
	 * Riferimento all'attore mediatore del sistema fornito da Akka.
	 */
	val mediator: ActorRef = DistributedPubSubExtension(context.system).mediator

	/**
	 * Nome del topic a cui l'attore si iscrive, uguale al nome dell'utente associato - IsUserActorAliveResponder.
	 */
	val topicName = self.path.name
	//Sottoscrivi al topic chiamato come l'user associato all'attore
	mediator ! Subscribe(topicName, self)

	/**
	 * Riceve ed elabora il messaggio di confermata sottoscrizione al topic settando come nuovo receive dei messaggi il metodo ready.
	 */
	def receive = {
		// Reagisce all'ack di sottoscrizione al topic cambiando il metodo receive con il metodo ready sotto definito.
		case SubscribeAck(Subscribe(this.`topicName`, `self`)) =>
		context become ready
	}

	/**
	 * Elabora i messaggi in arrivo all'attore dopo che questo si è sottoscritto con successo al topic.
	 */
	def ready: Actor.Receive = {
		//Risponde alla richiesta tramite l'oggetto logic, risponde al sender con la stringa "Yes".
		case request: ToPublisherAndUserIsAliveRequest =>
 			request.sender ! "Yes"
	}
}
