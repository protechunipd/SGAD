/**
 * FILE: Cost.scala
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

import scala.collection.immutable.Vector

/**
 * Classe per la gestione di un costo in termini di risorse e tempo.
 * @constructor
 * @param relativeTime Il tempo necessario espresso in secondi.
 * @param quantityResource Le quantità e il tipo di risorse necessarie.
 */
class Cost(private val relativeTime: Int, private val quantityResource: Vector[QuantityResource]) {
	if (quantityResource == null
		|| relativeTime < 0) {
		throw new IllegalArgumentException
	}

	/**
	 * Metodo getter per l'attributo relativeTime.
	 * @return Il tempo necessario espresso in secondi.
	 */
	def getRelativeTime = relativeTime

	/**
	 * Metodo getter per l'attributo quantityResource.
	 * @return La quantità e il tipo di risorse necessarie.
	 */
	def getQuantityResource = quantityResource

	/**
	 * Metodo per controllare l'uguaglianza di due Costi.
	 * @param other Il costo con cui confrontarsi.
	 * @return Vero o falso a seconda dell'esito.
	 */
	override def equals(other: Any): Boolean = {
		if (!other.isInstanceOf[Cost])
			false
		else
			(relativeTime == other.asInstanceOf[Cost].relativeTime
				&& quantityResource.forall((quant: QuantityResource) => {
				other.asInstanceOf[Cost].quantityResource.contains(quant)
			})
				&& other.asInstanceOf[Cost].quantityResource.forall((quant: QuantityResource) => {
				quantityResource.contains(quant)
			})
				)
	}
}