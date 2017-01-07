#pragma strict
import System.Collections;

private var stayingTargetList = new List.<GameObject>();
private var saveDataTable = new Hashtable();
private var stayingSaveDic : Dictionary.<String, Hashtable> = new Dictionary.<String, Hashtable>();
private static var instance : SaveManager;

function Start () {
	var tempSave : String = PlayerPrefs.GetString("temp_stayingSave");
	var tempSaveDic : IDictionary = MiniJSON.Json.Deserialize(tempSave) as IDictionary;
	var tempSaveList : IDictionary = tempSaveDic["saveSceneCharcterPosition"] as IDictionary;
	var position : IList = tempSaveList["residents"] as IList;
	init();
	
	StartCoroutine(auto());
}

public static function getInstance() {
	if (instance == null) {
		var go : GameObject = new GameObject("SaveManager");
		instance = go.AddComponent(SaveManager);
		
		DontDestroyOnLoad(go);
	}
	
	return instance;
}


function Update () {

}

// バックグラウンドへの移行と復帰のイベント
function OnApplicationPause(pauseStatus: boolean) {
	// TODO 必要か？
}

// アプリが終了する前に呼ばれるイベント
function OnApplicationQuit() {
	// TODO 必要か？
}

private function init() {
	var gmObjList = FindObjectsOfType(GameObject);
	for(var gmObj : GameObject in gmObjList) {
		var gmName = gmObj.name;
		if(gmName.StartsWith("residents")) {
			stayingTargetList.Add(gmObj);
		}
	}
	
	var tempSave : String = PlayerPrefs.GetString("temp_stayingSave");
	var tempSaveDic : IDictionary = MiniJSON.Json.Deserialize(tempSave) as IDictionary;
	var tempSaveList : IDictionary = tempSaveDic["saveSceneCharcterPosition"] as IDictionary;
	
	loadSceneCharcterPosition(tempSaveList);
}

private function loadSceneCharcterPosition(tempSaveList : IDictionary) {

	for (var gmObj : GameObject in stayingTargetList) {
		var anim : Animator = gmObj.GetComponent(Animator);
		var position : IList = tempSaveList[gmObj.name] as IList;
		gmObj.transform.position.x = position[0];
		gmObj.transform.position.y = position[1];
		gmObj.transform.position.z = position[2];
		var animState : float = position[3];
		if (animState == 0.0) {
			anim.SetFloat("Vspeed", -1.0f);
		} else if (animState == 1.0) {
			anim.SetFloat("Vspeed", 1.0f);
		} else if (animState == 2.0) {
			anim.SetFloat("Hspeed", -1.0f);
		} else {
			anim.SetFloat("Hspeed", 1.0f);
		}
	}
}

private function auto() {
	while (true) {
		// TODO hensunisuru
		
		yield WaitForSeconds(5);
		staySave();
		PlayerPrefs.Save();
	}
}

private function staySave() {
	stayingSaveDic.Clear();
	saveSceneCharcterPosition();
}

// 常駐保存キャラクター位置
private function saveSceneCharcterPosition() {

	saveDataTable.Clear();
	
	for(var gmObj : GameObject in stayingTargetList) {
		var positionArr = new float[4];
		positionArr[0] = gmObj.transform.position.x;
		positionArr[1] = gmObj.transform.position.y;
		positionArr[2] = gmObj.transform.position.z;
		
		var anim : Animator = gmObj.GetComponent(Animator);
		var currentState = anim.GetCurrentAnimatorStateInfo(0);
		if(currentState.IsName("Base Layer.front_wait")) {
			positionArr[3] = 0.0;
		} else if(currentState.IsName("Base Layer.front")) {
			positionArr[3] = 0.0;
		} else if(currentState.IsName("Base Layer.back_wait")) {
			positionArr[3] = 1.0;
		} else if(currentState.IsName("Base Layer.back")) {
			positionArr[3] = 1.0;
		} else if(currentState.IsName("Base Layer.left_wait")) {
			positionArr[3] = 2.0;
		} else if(currentState.IsName("Base Layer.left")) {
			positionArr[3] = 2.0;
		} else if(currentState.IsName("Base Layer.right_wait")) {
			positionArr[3] = 3.0;
		} else if(currentState.IsName("Base Layer.right")) {
			positionArr[3] = 3.0;
		}
		
		saveDataTable.Add(gmObj.name, positionArr);
		
		stayingSaveDic["saveSceneCharcterPosition"] = saveDataTable;
		var serializeStr : String = MiniJSON.Json.Serialize(stayingSaveDic);
		PlayerPrefs.SetString("temp_stayingSave", serializeStr);
	}
}

// 正規ルートで保存した場合の処理
public function saveFromTempToPermanence() {
	// TODO セーブする項目が増えるたびにここに追加していく

	// 一時保存のデータを正データにコピー
	PlayerPrefs.SetString("stayingSave", PlayerPrefs.GetString("temp_stayingSave"));
}
