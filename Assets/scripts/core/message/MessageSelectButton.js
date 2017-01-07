
private var selectMessageDialogObj : GameObject;

function Start () {
	selectMessageDialogObj = GameObject.Find("SelectMsgDialog");
}


function Update () {
}

function onAClick() {
	GameObject.Find("System").SendMessage("selectAButton");
	Destroy(selectMessageDialogObj);
}

function onBClick() {
	GameObject.Find("System").SendMessage("selectBButton");
	Destroy(selectMessageDialogObj);
}

function onCClick() {
	GameObject.Find("System").SendMessage("selectCButton");
	Destroy(selectMessageDialogObj);
}

function onDClick() {
	GameObject.Find("System").SendMessage("selectDButton");
	Destroy(selectMessageDialogObj);
}

function onEClick() {
	GameObject.Find("System").SendMessage("selectEButton");
	Destroy(selectMessageDialogObj);
}

