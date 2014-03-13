/**
 * FILE: ToLoginActorRequest.scala
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

/**
 * Classe per il messaggio di elaborazione di una richiesta di login al LoginActor.
 * @constructor
 * @param data Dati di accompagnamento alla richiesta.
 */
case class ToLoginActorRequest(data: String)
