/**
 * FILE: BuildingPossession.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/dataaccess/data/userdata
 * DATA CREAZIONE: 20 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Creazione della classe - Nessi Alberto
 */

package sgad.servertier.dataaccess.data.userdata

import sgad.servertier.dataaccess.data.shareddata.BuildingWithLevel

/**
 * Classe per la memorizzazione delle informazioni riguardanti un edificio posseduto da un utente.
 * @constructor
 * @param building Il tipo di costruzione.
 * @param position Le coordinate in cui l'edificio è posizionato nel mondo di gioco.
 * @param isFinished Se la costruzione dell'edificio è completa.
 * @param time Una data con orario preciso al secondo. Se l'edificio è completamente costruito indica il momento in cui è stata effettuata l'ultima raccolta delle risorse prodotte. Se l'edificio è in costruzione indica il momento in cui la costruzione è iniziata.
 * @param unitInProgress Le eventuali unità in costruzione presso l'edificio.
 */

class BuildingPossession(private var building: BuildingWithLevel, private val position: Position, private var isFinished: Boolean, private var time: Long, private var unitInProgress: UnitInProgress) {
	if (building == null
		|| position == null)
		throw new IllegalArgumentException

	/**
	 * Metodo getter per l'attributo building.
	 * @return Il tipo di costruzione.
	 */
	def getBuilding = building

	/**
	 * Metodo getter per l'attributo building.
	 * @return Il tipo di costruzione.
	 */
	def getPosition = position

	/**
	 * Metodo getter per l'attributo isFinished.
	 * @return Se la costruzione dell'edificio è completa.
	 */
	def getIsFinished = isFinished

	/**
	 * Metodo getter per l'attributo time.
	 * @return Una data con orario preciso al secondo. Se l'edificio è completamente costruito indica il momento in cui è stata effettuata l'ultima raccolta delle risorse prodotte. Se l'edificio è in costruzione indica il momento in cui la costruzione è iniziata.
	 */
	def getTime = time

	/**
	 * Metodo getter per l'attributo unitInProgress.
	 * @return Le eventuali unità in costruzione presso l'edificio.
	 */
	def getUnitInProgress = unitInProgress

	/**
	 * Metodo che ritorna la chiave univoca.
	 * @return La chiave univoca nel formato NomebuildingLivelloCoordinataXCoordinataY
	 */
	def getKey = building.getKey + "X" + position.getX + "Y" + position.getY

	/**
	 * Metodo per il confronto.
	 * @param other L'altro oggetto cn cui fare il confronto.
	 * @return True o false in base all'esito del confronto.
	 */
	override def equals(other: Any): Boolean = {
		if (!other.isInstanceOf[BuildingPossession])
			false
		else
			(getKey == other.asInstanceOf[BuildingPossession].getKey
				&& position == other.asInstanceOf[BuildingPossession].position)
	}

	/**
	 * Metodo setter per l'attributo isFinished.
	 * @param state Indica se la costruzione è stata completata.
	 */
	def setIsFinished(state: Boolean) = if (state) isFinished = state

	/**
	 * Metodo setter per l'attributo Time.
	 * @param newTime Il tempo, che deve essere maggiore di quello corrente.
	 */
	def setTime(newTime: Long) = if (time < newTime) time = newTime

	/**
	 * Metodo setter per l'attributo building.
	 * @param newBuilding La nuova costruzione.
	 */
	def setBuilding(newBuilding: BuildingWithLevel) = if (building.getNextLevelKey == newBuilding.getKey) {
		building = newBuilding
		isFinished = false
	}

	/**
	 * Metodo per aggiungere unità alla coda di produzione.
	 * @param unitInProgress Le unità da aggiungere.
	 * @return True o false se riesce ad aggiungere alla coda.
	 */
	def addUnit(unitInProgress: UnitInProgress) = {
		if (this.unitInProgress == null || this.unitInProgress.getQuantity == 0) {
			this.unitInProgress = unitInProgress
			true
		} else {
			if (this.unitInProgress.getKey == unitInProgress.getKey) {
				this.unitInProgress.setQuantity(this.unitInProgress.getQuantity + unitInProgress.getQuantity)
				true
			}
			else
				false
		}
	}
}