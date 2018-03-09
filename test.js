var s = document.getElementById('not_canvas');


var clear = document.getElementById("clear");



//Clears Stuff
var clearAll = function(e){

	while (s.lastChild) {
        s.removeChild(s.lastChild);
    }
    r = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    r.setAttribute('width','500');
    r.setAttribute('height','500');
    r.setAttribute('stroke-width','1');
    r.setAttribute('stroke','green');
    r.setAttribute('fill','white');
    s.appendChild(r)
    
}

clear.addEventListener("click",clearAll);

//Random click on SVG space
var click_shape = function(e){
	var x = e.offsetX;
    var y = e.offsetY;

    c = document.createElementNS("http://www.w3.org/2000/svg", 'circle')
    c.setAttribute('r','25')
    c.setAttribute('fill','blue')
    c.setAttribute('cx',x)
    c.setAttribute('cy',y)
    c.setAttribute("remove",'0')
    c.addEventListener("click", click_one);
    s.appendChild(c)  
    
}

//Returns random color
var rand_color=function(){
  var valid_char = '0123456789ABCDEF';
  var ret = '#';
  for (var i = 0; i < 6; i++) {
    ret += valid_char[Math.floor(Math.random() * 16)];
  }
  return ret;

}
//Click
var click_one=function(e){
	//After first click
	if (this.getAttribute("remove")==0){
		this.setAttribute("fill", rand_color());
		this.setAttribute("remove","1")
	}
	//After second click, removes and generates new cicle
	else{
		this.remove()
	    c = document.createElementNS("http://www.w3.org/2000/svg", 'circle')
	    c.setAttribute('r','25')
	    c.setAttribute('fill','blue')
	    c.setAttribute('cx',Math.floor(Math.random() * 500))
	    c.setAttribute('cy',Math.floor(Math.random() * 500))
	    c.setAttribute("remove",'0')
	    c.addEventListener("click", click_one);
	    s.appendChild(c)  		
	}
	e.stopPropagation();
}

s.addEventListener("click",click_shape);


