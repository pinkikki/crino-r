#pragma strict

private var baseLayer : GameObject;
private var defaultInterval : float = 1.0f;
private var amInstance : AudioManager;
private var ciInstance : CharactersInitializer;
private var oiInstance : OtherInitializer;
private static var instance : SceneLoadManager;
private enum TransType {
	DEFAULT,
	LOADING,
	NONE
}
private var assetBundleInfoDic : Dictionary.<String, int>;

function Start () {

}

function Update () {

}

public static function getInstance() {
	if (instance == null) {
		var go : GameObject = new GameObject("SceneLoadManager");
		instance = go.AddComponent(SceneLoadManager);
		
		DontDestroyOnLoad(go);
	}
	
	return instance;
}

public function fadeIn(fadeInInterval : float) {
	return StartCoroutine(fadeInScene(fadeInInterval));
}

public function fadeOut(fadeOutInterval : float) {
	return StartCoroutine(fadeOutScene(fadeOutInterval));
}

public function Destroy() {
	if (baseLayer != null) {
		Destroy(baseLayer);
	}
}

public function fade() {
	StartCoroutine(transScene(defaultInterval, defaultInterval, TransType.NONE, null, null));
}

public function fade(interval : float) {
	StartCoroutine(transScene(interval, interval, TransType.NONE, null, null));
}

public function fade(fadeInInterval : float, fadeOutInterval : float) {
	StartCoroutine(transScene(fadeInInterval, fadeOutInterval, TransType.NONE, null, null));
}

public function loadLevel(nextLevelName : String, assetBundleInfoDic : Dictionary.<String, int>) {
	StartCoroutine(transScene(defaultInterval, defaultInterval, TransType.DEFAULT,
		nextLevelName, assetBundleInfoDic));
}

public function loadLevel(interval : float, nextLevelName : String, assetBundleInfoDic : Dictionary.<String, int>) {
	StartCoroutine(transScene(interval, interval, TransType.DEFAULT,
		nextLevelName, assetBundleInfoDic));
}

public function loadLevelInLoading(nextLevelName : String, assetBundleInfoDic : Dictionary.<String, int>) {
	StartCoroutine(transScene(defaultInterval, defaultInterval, TransType.LOADING, nextLevelName, assetBundleInfoDic));
}

public function loadLevelInLoading(interval : float, nextLevelName : String, assetBundleInfoDic : Dictionary.<String, int>) {
	StartCoroutine(transScene(interval, interval, TransType.LOADING,
		nextLevelName, assetBundleInfoDic));
}

public function loadLevelInLoading(fadeInInterval : float, fadeOutInterval : float, nextLevelName : String, assetBundleInfoDic : Dictionary.<String, int>) {
	StartCoroutine(transScene(fadeInInterval, fadeOutInterval, TransType.LOADING,
		nextLevelName, assetBundleInfoDic));
}

private function transScene(fadeInInterval : float, fadeOutInterval : float,
								transType : TransType, nextLevelName : String,
								assetBundleInfoDic : Dictionary.<String, int>) {

	amInstance = null;
	ciInstance = null;
	oiInstance = null;
	var raw : RawImage = createLayer();
	
	var time : float = 0.0f;
	while (time <= fadeOutInterval) {
	    raw.color = new Color(0, 0, 0, Mathf.Lerp(0f, 1f, time / fadeOutInterval));
	    time += Time.deltaTime;
	    yield null;
	}
	
	if (transType == TransType.DEFAULT || transType == TransType.LOADING) {
		
		if (transType == TransType.LOADING) {
			Application.LoadLevel("f99_loading");
			while(Application.loadedLevelName != "f99_loading") yield null;
		}
		
		amInstance = FindObjectOfType(AudioManager);
		var lab : LoadAssetBandles = LoadAssetBandles.getInstance();
		if (amInstance != null && amInstance.singletonFlg) {
			lab.unloadExcludingAudios();
		} else {
			lab.unload();
		}
		lab.setAssetBundleInfoDic(assetBundleInfoDic);
		var ao : AsyncOperation = Application.LoadLevelAsync(nextLevelName);
		ao.allowSceneActivation = false;
		lab.load();
        while(ao.progress < 0.9f) yield null;
		while(lab.loadStatus != LoadStatus.LOAD_COMPLETE) yield null;
		
		ao.allowSceneActivation = true;
		while(Application.loadedLevelName != nextLevelName) yield null;
	} else {
		Destroy(baseLayer);
	}
	
	time = 0;
	raw = createLayer();
	raw.color = new Color(0, 0, 0, 1);
	
	amInstance = FindObjectOfType(AudioManager);
	ciInstance = FindObjectOfType(CharactersInitializer);
	oiInstance = FindObjectOfType(OtherInitializer);
	if (amInstance != null) {
		while(!amInstance.isLoadComplete()) yield null;
	}
	if (ciInstance != null) {
		while(!ciInstance.isLoadComplete()) yield null;
	}
	if (oiInstance != null) {
		while(!oiInstance.isLoadComplete()) yield null;
	}
	
	while (time <= fadeInInterval)
	{
	    raw.color = new Color(0, 0, 0, Mathf.Lerp(1f, 0f, time / fadeInInterval));
	    time += Time.deltaTime;
	    yield null;
	}

	Destroy(baseLayer);
}

private function fadeInScene(fadeInInterval : float) {
	return trans(fadeInInterval, 1f ,0f);
}

private function fadeOutScene(fadeOutInterval : float) {
	return trans(fadeOutInterval, 0f ,1f);
}

private function trans(interval : float, startTransVal : float, endTransVal : float) {
	var raw : RawImage = createLayer();
	
	var time : float = 0.0f;
	while (time <= interval) {
	    raw.color = new Color(0, 0, 0, Mathf.Lerp(startTransVal, endTransVal, time / interval));
	    time += Time.deltaTime;
	    yield null;
	}
	
	if (endTransVal == 0.0f) {
		Destroy(baseLayer);
	}
}

private function createLayer() {

	baseLayer = new GameObject();
	baseLayer.name = "BaseLayer";
	baseLayer.layer = 5;
	var canvas : Canvas = baseLayer.AddComponent(Canvas);
	canvas.renderMode = 0;
	var canvasScaler : CanvasScaler = baseLayer.AddComponent(CanvasScaler);
	var graphicRaycaster : GraphicRaycaster = baseLayer.AddComponent(GraphicRaycaster);
	
	var childLayer = new GameObject();
	childLayer.name = "ChildLayer";
	childLayer.transform.SetParent(baseLayer.transform);
	var rect : RectTransform = childLayer.AddComponent(RectTransform);
	rect.anchorMax = new Vector2(1f, 1f);
	rect.anchorMin = new Vector2(0f, 0f);
	rect.anchoredPosition = new Vector2(0, 0);
	return childLayer.AddComponent(RawImage);
}
