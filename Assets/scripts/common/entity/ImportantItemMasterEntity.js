#pragma strict

class ImportantItemMasterEntity {

	private var itemId : int;
	private var effectType1 : int;
	private var effectId1 : int;

	public function getItemId() {
		return itemId;
	}
	
	public function setItemId(itemId) {
		this.itemId = itemId;
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
}