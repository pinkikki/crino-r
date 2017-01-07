#pragma strict

class BltItmEntity {

	private var itemId : int;
	private var itemType : int;
	private var number : int;
	private var itemName : String;
	private var description : String;

	public function getItemId() {
		return itemId;
	}
	
	public function setItemId(itemId) {
		this.itemId = itemId;
	}
	
	public function getItemType() {
		return itemType;
	}
	
	public function setItemType(itemType) {
		this.itemType = itemType;
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
	
}