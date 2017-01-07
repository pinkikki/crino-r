#pragma strict
class FadeUtil {

	public static function createBlackLayer() {
		return createLayer(new Color(0, 0, 0, 1));
	}

	public static function createBlackLayerByAlphaZero() {
		return createLayer(new Color(0, 0, 0, 0));
	}

	public static function createLayer(layerColor : Color) {
		var baseLayer : GameObject = new GameObject();
		baseLayer.name = "BaseLayer";
		baseLayer.layer = 5;
		var canvas : Canvas = baseLayer.AddComponent(Canvas);
		canvas.renderMode = 0;
		var canvasScaler : CanvasScaler = baseLayer.AddComponent(CanvasScaler);
		var graphicRaycaster : GraphicRaycaster = baseLayer.AddComponent(GraphicRaycaster);
		
		var childLayer = new GameObject();
		childLayer.name = "ChildLayer";
		childLayer.transform.SetParent(baseLayer.transform);
		var rect : RectTransform = childLayer.AddComponent(RectTransform);
		rect.anchorMax = new Vector2(1f, 1f);
		rect.anchorMin = new Vector2(0f, 0f);
		rect.anchoredPosition = new Vector2(0, 0);
		var raw : RawImage = childLayer.AddComponent(RawImage);
		raw.color = layerColor;
		return baseLayer;
	}

	public static function fadeIn(baseLayer : GameObject, interval : float) {
		var raw : RawImage = baseLayer.transform.FindChild("ChildLayer").GetComponent(RawImage);
		return trans(raw, interval, 0, 1);
	}

	public static function fadeOut(baseLayer : GameObject, interval : float) {
		var raw : RawImage = baseLayer.transform.FindChild("ChildLayer").GetComponent(RawImage);
		return trans(raw, interval, 1, 0);
	}

	public static function fadeIn(sr : SpriteRenderer, interval : float) {
		return trans(sr, interval, 0, 1);
	}

	public static function fadeOut(sr : SpriteRenderer, interval : float) {
		return trans(sr, interval, 1, 0);
	}

	public static function trans(raw : RawImage, interval : float, startTransVal : float, endTransVal : float) {
		var time : float = 0.0f;
		while (time <= interval) {
		    raw.color = new Color(0, 0, 0, Mathf.Lerp(startTransVal, endTransVal, time / interval));
		    time += Time.deltaTime;
		    yield null;
		}
	}

	public static function trans(sr : SpriteRenderer, interval : float, startTransVal : float, endTransVal : float) {
		var time : float = 0.0f;
		while (time <= interval) {
		    sr.color = new Color(1, 1, 1, Mathf.Lerp(startTransVal, endTransVal, time / interval));
		    time += Time.deltaTime;
		    yield null;
		}
	}

}

