#pragma strict
import UnityEngine.UI;

private var msgDialog : GameObject;
private var contentText : Text;
private var titleText : Text;
private var nextButton : GameObject;
private var autoFlg : boolean;
private var manualFlg : boolean;
private var labInstance : LoadAssetBandles;

public class MessageManager extends MonoBehaviour {
	
	function Start() {
		labInstance = LoadAssetBandles.getInstance();
		msgDialog = Instantiate(labInstance.loadPrefab("prefab/msgdialog", "MsgDialog"), Vector2 (0, 0), Quaternion.identity);
		titleText = msgDialog.transform.FindChild("Body/TitleBox/TitleText").GetComponent("Text");
		contentText = msgDialog.transform.FindChild("Body/ContentBox/ContentText").GetComponent("Text");
		nextButton = msgDialog.transform.FindChild("Body/NextButton").gameObject;
		msgDialog.SetActive(false);
	}
	
	function Awake() {
//		GameObject.DontDestroyOnLoad(this);
	}
	
	function changeMessage(titleMessage, contentMessage, lastMsgFlg, autoFlg) {
		this.autoFlg = autoFlg;
		this.manualFlg = false;
		if(!msgDialog.activeSelf) {
			show();
		}
		
		if (lastMsgFlg) {
			nextButton.SetActive(false);
		} else {
			nextButton.SetActive(true);
		}
		titleText.text = titleMessage;
		contentText.text = contentMessage;
	}

	function changeMessageForManual(titleMessage, contentMessage, lastMsgFlg) {
		this.autoFlg = false;
		this.manualFlg = true;
		if(!msgDialog.activeSelf) {
			show();
		}
		
		if (lastMsgFlg) {
			nextButton.SetActive(false);
		} else {
			nextButton.SetActive(true);
		}
		titleText.text = titleMessage;
		contentText.text = contentMessage;
		FieldMenuManager.getInstance().SetActive(false);
	}
	
	function show() {
		msgDialog.SetActive(true);
	}
	
	function hide() {
		titleText.text = "";
		contentText.text = "";
		msgDialog.SetActive(false);
	}
	
	function destroy() {
		Destroy(msgDialog);
	}
	
	function getAutoFlg() {
		return autoFlg;
	}

	function getManualFlg() {
		return manualFlg;
	}

	function createSelectMessageDialog(tasks : String[]) {
		var prefab = labInstance.loadPrefab("prefab/msgdialog", "SelectMsgDialog");
		var msgDialog : GameObject = Instantiate(prefab, Vector2 (0.0f, 0.0f), Quaternion.identity);
		msgDialog.name = "SelectMsgDialog";
		var msgText : Text = msgDialog.transform.FindChild("Body/ContentBox/ContentText").GetComponent(Text);
		msgText.text = editSelectMessage(tasks);
		createSelectMessageButton(msgDialog.GetComponent(MessageSelectButton),
			msgDialog.transform.FindChild("Body/SelectButtons").gameObject, int.Parse(tasks[tasks.Length - 1]));
	}

	private function editSelectMessage(tasks : String[]) {

		var nmInstance : NamingManager = NamingManager.getInstance();
		var message : String = nmInstance.convert(tasks[1]);
		for (var i : int  = 2; i < tasks.Length - 1; i++) {
			message += "\n" + nmInstance.convert(tasks[i]);
		}
		
		return message;
	}

	private function createSelectMessageButton(script : MessageSelectButton, obj : GameObject, num : int) {
		var prefab;
		var buttonBase : GameObject;

		for (var i : int = 0; i < num; i++) {
			prefab = labInstance.loadPrefab("prefab/msgdialog", "ButtonBase");
			buttonBase = Instantiate(prefab, Vector2 (0.0f, 0.0f), Quaternion.identity);
			var text : Text = buttonBase.transform.FindChild("Text").GetComponent(Text);
			var button : Button = buttonBase.GetComponent(Button);
			if (i == 0) {
				text.text = "A";
				button.onClick.AddListener(script.onAClick);
			} else if (i == 1) {
				text.text = "B";
				button.onClick.AddListener(script.onBClick);
			} else if (i == 2) {
				text.text = "C";
				button.onClick.AddListener(script.onCClick);
			} else if (i == 3) {
				text.text = "D";
				button.onClick.AddListener(script.onDClick);
			} else if (i == 4) {
				text.text = "E";
				button.onClick.AddListener(script.onEClick);
			}

			buttonBase.transform.SetParent(obj.transform);
		}
	}
 }