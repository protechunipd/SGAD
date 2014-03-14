/**
 * FILE: PublisherActor.scala
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

import akka.actor.Actor
import akka.contrib.pattern.{DistributedPubSubExtension, DistributedPubSubMediator}
import sgad.servertier.presentation.messages.{ToPublisherAndUserInternalRequest, ToPublisherAndUserIsAliveRequest, ToPublisherAndUserRequest}

/**
 * Classe che gestisce l'inoltro dei messaggi alle istanze giuste delle classi (attori Akka) del pacchetto usermanager.
 */
class PublisherActor extends Actor {
	import DistributedPubSubMediator.Publish
	/**
	 * Attore di Akka usato per inviare i messaggi agli attori senza sapere su quale server essi siano locati.
	 */
	val mediator = DistributedPubSubExtension(context.system).mediator

	/**
	 * Riceve i messaggi di tipo ToPublisherUserRequest e li inoltra all'user corretto.
	 */
	def receive = {
		case request: ToPublisherAndUserRequest =>
			//Inoltra il messaggio all'user corretto. Inoltra lo stesso messaggio.
			mediator ! Publish(request.user, request)
		case request: ToPublisherAndUserIsAliveRequest =>
			//Inoltra il messaggio all'user corretto. Inoltra lo stesso messaggio.
			mediator ! Publish(request.user, request)
		case request: ToPublisherAndUserInternalRequest =>
			//Inoltra il messaggio all'user corretto. Inoltra lo stesso messaggio.
			mediator ! Publish(request.user, request)
	}
}