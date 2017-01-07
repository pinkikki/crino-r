#pragma strict
import UnityEngine.UI;

private var msgDialog : GameObject;
private var contentText : Text;
private var nextButton : GameObject;
private var autoFlg : boolean;

public class MessageManagerNoTitle extends MonoBehaviour {
	
	function Start() {
		var labInstance : LoadAssetBandles = LoadAssetBandles.getInstance();
		msgDialog = Instantiate(labInstance.loadPrefab("prefab/msgdialognotitle", "MsgDialogNoTitle"), Vector2 (0, 0), Quaternion.identity);
		contentText = msgDialog.transform.FindChild("Body/ContentBox/ContentText").GetComponent("Text");
		nextButton = msgDialog.transform.FindChild("Body/NextButton").gameObject;
		msgDialog.SetActive(false);
	}
	
	function Awake() {
//		GameObject.DontDestroyOnLoad(this);
	}
	
	function changeMessage(contentMessage, lastMsgFlg, autoFlg) {
		this.autoFlg = autoFlg;
		if(!msgDialog.activeSelf) {
			show();
		}
		
		if (lastMsgFlg) {
			nextButton.SetActive(false);
		} else {
			nextButton.SetActive(true);
		}
		contentText.text = contentMessage;
	}
	
	function show() {
		msgDialog.SetActive(true);
	}
	
	function hide() {
		contentText.text = "";
		msgDialog.SetActive(false);
	}
	
	function destroy() {
		Destroy(msgDialog);
	}
	
	function getAutoFlg() {
		return autoFlg;
	}
 }