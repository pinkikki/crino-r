#pragma strict
private var emInstance : EventManager;
private var mmInstance : MessageManager;

	function Start() {
		emInstance = FindObjectOfType(EventManager);
		mmInstance = FindObjectOfType(MessageManager);
	}
	
	function onClick() {
		if (!mmInstance.getManualFlg()) {
			if (!mmInstance.getAutoFlg()) {
				emInstance.nextTask();	
			}
		} else {
			mmInstance.hide();
			FieldMenuManager.getInstance().SetActive(true);
		}
	}