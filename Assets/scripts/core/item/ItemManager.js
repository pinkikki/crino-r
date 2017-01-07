
public var sceneId : String;
private var itemDct : Dictionary.<String, int> = new Dictionary.<String, int>();

function Start () {
	var entityList : List.<SceneItemStatusMasterEntity> = SceneItemStatusMasterDao.selectBySceneId(sceneId);
	for (var entity : SceneItemStatusMasterEntity in entityList) {
		itemDct[entity.getObjectId()] = entity.getItemId();
	}
}

function Update () {
}

public function getItemId(objectId : String) {
	if (itemDct.ContainsKey(objectId)) {
		var itemId : int = itemDct[objectId];
		return itemId;
	}
	return 0;
}

public function remove(objectId : String) {
	if (itemDct.ContainsKey(objectId)) {
		itemDct.Remove(objectId);
		SceneItemStatusMasterDao.update(sceneId, objectId);
	}
}



