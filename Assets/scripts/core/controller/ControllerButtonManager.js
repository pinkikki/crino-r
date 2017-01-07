#pragma strict
private var controller : CharactersController;
private var loadStatus : LoadStatus = LoadStatus.LOAD_WAIT;

function Start () {
	StartCoroutine(load());
}

function load() {
	loadStatus = LoadStatus.LOAD_EXECUTE;
	while (true) {
		controller = FindObjectOfType(CharactersController);
		if (controller == null) {
			yield null;
		} else {
			controller.getButtonObject();
			break;
		}
	}

	loadStatus = LoadStatus.LOAD_COMPLETE;
}

function onPointerDown(type : String) {
	if (loadStatus == LoadStatus.LOAD_COMPLETE) {
		if (type == "f") {
			controller.walkFront();
		} else if (type == "b") {
			controller.walkBack();
		} else if (type == "l") {
			controller.walkLeft();
		} else {
			controller.walkRight();
		}
	}
}

function onPointerEnter(type : String) {
	if (loadStatus == LoadStatus.LOAD_COMPLETE) {
		if (type == "f") {
			controller.walkFront();
		} else if (type == "b") {
			controller.walkBack();
		} else if (type == "l") {
			controller.walkLeft();
		} else {
			controller.walkRight();
		}
	}
}

function onPointerExit(type : String) {
	if (loadStatus == LoadStatus.LOAD_COMPLETE) {
		// TODO
		// Exitの動作を画像ができてから変更必要
		// ボタンすべてを配置する画像を用意して、
		// そこからExitするカウントによって動作を止める
		controller.walkStop();
	}
}