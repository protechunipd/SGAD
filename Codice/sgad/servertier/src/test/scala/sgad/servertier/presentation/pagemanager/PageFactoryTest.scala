/**
 * FILE: PageFactoryTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/presentation/pagemanager
 * DATA CREAZIONE: 12 Marzo 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-03-12 - Creazione della Classe - Segantin Fabio
 */

import org.scalatest.FlatSpec
import scala.collection.mutable.ArrayBuffer
import sgad.servertier.presentation.pagemanager.PageFactory

/**
 * Classe di test per PageFactory.
 */
class PageFactoryTest extends FlatSpec {
	"PageFactory" must "restituire la pagina di homepage con i relativi errori" in {
		assert(PageFactory.getHomePageServiceIsDown == "Home")
		assert(PageFactory.getHomePageRegistrationSuccessful == "Home")
		assert(PageFactory.getHomePageWithErrors(Map[String, String](), ArrayBuffer[String]("RExistingUser", "RInvalidUser", "RInvalidEmail", "RExistingEmail", "RInvalidPassword", "RNonMatchingPassword", "IncorrectLogin")) == "Home")
	}
}
