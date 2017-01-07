
// Use this for initialization
function Start () {
	click();
}

// Update is called once per frame
function Update () {
}

function click() {
	Debug.Log("test");
	var anim : Animator = GameObject.Find("BattleMenu/Body/Layer1_BaseMenu/CharacterControlBase/battleTsuyoshiContorolBase/Tsuyoshi").gameObject.GetComponent(Animator);
//	var ps3 : ParticleSystem = GameObject.Find("PS3").GetComponent(ParticleSystem);
//	var ps4 : ParticleSystem = GameObject.Find("PS4").GetComponent(ParticleSystem);
	anim.SetInteger("CommandType", 1);
//	ps3.Play();
//	ps4.Play();
}
