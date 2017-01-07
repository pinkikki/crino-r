#pragma strict

public var message : String;
private var mmInstance : MessageManagerNoTitle;
private var amInstance : AudioManager;
private var gameOverIcons : GameObject;
private var gameoverG : GameObject;
private var gameoverA : GameObject;
private var gameoverM : GameObject;
private var gameoverE1 : GameObject;
private var gameoverO : GameObject;
private var gameoverV : GameObject;
private var gameoverE2 : GameObject;
private var gameoverR : GameObject;

function Start () {
	mmInstance = FindObjectOfType(MessageManagerNoTitle);
	amInstance = FindObjectOfType(AudioManager);
	StartCoroutine(gameOver());
	gameOverIcons = GameObject.Find("GameOverIcons");
	gameoverG = gameOverIcons.transform.FindChild("gameover_G").gameObject;
	gameoverA = gameOverIcons.transform.FindChild("gameover_A").gameObject;
	gameoverM = gameOverIcons.transform.FindChild("gameover_M").gameObject;
	gameoverE1 = gameOverIcons.transform.FindChild("gameover_E1").gameObject;
	gameoverO = gameOverIcons.transform.FindChild("gameover_O").gameObject;
	gameoverV = gameOverIcons.transform.FindChild("gameover_V").gameObject;
	gameoverE2 = gameOverIcons.transform.FindChild("gameover_E2").gameObject;
	gameoverR = gameOverIcons.transform.FindChild("gameover_R").gameObject;
	gameOverIcons.SetActive(false);
}

function Update () {

}

private function gameOver() {
	while(!amInstance.isLoadComplete()) yield null;
	amInstance.playBgm("f99s05010_gameoverBgm");
    yield WaitForSeconds(2.0f);
	mmInstance.changeMessage(message, true, false);
	yield WaitForSeconds(5.0f);
	yield amInstance.stopBgmAtFadeOut(3.0f);
	mmInstance.hide();
	yield WaitForSeconds(1.0f);
	gameOverIcons.SetActive(true);
	var time : float = 0;
	while (time <= 1.0f)
	{
		gameoverG.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(0f, 30f, time / 1.0f));
	    gameoverA.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(0f, 30f, time / 1.0f));
	    gameoverM.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(0f, 30f, time / 1.0f));
	    gameoverE1.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(0f, 30f, time / 1.0f));
	    gameoverO.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(0f, 30f, time / 1.0f));
	    gameoverV.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(0f, 30f, time / 1.0f));
	    gameoverE2.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(0f, 30f, time / 1.0f));
	    gameoverR.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(0f, 30f, time / 1.0f));
	    time += Time.deltaTime;
	    yield null;
	}
	yield WaitForSeconds(0.5f);
	time = 0;
	amInstance.playSe("f99s05011_gameoverSe");
	while (time <= 0.2f)
	{
	    gameoverG.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(30f, 90f, time / 0.2f));
	    gameoverA.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(30f, 120f, time / 0.2f));
	    gameoverM.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(30f, 40f, time / 0.2f));
	    gameoverE1.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(30f, 60f, time / 0.2f));
	    gameoverO.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(30f, 90f, time / 0.2f));
	    gameoverV.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(30f, 50f, time / 0.2f));
	    gameoverE2.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(30f, 60f, time / 0.2f));
	    gameoverR.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(30f, 40f, time / 0.2f));
	    time += Time.deltaTime;
	    yield null;
	}
	time = 0;
	var pos = gameoverO.transform.position;
	while (time <= 0.5f)
	{
		pos.x -= 0.002;
	    gameoverO.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(90f, 120f, time / 0.2f));
	    gameoverO.transform.position = pos;
	    time += Time.deltaTime;
	    yield null;
	}
	time = 0;
	while (time <= 0.5f)
	{
		pos.x += 0.002;
	    gameoverO.transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(120f, 90f, time / 0.2f));
	    gameoverO.transform.position = pos;
	    time += Time.deltaTime;
	    yield null;
	}
	
	yield WaitForSeconds(3.0f);
	
	time = 0;
	var gameoverGSr : SpriteRenderer = gameoverG.GetComponent(SpriteRenderer);
	var gameoverASr : SpriteRenderer = gameoverA.GetComponent(SpriteRenderer);
	var gameoverMSr : SpriteRenderer = gameoverM.GetComponent(SpriteRenderer);
	var gameoverE1Sr : SpriteRenderer = gameoverE1.GetComponent(SpriteRenderer);
	var gameoverOSr : SpriteRenderer = gameoverO.GetComponent(SpriteRenderer);
	var gameoverVSr : SpriteRenderer = gameoverV.GetComponent(SpriteRenderer);
	var gameoverE2Sr : SpriteRenderer = gameoverE2.GetComponent(SpriteRenderer);
	var gameoverRSr : SpriteRenderer = gameoverR.GetComponent(SpriteRenderer);
	while (time <= 2.0f)
	{
	    gameoverGSr.color = new Color(1, 1, 1, Mathf.Lerp(1f, 0f, time / 2.0f));
	    gameoverASr.color = new Color(1, 1, 1, Mathf.Lerp(1f, 0f, time / 2.0f));
	    gameoverMSr.color = new Color(1, 1, 1, Mathf.Lerp(1f, 0f, time / 2.0f));
	    gameoverE1Sr.color = new Color(1, 1, 1, Mathf.Lerp(1f, 0f, time / 2.0f));
	    gameoverOSr.color = new Color(1, 1, 1, Mathf.Lerp(1f, 0f, time / 2.0f));
	    gameoverVSr.color = new Color(1, 1, 1, Mathf.Lerp(1f, 0f, time / 2.0f));
	    gameoverE2Sr.color = new Color(1, 1, 1, Mathf.Lerp(1f, 0f, time / 2.0f));
	    gameoverRSr.color = new Color(1, 1, 1, Mathf.Lerp(1f, 0f, time / 2.0f));
	    time += Time.deltaTime;
	    yield null;
	}
}