/**
 * FILE: AuthenticationData.scala
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

import sgad.servertier.dataaccess.data.shareddata.Resource

/**
 * Classe che rappresenta una risorsa posseduta da un utente.
 * @constructor
 * @param resource Il tipo di risorsa.
 * @param quantity La quantità di risorsa posseduta.
 */
class OwnedResource(private val resource: Resource, private var quantity: Int) {
	if (resource == null || quantity < 0)
		throw new IllegalArgumentException

	/**
	 * Metodo getter per l'attributo resource.
	 * @return La risorsa posseduta.
	 */
	def getResource = resource

	/**
	 * Metodo getter per l'attributo quantity.
	 * @return La quantità della risorsa in questione
	 */
	def getQuantity = quantity

	/**
	 * Metodo setter per l'attributo quantity.
	 * @param quantity Nuovo valore da settare per la quantità, deve essere maggiore di zero.
	 */
	def setQuantity(quantity: Int): Unit = {
		if (quantity < 0)
			throw new IllegalArgumentException
		this.quantity = quantity
	}

	/**
	 * Metodo utilizzato per il confronto.
	 * @param other L'oggetto con cui fare il confronto.
	 * @return True o false in base all'esito.
	 */
	override def equals(other: Any): Boolean = {
		if (!other.isInstanceOf[OwnedResource])
			false
		else
			(resource == other.asInstanceOf[OwnedResource].resource
				&& quantity == other.asInstanceOf[OwnedResource].quantity)
	}

	/**
	 * Metodo getter per la key.
	 * @return La chiave della risorsa.
	 */
	def getKey = resource.getKey
}