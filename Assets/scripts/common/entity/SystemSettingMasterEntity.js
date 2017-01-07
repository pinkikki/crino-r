#pragma strict

class SystemSettingMasterEntity {

	private var watchFlg : boolean;
	private var batteryFlg : boolean;
	private var soundFlg : boolean;

	public function getWatchFlg() {
		return watchFlg;
	}
	
	public function setWatchFlg(watchFlg) {
		this.watchFlg = watchFlg;
	}
	
	public function getBatteryFlg() {
		return batteryFlg;
	}
	
	public function setBatteryFlg(batteryFlg) {
		this.batteryFlg = batteryFlg;
	}
	
	public function getSoundFlg() {
		return soundFlg;
	}
	
	public function setSoundFlg(soundFlg) {
		this.soundFlg = soundFlg;;
	}

}