//Name: Yazmyn Sims
class Smiley extends Phaser.Scene {
    constructor() {
        super("smileyScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        this.PKey = null;
        // Create variables to hold constant values for sprite locations
        this.bodyX = 400;
        this.bodyY = 350;

        // Define the locations of the smile and hands relative to the
        // main body location. This way, if we change the main body
        // location, the other values update too.
        this.smileX = this.bodyX;
        this.smileY = this.bodyY + 20;

        this.leftHandX = this.bodyX - 125;
        this.lefthandY = this.bodyY + 20;

        this.rightHandX = this.bodyX + 125;
        this.rightHandY = this.bodyY + 20;
        
        this.counter = 0;
        this.smileType = 'Smile';
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Shape Characters"
        // https://kenney.nl/assets/shape-characters
        this.load.setPath("./assets/");
        // body
        this.load.image("yellowBody", "yellow_body_squircle.png");
        // smiles
        this.load.image("smile", "face_a.png");
        this.load.image("smileDimple", "face_c.png");
        // hands
        this.load.image("handOpen", "hand_yellow_open.png");
        this.load.image("handPeace", "hand_yellow_peace.png");

        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Smiley.js</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability
        this.PKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        //Dimple Event Handling #2
        this.input.keyboard.on('keydown-D', (event)=>{
            my.sprite.smile.visible = false;
            my.sprite.dimple.visible = true;
        
        });
        //Smile Event Handling #1
        let SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        SKey.on('down', (key, event) =>{
            my.sprite.smile.visible = true;
            my.sprite.dimple.visible = false;
        });
        // Create the main body sprite
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "yellowBody");

        // Create the two sprites, one for each type of smile
        my.sprite.smile = this.add.sprite(this.smileX, this.smileY, "smile");
        my.sprite.dimple = this.add.sprite(this.smileX, this.smileY, "smileDimple");
        
        // Create the sprite for the left and right hands
        my.sprite.leftOpenHand = this.add.sprite(this.leftHandX, this.lefthandY, "handOpen");
        my.sprite.leftOpenHand.flipX = true;   // flip sprite to have thumb on correct side
        my.sprite.rightOpenHand = this.add.sprite(this.rightHandX, this.rightHandY, "handOpen");
        my.sprite.rightPeaceHand = this.add.sprite(this.rightHandX, this.rightHandY, "handPeace")
        // Since sprites are visible when created and we only want one smile to be shown
        // at a time, make the "dimple" smile not visible to start.
        my.sprite.dimple.visible = false;
        my.sprite.rightPeaceHand.visible = false;
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
        //Polling Key Input
        if (this.PKey.isDown){
            my.sprite.rightPeaceHand.visible = true;  
            my.sprite.rightOpenHand.visible = false;
        }
        else{
            my.sprite.rightPeaceHand.visible = false;
            my.sprite.rightOpenHand.visible = true;
        }
        // Since update is called multiple times/second, this.counter acts like
        // a timer, increasing once per clock tick
       /* this.counter++;

        if (this.counter % 120 == 0) {  // Do this once every 120 calls to update()
            switch (this.smileType) {
                case "Smile":
                    // Currently a regular smile, so change to dimple smile
                    this.smileType = "Dimple";
                    my.sprite.smile.visible = false;
                    my.sprite.dimple.visible = true;
                    my.sprite.rightPeaceHand.visible = true;
                    my.sprite.rightOpenHand.visible = false;

                    break;
                case "Dimple":
                    // Currently a dimple smile, so change to regular smile
                    this.smileType = "Smile";
                    my.sprite.dimple.visible = false;
                    my.sprite.smile.visible = true;
                    my.sprite.rightPeaceHand.visible = false;
                    my.sprite.rightOpenHand.visible = true;

                    break;
                default:
                    console.log("Error: unknown smile");
            }
        }*/
    }

}