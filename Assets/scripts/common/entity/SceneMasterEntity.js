#pragma strict

class SceneMasterEntity {

	private var sceneId : String;
	private var sceneName : String;
	
	public function getSceneId() {
		return sceneId;
	}
	
	public function setSceneId(sceneId) {
		this.sceneId = sceneId;
	}
	
	public function getSceneName() {
		return sceneName;
	}
	
	public function setSceneName(sceneName) {
		this.sceneName = sceneName;
	}
}