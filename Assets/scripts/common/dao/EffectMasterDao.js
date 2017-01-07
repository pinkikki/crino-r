#pragma strict

class EffectMasterDao {

	public static function selectAll() {
		var query : String = "select * from EffectMaster order by effect_id;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<EffectMasterEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectByPk(effectId : int) {
		var query : String = "select * from EffectMaster where effect_id = " + effectId + ";";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<EffectMasterEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);
        }
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : EffectMasterEntity = new EffectMasterEntity();
		var effectId = dr["effect_id"];
		var valueType = dr["value_type"];
		var rangeType = dr["range_type"];
		var min = dr["min"];
		var max = dr["max"];
		
		if (effectId != null) {
			entity.setEffectId(effectId);
		}
		
		if (valueType != null) {
			entity.setValueType(valueType);
		}
		
		if (rangeType != null) {
			entity.setRangeType(rangeType);
		}
		
		if (min != null) {
			entity.setMin(min);
		}
		
		if (max != null) {
			entity.setMax(max);
		}

		return entity;
	}
}