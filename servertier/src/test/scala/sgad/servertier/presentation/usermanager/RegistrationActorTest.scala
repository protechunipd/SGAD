/**
 * FILE: RegistrationActorTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/presentation/usermanager
 * DATA CREAZIONE: 7 Marzo 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-03-07 - Creazione della classe - Biancucci Maurizio
 */

import akka.actor.{Props, ActorSystem}
import org.scalatest.{Matchers, WordSpecLike, BeforeAndAfterAll}
import akka.testkit.{ImplicitSender, TestKit}
import scala.concurrent.duration._
import sgad.servertier.businesslogic.operations.Registration
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import sgad.servertier.presentation.messages._
import sgad.servertier.presentation.messages.ToLoginActorRequest
import sgad.servertier.presentation.messages.ToPublisherAndUserIsAliveRequest
import sgad.servertier.presentation.usermanager._
import scala.language.postfixOps

/**
 * Classe di test per la classe RegistrationActor.
 */
class RegistrationActorTest(_system: ActorSystem) extends TestKit(_system) with ImplicitSender with WordSpecLike with Matchers with BeforeAndAfterAll {

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
	Thread sleep 5000

	"RegistrationActor" must {
		val loginActor = system.actorOf(Props[LoginActor])
		val registrationActor = system.actorOf(Props[RegistrationActor])


		"non rispondere a richieste di altro tipo" in {
			registrationActor ! "sei sveglio?"
			expectNoMsg(500 millis)
		}

		"rispondere ad una richiesta di registrazione falsa con" in {
			registrationActor ! ToRegistrationActorRequest("")
			expectMsg("{data: false, parameters: false}")
		}

		"Non rispondere ad ulteriori richieste" in {
			registrationActor ! ToLoginActorRequest("")
			expectNoMsg(5000 millis)
		}

		val registrationActor2 = system.actorOf(Props[RegistrationActor])
		val registrationData = "user:lupen44,email:lupen44@lupen.com,password1:lupen3rzo,password2:lupen3rzo"
		val loginData = "user:lupen44,password:lupen3rzo"

		"Registrando " in {
			within(10 second) {
				registrationActor2 ! ToRegistrationActorRequest(registrationData)
				expectMsg("Home")

			}
		}

		Thread.sleep(5000)

		"Loggando dopo la registrazione " in {
			within(10 second) {
				loginActor ! ToLoginActorRequest(loginData)
				expectMsg("Canvas")
			}
		}
	}

	override def afterAll() {
		TestKit.shutdownActorSystem(system)
		DataBaseManager.deleteUser("lupen44")
	}
}
