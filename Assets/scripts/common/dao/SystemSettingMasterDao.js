#pragma strict

class SystemSettingMasterDao {

	public static function select() {
		var query : String = "select * from SystemSettingMaster;";
		var dataTable : DataTable = DbManager.select(query);
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);;
        }
	}
	
	public static function update(entity : SystemSettingMasterEntity) {
		var query : String = "update SystemSettingMaster set ";
		query += "watch_flg = " + "'" + entity.getWatchFlg() + "'" + ",";
		query += "battery_flg = " + "'" + entity.getBatteryFlg() + "'" + ",";
		query += "sound_flg = " + "'" + entity.getSoundFlg() + "'" + ";";
		Debug.Log(query);
		DbManager.update(query);
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : SystemSettingMasterEntity = new SystemSettingMasterEntity();
		var watchFlg = dr["watch_flg"];
		var batteryFlg = dr["battery_flg"];
		var soundFlg = dr["sound_flg"];
		
		if (watchFlg != null) {
			if (watchFlg == "True") {
				entity.setWatchFlg(true);
			} else {
				entity.setWatchFlg(false);
			}
		}
		
		if (batteryFlg != null) {
			if (batteryFlg == "True") {
				entity.setBatteryFlg(true);
			} else {
				entity.setBatteryFlg(false);
			}
		}
		
		if (soundFlg != null) {
			if (soundFlg == "True") {
				entity.setSoundFlg(true);
			} else {
				entity.setSoundFlg(false);
			}
		}
		
		return entity;
	}
}