
private var watchFlg : boolean;
private var batteryFlg : boolean;
private var soundFlg : boolean;

function Start () {
}

function Update () {
}

function clickWatchOnButton() {
	this.transform.FindChild("MenuBase/WatchBase/OnBase").GetComponent(Button).colors.normalColor = new Color(1f, 1f, 1f, 30f / 255f);
	this.transform.FindChild("MenuBase/WatchBase/OffBase").GetComponent(Button).colors.normalColor = new Color(1f, 1f, 1f, 0f);
	watchFlg = true;
}

function clickWatchOffButton() {
	this.transform.FindChild("MenuBase/WatchBase/OnBase").GetComponent(Button).colors.normalColor = new Color(1f, 1f, 1f, 0f);
	this.transform.FindChild("MenuBase/WatchBase/OffBase").GetComponent(Button).colors.normalColor = new Color(1f, 1f, 1f, 30f / 255f);
	watchFlg = false;
}

function clickBatteryOnButton() {
	this.transform.FindChild("MenuBase/BatteryBase/OnBase").GetComponent(Button).colors.normalColor = new Color(1f, 1f, 1f, 30f / 255f);
	this.transform.FindChild("MenuBase/BatteryBase/OffBase").GetComponent(Button).colors.normalColor = new Color(1f, 1f, 1f, 0f);
	batteryFlg = true;
}

function clickBatteryOffButton() {
	this.transform.FindChild("MenuBase/BatteryBase/OnBase").GetComponent(Button).colors.normalColor = new Color(1f, 1f, 1f, 0f);
	this.transform.FindChild("MenuBase/BatteryBase/OffBase").GetComponent(Button).colors.normalColor = new Color(1f, 1f, 1f, 30f / 255f);
	batteryFlg = false;
}

function clickSoundOnButton() {
	this.transform.FindChild("MenuBase/SoundBase/OnBase").GetComponent(Button).colors.normalColor = new Color(1f, 1f, 1f, 30f / 255f);
	this.transform.FindChild("MenuBase/SoundBase/OffBase").GetComponent(Button).colors.normalColor = new Color(1f, 1f, 1f, 0f);
	soundFlg = true;
}

function clickSoundOffButton() {
	this.transform.FindChild("MenuBase/SoundBase/OnBase").GetComponent(Button).colors.normalColor = new Color(1f, 1f, 1f, 0f);
	this.transform.FindChild("MenuBase/SoundBase/OffBase").GetComponent(Button).colors.normalColor = new Color(1f, 1f, 1f, 30f / 255f);
	soundFlg = false;
}

function clickOkButton() {
	var entity : SystemSettingMasterEntity = new SystemSettingMasterEntity();
	entity.setWatchFlg(watchFlg);
	entity.setBatteryFlg(batteryFlg);
	entity.setSoundFlg(soundFlg);
	SystemSettingMasterDao.update(entity);
	this.transform.parent.parent.parent.GetComponent(FieldMenuController).onPrevious();
	
	var watchObj : GameObject = this.transform.parent.parent.FindChild("Layer2_SideMenu/SideMenu/WatchBase").gameObject;
	var fieldMenuController : FieldMenuController = this.transform.parent.parent.parent.GetComponent(FieldMenuController);
	if (watchFlg) {
		StartCoroutine(fieldMenuController.fadeIn(watchObj));	
	} else {
		StartCoroutine(fieldMenuController.fadeOut(watchObj));	
	}
}

public function setWatchFlg(watchFlg) {
	this.watchFlg = watchFlg;
}

public function setBatteryFlg(batteryFlg) {
	this.batteryFlg = batteryFlg;
}

public function setSoundFlg(soundFlg) {
	this.soundFlg = soundFlg;
}
