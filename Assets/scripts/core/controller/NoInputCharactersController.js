#pragma strict
var h_speed : float  = 0.0f;
var v_speed : float = 0.0f;
private var anim : Animator;
var warlkingFlg = false;
private var isCondition : boolean;
private var conditionX : float;
private var conditionY : float;
private var deltaTimeBaseValue : float = 1.0f;

public class NoInputCharactersController extends MonoBehaviour {

	function Start () {
		anim = gameObject.GetComponent(Animator);
	}

	function Update () {
		if(warlkingFlg) {
			var pos : Vector3 = gameObject.transform.position;
			pos.x += Time.deltaTime * h_speed * deltaTimeBaseValue;
			pos.y += Time.deltaTime * v_speed * deltaTimeBaseValue;
			gameObject.transform.position = pos;
			
			if (isCondition) {
				if ((h_speed == 1.0f && conditionX < pos.x) ||
						(h_speed == -1.0f && pos.x < conditionX) ||
						(v_speed == 1.0f && conditionY < pos.y) ||
						(v_speed == -1.0f && pos.y < conditionY)
					) {
					walkStop();
				}
			}
		}
	}
	public function walkFront() {
		return setWalkValue(0.0f, -1.0f, true, false, false);
	}

	public function walkBack() {
		return setWalkValue(0.0f, 1.0f, true, false, false);
	}

	public function walkLeft() {	
		return setWalkValue(-1.0f, 0.0f, false, true, false);
	}

	public function walkRight() {	
		return setWalkValue(1.0f, 0.0f, false, true, false);
	}
	
	public function walkFrontBack() {
		return setWalkValue(0.0f, -1.0f, true, false, true);
	}

	public function walkBackBack() {
		return setWalkValue(0.0f, 1.0f, true, false, true);
	}

	public function walkLeftBack() {	
		return setWalkValue(-1.0f, 0.0f, false, true, true);
	}

	public function walkRightBack() {	
		return setWalkValue(1.0f, 0.0f, false, true, true);
	}
	
	public function walkFrontNoSpeed() {
		return setDirection(true, false, false, false);
	}

	public function walkBackNoSpeed() {
		return setDirection(false, true, false, false);
	}

	public function walkLeftNoSpeed() {	
		return setDirection(false, false, true, false);
	}

	public function walkRightNoSpeed() {	
		return setDirection(false, false, false, true);
	}
	
	public function walkStop() {
		warlkingFlg = false;
		isCondition = false;
		h_speed = 0.0f;
		v_speed = 0.0f;
		while (anim == null) {
			anim = gameObject.GetComponent(Animator);
			yield null;
		}
		anim.SetFloat("Hspeed", h_speed);
		anim.SetFloat("Vspeed", v_speed);
		anim.SetBool("Hstop", true);
		anim.SetBool("Vstop", true);	
	}

	private function setWalkValue(hsVal : float, vsVal : float, hsFlg : boolean, vsFlg : boolean, backFlg : boolean) {
		h_speed = hsVal;
		v_speed = vsVal;

		while (anim == null) {
			anim = gameObject.GetComponent(Animator);
			yield null;
		}
		anim.SetFloat("Hspeed", h_speed);
		anim.SetFloat("Vspeed", v_speed);
		anim.SetBool("Hstop", hsFlg);
		anim.SetBool("Vstop", vsFlg);
		setDirection(false, false, false, false);
		warlkingFlg = true;
		
		if (backFlg) {
			h_speed = -h_speed;
			v_speed = -v_speed;
		}
	}
	
	private function setDirection(fwFlg : boolean, bwFlg : boolean, lwFlg : boolean, rwFlg : boolean) {
		while (anim == null) {
			anim = gameObject.GetComponent(Animator);
			yield null;
		}
		anim.SetBool("Fwait", fwFlg);
		anim.SetBool("Bwait", bwFlg);
		anim.SetBool("Lwait", lwFlg);
		anim.SetBool("Rwait", rwFlg);
	}
	
	public function setConditionX(x : float) {
		conditionX = x;
		isCondition = true;
	}
	
	public function setConditionY(y : float) {
		conditionY = y;
		isCondition = true;
	}
	
	public function moveUpDown() {
		var pos : Vector2 = gameObject.transform.position;
		var downY = pos.y;
		var upY = pos.y + 0.3f;
		var upFlg : boolean = true;
		while(true) {
			pos = gameObject.transform.position;
			if (upFlg) {
				pos.y += Time.deltaTime * 3.0f * deltaTimeBaseValue;
				if (upY < pos.y) {
					upFlg = false;
				}
			} else {
				pos.y -= Time.deltaTime * 3.0f * deltaTimeBaseValue;
				if (pos.y < downY) {
					pos.y = downY;
				}
			}
			gameObject.transform.position = pos;
			
			if (pos.y == downY) {
				break;
			}
			yield null;
		}
	}
	
	public function setDeltaTimeBaseValue(deltaTimeBaseValue : float) {
		this.deltaTimeBaseValue = deltaTimeBaseValue;
	}
}
