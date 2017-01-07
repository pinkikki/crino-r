
var bmController : BattleMenuController;

function Start () {
	bmController = FindObjectOfType(BattleMenuController);
}

function Update () {
}

function onEnemyClick() {
	bmController.setSelectEnemyId(this.gameObject.name);
}