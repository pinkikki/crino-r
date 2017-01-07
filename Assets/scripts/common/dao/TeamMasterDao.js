#pragma strict

class TeamMasterDao {
	
	public static function select() {
		var query : String = "select * from TeamMaster;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<TeamMasterEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);
        }
	}
	
	public static function update(entity : TeamMasterEntity) {
		var query : String = "update TeamMaster set ";
		query += "character_id1 = " + entity.getCharacterId1() + ",";
		query += "character_id2 = " + entity.getCharacterId2() + ",";
		query += "character_id3 = " + entity.getCharacterId3() + ",";
		query += "character_id4 = " + entity.getCharacterId4() + ",";
		query += "money = " + entity.getMoney() + ";";
		DbManager.update(query);
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : TeamMasterEntity = new TeamMasterEntity();
		var characterId1 = dr["character_id1"];
		var characterId2 = dr["character_id2"];
		var characterId3 = dr["character_id3"];
		var characterId4 = dr["character_id4"];
		var money = dr["money"];
		
		if (characterId1 != null) {
			entity.setCharacterId1(characterId1);
		}
		
		if (characterId2 != null) {
			entity.setCharacterId2(characterId2);
		}
		
		if (characterId3 != null) {
			entity.setCharacterId3(characterId3);
		}
		
		if (characterId4 != null) {
			entity.setCharacterId4(characterId4);
		}
		
		if (money != null) {
			entity.setMoney(money);
		}
		
		return entity;
	}
}