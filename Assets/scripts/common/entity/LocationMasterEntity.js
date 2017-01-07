#pragma strict

class LocationMasterEntity {

	private var sceneId : String;
	private var assertBundleId : String;
	private var prefabId : String;
	private var objectId : String;
	private var coordinateX : float;
	private var coordinateY : float;
	private var direction : int;
	
	public function getSceneId() {
		return sceneId;
	}
	
	public function setSceneId(sceneId) {
		this.sceneId = sceneId;
	}
	
	public function getAssertBundleId() {
		return assertBundleId;
	}
	
	public function setAssertBundleId(assertBundleId) {
		this.assertBundleId = assertBundleId;
	}
	
	public function getPrefabId() {
		return prefabId;
	}
	
	public function setPrefabId(prefabId) {
		this.prefabId = prefabId;
	}
	
	public function getObjectId() {
		return objectId;
	}
	
	public function setObjectId(objectId) {
		this.objectId = objectId;
	}
	
	public function getCoordinateX() {
		return coordinateX;
	}
	
	public function setCoordinateX(coordinateX) {
		this.coordinateX = coordinateX;
	}
	
	public function getCoordinateY() {
		return coordinateY;
	}
	
	public function setCoordinateY(coordinateY) {
		this.coordinateY = coordinateY;
	}
	
	public function getDirection() {
		return direction;
	}
	
	public function setDirection(direction) {
		this.direction = direction;
	}
}