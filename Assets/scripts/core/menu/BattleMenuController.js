#pragma strict

private var objDic : Dictionary.<String, GameObject> = new Dictionary.<String, GameObject>();

private var defaultFadeInInterval : float = 0.2f;
private var defaultFadeOutInterval : float = 0.2f;
private var currentMenuObj : GameObject;

private var labInstance : LoadAssetBandles;
private var amInstance : AudioManager;

private var characterActionHolderList : List.<CharacterActionHolder>;
private var enemyActionHolderDic : Dictionary.<String, EnemyActionHolder> = new Dictionary.<String, EnemyActionHolder>();

// 現在のコマンド選択キャラクタ順
private var currentNo : int = 0;
// キャラの生存数
private var alivedNum : int = 0;

private var selectEnemyId : String;

private var turnNum : int = 0;


function Start () {
	labInstance = LoadAssetBandles.getInstance();
	amInstance = FindObjectOfType(AudioManager);
	objDic["Layer1_BaseMenu"] = this.transform.FindChild("Body/Layer1_BaseMenu").gameObject;
	objDic["Layer1_CharacterBase"] = this.transform.FindChild("Body/Layer1_BaseMenu/CharacterBase").gameObject;
	objDic["Layer1_CharacterControlBase"] = this.transform.FindChild("Body/Layer1_BaseMenu/CharacterControlBase").gameObject;
	objDic["Layer1_MainMenu"] = this.transform.FindChild("Body/Layer1_BaseMenu/MainMenu").gameObject;
	objDic["Layer2_MagicAndSkillMenu"] = this.transform.FindChild("Body/Layer2_MagicAndSkillMenu").gameObject;
	objDic["Layer2_ItemMenu"] = this.transform.FindChild("Body/Layer2_ItemMenu").gameObject;
	objDic["Layer3_WaterBottleMenu"] = this.transform.FindChild("Body/Layer3_WaterBottleMenu").gameObject;
	createChracterBase();
}

function Update () {
}

public function init() {
	// objDicからなぜか取得できない
	fadeIn(this.transform.FindChild("Body/Layer1_BaseMenu/MainMenu").gameObject, 0.0f);
	currentMenuObj = null;
}

function onLayer1AttackButtonClick() {
	if (currentMenuObj != null) {
		StartCoroutine(fadeOut(currentMenuObj));
	}

	var caHolder : CharacterActionHolder = characterActionHolderList[currentNo];
	caHolder.setType(BattleActionType.ATTACK);
	caHolder.setEnemyId(selectEnemyId);
	StartCoroutine(execute());
}

function onLayer1SkillButtonClick() {
	var caHolder : CharacterActionHolder = characterActionHolderList[currentNo];
	if (caHolder.isAlive()) {
		var inObj : GameObject = objDic["Layer2_MagicAndSkillMenu"];
		var id : int = caHolder.getCharacterMasterEntity().getCharacterId();
		// 初期表示は魔法を取得する。
		var entityList : List.<CskSkmEntity> = CharacterSkillTransactionDao.selectByCharacterIdAndSkillType(id, 1);
		createSkillRow(inObj, entityList);
		if (currentMenuObj == null) {
			StartCoroutine(fadeIn(inObj));
		} else {
			StartCoroutine(fadeOutIn(currentMenuObj, inObj));
		}

	} else {
		StartCoroutine(execute());
	}
}

function onLayer2MagicTabClick() {
	var caHolder : CharacterActionHolder = characterActionHolderList[currentNo];
	if (caHolder.isAlive()) {
		var inObj : GameObject = objDic["Layer2_MagicAndSkillMenu"];
		var id : int = caHolder.getCharacterMasterEntity().getCharacterId();
		var entityList : List.<CskSkmEntity> = CharacterSkillTransactionDao.selectByCharacterIdAndSkillType(id, 1);
		createSkillRow(inObj, entityList);

	}
}

function onLayer2SkillTabClick() {
	var caHolder : CharacterActionHolder = characterActionHolderList[currentNo];
	if (caHolder.isAlive()) {
		var inObj : GameObject = objDic["Layer2_MagicAndSkillMenu"];
		var id : int = caHolder.getCharacterMasterEntity().getCharacterId();
		var entityList : List.<CskSkmEntity> = CharacterSkillTransactionDao.selectByCharacterIdAndSkillType(id, 2);
		createSkillRow(inObj, entityList);

	}
}

function selectSkill(skillHolder : BattleSkillHolder) {
	var caHolder : CharacterActionHolder = characterActionHolderList[currentNo];
	if (caHolder.isAlive()) {
		caHolder.setType(BattleActionType.SKILL);
		caHolder.setEnemyId(selectEnemyId);
		caHolder.setSkillHolder(skillHolder);
		StartCoroutine(fadeOut(currentMenuObj));
		StartCoroutine(execute());		
	}
}

function selectItem(itemHolder : BattleItemHolder) {
	var caHolder : CharacterActionHolder = characterActionHolderList[currentNo];
	if (caHolder.isAlive()) {

		var entity : BltItmEntity = itemHolder.getEntity();
		if (entity.getItemId() == 1) {
			var inObj : GameObject = objDic["Layer3_WaterBottleMenu"];
			if (currentMenuObj == null) {
				StartCoroutine(fadeIn(inObj));
			} else {
				StartCoroutine(fadeOutIn(currentMenuObj, inObj));
			}

			return;
		}

		caHolder.setType(BattleActionType.ITEM);
		caHolder.setEnemyId(selectEnemyId);
		caHolder.setItemHolder(itemHolder);
		StartCoroutine(fadeOut(currentMenuObj));
		StartCoroutine(execute());		
	}
}

function selectWaterBottleAmount(scale : int) {
	var caHolder : CharacterActionHolder = characterActionHolderList[currentNo];
	if (caHolder.isAlive()) {
		caHolder.setType(BattleActionType.WATER_BOTTLE);
		caHolder.setWaterScale(scale);
		StartCoroutine(fadeOut(currentMenuObj));
		StartCoroutine(execute());		
	}
}

function onLayer1ItemButtonClick() {
	var inObj : GameObject = objDic["Layer2_ItemMenu"];
	var entityList : List.<BltItmEntity> = BelongingsTransactionDao.selectExhaustionJoinItemMaster();
	createItemMenuRow(inObj, entityList, "MainDisplayBase");
	if (currentMenuObj == null) {
		StartCoroutine(fadeIn(inObj));
	} else {
		StartCoroutine(fadeOutIn(currentMenuObj, inObj));
	}
	
	// TODO アイテム使用は未実装
//	characterActionHolderList[currentNo].setType(BattleActionType.ITEM);
//	currentNo++;
//	StartCoroutine(execute());
}

function onLayer1DefenceButtonClick() {
	if (currentMenuObj != null) {
		StartCoroutine(fadeOut(currentMenuObj));
	}
	
	characterActionHolderList[currentNo].setType(BattleActionType.DEFENCE);
	StartCoroutine(execute());
}

function onLayer1EscapeButtonClick() {
	if (currentMenuObj != null) {
		StartCoroutine(fadeOut(currentMenuObj));
	}
	
	// TODO とりあえず単純にランダム値にする
	var ran : float = Random.Range(1, 3);
	if (ran == 1) {
		finish();
	} else {
		var caHolder : CharacterActionHolder = characterActionHolderList[0];
		caHolder.setType(BattleActionType.ESCAPE);
		currentNo = characterActionHolderList.Count;
		StartCoroutine(execute());
	}
}

private function execute() {
	currentNo++;
	if (currentNo == characterActionHolderList.Count) {
		fadeOut(objDic["Layer1_MainMenu"]);
		var finishFlg : boolean = false;
		turnNum++;
		for (var characterHolder : CharacterActionHolder in characterActionHolderList){
			if (!characterHolder.isAlive()) {
				continue;
			}
			var recoveryCharacterHolder : CharacterActionHolder;
			var recoveryDamageObj : GameObject;
			var recoveryDamageDamageText : Text;
			var effectObj : GameObject;
			var animInfo : AnimatorStateInfo;
			var anim : Animator;
			var enemyHolder : EnemyActionHolder;
			var enemyObj : GameObject;
			var attackDamageObj : GameObject;
			var attackDamageText : Text;

			if (characterHolder.getType() == BattleActionType.ATTACK ||
					characterHolder.getType() == BattleActionType.SKILL) {
				anim = characterHolder.getAnim();
				if (characterHolder.getType() == BattleActionType.ATTACK) {
					anim.SetInteger("CommandType", 1);
				} else {
					if (characterHolder.getSkillHolder().getEntity().getSkillType == 1) {
						anim.SetInteger("CommandType", 2);
					} else {
						anim.SetInteger("CommandType", 3);
					}
				}

				enemyHolder = enemyActionHolderDic[characterHolder.getEnemyId()];
				if (!enemyHolder.isAlive()) {
					enemyHolder = enemyActionHolderDic[autoSelectEnemy()];
				}

				enemyObj = enemyHolder.getObj();
				attackDamageObj = enemyObj.transform.FindChild("AttackDamageBase").gameObject;
				attackDamageText = attackDamageObj.transform.FindChild("Text").GetComponent("Text");
				// TODO とりあえずcharacterHolder#characterNumはintでnullにならないから取っている
				recoveryCharacterHolder = characterActionHolderList[characterHolder.getCharacterNum()];
				recoveryDamageObj = recoveryCharacterHolder.getObj().transform.FindChild("RecoveryDamageBase").gameObject;
				recoveryDamageDamageText = recoveryDamageObj.transform.FindChild("Text").GetComponent("Text");

				while (true) {
					animInfo = anim.GetCurrentAnimatorStateInfo(0);
					if (animInfo.normalizedTime > 0.9f) {

						var attackFlg : boolean = true;

						if (characterHolder.getType() == BattleActionType.ATTACK) {
							attackDamageText.text = attack(characterHolder, enemyHolder);
						} else {
							attackFlg = skill(characterHolder, enemyHolder, attackDamageText, recoveryDamageDamageText);
						}

						effectObj = enemyObj.transform.FindChild("Effect").gameObject;

						if (attackFlg) {
							yield effectForDamage(enemyObj, attackDamageObj, effectObj);
						} else {
							yield effectForRecovery(enemyObj, recoveryDamageObj, effectObj);
							setHpBar(recoveryCharacterHolder);
						}
						anim.SetInteger("CommandType", 0);
						break;
					}
					yield null;
				}
				yield WaitForSeconds(0.2f);
				attackDamageObj.SetActive(false);
				recoveryDamageObj.SetActive(false);
				if (!enemyHolder.isAlive()) {
					yield StartCoroutine(deadOfEnemy(enemyObj));
				}
				// 次の攻撃の前に少しwaitする
				yield WaitForSeconds(0.2f);
				finishFlg = isFinish();
				if (finishFlg) {
					finish();
					break;
				}
			} else if (characterHolder.getType() == BattleActionType.WATER_BOTTLE) {
				anim = characterHolder.getAnim();
				var recoveryHp : int = WaterBottleUtil.getHp(characterHolder.getWaterScale());
				// TODO アイテムの動きができたら4に変更する
				anim.SetInteger("CommandType", 2);

				recoveryDamageObj = characterHolder.getObj().transform.FindChild("RecoveryDamageBase").gameObject;
				recoveryDamageDamageText = recoveryDamageObj.transform.FindChild("Text").GetComponent("Text");
				recoveryDamageDamageText.text = "" + recoveryHp;

				// TODO とりあえずホワンのエフェクトを入れる
				var hoan : GameObject = Instantiate(labInstance.loadPrefab("prefab/particle/cmn", "hoan"), Vector2 (0f, 0f), Quaternion.identity);
				hoan.transform.SetParent(characterHolder.getObj().transform);
				hoan.transform.localPosition = Vector2(0f, -100f);
				hoan.transform.Rotate(270, 0, 0);
				hoan.transform.localScale = Vector2(1, 1);
				hoan.GetComponent(ParticleSystem).shape.box = Vector3(100f, 1f, 1f);
				hoan.GetComponent(Renderer).material.shader = Shader.Find("Particles/Alpha Blended Premultiply");

				characterHolder.getCharacterMasterEntity().setCurrentHp(characterHolder.getCharacterMasterEntity().getCurrentHp() + recoveryHp);

				while (true) {
					animInfo = anim.GetCurrentAnimatorStateInfo(0);
					if (animInfo.normalizedTime > 0.9f) {
						recoveryDamageObj.SetActive(true);
						setHpBar(characterHolder);
						yield WaitForSeconds(0.3f);
						anim.SetInteger("CommandType", 0);
						break;
					}
					yield null;
				}
				yield WaitForSeconds(0.2f);
				recoveryDamageObj.SetActive(false);

				// 次の攻撃の前に少しwaitする
				yield WaitForSeconds(0.2f);
			} else if (characterHolder.getType() == BattleActionType.ITEM) {
				anim = characterHolder.getAnim();
				// TODO アイテムの動きができたら4に変更する
				anim.SetInteger("CommandType", 2);
				
				enemyHolder = enemyActionHolderDic[characterHolder.getEnemyId()];
				if (!enemyHolder.isAlive()) {
					enemyHolder = enemyActionHolderDic[autoSelectEnemy()];
				}

				enemyObj = enemyHolder.getObj();
				attackDamageObj = enemyObj.transform.FindChild("AttackDamageBase").gameObject;
				attackDamageText = attackDamageObj.transform.FindChild("Text").GetComponent("Text");
				// TODO とりあえずcharacterHolder#characterNumはintでnullにならないから取っている
				recoveryCharacterHolder = characterActionHolderList[characterHolder.getCharacterNum()];
				recoveryDamageObj = recoveryCharacterHolder.getObj().transform.FindChild("RecoveryDamageBase").gameObject;
				recoveryDamageDamageText = recoveryDamageObj.transform.FindChild("Text").GetComponent("Text");

				while (true) {
					animInfo = anim.GetCurrentAnimatorStateInfo(0);
					if (animInfo.normalizedTime > 0.9f) {

						item(characterHolder, enemyHolder, attackDamageText, recoveryDamageDamageText);

						yield WaitForSeconds(0.3f);
						anim.SetInteger("CommandType", 0);
						break;
					}
					yield null;
				}

				yield WaitForSeconds(0.2f);
				attackDamageObj.SetActive(false);
				recoveryDamageObj.SetActive(false);
				if (!enemyHolder.isAlive()) {
					yield StartCoroutine(deadOfEnemy(enemyObj));
				}

				// 次の攻撃の前に少しwaitする
				yield WaitForSeconds(0.2f);
			}
		}
		for(var enemyActionHolderPair : KeyValuePair.<String, EnemyActionHolder> in enemyActionHolderDic) {
			var enemyActionHolder = enemyActionHolderPair.Value;
			var enemyId : String = enemyActionHolderPair.Key;
			if (!enemyActionHolder.isAlive()) {
				continue;
			}

			if (enemyId == "kasi1") {
				if (turnNum == 1) {
					continue;
				} else {
					finish();
					break;
				}
			}

			if (enemyActionHolder.getType() == BattleActionType.ATTACK) {

				var characterActionHolder : CharacterActionHolder;
				// 攻撃するキャラクタをランダムで選択
				var ran : float = Random.Range(0, alivedNum);
				while (true) {
					characterActionHolder = characterActionHolderList[ran];
					if (characterActionHolder.isAlive()) {
						break;
					}
					ran++;
				}
				
				var obj : GameObject = enemyActionHolder.getObj();
				var characterObj : GameObject = characterActionHolder.getObj();
				var enemyAttackDamageObj = characterObj.transform.FindChild("AttackDamageBase").gameObject;
				var enemyAttackDamageText : Text = enemyAttackDamageObj.transform.FindChild("Text").GetComponent("Text");
				enemyAttackDamageText.text = attack(enemyActionHolder, characterActionHolder);
				
				// 敵の攻撃アニメーション
				yield animForEnemy(obj);
				yield effectForDamage(characterObj.transform.FindChild("Main").gameObject, enemyAttackDamageObj, null);
				setHpBar(characterActionHolder);
				yield WaitForSeconds(0.2f);
				enemyAttackDamageObj.SetActive(false);
				if (!characterActionHolder.isAlive()) {
					yield StartCoroutine(deadOfCharacter(characterActionHolder));
				}
				// 次の攻撃の前に少しwaitする
				yield WaitForSeconds(0.2f);
				finishFlg = isGameOver();
				if (finishFlg) {
					yield StartCoroutine(gameOver(obj, enemyId));
					break;
				}
			}
		}
		
		if (!finishFlg) {
			currentNo = 0;
			fadeIn(objDic["Layer1_MainMenu"]);
		} else {
//			fadeOut(objDic["Layer1_CharacterBase"]);
			fadeOut(objDic["Layer1_MainMenu"]);
		}

		currentMenuObj = null;
		yield null;
	}
}

private function attack(characterHolder : CharacterActionHolder, enemyHolder : EnemyActionHolder) {
	var enemyMasterEntity : EnemyMasterEntity = enemyHolder.getEnemyMasterEntity();
	var currentHp : int = enemyMasterEntity.getHp();
	// TODO とりあえずランダム値を返却
	var ran : float = Random.Range(1, 10);
	currentHp = currentHp - ran;
	if (currentHp <= 0) {
		currentHp = 0;
		enemyHolder.setAlive(false);
	}
	enemyMasterEntity.setHp(currentHp);
	return "" + ran;
}

private function attack(enemyHolder : EnemyActionHolder, characterHolder : CharacterActionHolder) {
	var characterMasterEntity : CharacterMasterEntity = characterHolder.getCharacterMasterEntity();
	var currentHp : int = characterMasterEntity.getCurrentHp();
	// TODO とりあえずランダム値を返却
	var ran : float = Random.Range(1, 3);
	
	// TODO 防御の場合は、とりあえずダメージを1マイナスする
	if (characterHolder.getType() == BattleActionType.DEFENCE) {
		ran = ran - 1;
	}
	
	currentHp = currentHp - ran;
	if (currentHp <= 0) {
		currentHp = 0;
		characterHolder.setAlive(false);
		alivedNum--;
	}
	characterMasterEntity.setCurrentHp(currentHp);
	return "" + ran;
}

private function skill(characterHolder : CharacterActionHolder, enemyHolder : EnemyActionHolder,
							attackDamageText : Text, recoveryDamageDamageText : Text) {

	var entity : CskSkmEntity = characterHolder.getSkillHolder().getEntity();

	// TODO 暫定実装 START
	var effectType1 : int = entity.getEffectType1();
	// ダメージの場合
	if (effectType1 == 5) {
		attackDamageText.text = "" + skillForDamage(enemyHolder, entity);
		return true;
	} else if (effectType1 == 6) {
		// 回復の場合
		recoveryDamageDamageText.text = "" + skillForRecovery(characterHolder, entity);
		return false;
	}
	// TODO 暫定実装 END
}

private function skillForDamage(enemyHolder : EnemyActionHolder, entity : CskSkmEntity) {
	var damage : int = 0;
	var skillId : int = entity.getSkillId();
	var enemyMasterEntity : EnemyMasterEntity = enemyHolder.getEnemyMasterEntity();
	var currentHp : int = enemyMasterEntity.getHp();

	var magic : GameObject;
	var effectMasterEntity : EffectMasterEntity;
	// ヒボの場合
	if (skillId == 1) {
		magic = Instantiate(labInstance.loadPrefab("prefab/particle/cmn", "hibo"), Vector2 (0f, 0f), Quaternion.identity);
		magic.transform.SetParent(enemyHolder.getObj().transform);
		magic.transform.localPosition = Vector2(0f, 0f);
		magic.transform.Rotate(270, 0, 0);
		magic.GetComponent(Renderer).material.shader = Shader.Find("Particles/Alpha Blended Premultiply"); 

		effectMasterEntity = EffectMasterDao.selectByPk(entity.getEffectId1());
		damage = Random.Range(effectMasterEntity.getMin(), effectMasterEntity.getMax());
		// TODO damageに魔力との兼ね合いを加算する
		currentHp = currentHp - damage;
	} else if (skillId == 13) {
		// ドドの場合

		magic = Instantiate(labInstance.loadPrefab("prefab/particle/cmn", "dodo"), Vector2 (0f, 0f), Quaternion.identity);
		magic.transform.SetParent(enemyHolder.getObj().transform);
		magic.transform.localPosition = Vector2(0f, 0f);
		magic.transform.Rotate(270, 0, 0);
		magic.transform.localScale = Vector2(1, 1);
		magic.GetComponent(ParticleSystem).shape.box = Vector3(120f, 1f, 1f);
		magic.GetComponent(Renderer).material.shader = Shader.Find("Particles/Alpha Blended"); 

		effectMasterEntity = EffectMasterDao.selectByPk(entity.getEffectId1());
		damage = Random.Range(effectMasterEntity.getMin(), effectMasterEntity.getMax());
		// TODO damageに魔力との兼ね合いを加算する
		currentHp = currentHp- damage;
	} else if (skillId == 84) {
		// マッチのスケッチの場合

		var rt : RectTransform = enemyHolder.getObj().transform as RectTransform;
		var height = rt.sizeDelta.y;

		magic = Instantiate(labInstance.loadPrefab("prefab/particle/emo", "match_sketch"), Vector2 (0f, 0f), Quaternion.identity);
		magic.transform.SetParent(enemyHolder.getObj().transform);
		magic.transform.localPosition = Vector2(0, height / 2);
		magic.transform.Rotate(0, 0, 330);
		magic.transform.localScale = Vector2(1, 1);
		var hibo = magic.transform.FindChild("hibo");
		hibo.GetComponent(Renderer).material.shader = Shader.Find("Particles/Alpha Blended Premultiply"); 

		effectMasterEntity = EffectMasterDao.selectByPk(entity.getEffectId1());
		damage = Random.Range(effectMasterEntity.getMin(), effectMasterEntity.getMax());
		// TODO damageに魔力との兼ね合いを加算する
		currentHp = currentHp- damage;
	}

	if (currentHp <= 0) {
		currentHp = 0;
		enemyHolder.setAlive(false);
	}
	enemyMasterEntity.setHp(currentHp);
	return damage;
}
private function skillForRecovery(characterHolder : CharacterActionHolder, entity : CskSkmEntity) {
	var damage : int = 0;
	var skillId : int = entity.getSkillId();
	var characterMasterEntity : CharacterMasterEntity = characterHolder.getCharacterMasterEntity();
	var currentHp : int = characterMasterEntity.getCurrentHp();

	// ホワンの場合
	if (skillId == 16) {
		var hoan : GameObject = Instantiate(labInstance.loadPrefab("prefab/particle/cmn", "hoan"), Vector2 (0f, 0f), Quaternion.identity);
		hoan.transform.SetParent(characterHolder.getObj().transform);
		hoan.transform.localPosition = Vector2(0f, -100f);
		hoan.transform.Rotate(270, 0, 0);
		hoan.transform.localScale = Vector2(1, 1);
		hoan.GetComponent(ParticleSystem).shape.box = Vector3(100f, 1f, 1f);
		hoan.GetComponent(Renderer).material.shader = Shader.Find("Particles/Alpha Blended Premultiply");

		var effectMasterEntity : EffectMasterEntity = EffectMasterDao.selectByPk(entity.getEffectId1());
		damage = Random.Range(effectMasterEntity.getMin(), effectMasterEntity.getMax());
		currentHp = currentHp + damage;
	}
	characterMasterEntity.setCurrentHp(currentHp);
	return damage;
}

private function item(characterHolder : CharacterActionHolder, enemyHolder : EnemyActionHolder,
							attackDamageText : Text, recoveryDamageDamageText : Text) {

	// TODO 暫定実装 START
	var bltItmEntity : BltItmEntity = characterHolder.getItemHolder().getEntity();
	var itemId : int = bltItmEntity.getItemId();
	var exhaustionItemMasterEntity : ExhaustionItemMasterEntity = ExhaustionItemMasterDao.selectByPk(itemId);
	var item : GameObject;

	if (itemId == 14) {
		item = Instantiate(labInstance.loadPrefab("prefab/particle/cmn", "doroDango"), Vector2 (0f, 0f), Quaternion.identity);
		item.transform.SetParent(enemyHolder.getObj().transform);
		item.transform.localScale = Vector2(1, 1);
		item.transform.Rotate(0, 0, 0);
		yield null;
		var rt : RectTransform = item.transform;
		rt.localPosition = Vector2(0f, 0f);

	}
	// TODO 暫定実装 END
}

private function deadOfEnemy(obj : GameObject) {
	yield fadeOut(obj);
}

private function deadOfCharacter(characterActionHolder : CharacterActionHolder) {
	var obj : GameObject = characterActionHolder.getObj();
	var pos = obj.transform.localPosition;
	var posY : float = pos.y;
	var count : int = 0;
	while(count < 100) {
		posY = posY - 3.0f;
		pos.y = posY;
		obj.transform.localPosition = pos;
		count++;
		yield null;
	}
	yield fadeOutForDead(characterActionHolder.getObj(), characterActionHolder.getStatusObj());
}

private function isFinish() {
	for(var enemyActionHolderPair : KeyValuePair.<String, EnemyActionHolder> in enemyActionHolderDic) {
		var enemyActionHolder = enemyActionHolderPair.Value;
		if (enemyActionHolder.isAlive()) {
			return false;
		}
	}
	return true;
}

private function finish() {
	for (var characterHolder : CharacterActionHolder in characterActionHolderList){
		CharacterMasterDao.update(characterHolder.getCharacterMasterEntity());
	}
	var encountManager : EncountManager = FindObjectOfType(EncountManager);
	encountManager.finish();
	enemyActionHolderDic = new Dictionary.<String, EnemyActionHolder>();
	selectEnemyId = null;
	currentNo = 0;
}

private function isGameOver() {
	for (var characterHolder : CharacterActionHolder in characterActionHolderList){
		if (!characterHolder.isAlive()) {
			continue;
		}
		return false;
	}
	return true;
}

private function gameOver(obj : GameObject, targetId : String) {
	objDic["Layer1_CharacterBase"].SetActive(false);
	objDic["Layer1_CharacterControlBase"].SetActive(false);
	objDic["Layer1_MainMenu"].SetActive(false);
	yield WaitForSeconds(1.0f);
	var targetPosX : float;
	for(var enemyActionHolderPair : KeyValuePair.<String, EnemyActionHolder> in enemyActionHolderDic) {
		var enemyActionHolder = enemyActionHolderPair.Value;
		var enemyId = enemyActionHolderPair.Key;
		var enemyObj : GameObject = enemyActionHolder.getObj();
		if (targetId == enemyId) {
			targetPosX = enemyObj.transform.localPosition.x;
		}
		var rt : RectTransform = enemyObj.transform as RectTransform;
		rt.pivot.y = 0.5;
		var localPos = enemyObj.transform.localPosition;
		enemyObj.transform.localPosition = Vector2(localPos.x, localPos.y + (rt.sizeDelta.y / 2));
	}
	
	var enemyBaseObj : GameObject = this.transform.FindChild("Body/Layer1_BaseMenu/EnemyBase").gameObject;
	var posX : float = obj.transform.localPosition.x;
	var rePosX = posX / 5;
	var count = 0;
	var amInstance : AudioManager = FindObjectOfType(AudioManager);
	amInstance.stopBgmAtFadeOut(4.0f);
	while(count < 5) {
		count++;
		for(var tmpEnemyActionHolderPair : KeyValuePair.<String, EnemyActionHolder> in enemyActionHolderDic) {
			var tmpEnemyActionHolder = tmpEnemyActionHolderPair.Value;
			var tmpEnemyId = tmpEnemyActionHolderPair.Key;
			var tmpEnemyObj : GameObject = tmpEnemyActionHolder.getObj();
			var tmpLocalPos = tmpEnemyObj.transform.localPosition;
			var tmpLocalPosX : float;
			var tmpRt : RectTransform = tmpEnemyObj.transform as RectTransform;
			if (targetId == tmpEnemyId) {
				tmpLocalPosX = tmpLocalPos.x - rePosX;
			} else if (targetPosX < tmpLocalPos.x) {
				tmpLocalPosX = tmpLocalPos.x + (tmpRt.sizeDelta.x * (count * 1));
			} else {
				tmpLocalPosX = tmpLocalPos.x - (tmpRt.sizeDelta.x * (count * 1));
			}
			tmpEnemyObj.transform.localPosition = Vector2(tmpLocalPosX, tmpLocalPos.y);
			tmpEnemyObj.transform.localScale = Vector2(1 + count * 1, 1 + count * 1);
		}
		yield WaitForSeconds(0.8f);
	}
	
	var assetBundleInfoDic = new Dictionary.<String, int>();
	assetBundleInfoDic.Add("prefab/msgdialognotitle", 0);
	assetBundleInfoDic.Add("f99/cmn/s05/battle/gameover", 0);
	SceneLoadManager.getInstance().loadLevelInLoading("f99_gameover", assetBundleInfoDic);
}

private function autoSelectEnemy() {
	for(var enemyActionHolderPair : KeyValuePair.<String, EnemyActionHolder> in enemyActionHolderDic) {
		var enemyActionHolder = enemyActionHolderPair.Value;
		var enemyId : String = enemyActionHolderPair.Key;
		if (enemyActionHolder.isAlive()) {
			return enemyId;
		}
	}
	// nullを返却する事はありえない
	return null;
}

private function effectForDamage(baseObj : GameObject, damageObj : GameObject, effectObj : GameObject) {
	var time : float = 0;
	var image : Image = baseObj.GetComponent("Image");
	if (effectObj != null) {
		effectObj.SetActive(true);
	}
	amInstance.playSe("f99s05007_Attack");
	for (var i : int = 0; i < 2; i++) {
		time = 0;
		while (time <= 0.1f)
		{
		    image.color = new Color(1.0f, 1.0f, 1.0f, Mathf.Lerp(1f, 0f, time / 0.1f));
		    time += Time.deltaTime;
		    yield null;
		}
		if (effectObj != null) {
			effectObj.SetActive(false);
		}
		damageObj.SetActive(true);
		time = 0;
		while (time <= 0.1f)
		{
		    image.color = new Color(1.0f, 1.0f, 1.0f, Mathf.Lerp(0f, 1f, time / 0.1f));
		    time += Time.deltaTime;
		    yield null;
		}
	}
}

private function effectForRecovery(baseObj : GameObject, damageObj : GameObject, effectObj : GameObject) {
	var time : float = 0;
	var image : Image = baseObj.GetComponent("Image");
	if (effectObj != null) {
		effectObj.SetActive(true);
	}
	amInstance.playSe("f99s05008_Recovery");
	for (var i : int = 0; i < 2; i++) {
		time = 0;
		while (time <= 0.1f)
		{
		    image.color = new Color(1.0f, 1.0f, 1.0f, Mathf.Lerp(1f, 0f, time / 0.1f));
		    time += Time.deltaTime;
		    yield null;
		}
		if (effectObj != null) {
			effectObj.SetActive(false);
		}
		damageObj.SetActive(true);
		time = 0;
		while (time <= 0.1f)
		{
		    image.color = new Color(1.0f, 1.0f, 1.0f, Mathf.Lerp(0f, 1f, time / 0.1f));
		    time += Time.deltaTime;
		    yield null;
		}
	}
}

private function animForEnemy(enemyObj : GameObject) {
	var moveLength : float = 0.0f;
	var directionFlg : boolean = true;
	var count : int = 0;
	var enemyPos : Vector2 = enemyObj.transform.localPosition;
	var currentY = enemyPos.y;
	while (true) {
		enemyPos = enemyObj.transform.localPosition;
		var length = Time.deltaTime * 25f * 10f;
		if (directionFlg) {
			enemyPos.y += length;
			moveLength += length;
			if (moveLength > 0f) {
				directionFlg = false;
			}
		} else {
			enemyPos.y -= length;
			moveLength -= length;
			if (moveLength < -10.0f) {
				directionFlg = true;
				count++;
			}
		}
		enemyObj.transform.localPosition = enemyPos;
		
		if (count == 3) {
			break;
		}
		yield null;
	}
	enemyPos.y = currentY;
	enemyObj.transform.localPosition = enemyPos;
}

private function setHpBar(characterHolder : CharacterActionHolder) {
	var characterBase : GameObject = characterHolder.getStatusObj();
	var characterMasterEntity : CharacterMasterEntity = characterHolder.getCharacterMasterEntity();
	var hpBarCurrent : RectTransform = characterBase.transform.FindChild("HpBarCurrent") as RectTransform;
	var textHpValue : Text = characterBase.transform.FindChild("HpValue").GetComponent(Text);
	var currentHp = characterMasterEntity.getCurrentHp();
	var maxHp = characterMasterEntity.getMaxHp();
	var currentHpBarWidth : float = 70 * currentHp / maxHp;
	
	hpBarCurrent.sizeDelta = Vector2 (currentHpBarWidth, 17);
	hpBarCurrent.localPosition = Vector2 (-13 + ((70 - currentHpBarWidth) / 2), 36);
	
	textHpValue.text = "" + currentHp;
}

private function createChracterBase() {
	var characterBaseObj : GameObject = objDic["Layer1_BaseMenu"].transform.FindChild("CharacterBase").gameObject;
	var characterControlBaseObj : GameObject = objDic["Layer1_BaseMenu"].transform.FindChild("CharacterControlBase").gameObject;
	childAllDestory(characterBaseObj);
	childAllDestory(characterControlBaseObj);
	
	var teamMasterEntity : TeamMasterEntity = TeamMasterDao.select();
	var entityList : List.<CharacterMasterEntity> = new List.<CharacterMasterEntity>();
	characterActionHolderList = new List.<CharacterActionHolder>();
	var characterMasterEntity1 : CharacterMasterEntity = CharacterMasterDao.selectByPk(teamMasterEntity.getCharacterId1());
	entityList.Add(characterMasterEntity1);
	if (teamMasterEntity.getCharacterId2() != null && teamMasterEntity.getCharacterId2() != 0) {
		var characterMasterEntity2 : CharacterMasterEntity = CharacterMasterDao.selectByPk(teamMasterEntity.getCharacterId2());
		entityList.Add(characterMasterEntity2);
	} else if (teamMasterEntity.getCharacterId3() != null && teamMasterEntity.getCharacterId3() != 0) {
		var characterMasterEntity3 : CharacterMasterEntity = CharacterMasterDao.selectByPk(teamMasterEntity.getCharacterId3());
		entityList.Add(characterMasterEntity3);
	} else if (teamMasterEntity.getCharacterId4() != null && teamMasterEntity.getCharacterId4() != 0) {
		var characterMasterEntity4 : CharacterMasterEntity = CharacterMasterDao.selectByPk(teamMasterEntity.getCharacterId4());
		entityList.Add(characterMasterEntity4);
	}
	
	var count : int = 0;
	for (var entity : CharacterMasterEntity in entityList) {
		var characterBase : GameObject = Instantiate(labInstance.loadPrefab("prefab/battlemenu", "battleCharacterBase"), Vector2 (0f, 0f), Quaternion.identity);
		var characterActionHolder : CharacterActionHolder = characterBase.GetComponent(CharacterActionHolder);
		characterActionHolderList.Add(characterActionHolder);

		var faceIcon : GameObject;
		var characterControlBase : GameObject;
		var characterName = entity.getCharacterName();
		var battleCharacterControlBase : GameObject;
		var localScaleValue = 1.0f;
		if (characterName == "tsuyoshi") {
			faceIcon = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "tsuyoshiFaceIcon"), Vector2 (41f, 49f), Quaternion.identity);
			battleCharacterControlBase = Instantiate(labInstance.loadPrefab("prefab/battlemenu", "battleTsuyoshiContorolBase"), Vector2 (0f, 0f), Quaternion.identity);
			characterControlBase = battleCharacterControlBase.transform.FindChild("TsuyoshiBase").gameObject;
			localScaleValue = 0.9f;
		} else if (characterName == "emo") {
			faceIcon = Instantiate(labInstance.loadPrefab("prefab/fieldmenu", "emoFaceIcon"), Vector2 (41f, 49f), Quaternion.identity);
			battleCharacterControlBase = Instantiate(labInstance.loadPrefab("prefab/battlemenu", "battleEmoContorolBase"), Vector2 (0f, 0f), Quaternion.identity);
			characterControlBase = battleCharacterControlBase.transform.FindChild("EmoBase").gameObject;
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

		characterActionHolder.setAnim(characterControlBase.GetComponent(Animator));
		characterActionHolder.setObj(characterControlBase);
		characterActionHolder.setStatusObj(characterBase);
		characterActionHolder.setAlive(true);
		characterActionHolder.setCharacterMasterEntity(entity);
		
		battleCharacterControlBase.transform.SetParent(characterControlBaseObj.transform);
		battleCharacterControlBase.transform.localScale = Vector2 (localScaleValue, localScaleValue);
		faceIcon.transform.Rotate(0, 0, 180);
		faceIcon.transform.SetParent(characterBase.transform);
		
		var deadScreen : GameObject = Instantiate(labInstance.loadPrefab("prefab/battlemenu", "DeadScreen"), Vector2 (0f, 0f), Quaternion.identity);
		deadScreen.transform.SetParent(characterBase.transform);
		deadScreen.name = "DeadScreen";
		
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
		var currentHpBarWidth : float;
		var currentMpBarWidth : float;
		if (currentHp == 0) {
			currentHpBarWidth = 0;
			characterActionHolder.setAlive(false);
			// なぜか一度描画しないとy座標が反映されないためyield nullとしている
			yield null;
			var pos = characterControlBase.transform.localPosition;
			var posY : float = pos.y - 300;
			pos.y = posY;
			characterControlBase.transform.localPosition = pos;
			var cg : CanvasGroup = characterControlBase.GetComponent("CanvasGroup");
			cg.alpha = 0;
			var image : Image = characterBase.transform.FindChild("DeadScreen").gameObject.GetComponent("Image");
			image.color = new Color(0, 0, 0, 0.8f);
		} else {
			currentHpBarWidth = 70 * currentHp / maxHp;
			alivedNum++;
		}
		if (currentMp == 0) {
			currentMpBarWidth = 0;
		} else {
			currentMpBarWidth = 70 * currentMp / maxMp;
		}
		
		var hpBarCurrent : RectTransform = characterBase.transform.FindChild("HpBarCurrent") as RectTransform;
		var mpBarCurrent : RectTransform = characterBase.transform.FindChild("MpBarCurrent") as RectTransform;
		var textLevelValue : Text = characterBase.transform.FindChild("LevelValue").GetComponent(Text);
		var textHpValue : Text = characterBase.transform.FindChild("HpValue").GetComponent(Text);
		var textMpValue : Text = characterBase.transform.FindChild("MpValue").GetComponent(Text);
		
		hpBarCurrent.sizeDelta = Vector2 (currentHpBarWidth, 17);
		hpBarCurrent.localPosition = Vector2 (-13 + ((70 - currentHpBarWidth) / 2), 36);
		mpBarCurrent.sizeDelta = Vector2 (currentMpBarWidth, 17);
		mpBarCurrent.localPosition = Vector2 (-13 + ((70 - currentMpBarWidth) / 2), 56);
		
		textLevelValue.text = ("" + level).PadLeft(2);
		textHpValue.text = "" + currentHp;
		textMpValue.text = "" + currentMp; 
		
		characterBase.transform.SetParent(characterBaseObj.transform);
		
		characterBase.transform.localScale = Vector2 (1.0f, 1.0f);
		characterBase.transform.Rotate(0, 0, -180);
		count++;
		characterBase.name = "battleCharacterBase" + count;
		
	}
}

private function createItemMenuRow(inObj : GameObject, entityList : List.<BltItmEntity>, basePath : String) {
	var leftBaseObj : GameObject = inObj.transform.FindChild(basePath + "/ScrollDisplayBase/LeftBase").gameObject;
	var rightBaseObj : GameObject = inObj.transform.FindChild(basePath + "/ScrollDisplayBase/RightBase").gameObject;
	
	childAllDestory(leftBaseObj);
	childAllDestory(rightBaseObj);
	var count : int = 0;
	for (var entity : BltItmEntity in entityList) {
		count++;
		var itemMenuRow : GameObject = Instantiate(labInstance.loadPrefab("prefab/battlemenu", "battleItemMenuRow"), Vector2 (137.5f, -50.0f), Quaternion.identity);
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
		itemMenuRow.name = "battleItemMenuRow" + count;

		var itemHolder : BattleItemHolder = itemMenuRow.GetComponent(BattleItemHolder);
		itemHolder.setEntity(entity);
		itemHolder.setController(this);
		
	}
	
	if (count == 1) {
		var itemMenuRow2 : GameObject = Instantiate(labInstance.loadPrefab("prefab/battlemenu", "battleItemMenuRow"), Vector2 (137.5f, -50.0f), Quaternion.identity);
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
		itemMenuRow2.name = "battleItemMenuRow2";
	}
}

private function createSkillRow(inObj : GameObject, entityList : List.<CskSkmEntity>) {
	var leftBaseObj : GameObject = inObj.transform.FindChild("MainDisplayBase/ScrollDisplayBase/LeftBase").gameObject;
	var rightBaseObj : GameObject = inObj.transform.FindChild("MainDisplayBase/ScrollDisplayBase/RightBase").gameObject;
	childAllDestory(leftBaseObj);
	childAllDestory(rightBaseObj);
	var count : int = 0;
	for (var entity : CskSkmEntity in entityList) {
		count++;
		var statusMenuSkillRow : GameObject = Instantiate(labInstance.loadPrefab("prefab/battlemenu", "battleSkillRow"), Vector2 (145.9476f, -40.5f), Quaternion.identity);
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
		statusMenuSkillRow.name = "battleSkillRow" + count;
		var skillHolder : BattleSkillHolder = statusMenuSkillRow.GetComponent(BattleSkillHolder);
		skillHolder.setEntity(entity);
		skillHolder.setController(this);
		
	}
	
	if (count == 1) {
		var statusMenuSkillRow2 : GameObject = Instantiate(labInstance.loadPrefab("prefab/battlemenu", "battleSkillRow"), Vector2 (145.9476f, -40.5f), Quaternion.identity);
		var textName2 : Text = statusMenuSkillRow2.transform.FindChild("Name").GetComponent(Text);
		var textMpValue2 : Text = statusMenuSkillRow2.transform.FindChild("MpValue").GetComponent(Text);
		var textTitle2 : Text = statusMenuSkillRow2.transform.FindChild("MpTitle").GetComponent(Text);
		textName2.text = " ";
		textMpValue2.text = " ";
		textTitle2.text = " ";
		statusMenuSkillRow2.transform.SetParent(rightBaseObj.transform);
		statusMenuSkillRow2.transform.localScale = Vector2 (1.0f, 1.0f);
		statusMenuSkillRow2.name = "battleSkillRow2";
	}
}
public function createEnemyBase(battleSceneId : String) {

	var enemyBaseObj : GameObject = this.transform.FindChild("Body/Layer1_BaseMenu/EnemyBase").gameObject;
	var entityList : List.<EnemyMasterEntity> = BattleSceneMasterDao.selectJoinEntityMaster(battleSceneId);
	var currentSize : int = 0;
	// TODO 常にMaxが9ではない
	var enemyMaxNum : float = Random.Range(1, 9);
	var repeatCount : int = 0;
	var enemyIdList : List.<String> = new List.<String>();
	
	childAllDestory(enemyBaseObj);
	
	while (currentSize <= 20) {
		var ran : float = Random.Range(0, entityList.Count);
		var entity : EnemyMasterEntity = entityList[ran];
		currentSize += entity.getSize();
		if (currentSize > 20) {
			break;
		}
		
		repeatCount++;

		var enemyObj : GameObject = Instantiate(LoadAssetBandles.getInstance().loadPrefab(entity.getAssertBundleId(), entity.getEnemyId()), Vector2 (0f, 0f), Quaternion.identity);
		enemyObj.transform.SetParent(enemyBaseObj.transform);
		enemyObj.transform.localScale = Vector2 (1.0f, 1.0f);
		enemyObj.name = entity.getEnemyId() + repeatCount;
		
		var enemyActionHolder : EnemyActionHolder = new EnemyActionHolder();
		// TODO とりあえず攻撃だけにしている
		enemyActionHolder.setType(BattleActionType.ATTACK);
		enemyActionHolder.setEnemyMasterEntity(entity.clone());
		enemyActionHolder.setObj(enemyObj);
		enemyActionHolder.setAlive(true);
		enemyActionHolderDic[enemyObj.name] = enemyActionHolder;
		
		enemyIdList.Add(enemyObj.name);
		
		if (repeatCount == 1) {
			selectEnemyId = enemyObj.name;
		}
		
		if (enemyMaxNum == repeatCount) {
			break;
		}
	}
	
	var count : int = 1;
	var leftTmpPosition : float;
	var rightTmpPosition : float;
	var halfNum : int;
	var rt : RectTransform;
	if ((enemyIdList.Count % 2) == 0) {
		leftTmpPosition = -10.0f;
		rightTmpPosition = 10.0f;
		halfNum = enemyIdList.Count / 2;
		for (var enemyId : String in enemyIdList) {
			rt = enemyActionHolderDic[enemyId].getObj().transform;
			if (count <= halfNum) {
				rt.localPosition = Vector2 (leftTmpPosition - (rt.sizeDelta.x / 2), -150);
				leftTmpPosition = leftTmpPosition - rt.sizeDelta.x - 20;
				
			} else {
				rt.localPosition = Vector2 (rightTmpPosition + (rt.sizeDelta.x / 2), -150);
				rightTmpPosition = rightTmpPosition + rt.sizeDelta.x + 20;
			}
			count++;
		}
	} else {
		halfNum = enemyIdList.Count / 2;
		if (halfNum == 0) {
			rt = enemyActionHolderDic[enemyIdList[0]].getObj().transform;
			rt.localPosition = Vector2 (0, -150);
		} else {
			rt = enemyActionHolderDic[enemyIdList[halfNum]].getObj().transform;
			rt.localPosition = Vector2 (0, -150);
			leftTmpPosition = (-rt.sizeDelta.x / 2) - 20;
			rightTmpPosition = (rt.sizeDelta.x / 2) + 20;
			for (var enemyId : String in enemyIdList) {
				rt = enemyActionHolderDic[enemyId].getObj().transform;
				if (count <= halfNum) {
					rt.localPosition = Vector2 (leftTmpPosition - (rt.sizeDelta.x / 2), -150);
					leftTmpPosition = leftTmpPosition - rt.sizeDelta.x - 20;
				} else {
					if (count != (halfNum + 1)) {
						rt.localPosition = Vector2 (rightTmpPosition + (rt.sizeDelta.x / 2), -150);
						rightTmpPosition = rightTmpPosition + rt.sizeDelta.x + 20;
					}
				}
				count++;
			}
		}
	}
	
	// 真ん中寄せにするための補正値を計算
	var correctionValue : float = -(rightTmpPosition + leftTmpPosition) / 2;
	
	// 位置補正
	for (var enemyId : String in enemyIdList) {
		rt = enemyActionHolderDic[enemyId].getObj().transform;
		rt.localPosition = Vector2 (rt.localPosition.x + correctionValue, rt.localPosition.y);
	}
	
	init();
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
	yield fadeIn(obj, defaultFadeOutInterval);
}

public function fadeIn(obj : GameObject, interval : float) {
	currentMenuObj = obj;
	var cg : CanvasGroup = obj.GetComponent("CanvasGroup");
	var time : float = 0;
	while (time <= interval)
	{
	    cg.alpha = Mathf.Lerp(0f, 1f, time / interval);
	    time += Time.deltaTime;
	    yield null;
	}
	
	obj.SetActive(true);
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
	
	obj.SetActive(false);
	cg.alpha = 0f;
}

public function fadeOutForDead(mainObj : GameObject, statusObj : GameObject) {
	var cg : CanvasGroup = mainObj.GetComponent("CanvasGroup");
	var deadScreenObj : GameObject = statusObj.transform.FindChild("DeadScreen").gameObject;
	var image : Image = deadScreenObj.GetComponent("Image");
	var time : float = 0;
	while (time <= defaultFadeOutInterval)
	{
	    cg.alpha = Mathf.Lerp(1f, 0.3f, time / defaultFadeOutInterval);
	    image.color = new Color(0, 0, 0, Mathf.Lerp(0f, 0.8f, time / defaultFadeOutInterval));
	    time += Time.deltaTime;
	    yield null;
	}
}

private function childAllDestory(obj : GameObject) {

	for (var tf : Transform in obj.transform) {
		GameObject.Destroy(tf.gameObject);
	}
}

public function setSelectEnemyId(selectEnemyId) {
	this.selectEnemyId = selectEnemyId;
}
