/**
 * FILE: BuildingWithLevel.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/dataaccess/data/shareddata
 * DATA CREAZIONE: 19 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Creazione della classe - Nessi Alberto
 */
package sgad.servertier.dataaccess.data.shareddata

import scala.collection.immutable.Vector

/**
 * Classe per la memorizzazione di tutte le informazioni che descrivono un edificio ad un particolare livello.
 * @constructor
 * @param isConstructible Indica se l'edificio è direttamente edificabile su una cella dell'area di gioco.
 * @param bonus Il bonus a disposizione della costruzione.
 * @param cost Le quantità ed il tipo di risorse necessarie.
 * @param level Il livello della costruzione.
 * @param nameBuilding Il nome della costruzione.
 * @param precondition Le costruzioni necessarie per poter costruire questo edificio.
 * @param productedResource La risorsa che questo edificio produce.
 * @param productedUnits Le unità che questo edificio può produrre.
 * @param unitsSpace I posti per le unità che questo edificio offre.
 * @param isDestructible Indica se l'edificio è rimovibile.
 */

class BuildingWithLevel(private val isConstructible: Boolean, private val bonus: Bonus, private val cost: Cost, private val level: Int,
                        private val nameBuilding: String, private var precondition: Vector[Any], private val productedResource: ProductedResource,
                        private val productedUnits: Vector[`Unit`], private val unitsSpace: Int, private val isDestructible: Boolean) {

	var dependecyResolved = false
	if (bonus == null
		|| cost == null
		|| level < 0
		|| nameBuilding == null
		|| precondition == null
		|| productedUnits == null
		|| unitsSpace < 0)
		throw new IllegalArgumentException("Parametri costruttore BuildingWithLevel errati")


	/**
	 * Metodo getter per l'attributo isConstructible.
	 * @return Se l'edificio è direttamente edificabile su una cella dell'area di gioco.
	 */
	def getIsConstructible = isConstructible

	/**
	 * Metodo getter per l'attributo isDestructible.
	 * @return Se l'edificio è distruttible.
	 */
	def getIsDestructible = isDestructible

	/**
	 * Metodo getter per l'attributo bonus.
	 * @return Il bonus a disposizione per la costruzione.
	 */
	def getBonus = bonus

	/**
	 * Metodo getter per l'attributo cost.
	 * @return Il costo per costruire la costruzione.
	 */
	def getCost = cost

	/**
	 * Metodo getter per l'attributo level.
	 * @return Il livello della costruzione.
	 */
	def getLevel = level

	/**
	 * Metodo getter per l'attributo nameBuilding.
	 * @return Il nome della costruzione.
	 */
	def getNameBuilding = nameBuilding

	/**
	 * Metodo getter per l'attributo precondition.
	 * @return le costruzioni necessarie per poter costruire questo edificio.
	 */
	def getPrecondition = precondition

	/**
	 * Metodo getter per l'attributo productedResource.
	 * @return La risorsa che questo edificio produce.
	 */
	def getProductedResource = productedResource

	/**
	 * Metodo getter per l'attributo productedUnits.
	 * @return Le unità che questo edificio può produrre.
	 */
	def getProductedUnits = productedUnits

	/**
	 * Metodo getter per l'attributo unitsSpace.
	 * @return Le unità che questo edificio può produrre.
	 */
	def getUnitsSpace = unitsSpace

	/**
	 * Metodo che fornisce la chiave identificativa dell'edificio.
	 * @return Fornisce la chiave identificativa dell'edificio.
	 */
	def getKey = nameBuilding + "L" + level

	/**
	 * Metodo che fornisce la chiave identificativa dell'edificio di livello successivo.
	 * @return Fornisce la chiave identificativa dell'edificio di livello successivo.
	 */
	def getNextLevelKey = nameBuilding + "L" + (level + 1)

	/**
	 * Metodo equals che confronta i due oggetti dicendo se sono uguali.
	 * @param other L'altro oggetto cn cui fare il confronto.
	 * @return True o false a seconda dell'esito.
	 */
	override def equals(other: Any): Boolean = {
		if (!other.isInstanceOf[BuildingWithLevel])
			false
		else
			getKey == other.asInstanceOf[BuildingWithLevel].getKey
	}

	/**
	 * Risolve le dipendenze della Building, per ogni dipendenza prende dal DataFactory un riferimento all'oggetto al posto di tenere una stringa.
	 */
	private[shareddata] def resolveDependency() {
		if (!dependecyResolved) {
			precondition = precondition.map(
				(KeyBuilding: Any) => {
					DataFactory.getBuilding(KeyBuilding.asInstanceOf[String])
				}
			)
			dependecyResolved = true
		}
	}

}