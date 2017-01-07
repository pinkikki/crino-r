#pragma strict
import System.Collections.Generic;

class EventTask {

	public var eventName : String;
	public var eventParts : List.<String> = new List.<String>();
	public var stopFlg = false;
	public var taskEndFlg = false;;
	public var sleepTime : float = 0.0f;
	private var mmInstance : MessageManager;
	private var amInstance : AudioManager;
	private var nmInstance : NamingManager;

	public var currentIndex : int = 0;
	
	function EventTask(name, mmObj, amObj, nmObj) {
		eventName = name;
		mmInstance = mmObj;
		amInstance = amObj;
		nmInstance = nmObj;
	}
	
	function addPart(part) {
		eventParts.Add(part);
	}
	
	function execute() {
		
		for(var i = currentIndex; i < eventParts.Count; i++) {
		
			if(stopFlg) {
				break;
			}
			var tasks = parse(eventParts[i]);
			
			if(tasks != null) {
				switch(tasks[0]) {
					case "bgm" :
						if(tasks[1] == "start") {
							if (tasks.Length == 3) {
								amInstance.playBgm(tasks[2]);
							} else if (tasks.Length == 4) {
								amInstance.playBgm(tasks[2], float.Parse(tasks[3]));
							}
							
						} else {
							amInstance.stopBgm();
						}
						break;
						
					case "se" :
						amInstance.playSe(tasks[1]);
						break;
					
					case "msg" :
						if(tasks[1] == "del") {
							mmInstance.hide();
						} else {
							stopFlg = true;
							var nextTasks = parse(eventParts[currentIndex + 1]);
							var lastMsgFlg = false;
							if(nextTasks[1] == "del") {
								lastMsgFlg = true;
							}
							mmInstance.changeMessage(nmInstance.convert(tasks[1]), editMessage(tasks), lastMsgFlg, false);
						}
						break;
						
					case "msg_auto" :
						mmInstance.changeMessage(nmInstance.convert(tasks[1]), editMessage(tasks), true, true);
						break;

					case "msg_select" :
						stopFlg = true;
						mmInstance.createSelectMessageDialog(tasks);
						break;
						
					case "action" :
						stopFlg = true;
						mmInstance.gameObject.SendMessage(tasks[0] + tasks[1]);
						break;
						
					case "sleep" :
						stopFlg = true;
						sleepTime = float.Parse(tasks[1]);
						break;
						
					case "END" :
						currentIndex = 0;
						taskEndFlg = true;
						
				}
			}
			
			currentIndex++;
		}
	}
	
	private function parse(part : String) {
		return part.Split(";"[0]);
	}
	
	private function editMessage(tasks : String[]) {
		var message : String = nmInstance.convert(tasks[2]);
		if (tasks.Length == 4) {
			message += "\n" + nmInstance.convert(tasks[3]);
		} else  if (tasks.Length == 5) {
			message += "\n" + nmInstance.convert(tasks[3]);
			message += "\n" + nmInstance.convert(tasks[4]);
		}
		
		return message;
	}
}
