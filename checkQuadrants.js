
function toRad(angle){
	return angle*(Math.PI/180);
}

function checkQuadrants(allAngles, callback){

	var restAngle = 0;
	var sumAngles = 0;
	var angleToUse;
	var coordinates = [[0,0], [0,1]];
	var checked = {};
	
	for (i=0; i <allAngles;i++){
		checked[i] = false;
	}

	firstQuadrant(allAngles, function(){
		secondQuadrant(allAngles, function(){
			console.log(coordinates);
			callback(coordinates);
		})
	});


	function firstQuadrant(angles, callback){
		
		for(i=0; i <angles.length;i++){
			if (sumAngles == 90) break;
			if (!checked[i]){
				if(angles[i] + sumAngles <= 90){
					sumAngles = sumAngles + angles[i];
					angleToUse = angles[i];
					checked[angles[i]] = true;
				}
				else if(sumAngles < 90) {

					restAngle = sumAngles + angles[i] - 90;
					console.log(restAngle);
					angleToUse = angles[i] - restAngle;
					sumAngles = sumAngles + angleToUse;
				}
				if(sumAngles <= 45) coordinates.push([Math.tan(toRad(angleToUse)), 1]);
				else if(sumAngles == 90) coordinates.push([1, 0]);
				else coordinates.push([1, Math.tan(toRad(90 - angleToUse))]);
			}
		}
		callback();
	}

	function secondQuadrant(angles, callback){
		
		for(i=0; i <angles.length;i++){
			if (sumAngles == 180) break;
			if (!checked[i]){
				if (restAngle!=0){
					sumAngles = sumAngles + restAngle;
					angleToUse = restAngle;
					checked[angles[i]] = true;
					restAngle = 0;
					console.log(angleToUse);
				}
				else if(angles[i] + sumAngles <= 180){
					sumAngles = sumAngles + angles[i];
					angleToUse = angles[i];
					checked[angles[i]] = true;
				}
				else if(sumAngles < 180) {
					restAngle = sumAngles + angles[i] - 180;
					angleToUse = angles[i] - restAngle;
					sumAngles = sumAngles + angleToUse;
				}
				if(sumAngles <= 135) coordinates.push([1, -Math.tan(toRad(angleToUse))]);
				else if(sumAngles == 180) coordinates.push([0, -1]);
				else coordinates.push([1, -Math.tan(toRad(90 - angleToUse))]);
			}
		}
		callback();
	}


}
