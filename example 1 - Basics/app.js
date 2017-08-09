var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);;
var containerEnfant = new PIXI.Container();


// create a texture from an image path
var texture = PIXI.Texture.fromImage('images/terrain.png');

// Scale mode for pixelation
texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
getJoueur();
createBunny(
			Math.floor(Math.random() * app.renderer.width), 
			Math.floor(Math.random() * app.renderer.height)
);

function createBunny(x, y,data) {
	console.log(window.innerWidth);
    var bunny = new PIXI.Sprite(texture);
    bunny.interactive = true;
    bunny.buttonMode = true;

    // center the bunny's anchor point
    bunny.anchor.set(0.5);

    // make it a bit bigger, so it's easier to grab
    bunny.scale.set(1.3);

    // setup events for mouse + touch using
    // the pointer events
    //bunny
       // .on('pointerdown', onDragStart)
        //.on('pointerup', onDragEnd)
       // .on('pointerupoutside', onDragEnd)
        //.on('pointermove', onDragMove);

        // For mouse-only events
        // .on('mousedown', onDragStart)
        // .on('mouseup', onDragEnd)
        // .on('mouseupoutside', onDragEnd)
        // .on('mousemove', onDragMove);

        // For touch-only events
        // .on('touchstart', onDragStart)
        // .on('touchend', onDragEnd)
        // .on('touchendoutside', onDragEnd)
        // .on('touchmove', onDragMove);

    // move the sprite to its designated position
    bunny.x = app.renderer.width/2;
    bunny.y = app.renderer.height/2;

    // add it to the stage
    app.stage.addChild(bunny);
}
function getJoueur(){
	$.ajax({
		type: "GET",
		url: "http://localhost:3000/api/Players",
		cache: false,
		success: function(data){
		data.forEach(createParJoueur);
	
		app.stage.addChild(containerEnfant);
  }
});
}
function createParJoueur(item,index){
	var jsonJoueur = JSON.stringify(item);
	var objJoueur = JSON.parse(jsonJoueur);
	let textJoueur = new  PIXI.Text(objJoueur.Nom + " " + objJoueur.Prenom);
	textJoueur.interactive = true;
    textJoueur.buttonMode = true;
	textJoueur
		.on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);
	textJoueur.x = 30;
	textJoueur.name = "Text";
	let tt = document.getElementsByClassName("TEXT");
	console.log(tt);
	let distanceEntre = index * 25;
	textJoueur.y=100+distanceEntre;
	containerEnfant.addChild(textJoueur);
	console.log(objJoueur.ID);
	console.log(jsonJoueur);
}
function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}