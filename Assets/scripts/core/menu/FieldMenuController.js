#pragma strict

private var objDic : Dictionary.<String, GameObject> = new Dictionary.<String, GameObject>();
private var rootDic : Dictionary.<String, String> = new Dictionary.<String, String>();

private var defaultFadeInInterval : float = 0.2f;
private var defaultFadeOutInterval : float = 0.2f;
private var previousMenuObj : GameObject;
private var currentMenuObj : GameObject;
private var watchFlg : boolean;

public var itemMenuRowPrefab : GameObject;
public var equipmentMenuRowPrefab : GameObject;
public var weaponIconPrefab : GameObject;
public var clothesIconPrefab : GameObject;
public var shoesIconPrefab : GameObject;
public var hatIconPrefab : GameObject;
public var fopperyIconPrefab : GameObject;

public var skillMenuMagicRowPrefab : GameObject;
public var skillMenuSkillRowPrefab : GameObject;

public var statusMenuSkillRowPrefab : GameObject;

public var characterBasePrefab : GameObject;
public var statusDeadIconPrefab : GameObject;
public var statusConfusionIconPrefab : GameObject;
public var statusPoisonIconPrefab : GameObject;
public var statusParalysisIconPrefab : GameObject;
public var tsuyoshiFaceIconPrefab : GameObject;
public var tsuyoshiIconPrefab : GameObject;
public var tsuyoshiNameBarPrefab : GameObject;
public var tsuyoshiIconBasePrefab : GameObject;
var labInstance : LoadAssetBandles;

function Start () {
	rootDic["Layer2_MainMenu"] = "Layer1_BaseMenu";
	rootDic["Layer3_ItemMenu"] = "Layer2_MainMenu";
	rootDic["Layer3_EquipmentMenu"] = "Layer2_MainMenu";
	rootDic["Layer3_SkillSelectMenu"] = "Layer2_MainMenu";
	rootDic["Layer3_BasicStatusMenu"] = "Layer2_MainMenu";
	rootDic["Layer3_MagicStatusMenu"] = "Layer2_MainMenu";
	rootDic["Layer3_SkillStatusMenu"] = "Layer2_MainMenu";
	rootDic["Layer3_SettingSelectMenu"] = "Layer2_MainMenu";
	rootDic["Layer3_SaveMenu"] = "Layer2_MainMenu";
	rootDic["Layer4_SkillMenu"] = "Layer3_SkillSelectMenu";
	rootDic["Layer4_TeamEditMenu"] = "Layer3_SettingSelectMenu";
	rootDic["Layer4_DisplayAndSoundMenu"] = "Layer3_SettingSelectMenu";
	rootDic["Layer2_SideMenu"] = "Layer2_SideMenu";
	
	objDic["Layer1_BaseMenu"] = this.transform.FindChild("Body/Layer1_BaseMenu").gameObject;
	objDic["Layer2_MainMenu"] = this.transform.FindChild("Body/Layer2_MainMenu").gameObject;
	objDic["Layer2_SideMenu"] = this.transform.FindChild("Body/Layer2_SideMenu").gameObject;
	objDic["Layer3_ItemMenu"] = this.transform.FindChild("Body/Layer3_ItemMenu").gameObject;
	objDic["Layer3_EquipmentMenu"] = this.transform.FindChild("Body/Layer3_EquipmentMenu").gameObject;
	objDic["Layer3_SkillSelectMenu"] = this.transform.FindChild("Body/Layer3_SkillSelectMenu").gameObject;
	objDic["Layer3_BasicStatusMenu"] = this.transform.FindChild("Body/Layer3_BasicStatusMenu").gameObject;
	objDic["Layer3_MagicStatusMenu"] = this.transform.FindChild("Body/Layer3_MagicStatusMenu").gameObject;
	objDic["Layer3_SkillStatusMenu"] = this.transform.FindChild("Body/Layer3_SkillStatusMenu").gameObject;
	objDic["Layer3_SettingSelectMenu"] = this.transform.FindChild("Body/Layer3_SettingSelectMenu").gameObject;
	objDic["Layer3_SaveMenu"] = this.transform.FindChild("Body/Layer3_SaveMenu").gameObject;
	objDic["Layer4_SkillMenu"] = this.transform.FindChild("Body/Layer4_SkillMenu").gameObject;
	objDic["Layer4_TeamEditMenu"] = this.transform.FindChild("Body/Layer4_TeamEditMenu").gameObject;
	objDic["Layer4_DisplayAndSoundMenu"] = this.transform.FindChild("Body/Layer4_DisplayAndSoundMenu").gameObject;
	labInstance = LoadAssetBandles.getInstance();
}

function onClose() {
	StartCoroutine(fadeOutIn(currentMenuObj, objDic["Layer1_BaseMenu"]));
	StartCoroutine(fadeOut(objDic["Layer2_MainMenu"]));
	StartCoroutine(fadeOut(objDic["Layer2_SideMenu"]));
	watchFlg = false;
}

function onPrevious() {
	if (currentMenuObj.name == "Layer2_MainMenu") {
		StartCoroutine(fadeOut(objDic["Layer2_SideMenu"]));
	}
	StartCoroutine(fadeOutIn(currentMenuObj, objDic[rootDic[currentMenuObj.name]]));
}

function onLayer1MainMenuClick() {
	var outObj : GameObject = objDic["Layer1_BaseMenu"];
	var inObj1 : GameObject = objDic["Layer2_MainMenu"];
	var inObj2 : GameObject = objDic["Layer2_SideMenu"];
	
	var entityList : List.<CharacterMasterEntity> = CharacterMasterDao.selectAll();
	var characterBaseObj : GameObject = inObj2.transform.FindChild("SideMenu/CharacterBase").gameObject;
	if (!watchFlg) {
		StartCoroutine(watch());
	}
	createChracterBase(characterBaseObj, entityList);
	var entity : TeamMasterEntity = TeamMasterDao.select();
	var moneyText : Text = inObj2.transform.FindChild("SideMenu/MoneyBase/Text").GetComponent(Text);
	moneyText.text = "￥" + String.Format("{0,10:N0}", entity.getMoney());
	
	var systemSettingMasterEntity :SystemSettingMasterEntity = SystemSettingMasterDao.select();
	if (systemSettingMasterEntity.getWatchFlg()) {
		StartCoroutine(fadeIn(inObj2.transform.FindChild("SideMenu/WatchBase").gameObject));	
	} else {
		StartCoroutine(fadeOut(inObj2.transform.FindChild("SideMenu/WatchBase").gameObject));	
	}
	
	StartCoroutine(fadeOutIn(outObj, inObj1));
	StartCoroutine(fadeIn(inObj2));
}

function onLayer2ItemButtonClick() {
	var outObj : GameObject = objDic["Layer2_MainMenu"];
	var inObj : GameObject = objDic["Layer3_ItemMenu"];
	var descriptionText : Text = this.transform.FindChild("Body/Layer3_ItemMenu/SideDisplayBase/Text").GetComponent(Text);
	var entityList : List.<BltItmEntity> = BelongingsTransactionDao.selectExhaustionJoinItemMaster();
	createItemMenuRow(inObj, entityList, "MainDisplayBase", descriptionText);
	StartCoroutine(fadeOutIn(outObj, inObj));
}

function onLayer2EquipmentButtonClick() {
	var outObj : GameObject = objDic["Layer2_MainMenu"];
	var inObj : GameObject = objDic["Layer3_EquipmentMenu"];

	var mainDisplayBase : GameObject = inObj.transform.FindChild("MainDisplayBase").gameObject;
	var characterIconBase : GameObject = mainDisplayBase.transform.FindChild("CharacterIconBase").gameObject;
	var characterNameText : Text = mainDisplayBase.transform.FindChild("CharacterName").GetComponent(Text);

	var levelValueText : Text = mainDisplayBase.transform.FindChild("StatusABase/LevelBase/Value").GetComponent(Text);
	var hpCurrentValueText : Text = mainDisplayBase.transform.FindChild("StatusABase/HpBase/CurrentValue").GetComponent(Text);
	var hpMaxValueText : Text = mainDisplayBase.transform.FindChild("StatusABase/HpBase/MaxValue").GetComponent(Text);
	var mpCurrentValueText : Text = mainDisplayBase.transform.FindChild("StatusABase/MpBase/CurrentValue").GetComponent(Text);
	var mpMaxValueText : Text = mainDisplayBase.transform.FindChild("StatusABase/MpBase/MaxValue").GetComponent(Text);

	var weaponValueText : Text = mainDisplayBase.transform.FindChild("EquipmentBase/WeaponBase/Value").GetComponent(Text);
	var clothesValueText : Text = mainDisplayBase.transform.FindChild("EquipmentBase/ClothesBase/Value").GetComponent(Text);
	var shoesValueText : Text = mainDisplayBase.transform.FindChild("EquipmentBase/ShoesBase/Value").GetComponent(Text);
	var hatValueText : Text = mainDisplayBase.transform.FindChild("EquipmentBase/HatBase/Value").GetComponent(Text);
	var fopperyValueText : Text = mainDisplayBase.transform.FindChild("EquipmentBase/FopperyBase/Value").GetComponent(Text);
	
	var powerValueText : Text = mainDisplayBase.transform.FindChild("StatusBBase/PowerAndDefenceBase/PowerBase/CurrentValue").GetComponent(Text);
	var powerAfterValueText : Text = mainDisplayBase.transform.FindChild("StatusBBase/PowerAndDefenceBase/PowerBase/AfterValue").GetComponent(Text);
	var defenceValueText : Text = mainDisplayBase.transform.FindChild("StatusBBase/PowerAndDefenceBase/DefenceBase/CurrentValue").GetComponent(Text);
	var defenceAfterValueText : Text = mainDisplayBase.transform.FindChild("StatusBBase/PowerAndDefenceBase/DefenceBase/AfterValue").GetComponent(Text);
	var magicValueText : Text = mainDisplayBase.transform.FindChild("StatusBBase/MagicAndSpeedBase/MagicBase/CurrentValue").GetComponent(Text);
	var magicAfterValueText : Text = mainDisplayBase.transform.FindChild("StatusBBase/MagicAndSpeedBase/MagicBase/AfterValue").GetComponent(Text);
	var speedValueText : Text = mainDisplayBase.transform.FindChild("StatusBBase/MagicAndSpeedBase/SpeedBase/CurrentValue").GetComponent(Text);
	var speedAfterValueText : Text = mainDisplayBase.transform.FindChild("StatusBBase/MagicAndSpeedBase/SpeedBase/AfterValue").GetComponent(Text);
	
	var entity : CharacterMasterEntity = CharacterMasterDao.selectByPk(1);
	
	var characterIcon : GameObject;
	var nameBar : GameObject;
	var characterName = entity.getCharacterName();
	if (characterName == "tsuyoshi") {
		characterIcon = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "tsuyoshiIcon"), Vector2 (70f, -36f), Quaternion.identity);
		nameBar = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "tsuyoshiNameBar"), Vector2 (-138f, -60f), Quaternion.identity);
	} else if (characterName == "emo") {
		// TODO
	} else if (characterName == "hikari") {
		// TODO
	} else if (characterName == "takeru") {
		// TODO
	} else if (characterName == "kori") {
		// TODO
	} else if (characterName == "aguresu") {
		// TODO
	} else if (characterName == "mokumoku") {
		// TODO
	} else if (characterName == "funa") {
		// TODO
	}
	childAllDestory(characterIconBase);
	characterIcon.transform.SetParent(characterIconBase.transform);
	characterIcon.transform.localScale = Vector2 (1.0f, 1.0f);
	nameBar.transform.SetParent(mainDisplayBase.transform);
	characterNameText.text = entity.getUserCharacterName();
	
	levelValueText.text = ("" + entity.getLevel()).PadLeft(2);
	hpCurrentValueText.text = ("" + entity.getCurrentHp()).PadLeft(3);
	hpMaxValueText.text = ("" + entity.getMaxHp()).PadLeft(3);
	mpCurrentValueText.text = ("" + entity.getCurrentMp()).PadLeft(3);
	mpMaxValueText.text = ("" + entity.getMaxMp()).PadLeft(3);
	
	powerValueText.text = ("" + entity.getPower()).PadLeft(3);
	// TODO
	powerAfterValueText.text = ("" + entity.getPower()).PadLeft(3);
	defenceValueText.text = ("" + entity.getDefense()).PadLeft(3);
	// TODO
	defenceAfterValueText.text = ("" + entity.getDefense()).PadLeft(3);
	magicValueText.text = ("" + entity.getMagic()).PadLeft(3);
	// TODO
	magicAfterValueText.text = ("" + entity.getMagic()).PadLeft(3);
	speedValueText.text = ("" + entity.getSpeed()).PadLeft(3);
	// TODO
	speedAfterValueText.text = ("" + entity.getSpeed()).PadLeft(3);

	if (entity.getWeaponId() == null) {
		weaponValueText.text = "";
	} else {
		weaponValueText.text = "" + ItemMasterDao.selectByPkItemName(entity.getWeaponId());
	}
	if (entity.getClothesId() == null) {
		clothesValueText.text = "";
	} else {
		clothesValueText.text = "" + ItemMasterDao.selectByPkItemName(entity.getClothesId());
	}
	if (entity.getShoesId() == null) {
		shoesValueText.text = "";
	} else {
		shoesValueText.text = "" + ItemMasterDao.selectByPkItemName(entity.getShoesId());
	}
	if (entity.getHatId() == null) {
		hatValueText.text = "";
	} else {
		hatValueText.text = "" + ItemMasterDao.selectByPkItemName(entity.getHatId());
	}
	if (entity.getFopperyId() == null) {
		fopperyValueText.text = "";
	} else {
		fopperyValueText.text = "" + ItemMasterDao.selectByPkItemName(entity.getFopperyId());
	}
	
	var descriptionText : Text = this.transform.FindChild("Body/Layer3_EquipmentMenu/SideDisplayBase/Text").GetComponent(Text);
	var entityList : List.<BltItmEntity> = BelongingsTransactionDao.selectEquipmentJoinItemMaster();
	createEquipmentMenuRow(inObj, entityList, "MainDisplayBase/ItemListBase", descriptionText);
	
	StartCoroutine(fadeOutIn(outObj, inObj));
}

function onLayer2SettingButtonClick() {
	var outObj : GameObject = objDic["Layer2_MainMenu"];
	var inObj : GameObject = objDic["Layer3_SettingSelectMenu"];
	StartCoroutine(fadeOutIn(outObj, inObj));
}

function onLayer2SkillButtonClick() {
	var outObj : GameObject = objDic["Layer2_MainMenu"];
	var inObj : GameObject = objDic["Layer3_SkillSelectMenu"];
	StartCoroutine(fadeOutIn(outObj, inObj));
}

function onLayer2StatusButtonClick() {
	var outObj : GameObject = objDic["Layer2_MainMenu"];
	var inObj : GameObject = objDic["Layer3_BasicStatusMenu"];
	var mainDisplayBase : GameObject = inObj.transform.FindChild("BasicStatusMainDisplayBase").gameObject;
	var characterIconBase : GameObject = mainDisplayBase.transform.FindChild("CharacterIconBase").gameObject;
	var characterNameText : Text = mainDisplayBase.transform.FindChild("CharacterName").GetComponent(Text);
	var characterTypeText : Text = mainDisplayBase.transform.FindChild("CharacterType").GetComponent(Text);
	var statusIconBase : GameObject = mainDisplayBase.transform.FindChild("StatusIconBase").gameObject;
	var levelValueText : Text = mainDisplayBase.transform.FindChild("StatusABase/LevelBase/Value").GetComponent(Text);
	var hpCurrentValueText : Text = mainDisplayBase.transform.FindChild("StatusABase/HpMpBase/HpBase/CurrentValue").GetComponent(Text);
	var hpMaxValueText : Text = mainDisplayBase.transform.FindChild("StatusABase/HpMpBase/HpBase/MaxValue").GetComponent(Text);
	var mpCurrentValueText : Text = mainDisplayBase.transform.FindChild("StatusABase/HpMpBase/MpBase/CurrentValue").GetComponent(Text);
	var mpMaxValueText : Text = mainDisplayBase.transform.FindChild("StatusABase/HpMpBase/MpBase/MaxValue").GetComponent(Text);
	var experienceTotalValueText : Text = mainDisplayBase.transform.FindChild("StatusABase/ExperienceTotalBase/Value").GetComponent(Text);
	var nextLevelValueText : Text = mainDisplayBase.transform.FindChild("StatusABase/NextLevelBase/Value").GetComponent(Text);
	var powerValueText : Text = mainDisplayBase.transform.FindChild("StatusBBase/PowerBase/Value").GetComponent(Text);
	var defenceValueText : Text = mainDisplayBase.transform.FindChild("StatusBBase/DefenceBase/Value").GetComponent(Text);
	var magicValueText : Text = mainDisplayBase.transform.FindChild("StatusBBase/MagicBase/Value").GetComponent(Text);
	var speedValueText : Text = mainDisplayBase.transform.FindChild("StatusBBase/SpeedBase/Value").GetComponent(Text);
	var weaponValueText : Text = mainDisplayBase.transform.FindChild("EquipmentBase/WeaponBase/Value").GetComponent(Text);
	var clothesValueText : Text = mainDisplayBase.transform.FindChild("EquipmentBase/ClothesBase/Value").GetComponent(Text);
	var shoesValueText : Text = mainDisplayBase.transform.FindChild("EquipmentBase/ShoesBase/Value").GetComponent(Text);
	var hatValueText : Text = mainDisplayBase.transform.FindChild("EquipmentBase/HatBase/Value").GetComponent(Text);
	var fopperyValueText : Text = mainDisplayBase.transform.FindChild("EquipmentBase/FopperyBase/Value").GetComponent(Text);
	
	childAllDestory(characterIconBase);
	childAllDestory(statusIconBase);
	var entity : CharacterMasterEntity = CharacterMasterDao.selectByPk(1);
	
	var characterIcon : GameObject;
	var nameBar : GameObject;
	var characterName = entity.getCharacterName();
	if (characterName == "tsuyoshi") {
		characterIcon = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "tsuyoshiIcon"), Vector2 (70f, -36f), Quaternion.identity);
		nameBar = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "tsuyoshiNameBar"), Vector2 (-138f, -60f), Quaternion.identity);
	} else if (characterName == "emo") {
		// TODO
	} else if (characterName == "hikari") {
		// TODO
	} else if (characterName == "takeru") {
		// TODO
	} else if (characterName == "kori") {
		// TODO
	} else if (characterName == "aguresu") {
		// TODO
	} else if (characterName == "mokumoku") {
		// TODO
	} else if (characterName == "funa") {
		// TODO
	}
	characterIcon.transform.SetParent(characterIconBase.transform);
	characterIcon.transform.localScale = Vector2 (1.5f, 1.5f);
	nameBar.transform.SetParent(mainDisplayBase.transform);
	characterIcon.transform.localPosition = Vector2 (-138f, -60f);
	characterIcon.transform.localScale = Vector2 (1.5f, 1.5f);
	characterNameText.text = entity.getUserCharacterName();
	characterTypeText.text = entity.getCharacterType();
	if (entity.getStatusDead()) {
		var statusDeadIcon : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "statusDeadIcon"), Vector2 (0f, 0f), Quaternion.identity);
		statusDeadIcon.transform.SetParent(statusIconBase.transform);
	}
	if (entity.getStatusConfusion()) {
		var statusConfusionIcon : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "statusConfusionIcon"), Vector2 (0f, 0f), Quaternion.identity);
		statusConfusionIcon.transform.SetParent(statusIconBase.transform);
	}
	if (entity.getStatusPoison()) {
		var statusPoisonIcon : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "statusPoisonIcon"), Vector2 (0f, 0f), Quaternion.identity);
		statusPoisonIcon.transform.SetParent(statusIconBase.transform);
	}
	if (entity.getStatusParalysis()) {
		var statusParalysisIcon : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "statusParalysisIcon"), Vector2 (0f, 0f), Quaternion.identity);
		statusParalysisIcon.transform.SetParent(statusIconBase.transform);
	}
	
	levelValueText.text = ("" + entity.getLevel()).PadLeft(2);
	hpCurrentValueText.text = ("" + entity.getCurrentHp()).PadLeft(3);
	hpMaxValueText.text = ("" + entity.getMaxHp()).PadLeft(3);
	mpCurrentValueText.text = ("" + entity.getCurrentMp()).PadLeft(3);
	mpMaxValueText.text = ("" + entity.getMaxMp()).PadLeft(3);
	experienceTotalValueText.text = "" + entity.getExperiencePoint();
	// TODO
	nextLevelValueText.text = "";
	
	powerValueText.text = ("" + entity.getPower()).PadLeft(3);
	defenceValueText.text = ("" + entity.getDefense()).PadLeft(3);
	magicValueText.text = ("" + entity.getMagic()).PadLeft(3);
	speedValueText.text = ("" + entity.getSpeed()).PadLeft(3);

	if (entity.getWeaponId() == null) {
		weaponValueText.text = "";
	} else {
		weaponValueText.text = "" + ItemMasterDao.selectByPkItemName(entity.getWeaponId());
	}
	if (entity.getClothesId() == null) {
		clothesValueText.text = "";
	} else {
		clothesValueText.text = "" + ItemMasterDao.selectByPkItemName(entity.getClothesId());
	}
	if (entity.getShoesId() == null) {
		shoesValueText.text = "";
	} else {
		shoesValueText.text = "" + ItemMasterDao.selectByPkItemName(entity.getShoesId());
	}
	if (entity.getHatId() == null) {
		hatValueText.text = "";
	} else {
		hatValueText.text = "" + ItemMasterDao.selectByPkItemName(entity.getHatId());
	}
	if (entity.getFopperyId() == null) {
		fopperyValueText.text = "";
	} else {
		fopperyValueText.text = "" + ItemMasterDao.selectByPkItemName(entity.getFopperyId());
	}
	
	StartCoroutine(fadeOutIn(outObj, inObj));
}

function onLayer2SaveButtonClick() {
	var outObj : GameObject = objDic["Layer2_MainMenu"];
	var inObj : GameObject = objDic["Layer3_SaveMenu"];
	var recordingMasterEntity : RecordingMasterEntity = RecordingMasterDao.select();
	var sceneMasterEntity : SceneMasterEntity = SceneMasterDao.selectByPk(recordingMasterEntity.getSceneId());
	var teamMasterEntity : TeamMasterEntity = TeamMasterDao.select();
	var entityList = new List.<CharacterMasterEntity>();

	entityList.Add(CharacterMasterDao.selectByPk(teamMasterEntity.getCharacterId1()));
	if (teamMasterEntity.getCharacterId2() != null && teamMasterEntity.getCharacterId2() != 0) {
		entityList.Add(CharacterMasterDao.selectByPk(teamMasterEntity.getCharacterId2()));
	}
	if (teamMasterEntity.getCharacterId3() != null && teamMasterEntity.getCharacterId3() != 0) {
		entityList.Add(CharacterMasterDao.selectByPk(teamMasterEntity.getCharacterId3()));
	}
	if (teamMasterEntity.getCharacterId4() != null && teamMasterEntity.getCharacterId4() != 0) {
		entityList.Add(CharacterMasterDao.selectByPk(teamMasterEntity.getCharacterId4()));
	}
	
	var teamBase : Transform = inObj.transform.FindChild("MainDisplayBase/SubBase/TeamBase");
	childAllDestory(teamBase.gameObject);
	for (var entity : CharacterMasterEntity in entityList) {
		var faceIcon : GameObject;
		var characterName = entity.getCharacterName();
		if (characterName == "tsuyoshi") {
			faceIcon = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "tsuyoshiIconBase"), Vector2 (50f, 86f), Quaternion.identity);
		} else if (characterName == "emo") {
			// TODO
		} else if (characterName == "hikari") {
			// TODO
		} else if (characterName == "takeru") {
			// TODO
		} else if (characterName == "kori") {
			// TODO
		} else if (characterName == "aguresu") {
			// TODO
		} else if (characterName == "mokumoku") {
			// TODO
		} else if (characterName == "funa") {
			// TODO
		}
		
		var levelText : Text = faceIcon.transform.FindChild("CharacterBottomBase/LevelValue").GetComponent(Text);
		levelText.text = ("" + entity.getLevel()).PadLeft(2);
		faceIcon.transform.SetParent(teamBase);
		faceIcon.transform.Rotate(0, 0, 270);
		faceIcon.transform.localScale = Vector2 (1.0f, 1.0f);
	}
	var hourText : Text = inObj.transform.FindChild("MainDisplayBase/SubBase/TimeBase/HourText").GetComponent(Text);
	var minuteText : Text = inObj.transform.FindChild("MainDisplayBase/SubBase/TimeBase/MinuteText").GetComponent(Text);
	var locationNameText : Text = inObj.transform.FindChild("MainDisplayBase/SubBase/LocationName").GetComponent(Text);
	hourText.text = ("" + recordingMasterEntity.getTotalTimeHour()).PadLeft(2);
	minuteText.text = String.Format("{0,0:D2}", recordingMasterEntity.getTotalTimeMinute());
	locationNameText.text = sceneMasterEntity.getSceneName();
	StartCoroutine(fadeOutIn(outObj, inObj));
}

function onLayer3ItemMenuExhaustionTabClick() {
	var outObj : GameObject = objDic["Layer2_MainMenu"];
	var inObj : GameObject = objDic["Layer3_ItemMenu"];
	var descriptionText : Text = this.transform.FindChild("Body/Layer3_ItemMenu/SideDisplayBase/Text").GetComponent(Text);
	var entityList : List.<BltItmEntity> = BelongingsTransactionDao.selectExhaustionJoinItemMaster();
	createItemMenuRow(inObj, entityList, "MainDisplayBase", descriptionText);
}

function onLayer3ItemMenuEquipmentTabClick() {
	var outObj : GameObject = objDic["Layer2_MainMenu"];
	var inObj : GameObject = objDic["Layer3_ItemMenu"];
	var descriptionText : Text = this.transform.FindChild("Body/Layer3_ItemMenu/SideDisplayBase/Text").GetComponent(Text);
	var entityList : List.<BltItmEntity> = BelongingsTransactionDao.selectEquipmentJoinItemMaster();
	createEquipmentMenuRow(inObj, entityList, "MainDisplayBase", descriptionText);
}

function onLayer3ItemMenuImportantTabClick() {
	var outObj : GameObject = objDic["Layer2_MainMenu"];
	var inObj : GameObject = objDic["Layer3_ItemMenu"];
	var descriptionText : Text = this.transform.FindChild("Body/Layer3_ItemMenu/SideDisplayBase/Text").GetComponent(Text);
	var entityList : List.<BltItmEntity> = BelongingsTransactionDao.selectImportantJoinItemMaster();
	createItemMenuRow(inObj, entityList, "MainDisplayBase", descriptionText);
}

function onLayer3ItemMenuSortButtonClick(test : String) {
	Debug.Log("onLayer3ItemMenuSortButtonClick");
}

function onLayer3EquipmentMenuStrongestEquipmentTabClick() {
	Debug.Log("onLayer3EquipmentMenuStrongestEquipmentTabClick");
}

function onLayer3EquipmentMenuAllRemoveTabClick() {
	var entity : CharacterMasterEntity = CharacterMasterDao.selectByPk(1);
	entity.setWeaponId(0);
	entity.setClothesId(0);
	entity.setShoesId(0);
	entity.setHatId(0);
	entity.setFopperyId(0);
	CharacterMasterDao.update(entity);
	onLayer2EquipmentButtonClick();
}

function onLayer3EquipmentMenuSortButtonClick() {
	Debug.Log("onLayer3EquipmentMenuSortButtonClick");
}

function onLayer3SkillSelectMenuSkillUseClick() {
	
	var inObj : GameObject = objDic["Layer4_SkillMenu"];
	var entityList : List.<CskSkmEntity> = CharacterSkillTransactionDao.selectByCharacterId(1);
	createSkillMenuRow(inObj, entityList);
	StartCoroutine(fadeOutIn(currentMenuObj, inObj));
}

function onLayer3SkillSelectMenuMagicBookClick() {
	Debug.Log("onLayer3SkillSelectMenuMagicBookClick");
}

function onLayer3StatusMenuBasicStatusTabClick() {
	var inObj : GameObject = objDic["Layer3_BasicStatusMenu"];
	StartCoroutine(fadeOutIn(currentMenuObj, inObj, 0f, 0f));
}

function onLayer3StatusMenuMagicTabClick() {
	var entityList : List.<CskSkmEntity> = CharacterSkillTransactionDao.selectByCharacterIdAndSkillType(1, 0);
	var inObj : GameObject = objDic["Layer3_MagicStatusMenu"];
	createStatusMenuSkillRow(inObj, entityList);
	StartCoroutine(fadeOutIn(currentMenuObj, inObj, 0f, 0f));
}

function onLayer3StatusMenuSkillTabClick() {
	var entityList : List.<CskSkmEntity> = CharacterSkillTransactionDao.selectByCharacterIdAndSkillType(1, 1);
	var inObj : GameObject = objDic["Layer3_SkillStatusMenu"];
	createStatusMenuSkillRow(inObj, entityList);
	StartCoroutine(fadeOutIn(currentMenuObj, inObj, 0f, 0f));
}

function onLayer3StatusMenuSortButtonClick() {
	Debug.Log("onLayer3StatusMenuSortButtonClick");
}

function onLayer3SettingSelectMenuTeamEditClick() {
	var inObj : GameObject = objDic["Layer4_TeamEditMenu"];
	var teamMasterEntity : TeamMasterEntity = TeamMasterDao.select();
	var entityList = new List.<CharacterMasterEntity>();

	entityList.Add(CharacterMasterDao.selectByPk(teamMasterEntity.getCharacterId1()));
	if (teamMasterEntity.getCharacterId2() != null && teamMasterEntity.getCharacterId2() != 0) {
		entityList.Add(CharacterMasterDao.selectByPk(teamMasterEntity.getCharacterId2()));
	}
	if (teamMasterEntity.getCharacterId3() != null && teamMasterEntity.getCharacterId3() != 0) {
		entityList.Add(CharacterMasterDao.selectByPk(teamMasterEntity.getCharacterId3()));
	}
	if (teamMasterEntity.getCharacterId4() != null && teamMasterEntity.getCharacterId4() != 0) {
		entityList.Add(CharacterMasterDao.selectByPk(teamMasterEntity.getCharacterId4()));
	}
	
	var characterBaseObj : GameObject = inObj.transform.FindChild("MainDisplayBase/CharacterBase").gameObject;
	createChracterBase(characterBaseObj, entityList);
	StartCoroutine(fadeOutIn(currentMenuObj, inObj));
}

function onLayer3SettingSelectMenuArrowDirectionClick() {
	Debug.Log("onLayer3SettingSelectMenuArrowDirectionClick");
}

function onLayer3SettingSelectMenuDisplayAndSoundClick() {
	var inObj : GameObject = objDic["Layer4_DisplayAndSoundMenu"];
	var entity : SystemSettingMasterEntity = SystemSettingMasterDao.select();
	var watchOnButton : Button;
	var watchOffButton : Button;
	var batteryOnButton : Button;
	var batteryOffButton : Button;
	var soundOnButton : Button;
	var soundOffButton : Button;
	if (entity.getWatchFlg()) {
		watchOnButton = inObj.transform.FindChild("MainDisplayBase/MenuBase/WatchBase/OnBase").GetComponent(Button);
		watchOffButton = inObj.transform.FindChild("MainDisplayBase/MenuBase/WatchBase/OffBase").GetComponent(Button);
	} else {
		watchOnButton = inObj.transform.FindChild("MainDisplayBase/MenuBase/WatchBase/OffBase").GetComponent(Button);
		watchOffButton = inObj.transform.FindChild("MainDisplayBase/MenuBase/WatchBase/OnBase").GetComponent(Button);
	}
	if (entity.getBatteryFlg()) {
		batteryOnButton = inObj.transform.FindChild("MainDisplayBase/MenuBase/BatteryBase/OnBase").GetComponent(Button);
		batteryOffButton = inObj.transform.FindChild("MainDisplayBase/MenuBase/BatteryBase/OffBase").GetComponent(Button);
	} else {
		batteryOnButton = inObj.transform.FindChild("MainDisplayBase/MenuBase/BatteryBase/OffBase").GetComponent(Button);
		batteryOffButton = inObj.transform.FindChild("MainDisplayBase/MenuBase/BatteryBase/OnBase").GetComponent(Button);
	}
	if (entity.getSoundFlg()) {
		soundOnButton = inObj.transform.FindChild("MainDisplayBase/MenuBase/SoundBase/OnBase").GetComponent(Button);
		soundOffButton = inObj.transform.FindChild("MainDisplayBase/MenuBase/SoundBase/OffBase").GetComponent(Button);
	} else {
		soundOnButton = inObj.transform.FindChild("MainDisplayBase/MenuBase/SoundBase/OffBase").GetComponent(Button);
		soundOffButton = inObj.transform.FindChild("MainDisplayBase/MenuBase/SoundBase/OnBase").GetComponent(Button);
	}
	watchOnButton.colors.normalColor = new Color(1f, 1f, 1f, 30f / 255f);
	watchOffButton.colors.normalColor = new Color(1f, 1f, 1f, 0f);
	batteryOnButton.colors.normalColor = new Color(1f, 1f, 1f, 30f / 255f);
	batteryOffButton.colors.normalColor = new Color(1f, 1f, 1f, 0f);
	soundOnButton.colors.normalColor = new Color(1f, 1f, 1f, 30f / 255f);
	soundOffButton.colors.normalColor = new Color(1f, 1f, 1f, 0f);
	
	var buttonController : DisplaySoundButtonController = inObj.transform.FindChild("MainDisplayBase").GetComponent(DisplaySoundButtonController);
	buttonController.setWatchFlg(entity.getWatchFlg());
	buttonController.setBatteryFlg(entity.getBatteryFlg());
	buttonController.setSoundFlg(entity.getSoundFlg());
	
	StartCoroutine(fadeOutIn(currentMenuObj, inObj));
}

function onLayer3SettingSelectMenuHelpClick() {
	Debug.Log("onLayer3SettingSelectMenuHelpClick");
}

function onLayer3SaveMenuOkClick() {
	SaveUtil.save();
	onPrevious();
}

function onLayer3SaveMenuNoClick() {
	onPrevious();
}

function onLayer4SkillMenuCharacterATabClick() {
	var inObj : GameObject = objDic["Layer4_SkillMenu"];
	var entityList : List.<CskSkmEntity> = CharacterSkillTransactionDao.selectByCharacterId(1);
	createSkillMenuRow(inObj, entityList);
}

function onLayer4SkillMenuCharacterBTabClick() {
	var inObj : GameObject = objDic["Layer4_SkillMenu"];
	var entityList : List.<CskSkmEntity> = CharacterSkillTransactionDao.selectByCharacterId(2);
	createSkillMenuRow(inObj, entityList);
}

function onLayer4SkillMenuCharacterCTabClick() {
	var inObj : GameObject = objDic["Layer4_SkillMenu"];
	var entityList : List.<CskSkmEntity> = CharacterSkillTransactionDao.selectByCharacterId(3);
	createSkillMenuRow(inObj, entityList);
}

function onLayer4SkillMenuCharacterDTabClick() {
	var inObj : GameObject = objDic["Layer4_SkillMenu"];
	var entityList : List.<CskSkmEntity> = CharacterSkillTransactionDao.selectByCharacterId(4);
	createSkillMenuRow(inObj, entityList);
}

function onLayer4SkillMenuSortButtonClick() {
	Debug.Log("onLayer4SkillMenuSortButtonClick");
}

private function watch() {
	watchFlg = true;
	var longNeedle : GameObject = this.transform.FindChild("Body/Layer2_SideMenu/SideMenu/WatchBase/LongNeedle").gameObject;
	var shortNeedle : GameObject = this.transform.FindChild("Body/Layer2_SideMenu/SideMenu/WatchBase/ShortNeedle").gameObject;
	var tmpHour = 0.0f;
	var tmpMinute = 0.0f;
	while (watchFlg) {
		var now : System.DateTime = System.DateTime.Now;
		var hour : double = now.Hour;
		var minute : double = now.Minute;

		if (hour > 12.0) {
			hour = hour -12.0;
		}
		
		var minuteRotation : double = -360.0 / 60.0 * minute;
		var hourRotation : double = -360.0 / 12.0 * hour;
		var hourMinuteRotation : double = -30.0 / 60.0 * minute;
		if (tmpMinute != minute) {
			longNeedle.transform.rotation = Quaternion.Euler(0.0f, 0.0f, minuteRotation);
		}
		if (tmpHour != hour) {
			shortNeedle.transform.rotation = Quaternion.Euler(0.0f, 0.0f, hourRotation + hourMinuteRotation);
		}
		
		tmpHour = hour;
		tmpMinute = minute;
		
		yield;
	}
}

public function fadeOutIn(outObj : GameObject, inObj : GameObject) {
	yield fadeOutIn(outObj, inObj, defaultFadeOutInterval, defaultFadeInInterval);
}

public function fadeOutIn(outObj : GameObject, inObj : GameObject, fadeOutInterval : float, fadeInInterval : float) {
	currentMenuObj = inObj;
	var outCg : CanvasGroup = outObj.GetComponent("CanvasGroup");
	var time : float = 0;
	while (time < fadeOutInterval)
	{
	    outCg.alpha = Mathf.Lerp(1f, 0f, time / fadeOutInterval);
	    time += Time.deltaTime;
	    yield null;
	}
	
	outCg.alpha = 0f;
	outObj.active = false;
	inObj.active = true;
	
	var inCg : CanvasGroup = inObj.GetComponent("CanvasGroup");
	time = 0;
	while (time < fadeInInterval)
	{
	    inCg.alpha = Mathf.Lerp(0f, 1f, time / fadeInInterval);
	    time += Time.deltaTime;
	    yield null;
	}
	
	inCg.alpha = 1f;
}

public function fadeIn(obj : GameObject) {
	var cg : CanvasGroup = obj.GetComponent("CanvasGroup");
	var time : float = 0;
	while (time <= defaultFadeInInterval)
	{
	    cg.alpha = Mathf.Lerp(0f, 1f, time / defaultFadeInInterval);
	    time += Time.deltaTime;
	    yield null;
	}
	
	obj.active = true;
	cg.alpha = 1f;
}

public function fadeOut(obj : GameObject) {
	var cg : CanvasGroup = obj.GetComponent("CanvasGroup");
	var time : float = 0;
	while (time <= defaultFadeOutInterval)
	{
	    cg.alpha = Mathf.Lerp(1f, 0f, time / defaultFadeOutInterval);
	    time += Time.deltaTime;
	    yield null;
	}
	
	obj.active = false;
	cg.alpha = 0f;
}

private function createChracterBase(characterBaseObj : GameObject, entityList : List.<CharacterMasterEntity>) {
	childAllDestory(characterBaseObj);
	
	var count : int = 0;
	for (var entity : CharacterMasterEntity in entityList) {
		count++;
		var characterBase : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "characterBase"), Vector2 (0f, 0f), Quaternion.identity);
		var faceIcon : GameObject;
		var characterName = entity.getCharacterName();
		if (characterName == "tsuyoshi") {
			faceIcon = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "tsuyoshiFaceIcon"), Vector2 (50f, 86f), Quaternion.identity);
		} else if (characterName == "emo") {
			// TODO
		} else if (characterName == "hikari") {
			// TODO
		} else if (characterName == "takeru") {
			// TODO
		} else if (characterName == "kori") {
			// TODO
		} else if (characterName == "aguresu") {
			// TODO
		} else if (characterName == "mokumoku") {
			// TODO
		} else if (characterName == "funa") {
			// TODO
		}
		faceIcon.transform.Rotate(0, 0, 90);
		faceIcon.transform.SetParent(characterBase.transform);
		
		var statusCount : int = 0;
		var statusRow1 : GameObject = characterBase.transform.FindChild("StatusRow1").gameObject;
		var statusRow2 : GameObject = characterBase.transform.FindChild("StatusRow2").gameObject;
		var statusRow3 : GameObject = characterBase.transform.FindChild("StatusRow3").gameObject;
		if (entity.getStatusDead()) {
			var statusDeadIcon : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "statusDeadIcon"), Vector2 (0f, 0f), Quaternion.identity);
			statusDeadIcon.transform.SetParent(statusRow1.transform);
			statusDeadIcon.transform.Rotate(0, 0, 90);
			statusCount++;
		}
		if (entity.getStatusConfusion()) {
			var statusConfusionIcon : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "statusConfusionIcon"), Vector2 (0f, 0f), Quaternion.identity);
			statusConfusionIcon.transform.SetParent(statusRow1.transform);
			statusConfusionIcon.transform.Rotate(0, 0, 90);
			statusCount++;
		}
		if (entity.getStatusPoison()) {
			var statusPoisonIcon : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "statusPoisonIcon"), Vector2 (0f, 0f), Quaternion.identity);
			if (statusCount < 2) {
				statusPoisonIcon.transform.SetParent(statusRow1.transform);
			} else {
				statusPoisonIcon.transform.SetParent(statusRow2.transform);
			}
			statusPoisonIcon.transform.Rotate(0, 0, 90);
			statusCount++;
		}
		if (entity.getStatusParalysis()) {
			var statusParalysisIcon : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "statusParalysisIcon"), Vector2 (0f, 0f), Quaternion.identity);
			if (statusCount < 2) {
				statusParalysisIcon.transform.SetParent(statusRow1.transform);
			} else {
				statusParalysisIcon.transform.SetParent(statusRow2.transform);
			}
			statusParalysisIcon.transform.Rotate(0, 0, 90);
			statusCount++;
		}
		
		var level = entity.getLevel();
		var currentHp = entity.getCurrentHp();
		var maxHp = entity.getMaxHp();
		var currentMp = entity.getCurrentMp();
		var maxMp = entity.getMaxMp();
		var currentHpBarWidth : float = 70 * currentHp / maxHp;
		var currentMpBarWidth : float = 70 * currentMp / maxMp;
		
		var hpBarCurrent : RectTransform = characterBase.transform.FindChild("HpBarCurrent") as RectTransform;
		var mpBarCurrent : RectTransform = characterBase.transform.FindChild("MpBarCurrent") as RectTransform;
		var textLevelValue : Text = characterBase.transform.FindChild("LevelValue").GetComponent(Text);
		var textHpValue : Text = characterBase.transform.FindChild("HpValue").GetComponent(Text);
		var textMpValue : Text = characterBase.transform.FindChild("MpValue").GetComponent(Text);
		
		hpBarCurrent.sizeDelta = Vector2 (currentHpBarWidth, 17);
		hpBarCurrent.localPosition = Vector2 (35, 16 - ((70 - currentHpBarWidth) / 2));
		mpBarCurrent.sizeDelta = Vector2 (currentMpBarWidth, 17);
		mpBarCurrent.localPosition = Vector2 (55, 16 - ((70 - currentMpBarWidth) / 2));
		
		textLevelValue.text = ("" + level).PadLeft(2);
		textHpValue.text = "" + currentHp;
		textMpValue.text = "" + currentMp; 
		
		
		characterBase.transform.SetParent(characterBaseObj.transform);
		
		characterBase.transform.localScale = Vector2 (1.0f, 1.0f);
		characterBase.transform.Rotate(0, 0, 270);
		characterBase.name = "characterBase" + count;
		
	}
}

private function createItemMenuRow(inObj : GameObject, entityList : List.<BltItmEntity>, basePath : String, descriptionText : Text) {
	var leftBaseObj : GameObject = inObj.transform.FindChild(basePath + "/ScrollDisplayBase/LeftBase").gameObject;
	var rightBaseObj : GameObject = inObj.transform.FindChild(basePath + "/ScrollDisplayBase/RightBase").gameObject;
	
	childAllDestory(leftBaseObj);
	childAllDestory(rightBaseObj);
	descriptionText.text = "";
	var count : int = 0;
	for (var entity : BltItmEntity in entityList) {
		count++;
		var itemMenuRow : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "itemMenuRow"), Vector2 (137.5f, -50.0f), Quaternion.identity);
		var textTitle : Text = itemMenuRow.transform.FindChild("TextTitle").GetComponent(Text);
		var textNumber : Text = itemMenuRow.transform.FindChild("TextNumber").GetComponent(Text);
		textTitle.text = entity.getItemName();

		textNumber.text = "×" + (("" + entity.getNumber()).PadLeft(2));
		if (count % 2 == 1) {
			itemMenuRow.transform.SetParent(leftBaseObj.transform);
		} else {
			itemMenuRow.transform.SetParent(rightBaseObj.transform);
		}
		
		itemMenuRow.transform.localScale = Vector2 (1.0f, 1.0f);
		itemMenuRow.name = "itemMenuRow" + count;
		
		var itemHolder : ItemHolder = itemMenuRow.GetComponent(ItemHolder);
		itemHolder.setDescriptionText(descriptionText);
		itemHolder.setItemId(entity.getItemId());
		itemHolder.setDescription(entity.getDescription());
		
	}
	
	if (count == 1) {
		var itemMenuRow2 : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "itemMenuRow"), Vector2 (137.5f, -50.0f), Quaternion.identity);
		var button : Button = itemMenuRow2.GetComponent(Button);
		var image : Image = itemMenuRow2.GetComponent(Image);
		var textTitle2 : Text = itemMenuRow2.transform.FindChild("TextTitle").GetComponent(Text);
		var textNumber2 : Text = itemMenuRow2.transform.FindChild("TextNumber").GetComponent(Text);
		Component.Destroy(button);
		Component.Destroy(image);
		textTitle2.text = " ";
		textNumber2.text = " ";
		itemMenuRow2.transform.SetParent(rightBaseObj.transform);
		itemMenuRow2.transform.localScale = Vector2 (1.0f, 1.0f);
		itemMenuRow2.name = "itemMenuRow2";
	}
}

private function createEquipmentMenuRow(inObj : GameObject, entityList : List.<BltItmEntity>, basePath : String, descriptionText : Text) {
	var leftBaseObj : GameObject = inObj.transform.FindChild(basePath + "/ScrollDisplayBase/LeftBase").gameObject;
	var rightBaseObj : GameObject = inObj.transform.FindChild(basePath + "/ScrollDisplayBase/RightBase").gameObject;
	
	childAllDestory(leftBaseObj);
	childAllDestory(rightBaseObj);
	descriptionText.text = "";
	var count : int = 0;
	for (var entity : BltItmEntity in entityList) {
		count++;
		var equipmentMenuRow : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "eqipmentMenuRow"), Vector2 (137.5f, -50.0f), Quaternion.identity);
		var itemType : int = entity.getItemType();
		var icon : GameObject;
		if (itemType == 1) {
			icon = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "weaponIcon"), Vector2 (0.0f, 0.0f), Quaternion.identity);
		} else if (itemType == 2) {
			icon = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "clothesIcon"), Vector2 (0.0f, 0.0f), Quaternion.identity);
		} else if (itemType == 3) {
			icon = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "shoesIcon"), Vector2 (0.0f, 0.0f), Quaternion.identity);
		} else if (itemType == 4) {
			icon = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "hatIcon"), Vector2 (0.0f, 0.0f), Quaternion.identity);
		} else if (itemType == 5) {
			icon = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "fopperyIcon"), Vector2 (0.0f, 0.0f), Quaternion.identity);
		}
		
		icon.transform.SetParent(equipmentMenuRow.transform);
		icon.transform.SetAsFirstSibling();
		
		var textTitle : Text = equipmentMenuRow.transform.FindChild("TextTitle").GetComponent(Text);
		var textNumber : Text = equipmentMenuRow.transform.FindChild("TextNumber").GetComponent(Text);
		textTitle.text = entity.getItemName();

		textNumber.text = "×" + (("" + entity.getNumber()).PadLeft(2));
		if (count % 2 == 1) {
			equipmentMenuRow.transform.SetParent(leftBaseObj.transform);
		} else {
			equipmentMenuRow.transform.SetParent(rightBaseObj.transform);
		}
		
		equipmentMenuRow.transform.localScale = Vector2 (1.0f, 1.0f);
		equipmentMenuRow.name = "equipmentMenuRow" + count;
		
		var itemHolder : ItemHolder = equipmentMenuRow.GetComponent(ItemHolder);
		itemHolder.setDescriptionText(descriptionText);
		itemHolder.setItemId(entity.getItemId());
		itemHolder.setDescription(entity.getDescription());
		
	}
	
	if (count == 1) {
		var equipmentMenuRow2 : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "eqipmentMenuRow"), Vector2 (137.5f, -50.0f), Quaternion.identity);
		var button : Button = equipmentMenuRow2.GetComponent(Button);
		var image : Image = equipmentMenuRow2.GetComponent(Image);
		var textTitle2 : Text = equipmentMenuRow2.transform.FindChild("TextTitle").GetComponent(Text);
		var textNumber2 : Text = equipmentMenuRow2.transform.FindChild("TextNumber").GetComponent(Text);
		Component.Destroy(button);
		Component.Destroy(image);
		textTitle2.text = " ";
		textNumber2.text = " ";
		equipmentMenuRow2.transform.SetParent(rightBaseObj.transform);
		equipmentMenuRow2.transform.localScale = Vector2 (1.0f, 1.0f);
		equipmentMenuRow2.name = "itemMenuRow2";
	}
}

private function createSkillMenuRow(inObj : GameObject, entityList : List.<CskSkmEntity>) {
	var leftBaseObj : GameObject = inObj.transform.FindChild("MainDisplayBase/ScrollDisplayBase/LeftBase").gameObject;
	var rightBaseObj : GameObject = inObj.transform.FindChild("MainDisplayBase/ScrollDisplayBase/RightBase").gameObject;
	var descriptionText : Text = this.transform.FindChild("Body/Layer4_SkillMenu/SideDisplayBase/Text").GetComponent(Text);
	childAllDestory(leftBaseObj);
	childAllDestory(rightBaseObj);
	descriptionText.text = "";
	var count : int = 0;
	for (var entity : CskSkmEntity in entityList) {
		count++;
		var skillMenuRow : GameObject;
		if (entity.getSkillType() == 0) {
			skillMenuRow = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "skillMenuMagicRow"), Vector2 (137.5f, -50.0f), Quaternion.identity);
		} else {
			skillMenuRow = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "skillMenuSkillRow"), Vector2 (137.5f, -50.0f), Quaternion.identity);
		}
		var name : Text = skillMenuRow.transform.FindChild("Name").GetComponent(Text);
		var mpValue : Text = skillMenuRow.transform.FindChild("MpValue").GetComponent(Text);
		name.text = entity.getSkillName();

		mpValue.text = ("" + entity.getMp()).PadLeft(2);
		if (count % 2 == 1) {
			skillMenuRow.transform.SetParent(leftBaseObj.transform);
		} else {
			skillMenuRow.transform.SetParent(rightBaseObj.transform);
		}
		
		skillMenuRow.transform.localScale = Vector2 (1.0f, 1.0f);
		skillMenuRow.name = "skillMenuRow" + count;
		
		var skillHolder : SkillHolder = skillMenuRow.GetComponent(SkillHolder);
		skillHolder.setDescriptionText(descriptionText);
		skillHolder.setSkillId(entity.getSkillId());
		skillHolder.setDescription(entity.getDescription());
		
	}
	
	if (count == 1) {
		var skillMenuRow2 : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "skillMenuMagicRow"), Vector2 (137.5f, -50.0f), Quaternion.identity);
		var button : Button = skillMenuRow2.GetComponent(Button);
		var image : Image = skillMenuRow2.GetComponent(Image);
		var name2 : Text = skillMenuRow2.transform.FindChild("Name").GetComponent(Text);
		var mpValue2 : Text = skillMenuRow2.transform.FindChild("MpValue").GetComponent(Text);
		Component.Destroy(button);
		Component.Destroy(image);
		Component.Destroy(skillMenuRow2.transform.FindChild("TypeIcon").GetComponent(Image));
		Component.Destroy(skillMenuRow2.transform.FindChild("MpTitle").GetComponent(Text));
		name2.text = " ";
		mpValue2.text = " ";
		skillMenuRow2.transform.SetParent(rightBaseObj.transform);
		skillMenuRow2.transform.localScale = Vector2 (1.0f, 1.0f);
		skillMenuRow2.name = "skillMenuRow2";
	}
}

private function createStatusMenuSkillRow(inObj : GameObject, entityList : List.<CskSkmEntity>) {
	var leftBaseObj : GameObject = inObj.transform.FindChild("MainDisplayBase/ScrollDisplayBase/LeftBase").gameObject;
	var rightBaseObj : GameObject = inObj.transform.FindChild("MainDisplayBase/ScrollDisplayBase/RightBase").gameObject;
	childAllDestory(leftBaseObj);
	childAllDestory(rightBaseObj);
	var count : int = 0;
	for (var entity : CskSkmEntity in entityList) {
		count++;
		var statusMenuSkillRow : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "statusMenuSkillRow"), Vector2 (145.9476f, -40.5f), Quaternion.identity);
		var textName : Text = statusMenuSkillRow.transform.FindChild("Name").GetComponent(Text);
		var textMpValue : Text = statusMenuSkillRow.transform.FindChild("MpValue").GetComponent(Text);
		textName.text = entity.getSkillName();

		textMpValue.text = ("" + entity.getMp()).PadLeft(2);
		if (count % 2 == 1) {
			statusMenuSkillRow.transform.SetParent(leftBaseObj.transform);
		} else {
			statusMenuSkillRow.transform.SetParent(rightBaseObj.transform);
		}
		
		statusMenuSkillRow.transform.localScale = Vector2 (1.0f, 1.0f);
		statusMenuSkillRow.name = "statusMenuSkillRow" + count;
		
	}
	
	if (count == 1) {
		var statusMenuSkillRow2 : GameObject = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "statusMenuSkillRow"), Vector2 (145.9476f, -40.5f), Quaternion.identity);
		var textName2 : Text = statusMenuSkillRow2.transform.FindChild("Name").GetComponent(Text);
		var textMpValue2 : Text = statusMenuSkillRow2.transform.FindChild("MpValue").GetComponent(Text);
		var textTitle2 : Text = statusMenuSkillRow2.transform.FindChild("MpTitle").GetComponent(Text);
		textName2.text = " ";
		textMpValue2.text = " ";
		textTitle2.text = " ";
		statusMenuSkillRow2.transform.SetParent(rightBaseObj.transform);
		statusMenuSkillRow2.transform.localScale = Vector2 (1.0f, 1.0f);
		statusMenuSkillRow2.name = "statusMenuSkillRow2";
	}
}

private function childAllDestory(obj : GameObject) {

	for (var tf : Transform in obj.transform) {
		GameObject.Destroy(tf.gameObject);
	}
}

