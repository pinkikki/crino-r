#pragma strict
var h_speed : float  = 0.0f;
var v_speed : float = 0.0f;
var warlkingFlg = false;
private var isCondition : boolean;
private var conditionX : float;
private var conditionY : float;
private var deltaTimeBaseValue : float = 1.0f;

public class NoInputOtherController extends MonoBehaviour {

	function Start () {
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
		setWalkValue(0.0f, -1.0f, true, false);
	}

	public function walkBack() {
		setWalkValue(0.0f, 1.0f, true, false);
	}

	public function walkLeft() {	
		setWalkValue(-1.0f, 0.0f, false, true);
	}

	public function walkRight() {	
		setWalkValue(1.0f, 0.0f, false, true);
	}
	
	public function walkStop() {
		warlkingFlg = false;
		isCondition = false;
		h_speed = 0.0f;
		v_speed = 0.0f;
	}

	private function setWalkValue(hsVal : float, vsVal : float, hsFlg : boolean, vsFlg : boolean) {
		h_speed = hsVal;
		v_speed = vsVal;
		warlkingFlg = true;
	}
	
	public function setConditionX(x : float) {
		conditionX = x;
		isCondition = true;
	}
	
	public function setConditionY(y : float) {
		conditionY = y;
		isCondition = true;
	}
	
	public function setDeltaTimeBaseValue(speed : float) {
		deltaTimeBaseValue = speed;
	}
}
