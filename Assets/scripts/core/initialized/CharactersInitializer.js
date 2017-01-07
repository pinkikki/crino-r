#pragma strict

public var fileName : String;
public var cameraTarget : String;
public var selectFileFlg : boolean = false;
private var labInstance : LoadAssetBandles;
private var loadStatus : LoadStatus = LoadStatus.LOAD_WAIT;
private static final var PREFIX : String = "/character/";

function Start () {
	labInstance = LoadAssetBandles.getInstance();
	load();
}

function Update () {

}

function load() {
	loadStatus = LoadStatus.LOAD_EXECUTE;
	if (!selectFileFlg && (fileName == null || fileName == "")) {
		loadStatus = LoadStatus.LOAD_COMPLETE;
		return;
	}

	while (fileName == null || fileName == "") {
		if (!selectFileFlg) {
			selectFileFlg = true;
			loadStatus = LoadStatus.LOAD_COMPLETE;
			return;
		}
		yield null;
	}

 	var lines : String[];
	var filePath = "file://" + Path.Combine(Application.streamingAssetsPath + PREFIX, fileName);
// 	var filePath = "http://pinkikki.jp/crino-r" + PREFIX + fileName;
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
	
	for(var j = 0; j < lines.length; j++) {
		var loadInfoDto = new LoadInfoDto();
		var infos = parse(lines[j]);
		var prefab = labInstance.loadPrefab(infos[0], infos[1]);
		var obj : GameObject = Instantiate(prefab, Vector2 (float.Parse(infos[3]), float.Parse(infos[4])), Quaternion.identity);
		obj.name = infos[2];
		if (cameraTarget == infos[1]) {
			FindObjectOfType(ScaleCamera).setTarget(obj);
		}
		
		var directionNum = int.Parse(infos[6]);
		// アニメーションが付与されている場合
		if (directionNum < 4) {
			var anim : Animator = obj.GetComponent(Animator);
			if (directionNum == 0) {
				walkFrontNoSpeed(anim);
			} else if (directionNum == 1) {
				walkBackNoSpeed(anim);
			} else if (directionNum == 2) {
				walkLeftNoSpeed(anim);
			} else {
				walkRightNoSpeed(anim);
			}
		}
		
		
		
	}
	
	loadStatus = LoadStatus.LOAD_COMPLETE;
 }
 
function parse(part : String) {
	return part.Split(";"[0]);
}

public function isLoadComplete() {
	if (loadStatus == LoadStatus.LOAD_COMPLETE) {
		return true;
	}
	return false;
}

private function walkFrontNoSpeed(animObj : Animator) {
	setDirection(true, false, false, false, animObj);
}

private function walkBackNoSpeed(animObj : Animator) {
	setDirection(false, true, false, false, animObj);
}

private function walkLeftNoSpeed(animObj : Animator) {	
	setDirection(false, false, true, false, animObj);
}

private function walkRightNoSpeed(animObj : Animator) {
	setDirection(false, false, false, true, animObj);
}
	
private function setDirection(fwFlg : boolean, bwFlg : boolean, lwFlg : boolean, rwFlg : boolean, animObj : Animator) {
	animObj.SetBool("Fwait", fwFlg);
	animObj.SetBool("Bwait", bwFlg);
	animObj.SetBool("Lwait", lwFlg);
	animObj.SetBool("Rwait", rwFlg);
}
	