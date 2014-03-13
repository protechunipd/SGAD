/**
 * FILE: Bonus.scala
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/dataaccess/data/shareddata
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-18 - Creazione della classe - Biancucci Maurizio
 */
package sgad.servertier.dataaccess.data.shareddata

/**
 * Classe per la gestione dei bonus eventualmente disponibili per certi edifici.
 * @constructor
 * @param bonusName Il nome del bonus.
 * @param type Il codice identificativo del bonus, il quale determina quale caratteristica del BuildingWithLevel influenza.
 * @param quantity La potenza del bonus, cioè quanto influenza la caratteristica del BuildingWithLevel.
 */
class Bonus(private val bonusName: String, private val `type`: Int, private val quantity: Float) {
	if(bonusName==null)
		throw new IllegalArgumentException
	/**
	 * Metodo getter per l'attributo bonusName.
	 * @return Il nome del bonus.
	 */
	def getBonusName = bonusName
	/**
	 * Metodo getter per l'attributo type.
	 * @return Il codice identificativo del bonus, il quale determina quale caratteristica del BuildingWithLevel influenza.
	 */
	def getType = `type`
	/**
	 * Metodo getter per l'attributo quantity.
	 * @return  La potenza del bonus, cioè quanto influenza la caratteristica del BuildingWithLevel.
	 */
	def getQuantity = quantity
	/**
	 * Metodo per il confronto.
	 * @param other l'altro oggetto con cui fare il confronto.
	 * @return True o false in base all'esito.
	 */
	override def equals(other: Any):Boolean ={
		if(!other.isInstanceOf[Bonus])
			false
		else
			(bonusName == other.asInstanceOf[Bonus].bonusName
			&& `type` == other.asInstanceOf[Bonus].`type`
			&& quantity == other.asInstanceOf[Bonus].quantity)
	}
}