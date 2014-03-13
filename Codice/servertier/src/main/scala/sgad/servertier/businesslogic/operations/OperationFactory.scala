
package sgad.servertier.businesslogic.operations

/**
 * Classe per la gestione delle classi che implementano il trait Operation.
 */
object OperationFactory {
	/**
	 * Contiene le tutte le operazioni effettuabili dalla Logic.
	 */
	val operations = Map(
		"Attack" -> new Attack,
		"BuildConstruction" -> new BuildConstruction,
		"ChangeAccountData" -> new ChangeAccountData,
		"DeleteAccount" -> new DeleteAccount,
		"DemolishBuilding" -> new DemolishBuilding,
		"DismissUnit" -> new DismissUnit,
		"HarvestResource" -> new HarvestResource,
		"InternalLogin" -> new InternalLogin,
		"LoadGlobalData" -> new LoadGlobalData,
		"LoadUserList" -> new LoadUserList,
		"LoadVillage" -> new LoadVillage,
		"Login" -> new Login,
		"Logout" -> new Logout,
		"ReceiveAttack" -> new ReceiveAttack,
		"ReceiveStealResource" -> new ReceiveStealResource,
		"Registration" -> new Registration,
		"SaveUser" -> new SaveUser,
		"StealResource" -> new StealResource,
		"TrainUnit" -> new TrainUnit,
		"UpdateUserData" -> new UpdateUserData,
		"UpgradeBuilding" -> new UpgradeBuilding
	)

	/**
	 * Ritorna l'operazione identificata dalla string in input.
	 * @param key Stringa identificativa dell'operazione richiesta.
	 */
	def getOperation(key: String): Operation = operations(key)

}
