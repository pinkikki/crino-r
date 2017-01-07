#pragma strict

class F96TsuyoshiYumeALogic extends BasicMonoBehaviourLogic {

	private var emInstance : EventManager;
	private var amInstance : AudioManager;
	private var msg : GameObject;
	private var msgText : Text;
	private var raw : RawImage;
	private var time : float = 0.0f;
	private var blackTime : float = 0.0f;
	private var interval : float = 1.0f;
	private var fadeOutFlg : boolean = false;
	private var tsuyoshiAndPuzzle : GameObject;
	private var tsuyoshi : GameObject;
	private var puzzleA1 : GameObject;
	private var puzzleD1 : GameObject;
	private var puzzleE1 : GameObject;
	private var puzzleB1 : GameObject;
	private var puzzleF1 : GameObject;
	private var puzzleG1 : GameObject;
	private var puzzleC1 : GameObject;
	private var puzzleC2 : GameObject;
	private var puzzleG2 : GameObject;
	private var puzzleF2 : GameObject;
	private var puzzleB2 : GameObject;
	private var puzzleE2 : GameObject;
	private var puzzleD2 : GameObject;
	private var akuma : GameObject;
	private var isPuzzleC2ACtion010 : boolean = true;
	private var isPuzzleC1ACtion010 : boolean = false;
	private var isPuzzleB2ACtion010 : boolean = false;
	private var isPuzzleA1ACtion010 : boolean = false;
	private var isPuzzleB1ACtion010 : boolean = false;
	private var isPuzzleE2ACtion010 : boolean = false;
	private var isPuzzleD2ACtion010 : boolean = false;
	private var isPuzzleE1ACtion010 : boolean = false;
	private var isPuzzleF2ACtion010 : boolean = false;
	private var isPuzzleC1 : boolean = false;
	private var directionMap : Dictionary.<String, boolean> = new Dictionary.<String, boolean>();
	private var isAction006 : boolean = false;
	private enum DirectionType {
		X,
		Y,
		Z
	}
	private enum FadeStatus {
		WAIT,
		START,
		END
	}
	private var currentFadeStatus : FadeStatus = FadeStatus.WAIT;
	private var deltaTimeBaseValue : float = 50.0f;

	function Start () {
		msg = GameObject.Find("Msg");
		msgText = msg.transform.FindChild("Body/Text").GetComponent("Text");
		emInstance = FindObjectOfType(EventManager);
		emInstance.eventList.Add("[0001]");
		amInstance = FindObjectOfType(AudioManager);
		raw = msg.AddComponent(RawImage);
		raw.color = new Color(0, 0, 0, 1);
		tsuyoshiAndPuzzle = GameObject.Find("tsuyoshiAndPuzzle");
		tsuyoshi = tsuyoshiAndPuzzle.transform.FindChild("f96s01002_tsuyoshi").gameObject;
		puzzleA1 = tsuyoshiAndPuzzle.transform.FindChild("f96s01001_puzzle_A1").gameObject;
		puzzleD1 = tsuyoshiAndPuzzle.transform.FindChild("f96s01001_puzzle_D1").gameObject;
		puzzleE1 = tsuyoshiAndPuzzle.transform.FindChild("f96s01001_puzzle_E1").gameObject;
		puzzleB1 = tsuyoshiAndPuzzle.transform.FindChild("f96s01001_puzzle_B1").gameObject;
		puzzleF1 = tsuyoshiAndPuzzle.transform.FindChild("f96s01001_puzzle_F1").gameObject;
		puzzleG1 = tsuyoshiAndPuzzle.transform.FindChild("f96s01001_puzzle_G1").gameObject;
		puzzleC1 = tsuyoshiAndPuzzle.transform.FindChild("f96s01001_puzzle_C1").gameObject;
		puzzleC2 = tsuyoshiAndPuzzle.transform.FindChild("f96s01001_puzzle_C2").gameObject;
		puzzleG2 = tsuyoshiAndPuzzle.transform.FindChild("f96s01001_puzzle_G2").gameObject;
		puzzleF2 = tsuyoshiAndPuzzle.transform.FindChild("f96s01001_puzzle_F2").gameObject;
		puzzleB2 = tsuyoshiAndPuzzle.transform.FindChild("f96s01001_puzzle_B2").gameObject;
		puzzleE2 = tsuyoshiAndPuzzle.transform.FindChild("f96s01001_puzzle_E2").gameObject;
		puzzleD2 = tsuyoshiAndPuzzle.transform.FindChild("f96s01001_puzzle_D2").gameObject;
		akuma = GameObject.Find("f96s01003_akuma");
		init();
	}
	
	private function init() {
		directionMap[tsuyoshi.name] = true;
		directionMap[puzzleA1.name] = true;
		directionMap[puzzleD1.name] = true;
		directionMap[puzzleE1.name] = true;
		directionMap[puzzleB1.name] = true;
		directionMap[puzzleF1.name] = true;
		directionMap[puzzleG1.name] = true;
		directionMap[puzzleC1.name] = true;
		directionMap[puzzleC2.name] = true;
		directionMap[puzzleG2.name] = true;
		directionMap[puzzleF2.name] = true;
		directionMap[puzzleB2.name] = true;
		directionMap[puzzleE2.name] = true;
		directionMap[puzzleD2.name] = true;
	}
	
	function Update() {
		
	}

	function FixedUpdate () {
		if (currentFadeStatus == FadeStatus.START) {
			blackTime += Time.deltaTime;
		    raw.color = new Color(0, 0, 0, Mathf.Lerp(1f, 0f, blackTime / interval));
		    if (interval < blackTime) {
		    	currentFadeStatus = FadeStatus.END;
		    }
		}
	}
	
	public function action001() {
		msgText.text = "…";
		emInstance.nextTask();
	}
	
	public function action002() {
		msgText.text = "";
		emInstance.nextTask();
	}
	
	public function action003() {
		msgText.text = "…";
		emInstance.nextTask();
	}
	
	public function action004() {
		msgText.text = "";
		emInstance.nextTask();
	}
	
	public function action005() {
		msgText.text = "…？";
		emInstance.nextTask();
	}
	
	public function action006() {
		msgText.text = "";
		currentFadeStatus = FadeStatus.START;
		emInstance.nextTask();
	}
	
	public function action007() {
		StartCoroutine(action007Coroutine());
		emInstance.nextTask();
	}
	
	public function action008() {
		msgText.text = "…";
		emInstance.nextTask();
	}
	
	public function action009() {
		msgText.text = "夢…？";
		emInstance.nextTask();
	}
	
	public function action010() {
		msgText.text = "";
		StartCoroutine(action010Coroutine());
	}
	
	public function action011() {
		msgText.text = "…あっ！";
		emInstance.nextTask();
	}
	
	public function action012() {
		StartCoroutine(action012Coroutine());
	}
	
	public function action013() {
		msgText.text = "…あれは…？";
		emInstance.nextTask();
	}
	
	public function action014() {
		StartCoroutine(action014Coroutine());
	}
	
	public function action015() {
		msgText.text = "あーーーーーーっ！！";
		emInstance.nextTask();
	}
	
	private function action007Coroutine() {
		while(true) {
			tsuyoshi.transform.Rotate(0.0f, 0.0f, calculateRotateZTsuyoshi(tsuyoshi, 0.3f));
			if (!isPuzzleA1ACtion010) {
				puzzleA1.transform.Rotate(0.0f, 0.0f, calculateRotateZOther(puzzleA1, 0.6f));
			}
			puzzleD1.transform.Rotate(0.0f, 0.0f, calculateRotateZOther(puzzleD1, 0.3f));
			if (!isPuzzleE1ACtion010) {
				puzzleE1.transform.Rotate(0.0f, 0.0f, calculateRotateZOther(puzzleE1, 0.25f));
			}
			if (!isPuzzleB1ACtion010) {
				puzzleB1.transform.Rotate(0.0f, 0.0f, calculateRotateZOther(puzzleB1, 0.5f));
			}
			puzzleF1.transform.Rotate(0.0f, 0.0f, calculateRotateZOther(puzzleF1, 0.3f));
			puzzleG1.transform.Rotate(0.0f, 0.0f, calculateRotateZOther(puzzleG1, 0.3f));
			if (!isPuzzleC1ACtion010) {
				puzzleC1.transform.Rotate(0.0f, 0.0f, calculateRotateZOther(puzzleC1, 0.8f));
			}
			if (!isPuzzleC2ACtion010) {
				puzzleC2.transform.Rotate(0.0f, 0.0f, calculateRotateZOther(puzzleC2, 0.9f));
			}
			puzzleG2.transform.Rotate(0.0f, 0.0f, calculateRotateZOther(puzzleG2, 0.01f));
			if (!isPuzzleF2ACtion010) {
				puzzleF2.transform.Rotate(0.0f, 0.0f, calculateRotateZOther(puzzleF2, 0.2f));
			}
			if (!isPuzzleB2ACtion010) {
				puzzleB2.transform.Rotate(Vector3(0.0f, 0.0f, calculateRotateZOther(puzzleB2, 0.7f)));
			}
			if (!isPuzzleE2ACtion010) {
				puzzleE2.transform.Rotate(0.0f, 0.0f, calculateRotateZOther(puzzleE2, 0.4f));
			}
			if (!isPuzzleD2ACtion010) {
				puzzleD2.transform.Rotate(0.0f, 0.0f, calculateRotateZOther(puzzleD2, 0.3f));
			}
			yield null;
		}
	}
	
	private function action010Coroutine() {
		var upTime : float = 2.0f;
		var puzzleC2Time : float = 0.0f;
		var puzzleC1Time : float = 0.0f;
		var puzzleB2Time : float = 0.0f;
		var puzzleA1Time : float = 0.0f;
		var puzzleB1Time : float = 0.0f;
		var puzzleE2Time : float = 0.0f;
		var puzzleD2Time : float = 0.0f;
		var puzzleE1Time : float = 0.0f;
		var puzzleF2Time : float = 0.0f;
		var isPuzzleC2Se : boolean;
		var isPuzzleC1Se : boolean;
		var isPuzzleB2Se : boolean;
		var isPuzzleA1Se : boolean;
		var isPuzzleB1Se : boolean;
		var isPuzzleE2Se : boolean;
		var isPuzzleD2Se : boolean;
		var isPuzzleE1Se : boolean;
		var isPuzzleF2Se : boolean;
		var endFlg : boolean;
		var execNum = Time.deltaTime * deltaTimeBaseValue;
		
		while(true) {
			if (isPuzzleC2ACtion010) {
				puzzleC2Time += Time.deltaTime;
				if (upTime < puzzleC2Time) {
					puzzleC2.transform.Rotate(execNum, execNum, execNum);
					puzzleC2.transform.position.y += execNum * 0.02f;
					if (!isPuzzleC2Se) {
						amInstance.playSe("f96s01002_puzzleFly");
						isPuzzleC2Se = true;
					}
				} else {
					puzzleC2.transform.eulerAngles.x += calculateRotate(puzzleC2, 3.0f, 60.0f,
						DirectionType.X);
				}
				if (upTime + 0.7f < puzzleC2Time) {
					isPuzzleC1ACtion010 = true;
				}
			}
			if (isPuzzleC1ACtion010) {
				puzzleC1Time += Time.deltaTime;
				if (upTime < puzzleC1Time) {
					puzzleC1.transform.Rotate(execNum, execNum, execNum);
					puzzleC1.transform.position.y += execNum * 0.02f;
					if (!isPuzzleC1Se) {
						amInstance.playSe("f96s01002_puzzleFly");
						isPuzzleC1Se = true;
					}
				} else {
					puzzleC1.transform.eulerAngles.x += calculateRotate(puzzleC1, 3.0f, 60.0f,
						DirectionType.X);
				}
				if (upTime - 1.2f < puzzleC1Time) {
					isPuzzleB2ACtion010 = true;
				}
			}
			if (isPuzzleB2ACtion010) {
				puzzleB2Time += Time.deltaTime;
				if (upTime < puzzleB2Time) {
					puzzleB2.transform.Rotate(Vector3(execNum, execNum, execNum));
					puzzleB2.transform.position.y += execNum * 0.02f;
					if (!isPuzzleB2Se) {
						amInstance.playSe("f96s01002_puzzleFly");
						isPuzzleB2Se = true;
					}
				} else {
					puzzleB2.transform.eulerAngles.x += calculateRotate(puzzleB2, 3.0f, 60.0f,
						DirectionType.X);
				}
				if (upTime - 1.2f < puzzleB2Time) {
					isPuzzleA1ACtion010 = true;
				}
			}
			if (isPuzzleA1ACtion010) {
				puzzleA1Time += Time.deltaTime;
				if (upTime < puzzleA1Time) {
					puzzleA1.transform.Rotate(execNum, execNum, execNum);
					puzzleA1.transform.position.y += execNum * 0.02f;
					if (!isPuzzleA1Se) {
						amInstance.playSe("f96s01002_puzzleFly");
						isPuzzleA1Se = true;
					}
				} else {
					puzzleA1.transform.eulerAngles.x += calculateRotate(puzzleA1, 3.0f, 60.0f,
						DirectionType.X);
				}
				if (upTime - 1.2f < puzzleA1Time) {
					isPuzzleB1ACtion010 = true;
				}
			}
			if (isPuzzleB1ACtion010) {
				puzzleB1Time += Time.deltaTime;
				if (upTime < puzzleB1Time) {
					puzzleB1.transform.Rotate(execNum, execNum, execNum);
					puzzleB1.transform.position.y += execNum * 0.02f;
					if (!isPuzzleB1Se) {
						amInstance.playSe("f96s01002_puzzleFly");
						isPuzzleB1Se = true;
					}
				} else {
					puzzleB1.transform.eulerAngles.x += calculateRotate(puzzleB1, 3.0f, 60.0f,
						DirectionType.X);
				}
				if (upTime + 0.3f < puzzleB1Time) {
					isPuzzleE2ACtion010 = true;
				}
			}
			if (isPuzzleE2ACtion010) {
				puzzleE2Time += Time.deltaTime;
				if (upTime < puzzleE2Time) {
					puzzleE2.transform.Rotate(execNum, execNum, execNum);
					puzzleE2.transform.position.y += execNum * 0.02f;
					if (!isPuzzleE2Se) {
						amInstance.playSe("f96s01002_puzzleFly");
						isPuzzleE2Se = true;
					}
				} else {
					puzzleE2.transform.eulerAngles.x += calculateRotate(puzzleE2, 3.0f, 60.0f,
						DirectionType.X);
				}
				if (upTime - 1.2f < puzzleE2Time) {
					isPuzzleD2ACtion010 = true;
				}
			}
			if (isPuzzleD2ACtion010) {
				puzzleD2Time += Time.deltaTime;
				if (upTime < puzzleD2Time) {
					puzzleD2.transform.Rotate(execNum, execNum, execNum);
					puzzleD2.transform.position.y += execNum * 0.02f;
					if (!isPuzzleD2Se) {
						amInstance.playSe("f96s01002_puzzleFly");
						isPuzzleD2Se = true;
					}
				} else {
					puzzleD2.transform.eulerAngles.x += calculateRotate(puzzleD2, 3.0f, 60.0f,
						DirectionType.X);
				}
				if (upTime - 1.2f < puzzleD2Time) {
					isPuzzleE1ACtion010 = true;
				}
			}
			if (isPuzzleE1ACtion010) {
				puzzleE1Time += Time.deltaTime;
				if (upTime < puzzleE1Time) {
					puzzleE1.transform.Rotate(execNum, execNum, execNum);
					puzzleE1.transform.position.y += execNum * 0.02f;
					if (!isPuzzleE1Se) {
						amInstance.playSe("f96s01002_puzzleFly");
						isPuzzleE1Se = true;
					}
				} else {
					puzzleE1.transform.eulerAngles.x += calculateRotate(puzzleE1, 3.0f, 60.0f,
						DirectionType.X);
				}
				if (upTime - 1.2f < puzzleE1Time) {
					isPuzzleF2ACtion010 = true;
				}
			}
			if (isPuzzleF2ACtion010) {
				puzzleF2Time += Time.deltaTime;
				if (upTime < puzzleF2Time) {
					puzzleF2.transform.Rotate(execNum, execNum, execNum);
					puzzleF2.transform.position.y += execNum * 0.02f;
					if (!isPuzzleF2Se) {
						amInstance.playSe("f96s01002_puzzleFly");
						isPuzzleF2Se = true;
					}
				} else {
					puzzleF2.transform.eulerAngles.x += calculateRotate(puzzleF2, 3.0f, 60.0f,
						DirectionType.X);
				}
				if (!endFlg && upTime + 1.2f < puzzleF2Time) {
					endFlg = true;
					emInstance.nextTask();
				}
			}
			
			yield null;
		}
	}
	
	private function action012Coroutine() {
		var akumaSprite : SpriteRenderer = akuma.GetComponent("SpriteRenderer");
		var time : float = 0.0f;
		var akumaFadeInInterval : float = 10.0f;
		var endFlg : boolean;
		while(time <= akumaFadeInInterval){
		    akumaSprite.color.a = Mathf.Lerp(0f, 1f, time / akumaFadeInInterval);
		    time += Time.deltaTime;
		    if (!endFlg && akumaFadeInInterval < time * 50) {
		    	endFlg = true;
		    	amInstance.playSe("f96s01001_akumaWarai");
		    	emInstance.nextTask();
		    }
		    yield null;
		}
	}
	
	private function action014Coroutine() {
		var scaleCamera : ScaleCamera = FindObjectOfType(ScaleCamera);
		scaleCamera.target = null;
		var time : float = 0.0f;
		var posY : float = tsuyoshiAndPuzzle.transform.position.y;
		var endFlg : boolean;
		while(-2.5 < posY) {	
			tsuyoshiAndPuzzle.transform.position.y -= time * 0.006f;
			posY = tsuyoshiAndPuzzle.transform.position.y;
			time += Time.deltaTime;
			if (!endFlg && posY < -0.5) {
				endFlg = true;
				emInstance.nextTask();
			}
			if (posY < -1.0) {
				raw.color = new Color(255, 255, 255, Mathf.Lerp(0f,1f, Mathf.Abs(posY) / Mathf.Abs(-2.5)));
			}
			yield null;
		}
		
		yield amInstance.stopBgmAtFadeOut(3.0f);
		var assetBundleInfoDic = new Dictionary.<String, int>();
		assetBundleInfoDic.Add("f01/nanosaki/s99/cmn/standard", 0);
		assetBundleInfoDic.Add("f01/nanosaki/s01/tr/asa", 0);
		assetBundleInfoDic.Add("prefab/tsuyoshi_auto", 0);
		assetBundleInfoDic.Add("prefab/msgdialog", 0);
		SceneLoadManager.getInstance().loadLevelInLoading("f01_tsuyoshiRoom", assetBundleInfoDic);
		
	}
	
	private function calculateRotateZTsuyoshi(obj : GameObject, rotationNum : float) {
		return calculateRotate(obj, rotationNum, 1, DirectionType.Z);
	}
	
	private function calculateRotateZOther(obj : GameObject, rotationNum : float) {
		return calculateRotate(obj, rotationNum, 2, DirectionType.Z);
	}
	
	private function calculateRotate(obj : GameObject, rotationNum : float,
										directionMaxNum : float, directionType : DirectionType) {
		
		var rotationNumForTime = Time.deltaTime * deltaTimeBaseValue * rotationNum;
		var rotation : float;
		if (directionType == DirectionType.X) {
			rotation = obj.transform.eulerAngles.x;
		} else if (directionType == DirectionType.Y) {
			rotation = obj.transform.eulerAngles.y;
		} else {
			rotation = obj.transform.eulerAngles.z;
		}
		if (90 <= rotation && rotation <= 270) {
			if (rotation < 180) {
				rotation = rotation + 180;
			} else {
				rotation = rotation - 180;
			}
		}
		if (directionMap[obj.name]) {
			if (directionMaxNum <= rotation + rotationNumForTime && rotation + rotationNumForTime < 90) {
				directionMap[obj.name] = false;
			}
			return rotationNumForTime;
		} else {
			if (90 <= rotation - rotationNumForTime && rotation - rotationNumForTime <= 360 - directionMaxNum) {
				directionMap[obj.name] = true;
			}
			return -rotationNumForTime;
		}
	}
}