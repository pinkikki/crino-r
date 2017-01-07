
function Start () {
	StartCoroutine(execute());
}

private function execute() {
	var currentTime : float = 0;
	var effectTime : float = 0.2;
	while (currentTime <= effectTime)
	{
	    var value : float = Mathf.Lerp(0.1f, 1.0f, currentTime / effectTime);
	    this.transform.localScale = Vector2(value, value);
	    currentTime += Time.deltaTime;
	    yield null;
	}

	yield WaitForSeconds(0.2f);
	this.gameObject.SetActive(false);
}

function Update () {
}

