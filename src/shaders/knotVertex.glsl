precision highp float;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = (modelPosition.y *(0.5 + 0.2*sin(modelPosition.x*uTime*0.4))*0.3);



    // modelPosition.y+=30.0*sin(15.0*uTime*0.02);

    modelPosition.x += elevation;
    modelPosition.z += cos(uTime*0.2);

    modelPosition.y+= elevation;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;


    gl_Position = projectedPosition;

    vUv=uv;
    vElevation = elevation;

}
