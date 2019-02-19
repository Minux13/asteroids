var game = {
    width: window.innerWidth
    ,height: window.innerHeight
    ,canvas: document.getElementById("myCanvas")
    ,ctx   : undefined
    ,firstVisibleAsteroid : 0
    ,coordenadasFlamas    : []
    ,frames : undefined
    ,numFlamas : 0
    ,init : function (){
        game.nave.image.src = "nave.png";
        game.earth.image.src = "tierra.png";
        game.colision.image.src = "colision.png";
        game.asteroid.image.src = "flama.png";

        game.earth.x = game.width - (game.earth.width / 2);
        game.earth.y = game.height - (game.earth.height / 2);

        //imagen.uno.src = "uno.png";
        //imagen.dos.src = "dos.png";
        //imagen.tres.src = "tres.png";


        var numeroFlamas=400;   ////
        game.numFlamas=2*numeroFlamas;        
        var w;
        for(let i=0; i<=game.numFlamas; i=i+2){
        	w=Math.floor(Math.random() * 10);
        	if(w==1){
        		game.coordenadasFlamas.push( Math.floor(Math.random() * (game.height) ));
        		game.coordenadasFlamas.push( game.width + (50*2*i) );			
        	}else{
        		game.coordenadasFlamas.push( Math.floor(Math.random() * (game.height) ));
        		game.coordenadasFlamas.push( game.width + (50*i));
        	}
        }

        game.canvas.setAttribute("width",  game.width);
        game.canvas.setAttribute("height", game.height);	    			
        game.ctx = game.canvas.getContext("2d");

        game.ctx.fillStyle = "black";
        game.ctx.rect(0, 0, game.width, game.height);
        game.ctx.fill();

        /////////////stars();
        game.frames = setInterval(game.moveAsteroids, 40);
        setTimeout(function() {
            window.addEventListener("keydown", game.keyPress, !0)
            window.addEventListener("keyup", game.keyUp, !0)
        }, 1800)


    }
    ,nave: {
        x  : 0
        ,y : 0
        ,height : 34
        ,width  : 97
        ,stepX  : 0
        ,stepY  : 0
        ,image  : new Image()
        ,up     : false
        ,down   : false
        ,left   : false
        ,right  : false
    }
    ,asteroid : {
        width : 65
        ,height : 27
        ,image : new Image()
    }
    ,colision : {
        x : 0
        ,y: 0
        ,image: new Image()
    }
    ,earth : {
        image: new Image()
        ,x: 0
        ,y: 0
        ,width : 272
        ,height: 272
        ,radio : 136
    }
    ,moveAsteroids : function(){

	    //Borro todo lo que haya en el canvas
	    game.ctx.clearRect( 0, 0, game.width, game.height );

	    //stars();
        //game.nave.x = (game.nave.x <= 0 || game.nave.x >= game.width - game.nave.width ) ? 0 : game.nave.x + game.nave.stepX;
        //game.nave.y = (game.nave.y <= 0 || game.nave.y >= game.height - game.nave.height) ? 0 : game.nave.y + game.nave.stepY;
        //game.nave.x = (game.nave.x <= 0 ) ? game.nave.x + game.nave.stepX;
        //game.nave.y = (game.nave.y <= 0 ) ? game.nave.y + game.nave.stepY;

        var d = 20;

        if(game.nave.left){
            game.nave.x = ( game.nave.x <= 0 ) ? game.nave.x + 0 : game.nave.x - d ;
        }else if(game.nave.right){
            game.nave.x = ( game.nave.x >= (game.width - game.nave.width) ) ? game.nave.x + 0 : game.nave.x + d ;
        }
        if( game.nave.up ){
            game.nave.y = ( game.nave.y <= 0 ) ? game.nave.y + 0 : game.nave.y - d ;
        }else if( game.nave.down ){
            game.nave.y = ( game.nave.y >= (game.height - game.nave.height) ) ? game.nave.y + 0 : game.nave.y + d;
        }

	    game.ctx.drawImage( game.nave.image, game.nave.x, game.nave.y );

	    //Empieza desde game.firstVisibleAsteroid y va eliminando los que ya pasaron por el 0,y
	    //Tambiél dentro del for solo va todo lo relacionado con las flamas 
	    for(var j=game.firstVisibleAsteroid; j<=game.numFlamas; j=j+2){
	    	if( game.coordenadasFlamas[game.firstVisibleAsteroid+1]==-100 ){
	    	    game.firstVisibleAsteroid+=2;				
	    	}

	    	//hace la operacion del desplazamiento pero solo lo imprime si no exede en los dos lados de x
	    	game.coordenadasFlamas[j+1] -= 20;
	    	if( game.coordenadasFlamas[j+1] >- 100 && game.coordenadasFlamas[j+1] < (game.width + 150)){
	    		game.ctx.drawImage(game.asteroid.image, game.coordenadasFlamas[j+1], game.coordenadasFlamas[j]);
	    	}
/*
	    	//Choco con un asteroid
	    	if(game.coordenadasFlamas[j+1] > (game.nave.x + 32) && game.coordenadasFlamas[j+1] < (game.nave.x+game.nave.width)){
	    		if((game.coordenadasFlamas[j]+game.asteroid.height)>(game.nave.y+6) && game.coordenadasFlamas[j]<(game.nave.y+game.nave.height-6)){

	    			game.colision.x = game.nave.x + 60;
	    			game.colision.y = game.nave.y - 15;
	    			
                    ////////////////////////////
	    			clearInterval( game.frames );
	    			game.ctx.drawImage( game.colision.image, game.colision.x , game.colision.y );
	    		
                    ///////////////////////////	
	    			setTimeout(function(){ alertaPerdiste() }, 700);

	    		}			
	    	}
            */
            
            /*
	    	//Cuando se acaban las flamas, lo comparo con j por que vuelve a iniciar el ciclo y
	    	if(j==game.numFlamas && coordenadasFlamas[game.numFlamas+1]==-100 && norepetir==1){
	    		alert("   ¡Perdiste! \n Se acabo el tiempo");
	    		norepetir=0;
	    		//clearInterval( game.frames );
	    	}
            */
	    }

	    game.ctx.drawImage( game.earth.image, game.earth.x , game.earth.y );

	    //if(naveX>=(tamanoPantallaX-anNave-50) && naveY>=(tamanoPantallaY-alNave-50) && norepetir==1){
        //Si llega a al planeta
	    if(norepetir  &&  Math.sqrt( (game.width - game.nave.x)^2 + (game.height - game.nave.y )^2 ) < (game.earth.radio)){
	    	//alert("   ¡Ganaste!");
            console.log("ganaste");
	    	//clearInterval( game.frames );
	    	/*norepetir=false;
	    	for(var i=0; i<=game.numFlamas; i=i+2){
	    		game.coordenadasFlamas[i]=-100;
	    	}*/
	    }
        /*
	    if(contador<600){
	    	ctx.drawImage(imagen.tres, 500, 100);
	    	contador=contador+60
	    }else if(contador>=600 && contador<=1200){
	    	contador=contador+60;		
	    	ctx.drawImage(imagen.dos, 500, 100);
	    }else if(contador>1200 && contador<1800){
	    	contador=contador+60;		
	    	ctx.drawImage(imagen.uno, 500, 100);
	    }*/
    }
    ,pause : false
    ,keyPress : function (evt) {
		
    	var d=15;  //desplazamiento
        //console.log(evt.keyCode);
        
        if( !game.pause ){
    		if(evt.keyCode == 37) { // Left arrow.
          		//game.nave.stepX = (game.nave.x <= 0) ? 0 : -1*d ; 
          		//game.nave.stepX = -1*d ; 
                game.nave.left = true;
         	}else if(evt.keyCode == 39){  // Right arrow.
                /*if(game.nave.x >= (game.width - game.nave.width)){
                    game.nave.stepX=0;
                }else{*/
                //    game.nave.stepX=d;
                /*}; 
                console.log(game.nave.stepX); */
                game.nave.right = true;
            }else if(evt.keyCode == 40){ // Down arrow
          		//game.nave.stepY = (game.nave.y >= (game.height - game.nave.height)) ? 0 : d; 
          		//game.nave.stepY = d; 
                game.nave.down = true;
            }else if(evt.keyCode == 38){ // Up arrow
                /*if(game.nave.y - d <= 0){
                    game.nave.stepY=0;
                }else{*/
                //    game.nave.stepY = -1*d;
                //}; 
                //console.log(game.nave.stepY, game.nave.y); 
                game.nave.up = true;
            }		
    	}

    	/*if( !game.pause ){
    		if(evt.keyCode == 37) { // Left arrow.
          		game.nave.x = game.nave.x - d;
        		if (game.nave.x < 0) {
                	game.nave.x = 0;
            	}
         	}else if(evt.keyCode == 39){  // Right arrow.
        		game.nave.x = game.nave.x + d;
            	if (game.nave.x > (game.width - game.nave.width)) {
                	game.nave.x = game.width - game.nave.width;
            	}
            }else if(evt.keyCode == 40){ // Down arrow
        		game.nave.y = game.nave.y + d;
            	if (game.nave.y >  ( game.height - game.nave.height)) {
                	game.nave.y = game.height - game.nave.height;
            	}
            }else if(evt.keyCode == 38){ // Up arrow
                game.nave.y = game.nave.y - d;
            	if (game.nave.y < 0) {
                	game.nave.y = 0;
            	}
            }		
    	}*/
    
    	//Pausa
    	if(evt.keyCode == 32 && !game.pause){
    		game.pause = true;
    		clearInterval( game.frames );
    	}else if(evt.keyCode == 32 && game.pause){
    		game.pause = false;
    		game.frames = setInterval(game.moveAsteroids, 40);
    	}
	
    }
    ,keyUp : function (evt) {
        
        if( !game.pause ){
    		if(evt.keyCode == 37) { // Left arrow.
                game.nave.left = false;
          		//game.nave.stepX = 0;
         	}else if(evt.keyCode == 39){  // Right arrow.
        		//game.nave.stepX = 0;
                game.nave.right = false;
            }else if(evt.keyCode == 40){ // Down arrow
        		//game.nave.stepY = 0;
                game.nave.down = false;
            }else if(evt.keyCode == 38){ // Up arrow
                //game.nave.stepY = 0;
                game.nave.up = false;
            }		
    	}
    
    	//Pausa
    	if(evt.keyCode == 32 && !game.pause){
    		game.pause = true;
    		clearInterval( game.frames );
    	}else if(evt.keyCode == 32 && game.pause){
    		game.pause = false;
    		game.frames = setInterval(game.moveAsteroids, 40);
    	}
	
    }




}

var norepetir = true;

 
var contador=0;

game.init()



function alertaPerdiste() {
    //var a = confirm("     ¡Perdiste!\nChocaste con un asteroide\n¿Deseas jugar otra vez?");
    //1 == a && location.reload(!0)
}




/*

/////Coordenadas para las estrellas
var starsX=[];
var starsY=[];
var tope=0;



for(i = 0; i <= 250; i++){
     // Obtinee numero aleatorios
	starsX.push(Math.floor(Math.random() * (pantalla.tamanoX-1)));
    starsY.push(Math.floor(Math.random() * (pantalla.tamanoY-1)));
}

function stars() {
    var a, b;
    if(tope <= 10){
        a = 0, b = 2;
    }else if ( tope <= 20 ){
        a = 1, b = 1;
    }else if ( tope <= 30 ){
        a = 2, b = 0;
        if (30 == tope) {
             tope = 0 
        }
    }
    tope++;

    for (var c = 0; c <= 247; c++){
        if( c < 130 ) {
            ctx.beginPath();
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.arc(starsX[c], starsY[c], .1, 0, 2 * Math.PI, !0);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = "rgba(255,255,255, 0.4)";
            ctx.arc(starsX[c], starsY[c], 2, 0, 2 * Math.PI, !0);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "rgba(255,255,255,0.2)";
            ctx.beginPath();
            ctx.arc(starsX[c], starsY[c], 3.5, 0, 2 * Math.PI, !0);
            ctx.closePath();
            ctx.fill();
        }
        else if ( c <= 180 ) {
            if ( c < 150 ){
                ctx.beginPath()
                ctx.fillStyle = "rgb(255,255,255)"
                ctx.arc(starsX[c], starsY[c], 1.8, 0, 2 * Math.PI, !0)
                ctx.closePath()
                ctx.fill()
                ctx.beginPath()
                ctx.fillStyle = "rgba(255,255,255, 0.4)"
                ctx.arc(starsX[c], starsY[c], a + 2.8, 0, 2 * Math.PI, !0)
                ctx.closePath()
                ctx.fill()
                ctx.fillStyle = "rgba(255,255,255,0.2)"
                ctx.beginPath()
                ctx.arc(starsX[c], starsY[c], a + 4, 0, 2 * Math.PI, !0)
                ctx.closePath()
                ctx.fill()
            }else {
                ctx.beginPath()
                ctx.fillStyle = "rgb(255,255,255)"
                ctx.arc(starsX[c], starsY[c], 1.8, 0, 2 * Math.PI, !0)
                ctx.closePath()
                ctx.fill()
                ctx.beginPath()
                ctx.fillStyle = "rgba(255,255,255, 0.4)"
                ctx.arc(starsX[c], starsY[c], b + 2.8, 0, 2 * Math.PI, !0)
                ctx.closePath()
                ctx.fill()
                ctx.fillStyle = "rgba(255,255,255,0.2)"
                ctx.beginPath()
                ctx.arc(starsX[c], starsY[c], b + 4, 0, 2 * Math.PI, !0)
                ctx.closePath()
                ctx.fill()
            }
        }else if ( c <= 240 ) {
            if ( c < 200 ) {
                ctx.beginPath()
                ctx.fillStyle = "rgb(255,255,255)"
                ctx.arc(starsX[c], starsY[c], .6 * a + .8, 0, 2 * Math.PI, !0)
                ctx.closePath()
                ctx.fill()
            } else {
                ctx.beginPath()
                ctx.fillStyle = "rgb(255,255,255)"
                ctx.arc(starsX[c], starsY[c], .8, 0, 2 * Math.PI, !0)
                ctx.closePath()
                ctx.fill()
            }
        }
    }
}
*/
