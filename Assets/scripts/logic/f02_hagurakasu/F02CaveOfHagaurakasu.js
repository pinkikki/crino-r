
class F02CaveOfHagaurakasu extends BasicMonoBehaviourLogic {

	function Start () {

		var ciInstance : CharactersInitializer = FindObjectOfType(CharactersInitializer);

		var entity : EventMasterEntity = EventMasterDao.selectLatestEventIdBySceneId("f02_caveOfHagaurakasu");

		if (entity == null) {
			return;
		}

		var eventId = entity.getEventId();
		if (eventId == "CR_ANANOSOKO_A") {
			ciInstance.fileName = "f02_hagurakasu/s06_caveOfHagaurakasu/standard.txt";
			ciInstance.cameraTarget = "tsuyoshi_manual";
			this.gameObject.AddComponent(F02AnanosokoTrigger);
		} else if (eventId == "CR_GURAKASUSHUEI_A" || eventId == "CR_NINGUARAWARU_A") {
			ciInstance.fileName = "f02_hagurakasu/s06_caveOfHagaurakasu/standard.txt";
			ciInstance.cameraTarget = "tsuyoshi_manual";
			StartCoroutine(setTrigger());
		} else if (eventId == "CR_TAIYOUNOHANASHI_A") {
			ciInstance.fileName = "f02_hagurakasu/s06_caveOfHagaurakasu/taiyounoHanashiA.txt";
			ciInstance.cameraTarget = "tsuyoshi_auto";
			this.gameObject.AddComponent(F02TaiyounoHanashiATrigger);
		} else if (eventId == "CR_EMONOKAISOU_A") {
			ciInstance.selectFileFlg = false;
			var camera : GameObject = GameObject.Find("Main Camera");
			var pos = camera.transform.position;
			pos.x = 15.0f;
			pos.y = 9.0f;
			camera.transform.position = pos;
			this.gameObject.AddComponent(F02EmonoKaisouATrigger);
		} else if (eventId == "CR_EMONOKAISOUGO_A") {
			ciInstance.fileName = "f02_hagurakasu/s06_caveOfHagaurakasu/emonoKaisougoA.txt";
			ciInstance.cameraTarget = "tsuyoshi_auto";
			this.gameObject.AddComponent(F02EmonoKaisougoATrigger);
		} else if (eventId == "CR_GURAKASUSHUEI_B") {
			ciInstance.fileName = "f02_hagurakasu/s06_caveOfHagaurakasu/gurakasuShueiB.txt";
			ciInstance.cameraTarget = "tsuyoshi_auto";
			this.gameObject.AddComponent(F02GurakasuShueiBTrigger);
		}
	}

	function Update () {
	}

	private function setTrigger() {
		var tsuyoshi : GameObject;
		while (tsuyoshi == null) {
			tsuyoshi = GameObject.Find("tsuyoshi_manual");
			yield null;
		}

		tsuyoshi.AddComponent(F02GurakasuShueiATrigger);
		tsuyoshi.AddComponent(F02ninguArawaruATrigger);
	}

}