/**
 * FILE: ResponderActor.scala
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

import akka.actor.{Props, ActorLogging}
import spray.http._
import spray.routing._
import akka.pattern._
import scala.language.postfixOps
import spray.http.HttpHeaders.RawHeader
import scala.concurrent.duration._
import sgad.servertier.presentation.messages.{ToWorkerUserRequest, ToWorkerRegistrationRequest, ToWorkerLoginRequest}
import MediaTypes._
import sgad.servertier.presentation.pagemanager.PageFactory
import sgad.servertier.presentation.timeout.STimeout
import spray.util.LoggingContext

/**
 * Classe per la gestione degli end point per le richieste HTTP inviate dal client.
 * @constructor
 * @param workingDirectory Percorso assoluto da cui l'applicazione è stata lanciata.
 */
class ResponderActor(private val workingDirectory: String) extends HttpServiceActor with ActorLogging {

	/**
	 * Il dispatcher dell'actor system che poter creare a gestire i Timeout delle richieste.
	 */
	implicit def executionContext = actorRefFactory.dispatcher

	/**
	 * Metodo per la gestione degli errori durante il routing.
	 * @param log Riferimento implicito al log.
	 * @return Lo stato da ritornare al client connesso.
	 */
	implicit def exceptionHandler(implicit log: LoggingContext) =
		ExceptionHandler {
			case _: akka.pattern.AskTimeoutException => ctx =>
				log.warning("{} errore mentre gestivo la richiesta: {}", "Server sovraccarico", ctx.request)
				ctx.complete(StatusCodes.TooManyRequests, "Server sovraccarico")
		}

	/**
	 * Definisce gli end point HTTP e il modo in cui viene gestita ogni richiesta.
	 */
	val myRoute =
		get {
			//Fornisce un endpoint per la home pagina dove la risposta viene effettuata da memoria rendendo il caricamento molto veloce.
			path("") {
				respondWithMediaType(`text/html`) {
					complete {
						PageFactory.getHomePage
					}
				}
			} ~
				// Definisce un endpoint per l'accesso al sito del gioco e tutti i file contenuti nella cartella webpages.
				pathPrefix("") {
					getFromDirectory(workingDirectory + "/src/main/resources/webpages/")
				} ~
				// Definisce un endpoint in cui sono disponibili tutti i file contenuti nella cartella images del gioco.
				pathPrefix("canvas" / "images") {
					getFromDirectory(workingDirectory + "/src/main/resources/canvas/images/")
				} ~
				pathPrefix("canvas" / "jquery") {
					getFromDirectory(workingDirectory + "/src/main/resources/canvas/jquery/")
				} ~
				// Definisce un endpoint in cui è disponibile la home page quando per qualche errore il client ricarica la pagina del gioco.
				path("login") {
					respondWithMediaType(`text/html`) {
						complete {
							PageFactory.getHomePage
						}
					}
				} ~
				path("registration") {
					respondWithMediaType(`text/html`) {
						complete {
							PageFactory.getHomePage
						}
					}
				}
		} ~
			// Definisce un end point per le richieste di login.
			post {
				path("login") {
					respondWithMediaType(`text/html`) {
						formFields('user.as[String], 'password.as[String]) {
							(user, password) =>
								val request = ToWorkerLoginRequest(user, password)
								complete {
									actorRefFactory.actorOf(Props[WorkerActor]).ask(request)(STimeout.getHttpRequestTimeoutS seconds).mapTo[String]
								}
						}
					}
				}
			} ~
			// Definisce un end point per le richieste di registrazione.
			post {
				path("registration") {
					respondWithMediaType(`text/html`) {
						formFields('user.as[String], 'email.as[String], 'password1.as[String], 'password2.as[String]) {
							(user, email, password1, password2) =>
								val request = ToWorkerRegistrationRequest(user, email, password1, password2)
								complete {
									actorRefFactory.actorOf(Props[WorkerActor]).ask(request)(STimeout.getHttpRequestTimeoutS seconds).mapTo[String]
								}
						}
					}
				}
			} ~
			// Definisce un end point per le richieste di gioco.
			post {
				path("user") {
					respondWithHeaders(RawHeader("Access-Control-Allow-Origin", "*"), RawHeader("Access-Control-Allow-Methods", "GET,HEAD,POST,OPTIONS,TRACE"),
						RawHeader("Access-Control-Allow-Headers", "*, X-Requested-With, Content-Type, Accept")) {
						formFields('user.as[String], 'operation.as[String], 'data.as[String]) {
							(user, operation, data) =>
								val request = ToWorkerUserRequest(user, operation, data)
								complete {
									actorRefFactory.actorOf(Props[WorkerActor]).ask(request)(STimeout.getHttpRequestTimeoutS seconds).mapTo[String]
								}
						}
					}
				}
			}

	/**
	 * Risponde alle richieste HTTP con l'utilizzo dell'attributo myRoute o nel caso gestisce il timeout nella richiesta.
	 */
	def receive = handleTimeouts orElse runRoute(myRoute)

	/**
	 * Gestisce gli errori del server durante l'elaborazione di una risposta ad una richiesta HTTP.
	 */
	def handleTimeouts: Receive = {
		//Caso di timeout nell'elaborazione della risposta alla richiesta HTTP.
		case Timedout(x: HttpRequest) =>
			sender ! HttpResponse(StatusCodes.InternalServerError, "Il server è momentaneamente sovraccarico, riprovare più tardi")
	}

}
