
function Start () {

}

function Update () {
}

function onClick(target : String) {
	var nameDialogObj : GameObject = GameObject.Find("NameDialog");
	var inputText : Text = nameDialogObj.transform.FindChild("Body/InputField/Text").GetComponent(Text);
	var nameStr : String = inputText.text;

	if (nameStr == null) {
		return;
	}

	nameStr = nameStr.Trim();

	if (nameStr.Length == 0) {
		return;
	}

	var instance : NamingManager = NamingManager.getInstance();
	instance.updateName(target, nameStr);
	GameObject.Find("System").SendMessage("decideName");
	Destroy(nameDialogObj);
}

