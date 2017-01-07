#pragma strict

class EnemyMasterDao {
	
	public static function selectByPk(enemyId : int) {
		var query : String = "select * from EnemyMaster where enemy_id = " + "'" + enemyId + "'" + ";";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<EnemyMasterEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);;
        }
	}
	
	private static function createEntity(dr : DataRow) {
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