
class F02ninguArawaruALogic extends BasicMonoBehaviourLogic {

	private var emInstance : EventManager;
	private var labInstance : LoadAssetBandles;
	private var ningu : GameObject;
	private var niccNingu: NoInputCharactersController;

	function Start () {
		labInstance = LoadAssetBandles.getInstance();
		emInstance = FindObjectOfType(EventManager);
		emInstance.eventList.Add("[0003]");
		var tsuyoshi : GameObject = GameObject.Find("tsuyoshi_manual");
		tsuyoshi.SetActive(false);
	}

	function Update () {
	}

	public function action001() {
		var prefab = labInstance.loadPrefab("prefab/ningu_auto", "ningu_auto");
		ningu = Instantiate(prefab, Vector2 (-22.48f, 15.82f), Quaternion.identity);
		niccNingu = ningu.GetComponent(NoInputCharactersController);

		yield niccNingu.walkBackNoSpeed();
		niccNingu.setConditionY(22.85f);
		yield niccNingu.walkBack();
		emInstance.nextTask();
	}

	public function action002() {
		StartCoroutine(action002Coroutine());
	}

	public function action003() {
		StartCoroutine(action003Coroutine());
	}

	private function action002Coroutine() {
		while (true) {
			if (!niccNingu.warlkingFlg) {
				break;
			}
			yield null;
		}

		yield WaitForSeconds(2.0f);
		yield niccNingu.moveUpDown();
		niccNingu.setDeltaTimeBaseValue(4.0f);
		niccNingu.setConditionY(15.82f);
		niccNingu.walkFront();
		emInstance.nextTask();
	}

	private function action003Coroutine() {
		while (true) {
			if (!niccNingu.warlkingFlg) {
				break;
			}
			yield null;
		}

		var ninguEntity : EventMasterEntity = EventMasterDao.selectByPk("CR_NINGUARAWARU_A", "f02_caveOfHagaurakasu");
		ninguEntity.setCompleteFlg(true);
		EventMasterDao.update(ninguEntity);

		// グラカス守衛のイベントも完了した事にする。
		var shueiEntity : EventMasterEntity = EventMasterDao.selectByPk("CR_GURAKASUSHUEI_A", "f02_caveOfHagaurakasu");
		shueiEntity.setCompleteFlg(true);
		EventMasterDao.update(shueiEntity);

		var assetBundleInfoDic = new Dictionary.<String, int>();
		assetBundleInfoDic.Add("prefab/tsuyoshi_auto", 0);
		assetBundleInfoDic.Add("prefab/emo_auto", 0);
		assetBundleInfoDic.Add("prefab/ningu_auto", 0);
		assetBundleInfoDic.Add("prefab/kasi_auto", 0);
		assetBundleInfoDic.Add("prefab/msgdialog", 0);
		assetBundleInfoDic.Add("prefab/namedialog", 0);
		assetBundleInfoDic.Add("prefab/battlemenu", 0);
		assetBundleInfoDic.Add("f99/cmn/s05/battle/normal", 0);
		assetBundleInfoDic.Add("f99/cmn/s05/battle/middle", 0);
		assetBundleInfoDic.Add("f99/cmn/s05/battle/cmn", 0);
		assetBundleInfoDic.Add("f99/cmn/s06/field/dungeon", 0);
		assetBundleInfoDic.Add("prefab/enemy/001", 0);
		assetBundleInfoDic.Add("prefab/enemy/kasi", 0);
		assetBundleInfoDic.Add("prefab/particle/cmn", 0);
		assetBundleInfoDic.Add("prefab/particle/emo", 0);
		SceneLoadManager.getInstance().loadLevelInLoading(3.0f, "f02_kasuLake", assetBundleInfoDic);
		emInstance.nextTask();
		Destroy(this);
	}
}