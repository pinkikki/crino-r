
class F02TaiyounoHanashiALogic extends BasicMonoBehaviourLogic {

	private var emInstance : EventManager;
	private var tsuyoshi : GameObject;
	private var niccTsuyoshi: NoInputCharactersController;
	private var emo : GameObject;
	private var niccEmo: NoInputCharactersController;
	private var ningu : GameObject;
	private var niccNingu: NoInputCharactersController;

	function Start () {
		// TODO 本来は、FieldMenuManagerが既に存在するはずだから、StartCoroutineする必要はない
		StartCoroutine(todoGetFieldMenuManager());
		emInstance = FindObjectOfType(EventManager);
		emInstance.eventList.Add("[0004]");
		var doorOpenObj : GameObject = GameObject.Find("door_open");
		doorOpenObj.SetActive(false);
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
		StartCoroutine(action001Coroutine());
	}

	public function action002() {
		action002Coroutine();
	}

	public function action003() {
		action003Coroutine();
	}

	public function action004() {
		action004Coroutine();
	}

	public function action005() {
		action005Coroutine();
	}

	public function action006() {
		action006Coroutine();
	}

	private function action001Coroutine() {
		tsuyoshi = GameObject.Find("tsuyoshi_auto");
		niccTsuyoshi = tsuyoshi.GetComponent(NoInputCharactersController);
		emo = GameObject.Find("emo_auto");
		niccEmo = emo.GetComponent(NoInputCharactersController);
		ningu = GameObject.Find("ningu_auto");
		niccNingu = ningu.GetComponent(NoInputCharactersController);

		niccTsuyoshi.setConditionX(-16.5f);
		yield niccTsuyoshi.walkRight();
		niccEmo.setConditionX(-13.5f);
		yield niccEmo.walkRight();
		niccNingu.setConditionX(-14.0f);
		yield niccNingu.walkRight();

		while (true) {
			if (!niccEmo.warlkingFlg) {
				niccEmo.walkLeftNoSpeed();
				break;
			}
			yield null;
		}

		while (true) {
			if (!niccNingu.warlkingFlg) {
				niccNingu.walkLeftNoSpeed();
				break;
			}
			yield null;
		}

		emInstance.nextTask();
	}

	private function action002Coroutine() {
		niccEmo.walkFrontNoSpeed();
		niccNingu.walkRightNoSpeed();

		emInstance.nextTask();
	}

	private function action003Coroutine() {
		niccEmo.walkLeftNoSpeed();
		emInstance.nextTask();
	}

	private function action004Coroutine() {
		niccEmo.walkFrontNoSpeed();
		emInstance.nextTask();
	}

	private function action005Coroutine() {
		niccEmo.walkLeftNoSpeed();
		emInstance.nextTask();
	}

	private function action006Coroutine() {
		niccEmo.walkFrontNoSpeed();
		var entity : EventMasterEntity = EventMasterDao.selectByPk("CR_TAIYOUNOHANASHI_A", "f02_caveOfHagaurakasu");
		entity.setCompleteFlg(true);
		EventMasterDao.update(entity);
		var assetBundleInfoDic = new Dictionary.<String, int>();
		assetBundleInfoDic.Add("prefab/emo_auto", 0);
		assetBundleInfoDic.Add("prefab/msgdialog", 0);
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
}

