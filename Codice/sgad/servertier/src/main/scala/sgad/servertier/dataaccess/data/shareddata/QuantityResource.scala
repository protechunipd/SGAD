/**
 * FILE: QuantityResource.scala
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
 * Classe per la gestione della quantità di una particolare risorsa.
 * @constructor
 * @param resource La [[sgad.servertier.dataaccess.data.shareddata.Resource]] di cui si vuole memorizzare la quantità.
 * @param quantity Il numero di unità della data risorsa.
 */
class QuantityResource(private val resource: Resource, private val quantity: Int) {
	if (resource == null
		|| quantity < 0) {
		throw new IllegalArgumentException
	}

	/**
	 * Metodo getter per l'attributo [[sgad.servertier.dataaccess.data.shareddata.QuantityResource.quantity]].
	 * @return La quantità della risorsa in questione.
	 */
	def getQuantity = quantity

	/**
	 * Metodo getter per l'attributo [[sgad.servertier.dataaccess.data.shareddata.QuantityResource.resource]].
	 * @return La risorsa in questione.
	 */
	def getResource = resource

	/**
	 * Metodo per controllare l'uguaglianza.
	 * @param other Un'altra quantità.
	 * @return True o false  in base all'esito del confronto.
	 */
	override def equals(other: Any): Boolean = {
		if (!other.isInstanceOf[QuantityResource])
			false
		else
			(quantity == other.asInstanceOf[QuantityResource].quantity
				&& resource.equals(other.asInstanceOf[QuantityResource].resource)
				)
	}
}