#pragma strict

public var fileName : String;
private var labInstance : LoadAssetBandles;
private var loadStatus : LoadStatus = LoadStatus.LOAD_WAIT;
private static final var PREFIX : String = "/other/";

function Start () {
	labInstance = LoadAssetBandles.getInstance();
	load();
}

function Update () {

}

function load() {
	loadStatus = LoadStatus.LOAD_EXECUTE;
	if (fileName == null || fileName == "") {
		loadStatus = LoadStatus.LOAD_COMPLETE;
		return;
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
	