/**
 * FILE: Position.scala
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

/**
 * Classe per la gestione di una posizione sulla griglia del villaggio.
 * @constructor
 * @param x La coordinata x.
 * @param y La coordinata y.
 */
class Position(private val x: Int, private val y: Int) {
	/**
	 * Metodo getter per l'attributo x.
	 * @return La coordinata x.
	 */
	def getX = x

	/**
	 * Metodo getter per l'attributo y.
	 * @return La coordinata y.
	 */
	def getY = y

	/**
	 * Metodo di confronto.
	 * @param other Altro oggetto con cui fare il confronto.
	 * @return True or false in base all'esito.
	 */
	override def equals(other: Any): Boolean = {
		if (!other.isInstanceOf[Position])
			false
		else
			(x == other.asInstanceOf[Position].x
				&& y == other.asInstanceOf[Position].y)
	}
}