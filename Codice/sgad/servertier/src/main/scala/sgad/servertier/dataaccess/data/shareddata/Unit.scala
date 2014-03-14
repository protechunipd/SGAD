/**
 * FILE: Unit.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/dataaccess/data/shareddata
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-18 - Creazione della classe - Segantin Fabio
 */
package sgad.servertier.dataaccess.data.shareddata

/**
 * Classe per la gestione delle informazioni di una unità.
 * @constructor
 * @param name Il nome dell'unità.
 * @param attack La forza di attacco dell'unità.
 * @param defence La forza di difesa dell'unità.
 * @param cost Il costo di produzione dell'unità.
 * @param isBuilder Identifica le unità che permettono di costruire.
 */
class Unit(private val name: String, private val attack: Int, private val defence: Int, private val cost: Cost, private val isBuilder: Boolean) {
	if (name == null
		|| cost == null
		|| attack < 0
		|| defence < 0)
		throw new IllegalArgumentException

	/**
	 * Metodo getter per l'attributo name.
	 * @return il nome dell'unità.
	 */
	def getName = name

	/**
	 * Metodo getter per l'attributo attack.
	 * @return la forza di attacco dell'unità.
	 */
	def getAttack = attack

	/**
	 * Metodo getter per l'attributo defence.
	 * @return la forza di difesa dell'unità.
	 */
	def getDefence = defence

	/**
	 * Metodo getter per l'attributo cost.
	 * @return il costo di produzione dell'unità.
	 */
	def getCost = cost

	/**
	 * Fornisce la chiave identificativa dell'unità.
	 * @return La stringa chiave dell'unità.
	 */
	def getKey = getName

	/**
	 * Metodo getter per l'attributo isBuilder.
	 * @return La variabile isBuilder.
	 */
	def getIsBuilder = isBuilder

	/**
	 * Metodo per controllare l'uguaglianza.
	 * @param other L'altro oggetto con cui si fa il confronto.
	 * @return True o false in seguito al confronto.
	 */
	override def equals(other: Any): Boolean = {
		if (!other.isInstanceOf[Unit])
			false
		else
			getKey == other.asInstanceOf[`Unit`].getKey
	}
}