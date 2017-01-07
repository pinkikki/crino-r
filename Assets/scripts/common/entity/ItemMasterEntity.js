#pragma strict

class ItemMasterEntity {

	private var itemId : int;
	private var itemName : String;
	private var itemType : int;
	private var description : String;

	public function getItemId() {
		return itemId;
	}
	
	public function setItemId(itemId) {
		this.itemId = itemId;
	}
	
	public function getItemName() {
		return itemName;
	}
	
	public function setItemName(itemName) {
		this.itemName = itemName;
	}
	
	public function getItemType() {
		return itemType;
	}
	
	public function setItemType(itemType) {
		this.itemType = itemType;
	}
	
	public function getDescription() {
		return description;
	}
	
	public function setDescription(description) {
		this.description = description;
	}

}