#pragma strict

class WaterBottleMasterEntity {

	private var waterBottleId : int;
	private var waterBottleName : String;
	private var amount : int;
	private var hp : int;

	public function getWaterBottleId() {
		return waterBottleId;
	}
	
	public function setWaterBottleId(waterBottleId) {
		this.waterBottleId = waterBottleId;
	}
	
	public function getWaterBottleName() {
		return waterBottleName;
	}
	
	public function setWaterBottleName(waterBottleName) {
		this.waterBottleName = waterBottleName;
	}
	
	public function getAmount() {
		return amount;
	}
	
	public function setAmount(amount) {
		this.amount = amount;
	}
	
	public function getHp() {
		return hp;
	}
	
	public function setHp(hp) {
		this.hp = hp;
	}

}