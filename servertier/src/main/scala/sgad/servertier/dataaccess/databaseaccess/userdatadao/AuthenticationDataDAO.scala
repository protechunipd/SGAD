/**
 * FILE: AuthenticationDataDAO.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/dataaccess/databaseaccess/userdatadao
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Nessi Alberto
 */

package sgad.servertier.dataaccess.databaseaccess.userdatadao
import sgad.servertier.dataaccess.data.userdata.AuthenticationData
import com.mongodb.casbah.commons.Imports._
import org.joda.time.IllegalFieldValueException

/**
 * Classe per l'interazione con il database di una classe di tipo AuthenticationData.
 */
object AuthenticationDataDAO {
	/**
	 * Fornisce il corrispettivo MongoDBObject della classe AuthenticationData fornita in input.
	 * @param object L'oggetto da cui parte l'istanziazione della classe ritornata.mongoObject.getAsOrElse[String]("hashPassword", throw new IllegalFieldValueException("hashPassword", "")).
	 * @return Il corrispettivo MongoDBObject.
	 */
	def getMongoObject(`object` : AuthenticationData):DBObject = {
		MongoDBObject(
			"user" -> `object`.getUser,
			"email" -> `object`.getEmail,
			"hashPassword" -> `object`.getHashPassword
		)
	}
	/**
	 * Ritorna il corrispettivo AuthenticationData istanziato a partire da un oggetto MongoDBObject.
	 * @param mongoObject L'oggetto da cui parte l'istanziazione della classe ritornata.
	 * @return L'oggetto AuthenticationData creato.
	 */
	def getObject(mongoObject : DBObject): AuthenticationData = {
		try{
			new AuthenticationData(
				mongoObject.getAsOrElse[String]("user", throw new IllegalFieldValueException("user", "")),
				mongoObject.getAsOrElse[String]("email", throw new IllegalFieldValueException("email", "")),
				mongoObject.getAsOrElse[String]("hashPassword", throw new IllegalFieldValueException("hashPassword", ""))
			)
		}catch{
			case c: ClassCastException => throw new IllegalFieldValueException(c.getLocalizedMessage, "Not Castable")
		}
	}
}