/**
 * FILE: UnitPossession.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/dataaccess/data/userdata
 * DATA CREAZIONE: 19 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-19 - Creazione della classe - Segantin Fabio
 */
package sgad.servertier.dataaccess.data.userdata

import sgad.servertier.dataaccess.data.shareddata.`Unit`

/**
 * Classe per la rappresentazione di un'unità con associata una quantità.
 * @constructor
 * @param quantity La quantità di unità.
 * @param unit Il tipo di unità.
 */
class UnitPossession(private var quantity: Int, private val unit: `Unit`) {
	if (unit == null
		|| quantity < 0)
		throw new IllegalArgumentException

	/**
	 * Metodo getter per l'attributo quantity.
	 * @return La quantità di unità.
	 */
	def getQuantity = quantity

	/**
	 * Metodo getter per l'attributo unit.
	 * @return Il tipo di unità.
	 */
	def getUnit = unit

	/**
	 * Metodo setter per l'attributo quantity.
	 * @param quantity La quantità di unità, deve essere >=0.
	 */
	def setQuantity(quantity: Int) = {
		if (quantity < 0)
			throw new IllegalArgumentException
		this.quantity = quantity
	}

	/**
	 * Metodo di confronto
	 * @param other L'oggetto con cui fare il confronto.
	 * @return True or false in base all'esito.
	 */
	override def equals(other: Any): Boolean = {
		if (!other.isInstanceOf[UnitPossession])
			false
		else
			(unit == other.asInstanceOf[UnitPossession].unit
				&& quantity == other.asInstanceOf[UnitPossession].quantity)
	}

	/**
	 * Metodo getter per la key di UnitPossession.
	 * @return La chiave relativa all'unità.
	 */
	def getKey = unit.getKey
}