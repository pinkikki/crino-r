#pragma strict

class RecordingMasterEntity {

	private var sceneId : String;
	private var totalTimeHour : int;
	private var totalTimeMinute : int;
	private var totalTimeSecond : int;
	
	public function getSceneId() {
		return sceneId;
	}
	
	public function setSceneId(sceneId) {
		this.sceneId = sceneId;
	}
	
	public function getTotalTimeHour() {
		return totalTimeHour;
	}
	
	public function setTotalTimeHour(totalTimeHour) {
		this.totalTimeHour = totalTimeHour;
	}
	
	public function getTotalTimeMinute() {
		return totalTimeMinute;
	}
	
	public function setTotalTimeMinute(totalTimeMinute) {
		this.totalTimeMinute = totalTimeMinute;
	}
	
	public function getTotalTimeSecond() {
		return totalTimeSecond;
	}
	
	public function setTotalTimeSecond(totalTimeSecond) {
		this.totalTimeSecond = totalTimeSecond;
	}
}