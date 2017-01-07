#pragma strict

class SceneMasterDao {

	public static function selectAll() {
		var query : String = "select * from SceneMaster order by scene_id;";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<SceneMasterEntity>();
		
		for(var dr : DataRow in dataTable.Rows){
			entityList.Add(createEntity(dr));
        }
        
        return entityList;
	}
	
	public static function selectByPk(sceneId : String) {
		var query : String = "select * from SceneMaster where scene_id = " + "'" + sceneId + "'" + ";";
		var dataTable : DataTable = DbManager.select(query);
		var entityList = new List.<SceneMasterEntity>();
		
		if (dataTable.Rows.Count == 0) {
			return null;
		}
		
		for(var dr : DataRow in dataTable.Rows){
			return createEntity(dr);
        }
	}
	
	private static function createEntity(dr : DataRow) {
        var entity : SceneMasterEntity = new SceneMasterEntity();
		var sceneId = dr["scene_id"];
		var sceneName = dr["scene_name"];
		
		if (sceneId != null) {
			entity.setSceneId(sceneId);
		}
		
		if (sceneName != null) {
			entity.setSceneName(sceneName);
		}
		
		return entity;
	}
}