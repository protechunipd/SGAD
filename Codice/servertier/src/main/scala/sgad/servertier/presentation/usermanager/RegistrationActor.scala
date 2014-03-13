/**
 * FILE: RegistrationActor.scala
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

import akka.actor.{ActorLogging, Actor}
import sgad.servertier.businesslogic.logic.Logic
import sgad.servertier.presentation.messages.ToRegistrationActorRequest


/**
 * Classe per la gestione delle richieste di registrazione.
 */
class RegistrationActor extends Actor with ActorLogging {
	/**
	 * Oggetto di logica che esegue tutte le operazioni richieste.
	 */
	val logic = new Logic(null, registrationAuthorization = true)

	/**
	 * Elabora i messaggi di registrazione.
	 */
	def receive = {
		//Risponde alla richiesta tramite l'oggetto logic, risponde al sender con una stringa.
		case registrationRequest: ToRegistrationActorRequest =>
			sender ! logic.analizeRequest("Registration", registrationRequest.data)
			//Uccide l'attore poichè terminato il suo ciclo di vita.
			context stop self
	}
}