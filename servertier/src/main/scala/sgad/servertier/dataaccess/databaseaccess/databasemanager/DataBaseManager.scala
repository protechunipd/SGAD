/**
 * FILE: DataBaseManager.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/dataaccess/databaseaccess/databasemanager
 * DATA CREAZIONE: 19 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.dataaccess.databaseaccess.databasemanager

import sgad.servertier.dataaccess.data.userdata.UserData
import sgad.servertier.dataaccess.data.shareddata.{DataFactory, Resource, Unit, BuildingWithLevel}
import sgad.servertier.dataaccess.databaseaccess.shareddatadao.{UnitDAO, ResourceDAO, BuildingWithLevelDAO}
import sgad.servertier.dataaccess.databaseaccess.userdatadao.UserDataDAO
import com.mongodb.casbah.Imports.MongoClientURI
import java.util.logging.Logger
import java.lang.IllegalArgumentException
import org.joda.time.IllegalFieldValueException
import com.mongodb.casbah.Imports._
import java.util.Properties
import java.io.FileInputStream
import java.io.IOException
import scala.util.Random
import scala.collection.mutable
import scala.util.matching.Regex

/**
 * Classe per la gestione del database. Essa astrae l'utilizzo di un particolare database al resto dell'applicativo.
 */
object DataBaseManager{
	/**
	 * Parametro per la gestione dei messaggi di log.
	 */
	private val logger: Logger = Logger.getLogger("DataBaseManger")
	/**
	 * Messaggio di errore.
	 */
	private val networkErrorLog: String = "Errore di rete durante la connessione ad Database"
	/**
	 * Oggetto Properties per la lettura delle impostazioni dal file di configurazione.
	 */
	private val properties = new Properties()
	/**
	 * Stringa contenente il nome del file che contiene le impostazioni da caricare.
	 */
	private val fileName = "src/main/resources/database.conf"
	/**
	 * Oggetto InputStream nel quale caricare il file di configurazione.
	 */
	private var inputStream: FileInputStream = null
	/**
	 * Nome utente di default per la connessione al database.
	 */
	private var userName = ""
	/**
	 * Password di default per la connessione al database.
	 */
	private var password = ""
	/**
	 * Nome del database di default per la connessione al database.
	 */
	private var databaseName = "sgaddb"
	/**
	 * Socket di default (sintassi: nomeHost:numeroPorta) del database di default per la connessione al database.
	 */
	private var databaseUrl = "localhost:27017"
	/**
	 * Valore di default per il timeout connessione.
	 */
	private var connectionTimeoutMS = 6000
	/**
	 * Valore di default per il timeout socket.
	 */
	private var socketTimeoutMS = 6000

	try {
		inputStream = new FileInputStream(fileName)
		properties.load(inputStream)

		if (checkConfigurationFile(properties)) {
			logger.info("La configurazione database inserita è corretta!")
			userName = properties.getProperty("username")
			password = properties.getProperty("password")
			databaseName = properties.getProperty("database_name")
			databaseUrl = properties.getProperty("db_socket")
			connectionTimeoutMS = properties.getProperty("connection_timeoutMS").toInt
			socketTimeoutMS = properties.getProperty("socket_timeoutMS").toInt
		}
		else
			// se la configurazione non è corretta, imposto quella di default e segnalo nel log
			logger.info("La configurazione del database non è corretta, usate impostazioni di default.\n" +
				"Verificare il file database.conf")
	}
	catch {
		case ioe: IOException => logger.info("File di configurazione database.conf non trovato!")
			logger.info("La configurazione del database non è corretta, usate impostazioni di default. Verificare il file database.conf")
	}

	/**
	 * Stringa contenente l'URI di connessione al database. Si riporta un esempio di URI corretta:
	 * val uri = MongoClientURI("mongodb://Protech:password@192.168.43.140:27017/sgaddb?connectTimeoutMS=3000&socketTimeoutMS=1000")
	 */
	val uri: String = "mongodb://" + userName + ":" + password + "@" + databaseUrl + "/" ++ databaseName +
		"?connectTimeoutMS=" + connectionTimeoutMS + "&socketTimeoutMS=" + socketTimeoutMS
	/**
	 * Riferimento al DBMS.
	 */
	val mongoClient = MongoClient(MongoClientURI(uri))
	/**
	 * Riferimento al database specificato.
	 */
	val db = mongoClient.getDB("sgaddb")

	/**
	 * Controlla che il nome del database ed il socket indicati nel file di configurazione non siano nulli.
	 * @param prop Il file di configurazione in input che il metodo dovrà verificare.
	 * @return Ritorna true se i parametri di configurazione sono validi, false altrimenti.
	 */
	private def checkConfigurationFile(prop: Properties): Boolean = {
		try{
			//Controllo che i dati siano validi
			if(!prop.getProperty("db_socket").contains(":") || !prop.getProperty("connection_timeoutMS").matches("[0-9]+")
				|| !prop.getProperty("socket_timeoutMS").matches("[0-9]+") || prop.getProperty("socket_timeoutMS").toInt <= 0
				|| prop.getProperty("socket_timeoutMS").toInt > 65535 || prop.getProperty("connection_timeoutMS").toInt <= 0
				|| prop.getProperty("connection_timeoutMS").toInt > 65535
				)
				return false
		}
		catch{
			case _: IllegalArgumentException => println("Inserito testo dove erano aspettati numeri."); return false
			case _: NumberFormatException => println("Inserito valore non valido."); return false
			case _:NullPointerException => println("Parametri di configurazione mancanti nel file database.conf."); return false
		}
		true
	}

	/**
	 * Esegue una query sul database e setta le risorse in DataFactory.
	 * @return Ritorna true se il caricamento delle risorse è stato completato.
	 */
	private def loadResources(): Boolean = {
		logger.info("Caricando le risorse")
		val resourceContructionError: String = "Errore di inizializzazione delle Risorse, dati in input errati"
		val resourceFetchingError: String = "Errore di inizializzazione delle Risorse, inconsistenza dei dati letti dal db"
		val resourcesCollection = db.getCollection("resources")
		var resourcesMap = Map[String, Resource]()

		val cursor = resourcesCollection.find()
		try {
			while (cursor.hasNext) {
				val newResource: Resource = ResourceDAO.getObject(cursor.next())
				resourcesMap += (newResource.getKey -> newResource)
			}
		}
		catch {
			case _: IllegalFieldValueException => logger.info("IllegalFieldValueException: " + resourceFetchingError); return false
			case _: IllegalArgumentException => logger.info("IllegalArgumentException: " + resourceContructionError); return false
		}
		finally {
			cursor.close()
		}
		DataFactory.setResources(resourcesMap)
		true
	}

	/**
	 * Esegue una query sul database e setta le unità in DataFactory.
	 * @return Ritorna true se il caricamento delle risorse è stato completato.
	 */
	private def loadUnits(): Boolean = {
		logger.info("Caricando le unità")
		val unitContructionError: String = "Errore di inizializzazione delle Unità, dati in input errati"
		val unitFetchingError: String = "Errore di inizializzazione delle Unità, inconsistenza dei dati letti dal db"
		val unitsCollection = db.getCollection("units")
		var unitsMap = Map[String, `Unit`]()

		val cursor = unitsCollection.find()
		try {
			while (cursor.hasNext) {
				val newUnit: `Unit` = UnitDAO.getObject(cursor.next())
				unitsMap += (newUnit.getKey -> newUnit)
			}
		}
		catch {
			case _: IllegalFieldValueException => logger.info("IllegalFieldValueException: " + unitFetchingError); return false
			case _: IllegalArgumentException => logger.info("IllegalArgumentException: " + unitContructionError); return false
		}
		finally {
			cursor.close()
		}
		DataFactory.setUnits(unitsMap)
		true
	}

	/**
	 * Esegue una query sul database e setta le building in DataFactory.
	 * @return Ritorna true se il caricamento delle building è stato completato.
	 */
	private def loadBuildings(): Boolean = {
		logger.info("Caricando le buildings")
		val buildingContructionError: String = "Errore di inizializzazione delle Buildings, dati in input errati"
		val buildingFetchingError: String = "Errore di inizializzazione delle Buildings, inconsistenza dei dati letti dal db"
		val buildingsCollection = db.getCollection("buildings")
		var buildingMap = Map[String, BuildingWithLevel]()

		val cursor = buildingsCollection.find()
		try {
			while (cursor.hasNext) {
				val newBuilding: BuildingWithLevel = BuildingWithLevelDAO.getObject(cursor.next)
				buildingMap += (newBuilding.getKey -> newBuilding)
			}
		}
		catch {
			case e: IllegalFieldValueException => logger.info("IllegalFieldValueException: " + buildingFetchingError); return false
			case e: IllegalArgumentException => logger.info("IllegalArgumentException: " + buildingContructionError); return false
		}
		finally {
			cursor.close()
		}
		DataFactory.setBuildings(buildingMap)
		true
	}

	/**
	 * Avvia la connessione al database leggendo i dati generali di gioco e settandoli nel DataFactory.
	 * @return Ritorna true se il caricamento di tutti i dati di gioco è stato completato.
	 */
	def connect(): Boolean = {
		logger.info("Connecting to: " + uri)
		try {
			if (!loadResources()) return false
			if (!loadUnits()) return false
			if (!loadBuildings()) return false
		}
		catch {
			case _: com.mongodb.MongoException.Network => logger.info(networkErrorLog); return false
		}
		true
	}

	/**
	 * Esegue una query sul database e ritorna un oggetto UserData corrispondente all'utente in input senza controllare la password.
	 * @param user Username dell'utente da caricare.
	 * @return user Username dell'utente caricato e il codice dell'esito dell'operazione.
	 *         Ritorna (userdata, 1) contenente i dati dell'utente se il caricamento è andato a buon fine
	 *         Ritorna (null, 1) se l'utente cercato non è presente nel database
	 *         Ritorna (null, 2) se fallisce per errore di ricostruzione dell'oggetto userdata poichè non diponibili tutti i campi
	 *         Ritorna (null, 3) se fallisce per errore di ricostruzione dell'oggetto userdata poichè sono stati letti valori inconsistenti
	 *         Ritorna (null, 4) se fallisce per errore di rete verso il database
	 */
	def internalLoadUserData(user: String): (UserData, Int) = {
		logger.info("Caricando l'user:" + user)
		val userContructionError: String = "Errore di inizializzazione dell'user, dati in input errati"
		val userFetchingError: String = "Errore di inizializzazione dell'user, inconsistenza dei dati letti dal db"
		val userCollection = db.getCollection("userdata")
		val userToLoad = MongoDBObject("authenticationData.user" -> user)
		var loadedUser: UserData = null

		val cursor = userCollection.find(userToLoad)
		try {
			if (cursor.hasNext)
				loadedUser = UserDataDAO.getObject(cursor.next())
		}
		catch {
			case _: IllegalFieldValueException => logger.info("IllegalFieldValueException: " + userFetchingError); return (null, 2)
			case e: IllegalArgumentException => logger.info("IllegalArgumentException: " + userContructionError); return (null, 3)
			case _: com.mongodb.MongoException.Network => logger.info(networkErrorLog); return (null, 4)
		}
		finally {
			cursor.close()
		}
		(loadedUser, 1)
	}

	/**
	 * Esegue una query sul database e ritorna un oggetto UserData corrispondente all'utente in input.
	 * @param user Username dell'utente da caricare.
	 * @param hashPassword Hash della password dell'utente da caricare.
	 * @return user Username dell'utente caricato e il codice dell'esito dell'operazione.
	 *         Ritorna (userdata, 1) contenente i dati dell'utente se il caricamento è andato a buon fine.
	 *         Ritorna (null, 1) se l'utente cercato non è presente nel database oppure la password non corrisponde.
	 *         Ritorna (null, 2) se fallisce per errore di ricostruzione dell'oggetto userdata poichè non diponibili tutti i campi.
	 *         Ritorna (null, 3) se fallisce per errore di ricostruzione dell'oggetto userdata poichè sono stati letti valori inconsistenti.
	 *         Ritorna (null, 4) se fallisce per errore di rete verso il database.
	 */
	def loadUserData(user: String, hashPassword: String): (UserData, Int) = {
		logger.info("Caricando l'user:" + user)
		val userContructionError: String = "Errore di inizializzazione dell'user, dati in input errati"
		val userFetchingError: String = "Errore di inizializzazione dell'user, inconsistenza dei dati letti dal db"
		val userCollection = db.getCollection("userdata")
		val userToLoad = MongoDBObject("authenticationData.user" -> user, "authenticationData.hashPassword" -> hashPassword)
		var loadedUser: UserData = null

		val cursor = userCollection.find(userToLoad)
		try {
			if (cursor.hasNext)
				loadedUser = UserDataDAO.getObject(cursor.next())
		}
		catch {
			case _: IllegalFieldValueException => logger.info("IllegalFieldValueException: " + userFetchingError); return (null, 2)
			case _: IllegalArgumentException => logger.info("IllegalArgumentException: " + userContructionError); return (null, 3)
			case _: com.mongodb.MongoException.Network => logger.info(networkErrorLog); return (null, 4)
		}
		finally {
			cursor.close()
		}
		(loadedUser, 1)
	}

	/**
	 * Esegue una query sul database ritornando n utenti random diversi dall'utente dato in input.
	 * @param user Username dell'utente che invoca il metodo.
	 * @param number Numero di utenti random che si vogliono visualizzare.
	 * @return Un array con al più n-1 utenti scelti in maniera random dal database.
	 */
	def loadRandomUsers(user: String, number: Int) = {

		if(number < 0) throw new IllegalArgumentException("Errore, numero di amici in input non valido!")
		var randomizedValues = mutable.MutableList[String]()
		if(number == 0){        // ritorno lista vuota
			randomizedValues
		}
		if(number > 0){
			val users = db.getCollection("userdata")
			val cursor2 = users.find(MongoDBObject("authenticationData.user" -> MongoDBObject("$ne" -> user)), MongoDBObject("_id" -> 0, "authenticationData.user" -> 1))
			val numUsers = cursor2.count()                   // numero totale di utenti nella collection escluso me stesso

			if(numUsers <= 0){
				randomizedValues            // ritorno lista vuota; vuol dire che sono l'unico utente
			}
			else{                           // c'è almeno un utente diverso da user, calcolo i vicini di villaggio in maniera random
				if(numUsers <= number){     // gli utenti del db (me escluso) sono meno di quelli che voglio visualizzare -> li inserisco tutti
					for(i <- 0 until numUsers){
						val extractedName = cursor2.next().getAsOrElse[DBObject]("authenticationData",throw new IllegalFieldValueException("authenticationData", "")).getAsOrElse[String]("user", throw new IllegalFieldValueException("user", ""))
						randomizedValues += extractedName
					}
				}
				else{   // gli utenti del db sono più di quelli che voglio visualizzare, ne scelgo number a caso
				val random = new Random(number) // crea un oggetto di tipo Number con valore compreso tra 0 e number-1 estremi inclusi
					for(i <- 0 until number){
						var trovato = false
						var randInt = random.nextInt(number)
						while(!trovato){
							val cursor3 = users.find(MongoDBObject("authenticationData.user" -> MongoDBObject("$ne" -> user)), MongoDBObject("_id" -> 0, "authenticationData.user" -> 1))
							// genera un numero random compreso tra 0 e number-1
							randInt = random.nextInt(cursor3.size())
							// skippo a quel numero, estraggo l'username, verifico se è già stato inserito e se non è già stato inserito, lo pusho nella lista
							val extractedName = cursor3.skip(randInt).next().getAsOrElse[DBObject]("authenticationData",throw new IllegalFieldValueException("authenticationData", "")).getAsOrElse[String]("user", throw new IllegalFieldValueException("user", ""))
							if(!randomizedValues.contains(extractedName)){
								randomizedValues += extractedName
								trovato = true
							}
							cursor3.close()
						}
					}
				}
				cursor2.close()
			}
			randomizedValues
		}
		randomizedValues
	}

	/**
	 * Salva sul database i dati aggiornati di un utente.
	 * @param userData Oggetto da salvare sul database.
	 * @return Ritorna true se il salvataggio è andato a buon fine
	 *         Ritorna false se fallisce per errore di rete verso il database
	 */
	def save(userData: UserData): Boolean = {
		logger.info("Salvando l'utente" + userData.getAuthenticationData.getUser)
		val userdataCollection = db.getCollection("userdata")
		val userToUpdate = MongoDBObject("authenticationData.user" -> userData.getAuthenticationData.getUser)
		val userDataToWrite = UserDataDAO.getMongoObject(userData)

		try {
			userdataCollection.update(userToUpdate, userDataToWrite, false, false)
		} catch {
			case _: com.mongodb.MongoException.Network => logger.info(networkErrorLog); return false
		}
		true
	}

	/**
	 * Inserisce sul database i dati di un nuovo utente.
	 * @param userdata Oggetto da salvare nel database.
	 * @return Ritorna 1 se il salvataggio è andato a buon fine.
	 *         Ritorna 2 se fallisce per user duplicata.
	 *         Ritorna 2 se fallisce per user e email duplicata.
	 *         Ritorna 3 se fallisce per email duplicata.
	 *         Ritorna 4 se fallisce per errore di rete verso il database.
	 */
	def insertNewUser(userdata: UserData): Int = {
		logger.info("Inserendo il nuovo utente" + userdata.getAuthenticationData.getUser)
		val duplicateUserError: String = "Errore inserimento " + userdata.getAuthenticationData.getUser + ": utente già presente"
		val userdataCollection = db.getCollection("userdata")

		try {
			userdataCollection.insert(UserDataDAO.getMongoObject(userdata))
		} catch {
			case e: com.mongodb.MongoException.DuplicateKey => {
				var duplicatedUser = false
				val userMatch = new Regex("authenticationData.user").findFirstMatchIn(e.toString)
				userMatch match {
					case Some(s) => duplicatedUser = true
					case None => //Do nothing
				}
				var duplicatedEmail = false
				val emailMatch = new Regex("authenticationData.email").findFirstMatchIn(e.toString)
				emailMatch match {
					case Some(s) => duplicatedEmail = true
					case None => //Do nothing
				}
				if (duplicatedUser)
					return 2
				if (duplicatedEmail)
					return 3
			}
			case _: com.mongodb.MongoException.Network => logger.info(networkErrorLog); return 5
		}
		1
	}

	/**
	 * Elimina definitavamente un utente dal database.
	 * @param user Username identificativo dell'utente da eliminare.
	 * @return Ritorna true se l'eliminazione è andata a buon fine.
	 *         Ritorna false se fallisce per errore di rete verso il database.
	 */
	def deleteUser(user: String): Boolean = {
		logger.info("Eliminando l'utente" + user)
		val userdataCollection = db.getCollection("userdata")

		val userToDrop = MongoDBObject("authenticationData.user" -> user)
		try {
			userdataCollection.remove(userToDrop)
		} catch {
			case _: com.mongodb.MongoException.Network => logger.info(networkErrorLog); return false
		}
		true
	}
}