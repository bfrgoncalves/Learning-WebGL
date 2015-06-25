
function toRad(angle){
	return angle*(Math.PI/180);
}

function checkQuadrants(allAngles, callback){

	var restAngle = 0;
	var sumAngles = 0;
	var angleToUse;
	var prevAngle = 0;
	var coordinates = [[0,0], [0,1]];
	var checked = {};
	
	for (i=0; i <allAngles.length;i++){
		checked[i] = false;
	}

	firstQuadrant(allAngles, function(){
		secondQuadrant(allAngles, function(){
			thirdQuadrant(allAngles, function(){
				fourthQuadrant(allAngles, function(){
					console.log(coordinates);
					callback(coordinates);
				});
			})
		})
	});


	function firstQuadrant(angles, callback){
		
		for(i=0; i <angles.length;i++){
			if (sumAngles == 90) break;
			if (checked[i] == false){
				if(angles[i] + sumAngles <= 90){
					sumAngles = sumAngles + angles[i];
					angleToUse = sumAngles;
					checked[i] = true;
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
			console.log(i, checked[i]);
			if (checked[i] == false){
				if (restAngle != 0){
					sumAngles = sumAngles + restAngle;
					angleToUse = restAngle;
					checked[i] = true;
					restAngle = 0;
				}
				else if(angles[i] + sumAngles <= 180){
					console.log('AQUI');
					sumAngles = sumAngles + angles[i];
					angleToUse = sumAngles - 90;
					checked[i] = true;
				}
				else if(sumAngles < 180) {
					restAngle = sumAngles + angles[i] - 180;
					angleToUse = angles[i] - restAngle;
					sumAngles = sumAngles + angleToUse;
				}
				if(sumAngles <= 135) coordinates.push([1, -Math.tan(toRad(angleToUse))]);
				else if(sumAngles == 180) coordinates.push([0, -1]);
				else coordinates.push([Math.tan(toRad(90 - angleToUse)), -1]);
			}
		}
		callback();
	}

	function thirdQuadrant(angles, callback){
		
		for(i=0; i <angles.length;i++){
			if (sumAngles == 270) break;
			if (checked[i] == false){
				if (restAngle!=0){
					console.log(restAngle);
					sumAngles = sumAngles + restAngle;
					console.log(sumAngles);
					angleToUse = restAngle;
					checked[i] = true;
					restAngle = 0;
				}
				else if(angles[i] + sumAngles <= 270){
					sumAngles = sumAngles + angles[i];
					angleToUse = sumAngles - 180;
					checked[i] = true;
				}
				else if(sumAngles < 270) {
					restAngle = sumAngles + angles[i] - 270;
					angleToUse = angles[i] - restAngle;
					sumAngles = sumAngles + angleToUse;
				}
				if(sumAngles <= 225) coordinates.push([-Math.tan(toRad(angleToUse)), -1]);
				else if(sumAngles == 270) coordinates.push([-1, 0]);
				else coordinates.push([-1, -Math.tan(toRad(90 - angleToUse))]);
			}
		}
		callback();
	}

	function fourthQuadrant(angles, callback){
		
		for(i=0; i <angles.length;i++){
			if (sumAngles == 360) break;
			if (checked[i] == false){
				if (restAngle!=0){
					console.log(restAngle);
					sumAngles = sumAngles + restAngle;
					console.log(sumAngles);
					angleToUse = restAngle;
					checked[i] = true;
					restAngle = 0;
				}
				else if(angles[i] + sumAngles <= 360){
					sumAngles = sumAngles + angles[i];
					angleToUse = sumAngles - 270;
					checked[i] = true;
				}
				else if(sumAngles < 360) {
					restAngle = sumAngles + angles[i] - 360;
					angleToUse = angles[i] - restAngle;
					sumAngles = sumAngles + angleToUse;
				}
				if(sumAngles <= 315) coordinates.push([-1, Math.tan(toRad(angleToUse))]);
				else if(sumAngles == 360) coordinates.push([-1, 0]);
				else coordinates.push([-Math.tan(toRad(90 - angleToUse)), 1]);
			}
		}
		callback();
	}


}
