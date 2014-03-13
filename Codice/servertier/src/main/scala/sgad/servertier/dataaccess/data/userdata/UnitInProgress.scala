/**
 * FILE: UnitInProgress.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/dataaccess/data/userdata
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-18 - Creazione della classe - Segantin Fabio
 */
package sgad.servertier.dataaccess.data.userdata

import sgad.servertier.dataaccess.data.shareddata.Unit

/**
 * Classe per la gestione di un costo in termini di risorse e tempo.
 * @constructor
 * @param unit Il tipo di unità.
 * @param startedTime La data con orario preciso al secondo in cui la costruzione di unità è iniziata.
 * @param quantity La quantità di unità.
 */
class UnitInProgress(private val unit: `Unit`, private var startedTime: Long, private var quantity: Int) extends UnitPossession(quantity, unit) {
	if (startedTime < 0)
		throw new IllegalArgumentException

	/**
	 * Metodo getter per l'attributo startedTime.
	 * @return La data con orario preciso al secondo in cui la costruzione di unità è iniziata.
	 */
	def getStartedTime = startedTime

	/**
	 * Metodo per il confronto.
	 * @param other Oggetto da confrontare.
	 * @return True o false in base all'esito del confronto.
	 */
	override def equals(other: Any): Boolean = {
		if (!other.isInstanceOf[UnitInProgress])
			false
		else
			(startedTime == other.asInstanceOf[UnitInProgress].startedTime
				&& super.equals(other))
	}

	/**
	 * Metodo utilizzato per aggiornare startedTime.
	 * @param time Tempo da aggiungere a startedTime.
	 */
	def updateTime(time: Int) = {
		if (time > 0)
			startedTime += time
	}

	/**
	 * Metodo utilizzato per fare l'update della quantità rimanente.
	 * @param quantit La quantità di unità da sottrarre, deve essere maggiore di zero.
	 */
	def updateQuantity(quantit: Int) = {
		if (quantit > 0)
			setQuantity(getQuantity - quantit)
	}
}