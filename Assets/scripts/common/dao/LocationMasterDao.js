#pragma strict

class LocationMasterDao {

	public static function selectBySceneId(sceneId) {
		var query : String = "select * from LocationMaster where scene_id = " + "'" + sceneId + "'" + " order by object_id asc";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<LocationMasterEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createEntity(dr));
        }
        
        return entityList;
	}
	
	public static function update(entity : LocationMasterEntity) {
		var query : String = "update LocationMaster set ";
		query += "scene_id = " + "'" + entity.getSceneId() + "'" + ",";
		query += "assert_bundle_id = " + "'" + entity.getAssertBundleId() + "'" + ",";
		query += "prefab_id = " + "'" + entity.getPrefabId() + "'" + ",";
		query += "object_id = " + "'" + entity.getObjectId() + "'" + ",";
		query += "coordinate_x = " + "'" + entity.getCoordinateX() + "'" + ",";
		query += "coordinate_y = " + "'" + entity.getCoordinateY() + "'" + ",";
		query += "direction = " + "'" + entity.getDirection() + "'" + " ";
		query += "where scene_id = " + "'" + entity.getSceneId() + "'" + " ";
		query += "and object_id = " + "'" + entity.getObjectId() + "'" + ";";
		Debug.Log(query);
		DbManager.update(query);
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : LocationMasterEntity = new LocationMasterEntity();
		var sceneId = dr["scene_id"];
		var assertBundleId = dr["assert_bundle_id"];
		var prefabId = dr["prefab_id"];
		var objectId = dr["object_id"];
		var coordinateX = dr["coordinate_x"];
		var coordinateY = dr["coordinate_y"];
		var direction = dr["direction"];
		
		if (sceneId != null) {
			entity.setSceneId(sceneId);
		}
		
		if (assertBundleId != null) {
			entity.setAssertBundleId(assertBundleId);
		}
		
		if (prefabId != null) {
			entity.setPrefabId(prefabId);
		}
		
		if (objectId != null) {
			entity.setObjectId(objectId);
		}
		
		if (coordinateX != null) {
			entity.setCoordinateX(coordinateX);
		}
		
		if (coordinateY != null) {
			entity.setCoordinateY(coordinateY);
		}
		
		if (direction != null) {
			entity.setDirection(direction);
		}
		
		return entity;
	}
}