#pragma strict
import System.IO;
import System.Collections.Generic;

public var fileList : List.<String>;
public var eventList : List.<String> = new List.<String>();
private var mmInstance : MessageManager;
private var amInstance : AudioManager;
private var nmInstance : NamingManager;
private var ciInstance : CharactersInitializer;
private var oiInstance : OtherInitializer;
private var eventDct : Dictionary.<String, EventTask> = new Dictionary.<String, EventTask>();
private var currentEvent;
private var eventMode : mode;
private enum mode {
	LOADING,
	WAIT_TRIGGER,
	EXECUTE_EVENT,
	WAIT_EVENT,
	END
}
private var time : float;
private static final var PREFIX : String = "/event/";

function Start () {
	eventMode = mode.LOADING;
	mmInstance = FindObjectOfType(MessageManager);
	amInstance = FindObjectOfType(AudioManager);
	nmInstance = NamingManager.getInstance();
	ciInstance = FindObjectOfType(CharactersInitializer);
	oiInstance = FindObjectOfType(OtherInitializer);
	loadFile();
}

function Update () {

	if(mode.LOADING == eventMode) {
		return;
	} else if(mode.WAIT_TRIGGER == eventMode) {
		if ((amInstance == null || amInstance.isLoadComplete()) &&
				(ciInstance == null || ciInstance.isLoadComplete()) &&
				(oiInstance == null || oiInstance.isLoadComplete())) {
			if(eventList.Count > 0) {
				eventMode = mode.EXECUTE_EVENT;
				currentEvent = eventList[0];
			}
		}
		
	} else if(mode.EXECUTE_EVENT == eventMode) {
		execute();
		eventMode = mode.WAIT_EVENT;
		
	} else if(mode.WAIT_EVENT == eventMode) {
		if(eventDct[currentEvent].taskEndFlg) {
			currentEvent = null;
			eventList.RemoveAt(0);
			eventMode = mode.WAIT_TRIGGER;
		} else if(!eventDct[currentEvent].stopFlg) {
			eventMode = mode.EXECUTE_EVENT;
		}
	} else {
		return;
	}
}

function FixedUpdate() {
	if(mode.WAIT_EVENT == eventMode) {
		if(eventDct[currentEvent].stopFlg) {
			var sleepTime : float = eventDct[currentEvent].sleepTime;
			if (0.0f < sleepTime) {
				time += Time.deltaTime;
				if (eventDct[currentEvent].sleepTime < time) {
					time = 0.0f;
					eventDct[currentEvent].sleepTime = 0.0f;
					eventDct[currentEvent].stopFlg = false;
				}
			}
		}
	}
}

 function loadFile() {
 	for(var i = 0; i < fileList.Count; i++) {
 		var lines : String[];
 		var filePath = "file://" + Path.Combine(Application.streamingAssetsPath + PREFIX, fileList[i]);
// 		var filePath = "http://pinkikki.jp/crino-r" + PREFIX + fileList[i];
	 	if (filePath.Contains("://")) {
	 		var www = new WWW(filePath);
	 		
	 		yield www;
	 		if(www.error != null) {
				throw System.Exception("通信障害が発生しました");
			}
	 		
	 		lines = www.text.Split("\r"[0], "\n"[0]);
	 		
	 	} else {
	 		lines = File.ReadAllLines(filePath);
	 	}

	 	www.Dispose();

		var vo : EventTask = null;
		for(var j = 0; j < lines.length; j++) {
			if(lines[j].StartsWith("[") && lines[j].EndsWith("]")) {
				vo = new EventTask(lines[j], mmInstance, amInstance, nmInstance);
				eventDct[lines[j]] = vo;
			} else {
				vo.addPart(nmInstance.convert(lines[j]));
			}
		}
 	}
	eventMode = mode.WAIT_TRIGGER;
 }
 
 function execute() {
 	eventDct[currentEvent].execute();
 }
 
 function nextTask() {
 	eventDct[currentEvent].stopFlg = false;
 }

 function skipEvent(skipNum : int) {
 	eventDct[currentEvent].currentIndex += skipNum;
 }