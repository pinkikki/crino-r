using UnityEditor;

public class CreateAssetBundles
{
	[MenuItem ("Assets/Build AssetBundles")]
	static void BuildAllAssetBundles ()
	{
		// とりあえず非圧縮
		BuildPipeline.BuildAssetBundles ("AssetBundles/ios", BuildAssetBundleOptions.UncompressedAssetBundle, BuildTarget.iOS);
		BuildPipeline.BuildAssetBundles ("AssetBundles/android", BuildAssetBundleOptions.UncompressedAssetBundle, BuildTarget.Android);
		BuildPipeline.BuildAssetBundles ("AssetBundles/web", BuildAssetBundleOptions.UncompressedAssetBundle, BuildTarget.WebPlayer);
		BuildPipeline.BuildAssetBundles ("AssetBundles/windows",
			BuildAssetBundleOptions.UncompressedAssetBundle, BuildTarget.StandaloneWindows);
	}
}