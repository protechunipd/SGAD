/**
 * FILE: Resource.scala
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
 * Classe per la memorizzazione delle informazioni su una risorsa.
 * @constructor
 * @param resourceName Il nome della risorsa.
 */
class Resource(private val resourceName : String) {
	if(resourceName == null)
		throw new IllegalArgumentException
	/**
	 * Metodo getter per il nome risorsa.
	 * @return Il nome della risorsa.
	 */
	def getResourceName = resourceName
	/**
	 * Fornisce la chiave identificativa della risorsa.
	 * @return Il nome della risorsa.
	 */
	def getKey = getResourceName
	/**
	 * Verifica se due risorse sono uguali.
	 * @param risorsa La risorsa con cui verificare l'uguaglianza.
	 * @return Vero o falso in base all'esito del confronto.
	 */
	override def equals(risorsa : Any):Boolean = {
		if(!risorsa.isInstanceOf[Resource])
			false
		else
			this.resourceName == risorsa.asInstanceOf[Resource].resourceName
	}
}