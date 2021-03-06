﻿// Compiled shader for Android, uncompressed size: 1.2KB

// Skipping shader variants that would not be included into build of current scene.

Shader "Custom/TransparentSingleColorShader" {
Properties {
	_Color ("Main Color", Color) = (1, 1, 1, 1)
	_MainTex ("Base (RGB) Trans (A)", 2D) = "white" { }
}

SubShader {
	Tags { "Queue"="Transparent" "IgnoreProjector"="True" "RenderType"="Transparent" }
	Lighting off
	Cull Off
	
	Pass {  
		CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			
			#include "UnityCG.cginc"

			struct appdata_t {
				float4 vertex : POSITION;
				float4 color : COLOR;
				float2 texcoord : TEXCOORD0;
			};

			struct v2f {
				float4 vertex : POSITION;
				float4 color : COLOR;
				float2 texcoord : TEXCOORD0;
			};

			sampler2D _MainTex;
			float4 _MainTex_ST;
			
			v2f vert (appdata_t v)
			{
				v2f o;
				o.vertex = mul(UNITY_MATRIX_MVP, v.vertex);
				o.color = v.color;
				o.texcoord = TRANSFORM_TEX(v.texcoord, _MainTex);
				return o;
			}
			
			float4 _Color;
			half4 frag (v2f i) : COLOR
			{
				half4 col = _Color * tex2D(_MainTex, i.texcoord);
				return col;
			}
		ENDCG
	}
}
}