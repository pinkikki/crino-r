class F02GurakasuShueiBLogic extends BasicMonoBehaviourLogic {

	private var emInstance : EventManager;
	private var ronno : GameObject;
	private var niccRonno : NoInputCharactersController;
	private var doorOpenObj : GameObject;

	function Start () {
		// TODO 本来は、FieldMenuManagerが既に存在するはずだから、StartCoroutineする必要はない
		StartCoroutine(todoGetFieldMenuManager());
		emInstance = FindObjectOfType(EventManager);
		emInstance.eventList.Add("[0007]");
		doorOpenObj = GameObject.Find("door_open");
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
		StartCoroutine(action002Coroutine());
	}

	public function action003() {
		StartCoroutine(action003Coroutine());
	}

	public function action004() {
		StartCoroutine(action004Coroutine());
	}

	public function action005() {
//		var entity : EventMasterEntity = EventMasterDao.selectByPk("CR_GURAKASUSHUEI_B", "f02_caveOfHagaurakasu");
//		entity.setCompleteFlg(true);
//		EventMasterDao.update(entity);
		emInstance.nextTask();
		Destroy(this);
	}

	private function action001Coroutine() {
		tsuyoshi = GameObject.Find("tsuyoshi_auto");
		niccTsuyoshi = tsuyoshi.GetComponent(NoInputCharactersController);
		emo = GameObject.Find("emo_auto");
		niccEmo = emo.GetComponent(NoInputCharactersController);
		ningu = GameObject.Find("ningu_auto");
		niccNingu = ningu.GetComponent(NoInputCharactersController);
		ronno = GameObject.Find("ronno_auto");
		niccRonno = ronno.GetComponent(NoInputCharactersController);

		niccTsuyoshi.setConditionX(19.5f);
		yield niccTsuyoshi.walkRight();
		niccEmo.setConditionX(20.5f);
		yield niccEmo.walkRight();
		niccNingu.setConditionX(19.8f);
		yield niccNingu.walkRight();

		while (true) {
			if (!niccEmo.warlkingFlg) {
				break;
			}
			yield null;
		}

		emInstance.nextTask();
	}

	private function action002Coroutine() {

		yield niccRonno.moveUpDown();
		niccRonno.setConditionX(23.5f);
		niccRonno.walkBackBack();

		while (true) {
			if (!niccRonno.warlkingFlg) {
				break;
			}
			yield null;
		}

		niccRonno.setDeltaTimeBaseValue(3.0f);
		niccRonno.setConditionX(24.0f);
		niccRonno.walkRight();

		while (true) {
			if (ronno.transform.position.x > 23.5f) {
				break;
			}
			yield null;
		}

		emInstance.nextTask();
	}

	private function action003Coroutine() {

		niccRonno.walkLeftNoSpeed();
		niccRonno.setDeltaTimeBaseValue(1.0f);
		yield WaitForSeconds(1);
		niccRonno.setConditionX(22.75f);
		niccRonno.walkLeft();

		while (true) {
			if (!niccRonno.warlkingFlg) {
				break;
			}
			yield null;
		}

		emInstance.nextTask();
	}

	private function action004Coroutine() {

		// TODO イベントファイルに「開閉」のSEを挿入
		var baseLayer : GameObject = FadeUtil.createBlackLayerByAlphaZero();
		yield FadeUtil.fadeIn(baseLayer, 2.0f);

		var doorObj : GameObject = GameObject.Find("door");
		doorObj.SetActive(false);
		doorOpenObj.SetActive(true);
		yield WaitForSeconds(1);

		yield FadeUtil.fadeOut(baseLayer, 2.0f);

		emInstance.nextTask();
	}
}