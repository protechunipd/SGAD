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
 * Classe  per la memorizzazione delle informazioni relative alla risorsa prodotta da un edificio.
 * @constructor
 * @param resource La [[sgad.servertier.dataaccess.data.shareddata.Resource]] prodotta.
 * @param relativeTime Indica ogni quanto l'edificio produce [[sgad.servertier.dataaccess.data.shareddata.ProductedResource.quantity]] unità di [[sgad.servertier.dataaccess.data.shareddata.ProductedResource.resource]] resource.
 * @param quantity Il numero di [[sgad.servertier.dataaccess.data.shareddata.ProductedResource.resource]] prodotta ogni multiplo di [[sgad.servertier.dataaccess.data.shareddata.ProductedResource.relativeTime]] che passa.
 * @param maxQuantity Il massimo numero di unità di [[sgad.servertier.dataaccess.data.shareddata.ProductedResource.resource]] accumulabili nell'edificio.
 */
class ProductedResource(private val resource : Resource, private val relativeTime : Int, private val quantity : Int, private val maxQuantity : Int){
	if(resource == null
		|| relativeTime <0
		|| quantity <0
		|| maxQuantity<0)
		throw new IllegalArgumentException
	/**
	 * Metodo getter per l'attributo [[sgad.servertier.dataaccess.data.shareddata.ProductedResource.resource]].
	 * @return La [[sgad.servertier.dataaccess.data.shareddata.ProductedResource.resource]] prodotta.
	 */
	def getResource = resource
	/**
	 * Metodo getter per l'attributo [[sgad.servertier.dataaccess.data.shareddata.ProductedResource.relativeTime]].
	 * @return La quantità di tempo richiesta per la produzione della [[sgad.servertier.dataaccess.data.shareddata.ProductedResource.resource]].
	 */
	def getRelativeTime = relativeTime
	/**
	 * Metodo getter per l'attributo [[sgad.servertier.dataaccess.data.shareddata.ProductedResource.quantity]].
	 * @return La quantità di [[sgad.servertier.dataaccess.data.shareddata.ProductedResource.resource]] prodotta.
	 */
	def getQuantity = quantity
	/**
	 * Metodo getter per l'attributo [[sgad.servertier.dataaccess.data.shareddata.ProductedResource.maxQuantity]].
	 * @return La quantità massima di [[sgad.servertier.dataaccess.data.shareddata.ProductedResource.resource]] immagazzinabile.
	 */
	def getMaxQuantity = maxQuantity
	/**
	 * Metodo per controllare l'uguaglianza.
	 * @param other Una ProductedResource da controllare.
	 * @return True o false in base all'esito.
	 */
	override def equals(other : Any):Boolean = {
		if(!other.isInstanceOf[ProductedResource])
			false
		else
			(relativeTime == other.asInstanceOf[ProductedResource].relativeTime
			&& quantity == other.asInstanceOf[ProductedResource].quantity
			&& maxQuantity == other.asInstanceOf[ProductedResource].maxQuantity
			&& resource.equals(other.asInstanceOf[ProductedResource].resource)
					)
	}
}