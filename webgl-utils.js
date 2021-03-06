window.onerror = function(msg,url,lineno){
	alert(url + '(' + lineno + '): ' +msg);
}

function createShader(str,type){
		var shader = gl.createShader(type);
		gl.shaderSource(shader,str);
		gl.compileShader(shader);
		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { //CHECK the compile status of the shader, by checking for the parameter gl.COMPILE_STATUS
			throw gl.getShaderInfoLog(shader);
		}
		return shader;

	}

function createProgram(vstr , fstr){
	var program = gl.createProgram();
	var vshader = createShader(vstr, gl.VERTEX_SHADER);
	var fshader = createShader(fstr, gl.FRAGMENT_SHADER);
	gl.attachShader(program,vshader);
	gl.attachShader(program, fshader);
	gl.linkProgram(program);
	if(!gl.getProgramParameter(program, gl.LINK_STATUS)) { //CHECK the link status of the program, by checking for the parameter gl.LINK_STATUS
			throw gl.getProgramInfoLog(program);
		}

	return program;
}


function screenQuad(){ //Creates a buffer on the context and append the data to it. It will be used by the program

	//To create some geometry we need some BUFFER to hold some VERTEX data
	var vertexPosBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer); //Bind buffer to the Bind point named ARRAY_BUFFER
	var vertices = [-1, -1 , 1, -1, -1, 1 , 1, 1] //coordenates range from -1 to 1. So this will cover all the canvas
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); //FLOAT32ARRAY is what we need to pass to the buffer. STATIC_DRAW means that we upload the data 
																				//once and draw it several times
	vertexPosBuffer.itemSize = 2; //Atributes for the buffer. SIze and number of items
	vertexPosBuffer.numItems = 4;
	/*
	 2___ 3 
	 |\  |		//Square is defined in this case as a triangle strip, two triangles combined
	 | \ | 
	0|__\|1
	*/

	return vertexPosBuffer;

}