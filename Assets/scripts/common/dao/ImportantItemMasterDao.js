#pragma strict

class ImportantItemMasterDao {

	public static function selectAll() {
		var query : String = "select * from ImportantItemMaster order by item_id;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<ImportantItemMasterEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectByPk(itemId : int) {
		var query : String = "select * from ImportantItemMaster where item_id = " + itemId + ";";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<ImportantItemMasterEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);
        }
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : ImportantItemMasterEntity = new ImportantItemMasterEntity();
		var itemId = dr["item_id"];
		var effectType1 = dr["effect_type1"];
		var effectId1 = dr["effect_id1"];
		
		if (itemId != null) {
			entity.setItemId(itemId);
		}
		
		if (effectType1 != null) {
			entity.setEffectType1(effectType1);
		}
		
		if (effectId1 != null) {
			entity.setEffectId1(effectId1);
		}		
		return entity;
	}
}