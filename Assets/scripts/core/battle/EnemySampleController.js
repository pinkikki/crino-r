#pragma strict

private var EARLINESS : float = 0.04f;
private var direction : int = 1;
private var col : float = 0.5f;
private enum enemy_mode {
	DAMAGING,
	ATTACKING,
	WAIT_EVENT
}
private var currentMode = enemy_mode.WAIT_EVENT;
private var damageCount = 0;

function Start () {

}

function Update () {
	if(enemy_mode.DAMAGING == currentMode) {
		col += EARLINESS * direction;
	    if(col >= 0.7f)
	    {
	        direction = -1;
	    }
	    if(col <= 0.5f)
	    {
	        direction = 1;
	        damageCount++;
	    }
	    
	    if(damageCount == 2) {
	    	// 普通の状態に戻す場合
		    this.GetComponent(SpriteRenderer).color = new Color(0.5f,0.5f,0.5f,1);
		    damageCount = 0;
		    currentMode = enemy_mode.WAIT_EVENT;
	    } else {
	    	this.GetComponent(SpriteRenderer).color = new Color(col,col,col - 0.03f,1);
	    }
	}
}

public function damage() {
	currentMode = enemy_mode.DAMAGING;
}