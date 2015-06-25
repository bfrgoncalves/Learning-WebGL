
function toRad(angle){
	return angle*(Math.PI/180);
}

function checkQuadrants(allAngles, callback){

	var restAngle = 0;
	var sumAngles = 0;
	var angleToUse;
	var coordinates = [[0,0], [0,1]];
	var checked = {};

	firstQuadrant(allAngles, function(){
		callback(coordinates)
	});







	function firstQuadrant(angles, callback){
		
		for(i in angles){
			if (!checked[angles[i]]){
				if(angles[i] + sumAngles <= 90){
					sumAngles = sumAngles + angles[i];
					angleToUse = angles[i];
					checked[angles[i]] = true;
					console.log(angleToUse);
					if(sumAngles <= 45) coordinates.push([Math.tan(toRad(angleToUse)), 1]);
					else if(sumAngles == 90) coordinates.push([1, 0]);
					else coordinates.push([1, Math.tan(toRad(90 - angleToUse))]);
				}
				else if(sumAngles < 90) {
					restAngle = sumAngles + angles[i] - 90;
					angleToUse = angles[i] - restAngle;
					sumAngles = sumAngles + angleToUse;
					console.log(angleToUse);
					if(sumAngles <= 45) coordinates.push([Math.tan(toRad(angleToUse)), 1]);
					else if(sumAngles == 90) coordinates.push([1, 0]);
					else coordinates.push([1, Math.tan(toRad(90 - angleToUse))]);
				}
			}
		}
		callback();
	}


}
