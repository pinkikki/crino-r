class F02EmonoKaisouALogic extends BasicMonoBehaviourLogic {

	private var emInstance : EventManager;
	private var labInstance : LoadAssetBandles;
	private var emo : GameObject;
	private var niccEmo: NoInputCharactersController;
	private var baseLayer : GameObject;

	function Start () {
		// TODO 本来は、FieldMenuManagerが既に存在するはずだから、StartCoroutineする必要はない
		StartCoroutine(todoGetFieldMenuManager());
		emInstance = FindObjectOfType(EventManager);
		labInstance = LoadAssetBandles.getInstance();
		emInstance.eventList.Add("[0005]");
		var doorOpenObj : GameObject = GameObject.Find("door_open");
		doorOpenObj.SetActive(false);

		// TODO イベントのテキストに「ひだまり」のBGM
	}

	function Update () {
	}

	private function todoGetFieldMenuManager() {
		while (true) {
			var fieldMenuManager : GameObject = GameObject.Find("FieldMenuManager");
			if (fieldMenuManager != null) {
				fieldMenu = fieldMenuManager.GetComponent(FieldMenuManager).getInstance();
				fieldMenu.SetActive(false);
				break;
			}
			yield;

		}
	}

	public function action001() {
		action001Coroutine();
	}

	public function action002() {
		action002Coroutine();
	}

	public function action003() {
		var entity : EventMasterEntity = EventMasterDao.selectByPk("CR_EMONOKAISOU_A", "f02_caveOfHagaurakasu");
		entity.setCompleteFlg(true);
		EventMasterDao.update(entity);
		var assetBundleInfoDic = new Dictionary.<String, int>();
		assetBundleInfoDic.Add("prefab/tsuyoshi_auto", 0);
		assetBundleInfoDic.Add("prefab/emo_auto", 0);
		assetBundleInfoDic.Add("prefab/ningu_auto", 0);
		assetBundleInfoDic.Add("prefab/msgdialog", 0);
		assetBundleInfoDic.Add("prefab/fieldmenu", 0);
		assetBundleInfoDic.Add("prefab/battlemenu", 0);
		assetBundleInfoDic.Add("f99/cmn/s05/battle/normal", 0);
		assetBundleInfoDic.Add("f99/cmn/s05/battle/cmn", 0);
		assetBundleInfoDic.Add("f99/cmn/s06/field/dungeon", 0);
		assetBundleInfoDic.Add("prefab/enemy/001", 0);
		assetBundleInfoDic.Add("prefab/particle/cmn", 0);
		assetBundleInfoDic.Add("prefab/particle/emo", 0);
		SceneLoadManager.getInstance().loadLevelInLoading(3.0f, "f02_caveOfHagaurakasu", assetBundleInfoDic);
		emInstance.nextTask();
	}

	private function action001Coroutine() {
		var prefab = labInstance.loadPrefab("prefab/emo_auto", "emo_auto");
		emo = Instantiate(prefab, Vector2 (15.0f, 9.0f), Quaternion.identity);
		niccEmo= emo.GetComponent(NoInputCharactersController);
		var sr : SpriteRenderer = emo.GetComponent(SpriteRenderer);
		sr.color = new Color(1.0f, 1.0f, 1.0f, 0.0f);
		yield FadeUtil.fadeIn(sr, 2.0f);

		// TODO エモがコロコロする。

		emInstance.nextTask();
	}

	private function action002Coroutine() {
		baseLayer = FadeUtil.createBlackLayerByAlphaZero();
		yield FadeUtil.fadeIn(baseLayer, 2.0f);
		emInstance.nextTask();
	}
}
