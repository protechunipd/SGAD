/**
 * FILE: PublisherActorTest.scala
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
import sgad.servertier.dataaccess.data.userdata.AuthenticationData
import sgad.servertier.dataaccess.databaseaccess.databasemanager.DataBaseManager
import sgad.servertier.dataaccess.databaseaccess.shareddatadao.SharedDataDAO
import sgad.servertier.presentation.messages._
import sgad.servertier.presentation.messages.ToLoginActorRequest
import sgad.servertier.presentation.messages.ToPublisherAndUserIsAliveRequest
import sgad.servertier.presentation.messages.ToPublisherAndUserRequest
import sgad.servertier.presentation.usermanager.{UserActor, IsUserActorAliveRequester, PublisherActor, LoginActor}
import scala.language.postfixOps


/**
 * Classe di test per la classe PublisherActor
 */
class PublisherActorTest(_system: ActorSystem) extends TestKit(_system) with ImplicitSender with WordSpecLike with Matchers with BeforeAndAfterAll {

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

	"PublisherActor" must {
		val registration = new Registration

		"non rispondere a richieste di altro tipo" in {
			publisher ! "sei sveglio?"
			expectNoMsg(100 millis)
		}

		val loginActor = system.actorOf(Props[LoginActor])
		val registrationData = "user:lupen44,email:lupen44@lupen.com,password1:lupen3rzo,password2:lupen3rzo"
		val loginData = "user:lupen44,password:lupen3rzo"
		val authetication = new AuthenticationData("lupen44", "lupen44@lupen.com", AuthenticationData.computeHash("lupen3rzo"))

		"Dopo una registrazione " in {
			assert(registration.execute(null, registrationData, registrationAuthorization = true) == "Home")
			within(10 second) {
				loginActor ! ToLoginActorRequest(loginData)
				expectMsg("Canvas")

			}

		}

		Thread.sleep(5000)

		"L'user prima loggato deve rispondere alla richiesta di is Alive mandate attraverso il publisher actor" in {
			within(15 seconds) {
				publisher ! new ToPublisherAndUserIsAliveRequest(self, "lupen44-IsUserActorAliveResponder")
				expectMsg("Yes")
			}
		}

		"L'user prima loggato deve rispondere alla richiesta di una operazione passata attraverso il publisher all attore giusto" in {
			within(15 seconds) {
				publisher ! new ToPublisherAndUserRequest(self, "lupen44", "LoadGlobalData", "authentication:"+authetication.getAuthenticationString)
				expectMsg("{data: " + SharedDataDAO.getMongoObject.toString + "}")
			}
		}

		"L'user prima loggato deve rispondere alla richiesta di una operazione interna attraverso il publisher all attore giusto" in {
			within(15 seconds) {
				publisher ! new ToPublisherAndUserInternalRequest(self, "lupen44", "ReceiveAttack", "authentication:"+authetication.getAuthenticationString)
				expectMsg("parameters:false")
			}
		}
	}

	override def afterAll() {
		TestKit.shutdownActorSystem(system)
		DataBaseManager.deleteUser("lupen44")
	}
}