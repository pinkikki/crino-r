#pragma strict

var targetWidth : float = 1136;
var pixelsToUnits = 100;
public var target : GameObject;
public var offset : Vector3;

function Start () {
//	offset = transform.position - target.transform.position;
	if (target != null) {
		transform.position.x = target.transform.position.x;
		transform.position.y = target.transform.position.y;
	}
}

function Update () {
	var height = Mathf.RoundToInt(targetWidth / Screen.width * Screen.height);
	var width = Mathf.RoundToInt(640 / Screen.height * Screen.width);
	GetComponent.<Camera>().orthographicSize = height / pixelsToUnits / 2;
}

function FixedUpdate () {
	if (target != null) {
		var targetCameraPos : Vector3 = target.transform.position + offset;
		targetCameraPos.z = transform.position.z;
		transform.position = Vector3.Lerp (transform.position, targetCameraPos, 50f * Time.deltaTime);
	}
}

function setTarget(obj : GameObject) {
	target = obj;
	transform.position.x = target.transform.position.x;
	transform.position.y = target.transform.position.y;
}