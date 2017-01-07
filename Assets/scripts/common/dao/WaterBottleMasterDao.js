#pragma strict

class WaterBottleMasterDao {
	
	public static function select() {
		var query : String = "select * from WaterBottleMaster;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<WaterBottleMasterEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);;
        }
	}

	public static function selectByPk(waterBottleId : int) {
		var query : String = "select * from WaterBottleMaster where water_bottle_id = " + waterBottleId + ";";
		var dataTable : DataTable = DbManager.select(query);
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);
        }
	}

	public static function selectJoinExhaustionItemMaster() {
		var query : String = "select wbm.water_bottle_id, wbm.water_bottle_name, wbm.amount, wbm.hp from WaterBottleMaster wbm inner join ExhaustionItemMaster eim on wbm.water_bottle_id = eim.effect_id1 where eim.item_id = '1';";
		var dataTable : DataTable = DbManager.select(query);
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);
        }
	}
	
	public static function update(waterBottleId : int, amount : int) {
		var query : String = "update WaterBottleMaster set ";
		query += "amount = " + amount;
		query += " where water_bottle_id = " + waterBottleId + ";";
		Debug.Log(query);
		DbManager.update(query);
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : WaterBottleMasterEntity = new WaterBottleMasterEntity();
		var waterBottleId = dr["water_bottle_id"];
		var waterBottleName = dr["water_bottle_name"];
		var amount = dr["amount"];
		var hp = dr["hp"];
		
		if (waterBottleId != null) {
			entity.setWaterBottleId(waterBottleId);
		}
		
		if (waterBottleName != null) {
			entity.setWaterBottleName(waterBottleName);
		}
		
		if (amount != null) {
			entity.setAmount(amount);
		}
		
		if (hp != null) {
			entity.setHp(hp);
		}
		
		return entity;
	}
}