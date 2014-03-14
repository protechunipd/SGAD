/**
 * FILE: ClusterListener.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/presentation/cluster
 * DATA CREAZIONE: 28 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-28 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.presentation.cluster

import akka.actor.{ActorLogging, Actor}
import akka.cluster.ClusterEvent._
import akka.cluster.ClusterEvent.MemberUp
import akka.cluster.ClusterEvent.UnreachableMember
import akka.cluster.ClusterEvent.CurrentClusterState
import akka.cluster.ClusterEvent.MemberRemoved

/**
 * Classe che gestisce l'interazione del server con gli altri server del cluster.
 */
class ClusterListener extends Actor with ActorLogging {
	/**
	 * Metodo che gestisce i messaggi in arrivo all'attore.
	 */
	def receive = {
		//Messaggio che informa lo stato corrente dello stato.
		case state: CurrentClusterState =>
			log.info("Current members: {}", state.members.mkString(", "))
		//Informa che un nuovo membro è entrato a far parte del cluster.
		case MemberUp(member) =>
			log.info("Member is Up: {}", member.address)
		//Messaggio di che informa che un membro del cluster è diventato irraggiungibile.
		case UnreachableMember(member) =>
			log.info("Member detected as unreachable: {}", member)
		//Messaggio che informa che un membro del cluster è stato rimosso.
		case MemberRemoved(member, previousStatus) =>
			log.info("Member is Removed: {} after {}",
				member.address, previousStatus)
		//Ignorare questo messaggio
		case _: ClusterDomainEvent => //do nothing
	}
}
