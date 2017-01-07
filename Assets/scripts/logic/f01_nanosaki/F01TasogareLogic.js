#pragma strict

class F01TasogareLogic extends BasicMonoBehaviourLogic {

	private var emInstance : EventManager;
	private var amInstance : AudioManager;
	private var mmInstance : MessageManager;
	private var labInstance : LoadAssetBandles;
	private var tsuyoshi : GameObject;
	private var niccTsuyoshi : NoInputCharactersController;
	
	private var juteBag : GameObject;
	private var niccJuteBag : NoInputOtherController;
	public var juteBagPrefab : GameObject;
	
	function Start () {
		emInstance = FindObjectOfType(EventManager);
		amInstance = FindObjectOfType(AudioManager);
		mmInstance = FindObjectOfType(MessageManager);
		labInstance = LoadAssetBandles.getInstance();
		emInstance.eventList.Add("[0001]");
	}

	function Update () {

	}
	
	public function action001() {
		tsuyoshi = GameObject.Find("tsuyoshi_auto");
		niccTsuyoshi = tsuyoshi.GetComponent("NoInputCharactersController");
		niccTsuyoshi.setDeltaTimeBaseValue(0.7f);
		juteBag = Instantiate(juteBagPrefab, Vector2 (-0.3f, -0.3f), Quaternion.identity);
		niccJuteBag = juteBag.GetComponent("NoInputOtherController");
		niccJuteBag.setDeltaTimeBaseValue(0.7f);
		niccTsuyoshi.setConditionX(6.5f);
		niccTsuyoshi.walkRight();
		niccJuteBag.setConditionX(6.5f);
		niccJuteBag.walkRight();
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
		amInstance.stopBgm();
		amInstance.destroy();
		var assetBundleInfoDic = new Dictionary.<String, int>();
		assetBundleInfoDic.Add("f96/tsuyoshiyume", 0);
		assetBundleInfoDic.Add("prefab/msgdialog", 0);
		SceneLoadManager.getInstance().loadLevelInLoading(1.0f, 3.0f, "f96_tsuyoshiyume-B", assetBundleInfoDic);
	}
	
	private function action001Coroutine() {
		while (true) {
			if (!niccTsuyoshi.warlkingFlg) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
	}
	
	private function action002Coroutine() {
		amInstance.downBgmVolume(3.0f, 0.3f);
		emInstance.nextTask();
		niccTsuyoshi.setConditionY(2.0f);
		niccTsuyoshi.walkBack();
		niccJuteBag.setConditionY(1.7f);
		niccJuteBag.walkBack();
		var v_speed : float = 1.0f;
		while(true) {
			var pos : Vector3 = Camera.main.transform.position;
			pos.y += Time.deltaTime * v_speed * 1.0f;
			Camera.main.transform.position = pos;
			
			if (12.0f < pos.y  && pos.y <= 15.0f) {
				v_speed = Mathf.Lerp(1.0f, 0.3f, (pos.y -12.0f) / 3.0f);
			}
			if (pos.y > 15.0f) {
				break;
			}
			yield null;
		}
	}
	
	private function action003Coroutine() {
		while(true) {
			var pos : Vector3 = Camera.main.transform.position;
			if (pos.y > 15.0f) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
	}
	
	private function action004Coroutine() {
		var h_speed : float = 10.0f;
		var v_speed : float = 12.0f;
		var moveLength : float = 0.0f;
		var directionFlg : boolean = true;
		while(true) {
			var pos : Vector3 = Camera.main.transform.position;
			var length = Time.deltaTime * 0.2f * 20f;
			if (directionFlg) {
				pos.x += length;
				moveLength += length;
				if (moveLength > 0.05f) {
					directionFlg = false;
				}
			} else {
				pos.x -= length;
				moveLength -= length;
				if (moveLength < -0.05f) {
					directionFlg = true;
				}
			}
			
			pos.y -= Time.deltaTime * v_speed * 1.0f;
			Camera.main.transform.position = pos;
			if (pos.y < 8.0f) {
				break;
			}
			yield null;
		}
		
		yield SceneLoadManager.getInstance().fadeOut(0.5);
		emInstance.nextTask();
	}

}