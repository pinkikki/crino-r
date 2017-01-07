
private static var instance : GameObject;

function Start () {
	getInstance();
}

function Update () {
}

public function getInstance() {
	if (instance == null) {
		var lab : LoadAssetBandles = LoadAssetBandles.getInstance();
		instance = Instantiate(lab.loadPrefab("prefab/battlemenu", "BattleMenu"), Vector2 (0f, 0f), Quaternion.identity);
		instance.name = "BattleMenu";
		instance.SetActive(false);
		
		DontDestroyOnLoad(instance);
	}
	
	return instance;
}

function destroy() {
	Destroy(instance);
}