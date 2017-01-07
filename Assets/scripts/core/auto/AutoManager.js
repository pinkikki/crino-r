#pragma strict
var eventName : String;
private var emInstance : EventManager;

function Start () {
	if (eventName == null || eventName == "") {
		return;
	}
	emInstance = FindObjectOfType(EventManager);
	emInstance.eventList.Add(eventName);
}

function Update () {

}