var gameAsteroids = {
    height: window.innerHeight,
    width: window.innerWidth
}

var nave = {
	X : 0,
	Y : 0,
	altura : 34,  	//altura imagen nave
	ancho : 97 	//ancho imagen nave

}

var norepetir = 1;

var asteroide = {
	
	ancho:65,
	alto:27
}

var pantalla = {
	
	tamanoX : window.innerWidth,
	tamanoY : window.innerHeight		
}

var imagen = {
		
	nave  	 : new Image(),		
	tierra 	 : new Image(),
	flama	 : new Image(),
	colision : new Image(),
	uno 	 : new Image(),
	dos 	 : new Image(),
	tres 	 : new Image()
}

imagen.nave.src = "nave.png";
imagen.tierra.src = "tierra.png";
imagen.colision.src = "colision.png";
imagen.uno.src = "uno.png";
imagen.dos.src = "dos.png";
imagen.tres.src = "tres.png";
imagen.flama.src = "flama.png";



////Coordenadas para las flamas
var empiezaJ=0;      //Al parecer es la variable dentro de movimientoFlamas J, donce es la flama donde empiza eliminando las que ya salieron de X
const numeroFlamas=400;   ////
var numFlamas=2*numeroFlamas;   //son doble por que los pares son para las coordenadas en X y los impares son para las coordenadas en Y
var coordenadasFlamas=[];
var w;

for(var i=0; i<=numFlamas; i=i+2){

	w=Math.floor(Math.random() * 10);
		
	if(w==1){
		coordenadasFlamas.push(Math.floor(Math.random() * (pantalla.tamanoY)));		//toma un valor al azar entre los valores que mide la pantalla para Y
		coordenadasFlamas.push(pantalla.tamanoX+(50*2*i));							//toma valores para x donde para cada flama va separada cierta cantidad
	}
	else{
		coordenadasFlamas.push(Math.floor(Math.random() * (pantalla.tamanoY)));
		coordenadasFlamas.push(pantalla.tamanoX+(50*i));
	}
				
}

/////Coordenadas para las estrellas
var starsX=[];
var starsY=[];
var tope=0;




for(i = 0; i <= 250; i++){
     // Obtinee numero aleatorios
	starsX.push(Math.floor(Math.random() * (pantalla.tamanoX-1)));
    starsY.push(Math.floor(Math.random() * (pantalla.tamanoY-1)));
}
 
var gameOver=0;
var contador=0;
var pausa=1;







function canvasJuego() {
    canvas = document.getElementById("myCanvas");

    canvas.setAttribute("width", gameAsteroids.width);
				
    ctx = canvas.getContext("2d"), ctx.fillStyle = "black";
    ctx.rect(0, 0, pantalla.tamanoX, pantalla.tamanoY);
    ctx.fill();
    stars();
    reproduccion = setInterval(movimientoFlamas, 40), setTimeout(function() {
        mueveNave()
    }, 1800)
}

function mueveNave() {
    window.addEventListener("keydown", teclaPresionada, !0)
}

function stars() {
    var a, b;
    tope <= 10 ? (a = 0, b = 2) : tope > 10 && tope <= 20 ? (a = 1, b = 1) : tope > 20 && tope <= 30 && (a = 2, b = 0, 30 == tope && (tope = 0)), tope++;
    for (var c = 0; c <= 247; c++) c < 130 && (ctx.beginPath(), ctx.fillStyle = "rgb(255,255,255)", ctx.arc(starsX[c], starsY[c], .1, 0, 2 * Math.PI, !0), ctx.closePath(), ctx.fill(), ctx.beginPath(), ctx.fillStyle = "rgba(255,255,255, 0.4)", ctx.arc(starsX[c], starsY[c], 2, 0, 2 * Math.PI, !0), ctx.closePath(), ctx.fill(), ctx.fillStyle = "rgba(255,255,255,0.2)", ctx.beginPath(), ctx.arc(starsX[c], starsY[c], 3.5, 0, 2 * Math.PI, !0), ctx.closePath(), ctx.fill()), c >= 131 && c <= 180 && (c < 150 ? (ctx.beginPath(), ctx.fillStyle = "rgb(255,255,255)", ctx.arc(starsX[c], starsY[c], 1.8, 0, 2 * Math.PI, !0), ctx.closePath(), ctx.fill(), ctx.beginPath(), ctx.fillStyle = "rgba(255,255,255, 0.4)", ctx.arc(starsX[c], starsY[c], a + 2.8, 0, 2 * Math.PI, !0), ctx.closePath(), ctx.fill(), ctx.fillStyle = "rgba(255,255,255,0.2)", ctx.beginPath(), ctx.arc(starsX[c], starsY[c], a + 4, 0, 2 * Math.PI, !0), ctx.closePath(), ctx.fill()) : (ctx.beginPath(), ctx.fillStyle = "rgb(255,255,255)", ctx.arc(starsX[c], starsY[c], 1.8, 0, 2 * Math.PI, !0), ctx.closePath(), ctx.fill(), ctx.beginPath(), ctx.fillStyle = "rgba(255,255,255, 0.4)", ctx.arc(starsX[c], starsY[c], b + 2.8, 0, 2 * Math.PI, !0), ctx.closePath(), ctx.fill(), ctx.fillStyle = "rgba(255,255,255,0.2)", ctx.beginPath(), ctx.arc(starsX[c], starsY[c], b + 4, 0, 2 * Math.PI, !0), ctx.closePath(), ctx.fill())), c >= 181 && c <= 240 && (c < 200 ? (ctx.beginPath(), ctx.fillStyle = "rgb(255,255,255)", ctx.arc(starsX[c], starsY[c], .6 * a + .8, 0, 2 * Math.PI, !0), ctx.closePath(), ctx.fill()) : (ctx.beginPath(), ctx.fillStyle = "rgb(255,255,255)", ctx.arc(starsX[c], starsY[c], .8, 0, 2 * Math.PI, !0), ctx.closePath(), ctx.fill()))
}


function movimientoFlamas(){

	var yProp, gameOverX, gameOverY;

	//Borro todo lo que haya en el canvas
	ctx.clearRect(0,0,myCanvas.width,myCanvas.height);

	stars();
	ctx.drawImage(imagen.nave, nave.X, nave.Y);

	//Empieza desde empiezaJ y va eliminando los que ya pasaron por el 0,y
	//Tambiél dentro del for solo va todo lo relacionado con las flamas 
	for(var j=empiezaJ; j<=numFlamas; j=j+2){
		if(coordenadasFlamas[empiezaJ+1]==-100){
			empiezaJ=empiezaJ+2;				
		}

		//hace la operacion del desplazamiento pero solo lo imprime si no exede en los dos lados de x
		coordenadasFlamas[j+1]=coordenadasFlamas[j+1]-20;
		if(coordenadasFlamas[j+1]>-100 && coordenadasFlamas[j+1]<(pantalla.tamanoX+150)){
			ctx.drawImage(imagen.flama, coordenadasFlamas[j+1], coordenadasFlamas[j]);
		}

		//Choco con un asteroide
		if(coordenadasFlamas[j+1]>(nave.X+32) && coordenadasFlamas[j+1]<(nave.X+nave.ancho)){
			if((coordenadasFlamas[j]+asteroide.alto)>(nave.Y+6) && coordenadasFlamas[j]<(nave.Y+nave.altura-6)){

				gameOver=1;
				gameOverX=nave.X;
				gameOverY=nave.Y;
				
				clearInterval(reproduccion);
				ctx.drawImage(imagen.colision, gameOverX+60, gameOverY-15);
				
				setTimeout(function(){ alertaPerdiste() }, 700);

			}			
		}

		//Cuando se acaban las flamas, lo comparo con j por que vuelve a iniciar el ciclo y
		if(j==numFlamas && coordenadasFlamas[numFlamas+1]==-100 && norepetir==1){
			alert("   ¡Perdiste! \n Se acabo el tiempo");
			norepetir=0;
			//clearInterval(reproduccion);
		}
	}

	ctx.drawImage(imagen.tierra, pantalla.tamanoX-100, pantalla.tamanoY-80);

	//if(naveX>=(tamanoPantallaX-anNave-50) && naveY>=(tamanoPantallaY-alNave-50) && norepetir==1){
	if(norepetir==1 && (nave.X>=1020 && nave.Y>=566 ||  nave.X>=1050 && nave.Y>=536  ||  nave.X>=1080 && nave.Y>=506)){
		alert("   ¡Ganaste!");
		//clearInterval(reproduccion);
		norepetir=0;
		for(var i=0; i<=numFlamas; i=i+2){
			coordenadasFlamas[i]=-100;
		}
	}



	if(contador<600){
		ctx.drawImage(imagen.tres, 500, 100);
		contador=contador+60
	}
	else if(contador>=600 && contador<=1200){
		contador=contador+60;		
		ctx.drawImage(imagen.dos, 500, 100);
	}
	else if(contador>1200 && contador<1800){
		contador=contador+60;		
		ctx.drawImage(imagen.uno, 500, 100);
	}

}


function teclaPresionada(evt) {
		
	var d=30;  //desplazamiento

		if(pausa == 1){

			if(evt.keyCode == 37) {
	
	          // Left arrow.
	      		nave.X = nave.X - d;
	    		if (nave.X < 0) {
	            	nave.X = 0;
	        	}
	     	 }
	          // Right arrow.
			else if(evt.keyCode == 39){
	    		nave.X = nave.X + d;
	        	if (nave.X > (pantalla.tamanoX-nave.ancho)) {
	            	nave.X = pantalla.tamanoX-nave.ancho;
	        	}
	        }
	
	
	          // Down arrow
			else if(evt.keyCode == 40){
				//console.log(nave.Y)
	    		nave.Y = nave.Y + d;
				//console.log(nave.Y)
				//console.log(nave.altura);
	        	if (nave.Y >  (pantalla.tamanoY-nave.altura)) {
	            	nave.Y = pantalla.tamanoY-nave.altura;
	        	}
	        }
	
	          // Up arrow 
			else if(evt.keyCode == 38){
	    		nave.Y = nave.Y - d;
	        	if (nave.Y < 0) {
	            	nave.Y = 0;
	        	}
	        }		
		}
		

		//Pausa
		if(evt.keyCode == 32 && pausa==1){
			pausa = -1;
			clearInterval(reproduccion);
		}

		else if(evt.keyCode == 32 && pausa==-1){
			pausa = 1;
			reproduccion=setInterval(movimientoFlamas, 40);
		}
	
}



function evento(a) {
    console.log(a.x, a.y)
}

function alertaPerdiste() {
    //var a = confirm("     ¡Perdiste!\nChocaste con un asteroide\n¿Deseas jugar otra vez?");
    //1 == a && location.reload(!0)
}

