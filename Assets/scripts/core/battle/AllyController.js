#pragma strict

var ecArray : EnemySampleController[];

function Start () {
	ecArray = FindObjectsOfType(EnemySampleController);
}

function Update () {

}

public function test() {
	print("test");
	ecArray[0].damage();
}