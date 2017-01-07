class F02GurakasuShueiALogic extends BasicMonoBehaviourLogic {

	private var emInstance : EventManager;
	private var ronno : GameObject;
	private var niccRonno : NoInputCharactersController;

	function Start () {
		emInstance = FindObjectOfType(EventManager);
		emInstance.eventList.Add("[0002]");
	}

	function Update () {
	}

	public function action001() {
		ronno = GameObject.Find("ronno_auto");
		niccRonno = ronno.GetComponent(NoInputCharactersController);
		yield niccRonno.moveUpDown();
		emInstance.nextTask();
	}

	public function action002() {
		niccRonno.setDeltaTimeBaseValue(3.0f);
		niccRonno.setConditionX(30.0f);
		niccRonno.walkRight();
		emInstance.nextTask();
	}

	public function action003() {
		var entity : EventMasterEntity = EventMasterDao.selectByPk("CR_GURAKASUSHUEI_A", "f02_caveOfHagaurakasu");
		entity.setCompleteFlg(true);
		EventMasterDao.update(entity);
		emInstance.nextTask();
		Destroy(this);
	}
}