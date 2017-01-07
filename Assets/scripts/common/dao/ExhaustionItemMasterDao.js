#pragma strict

class ExhaustionItemMasterDao {

	public static function selectAll() {
		var query : String = "select * from ExhaustionItemMaster order by item_id;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<ExhaustionItemMasterEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectByPk(itemId : int) {
		var query : String = "select * from ExhaustionItemMaster where item_id = " + itemId + ";";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<ExhaustionItemMasterEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);
        }
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : ExhaustionItemMasterEntity = new ExhaustionItemMasterEntity();
		var itemId = dr["item_id"];
		var effectTarget = dr["effect_target"];
		var effectType1 = dr["effect_type1"];
		var effectId1 = dr["effect_id1"];
		var effectType2 = dr["effect_type2"];
		var effectId2= dr["effect_id2"];
		var effectType3 = dr["effect_type3"];
		var effectId3 = dr["effect_id3"];
		var money = dr["money"];
		
		if (itemId != null) {
			entity.setItemId(itemId);
		}
		
		if (effectTarget != null) {
			entity.setEffectTarget(effectTarget);
		}
		
		if (effectType1 != null) {
			entity.setEffectType1(effectType1);
		}
		
		if (effectId1 != null) {
			entity.setEffectId1(effectId1);
		}
		
		if (effectType2 != null) {
			entity.setEffectType2(effectType2);
		}
		
		if (effectId2 != null) {
			entity.setEffectId2(effectId2);
		}
		
		if (effectType3 != null) {
			entity.setEffectType3(effectType3);
		}
		
		if (effectId3 != null) {
			entity.setEffectId3(effectId3);
		}
		
		if (money != null) {
			entity.setMoney(money);
		}
		return entity;
	}
}