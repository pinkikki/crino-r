#pragma strict
var h_speed : float  = 0.0f;
var v_speed : float = 0.0f;
private var anim : Animator;
public var warlkingFlg = false;
public var collisionFlg = false;
private var fButton : GameObject;
private var bButton : GameObject;
private var lButton : GameObject;
private var rButton : GameObject;
public var buttonTouchCount : int;
private var itemInstance : ItemManager;
private var mmInstance : MessageManager;

public class CharactersController extends MonoBehaviour {

	function Start () {
		anim = gameObject.GetComponent(Animator);
		itemInstance = getItemInstance();
		mmInstance = getMmInstance();
		buttonTouchCount = 0;
	}
	
	public function getButtonObject() {
		fButton = GameObject.Find("Fbutton");
		bButton = GameObject.Find("Bbutton");
		lButton = GameObject.Find("Lbutton");
		rButton = GameObject.Find("Rbutton");
	}

	function FixedUpdate () {
		if(warlkingFlg) {			
			if (!collisionFlg) {
				var c_position : Vector3;
				var pos : Vector3;
				if (Input.GetMouseButtonDown(0) || Input.GetMouseButton(0)) {
					// PC用

					var vec = Input.mousePosition;
					var positionX = fButton.transform.localPosition.x;
					var positionY = fButton.transform.localPosition.y;
					var scaleX = fButton.transform.localScale.x;
					var scaleY = fButton.transform.localScale.y;
					
					pos = gameObject.transform.position;
					pos.x += h_speed * 0.02f;
					pos.y += v_speed * 0.02f;
					gameObject.transform.position = pos;
					
				} else if (0 < Input.touchCount) {
				
					pos = gameObject.transform.position;
					pos.x += h_speed * 0.02f;
					pos.y += v_speed * 0.02f;
					gameObject.transform.position = pos;
				} else {
					walkStop();
				}
			} else {
				walkStop();
			}
		}
	}

	function OnCollisionEnter2D(other:Collision2D) {
		if (other.gameObject.tag == "Item") {
			var itemId : int = getItemInstance().getItemId(other.gameObject.name);
			if (itemId != 0) {
				var itemName : String = ItemMasterDao.selectByPkItemName(itemId);
				if (ItemUtil.add(itemId)) {
					getItemInstance().remove(other.gameObject.name);
					getMmInstance().changeMessageForManual("ナレータ", itemName + "を手に入れた", true);
				} else {
					getMmInstance().changeMessageForManual("ナレータ", itemName + "は上限数を超えています", true);
				}

			}
		}
		collisionFlg = true;
	}

//	function OnCollisionStay2D(other:Collision2D) {
//		collisionFlg = true;
//		Debug.Log("OnCollisionStay");
//	}

	function OnCollisionExit2D(other:Collision2D) {
		collisionFlg = false;
	}

	public function walkFront() {
		if (!collisionFlg) {
			setWalkValue(0.0f, -1.0f, true, false);
		} else {
			if (!anim.GetBool("Fwait")) {
				setWalkValue(0.0f, -1.0f, true, false);
			} else {
				walkStop();
			}
		}

	}

	public function walkBack() {
		if (!collisionFlg) {
			setWalkValue(0.0f, 1.0f, true, false);
		} else {
			if (!anim.GetBool("Bwait")) {
				setWalkValue(0.0f, 1.0f, true, false);
			} else {
				walkStop();
			}
		}
	}

	public function walkLeft() {	
		if (!collisionFlg) {
			setWalkValue(-1.0f, 0.0f, false, true);
		} else {
			if (!anim.GetBool("Lwait")) {
				setWalkValue(-1.0f, 0.0f, false, true);
			} else {
				walkStop();
			}
		}
	}

	public function walkRight() {
		if (!collisionFlg) {
			setWalkValue(1.0f, 0.0f, false, true);
		} else {
			if (!anim.GetBool("Rwait")) {
				setWalkValue(1.0f, 0.0f, false, true);
			} else {
				walkStop();
			}
		}
	}
	
	public function walkStop() {
		warlkingFlg = false;
		if (v_speed < 0.0f) {
			anim.SetBool("Fwait", true);
			anim.SetBool("Bwait", false);
			anim.SetBool("Lwait", false);
			anim.SetBool("Rwait", false);
		} else if (v_speed > 0.0f) {
			anim.SetBool("Fwait", false);
			anim.SetBool("Bwait", true);
			anim.SetBool("Lwait", false);
			anim.SetBool("Rwait", false);
		} else if (h_speed < 0.0f) {
			anim.SetBool("Fwait", false);
			anim.SetBool("Bwait", false);
			anim.SetBool("Lwait", true);
			anim.SetBool("Rwait", false);
		} else if (h_speed > 0.0f) {
			anim.SetBool("Fwait", false);
			anim.SetBool("Bwait", false);
			anim.SetBool("Lwait", false);
			anim.SetBool("Rwait", true);
		}

		h_speed = 0.0f;
		v_speed = 0.0f;
		anim.SetFloat("Hspeed", h_speed);
		anim.SetFloat("Vspeed", v_speed);
		anim.SetBool("Hstop", true);
		anim.SetBool("Vstop", true);	
	}

	private function setWalkValue(hsVal : float, vsVal : float, hsFlg : boolean, vsFlg : boolean) {
		if (0 < Input.touchCount) {
			h_speed = hsVal;
			v_speed = vsVal;
			
			anim.SetFloat("Hspeed", h_speed);
			anim.SetFloat("Vspeed", v_speed);
			anim.SetBool("Hstop", hsFlg);
			anim.SetBool("Vstop", vsFlg);
			warlkingFlg = true;
			collisionFlg = false;
		} else if (Input.GetMouseButtonDown(0) || Input.GetMouseButton(0)) {
			// PC用
			h_speed = hsVal;
			v_speed = vsVal;
			
			anim.SetFloat("Hspeed", h_speed);
			anim.SetFloat("Vspeed", v_speed);
			anim.SetBool("Hstop", hsFlg);
			anim.SetBool("Vstop", vsFlg);
			warlkingFlg = true;
			collisionFlg = false;
		}
	}

	private function getItemInstance() {
		if (itemInstance == null) {
			itemInstance = FindObjectOfType(ItemManager);
		}

		return itemInstance;
	}

	private function getMmInstance() {
		if (mmInstance == null) {
			mmInstance = FindObjectOfType(MessageManager);
		}

		return mmInstance;
	}
}
