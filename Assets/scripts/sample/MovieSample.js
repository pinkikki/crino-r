
// Use this for initialization
function Start () {
//	Handheld.PlayFullScreenMovie ("mojiki.mp4", Color.black, FullScreenMovieControlMode.CancelOnInput);
	StartCoroutine(MovieUtil.download("mojiki.mp4"));
}

// Update is called once per frame
function Update () {
Debug.Log("test");
}

