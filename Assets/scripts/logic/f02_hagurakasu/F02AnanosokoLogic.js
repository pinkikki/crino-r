
class F02AnanosokoLogic extends BasicMonoBehaviourLogic {
	private var baseLayer : GameObject;
	private var emInstance : EventManager;
	private var tsuyoshi : GameObject;
	private var fieldMenu : GameObject;

	function Start () {
		// TODO 本来は、FieldMenuManagerが既に存在するはずだから、StartCoroutineする必要はない
		StartCoroutine(todoGetFieldMenuManager());
		baseLayer = FadeUtil.createBlackLayer();
		emInstance = FindObjectOfType(EventManager);
		emInstance.eventList.Add("[0001]");
		var doorOpenObj : GameObject = GameObject.Find("door_open");
		doorOpenObj.SetActive(false);
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

	function Update () {
	}

	public function action001() {
		tsuyoshi = GameObject.Find("tsuyoshi_manual");
		tsuyoshi.transform.Rotate(0, 0, 90);
		yield FadeUtil.fadeOut(baseLayer, 3.0f);
		Destroy(baseLayer);
		emInstance.nextTask();
	}

	public function action002() {
		tsuyoshi.transform.Rotate(0, 0, -90);
		yield WaitForSeconds(1.5f);
		var anim : Animator = tsuyoshi.GetComponent(Animator);
		walkRightNoSpeed(anim);
		yield WaitForSeconds(0.5f);
		walkLeftNoSpeed(anim);
		yield WaitForSeconds(0.7f);
		walkRightNoSpeed(anim);
		yield WaitForSeconds(0.7f);
		walkLeftNoSpeed(anim);
		yield WaitForSeconds(1.2f);
		walkFrontNoSpeed(anim);
		yield WaitForSeconds(1.0f);
		fieldMenu.SetActive(true);
		emInstance.nextTask();
	}

	public function action003() {
		var entity : EventMasterEntity = EventMasterDao.selectByPk("CR_ANANOSOKO_A", "f02_caveOfHagaurakasu");
		entity.setCompleteFlg(true);
		EventMasterDao.update(entity);
		tsuyoshi.AddComponent(F02GurakasuShueiATrigger);
		tsuyoshi.AddComponent(F02ninguArawaruATrigger);
		Destroy(this);
		emInstance.nextTask();
	}

	private function walkFrontNoSpeed(animObj : Animator) {
		setDirection(true, false, false, false, animObj);
	}

	private function walkLeftNoSpeed(animObj : Animator) {	
		setDirection(false, false, true, false, animObj);
	}

	private function walkRightNoSpeed(animObj : Animator) {
		setDirection(false, false, false, true, animObj);
	}
		
	private function setDirection(fwFlg : boolean, bwFlg : boolean, lwFlg : boolean, rwFlg : boolean, animObj : Animator) {
		animObj.SetBool("Fwait", fwFlg);
		animObj.SetBool("Bwait", bwFlg);
		animObj.SetBool("Lwait", lwFlg);
		animObj.SetBool("Rwait", rwFlg);
	}
}
