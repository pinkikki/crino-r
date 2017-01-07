#pragma strict

class SceneItemStatusMasterEntity {

	private var sceneId : String;
	private var objectId : String;
	private var itemId : int;
	private var acquiredFlg : boolean;
	
	public function getSceneId() {
		return sceneId;
	}
	
	public function setSceneId(sceneId) {
		this.sceneId = sceneId;
	}
	
	public function getObjectId() {
		return objectId;
	}
	
	public function setObjectId(objectId) {
		this.objectId = objectId;
	}
	
	public function getItemId() {
		return itemId;
	}
	
	public function setItemId(itemId) {
		this.itemId = itemId;
	}

	public function getAcquiredFlg() {
		return acquiredFlg;
	}
	
	public function setAcquiredFlg(acquiredFlg) {
		this.acquiredFlg = acquiredFlg;
	}
}