#pragma strict

class ExhaustionItemMasterEntity {

	private var itemId : int;
	private var effectTarget : int;
	private var effectType1 : int;
	private var effectId1 : int;
	private var effectType2 : int;
	private var effectId2 : int;
	private var effectType3 : int;
	private var effectId3 : int;
	private var money : int;

	public function getItemId() {
		return itemId;
	}
	
	public function setItemId(itemId) {
		this.itemId = itemId;
	}
	
	public function getEffectTarget() {
		return effectTarget;
	}
	
	public function setEffectTarget(effectTarget) {
		this.effectTarget = effectTarget;
	}
	
	public function getEffectType1() {
		return effectType1;
	}
	
	public function setEffectType1(effectType1) {
		this.effectType1 = effectType1;
	}
	
	public function getEffectId1() {
		return effectId1;
	}
	
	public function setEffectId1(effectId1) {
		this.effectId1 = effectId1;
	}

	public function getEffectType2() {
		return effectType2;
	}
	
	public function setEffectType2(effectType2) {
		this.effectType2 = effectType2;
	}
	
	public function getEffectId2() {
		return effectId2;
	}
	
	public function setEffectId2(effectId2) {
		this.effectId2 = effectId2;
	}

	public function getEffectType3() {
		return effectType3;
	}
	
	public function setEffectType3(effectType3) {
		this.effectType3 = effectType3;
	}
	
	public function getEffectId3() {
		return effectId3;
	}
	
	public function setEffectId3(effectId3) {
		this.effectId3 = effectId3;
	}

	public function getMoney() {
		return money;
	}
	
	public function setMoney(money) {
		this.money = money;
	}
}