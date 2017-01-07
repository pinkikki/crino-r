
function Start () {
}

function Update () {
}

function OnCollisionEnter2D(other:Collision2D) {
	if (other.gameObject.name == "door") {
		GameObject.Find("System").AddComponent(F02GurakasuShueiALogic);
		Destroy(this);
	}
}