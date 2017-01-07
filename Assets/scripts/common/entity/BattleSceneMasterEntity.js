#pragma strict

class BattleSceneMasterEntity {

	private var sceneId : String;
	private var enemyId : String;
	
	public function getSceneId() {
		return sceneId;
	}
	
	public function setSceneId(sceneId) {
		this.sceneId = sceneId;
	}
	
	public function getEnemyId() {
		return enemyId;
	}
	
	public function setEnemyId(enemyId) {
		this.enemyId = enemyId;
	}
}