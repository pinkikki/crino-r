#pragma strict

class EventMasterDao {

	public static function selectAll() {
		var query : String = "select * from EventMaster order by event_id asc";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<EventMasterEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectByPk(eventId : String, sceneId : String) {
		var query : String = "select * from EventMaster where event_id = " + "'" + eventId + "' and scene_id = " + "'" + sceneId + "'" + ";";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<EventMasterEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);;
        }
	}

	public static function selectByPkForComplete(eventId : String, sceneId : String) {
		var query : String = "select * from EventMaster where event_id = " + "'" + eventId + "' and scene_id = " + "'" + sceneId + "' and complete_flg = 1" + ";";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<EventMasterEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);
        }
	}

	public static function selectLatestEventIdBySceneId(sceneId : String) {
		var query : String = "select event_id, scene_id, complete_flg, min(sequence) as sequence from EventMaster where scene_id = " + "'" + sceneId + "' and complete_flg = 0" + ";";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<EventMasterEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);
        }
	}
	
	public static function update(entity : EventMasterEntity) {
		var query : String = "update EventMaster set ";
		query += "complete_flg = " + "'" + entity.getCompleteFlg() + "'" + " ";
		query += "where event_id = " + "'" + entity.getEventId() + "'" + " ";
		query += "and scene_id = " + "'" + entity.getSceneId() + "'" + ";";
		Debug.Log(query);
		DbManager.update(query);
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : EventMasterEntity = new EventMasterEntity();
		var eventId = dr["event_id"];
		var sceneId = dr["scene_id"];
		var completeFlg = dr["complete_flg"];
		var sequence = dr["sequence"];
		
		if (eventId != null) {
			entity.setEventId(eventId);
		}
		
		if (sceneId != null) {
			entity.setSceneId(sceneId);
		}
		
		if (completeFlg != null) {
			entity.setCompleteFlg(completeFlg);
		}

		if (sequence != null) {
			entity.setSequence(sequence);
		}
		
		return entity;
	}
}