
function Start () {
}

function Update () {
}

function OnCollisionEnter2D(other:Collision2D) {
	if (other.gameObject.tag == "Exit") {
		GameObject.Find("System").AddComponent(F02ninguArawaruALogic);
		Destroy(this);
	}
}