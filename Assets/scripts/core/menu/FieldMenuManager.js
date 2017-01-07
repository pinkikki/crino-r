
private static var instance : GameObject;

function Start () {
	getInstance();
	DontDestroyOnLoad(this);
}

function Update () {
}

public static function getInstance() {
	if (instance == null) {
		var lab : LoadAssetBandles = LoadAssetBandles.getInstance();
		instance = Instantiate(lab.loadPrefab("prefab/fieldmenu", "FieldMenu"), Vector2 (0f, 0f), Quaternion.identity);
		instance.name = "FieldMenu";
		
		DontDestroyOnLoad(instance);
	}
	
	return instance;
}

function destroy() {
	Destroy(instance);
}