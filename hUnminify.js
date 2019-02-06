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
	
	tamanoX : 1200,  //window.innerWidth,
	tamanoY : 600    //window.innerHeight		
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

function canvasJuego(){

	canvas = document.getElementById("myCanvas");

    ctx = canvas.getContext("2d");
    

	
	   // Fondo negro
       ctx.fillStyle = "black";
       ctx.rect(0, 0, pantalla.tamanoX, pantalla.tamanoY);
       ctx.fill();

       // Dibuja las estrellas.
       stars();
	
	    reproduccion=setInterval(movimientoFlamas, 40);


		//canvas.addEventListener("click",evento);
         setTimeout(function(){ mueveNave() }, 1800);
    
}

function mueveNave(){
		
	window.addEventListener('keydown', teclaPresionada, true);

		
}


//Dibuja las estrellas
function stars(){
	var max, min;
	
	if(tope<=10){
		max=0;
		min=2;
	}
	else if(tope>10 && tope<=20){
		max=1;	
		min=1;		
	}
	else if(tope>20 && tope<=30){
		max=2;
		min=0;
		if(tope==30){
			tope=0;	
		}	
	}
	
	tope++;

    for(var i = 0; i <= 247; i++){
    
		if(i<130){
	     	 ctx.beginPath();
			  ctx.fillStyle = "rgb(255,255,255)";
    	      ctx.arc(starsX[i], starsY[i], 0.1, 0, Math.PI * 2, true);
        	  ctx.closePath();
          	  ctx.fill();

		  ctx.beginPath();
		  ctx.fillStyle = "rgba(255,255,255, 0.4)";
          ctx.arc(starsX[i], starsY[i], 2, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();

		  
		  ctx.fillStyle = "rgba(255,255,255,0.2)";
          ctx.beginPath();
          ctx.arc(starsX[i], starsY[i], 3.5, 0, Math.PI * 2, true);
		  ctx.closePath();
          ctx.fill();
		 }
  
		 //Dibuja 8 estrellas mas grandes
    	if(i >= 131 && i <= 180){
          if(i<150){
		  ctx.beginPath();
		  ctx.fillStyle = "rgb(255,255,255)";
          ctx.arc(starsX[i], starsY[i], 1.8, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();

		  ctx.beginPath();
		  ctx.fillStyle = "rgba(255,255,255, 0.4)";
          ctx.arc(starsX[i], starsY[i], max+2.8, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();

		  
		  ctx.fillStyle = "rgba(255,255,255,0.2)";
          ctx.beginPath();
          ctx.arc(starsX[i], starsY[i], max+4, 0, Math.PI * 2, true);
		  ctx.closePath();
          ctx.fill();
		  }

		  else{
		  ctx.beginPath();
		  ctx.fillStyle = "rgb(255,255,255)";
          ctx.arc(starsX[i], starsY[i], 1.8, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();

		  ctx.beginPath();
		  ctx.fillStyle = "rgba(255,255,255, 0.4)";
          ctx.arc(starsX[i], starsY[i], min+2.8, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();

		  
		  ctx.fillStyle = "rgba(255,255,255,0.2)";
          ctx.beginPath();
          ctx.arc(starsX[i], starsY[i], min+4, 0, Math.PI * 2, true);
		  ctx.closePath();
          ctx.fill();
		  }



   		}

	 //Dibuja 8 estrellas pequeñas
    	if(i >= 181 && i <= 240){
		   if(i<200){
          ctx.beginPath();
		  ctx.fillStyle = "rgb(255,255,255)";
          ctx.arc(starsX[i], starsY[i], (max*0.6)+0.8, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
		   }

		  else{
				  
		  ctx.beginPath();
		  ctx.fillStyle = "rgb(255,255,255)";
          ctx.arc(starsX[i], starsY[i], 0.8, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
	  
				  
			}
		 }

   	}
}


function movimientoFlamas(){

	var yProp, gameOverX, gameOverY;

	//Borro todo lo que haya en el canvas
	ctx.clearRect(0,0,myCanvas.width,myCanvas.height);

	ctx.fillStyle="black";
	ctx.fillRect(0, 0, pantalla.tamanoX, pantalla.tamanoY);
	ctx.fill();

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

function evento(arg){
	
	console.log(arg.x, arg.y);
		
		
}


function alertaPerdiste(){
		
	var r = confirm("     ¡Perdiste!\nChocaste con un asteroide\n¿Deseas jugar otra vez?");
	if (r == true) {
   		location.reload(true); 
	}
	else{
				
	//alert("     ¡Perdiste!\nChocaste con un asteroide\n");
	}		
}
