//Displaying Frame
var Frames = document.getElementById('Frames');
var Left = document.getElementById('Left');
var Right = document.getElementById('Right');

var test = document.getElementById('test');

//Cursor Object
var Cursor = function() {
	var cursor = this;
	//Cursor Image
	var img = document.createElement('img');
	img.src = 'http://www.operatorchan.org/pbe/src/133834517210.png';
	//Image positioning independent of html
	img.style.position = 'absolute';
	//Appending abs. image...
	img.onload = function () {
    	cursor.setTransform(
			[
	    		window.innerWidth/2,
	    		window.innerHeight/2
	  		],
	  		0
      );

    document.body.appendChild(img);
  	};

	//Transforming pos. of cursor
	cursor.setTransform = function(position, rotation) {
		img.style.left = position[0] - img.width  / 2 + 'px';
		img.style.top  = position[1] - img.height / 2 + 200 + 'px';

		img.style.transform = 'rotate(' + -rotation + 'rad)';

		img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
		img.style.OTransform = img.style.transform;
	};
};

// Controller

//Cursors
var cursors = {};

function showCoords(event) {
	var x = event.clientX;
	var y = event.clientY;
	var coords = "X coords: " + x + ", Y coords: " + y;
	console.log(coords);
}

var controller = Leap.loop({enableGestures: true}, function(frame){



	//Getting Cursors from hands
	frame.hands.forEach(function(hand,index){
		var gests = frame.gestures;
		//X and Y coordinates of the current hand on the screen. Y is offset and inverted due to it resulting in an "opposite" reaction
		x = hand.indexFinger.tipPosition[0];
		y = -(hand.indexFinger.tipPosition[1]-700);

		if (gests.length > 0) {

			for (var i = 0; i < gests.length; i++) {
				//If the user performs a 'screeTap' or push forward with the leap motion, it will display an image on the screen
				if (gests[i].type === 'screenTap') {
					var btn = new Image(50, 50); // width, height values are optional params
					btn.src = 'http://www.operatorchan.org/pbe/src/133834517210.png'; // To be modded
					btn.style.position = "absolute";
					btn.style.left = (x + 800) + "px";
					btn.style.top = (y) + "px";
					document.body.appendChild(btn);
				}
				//if the user pinchs with force over 1, it will trigger the current page to be cleared and a canvas will be generated with new leap motion coordinates
				if (hand.pinchStrength >= 1) {
					//Clear the current HTML page
					document.body.innerHTML = '';
					console.log("HTML Cleared");
					//Create a new canvas on the cleared HTML page
					var canvasReplace = document.createElement('canvas');
					canvasReplace.width = "1580";
					canvasReplace.height = "750";
					canvasReplace.id = "displayArea";
					canvasReplace.style.background = "#dddddd";
					document.body.appendChild(canvasReplace);
					var canvasElement = document.getElementById("displayArea");
					var displayArea = canvasElement.getContext("2d");
					controller = new Leap.Controller();
					controller.on("frame", function (frame) {
						if (frame.pointables.length > 0) {
							canvasElement.width = canvasElement.width; //clear

							//Get a pointable and normalize the tip position
							var pointable = frame.pointables[0];
							var interactionBox = frame.interactionBox;
							var normalizedPosition = interactionBox.normalizePoint(pointable.tipPosition, true);

							// Convert the normalized coordinates to span the canvas
							var canvasX = canvasElement.width * normalizedPosition[0];
							var canvasY = canvasElement.height * (1 - normalizedPosition[1]);
							//we can ignore z 

							displayArea.strokeText("(" + canvasX.toFixed(1) + ", " + canvasY.toFixed(1) + ")", canvasX, canvasY);
							displayArea.strokeStyle = "black";
							displayArea.lineWidth = 1;
							displayArea.stroke();
						}

					});
				}
			}
		}
		var cursor = (cursors[index] || (cursors[index] = new Cursor()));

		//Repositioning cursors and rotating
    	cursor.setTransform(hand.screenPosition(), hand.roll());
	});

}).use('screenPosition', {scale: 0.33});

//center load of cursor when page loads without hand motion...
cursors[0] = new Cursor();
//Working hand motions when browser isn't focused
controller.setBackground(true);
