#pragma strict

class F01ShaseiTaikaiLogic extends BasicMonoBehaviourLogic {

	private var emInstance : EventManager;
	private var amInstance : AudioManager;
	private var mmInstance : MessageManager;
	private var tsuyoshi : GameObject;
	private var niccTsuyoshi : NoInputCharactersController;
	private var friend : GameObject;
	private var niccFriend : NoInputCharactersController;
	private var boss : GameObject;
	private var niccBoss : NoInputCharactersController;
	private var henchman : GameObject;
	private var niccHenchman : NoInputCharactersController;
	private var studentA : GameObject;
	private var niccStudentA : NoInputCharactersController;
	private var studentB : GameObject;
	private var niccStudentB : NoInputCharactersController;
	private var studentC : GameObject;
	private var niccStudentC : NoInputCharactersController;
	private var studentD : GameObject;
	private var niccStudentD : NoInputCharactersController;
	private var studentE : GameObject;
	private var niccStudentE : NoInputCharactersController;
	private var studentF : GameObject;
	private var niccStudentF : NoInputCharactersController;
	
	private var chestnut4 : GameObject;
	private var niccChestnut4 : NoInputOtherController;
	private var chestnut6 : GameObject;
	private var niccChestnut6 : NoInputOtherController;
	private var chestnut8 : GameObject;
	private var niccChestnut8 : NoInputOtherController;
	
	private var chestnut1 : GameObject;
	private var niccChestnut1 : NoInputOtherController;
	private var chestnut2 : GameObject;
	private var niccChestnut2 : NoInputOtherController;
	private var chestnut3 : GameObject;
	private var niccChestnut3 : NoInputOtherController;
	private var chestnut5 : GameObject;
	private var niccChestnut5 : NoInputOtherController;
	private var chestnut7 : GameObject;
	private var niccChestnut7 : NoInputOtherController;
	private var chestnut9 : GameObject;
	private var niccChestnut9 : NoInputOtherController;
	private var chestnut10 : GameObject;
	private var niccChestnut10 : NoInputOtherController;
	private var chestnut11 : GameObject;
	private var niccChestnut11 : NoInputOtherController;
	private var chestnut12 : GameObject;
	private var niccChestnut12 : NoInputOtherController;
	private var chestnut13 : GameObject;
	private var niccChestnut13 : NoInputOtherController;
	
	private var treeChestnut : GameObject;
	
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
		StartCoroutine(action001Coroutine());
	}
	
	public function action002() {
		niccStudentC.setConditionY(0);
		niccStudentC.walkFront();
		niccStudentD.setConditionY(0);
		niccStudentD.walkFront();
		niccStudentE.setConditionY(0);
		niccStudentE.walkFront();
		StartCoroutine(action002Coroutine());
		yield WaitForSeconds(2);
		emInstance.nextTask();
	}
	
	public function action003() {
		niccBoss.setConditionY(0);
		niccBoss.walkFront();
		niccFriend.setConditionY(0);
		niccFriend.walkFront();
		niccHenchman.setConditionY(0);
		niccHenchman.walkFront();
		niccTsuyoshi.setConditionY(0);
		niccTsuyoshi.walkFront();
		niccStudentA.setConditionY(0);
		niccStudentA.walkFront();
		niccStudentB.setConditionY(0);
		niccStudentB.walkFront();
		StartCoroutine(action003Coroutine());
	}
	
	public function action004() {
		niccChestnut4.setConditionY(5f);
		niccChestnut4.walkFront();
		niccChestnut6.setConditionY(4.8f);
		niccChestnut6.walkFront();
		niccChestnut8.setConditionY(4.9f);
		niccChestnut8.walkFront();
		StartCoroutine(action004Coroutine());
	}
	
	public function action005() {
		niccBoss.walkStop();
		niccBoss.walkBackNoSpeed();
		emInstance.nextTask();
		yield WaitForSeconds(0.2);
		niccFriend.walkStop();
		niccHenchman.walkStop();
		niccTsuyoshi.walkStop();
		niccStudentA.walkStop();
		niccStudentB.walkStop();
		niccFriend.walkBackNoSpeed();
		niccHenchman.walkBackNoSpeed();
		niccTsuyoshi.walkBackNoSpeed();
		niccStudentA.walkBackNoSpeed();
		niccStudentB.walkBackNoSpeed();
	}
	
	public function action006() {
		niccBoss.setConditionY(5f);
		niccBoss.walkBack();
		StartCoroutine(action006007Coroutine());
	}
	
	public function action007() {
		niccBoss.setConditionX(1f);
		niccBoss.walkRight();
		StartCoroutine(action006007Coroutine());
	}
	
	public function action008() {
		niccHenchman.setConditionY(4.3f);
		niccHenchman.walkBack();
		StartCoroutine(action008009Coroutine());
	}
	
	public function action009() {
		niccHenchman.setConditionX(0f);
		niccHenchman.walkRight();
		StartCoroutine(action008009Coroutine());
	}
	
	public function action010() {
		niccBoss.walkFrontNoSpeed();
		emInstance.nextTask();
	}
	
	public function action011() {
		emInstance.nextTask();
	}
	
	public function action012() {
		niccHenchman.walkFrontNoSpeed();
		emInstance.nextTask();
	}
	
	public function action013() {
		niccBoss.setConditionY(5.5f);
		niccBoss.walkBack();
		StartCoroutine(action013Coroutine());
	}
	
	public function action014() {
		StartCoroutine(action014Coroutine());
	}
	
	public function action015() {
		boss.transform.Rotate(0.0f, 0.0f, 90f);
		StartCoroutine(action015Coroutine());
	}
	
	public function action016() {
		StartCoroutine(action016023Coroutine());
	}
	
	public function action017() {
		niccChestnut1.setConditionY(4.3f);
		niccChestnut1.walkFront();
		niccChestnut3.setConditionY(5.3f);
		niccChestnut3.walkFront();
		niccChestnut10.setConditionY(5.0f);
		niccChestnut10.walkFront();
		niccChestnut13.setConditionY(5.3f);
		niccChestnut13.walkFront();
		StartCoroutine(action017Coroutine());
	}
	
	public function action018() {
		niccHenchman.setConditionX(1.0f);
		niccHenchman.walkRight();
		StartCoroutine(action018Coroutine());
	}
	
	public function action019() {
		chestnut1.active = false;
		niccStudentB.setConditionX(2.5f);
		niccStudentB.walkRight();
		StartCoroutine(action019020Coroutine());
	}
	
	public function action020() {
		niccTsuyoshi.setConditionX(1.8f);
		niccTsuyoshi.walkRight();
		niccStudentA.setConditionX(1.0f);
		niccStudentA.walkRight();
		niccStudentB.setConditionY(4.2f);
		niccStudentB.walkBack();
		StartCoroutine(action019020Coroutine());
	}
	
	public function action021() {
		niccTsuyoshi.setConditionY(3.8f);
		niccTsuyoshi.walkBack();
		niccStudentA.setConditionY(3.0f);
		niccStudentA.walkBack();
		niccFriend.setConditionX(0.3f);
		niccFriend.walkRight();
		chestnut6.active = false;
		chestnut8.active = false;
		emInstance.nextTask();
	}
	
	public function action022() {
		niccHenchman.setConditionY(4.4f);
		niccHenchman.walkBack();
		StartCoroutine(action022Coroutine());
	}
	
	public function action023() {
		StartCoroutine(action016023Coroutine());
	}
	
	public function action024() {
		chestnut1.active = false;
		chestnut10.active = false;
		chestnut13.active = false;
		niccChestnut2.setConditionY(5.1f);
		niccChestnut2.walkFront();
		niccChestnut5.setConditionY(4.6f);
		niccChestnut5.walkFront();
		niccChestnut7.setConditionY(5.1f);
		niccChestnut7.walkFront();
		niccChestnut9.setConditionY(4.8f);
		niccChestnut9.walkFront();
		niccChestnut11.setConditionY(5.4f);
		niccChestnut11.walkFront();
		niccChestnut12.setConditionY(5.2f);
		niccChestnut12.walkFront();
		StartCoroutine(action024Coroutine());
	}
	
	public function action025() {
		StartCoroutine(action025Coroutine());
	}
	
	public function action026() {
		yield niccBoss.moveUpDown();
		emInstance.nextTask();
	}
	
	public function action027() {
		niccStudentB.setConditionX(0.5f);
		niccStudentB.walkRight();
		StartCoroutine(action027Coroutine());
	}
	
	public function action028() {
		yield niccStudentA.moveUpDown();
		yield niccFriend.moveUpDown();
		niccStudentB.moveUpDown();
		yield niccTsuyoshi.moveUpDown();
		emInstance.nextTask();
	}
	
	public function action029() {
		niccStudentA.setConditionX(0.0f);
		niccStudentA.walkRight();
		StartCoroutine(action029031Coroutine());
	}
	
	public function action030() {
		// 処理なしに変更
		emInstance.nextTask();
	}
	
	public function action031() {
		// TODO 右向きのまま動けない
		niccStudentA.setConditionX(-0.37f);
		niccStudentA.walkRightBack();
		StartCoroutine(action029031Coroutine());
	}
	
	public function action032() {
		niccBoss.setConditionX(1.8f);
		niccBoss.walkRight();
		StartCoroutine(action032033Coroutine());
	}
	
	public function action033() {
		niccBoss.setConditionX(1.48f);
		niccBoss.walkLeft();
		StartCoroutine(action032033Coroutine());
	}
	
	public function action034() {
		yield niccStudentA.moveUpDown();
		emInstance.nextTask();
	}
	
	public function action035() {
		niccHenchman.setConditionX(2.0f);
		niccHenchman.walkLeft();
		StartCoroutine(action035Coroutine());
	}
	
	public function action036() {
		StartCoroutine(action036Coroutine());
	}
	
	public function action037() {
		StartCoroutine(action037Coroutine());
	}
	
	public function action038() {
		StartCoroutine(action038Coroutine());
		emInstance.nextTask();
	}
	
	public function action039() {
		StartCoroutine(action039Coroutine());
	}
	
	public function action040() {
		StartCoroutine(action040Coroutine());
	}
	
	private function action001Coroutine() {
		yield SceneLoadManager.getInstance().fadeOut(2);
		GameObject.Find("teacher").active = false;
		tsuyoshi = GameObject.Find("tsuyoshi_auto");
		niccTsuyoshi = tsuyoshi.GetComponent("NoInputCharactersController");
		niccTsuyoshi.walkBackNoSpeed();
		friend = GameObject.Find("friend");
		niccFriend = friend.GetComponent("NoInputCharactersController");
		niccFriend.walkRightNoSpeed();
		boss = GameObject.Find("boss");
		niccBoss = boss.GetComponent("NoInputCharactersController");
		niccBoss.walkFrontNoSpeed();
		henchman = GameObject.Find("henchman");
		niccHenchman = henchman.GetComponent("NoInputCharactersController");
		niccHenchman.walkRightNoSpeed();
		studentA = GameObject.Find("studentA");
		niccStudentA = studentA.GetComponent("NoInputCharactersController");
		niccStudentA.walkBackNoSpeed();
		studentB = GameObject.Find("studentB");
		niccStudentB = studentB.GetComponent("NoInputCharactersController");
		niccStudentB.walkBackNoSpeed();
		studentC = GameObject.Find("studentC");
		niccStudentC = studentC.GetComponent("NoInputCharactersController");
		niccStudentC.walkFrontNoSpeed();
		studentD = GameObject.Find("studentD");
		niccStudentD = studentD.GetComponent("NoInputCharactersController");
		niccStudentD.walkFrontNoSpeed();
		studentE = GameObject.Find("studentE");
		niccStudentE = studentE.GetComponent("NoInputCharactersController");
		niccStudentE.walkFrontNoSpeed();
		studentF = GameObject.Find("studentF");
		niccStudentF = studentF.GetComponent("NoInputCharactersController");
		tsuyoshi.transform.position = Vector2(0.53f, 5.1f);
		boss.transform.position = Vector2(0.47f, 6.89f);
		henchman.transform.position = Vector2(-0.32f, 6.62f);
		friend.transform.position = Vector2(-0.89f, 6f);
		studentA.transform.position = Vector2(-0.32f, 5.12f);
		studentB.transform.position = Vector2(1.4f, 5.09f);
		studentC.transform.position = Vector2(-0.38f, 3.33f);
		studentD.transform.position = Vector2(-1.9f, 4f);
		studentE.transform.position = Vector2(-1.45f, 4.7f);
		studentF.transform.position = Vector2(-1f, 0f);
		chestnut4 = GameObject.Find("chestnut4");
		
		niccChestnut4 = chestnut4.GetComponent("NoInputOtherController");
		niccChestnut4.setDeltaTimeBaseValue(1.2f);
		chestnut6 = GameObject.Find("chestnut6");
		niccChestnut6 = chestnut6.GetComponent("NoInputOtherController");
		niccChestnut6.setDeltaTimeBaseValue(1.2f);
		chestnut8 = GameObject.Find("chestnut8");
		niccChestnut8 = chestnut8.GetComponent("NoInputOtherController");
		niccChestnut8.setDeltaTimeBaseValue(1.2f);
		
		chestnut1 = GameObject.Find("chestnut1");
		niccChestnut1 = chestnut1.GetComponent("NoInputOtherController");
		niccChestnut1.setDeltaTimeBaseValue(1.2f);
		chestnut2 = GameObject.Find("chestnut2");
		niccChestnut2 = chestnut2.GetComponent("NoInputOtherController");
		niccChestnut2.setDeltaTimeBaseValue(1.2f);
		chestnut3 = GameObject.Find("chestnut3");
		niccChestnut3 = chestnut3.GetComponent("NoInputOtherController");
		niccChestnut3.setDeltaTimeBaseValue(1.2f);
		chestnut5 = GameObject.Find("chestnut5");
		niccChestnut5 = chestnut5.GetComponent("NoInputOtherController");
		niccChestnut5.setDeltaTimeBaseValue(1.2f);
		chestnut7 = GameObject.Find("chestnut7");
		niccChestnut7 = chestnut7.GetComponent("NoInputOtherController");
		niccChestnut7.setDeltaTimeBaseValue(1.2f);
		chestnut9 = GameObject.Find("chestnut9");
		niccChestnut9 = chestnut9.GetComponent("NoInputOtherController");
		niccChestnut9.setDeltaTimeBaseValue(1.2f);
		chestnut10 = GameObject.Find("chestnut10");
		niccChestnut10 = chestnut10.GetComponent("NoInputOtherController");
		niccChestnut10.setDeltaTimeBaseValue(1.2f);
		chestnut11 = GameObject.Find("chestnut11");
		niccChestnut11 = chestnut11.GetComponent("NoInputOtherController");
		niccChestnut11.setDeltaTimeBaseValue(1.2f);
		chestnut12 = GameObject.Find("chestnut12");
		niccChestnut12 = chestnut12.GetComponent("NoInputOtherController");
		niccChestnut12.setDeltaTimeBaseValue(1.2f);
		chestnut13 = GameObject.Find("chestnut13");
		niccChestnut13 = chestnut13.GetComponent("NoInputOtherController");
		niccChestnut13.setDeltaTimeBaseValue(1.2f);
		
		Camera.main.transform.position = Vector3(0.53f, 5f, -10);
		treeChestnut = GameObject.Find("tree_chestnut");
		yield WaitForSeconds(2);
		SceneLoadManager.getInstance().Destroy();
		SceneLoadManager.getInstance().fadeIn(2);
		emInstance.nextTask();
	}
	
	private function action002Coroutine() {
		while (true) {
			if (niccStudentE.warlkingFlg) {
				studentC.active = false;
				studentD.active = false;
				studentE.active = false;
				studentF.active = false;
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action003Coroutine() {
		while (true) {
			if (boss.transform.position.y < 6) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action004Coroutine() {
		while (true) {
			if (!niccChestnut4.warlkingFlg) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action006007Coroutine() {
		while (true) {
			if (!niccBoss.warlkingFlg) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action008009Coroutine() {
		while (true) {
			if (!niccHenchman.warlkingFlg) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action013Coroutine() {
		while (true) {
			if (!niccBoss.warlkingFlg) {
				niccBoss.walkFrontNoSpeed();
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action014Coroutine() {
		var bossAnim : Animator = boss.GetComponent(Animator);
		while (true) {
			var currentState = bossAnim.GetCurrentAnimatorStateInfo(0);
			if (currentState.IsName("Base Layer.front_wait")) {
				yield WaitForSeconds(0.5);
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action015Coroutine() {
		while (true) {
			var bossPos : Vector2 = boss.transform.position;
			bossPos.x += Time.deltaTime * 0.2f * 10.0f;
			boss.transform.position = bossPos;
			if (bossPos.x > 1.5) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action016023Coroutine() {
		var moveLength : float = 0.0f;
		var directionFlg : boolean = true;
		var count : int = 0;
		var treeChestnutPos : Vector2 = treeChestnut.transform.position;
		var currentX = treeChestnutPos.x;
		while (true) {
			treeChestnutPos = treeChestnut.transform.position;
			var length = Time.deltaTime * 0.2f * 20f;
			if (directionFlg) {
				treeChestnutPos.x += length;
				moveLength += length;
				if (moveLength > 0.05f) {
					directionFlg = false;
				}
			} else {
				treeChestnutPos.x -= length;
				moveLength -= length;
				if (moveLength < -0.05f) {
					directionFlg = true;
					count++;
				}
			}
			treeChestnut.transform.position = treeChestnutPos;
			
			if (count == 5) {
				break;
			}
			yield null;
		}
		
		while (true) {
			treeChestnutPos = treeChestnut.transform.position;
			treeChestnutPos.x += Time.deltaTime * 0.2f * 20.0f;
			if (currentX < treeChestnutPos.x) {
				treeChestnutPos.x = currentX;
				treeChestnut.transform.position = treeChestnutPos;
				emInstance.nextTask();
				break;
			}
			treeChestnut.transform.position = treeChestnutPos;
		}
		yield null;
	}
	
	private function action017Coroutine() {
		while (true) {
			if (!niccChestnut3.warlkingFlg) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action018Coroutine() {
		while (true) {
			if (!niccHenchman.warlkingFlg) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action019020Coroutine() {
		while (true) {
			if (!niccStudentB.warlkingFlg) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action022Coroutine() {
		SceneLoadManager.getInstance().fadeOut(2);
		while (true) {
			if (!niccHenchman.warlkingFlg) {
				yield kick();
				emInstance.nextTask();
				break;
			}
			yield null;
		}
		
	}
	
	private function kick() {
		var pos : Vector2 = boss.transform.position;
		var downX = pos.x;
		var upX = pos.x - 0.3f;
		var upFlg : boolean = true;
		while(true) {
			pos = boss.transform.position;
			if (upFlg) {
				pos.x -= Time.deltaTime * 5.0f * 1.0f;
				if (pos.x < upX) {
					upFlg = false;
				}
			} else {
				pos.x += Time.deltaTime * 5.0f * 1.0f;
				if (downX < pos.x) {
					pos.x = downX;
				}
			}
			boss.transform.position = pos;
			
			if (pos.x == downX) {
				break;
			}
			yield null;
		}
	}
	
	private function action024Coroutine() {
		while (true) {
			if (!niccChestnut11.warlkingFlg) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
	}
	
	private function action025Coroutine() {
		yield WaitForSeconds(2);
		chestnut2.active = false;
		chestnut3.active = false;
		chestnut4.active = false;
		chestnut5.active = false;
		chestnut7.active = false;
		chestnut9.active = false;
		chestnut11.active = false;
		chestnut12.active = false;
		boss.transform.Rotate(0.0f, 0.0f, -90f);
		boss.transform.position = Vector2(1.48f, 4.99f);
		niccBoss.walkLeftNoSpeed();
		henchman.transform.position = Vector2(2.32f, 4.32f);
		niccHenchman.walkLeftNoSpeed();
		studentA.transform.position = Vector2(-0.37f, 5.46f);
		niccStudentA.walkRightNoSpeed();
		friend.transform.position = Vector2(-0.94f, 4.94f);
		niccFriend.walkRightNoSpeed();
		tsuyoshi.transform.position = Vector2(-0.42f, 4.15f);
		niccTsuyoshi.walkRightNoSpeed();
		studentB.transform.position = Vector2(0.17f, 3.65f);
		niccStudentB.walkRightNoSpeed();
		juteBag = Instantiate(juteBagPrefab, Vector2 (1.0f, 4.7f), Quaternion.identity);
		niccJuteBag = juteBag.GetComponent("NoInputOtherController");
		yield WaitForSeconds(1);
		SceneLoadManager.getInstance().Destroy();
		yield SceneLoadManager.getInstance().fadeIn(2);
		emInstance.nextTask();
	}
	
	private function action027Coroutine() {
		while (true) {
			if (!niccStudentB.warlkingFlg) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
	}
	
	private function action029031Coroutine() {
		while (true) {
			if (!niccStudentA.warlkingFlg) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
	}
	
	private function action032033Coroutine() {
		while (true) {
			if (!niccBoss.warlkingFlg) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
	}
	
	private function action035Coroutine() {
		while (true) {
			if (!niccHenchman.warlkingFlg) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
	}
	
	private function action036Coroutine() {
		niccStudentA.setConditionY(6.0f);
		niccStudentA.walkFrontBack();
		niccStudentB.setConditionX(1.0f);
		niccStudentB.walkLeftBack();
		niccFriend.setConditionX(-1.5f);
		niccFriend.walkRightBack();
		while (true) {
			if (!niccFriend.warlkingFlg) {
				break;
			}
			yield null;
		}
		yield niccBoss.moveUpDown();
		emInstance.nextTask();
	}
	
	private function action037Coroutine() {
		yield SceneLoadManager.getInstance().fadeOut(2);
		tsuyoshi.transform.position = Vector2(1.0f, 4.99f);
		niccTsuyoshi.walkLeftNoSpeed();
		juteBag.transform.position = Vector2(1.85f, 4.7f);
		henchman.transform.position = Vector2(-0.2f, 4.6f);
		niccHenchman.walkRightNoSpeed();
		studentA.transform.position = Vector2(-0.3f, 6.0f);
		niccStudentA.walkRightNoSpeed();
		friend.transform.position = Vector2(-0.77f, 5.6f);
		niccFriend.walkRightNoSpeed();
		boss.transform.position = Vector2(0.46f, 4.15f);
		niccBoss.walkRightNoSpeed();
		studentB.transform.position = Vector2(-1.3f, 5.0f);
		niccStudentB.walkRightNoSpeed();
		yield WaitForSeconds(1);
		SceneLoadManager.getInstance().Destroy();
		yield SceneLoadManager.getInstance().fadeIn(2);
		emInstance.nextTask();
	}
	
	private function action038Coroutine() {
		niccBoss.setConditionY(0.0f);
		niccBoss.walkFront();
		niccHenchman.setConditionY(0.0f);
		niccHenchman.walkFront();
		niccStudentB.setConditionY(0.0f);
		niccStudentB.walkFront();
		niccFriend.setConditionY(0.0f);
		niccFriend.walkFront();
		niccStudentA.setConditionY(0.0f);
		niccStudentA.walkFront();
		while (true) {
			if (studentA.transform.position.y < 1) {
				boss.active = false;
				henchman.active = false;
				friend.active = false;
				studentA.active = false;
				studentB.active = false;
				break;
			}
			yield null;
		}
		yield null;
	}
	
	private function action039Coroutine() {
		niccTsuyoshi.setConditionX(1.6f);
		niccTsuyoshi.walkRight();
		while (true) {
			if (!niccTsuyoshi.warlkingFlg) {
				emInstance.nextTask();
				break;
			}
			yield null;
		}
	}
	
	private function action040Coroutine() {
		niccTsuyoshi.setConditionX(0.0f);
		niccTsuyoshi.walkLeft();
		niccJuteBag.setConditionX(0.0f);
		niccJuteBag.walkLeft();
		while (true) {
			if (!niccJuteBag.warlkingFlg) {
				break;
			}
			yield null;
		}
		
		niccTsuyoshi.setConditionY(0.0f);
		niccTsuyoshi.walkFront();
		niccJuteBag.setConditionY(0.0f);
		niccJuteBag.walkFront();
		while (true) {
			if (tsuyoshi.transform.position.y < 3) {
				break;
			}
			yield null;
		}
		
		var assetBundleInfoDic = new Dictionary.<String, int>();
		assetBundleInfoDic.Add("prefab/tsuyoshi_auto", 0);
		assetBundleInfoDic.Add("prefab/msgdialog", 0);
		SceneLoadManager.getInstance().loadLevelInLoading(1.0f, 3.0f, "f01_mountainBehind1_2", assetBundleInfoDic);
	}
}