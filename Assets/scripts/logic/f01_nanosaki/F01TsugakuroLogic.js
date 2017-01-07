#pragma strict

class F01TsugakuroLogic extends BasicMonoBehaviourLogic {

	private var emInstance : EventManager;
	private var amInstance : AudioManager;
	private var mmInstance : MessageManager;
	var tsuyoshi : GameObject;
	var niccTsuyoshi : NoInputCharactersController;
	var friend : GameObject;
	var niccFriend : NoInputCharactersController;
	
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
		niccTsuyoshi.setConditionY(2);
		niccTsuyoshi.walkBack();
		StartCoroutine(action001Coroutine());
	}
	
	public function action002() {
		niccTsuyoshi.walkFrontNoSpeed();
		friend = GameObject.Find("friend");
		niccFriend = friend.GetComponent("NoInputCharactersController");
		niccFriend.setConditionY(2);
		niccFriend.walkBack();
		StartCoroutine(action002Coroutine());
	}
	
	public function action003() {
		niccTsuyoshi.setConditionY(9.5);
		niccTsuyoshi.walkBack();
		niccFriend.setConditionY(9.5);
		niccFriend.walkBack();
		StartCoroutine(action003Coroutine());
		emInstance.nextTask();
	}
	
	public function action004() {
		emInstance.nextTask();
	}
	
	public function action005() {
		niccTsuyoshi.setConditionX(9.5);
		niccTsuyoshi.walkLeft();
		niccFriend.setConditionX(10);
		niccFriend.walkLeft();
		StartCoroutine(action005Coroutine());
	}
	
	public function action006() {
		niccTsuyoshi.setConditionY(13);
		niccTsuyoshi.walkBack();
		niccFriend.setConditionY(13);
		niccFriend.walkBack();
		StartCoroutine(action006Coroutine());
	}
	
	public function action007() {
		amInstance.stopBgmAtFadeOut(3.0f);
		var assetBundleInfoDic = new Dictionary.<String, int>();
		assetBundleInfoDic.Add("f01/nanosaki/s99/cmn/standard", 0);
		assetBundleInfoDic.Add("f01/nanosaki/s04/mb/shaseitaikai", 0);
		assetBundleInfoDic.Add("f01/nanosaki/s04/mb/tasogare", 0);
		assetBundleInfoDic.Add("prefab/tsuyoshi_auto", 0);
		assetBundleInfoDic.Add("prefab/students", 0);
		assetBundleInfoDic.Add("prefab/msgdialog", 0);
		SceneLoadManager.getInstance().loadLevelInLoading(1.0f, 3.0f, "f01_mountainBehind1_1", assetBundleInfoDic);
	}
	
	private function action001Coroutine() {
		while (true) {
			if (tsuyoshi.transform.position.y > 1.5) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action002Coroutine() {
		while (true) {
			if (!niccFriend.warlkingFlg) {
				niccTsuyoshi.walkRightNoSpeed();
				niccFriend.walkLeftNoSpeed();
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action003Coroutine() {
		while (true) {
			if (!niccFriend.warlkingFlg) {
				niccTsuyoshi.walkRightNoSpeed();
				niccFriend.walkLeftNoSpeed();
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action005Coroutine() {
		while (true) {
			if (!niccTsuyoshi.warlkingFlg) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action006Coroutine() {
		while (true) {
			if (tsuyoshi.transform.position.y > 10) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
}