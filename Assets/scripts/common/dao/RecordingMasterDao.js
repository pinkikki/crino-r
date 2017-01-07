#pragma strict

class RecordingMasterDao {

	public static function select() {
		var query : String = "select * from RecordingMaster;";
		var dataTable : DataTable = DbManager.select(query);
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);;
        }
	}
	
	public static function update(entity : RecordingMasterEntity) {
		var query : String = "update RecordingMaster set ";
		query += "scene_id = " + "'" + entity.getSceneId() + "'" + ",";
		query += "total_time_hour = " + entity.getTotalTimeHour() + ",";
		query += "total_time_minute = " + entity.getTotalTimeMinute() + ",";
		query += "total_time_second = " + entity.getTotalTimeSecond() + ";";
		Debug.Log(query);
		DbManager.update(query);
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : RecordingMasterEntity = new RecordingMasterEntity();
		var sceneId = dr["scene_id"];
		var totalTimeHour = dr["total_time_hour"];
		var totalTimeMinute = dr["total_time_minute"];
		var totalTimeSecond = dr["total_time_second"];
		
		if (sceneId != null) {
			entity.setSceneId(sceneId);
		}
		
		if (totalTimeHour != null) {
			entity.setTotalTimeHour(totalTimeHour);
		}
		
		if (totalTimeMinute != null) {
			entity.setTotalTimeMinute(totalTimeMinute);
		}
		
		if (totalTimeSecond != null) {
			entity.setTotalTimeSecond(totalTimeSecond);
		}
		
		return entity;
	}
}