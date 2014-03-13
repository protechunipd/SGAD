/**
 * FILE: IsAliveRequest.scala
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

import akka.actor.ActorRef

/**
 * Classe per il messaggio di richiesta esistenza dell'UserActor associato al user in input.
 * @constructor
 * @param sender Sender della richiesta a cui inviare la risposta.
 * @param user User destinatario delle richiesta.
 */
case class ToPublisherAndUserIsAliveRequest(sender: ActorRef, user: String)