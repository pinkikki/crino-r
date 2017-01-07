#pragma strict

class SaveUtil {

	private static var startTime : float;
	
	public static function start() {
		startTime = Time.time;
	}

	public static function save() {
		var elapsedTime : float = Time.time - startTime;
		var savedEntity : RecordingMasterEntity = RecordingMasterDao.select();
		var entity : RecordingMasterEntity = new RecordingMasterEntity();
		entity.setSceneId(Application.loadedLevelName);
		var totalTime : int = (savedEntity.getTotalTimeHour() * 3600) + (savedEntity.getTotalTimeMinute() * 60) + savedEntity.getTotalTimeSecond();
		totalTime = totalTime + elapsedTime;
		var hour : int = totalTime / 3600;
		var minute : int = (totalTime - (hour * 3600)) / 60;
		var second : int = (totalTime - (hour * 3600) - (minute * 60));
		entity.setTotalTimeHour(hour);
		entity.setTotalTimeMinute(minute);
		entity.setTotalTimeSecond(second);
		RecordingMasterDao.update(entity);
		saveLocation();
		start();
	}
	
	private static function saveLocation() {
		var entityList : List.<LocationMasterEntity> = LocationMasterDao.selectBySceneId(Application.loadedLevelName);
		for (var entity : LocationMasterEntity in entityList) {
			var go : GameObject = GameObject.Find(entity.getObjectId());
			var direction : int = 0;
			var anim : Animator = go.GetComponent(Animator);
			var currentState = anim.GetCurrentAnimatorStateInfo(0);
			if(currentState.IsName("Base Layer.front_wait")) {
				direction = 0;
			} else if(currentState.IsName("Base Layer.front")) {
				direction = 0;
			} else if(currentState.IsName("Base Layer.back_wait")) {
				direction = 1;
			} else if(currentState.IsName("Base Layer.back")) {
				direction = 1;
			} else if(currentState.IsName("Base Layer.left_wait")) {
				direction = 2;
			} else if(currentState.IsName("Base Layer.left")) {
				direction = 2;
			} else if(currentState.IsName("Base Layer.right_wait")) {
				direction = 3;
			} else if(currentState.IsName("Base Layer.right")) {
				direction = 3;
			}
			Debug.Log(go.transform.position.x);
			Debug.Log(go.transform.position.y);
			Debug.Log(direction);
			entity.setCoordinateX(go.transform.position.x);
			entity.setCoordinateY(go.transform.position.y);
			entity.setDirection(direction);
			LocationMasterDao.update(entity);
		}
		Debug.Log(GameObject.Find("tsuyoshi1").gameObject.name);
	}
}