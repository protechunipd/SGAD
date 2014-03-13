/**
 * FILE: BackToVillage.js
 * PERCORSO /Codice/sgad/clienttier/controller/actions/BackToVillage.js
 * DATA CREAZIONE: 22 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-22 - Creazione della classe - Battistella Stefano
 */

//Eredita da Action
BackToVillage.prototype = new Action();

//Costruttore della classe
BackToVillage.prototype.constructor = BackToVillage;

/**
 * Classe per permettere di ritornare al proprio villaggio nella mappa.
 * @implements Action
 * @constructor
 */
function BackToVillage() {
}

/**
 * Esegue la lista di azioni necessaria per ritornare al villaggio.
 * @override
 * @return {void}
 */
BackToVillage.prototype.performAction = function() {
	BackupManager.getInstance().restoreDatas(); //ripristino i dati dell'utente precedentemente salvati
};