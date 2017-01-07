#pragma strict
class FieldMenuUtil {

	public static function doNotActive() {
		while (true) {
			var fieldMenuManager : GameObject = GameObject.Find("FieldMenuManager");
			if (fieldMenuManager != null) {
				var fieldMenu : GameObject = fieldMenuManager.GetComponent(FieldMenuManager).getInstance();
				fieldMenu.SetActive(false);
				break;
			}
			yield;
		}
	}
}

