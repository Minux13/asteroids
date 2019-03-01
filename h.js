window.onload = function() {
    canvas.stars.init();
};

var game = {
    width: window.innerWidth
    ,height: window.innerHeight
    ,firstVisibleAsteroid : 0 
    ,coordenadasFlamas    : []
    ,frames : undefined
    ,numFlamas : 0
    ,gameOver : false
    ,init : function (){
        clearInterval(canvas.stars.frames)
        document.getElementById("instructions").remove();
        /*if (performance.navigation.type == 1) {
          console.info( "This page is reloaded" );
        } else {
          console.info( "This page is not reloaded");
        }*/

        var numeroFlamas=400;   ////
        game.numFlamas=2*numeroFlamas;        
        var w;
        for(let i=0; i<=game.numFlamas; i=i+2){
        	/*w=Math.floor(Math.random() * 10);
        	if(w==1){
        		game.coordenadasFlamas.push( Math.floor(Math.random() * (game.height) ));
        		game.coordenadasFlamas.push( game.width + (50*2*i) );			
        	}else{*/
        		game.coordenadasFlamas.push( Math.floor(Math.random() * (game.height) ));
        		game.coordenadasFlamas.push( game.width + (50*i));
        	//}
        }

        //canvas.init();
        //canvas.stars.init();

        game.frames = setInterval(game.moveAsteroids, 40);
        window.addEventListener("keydown", game.keyPress, !0);
        window.addEventListener("keyup", game.keyUp, !0);


    }
    ,moveAsteroids : function(){

	    //Borro todo lo que haya en el canvas
	    canvas.ctx.clearRect( 0, 0, game.width, game.height );

	    canvas.stars.animation();

        var d = 20;

        if(canvas.nave.moveLeft){
            canvas.nave.x = ( canvas.nave.x <= 0 ) ? canvas.nave.x + 0 : canvas.nave.x - d ;
        }else if(canvas.nave.moveRight){
            canvas.nave.x = ( canvas.nave.x >= (game.width - canvas.nave.width) ) ? canvas.nave.x + 0 : canvas.nave.x + d ;
        }
        if( canvas.nave.moveUp ){
            canvas.nave.y = ( canvas.nave.y <= 0 ) ? canvas.nave.y + 0 : canvas.nave.y - d ;
        }else if( canvas.nave.moveDown ){
            canvas.nave.y = ( canvas.nave.y >= (game.height - canvas.nave.height) ) ? canvas.nave.y + 0 : canvas.nave.y + d;
        }

	    canvas.ctx.drawImage( canvas.nave.image, canvas.nave.x, canvas.nave.y );

	    //Empieza desde game.firstVisibleAsteroid y va eliminando los que ya pasaron por el 0,y
	    //Tambiél dentro del for solo va todo lo relacionado con las flamas 
	    for(var j=game.firstVisibleAsteroid; j<=game.numFlamas; j=j+2){
            //Actualiza el primer asteroide visible del arreglo para empezar el for desde ahi
	    	if( game.coordenadasFlamas[game.firstVisibleAsteroid+1]==-100 ){
	    	    game.firstVisibleAsteroid+=2;				
	    	}

	    	//hace la operacion del desplazamiento pero solo lo imprime si no exede en los dos lados de x
	    	game.coordenadasFlamas[j+1] -= 20;
	    	if( game.coordenadasFlamas[j+1] >- 100 && game.coordenadasFlamas[j+1] < (game.width + 150)){
	    		canvas.ctx.drawImage(canvas.asteroid.image, game.coordenadasFlamas[j+1], game.coordenadasFlamas[j]);
	    	}

	    	//Choco con un asteroid
	    	if(game.coordenadasFlamas[j+1] > (canvas.nave.x + 32) && game.coordenadasFlamas[j+1] < (canvas.nave.x+canvas.nave.width)){
	    		if((game.coordenadasFlamas[j]+canvas.asteroid.height)>(canvas.nave.y+6) && game.coordenadasFlamas[j]<(canvas.nave.y+canvas.nave.height-6)){

                    game.gameOver = true;
                    
                    // (FY + FH/2 - NY + NH/2)/2   El punto medio del espacio que hay entre cada punto medio Y de los dos objetos flama-asteroide y nave
                    var mediaNaveAsteroidY = (game.coordenadasFlamas[j] + (canvas.colision.height/2) - (canvas.nave.y + (canvas.nave.height/2) ))/2;

	    			canvas.colision.x = game.coordenadasFlamas[j+1] - (canvas.colision.width/2);
	    			canvas.colision.y = canvas.nave.y + (canvas.nave.height/2) + mediaNaveAsteroidY - (canvas.colision.height/2);

                    canvas.asteroidColisioned.x = game.coordenadasFlamas[j+1];
                    canvas.asteroidColisioned.y = game.coordenadasFlamas[j];
	    			
	    			clearInterval( game.frames );

	    			canvas.ctx.drawImage( canvas.colision.image, canvas.colision.x , canvas.colision.y, canvas.colision.width, canvas.colision.height );
	    		
	    			game.messageLost();
                    //game.frames = setInterval(game.finalFrames, 40);
                    setTimeout(function(){game.frames = setInterval(game.finalFrames, 40)},1000);
	                canvas.ctx.drawImage( canvas.earth.image, canvas.earth.x , canvas.earth.y );
                    return 0;
	    			//setTimeout(function(){  game.frames = setInterval(game.moveAsteroids, 40)  }, 1500);

	    		}			
	    	}
            
            
            /*
	    	//Cuando se acaban las flamas, lo comparo con j por que vuelve a iniciar el ciclo y
	    	if(j==game.numFlamas && coordenadasFlamas[game.numFlamas+1]==-100 && norepetir==1){
	    		alert("   ¡Perdiste! \n Se acabo el tiempo");
	    		norepetir=0;
	    		//clearInterval( game.frames );
	    	}
            */
	    }

	    canvas.ctx.drawImage( canvas.earth.image, canvas.earth.x , canvas.earth.y );

	    //if(naveX>=(tamanoPantallaX-anNave-50) && naveY>=(tamanoPantallaY-alNave-50) && norepetir==1){
        //Si llega a al planeta
        var naveX = (game.width - (canvas.nave.x+canvas.nave.width)) * (game.width - (canvas.nave.x+canvas.nave.width));
        var naveY = (game.height - (canvas.nave.y+canvas.nave.height-30)) * (game.height - (canvas.nave.y+canvas.nave.height));
        var radio =  Math.sqrt( naveX + naveY );
	    if( radio < canvas.earth.radio ){
	    	//alert("   ¡Ganaste!");
            game.gameOver = true;
	        canvas.ctx.drawImage( canvas.nave.image, canvas.nave.x, canvas.nave.y );
	    	clearInterval( game.frames );
            game.messageWin();
            setTimeout(function(){game.frames = setInterval(game.finalFrames, 40)},1000);
            return 0;
	    }
    }
    ,pause : false
    ,keyPress : function (evt) {
        
        if( !game.pause ){
    		if(evt.keyCode == 37) { // Left arrow.
                canvas.nave.moveLeft = true;
         	}else if(evt.keyCode == 39){  // Right arrow.
                canvas.nave.moveRight = true;
            }else if(evt.keyCode == 40){ // Down arrow
                canvas.nave.moveDown = true;
            }else if(evt.keyCode == 38){ // Up arrow
                canvas.nave.moveUp = true;
            }		
    	}
    
    	//Pausa
    	if(evt.keyCode == 32 && !game.pause && !game.gameOver ){
    		game.pause = true;
    		clearInterval( game.frames );
    	}else if(evt.keyCode == 32 && game.pause && !game.gameOver ){
    		game.pause = false;
    		game.frames = setInterval(game.moveAsteroids, 40);
    	}
    }
    ,keyUp : function (evt) {
        
        if( !game.pause ){
    		if(evt.keyCode == 37) { // Left arrow.
                canvas.nave.moveLeft = false;
         	}else if(evt.keyCode == 39){  // Right arrow.
                canvas.nave.moveRight = false;
            }else if(evt.keyCode == 40){ // Down arrow
                canvas.nave.moveDown = false;
            }else if(evt.keyCode == 38){ // Up arrow
                canvas.nave.moveUp = false;
            }		
    	}
    }
    ,messageLost : function(){
        var node = document.createElement("div");
        node.setAttribute('id','gameover');
        node.innerHTML = '<span id="">¡Perdiste!</span><br><br> <button onclick="location.reload();"> Jugar otra vez </button>';
        var body = document.getElementById('body');
        body.appendChild(node);
    }
    ,messageWin : function(){
        var node = document.createElement("div");
        node.setAttribute('id','gameover');
        node.innerHTML = '<span id="">¡Ganaste!</span><br><br> <button onclick="location.reload();"> Jugar otra vez </button>';
        var body = document.getElementById('body');
        body.appendChild(node);
       
    }
    ,finalFrames: function(){
	    canvas.ctx.clearRect( 0, 0, game.width, game.height );
        canvas.stars.animation();
	    canvas.ctx.drawImage( canvas.earth.image,    canvas.earth.x ,             canvas.earth.y );
	    canvas.ctx.drawImage( canvas.nave.image,     canvas.nave.x,               canvas.nave.y );
	    canvas.ctx.drawImage( canvas.asteroid.image, canvas.asteroidColisioned.x, canvas.asteroidColisioned.y);
	    canvas.ctx.drawImage( canvas.colision.image, canvas.colision.x ,          canvas.colision.y,        canvas.colision.width, canvas.colision.height );
    }
}

var canvas = {
    canvas: document.getElementById("myCanvas")
    ,ctx   : undefined
    ,nave: {
        x  : 0
        ,y : 0
        ,height : 34
        ,width  : 97
        ,image  : new Image()
        ,moveUp     : false
        ,moveDown   : false
        ,moveLeft   : false
        ,moveRight  : false
    }
    ,asteroid : {
        width : 65
        ,height : 27
        ,image : new Image()
    }
    ,colision : {
        x : -200
        ,y: -200
        ,image: new Image()
        ,width : 60
        ,height : 60
    }
    ,earth : {
        image: new Image()
        ,x: 0
        ,y: 0
        ,width : 272
        ,height: 272
        ,radio : 136
    }
    ,asteroidColisioned : {//El asteroide con el que choco la nave
        x: -500
        ,y: -500
    }
    ,init: function(){

        canvas.nave.image.src = "nave.png";
        canvas.earth.image.src = "tierra.png";
        canvas.colision.image.src = "colision.png";
        canvas.asteroid.image.src = "flama.png";
        canvas.earth.x = game.width - (canvas.earth.width / 2);
        canvas.earth.y = game.height - (canvas.earth.height / 2);
        
        canvas.canvas.setAttribute("width",  game.width);
        canvas.canvas.setAttribute("height", game.height);	    			
        canvas.ctx = canvas.canvas.getContext("2d");
    }
    ,stars : {
        xs : []
        ,ys: []
        ,patron : 0
        ,frames : undefined
        ,init : function(){
            for(i = 0; i <= 250; i++){
                 // Obtinee numero aleatorios
            	canvas.stars.xs.push(Math.floor(Math.random() * (game.width-1)));
                canvas.stars.ys.push(Math.floor(Math.random() * (game.height-1)));
            }
            canvas.init();
            canvas.stars.frames = setInterval(canvas.stars.spaceStars, 40)
            //canvas.stars.animation();
        }
        ,spaceStars: function(){
            canvas.ctx.clearRect( 0, 0, game.width, game.height );
            canvas.stars.animation();
        }
        ,animation: function(){
            var a, b;
            if(canvas.stars.patron <= 10){
                a = 0, b = 2;
            }else if ( canvas.stars.patron <= 20 ){
                a = 1, b = 1;
            }else if ( canvas.stars.patron <= 30 ){
                a = 2, b = 0;
                if (30 == canvas.stars.patron) {
                     canvas.stars.patron = 0 
                }
            }
            canvas.stars.patron ++;

            for (var c = 0; c <= 247; c++){
                if( c < 130 ) {
                    canvas.ctx.beginPath();
                    canvas.ctx.fillStyle = "rgb(255,255,255)";
                    canvas.ctx.arc(canvas.stars.xs[c], canvas.stars.ys[c], .1, 0, 2 * Math.PI, !0);
                    canvas.ctx.closePath();
                    canvas.ctx.fill();
                    canvas.ctx.beginPath();
                    canvas.ctx.fillStyle = "rgba(255,255,255, 0.4)";
                    canvas.ctx.arc(canvas.stars.xs[c], canvas.stars.ys[c], 2, 0, 2 * Math.PI, !0);
                    canvas.ctx.closePath();
                    canvas.ctx.fill();
                    canvas.ctx.fillStyle = "rgba(255,255,255,0.2)";
                    canvas.ctx.beginPath();
                    canvas.ctx.arc(canvas.stars.xs[c], canvas.stars.ys[c], 3.5, 0, 2 * Math.PI, !0);
                    canvas.ctx.closePath();
                    canvas.ctx.fill();
                }
                else if ( c <= 180 ) {
                    if ( c < 150 ){
                        canvas.ctx.beginPath()
                        canvas.ctx.fillStyle = "rgb(255,255,255)"
                        canvas.ctx.arc(canvas.stars.xs[c], canvas.stars.ys[c], 1.8, 0, 2 * Math.PI, !0)
                        canvas.ctx.closePath()
                        canvas.ctx.fill()
                        canvas.ctx.beginPath()
                        canvas.ctx.fillStyle = "rgba(255,255,255, 0.4)"
                        canvas.ctx.arc(canvas.stars.xs[c], canvas.stars.ys[c], a + 3.5, 0, 2 * Math.PI, !0)
                        canvas.ctx.closePath()
                        canvas.ctx.fill()
                        canvas.ctx.fillStyle = "rgba(255,255,255,0.2)"
                        canvas.ctx.beginPath()
                        canvas.ctx.arc(canvas.stars.xs[c], canvas.stars.ys[c], a + 4, 0, 2 * Math.PI, !0)
                        canvas.ctx.closePath()
                        canvas.ctx.fill()
                    }else {
                        canvas.ctx.beginPath()
                        canvas.ctx.fillStyle = "rgb(255,255,255)"
                        canvas.ctx.arc(canvas.stars.xs[c], canvas.stars.ys[c], 1.8, 0, 2 * Math.PI, !0)
                        canvas.ctx.closePath()
                        canvas.ctx.fill()
                        canvas.ctx.beginPath()
                        canvas.ctx.fillStyle = "rgba(255,255,255, 0.4)"
                        canvas.ctx.arc(canvas.stars.xs[c], canvas.stars.ys[c], b + 2.8, 0, 2 * Math.PI, !0)
                        canvas.ctx.closePath()
                        canvas.ctx.fill()
                        canvas.ctx.fillStyle = "rgba(255,255,255,0.2)"
                        canvas.ctx.beginPath()
                        canvas.ctx.arc(canvas.stars.xs[c], canvas.stars.ys[c], b + 4, 0, 2 * Math.PI, !0)
                        canvas.ctx.closePath()
                        canvas.ctx.fill()
                    }
                }else if ( c <= 240 ) {
                    if ( c < 200 ) {
                        canvas.ctx.beginPath()
                        canvas.ctx.fillStyle = "rgb(255,255,255)"
                        canvas.ctx.arc(canvas.stars.xs[c], canvas.stars.ys[c], .6 * a + .8, 0, 2 * Math.PI, !0)
                        canvas.ctx.closePath()
                        canvas.ctx.fill()
                    } else {
                        canvas.ctx.beginPath()
                        canvas.ctx.fillStyle = "rgb(255,255,255)"
                        canvas.ctx.arc(canvas.stars.xs[c], canvas.stars.ys[c], .8, 0, 2 * Math.PI, !0)
                        canvas.ctx.closePath()
                        canvas.ctx.fill()
                    }
                }
            }
        }
    }
}


