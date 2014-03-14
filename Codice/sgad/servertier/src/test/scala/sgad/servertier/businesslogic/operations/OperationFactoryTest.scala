/**
 * FILE: OperationFactoryTest.scala
 * PERCORSO /Codice/sgad/servertier/src/test/scala/sgad/servertier/businesslogic/operations
 * DATA CREAZIONE: 23 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-23 - Creazione della classe - Biancucci Maurizio
 */
import sgad.servertier.businesslogic.operations._
import org.scalatest.FlatSpec

/**
 * Classe per il test della classe OperationFactory.
 */
object OperationFactoryTest  extends FlatSpec{

	"L'operazione Attack" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("Attack").isInstanceOf[Attack])
	}

	"L'operazione BuildConstruction" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("BuildConstruction").isInstanceOf[BuildConstruction])
	}

	"L'operazione ChangeAccoutData" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("ChangeAccountData").isInstanceOf[ChangeAccountData])
	}

	"L'operazione DeleteAccount" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("DeleteAccount").isInstanceOf[DeleteAccount])
	}

	"L'operazione DemolishBuilding" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("DemolishBuilding").isInstanceOf[DemolishBuilding])
	}

	"L'operazione DismissUnit" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("DismissUnit").isInstanceOf[DismissUnit])
	}

	"L'operazione HarvestResource" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("HarvestResource").isInstanceOf[HarvestResource])
	}

	"L'operazione InternalLogin" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("InternalLogin").isInstanceOf[InternalLogin])
	}

	"L'operazione LoadGlobalData" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("LoadGlobalData").isInstanceOf[LoadGlobalData])
	}

	"L'operazione LoadUserList" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("LoadUserList").isInstanceOf[LoadUserList])
	}

	"L'operazione LoadVillage" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("LoadVillage").isInstanceOf[LoadVillage])
	}

	"L'operazione Login" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("Login").isInstanceOf[Login])
	}

	"L'operazione Logout" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("Logout").isInstanceOf[Logout])
	}

	"L'operazione ReceiveAttack" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("ReceiveAttack").isInstanceOf[ReceiveAttack])
	}

	"L'operazione ReceiveStealResource" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("ReceiveStealResource").isInstanceOf[ReceiveStealResource])
	}

	"L'operazione Registration" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("Registration").isInstanceOf[Registration])
	}

	"L'operazione SaveUser" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("SaveUser").isInstanceOf[SaveUser])
	}

	"L'operazione StealResource" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("StealResource").isInstanceOf[StealResource])
	}

	"L'operazione TrainUnit" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("TrainUnit").isInstanceOf[TrainUnit])
	}

	"L'operazione UpdateUserData" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("UpdateUserData").isInstanceOf[UpdateUserData])
	}

	"L'operazione UpgradeBuilding" must "essere diponibile dalla OperationFactory" in {
		assert(OperationFactory.getOperation("UpgradeBuilding").isInstanceOf[UpgradeBuilding])
	}

}
