/**
 * FILE: LoginActorTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/presentation/usermanager
 * DATA CREAZIONE: 5 Marzo 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-03-05 - Creazione della classe - Biancucci Maurizio
 */

import akka.actor.{Props, ActorSystem}
import org.scalatest.{Matchers, WordSpecLike, BeforeAndAfterAll}
import akka.testkit.{ImplicitSender, TestKit}
import scala.concurrent.duration._
import sgad.servertier.businesslogic.operations.Registration
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import sgad.servertier.presentation.messages.{ToPublisherAndUserIsAliveRequest, ToLoginActorRequest}
import sgad.servertier.presentation.usermanager.{PublisherActor, UserActor, IsUserActorAliveRequester, LoginActor}
import scala.language.postfixOps

/**
 * Classe di test per la classe LoginActor.
 */
class LoginActorTest(_system: ActorSystem) extends TestKit(_system) with ImplicitSender with WordSpecLike with Matchers with BeforeAndAfterAll {

	def this() = this(ActorSystem("sgadSystem"))

	IsUserActorAliveRequester.inizializeActorFactory(system)

	//Inizializzo passando l'actorSystem dandogli la possibilità di creare attori
	UserActor.inizializeActorFactory(system)

	val connected = DataBaseManager.connect()
	if (connected)
		println("DATABASE CONNESSO")
	else
		println("DATABASE NON CONNESSO")

	assume(connected)

	val publisher = system.actorOf(Props[PublisherActor], "PublisherActor")
	//Thread sleep 10000

	"LoginActor" must {
		val loginActor = system.actorOf(Props[LoginActor])
		val registration = new Registration


		"non rispondere a richieste di altro tipo" in {
			loginActor ! "sei sveglio?"
			expectNoMsg(500 millis)
		}

		"rispondere ad una richiesta di login falsa con" in {
			loginActor ! ToLoginActorRequest("")
			expectMsg("{data: false, parameters: false}")
		}

		"Non rispondere ad ulteriori richieste" in {
			loginActor ! ToLoginActorRequest("")
			expectNoMsg(500 millis)
		}

		val loginActor2 = system.actorOf(Props[LoginActor])
		val registrationData = "user:lupen44,email:lupen44@lupen.com,password1:lupen3rzo,password2:lupen3rzo"
		val loginData = "user:lupen44,password:lupen3rzo"

		"Dopo una registrazione " in {

			assert(registration.execute(null, registrationData, registrationAuthorization = true) == "Home")

			within(10 second) {
				loginActor2 ! ToLoginActorRequest(loginData)
				expectMsg("Canvas")

			}
		}

		Thread.sleep(5000)

		"L'user prima loggato deve rispondere alla richiesta di is Alive" in {
			within(30 seconds) {
				publisher ! new ToPublisherAndUserIsAliveRequest(self, "lupen44-IsUserActorAliveResponder")
				expectMsg("Yes")
			}
		}
	}

	override def afterAll() {
		TestKit.shutdownActorSystem(system)
		DataBaseManager.deleteUser("lupen44")
	}
}
