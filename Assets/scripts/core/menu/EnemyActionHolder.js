#pragma strict

class EnemyActionHolder {
	
	private var type : BattleActionType;
	private var enemyMasterEntity : EnemyMasterEntity;
	private var obj : GameObject;
	private var aliveFlg : boolean;
	
	public function getType() {
		return type;
	}

	public function setType(type) {
		this.type = type;
	}
	
	public function getEnemyMasterEntity() {
		return enemyMasterEntity;
	}

	public function setEnemyMasterEntity(enemyMasterEntity) {
		this.enemyMasterEntity = enemyMasterEntity;
	}
	
	public function getObj() {
		return obj;
	}

	public function setObj(obj) {
		this.obj = obj;
	}
	
	public function isAlive() {
		return aliveFlg;
	}
	
	public function setAlive(aliveFlg) {
		this.aliveFlg = aliveFlg;
	}
}