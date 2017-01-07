
private var itemId : int;
private var number : int;
private var itemName : String;
private var description : String;
private var descriptionText : Text;

function Start () {
}

function Update () {
}

public function setDescriptionText(descriptionText : Text) {
	this.descriptionText = descriptionText;
}

public function getItemId() {
	return itemId;
}

public function setItemId(itemId) {
	this.itemId = itemId;
}

public function getNumber() {
	return number;
}

public function setNumber(number) {
	this.number = number;
}

public function getItemName() {
	return itemName;
}

public function setItemName(itemName) {
	this.itemName = itemName;
}

public function getDescription() {
	return description;
}

public function setDescription(description) {
	this.description = description;
}

public function onClick() {
	descriptionText.text = description;
}