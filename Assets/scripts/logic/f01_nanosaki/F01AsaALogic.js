#pragma strict

class F01AsaALogic extends BasicMonoBehaviourLogic {

	private var emInstance : EventManager;
	private var amInstance : AudioManager;
	var tsuyoshi : GameObject;
	var nicc : NoInputCharactersController;
	
	function Start () {
		emInstance = FindObjectOfType(EventManager);
		amInstance = FindObjectOfType(AudioManager);
		emInstance.eventList.Add("[0001]");
	}

	function Update () {

	}

	public function action001() {
		tsuyoshi = GameObject.Find("tsuyoshi_auto");
		nicc = tsuyoshi.GetComponent("NoInputCharactersController");
		nicc.setConditionX(-1.0f);
		nicc.walkRight();
		StartCoroutine(action001002003Coroutine());
	}
	
	public function action002() {
		nicc.setConditionX(0.0f);
		nicc.walkRight();
		StartCoroutine(action001002003Coroutine());
	}
	
	public function action003() {
		nicc.setConditionY(0.0001f);
		nicc.walkBack();
		StartCoroutine(action001002003Coroutine());
	}
	
	public function action004() {
		yield nicc.moveUpDown();
		nicc.walkFrontNoSpeed();
		emInstance.nextTask();
	}
	
	public function action005() {
		amInstance.stopBgmAtFadeOut(3.0f);
		var assetBundleInfoDic = new Dictionary.<String, int>();
		assetBundleInfoDic.Add("f01/nanosaki/s99/cmn/standard", 0);
		assetBundleInfoDic.Add("f01/nanosaki/s02/na/tsugakuro", 0);
		assetBundleInfoDic.Add("prefab/tsuyoshi_auto", 0);
		assetBundleInfoDic.Add("prefab/students", 0);
		assetBundleInfoDic.Add("prefab/msgdialog", 0);
		SceneLoadManager.getInstance().loadLevelInLoading(1.0f, 3.0f, "f01_nanosakiAppearance", assetBundleInfoDic);
	}
	
	private function action001002003Coroutine() {
		while (true) {
			if (!nicc.warlkingFlg) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
}