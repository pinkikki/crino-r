#pragma strict

private var type : BattleActionType;
private var characterMasterEntity : CharacterMasterEntity;
private var obj : GameObject;
private var statusObj : GameObject;
private var statusObjName : String;
private var anim : Animator;
// 回復させるキャラクターのListのインデックス
private var characterNum : int;
private var enemyId : String;
private var aliveFlg : boolean;
private var skillHolder : BattleSkillHolder;
private var itemHolder : BattleItemHolder;
private var waterScale : int;
private var button : Button;

function Start () {
}

function Update () {
}

public function getType() {
	return type;
}

public function setType(type) {
	this.type = type;
}

public function getCharacterMasterEntity() {
	return characterMasterEntity;
}

public function setCharacterMasterEntity(characterMasterEntity) {
	this.characterMasterEntity = characterMasterEntity;
}

public function getObj() {
	return obj;
}

public function setObj(obj) {
	this.obj = obj;
}

public function getStatusObj() {
	return statusObj;
}

public function setStatusObj(statusObj) {
	this.statusObj = statusObj;
}

public function getAnim() {
	return anim;
}

public function setAnim(anim) {
	this.anim = anim;
}

public function getCharacterNum() {
	return characterNum;
}

public function setCharacterNum(characterNum) {
	this.characterNum = characterNum;
}

public function getEnemyId() {
	return enemyId;
}

public function setEnemyId(enemyId) {
	this.enemyId = enemyId;
}

public function isAlive() {
	return aliveFlg;
}

public function setAlive(aliveFlg) {
	this.aliveFlg = aliveFlg;
}

public function getSkillHolder() {
	return skillHolder;
}

public function setSkillHolder(skillHolder) {
	this.skillHolder = skillHolder;
}

public function getItemHolder() {
	return itemHolder;
}

public function setItemHolder(itemHolder) {
	this.itemHolder = itemHolder;
}

public function getWaterScale() {
	return waterScale;
}

public function setWaterScale(waterScale) {
	this.waterScale = waterScale;
}

public function clickCharacter() {
	if (button == null) {
		button = this.gameObject.GetComponent(Button);;
	}
//	button.colors.pressedColor = Color.red;
	// TODO 選択したキャラクタをBattleMenuContorollerに渡す
}