#pragma strict

class BattleSceneMasterDao {
	
	public static function selectBySceneId(sceneId : String) {
		var query : String = "select * from BattleSceneMaster where scene_id = " + "'" + sceneId + "'" + ";";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<BattleSceneMasterEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectJoinEntityMaster(sceneId : String) {
		var query : String = "select em.* from BattleSceneMaster bcm inner join EnemyMaster em on bcm.enemy_id = em.enemy_id where bcm.scene_id = " + "'" + sceneId + "'" + ";";
		Debug.Log(query);
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<EnemyMasterEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createEnemyMasterEntity(dr));
        }
        
        return entityList;
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : BattleSceneMasterEntity = new BattleSceneMasterEntity();
		var sceneId = dr["scene_id"];
		var enemyId = dr["enemy_id"];
		
		if (sceneId != null) {
			entity.setSceneId(sceneId);
		}
		
		if (enemyId != null) {
			entity.setEnemyId(enemyId);
		}
		
		return entity;
	}
	
	private static function createEnemyMasterEntity(dr : DataRow) {
        var entity : EnemyMasterEntity = new EnemyMasterEntity();
		var enemyId = dr["enemy_id"];
		var enemyName = dr["enemy_name"];
		var hp = dr["hp"];
		var mp = dr["mp"];
		var power = dr["power"];
		var defense = dr["defense"];
		var magic = dr["magic"];
		var speed = dr["speed"];
		var size = dr["size"];
		var assertBundleId = dr["assert_bundle_id"];
		
		if (enemyId != null) {
			entity.setEnemyId(enemyId);
		}
		
		if (enemyName != null) {
			entity.setEnemyName(enemyName);
		}
		
		if (hp != null) {
			entity.setHp(hp);
		}
		
		if (mp != null) {
			entity.setMp(mp);
		}
		
		if (power != null) {
			entity.setPower(power);
		}
		
		if (defense != null) {
			entity.setDefense(defense);
		}
		
		if (magic != null) {
			entity.setMagic(magic);
		}
		
		if (speed != null) {
			entity.setSpeed(speed);	
		}
		
		if (size != null) {
			entity.setSize(size);	
		}
		
		if (assertBundleId != null) {
			entity.setAssertBundleId(assertBundleId);
		}
		
		return entity;
	}
}