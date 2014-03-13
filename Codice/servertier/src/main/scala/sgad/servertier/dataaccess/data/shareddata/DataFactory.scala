/**
 * FILE: Specifica_Tecnica.tex
 * PERCORSO /Codice/sgad/servertier/src/main/scala/sgad/servertier/dataaccess/data/shareddata
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-18 - Creazione della classe - Biancucci Maurizio
 * 2014-02-23 - Aggiunti Metodi DAO - Segantin Fabio
 */
package sgad.servertier.dataaccess.data.shareddata

import scala.collection.immutable.Map


/**
 * Classe che ritorna un'istanza delle componenti di gioco.
 */
object DataFactory {
	/**
	 * Le BuildingWithLevel disponibili nel gioco.
	 */
	private var buildings: Map[String, BuildingWithLevel] = Map()

	/**
	 * Le Resource disponibili nel gioco.
	 */
	private var resources: Map[String, Resource] = Map()

	/*
	 * Le Unit disponibili nel gioco.
	 */
	private var units: Map[String, `Unit`] = Map()

	/**
	 * Fornisce un oggetto della classe BuildingWithLevel corrispondente alla key passata.
	 * @param key Chiave identificativa della BuildingWithLevel desiderata.
	 */
	def getBuilding(key: String) = buildings(key)

	/**
	 * Ritorna la Resource corrispondente alla key in input.
	 * @param key Chiave identificativa della Resource desiderata.
	 */
	def getResource(key: String) = resources(key)

	/**
	 * Ritorna la Unit corrispondente alla key in input.
	 * @param key L'identificativo dell'unità richiesta.
	 */
	def getUnit(key: String): `Unit` = units(key)

	/**
	 * Setta le BuildingWithLevel disponibili nel gioco.
	 * @param buildings Le costruzioni disponibili nel gioco.
	 */
	def setBuildings(buildings: Map[String, BuildingWithLevel]) = {
		if (buildings == null)
			throw new IllegalArgumentException
		this.buildings = buildings
		buildings.foreach((pairBuilding: (String, BuildingWithLevel)) => {
			pairBuilding._2.resolveDependency()
		})
	}

	/**
	 * Setta le Resource disponibili nel gioco.
	 * @param resources Le risorse disponibili nel gioco.
	 */
	def setResources(resources: Map[String, Resource]) = {
		if (resources == null)
			throw new IllegalArgumentException
		this.resources = resources
	}

	/**
	 * Setta le Unit disponibili nel gioco.
	 * @param units Le unità disponibili nel gioco.
	 */
	def setUnits(units: Map[String, `Unit`]) = {
		if (units == null)
			throw new IllegalArgumentException
		this.units = units
	}

	/**
	 * Metodo get utilizzato dai DAO per ricevere l'intera mappa di unità.
	 * @return Mappa di unità.
	 */
	def getUnitsMap = units

	/**
	 * Metodo get utilizzato dai DAO per ricevere l'intera mappa di risorse.
	 * @return Mappa di risorse.
	 */
	def getResourcesMap = resources

	/**
	 * Metodo get utilizzato dai DAO per ricevere l'intera mappa di edifici.
	 * @return Mappa di edifici.
	 */
	private[dataaccess] def getBuildingsMap = buildings
}