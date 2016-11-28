precision mediump float;
// Incoming texture coordinates.
varying vec2 vTextureCoord;
// Incoming vertex color
varying vec4 vColor;
// Sampler for a) sprite image or b) rendertarget in case of game.world.filter
uniform sampler2D uSampler;

uniform vec2      iResolution;
uniform float     iGlobalTime;
uniform vec2      mouse;

void main(void) {
    //- colorRGBA = (y % 2) * texel(u,v);
    gl_FragColor = mod(gl_FragCoord.y, 2.0) * texture2D(uSampler, vTextureCoord);
    // gl_FragColor = texture2D(uSampler, vTextureCoord) * 0.5;

    // gl_FragColor = mod(gl_FragCoord.y, 2.0) * texture2D(uSampler, vTextureCoord) * 0.5;
    // gl_FragColor.rgb = vec3(dot(gl_FragColor.rgb, gl_FragColor.rgb) * vec4(0,1,0,1));

    // float time = iGlobalTime;
    // vec3 scanlignes = vec3( sin(vTextureCoord.y*1.7+time) + sin((vTextureCoord.y/iResolution.y)*12.0+time)*0.3 );
    // gl_FragColor = vec4(scanlignes * 1.0, 1.0) * texture2D(uSampler, vTextureCoord);
}
