
class F02KasukoniteALogic extends BasicMonoBehaviourLogic {

	private var baseLayer : GameObject;
	private var emInstance : EventManager;
	private var amInstance : AudioManager;
	private var labInstance : LoadAssetBandles;
	var encountManager : EncountManager;
	private var tsuyoshi : GameObject;
	private var niccTsuyoshi: NoInputCharactersController;
	private var emo : GameObject;
	private var niccEmo: NoInputCharactersController;
	private var ningu : GameObject;
	private var niccNingu: NoInputCharactersController;
	private var kasi : GameObject;
	private var fieldMenu : GameObject;
	private var messageSelectButtonNum : int = 1;

	function Start () {
		labInstance = LoadAssetBandles.getInstance();
		StartCoroutine(FieldMenuUtil.doNotActive());
		emInstance = FindObjectOfType(EventManager);
		amInstance = FindObjectOfType(AudioManager);
		emInstance.eventList.Add("[0001]");
		encountManager = FindObjectOfType(EncountManager);
		encountManager.setEncountStopFlg(true);
	}

	function Update () {
	}

	public function action001() {
		StartCoroutine(action001Coroutine());
	}

	public function action002() {
		StartCoroutine(action002Coroutine());

	}

	public function action003() {
		niccTsuyoshi.walkRightNoSpeed();
		yield WaitForSeconds(0.5f);
		niccTsuyoshi.walkLeftNoSpeed();
		yield WaitForSeconds(0.5f);
		niccTsuyoshi.walkRightNoSpeed();
		yield WaitForSeconds(0.5f);
		niccTsuyoshi.walkLeftNoSpeed();
		yield WaitForSeconds(0.5f);
		niccTsuyoshi.walkBackNoSpeed();
		emInstance.nextTask();
	}

	public function action004() {
		StartCoroutine(action004Coroutine());
	}

	public function action005() {
		StartCoroutine(action005Coroutine());
	}

	public function action006() {
		StartCoroutine(action006Coroutine());
	}

	public function action007() {
		StartCoroutine(action007Coroutine());
	}

	public function action008() {
		emInstance.nextTask();
	}

	public function action009() {
		emInstance.nextTask();
	}

	public function action010() {
		StartCoroutine(action010Coroutine());
	}

	public function action011() {
		niccEmo.walkFrontNoSpeed();
		emInstance.nextTask();
	}

	public function action012() {
		StartCoroutine(action012Coroutine());
	}

	public function action013() {
		niccEmo.walkRightNoSpeed();
		emInstance.nextTask();
	}

	public function action014() {
		emInstance.nextTask();
	}

	public function action015() {
		emInstance.nextTask();
	}

	public function action016() {
		emInstance.nextTask();
	}

	public function action017() {
		StartCoroutine(action017Coroutine());
	}

	public function action018() {
		StartCoroutine(action018Coroutine());
	}

	public function action019() {
		emInstance.nextTask();
	}

	public function action020() {
		StartCoroutine(action020Coroutine());
	}

	public function action021() {
		StartCoroutine(action021Coroutine());
	}

	public function action022() {
		emInstance.nextTask();
	}

	public function action023() {
		StartCoroutine(action023Coroutine());
	}

	public function action024() {
		StartCoroutine(action024Coroutine());
	}

	public function action025() {
		var prefab = labInstance.loadPrefab("prefab/namedialog", "namedialog");
		var nameDialog = Instantiate(prefab, Vector2 (0.0f, 0.0f), Quaternion.identity);
		nameDialog.name = "NameDialog";
		var prefabEmo = labInstance.loadPrefab("prefab/namedialog", "emo");
		var emo = Instantiate(prefabEmo, Vector2 (0.0f, 0.0f), Quaternion.identity);
		emo.transform.SetParent(nameDialog.transform.FindChild("Body/Character"));
		emo.transform.localPosition = Vector2 (0.0f, 0.0f);
		emo.transform.localScale = Vector2 (1.0f, 1.0f);
		var inputField : InputField = nameDialog.transform.FindChild("Body/InputField").GetComponent(InputField);
		inputField.text = "エモ";
	}

	public function action026() {
		emInstance.nextTask();
	}

	public function action027() {
		emInstance.nextTask();
	}

	public function action028() {
		niccTsuyoshi.walkLeftNoSpeed();
		emInstance.nextTask();
	}

	public function action029() {
		emInstance.nextTask();
	}

	public function action030() {
		emInstance.nextTask();
	}

	public function action031() {
		emInstance.nextTask();
	}

	public function action032() {
		niccTsuyoshi.walkBackNoSpeed();
		emInstance.nextTask();
	}

	public function action033() {
		niccNingu.walkRightNoSpeed();
		emInstance.nextTask();
	}

	public function action034() {
		StartCoroutine(action034Coroutine());
		emInstance.nextTask();
	}

	public function action035() {
		emInstance.nextTask();
	}

	public function action036() {
		emInstance.nextTask();
	}

	public function action037() {
		emInstance.nextTask();
	}

	public function action038() {
		emInstance.nextTask();
	}
	private function action001Coroutine() {
		tsuyoshi = GameObject.Find("tsuyoshi_auto");
		niccTsuyoshi = tsuyoshi.GetComponent(NoInputCharactersController);
		niccTsuyoshi.setConditionY(-8.7f);
		yield niccTsuyoshi.walkBack();
		while (true) {
			if (!niccTsuyoshi.warlkingFlg) {
				break;
			}
			yield null;
		}
		emInstance.nextTask();
	}

	private function action002Coroutine() {
		niccTsuyoshi.setDeltaTimeBaseValue(2.0f);
		niccTsuyoshi.setConditionY(-4.6f);
		yield niccTsuyoshi.walkBack();
		while (true) {
			if (!niccTsuyoshi.warlkingFlg) {
				break;
			}
			yield null;
		}
		niccTsuyoshi.setDeltaTimeBaseValue(1.0f);
		emInstance.nextTask();
	}

	private function action004Coroutine() {
		var prefab = labInstance.loadPrefab("prefab/kasi_auto", "kasi_auto");
		kasi = Instantiate(prefab, Vector2 (0.55f, -2.0f), Quaternion.identity);
		var kasiRenderer : SpriteRenderer = kasi.GetComponent(SpriteRenderer);
		var time : float = 0;
		while (time <= 0.5f)
		{
		    kasiRenderer.color = new Color(1.0f, 1.0f, 1.0f, Mathf.Lerp(0f, 1f, time / 0.5f));
		    time += Time.deltaTime;
		    yield null;
		}
		emInstance.nextTask();
	}

	private function action005Coroutine() {
	    // TODO カッシー戦のバトルシーンを毎回読み込むようになっている
		encountManager.setBossScene("f02_battle_kasi");
		encountManager.setBossBgm("f99s05004_battleMiddle");
		encountManager.setBossBgmTime(35.743f);
		encountManager.setBossBgmRepeatTime(1.184f);

		// TODO EncountManagerのloadLevelAdditiveAsyncの読み込み完了待ちが実装できたらコメントアウト解除
//		while (encountManager.getLoadStatus() != LoadStatus.LOAD_COMPLETE) {
//			yield null;
//		}

		encountManager.transScene();

		while (encountManager.getBossScene() != null) {
			yield null;
		}

		tsuyoshi.transform.Rotate(0, 0, 90);
		emInstance.nextTask();
		emInstance.eventList.Add("[0002]");
	}

	private function action006Coroutine() {

		while (true) {
			var pos : Vector3 = kasi.transform.position;
			pos.y -= Time.deltaTime * 0.5f;
			kasi.transform.position = pos;

			if (pos.y < -2.5f) {
				break;
			}

			yield null;
		}

		emInstance.nextTask();
	}

	private function action007Coroutine() {

		var prefab = labInstance.loadPrefab("prefab/emo_auto", "emo_auto");
		emo = Instantiate(prefab, Vector2 (1.55f, -10.0f), Quaternion.identity);
		niccEmo= emo.GetComponent(NoInputCharactersController);
		niccEmo.setConditionY(-3.5f);
		yield niccEmo.walkBack();
		while (true) {
			if (!niccEmo.warlkingFlg) {
				break;
			}
			yield null;
		}
		niccEmo.setConditionX(0.55f);
		yield niccEmo.walkLeft();
		while (true) {
			if (!niccEmo.warlkingFlg) {
				break;
			}
			yield null;
		}
		niccEmo.walkBackNoSpeed();
		emInstance.nextTask();
	}

	private function action010Coroutine() {
		var kasiRenderer : SpriteRenderer = kasi.GetComponent(SpriteRenderer);
		var time : float = 0;
		while (time <= 0.5f)
		{
		    kasiRenderer.color = new Color(1.0f, 1.0f, 1.0f, Mathf.Lerp(1f, 0f, time / 0.5f));
		    time += Time.deltaTime;
		    yield null;
		}

		kasi.SetActive(false);

		emInstance.nextTask();
	}

	private function action012Coroutine() {

		var prefab = labInstance.loadPrefab("prefab/ningu_auto", "ningu_auto");
		ningu = Instantiate(prefab, Vector2 (-0.5f, -10.0f), Quaternion.identity);
		niccNingu= ningu.GetComponent(NoInputCharactersController);
		niccNingu.setConditionY(-4.6f);
		yield niccNingu.walkBack();
		while (true) {
			if (!niccNingu.warlkingFlg) {
				break;
			}
			yield null;
		}
		niccNingu.walkRightNoSpeed();
		emInstance.nextTask();
	}

	private function action017Coroutine() {
		niccNingu.walkBackNoSpeed();
		yield WaitForSeconds(0.5f);
		niccNingu.walkRightNoSpeed();
		yield WaitForSeconds(0.5f);
		emInstance.nextTask();
	}

	private function action018Coroutine() {
		var baseLayer : GameObject = FadeUtil.createBlackLayer();
		yield WaitForSeconds(3.0f);
		yield FadeUtil.fadeOut(baseLayer, 3.0f);
		emInstance.nextTask();
	}

	private function action020Coroutine() {

		tsuyoshi.transform.Rotate(0, 0, -90);
		yield WaitForSeconds(1.0f);
		niccTsuyoshi.walkRightNoSpeed();
		yield WaitForSeconds(0.5f);
		niccTsuyoshi.walkLeftNoSpeed();
		yield WaitForSeconds(0.5f);
		niccTsuyoshi.walkRightNoSpeed();
		yield WaitForSeconds(0.5f);
		niccTsuyoshi.walkLeftNoSpeed();
		yield WaitForSeconds(0.5f);
		niccTsuyoshi.walkBackNoSpeed();
		emInstance.nextTask();
	}

	private function action021Coroutine() {
		niccTsuyoshi.setConditionY(-5.6f);
		yield niccTsuyoshi.walkBackBack();
		while (true) {
			if (!niccTsuyoshi.warlkingFlg) {
				break;
			}
			yield null;
		}

		niccNingu.walkFrontNoSpeed();

		emInstance.nextTask();
	}

	private function action023Coroutine() {
		niccNingu.setConditionY(-5.6f);
		yield niccNingu.walkFront();
		while (true) {
			if (!niccNingu.warlkingFlg) {
				break;
			}
			yield null;
		}

		niccNingu.walkRightNoSpeed();

		emInstance.nextTask();
	}

	private function action024Coroutine() {

		niccNingu.walkLeftNoSpeed();

		niccEmo.setConditionY(-4.5f);
		yield niccEmo.walkFront();
		while (true) {
			if (!niccEmo.warlkingFlg) {
				break;
			}
			yield null;
		}

		emInstance.nextTask();
	}

	private function action034Coroutine() {

		niccEmo.setConditionY(-3.5f);
		yield niccEmo.walkBack();
		while (true) {
			if (!niccEmo.warlkingFlg) {
				break;
			}
			yield null;
		}
		emInstance.nextTask();
	}

	private function action038Coroutine() {
		var scaleCamera : ScaleCamera = FindObjectOfType(ScaleCamera);
		scaleCamera.target = null;

		niccEmo.setConditionX(1.55f);
		yield niccEmo.walkRight();
		while (true) {
			if (!niccEmo.warlkingFlg) {
				break;
			}
			yield null;
		}

		niccEmo.setConditionY(-10.0f);
		yield niccEmo.walkFront();
		while (true) {
			if (emo.transform.position.y < -6.0f) {
				break;
			}
			yield null;
		}

		niccNingu.setConditionY(-10.0f);
		yield niccNingu.walkFront();
		while (true) {
			if (!niccNingu.warlkingFlg) {
				break;
			}
			yield null;
		}

		niccTsuyoshi.setConditionY(-10.0f);
		yield niccTsuyoshi.walkFront();
		while (true) {
			if (!niccTsuyoshi.warlkingFlg) {
				break;
			}
			yield null;
		}

		amInstance.stopBgmAtFadeOut(3.0f);
		var assetBundleInfoDic = new Dictionary.<String, int>();
		assetBundleInfoDic.Add("prefab/tsuyoshi_manual", 0);
		assetBundleInfoDic.Add("prefab/ronno_auto", 0);
		assetBundleInfoDic.Add("prefab/ningu_auto", 0);
		assetBundleInfoDic.Add("prefab/msgdialog", 0);
		assetBundleInfoDic.Add("prefab/battlemenu", 0);
		assetBundleInfoDic.Add("f99/cmn/s05/battle/normal", 0);
		assetBundleInfoDic.Add("f99/cmn/s05/battle/cmn", 0);
		assetBundleInfoDic.Add("f99/cmn/s06/field/dungeon", 0);
		assetBundleInfoDic.Add("prefab/enemy/001", 0);
		assetBundleInfoDic.Add("prefab/particle/cmn", 0);
		assetBundleInfoDic.Add("prefab/particle/emo", 0);
		SceneLoadManager.getInstance().loadLevelInLoading(3.0f, "f02_caveOfHagaurakasu", assetBundleInfoDic);
	}

	public function decideName() {
		emInstance.nextTask();
	}

	public function selectAButton() {
		if (messageSelectButtonNum == 1) {
			emInstance.skipEvent(14);
			emInstance.nextTask();
		}
		emInstance.nextTask();
	}

	public function selectBButton() {
		if (messageSelectButtonNum == 2) {
			emInstance.skipEvent(8);
		} else if (messageSelectButtonNum == 3) {
			emInstance.skipEvent(6);
		}

		emInstance.nextTask();
	}

}
