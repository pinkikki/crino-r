#pragma strict

class EventMasterEntity {

	private var eventId : String;
	private var sceneId : String;
	private var completeFlg : int;
	private var sequence : int;
	
	public function getEventId() {
		return eventId;
	}
	
	public function setEventId(eventId) {
		this.eventId = eventId;
	}
	
	public function getSceneId() {
		return sceneId;
	}
	
	public function setSceneId(sceneId) {
		this.sceneId = sceneId;
	}
	
	public function getCompleteFlg() {
		return completeFlg;
	}
	
	public function setCompleteFlg(completeFlg) {
		this.completeFlg = completeFlg;
	}

	public function getSequence() {
		return sequence;
	}
	
	public function setSequence(sequence) {
		this.sequence = sequence;
	}
}