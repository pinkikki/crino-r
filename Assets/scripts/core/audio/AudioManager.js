#pragma strict
import System.Collections.Generic;

public var bgmClipList : List.<String>;
public var bgmAssetBundleList : List.<String>;
public var seClipList : List.<String>;
public var seAssetBundleList : List.<String>;

private var bgmSource : AudioSource;
private var bgmCrossFadingSource : AudioSource;
private var seSourceList : List.<AudioSource>;
private var bgmDict : Dictionary.<String, AudioClip>;
private var seDict : Dictionary.<String, AudioClip>;
private var labInstance : LoadAssetBandles;
private var delayTime : float;
private var crossTime : float;
private var startTime : float;
public var loadStatus : LoadStatus = LoadStatus.LOAD_WAIT;
public var singletonFlg : boolean = false;
public var encountFlg : boolean = false;
public var encountFlgForBoss : boolean = false;

function Awake() {
	bgmSource = this.gameObject.AddComponent(AudioSource);
	bgmCrossFadingSource = this.gameObject.AddComponent(AudioSource);
	
	if (singletonFlg) {
		DontDestroyOnLoad(this);
	}
}

function Start () {
	var encountManager : GameObject = GameObject.Find("EncountManager");
	if (encountManager != null) {
		encountFlg = true;
	}
	labInstance = LoadAssetBandles.getInstance();
	bgmDict = new Dictionary.<String, AudioClip>();
	seDict = new Dictionary.<String, AudioClip>();
	seSourceList = new List.<AudioSource>();
	StartCoroutine(load());
}

private function load() {
	loadStatus = LoadStatus.LOAD_EXECUTE;
	if (encountFlg || encountFlgForBoss) {
		addBattleAudioClip();
	}
	while(true) {
		if(labInstance.loadStatus == LoadStatus.LOAD_COMPLETE) {
			for(var i = 0; i < bgmClipList.Count; i++) {
				var bgmAssetName = bgmClipList[i];
				var bgmAssetBundle = bgmAssetBundleList[i];
				bgmDict.Add(bgmAssetName, labInstance.loadAudio(bgmAssetBundle, bgmAssetName));
			}
			for(var j = 0; j < seClipList.Count; j++) {
				var seAssetName = seClipList[j];
				var seAssetBundle = seAssetBundleList[j];
				seDict.Add(seAssetName, labInstance.loadAudio(seAssetBundle, seAssetName));
			}
			loadStatus = LoadStatus.LOAD_COMPLETE;
			break;
		}
		yield null;
	}
}

public function isLoadComplete() {
	if (loadStatus == LoadStatus.LOAD_COMPLETE) {
		return true;
	}
	return false;
}

function Update () {
	if(bgmSource != null) {
	}
}

function FixedUpdate() {
	// TODO delayTimeがいるのかどうか不明なので一旦コメントアウト
//	if(bgmSource != null) {
//		if(0 < bgmSource.time && bgmSource.time < delayTime) {
//			bgmSource.time = delayTime;
//		}
//	}
//	if(bgmCrossFadingSource != null) {
//		if(0 < bgmCrossFadingSource.time && bgmCrossFadingSource.time < delayTime) {
//			bgmCrossFadingSource.time = delayTime;
//		}
//	}
	if (!bgmSource.isPlaying && bgmCrossFadingSource.isPlaying) {
		bgmSource.PlayDelayed(crossTime - bgmCrossFadingSource.time);
		bgmSource.time = startTime + delayTime;
	} else if (bgmSource.isPlaying && !bgmCrossFadingSource.isPlaying) {
		bgmCrossFadingSource.PlayDelayed(crossTime - bgmSource.time);
		bgmCrossFadingSource.time = startTime + delayTime;
	}
}

function playSe(seName) {

	var playSource : AudioSource = null;
	for(var seSource : AudioSource in seSourceList) {
		if(!seSource.isPlaying) {
			playSource = seSource;
			break;
		}
	}
	
	if(playSource == null) {
		playSource = this.gameObject.AddComponent(AudioSource);
		seSourceList.Add(playSource);
	}
	
	playSource.clip = seDict[seName];
	playSource.Play();
}

function stopSe(seName) {
	for(var seSource : AudioSource in seSourceList) {
		if(seSource.clip.name == seName) {
			seSource.Stop();
			seSource.clip = null;
		}
	}
}

function playBgm(bgmName) {
	bgmSource.Stop();
	bgmSource.clip = bgmDict[bgmName];
	delayTime = bgmSource.clip.length / bgmSource.clip.samples * 1152;
	bgmSource.loop = true;
	bgmSource.Play();
}

function playBgm(bgmName, tmpCrossTime) {
	playBgm(bgmName, tmpCrossTime, 0f);
}

function playBgm(bgmName, tmpCrossTime : float, tmpStartTime : float) {
	Debug.Log("test " + bgmName + " test");
	var bgm = bgmDict[bgmName];
	bgmSource.Stop();
	bgmSource.clip = bgm;
	bgmSource.time = 0.0f;
	delayTime = bgm.length / bgm.samples * 1152;
	// TODO delayTimeがいるのかどうか不明なので一旦コメントアウト
//	crossTime = tmpCrossTime + delayTime;
//	startTime = tmpStartTime + delayTime;
	crossTime = tmpCrossTime;
	startTime = tmpStartTime;
	bgmSource.Play();
	bgmCrossFadingSource.clip = bgm;
	bgmCrossFadingSource.PlayDelayed(crossTime);
	bgmCrossFadingSource.time = startTime;
}

function stopBgm() {
	bgmSource.Stop();
	bgmSource.clip = null;
	bgmCrossFadingSource.Stop();
	bgmCrossFadingSource.clip = null;
}

function stopBgmAtFadeOut(interval : float) {
	return StartCoroutine(stopBgmAtFadeOutCoroutine(interval));
}

function downBgmVolume(interval : float, downVolumn : float) {
	return StartCoroutine(downBgmVolumeCoroutine(interval, downVolumn));
}

private function stopBgmAtFadeOutCoroutine(interval : float) {
	var bgmMaxVolume = bgmSource.volume;
	yield downBgmVolumeCoroutine(interval, 0.0f);
	stopBgm();
	bgmSource.volume = bgmMaxVolume;
}

private function downBgmVolumeCoroutine(interval : float, downVolumn : float) {
	var time : float = 0.0f;
	var bgmMaxVolume = bgmSource.volume;
	while(time < interval) {
		bgmSource.volume = Mathf.Lerp(bgmMaxVolume, downVolumn, time / interval);
		bgmCrossFadingSource.volume = Mathf.Lerp(bgmMaxVolume, downVolumn, time / interval);
		time += Time.deltaTime;
		yield null;
	}
}

private function addBattleAudioClip() {
	if (encountFlgForBoss) {
		bgmClipList.Add("f99s05004_battleMiddle");
		bgmAssetBundleList.Add("f99/cmn/s05/battle/middle");
	}
	if (encountFlg) {
		bgmClipList.Add("f99s05002_battleNormal");
		bgmAssetBundleList.Add("f99/cmn/s05/battle/normal");
	}

	bgmClipList.Add("f99s05006_battleFinish");
	bgmClipList.Add("f99s05010_gameOver");
	bgmAssetBundleList.Add("f99/cmn/s05/battle/cmn");
	bgmAssetBundleList.Add("f99/cmn/s05/battle/cmn");
	seClipList.Add("f99s05007_Attack");
	seClipList.Add("f99s05007_physicalAttack");
	seClipList.Add("f99s05008_battleRecovery");
	seClipList.Add("f99s05008_Recovery");
	seClipList.Add("f99s05009_magicalChant");
	seAssetBundleList.Add("f99/cmn/s05/battle/cmn");
	seAssetBundleList.Add("f99/cmn/s05/battle/cmn");
	seAssetBundleList.Add("f99/cmn/s05/battle/cmn");
	seAssetBundleList.Add("f99/cmn/s05/battle/cmn");
	seAssetBundleList.Add("f99/cmn/s05/battle/cmn");
}

function destroy() {
	Destroy(this);
}