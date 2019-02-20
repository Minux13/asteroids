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

        for(i = 0; i <= 250; i++){
             // Obtinee numero aleatorios
        	game.stars.xs.push(Math.floor(Math.random() * (game.width-1)));
            game.stars.ys.push(Math.floor(Math.random() * (game.height-1)));
        }



        game.stars.animation();
        game.frames = setInterval(game.moveAsteroids, 40);
        window.addEventListener("keydown", game.keyPress, !0);
        window.addEventListener("keyup", game.keyUp, !0);


    }
    ,nave: {
        x  : 0
        ,y : 0
        ,height : 34
        ,width  : 97
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
    ,asteroidColisioned : {
        x: -500
        ,y: -500
    }
    ,moveAsteroids : function(){

	    //Borro todo lo que haya en el canvas
	    game.ctx.clearRect( 0, 0, game.width, game.height );

	    game.stars.animation();

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
            //Actualiza el primer asteroide visible del arreglo para empezar el for desde ahi
	    	if( game.coordenadasFlamas[game.firstVisibleAsteroid+1]==-100 ){
	    	    game.firstVisibleAsteroid+=2;				
	    	}

	    	//hace la operacion del desplazamiento pero solo lo imprime si no exede en los dos lados de x
	    	game.coordenadasFlamas[j+1] -= 20;
	    	if( game.coordenadasFlamas[j+1] >- 100 && game.coordenadasFlamas[j+1] < (game.width + 150)){
	    		game.ctx.drawImage(game.asteroid.image, game.coordenadasFlamas[j+1], game.coordenadasFlamas[j]);
	    	}

	    	//Choco con un asteroid
	    	if(game.coordenadasFlamas[j+1] > (game.nave.x + 32) && game.coordenadasFlamas[j+1] < (game.nave.x+game.nave.width)){
	    		if((game.coordenadasFlamas[j]+game.asteroid.height)>(game.nave.y+6) && game.coordenadasFlamas[j]<(game.nave.y+game.nave.height-6)){
                    
                    // (FY + FH/2 - NY + NH/2)/2   El punto medio del espacio que hay entre cada punto medio Y de los dos objetos flama-asteroide y nave
                    var mediaNaveAsteroidY = (game.coordenadasFlamas[j] + (game.colision.height/2) - (game.nave.y + (game.nave.height/2) ))/2;

	    			game.colision.x = game.coordenadasFlamas[j+1] - (game.colision.width/2);
	    			game.colision.y = game.nave.y + (game.nave.height/2) + mediaNaveAsteroidY - (game.colision.height/2);

                    game.asteroidColisioned.x = game.coordenadasFlamas[j+1];
                    game.asteroidColisioned.y = game.coordenadasFlamas[j];
	    			
	    			clearInterval( game.frames );

	    			game.ctx.drawImage( game.colision.image, game.colision.x , game.colision.y, game.colision.width, game.colision.height );
	    		
	    			game.messageLost();
                    //game.frames = setInterval(game.finalFrames, 40);
                    setTimeout(function(){game.frames = setInterval(game.finalFrames, 40)},1000);
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

	    game.ctx.drawImage( game.earth.image, game.earth.x , game.earth.y );

	    //if(naveX>=(tamanoPantallaX-anNave-50) && naveY>=(tamanoPantallaY-alNave-50) && norepetir==1){
        //Si llega a al planeta
        var naveX = (game.width - (game.nave.x+game.nave.width)) * (game.width - (game.nave.x+game.nave.width));
        var naveY = (game.height - (game.nave.y+game.nave.height-30)) * (game.height - (game.nave.y+game.nave.height));
        var radio =  Math.sqrt( naveX + naveY );
	    if( radio < game.earth.radio ){
	    	//alert("   ¡Ganaste!");
	        game.ctx.drawImage( game.nave.image, game.nave.x, game.nave.y );
	    	clearInterval( game.frames );
            game.messageWin();
            setTimeout(function(){game.frames = setInterval(game.finalFrames, 40)},1000);
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
        
        if( !game.pause ){
    		if(evt.keyCode == 37) { // Left arrow.
                game.nave.left = true;
         	}else if(evt.keyCode == 39){  // Right arrow.
                game.nave.right = true;
            }else if(evt.keyCode == 40){ // Down arrow
                game.nave.down = true;
            }else if(evt.keyCode == 38){ // Up arrow
                game.nave.up = true;
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
    ,keyUp : function (evt) {
        
        if( !game.pause ){
    		if(evt.keyCode == 37) { // Left arrow.
                game.nave.left = false;
         	}else if(evt.keyCode == 39){  // Right arrow.
                game.nave.right = false;
            }else if(evt.keyCode == 40){ // Down arrow
                game.nave.down = false;
            }else if(evt.keyCode == 38){ // Up arrow
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
	    game.ctx.clearRect( 0, 0, game.width, game.height );
        game.stars.animation();
	    game.ctx.drawImage( game.nave.image, game.nave.x, game.nave.y );
	    game.ctx.drawImage( game.asteroid.image, game.asteroidColisioned.x, game.asteroidColisioned.y);
	    game.ctx.drawImage( game.colision.image, game.colision.x , game.colision.y, game.colision.width, game.colision.height );
	    game.ctx.drawImage( game.earth.image, game.earth.x , game.earth.y );
    }
    ,stars : {
        xs : []
        ,ys: []
        ,patron : 0
        ,animation: function(){
            var a, b;
            if(game.stars.patron <= 10){
                a = 0, b = 2;
            }else if ( game.stars.patron <= 20 ){
                a = 1, b = 1;
            }else if ( game.stars.patron <= 30 ){
                a = 2, b = 0;
                if (30 == game.stars.patron) {
                     game.stars.patron = 0 
                }
            }
            game.stars.patron ++;

            for (var c = 0; c <= 247; c++){
                if( c < 130 ) {
                    game.ctx.beginPath();
                    game.ctx.fillStyle = "rgb(255,255,255)";
                    game.ctx.arc(game.stars.xs[c], game.stars.ys[c], .1, 0, 2 * Math.PI, !0);
                    game.ctx.closePath();
                    game.ctx.fill();
                    game.ctx.beginPath();
                    game.ctx.fillStyle = "rgba(255,255,255, 0.4)";
                    game.ctx.arc(game.stars.xs[c], game.stars.ys[c], 2, 0, 2 * Math.PI, !0);
                    game.ctx.closePath();
                    game.ctx.fill();
                    game.ctx.fillStyle = "rgba(255,255,255,0.2)";
                    game.ctx.beginPath();
                    game.ctx.arc(game.stars.xs[c], game.stars.ys[c], 3.5, 0, 2 * Math.PI, !0);
                    game.ctx.closePath();
                    game.ctx.fill();
                }
                else if ( c <= 180 ) {
                    if ( c < 150 ){
                        game.ctx.beginPath()
                        game.ctx.fillStyle = "rgb(255,255,255)"
                        game.ctx.arc(game.stars.xs[c], game.stars.ys[c], 1.8, 0, 2 * Math.PI, !0)
                        game.ctx.closePath()
                        game.ctx.fill()
                        game.ctx.beginPath()
                        game.ctx.fillStyle = "rgba(255,255,255, 0.4)"
                        game.ctx.arc(game.stars.xs[c], game.stars.ys[c], a + 3.5, 0, 2 * Math.PI, !0)
                        game.ctx.closePath()
                        game.ctx.fill()
                        game.ctx.fillStyle = "rgba(255,255,255,0.2)"
                        game.ctx.beginPath()
                        game.ctx.arc(game.stars.xs[c], game.stars.ys[c], a + 4, 0, 2 * Math.PI, !0)
                        game.ctx.closePath()
                        game.ctx.fill()
                    }else {
                        game.ctx.beginPath()
                        game.ctx.fillStyle = "rgb(255,255,255)"
                        game.ctx.arc(game.stars.xs[c], game.stars.ys[c], 1.8, 0, 2 * Math.PI, !0)
                        game.ctx.closePath()
                        game.ctx.fill()
                        game.ctx.beginPath()
                        game.ctx.fillStyle = "rgba(255,255,255, 0.4)"
                        game.ctx.arc(game.stars.xs[c], game.stars.ys[c], b + 2.8, 0, 2 * Math.PI, !0)
                        game.ctx.closePath()
                        game.ctx.fill()
                        game.ctx.fillStyle = "rgba(255,255,255,0.2)"
                        game.ctx.beginPath()
                        game.ctx.arc(game.stars.xs[c], game.stars.ys[c], b + 4, 0, 2 * Math.PI, !0)
                        game.ctx.closePath()
                        game.ctx.fill()
                    }
                }else if ( c <= 240 ) {
                    if ( c < 200 ) {
                        game.ctx.beginPath()
                        game.ctx.fillStyle = "rgb(255,255,255)"
                        game.ctx.arc(game.stars.xs[c], game.stars.ys[c], .6 * a + .8, 0, 2 * Math.PI, !0)
                        game.ctx.closePath()
                        game.ctx.fill()
                    } else {
                        game.ctx.beginPath()
                        game.ctx.fillStyle = "rgb(255,255,255)"
                        game.ctx.arc(game.stars.xs[c], game.stars.ys[c], .8, 0, 2 * Math.PI, !0)
                        game.ctx.closePath()
                        game.ctx.fill()
                    }
                }
            }
        }
    }
}

var contador=0;

game.init()

