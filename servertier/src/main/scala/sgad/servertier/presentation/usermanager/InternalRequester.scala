/**
 * FILE: InternalRequester.scala
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

import akka.actor.{Props, ActorSystem, ActorRef, Actor}
import sgad.servertier.presentation.messages.{ToPublisherAndUserInternalRequest, ToInternalRequesterRequest}
import sgad.servertier.presentation.timeout.STimeout
import scala.concurrent.Await
import scala.concurrent.duration._
import akka.pattern.AskTimeoutException
import akka.pattern.ask
import java.util.concurrent.TimeoutException
import scala.language.postfixOps

/**
 * Attore che gestisce la risoluzione della richiesta di esistenza di altri UserActor.
 */
class InternalRequester extends Actor{

	/**
	 * Sender iniziale che ha richiesto il servizio a cui si risponderà ottenuta la risposta.
	 */
	var originalSender : ActorRef = null

	/**
	 * Riceve la richiesta e spedisce la risposta al sender.
	 */
	def receive = {
		//Nel casi sia una richiesta IsAliveRequest
		case request: ToInternalRequesterRequest =>
			originalSender = sender
			//Mando la richiesta al Publisher che si occuoperà di inviarla al UserActor giusto senza sapere dove esso sia locato.
			context.actorSelection("akka://sgadSystem/user/PublisherActor") ! ToPublisherAndUserInternalRequest(self, request.user, request.operation, request.data)

		//Ha ricevuto una risposta, la rimanda al sender
		case s: String =>
			//Risponde al sender originale
			originalSender ! s
	}
}

/**
 * Classe di gestione della richiesta di user ad autorizzazione interna incapsulandone l'algoritmo.
 */
object InternalRequester {

	/**
	 * ActorSystem del sistema con il quale creare nuovi attori.
	 */
	var actorFactory: ActorSystem = null

	/**
	 * Controlla se l'userActor associato all'attore in input è attivo nel cluster.
	 * @param user Nome dell'username per il quale controllare che esista l'attore associato.
	 * @param operation Operazione richiesta.
	 * @param data Dati associati alla richiesta.
	 * @return Ritorna true se l'user dell'attore in input esiste o no.
	 */
	def sendInternalRequest(user: String, operation: String, data: String): String = {
		
		//Crea e avvia un attore che si occuperà di inviare e raccogliere la risposta della richiesta interna.
		val internalRequester = actorFactory.actorOf(Props[InternalRequester])
		try{
			val futureAnswer = internalRequester.ask(ToInternalRequesterRequest(user, operation, data))(STimeout.getInternalRequestTimeoutS seconds).mapTo[String]
			Await.result(futureAnswer, STimeout.getInternalRequestTimeoutS+0.3 seconds)
		}
		catch{
			//Fallito il timeout dell'ask
			case _: AskTimeoutException => return "Attore non disponibile"
			//Fallito il timeout del Await.result
			case _: TimeoutException => return "Attore non disponibile"
		}
		finally{
			//Fermo il Requester
			actorFactory stop internalRequester
		}
	}

	/**
	 * Inizializza la classe settando l'actorSystem con cui questa potrà creare attori.
	 * @param actorFactory L'actorSystem del sistema con cui verranno creati gli attori.
	 */
	def inizializeActorFactory(actorFactory: ActorSystem) = {
		this.actorFactory = actorFactory
	}
}
