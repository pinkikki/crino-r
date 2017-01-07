#pragma strict

class F01GezanLogic extends BasicMonoBehaviourLogic {

	private var emInstance : EventManager;
	private var amInstance : AudioManager;
	private var mmInstance : MessageManager;
	private var tsuyoshi : GameObject;
	private var niccTsuyoshi : NoInputCharactersController;
	
	private var juteBag : GameObject;
	private var niccJuteBag : NoInputOtherController;
	public var juteBagPrefab : GameObject;
	
	function Start () {
		emInstance = FindObjectOfType(EventManager);
		amInstance = FindObjectOfType(AudioManager);
		mmInstance = FindObjectOfType(MessageManager);
		emInstance.eventList.Add("[0001]");
	}

	function Update () {

	}

	public function action001() {
		tsuyoshi = GameObject.Find("tsuyoshi_auto");
		niccTsuyoshi = tsuyoshi.GetComponent("NoInputCharactersController");
		niccTsuyoshi.setDeltaTimeBaseValue(0.7f);
		juteBag = Instantiate(juteBagPrefab, Vector2 (0.0f, 9.7f), Quaternion.identity);
		niccJuteBag = juteBag.GetComponent("NoInputOtherController");
		niccJuteBag.setDeltaTimeBaseValue(0.7f);
		niccTsuyoshi.setConditionY(4);
		niccTsuyoshi.walkFront();
		niccJuteBag.setConditionY(3.8);
		niccJuteBag.walkFront();
		StartCoroutine(action001Coroutine());
	}
	
	public function action002() {
		niccTsuyoshi.setConditionY(-5);
		niccTsuyoshi.walkFront();
		niccJuteBag.setConditionY(-5.3);
		niccJuteBag.walkFront();

		var assetBundleInfoDic = new Dictionary.<String, int>();
		assetBundleInfoDic.Add("prefab/tsuyoshi_auto", 0);
		assetBundleInfoDic.Add("prefab/msgdialog", 0);
		assetBundleInfoDic.Add("prefab/tasogarenosora", 0);
		SceneLoadManager.getInstance().loadLevelInLoading(1.0f, 3.0f, "f01_mountainBehind1_3", assetBundleInfoDic);
	}
	
	private function action001Coroutine() {
		while (true) {
			if (tsuyoshi.transform.position.y < 6) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
}