#pragma strict

class BelongingsTransactionEntity {

	private var itemId : int;
	private var number : int;

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

}