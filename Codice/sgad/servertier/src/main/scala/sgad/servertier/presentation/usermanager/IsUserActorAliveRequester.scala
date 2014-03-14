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
import sgad.servertier.presentation.messages.{ToRequesterIsAliveRequest, ToPublisherAndUserIsAliveRequest}

import akka.actor._
import scala.language.postfixOps
import scala.concurrent.duration._
import akka.pattern.{AskTimeoutException, ask}
import scala.concurrent.Await
import java.util.concurrent.TimeoutException
import sgad.servertier.presentation.timeout.STimeout


/**
 * Attore che gestisce la risoluzione della richiesta di esistenza di altri UserActor.
 */
class IsUserActorAliveRequester extends Actor with ActorLogging{

	/**
	 * Sender iniziale che ha richiesto il servizio a cui si risponderà ottenuta la risposta.
	 */
	var originalSender : ActorRef = null

	/**
	 * Gestisce le richieste e risponde al sender della richiesta.
	 */
	def receive = {
		//Nel casi sia una richiesta IsAliveRequest
		case request: ToRequesterIsAliveRequest =>
			originalSender = sender
			//Mando la richiesta al Publisher che si occuoperà di inviarla al UserActor giusto senza sapere dove esso sia locato.
			context.actorSelection("akka://sgadSystem/user/PublisherActor") ! new ToPublisherAndUserIsAliveRequest(self, request.user+"-IsUserActorAliveResponder")

		//Ha ricevuto una risposta, la rimanda al sender
		case s: String =>
			//Risponde al sender originale
			originalSender ! true
	}
}

/**
 * Classe di gestione della richiesta di esistenza di UserActor incapsulandone l'algoritmo.
 */
object IsUserActorAliveRequester {

	/**
	 * ActorSystem del sistema con il quale creare nuovi attori.
	 */
	var actorFactory: ActorSystem = null

	/**
	 * Controlla se l'userActor associato all'attore in input è attivo nel cluster.
	 * @param user Nome dell'username per il quale controllare che esista l'attore associato.
	 * @return Ritorna true se l'user dell'attore in input esiste o no.
	 */
	def isAlive(user: String) : Boolean = {
		//Crea e avvia un attore che si occuperà di rispondere alle richieste di isAlive
		val aliveRequester = actorFactory.actorOf(Props[IsUserActorAliveRequester])
		try{
			val futureAnswer = aliveRequester.ask(new ToRequesterIsAliveRequest(user))(STimeout.getVerifyUserActorAliveTimeoutS seconds).mapTo[Boolean]
			Await.result(futureAnswer, STimeout.getVerifyUserActorAliveTimeoutS+0.3 seconds)
		}
		catch{
			//Fallito il timeout dell'ask
			case _: AskTimeoutException => return false
			//Fallito il timeout del Await.result
			case _: TimeoutException => return false
		}
		finally{
			//Fermo il Requester
			actorFactory stop aliveRequester
		}
		true
	}

	/**
	 * Inizializza la classe settando l'actorSystem con cui questa potrà creare attori.
	 * @param actorFactory L'actorSystem del sistema con cui verranno creati gli attori.
	 */
	def inizializeActorFactory(actorFactory: ActorSystem) = {
		this.actorFactory = actorFactory
	}
}