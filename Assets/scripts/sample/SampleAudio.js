#pragma strict

public var test : AudioClip;
private var bgmSource : AudioSource;
private var bgmRepeatSource : AudioSource;
private var delayTime : float;

function Start () {
	bgmSource = this.gameObject.AddComponent(AudioSource);
//	bgmSource.loop = true;
	bgmRepeatSource = this.gameObject.AddComponent(AudioSource);
//	bgmRepeatSource.loop = true;
	playBgm();
}

function Update () {

}

function FixedUpdate() {
	if(bgmSource != null) {
		if(0 < bgmSource.timeSamples && bgmSource.timeSamples < 1152) {
			bgmSource.timeSamples = 1152;
		}
	}
//	if (bgmSource.timeSamples > (bgmSource.clip.samples - 1152)) {
//		Debug.Log(bgmSource.timeSamples);
//		bgmSource.volume = 0;
//	} else {
//		bgmSource.volume = 1;
//	}
}

function playBgm() {
	bgmSource.Stop();
	bgmSource.clip = test;
	bgmSource.Play();
	bgmRepeatSource.clip = test;
	bgmRepeatSource.PlayDelayed(14.1);
//	bgmRepeatSource.Play();
}