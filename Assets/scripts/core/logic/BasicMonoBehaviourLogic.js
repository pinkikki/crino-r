#pragma strict

class BasicMonoBehaviourLogic extends MonoBehaviour {
	
	private var nextAssetBundles : List.<LoadInfoDto>;
	
	function Start () {

	}

	function Update () {

	}

	public function getNextAssetBundles() {
		return nextAssetBundles;
	}
			
	public function setNextAssetBundles(nextAssetBundles) {
		this.nextAssetBundles = nextAssetBundles;
	}
}