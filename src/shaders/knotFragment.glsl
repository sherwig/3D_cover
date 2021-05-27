// varying vec3 vColor;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

		void main() {
			// vec4 diffuseColor = texture2D( map, vUv );
			// gl_FragColor = vec4( diffuseColor.xyz * HSLtoRGB(vec3(vScale/5.0, 1.0, 0.5)), diffuseColor.w );
      vec4 mixDepth = vec4(0.0,0.0,0.0, 1.0);
      vec4 mixSurface = vec4(1.0,1.0,1.0, 1.0);

      vec4 mixColor = mix(mixDepth,mixSurface,abs(sin(vElevation*0.4)));
      gl_FragColor = mixColor;

		}
