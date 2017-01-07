#pragma strict
var h_speed : float  = 0.0f;
var v_speed : float = 0.0f;
private var anim : Animator;
private var startTime : float;
private var warlkingFlg = false;
private var autoMaxRange : int[];
private var autoCurrentRange : int[] = new int[4];
private var rmInstance : ResidentManager;


function Start () {
	anim = gameObject.GetComponent(Animator);
	rmInstance = FindObjectOfType(ResidentManager);;
//	loadRange();
	StartCoroutine(auto());
}

function Update () {
	
	if(rmInstance.checkExecuteEvent()) {
	
		if(Time.time - startTime < 0.4) {
			GetComponent.<Rigidbody2D>().AddForce(Vector2.right * h_speed * 50f);
			GetComponent.<Rigidbody2D>().AddForce(Vector2.up * v_speed * 50f);
		} else {
			h_speed = 0.0f;
			v_speed = 0.0f;
			anim.SetFloat("Hspeed", h_speed);
			anim.SetFloat("Vspeed", v_speed);
			anim.SetBool("Hstop", true);
			anim.SetBool("Vstop", true);
		}
	}
}

function auto() {
	yield loadRange();
	while (true) {
		// TODO hensunisuru
		yield WaitForSeconds(5);
		execute();
	}
}

function execute() {
	startTime = Time.time;
	var rdm : int = Random.Range(0, 4);
	var range : int;
	if(rdm == 0) {
	// front
		range = autoCurrentRange[0] + 1;
		if(range <= autoMaxRange[0]) {
			autoCurrentRange[0] = range;
			autoCurrentRange[1] = autoCurrentRange[1] - 1;
			setWalkValue(0.0f, -1.0f, true, false);
		}
	} else if(rdm == 1) {
	// back
		range = autoCurrentRange[1] + 1;
		if(range <= autoMaxRange[1]) {
			autoCurrentRange[1] = range;
			autoCurrentRange[0] = autoCurrentRange[0] - 1;
			setWalkValue(0.0f, 1.0f, true, false);
		}
	} else if(rdm == 2) {
	// left
		range = autoCurrentRange[2] + 1;
		if(range <= autoMaxRange[2]) {
			autoCurrentRange[2] = range;
			autoCurrentRange[3] = autoCurrentRange[3] - 1;
			setWalkValue(-1.0f, 0.0f, false, true);
		}
	} else if(rdm == 3) {
	// right
		range = autoCurrentRange[3] + 1;
		if(range <= autoMaxRange[3]) {
			autoCurrentRange[3] = range;
			autoCurrentRange[2] = autoCurrentRange[2] - 1;
			setWalkValue(1.0f, 0.0f, false, true);
		}
	}
}

private function setWalkValue(hsVal : float, vsVal : float, hsFlg : boolean, vsFlg : boolean) {
	h_speed = hsVal;
	v_speed = vsVal;
	
	anim.SetFloat("Hspeed", h_speed);
	anim.SetFloat("Vspeed", v_speed);
	anim.SetBool("Hstop", hsFlg);
	anim.SetBool("Vstop", vsFlg);
	warlkingFlg = true;
}

// TODO
private function loadRange() {
	while(true) {
		if(rmInstance.checkExecuteEvent()) {
			var residentsDct = rmInstance.getResidentsDct();
			var ranges = residentsDct[transform.name];
			autoMaxRange = new int[4];
			// front
			autoMaxRange[0] = ranges[0];
			// back
			autoMaxRange[1] = ranges[1];
			// left
			autoMaxRange[2] = ranges[2];
			// right
			autoMaxRange[3] = ranges[3];
			
			break;
		}
		
		yield;
	}
}