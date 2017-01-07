private var entity : BltItmEntity;
private var controller : BattleMenuController;

function Start () {
}

function Update () {
}

public function getEntity() {
	return entity;
}

public function setEntity(entity) {
	this.entity = entity;
}

public function getController() {
	return controller;
}

public function setController(controller) {
	this.controller = controller;
}

public function onClick() {
	
	controller.gameObject.SendMessage("selectItem", this);
}