var s = document.getElementById('not_canvas');
var clear = document.getElementById("clear");
var stop = document.getElementById("stop");
var b_size = 500;
var r = 25;
var ids = [];
var svgs = [];

//Clears Stuff
var clearAll = function(e){
    while (s.lastChild) {
        s.removeChild(s.lastChild);
    }
}

//stop frames; reset frames
var stop_it = function() {
    for (var i = 0; i < ids.length; i++) {
	clearInterval(ids[i]);
    }
}


clear.addEventListener("click",clearAll);
stop.addEventListener("click", stop_it);

//======================================================

//Returns random color
var rand_color=function(){
  var valid_char = '0123456789ABCDEF';
  var ret = '#';
  for (var i = 0; i < 6; i++) {
    ret += valid_char[Math.floor(Math.random() * 16)];
  }
  return ret;

}

//Random click on SVG space
var click_shape = function(e){
    var x = e.offsetX;
    var y = e.offsetY;
    
    if ((x < r) || (y < r) || (x > 500-r) || (y > 500-r)) {
	alert("Bad Choice. Choose again.");
	return;
    }
    
    c = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    c.setAttribute('r', r.toString());
    c.setAttribute('fill',rand_color());
    c.setAttribute('cx',x);
    c.setAttribute('cy',y);
    c.setAttribute('xmode', Math.floor((Math.random()*3)-1) * 2);
    c.setAttribute('ymode', Math.floor((Math.random()*3)-1) * 2);

    s.appendChild(c);
    svgs.push(c);
}

var draw = function() {

    var cx, cy, x_mode, y_mode, svg;
    for (var o = 0; o < svgs.length; o++) {
	svg = svgs[o];
	cx = parseInt(svg.getAttribute('cx'));
	cy = parseInt(svg.getAttribute('cy'));
	x_mode = parseInt(svg.getAttribute('xmode'));
	y_mode = parseInt(svg.getAttribute('ymode'));
	
	//change direction
	if (cx-r <= 0 || cx+r >= b_size) {
	    x_mode *= -1;
	    svg.setAttribute('fill', rand_color());
	}
	if (cy-r <= 0 || cy+r >= b_size) {
	    y_mode *= -1;
	    svg.setAttribute('fill', rand_color());
	}
	//move the rect
	svg.setAttribute('cx', (cx+x_mode).toString());
	svg.setAttribute('cy', (cy+y_mode).toString());
	svg.setAttribute('xmode', x_mode.toString());
	svg.setAttribute('ymode', y_mode.toString());

    }
}

//initiate loop
ids.push(setInterval( draw, 15 ));


s.addEventListener("click", click_shape);
 

