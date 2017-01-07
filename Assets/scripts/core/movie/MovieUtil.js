#pragma strict
class MovieUtil {

	public static function download(fileName : String) {
		Debug.Log(Application.temporaryCachePath);
		var filePath = "http://pinkikki.jp/crino-r/movie/" + fileName;
		var www = new WWW(filePath);
	 	yield www;
	 	if(www.error != null) {
			throw System.Exception("通信障害が発生しました");
		}

		// android/ios?の場合
		var videoFile = Application.persistentDataPath + "/mojiki.mp4";
		// windowsの場合
//		var videoFile = Application.temporaryCachePath + "/mojiki.mp4";

		// ヤマデン用にコメントアウト
//	    var stream : FileStream = new FileStream(videoFile, FileMode.Create);
//	    stream.Write(www.bytes, 0, www.bytes.Length);
//	    stream.Close();

	    play(videoFile);
	}

	public static function play(filePath : String) {
		// ヤマデン用にコメントアウト
//		Handheld.PlayFullScreenMovie (filePath, Color.black, FullScreenMovieControlMode.CancelOnInput);
	}
}