#pragma strict

class SceneItemStatusMasterDao {

	public static function selectBySceneId(sceneId : String) {
		var query : String = "select * from SceneItemStatusMaster where scene_id = " + "'" + sceneId + "'" + " and acquired_flg != 1;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<SceneItemStatusMasterEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createEntity(dr));
        }
        
        return entityList;
	}
	
	public static function update(entity : SceneItemStatusMasterEntity) {
		var query : String = "update SceneItemStatusMaster set ";
		query += "item_id = " + "'" + entity.getItemId() + "'" + ",";
		query += "acquired_flg = " + "'" + entity.getAcquiredFlg() + "'" + " ";
		query += "where scene_id = " + "'" + entity.getSceneId() + "'" + " ";
		query += "and object_id = " + "'" + entity.getObjectId() + "'" + ";";
		DbManager.update(query);
	}

	public static function update(sceneId : String, objectId : String) {
		var query : String = "update SceneItemStatusMaster set ";
		query += "acquired_flg = 1 ";
		query += "where scene_id = " + "'" + sceneId + "'" + " ";
		query += "and object_id = " + "'" + objectId + "'" + ";";
		DbManager.update(query);
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : SceneItemStatusMasterEntity = new SceneItemStatusMasterEntity();
		var sceneId = dr["scene_id"];
		var objectId = dr["object_id"];
		var itemId = dr["item_id"];
		var acquiredFlg = dr["acquired_flg"];
		
		if (sceneId != null) {
			entity.setSceneId(sceneId);
		}
		
		if (objectId != null) {
			entity.setObjectId(objectId);
		}
		
		if (itemId != null) {
			entity.setItemId(itemId);
		}

		if (acquiredFlg != null) {
			entity.setAcquiredFlg(acquiredFlg);
		}
		
		return entity;
	}
}