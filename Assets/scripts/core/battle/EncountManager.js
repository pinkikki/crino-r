
public var sceneNameList : List.<String>;
private var encountStopFlg : boolean = false;
private var bossScene : String;
private var bossBgm : String;
private var bossBgmTime : float;
private var bossBgmRepeatTime : float;
private var amInstance : AudioManager;
private var controller : CharactersController;
private var battleMenu : GameObject;
private var fieldMenu : GameObject;
private var battleScene : GameObject;
private var mainCamera : GameObject;
private var battleController : BattleMenuController;
private var loadStatus : LoadStatus = LoadStatus.LOAD_WAIT;

function Start () {
	mainCamera = GameObject.Find("Main Camera");
	amInstance = FindObjectOfType(AudioManager);
	// TODO バトルシーンを完了してから以降の処理を実行するロジックを追加する必要有
	StartCoroutine(loadLevelAdditiveAsync());
	StartCoroutine(load());
	var lab : LoadAssetBandles = LoadAssetBandles.getInstance();
	battleMenu = Instantiate(lab.loadPrefab("prefab/battlemenu", "BattleMenu"), Vector2 (0f, 0f), Quaternion.identity);
	battleMenu.name = "BattleMenu";
	battleMenu.SetActive(false);
}

function load() {
	loadStatus = LoadStatus.LOAD_EXECUTE;
	while (true) {
		controller = FindObjectOfType(CharactersController);
		if (controller == null) {
			yield null;
		} else {
			break;
		}
	}

	loadStatus = LoadStatus.LOAD_COMPLETE;
}

function Update () {
	if (loadStatus == LoadStatus.LOAD_COMPLETE) {
		if (controller.warlkingFlg && !encountStopFlg) {
			var ran : float = Random.Range(0, 300);
			if (ran == 7) {
				StartCoroutine(transScene());
			}
		}
	}
}
public function transScene() {
	// キャラクターが歩くのを止める
	if (controller != null) {
		controller.walkStop();
	}
	yield SceneLoadManager.getInstance().fadeOut(1f);
	if (fieldMenu == null) {
		fieldMenu = GameObject.Find("FieldMenu");
	}
	if (battleScene == null || bossScene != null) {
		var sceneName : String;
		if (bossScene == null) {
			sceneName = sceneNameList[0];
		} else {
			sceneName = bossScene;
		}
		var root : GameObject = GameObject.Find("BattleRoot_" + sceneName);
		battleScene = root.transform.Find("BattleScene").gameObject;
		var battleMenuCanvas : Canvas = battleMenu.GetComponent(Canvas);
		battleMenuCanvas.worldCamera = battleScene.transform.FindChild("Main Camera").GetComponent(Camera);
		battleMenuCanvas.sortingLayerName = "UI";
	}

	if (fieldMenu != null) {
		// フィールドメニューを非表示
		fieldMenu.SetActive(false);
	}
	// メインカメラを非表示にして、バトル用のカメラをメインにする
	mainCamera.SetActive(false);
	
	if (battleController == null) {
		battleController = battleMenu.GetComponent("BattleMenuController");
	}
	
	battleScene.SetActive(true);
	battleMenu.SetActive(true);

	if (bossScene == null) {
		battleController.createEnemyBase(sceneNameList[0]);
	} else {
		battleController.createEnemyBase(bossScene);
	}

	if (bossBgm == null) {
		amInstance.playBgm("f99s05002_battleNormal", 60.197f, 8.092f);
	} else {
		amInstance.playBgm(bossBgm, bossBgmTime, bossBgmRepeatTime);
	}
	SceneLoadManager.getInstance().Destroy();
	SceneLoadManager.getInstance().fadeIn(1f);
}

public function finish() {
	amInstance.stopBgmAtFadeOut(1.0f);
	yield SceneLoadManager.getInstance().fadeOut(1f);
	battleScene.SetActive(false);
	battleMenu.SetActive(false);

	mainCamera.SetActive(true);

	if (bossScene == null) {
		fieldMenu.SetActive(true);
	} else {
		bossScene = null;
		bossBgm = null;
		bossBgmTime = 0.0f;
		bossBgmRepeatTime = 0.0f;
		encountStopFlg = false;
	}
	
	SceneLoadManager.getInstance().Destroy();
	SceneLoadManager.getInstance().fadeIn(1f);
}

private function loadLevelAdditiveAsync() {
	for (var sceneName : String in sceneNameList) {
		Application.LoadLevelAdditiveAsync(sceneName);
	}
	yield null;
}

public function getEncountStopFlg() {
	return encountStopFlg;
}

public function setEncountStopFlg(encountStopFlg : boolean) {
	this.encountStopFlg = encountStopFlg;
}

public function getBossScene() {
	return bossScene;
}

public function setBossScene(bossScene : String) {
	this.bossScene = bossScene;
}

public function getBossBgm() {
	return bossBgm;
}

public function setBossBgm(bossBgm : String) {
	this.bossBgm = bossBgm;
}

public function getBossBgmTime() {
	return bossBgmTime;
}

public function setBossBgmTime(bossBgmTime : float) {
	this.bossBgmTime = bossBgmTime;
}

public function getBossBgmRepeatTime() {
	return bossBgmRepeatTime;
}

public function setBossBgmRepeatTime(bossBgmRepeatTime : float) {
	this.bossBgmRepeatTime = bossBgmRepeatTime;
}

public function getLoadStatus() {
	return loadStatus;
}