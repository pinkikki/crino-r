#pragma strict

private var assetBundleDic : Dictionary.<String, AssetBundle>;
private var assetBundleInfoDic : Dictionary.<String, int>;
private enum LoadType {
	CACHE_DOWNLOAD,
	CREATE_FILE,
	DEFAULT
}
public enum LoadStatus {
	LOAD_WAIT,
	LOAD_EXECUTE,
	LOAD_COMPLETE
}
public var loadType : LoadType = LoadType.CREATE_FILE;
public var loadStatus : LoadStatus = LoadStatus.LOAD_WAIT;
private static final var PREFIX : String = "/AssetBundles/android/";
private static var instance : LoadAssetBandles;

	
function Start() {
}

public static function getInstance() {
	if (instance == null) {
		var go : GameObject = new GameObject("LoadAssetBundles");
		instance = go.AddComponent(LoadAssetBandles);
		
		DontDestroyOnLoad(go);
	}
	
	return instance;
}

public function load() {
	if (assetBundleInfoDic == null) {
		return;
	}
	StartCoroutine(download());
}

private function download() {
	loadStatus = LoadStatus.LOAD_EXECUTE;
	var assetBundle : AssetBundle;
	assetBundleDic = new Dictionary.<String, AssetBundle>();
	for(var assetBundleInfoPair : KeyValuePair.<String, int> in assetBundleInfoDic) {
		var url = assetBundleInfoPair.Key;
		var version = assetBundleInfoPair.Value;

		if (assetBundleDic.ContainsKey(url)) {
			continue;
		}

		if (loadType == LoadType.CACHE_DOWNLOAD) {
			while(!Caching.ready) {
				yield null;
			}
			var www : WWW = WWW.LoadFromCacheOrDownload("file://" + Path.Combine(Application.streamingAssetsPath
				+ PREFIX, url), version);
//			var www : WWW = WWW.LoadFromCacheOrDownload(
//				"http://pinkikki.jp/crino-r/AssetBundles/android/f96/tsuyoshiyume", 4);
			Debug.Log("file://" + Path.Combine(Application.streamingAssetsPath
				+ PREFIX, url));
			Debug.Log(www.url);
			yield www;
			Debug.Log("pass!!!!");
			if (www.error != null) {
				throw System.Exception("通信障害が発生しました" + www.error + "url : " + Path.Combine(Application.streamingAssetsPath + PREFIX, url));
			}
			assetBundle = www.assetBundle;
			www.Dispose();
	//		assetBundle.Unload(false);
		} else if (loadType == LoadType.CREATE_FILE) {
			assetBundle = AssetBundle.LoadFromFile(Path.Combine(Application.streamingAssetsPath + PREFIX, url));
//			var www2 = new WWW("http://pinkikki.jp/crino-r" + PREFIX + url);
//			yield www2;
//	 		if(www2.error != null) {
//				throw System.Exception("通信障害が発生しました");
//			}
//			assetBundle = www2.assetBundle;
		} else {
		
		}
		assetBundleDic.Add(url, assetBundle);
	}
	loadStatus = LoadStatus.LOAD_COMPLETE;
}

public function loadAudio(assetBundleName, assetName) {
	var assetBundle : AssetBundle = assetBundleDic[assetBundleName];
	if(assetBundle == null) {
		return;
	}
	return assetBundle.LoadAsset(assetName);
}

public function loadPrefab(assetBundleName, assetName) {
	var assetBundle : AssetBundle = assetBundleDic[assetBundleName];
	if(assetBundle == null) {
		return;
	}
	return assetBundle.LoadAsset(assetName);
}

public function unload() {
	if (assetBundleDic != null) {
		for(var assetBundlePair : KeyValuePair.<String, AssetBundle> in assetBundleDic) {
			var key : String = assetBundlePair.Key;
			if (key.IndexOf("prefab/fieldmenu") == -1) {
				assetBundlePair.Value.Unload(true);
			}
		}
		assetBundleDic = null;
		assetBundleInfoDic = null;
	}
}

public function unloadExcludingAudios() {
	if (assetBundleDic != null) {
		for(var assetBundlePair : KeyValuePair.<String, AssetBundle> in assetBundleDic) {
			var key : String = assetBundlePair.Key;
			if (key.IndexOf("prefab") != -1 && key.IndexOf("prefab/fieldmenu") == -1) {
				assetBundlePair.Value.Unload(true);	
			}
		}
		assetBundleDic = null;
		assetBundleInfoDic = null;
	}
}

public function getAassetBundleInfoDic() {
	return assetBundleInfoDic;
}

public function setAssetBundleInfoDic(assetBundleInfoDic : Dictionary.<String, int>) {
	this.assetBundleInfoDic = assetBundleInfoDic;
}

function Update () {

}
