#pragma strict

public var fileList : List.<String>;
private var residentsDct : Dictionary.<String, int[]> = new Dictionary.<String, int[]>();
private var eventMode : rm_mode;
private enum rm_mode {
	LOADING,
	EXECUTE_EVENT,
	WAIT_EVENT
}

function Start () {
	eventMode = rm_mode.LOADING;
	loadFile();
}

function Update () {

}

function loadFile() {

	var lines : String[];
 	for(var i = 0; i < fileList.Count; i++) {
	 	if (Application.isWebPlayer) {
	 		var www = new WWW(fileList[0]);
	 		
	 		yield www;
	 		
	 		lines = www.text.Split("\r"[0], "\n"[0]);
	 		
	 	} else {
	 		lines = File.ReadAllLines(fileList[0]);
	 	}
	 	
	 	for(var j = 0; j < lines.Length; j++) {
	 		var parts = lines[j].Split(";"[0]);
	 		if(parts != null && parts.Length == 5) {
	 			var ranges = new int[4];
	 			for(var k = 1; k < parts.Length; k++) {
	 				ranges[k - 1] = int.Parse(parts[k]);
	 			}
	 			residentsDct[parts[0]] = ranges;
	 		}
	 	}
 	}
	eventMode = rm_mode.EXECUTE_EVENT;
}

public function pause() {
	eventMode = rm_mode.WAIT_EVENT;
}

public function checkExecuteEvent() {
	if(eventMode == rm_mode.EXECUTE_EVENT) {
		return true;
	} else {
		return false;
	}
}

public function getResidentsDct() {
	return residentsDct;
}