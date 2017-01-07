#pragma strict

class F96TsuyoshiYumeBLogic extends BasicMonoBehaviourLogic {

	private var emInstance : EventManager;
	private var amInstance : AudioManager;
	private var tsuyoshiMsg : GameObject;
	private var tsuyoshiMsgText : Text;
	private var tsukaimaMsg : GameObject;
	private var tsukaimaMsgText : Text;
	private var raw : RawImage;
	private var tsuyoshi : GameObject;
	private var niccTsuyoshi : NoInputOtherController;
	private var tsukaimaA : GameObject;
	private var tsukaimaB : GameObject;
	private var tsukaimaC : GameObject;
	private var tsukaimaD : GameObject;
	private var niccTsukaimaA : NoInputOtherController;
	private var niccTsukaimaB : NoInputOtherController;
	private var niccTsukaimaC : NoInputOtherController;
	private var niccTsukaimaD : NoInputOtherController;
	
	function Start () {
		tsuyoshiMsg = GameObject.Find("tsuyoshiyume_msg_dialog_tsuyoshi");
		tsuyoshiMsgText = tsuyoshiMsg.transform.FindChild("Body/Text").GetComponent("Text");
		tsukaimaMsg = GameObject.Find("tsuyoshiyume_msg_dialog_tsukaima");
		tsukaimaMsgText = tsukaimaMsg.transform.FindChild("Body/Text").GetComponent("Text");
		emInstance = FindObjectOfType(EventManager);
		emInstance.eventList.Add("[0001]");
		amInstance = FindObjectOfType(AudioManager);
		raw = tsuyoshiMsg.AddComponent(RawImage);
		raw.color = new Color(0, 0, 0, 1);
		tsuyoshi = GameObject.Find("tsuyoshi");
		tsukaimaA = GameObject.Find("tsukaimaA");
		tsukaimaB = GameObject.Find("tsukaimaB");
		tsukaimaC = GameObject.Find("tsukaimaC");
		tsukaimaD = GameObject.Find("tsukaimaD");
		niccTsuyoshi = tsuyoshi.GetComponent("NoInputOtherController");
		niccTsukaimaA = tsukaimaA.GetComponent("NoInputOtherController");
		niccTsukaimaB = tsukaimaB.GetComponent("NoInputOtherController");
		niccTsukaimaC = tsukaimaC.GetComponent("NoInputOtherController");
		niccTsukaimaD = tsukaimaD.GetComponent("NoInputOtherController");
		tsukaimaA.active = false;
		tsukaimaB.active = false;
		tsukaimaC.active = false;
		tsukaimaD.active = false;
	}

	function Update () {

	}
	
	public function action001() {
		yield StartCoroutine(action001Coroutine());
		tsuyoshiMsgText.text = "（…）";
		emInstance.nextTask();
	}
	
	public function action002() {
		tsuyoshiMsgText.text = "";
		emInstance.nextTask();
	}
	
	public function action003() {
		tsuyoshiMsgText.text = "（また、この夢か…？）";
		emInstance.nextTask();
	}
	
	public function action004() {
		tsuyoshiMsgText.text = "（…）";
		emInstance.nextTask();
	}
	
	public function action005() {
		tsuyoshiMsgText.text = "";
		emInstance.nextTask();
	}
	
	public function action006() {
		tsuyoshiMsgText.text = "…？？";
		emInstance.nextTask();
	}
	
	public function action007() {
		tsukaimaMsgText.text = "ケケケケッ！";
		emInstance.nextTask();
	}
	
	public function action008() {
		tsuyoshiMsgText.text = "…！？";
		emInstance.nextTask();
	}
	
	public function action009() {
		tsuyoshiMsgText.text = "";
		tsukaimaMsgText.text = "";
		emInstance.nextTask();
	}
	
	public function action010() {
		StartCoroutine(action010Coroutine());
	}
	
	public function action011() {
		tsuyoshiMsgText.text = "や…めてっ！";
		emInstance.nextTask();
	}
	
	public function action012() {
		tsukaimaMsgText.text = "ケケケケッ！";
		emInstance.nextTask();
	}
	
	public function action013() {
		
		niccTsuyoshi.setConditionY(-5.0f);
		niccTsuyoshi.walkFront();
		niccTsukaimaA.setConditionY(-5.0f);
		niccTsukaimaA.walkFront();
		niccTsukaimaB.setConditionY(-5.0f);
		niccTsukaimaB.walkFront();
		niccTsukaimaC.setConditionY(-5.0f);
		niccTsukaimaC.walkFront();
		niccTsukaimaD.setConditionY(-5.0f);
		niccTsukaimaD.walkFront();
		emInstance.nextTask();
	}
	
	public function action014() {
		amInstance.stopBgmAtFadeOut(3.0f);
		var assetBundleInfoDic = new Dictionary.<String, int>();
		assetBundleInfoDic.Add("prefab/tsuyoshi_manual", 0);
		assetBundleInfoDic.Add("prefab/ronno_auto", 0);
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
	}
	
	private function action001Coroutine() {
		yield WaitForSeconds(3);
		var blackTime : float;
		var interval : float = 2.0f;
		while(true) {
			blackTime += Time.deltaTime;
		    raw.color = new Color(0, 0, 0, Mathf.Lerp(1f, 0f, blackTime / interval));
		    if (interval < blackTime) {
		    	break;
		    }
		    yield null;
		}
	}
	
	private function action010Coroutine() {
		var tsukaimaASr : SpriteRenderer = tsukaimaA.GetComponent(SpriteRenderer);
		var tsukaimaBSr : SpriteRenderer = tsukaimaB.GetComponent(SpriteRenderer);
		var tsukaimaCSr : SpriteRenderer = tsukaimaC.GetComponent(SpriteRenderer);
		var tsukaimaDSr : SpriteRenderer = tsukaimaD.GetComponent(SpriteRenderer);
		var fadeTime : float;
		var interval : float = 2.0f;
		tsukaimaA.active = true;
		tsukaimaB.active = true;
		tsukaimaC.active = true;
		tsukaimaD.active = true;
		while(true) {
			fadeTime += Time.deltaTime;
			tsukaimaASr.color = new Color(Mathf.Lerp(1f, 0.5f, fadeTime / interval),
									Mathf.Lerp(1f, 0.5f, fadeTime / interval),
									Mathf.Lerp(1f, 0.5f, fadeTime / interval),
									Mathf.Lerp(0.5f, 1f, fadeTime / interval));
			tsukaimaBSr.color = new Color(Mathf.Lerp(1f, 0.5f, fadeTime / interval),
									Mathf.Lerp(1f, 0.5f, fadeTime / interval),
									Mathf.Lerp(1f, 0.5f, fadeTime / interval),
									Mathf.Lerp(0.5f, 1f, fadeTime / interval));
			tsukaimaCSr.color = new Color(Mathf.Lerp(1f, 0.5f, fadeTime / interval),
									Mathf.Lerp(1f, 0.5f, fadeTime / interval),
									Mathf.Lerp(1f, 0.5f, fadeTime / interval),
									Mathf.Lerp(0.5f, 1f, fadeTime / interval));
			tsukaimaDSr.color = new Color(Mathf.Lerp(1f, 0.5f, fadeTime / interval),
									Mathf.Lerp(1f, 0.5f, fadeTime / interval),
									Mathf.Lerp(1f, 0.5f, fadeTime / interval),
									Mathf.Lerp(0.5f, 1f, fadeTime / interval));
			if (interval < fadeTime) {
				emInstance.nextTask();
		    	break;
		    }
		    yield null;
		}
	}
}