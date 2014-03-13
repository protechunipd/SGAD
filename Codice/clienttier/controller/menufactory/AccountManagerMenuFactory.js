/**
 * FILE: AccountManagerMenuFactory.js
 * PERCORSO /Codice/sgad/clienttier/controller/menufactory/AccountManagerMenuFactory.js
 * DATA CREAZIONE: 18 Febbraio 2014
 * AUTORE: ProTech
 * EMAIL: protech.unipd@gmail.com
 *
 * Questo file è proprietà del gruppo ProTech, viene rilasciato sotto licenza Apache v2.
 *
 * DIARIO DELLE MODIFICHE:
 * 2014-02-20 - Implementato i metodi createTrainUnitsWidget(frame) e createTrainUnitsQueueWidget(frame) - Battistella Stefano
 * 2014-02-19 - Implementato i metodi createUpgradeWidget(frame) e createDemolishWidget(frame) - Battistella Stefano
 * 2014-02-18 - Creazione della classe - Battistella Stefano
 */

//Eredita da MenuFactory
AccountManagerMenuFactory.prototype = new MenuFactory();

//Costruttore della classe.
AccountManagerMenuFactory.prototype.constructor = AccountManagerMenuFactory;

/**
 * Classe per la costruzione di un menu che permetta all'utente di modificare il proprio account.
 * @implemets MenuFactory
 * @constructor
 */
function AccountManagerMenuFactory() {
}

/**
 * Costruisce il menu contestuale.
 * @override
 * @return {FrameWidget} Il frame contenente il menu contestuale.
 */
AccountManagerMenuFactory.prototype.buildMenu = function () {
	var bound = Bound.getInstance();
	var frame = new FrameWidget("Dati account", new Point2D(0, 0)); //creo il frame per visualizzare i dati

	var userData = UserDataManager.getInstance().getUserData();
	var auth = userData.getAuthenticationData();
	var userNameText = "Username: " + auth.getUser();
	var userNameWidget = new TextWidget(userNameText, new Point2D(0, 0), 300); //testo della notifica
	var topOffset = userNameWidget.getHeight();
	var emailText = "Email: " + auth.getEmail();
	var emailWidget = new TextWidget(emailText, new Point2D(0, topOffset + 5), 300); //testo della notifica
	topOffset += emailWidget.getHeight();

	var changePasswordButton = new ButtonWidget("Modifica password", new Point2D(90, topOffset + 10), 120, 25); //bottone per modificare la password
	var deleteAccountButton = new ButtonWidget("Elimina account", new Point2D(90, topOffset + 40), 120, 25); //bottone per eliminare l'account
	var exitButton = new ButtonWidget("Chiudi", new Point2D(240, topOffset + 70), 60, 25); //bottone per continuare e chiudere il menu

	var changePasswordListener = new ActionListener();
	changePasswordListener.addAction(new CloseContextualMenu());
	changePasswordListener.addAction(new ChangePasswordAction());
	changePasswordButton.setOnClickEvent(changePasswordListener); //associo l'azione di modifica della password al relativo bottone

	var deleteAccountListener = new ActionListener();
	deleteAccountListener.addAction(new CloseContextualMenu());
	deleteAccountListener.addAction(new DeleteAccountAction());
	deleteAccountButton.setOnClickEvent(deleteAccountListener); //associo l'azione di eliminazione dell'account al relativo bottone

	frame.addWidget(userNameWidget); //aggiungo i vari widget al frame
	frame.addWidget(emailWidget);
	frame.addWidget(changePasswordButton);
	frame.addWidget(deleteAccountButton);
	frame.addWidget(exitButton);

	exitButton.setOnClickEvent(new CloseContextualMenu()); //imposto l'azione da eseguire al continuamento
	var positionX = (bound.getWidth() - frame.getWidth()) / 2; //posiziono il frame al centro della schermata
	var positionY = (bound.getHeight() - frame.getHeight()) / 2;

	frame.shiftPosition(new Point2D(positionX, positionY));

	frame.setIsShiftable(false); //imposto che il frame non possa essere traslato
	frame.setZIndex(1000);

	return frame;
};