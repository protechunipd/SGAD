/**
 * FILE: IsUserActorAliveResponder.scala
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
import sgad.servertier.presentation.messages.ToPublisherAndUserIsAliveRequest
import sgad.servertier.presentation.usermanager._
import scala.language.postfixOps

/**
 * Classe di test per la classe IsUserActorAliveResponder.
 */
class IsUserActorAliveResponderTest(_system: ActorSystem) extends TestKit(_system) with ImplicitSender with WordSpecLike with Matchers with BeforeAndAfterAll {

	def this() = this(ActorSystem("sgadSystem"))

	IsUserActorAliveRequester.inizializeActorFactory(system)

	//Inizializzo passando l'actorSystem dandogli la possibilità di creare attori
	UserActor.inizializeActorFactory(system)

	val publisher = system.actorOf(Props[PublisherActor], "PublisherActor")

	"Un IsUserActorAliveResponder" must {
		val responderActor = system.actorOf(Props[IsUserActorAliveResponder])

		"non rispondere a richieste di altro tipo" in {
			responderActor ! "sei sveglio?"
			expectNoMsg(500 millis)
		}

		"rispondere ad una richiesta di is alive con \"Yes\"" in {
			responderActor ! ToPublisherAndUserIsAliveRequest(self, "")
			expectMsg("Yes")
		}
	}

	override def afterAll() {
		TestKit.shutdownActorSystem(system)
	}
}