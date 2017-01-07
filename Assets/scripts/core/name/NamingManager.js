#pragma strict
import System.IO;
import System.Collections.Generic;

public var nameDic : Dictionary.<String, String>;
private var CN_NAME_FILE_PATH = "system/ch_name.txt";
private static var instance : NamingManager;

function Start () {
//	updateName("${tys}", "つよし");
}

public static function getInstance() {
	if (instance == null) {
		var go : GameObject = new GameObject("NamingManager");
		instance = go.AddComponent(NamingManager);
		
		DontDestroyOnLoad(go);
	}
	
	return instance;
}

function Update () {

}

function Awake() {
	loadName();
}

function updateName(key, value) {
	nameDic[key] = value;
	// TODO DBに変更
//	var fi = new FileInfo(Application.dataPath + CN_NAME_FILE_PATH);
////	var sw = fi.AppendText();
//	var sw = fi.CreateText();
//	for (var ch in nameDic) {
//		sw.WriteLine(ch.Key + ";" + ch.Value);	
//	}
//	sw.Flush();
//	sw.Close();
	
}

function loadName() {
	nameDic = new Dictionary.<String, String>();
	
//	var fi = new FileInfo(Application.dataPath + CN_NAME_FILE_PATH);
//	if(fi.Exists) {
//		var sr = new StreamReader(fi.OpenRead());
//		while(sr.Peek() != -1) {
//			var line = sr.ReadLine();
//			var nameArray = line.Split(";"[0]);
//			nameDic[nameArray[0]] = nameArray[1];
//		}
//		
//		sr.Close();
//	}

	var lines : String[];
 	var filePath = Path.Combine(Application.streamingAssetsPath, CN_NAME_FILE_PATH);
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
 	
 	for(var i = 0; i < lines.length; i++) {
 		var nameArray = lines[i].Split(";"[0]);
		nameDic[nameArray[0]] = nameArray[1];
 	}
}

function convert(str : String) {

	var convertStr = str;
	for (var ch in nameDic) {
		convertStr = convertStr.Replace(ch.Key, ch.Value);
	}
	
	return convertStr;
}