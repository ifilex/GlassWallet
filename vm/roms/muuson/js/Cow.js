var FARM = FARM || {};

/* @class Cow */
FARM.Cow = function Cow(opts) {
    Cow.superclass.constructor.call(this);

    this.sprites = {
        normal  : new cc.Rect(0, 200, 40, 40),
        thin    : new cc.Rect(0, 200, 40, 40),
        weak    : new cc.Rect(0, 200, 40, 40),
        broken  : new cc.Rect(0, 200, 40, 40)
    };

    this.sprite = new cc.Sprite({ url: 'assets/graphics/sprite.png', rect: this.sprites[opts.type] || this.sprites['normal'] });
    this.sprite.position = cc.ccpAdd(this.sprite.position, new cc.Point(20, 20));
    this.stressedSprite = new cc.Label({string:"S", fontSize:20, fontName:"Verdana", fontColor:"blue"});
    this.loveSprite = new cc.Label({string:"L", fontSize:10, fontName:"Verdana", fontColor:"pink"});
    this.levelSprite = new cc.Label({string:"", fontSize:10, fontName:"Verdana", fontColor:"red"});
    this.levelSprite.position = new cc.Point(20, 20);
    this.position = cc.ccpAdd(opts.position, new cc.Point(-20, -20));
    this.baseVelocity = new cc.Point(50, 50);
    this.velocity = new cc.Point(50, 50);
    this.runMultiplyer = 4;
    this.contentSize = this.sprite.contentSize;
    this.dead = false;
    this.stressedTimer = -1;
    this.aggressive = false;
    this.level = 0;
    this.gender = opts.gender;
    this.affected = false;
    this.affectedTimer = -1;
    this.sprite.rect = (this.gender === FARM.Game.genders.MALE) ? this.sprites.normal : this.sprites.thin;
    this.stopped = false;
    this.stoppedTimer = -1;
    this.stoppedDuration = 0;
    this.dirX = 0;
    this.dirY = 0;
    this.angle = 0;
    this.collisionAngle = 0;

    this.changeDirection();
    //this.changeType();
    this.addChild(this.sprite);
    this.addChild(this.levelSprite);
    this.scheduleUpdate();
    this.schedule({method: this.changeDirection, interval: parseFloat((Math.random()*3+0.3).toFixed(1)) });
}

FARM.Cow.inherit(cc.Node, {
    update: function(dt) {
        this.move(dt);

        if(/*!this.aggressive && */FARM.Game.helpers.reachedTime(this.stressedTimer, 200)) {
            this.aggressive = true;
            FARM.Game.fighters.push(this);
            this.removeStress();
        }

        if(this.affected === FARM.Game.effects.SPEEDED && FARM.Game.helpers.reachedTime(this.affectedTimer, 7000)) {
            this.affected = false;
            this.walk();  
        }

        if(this.stopped && FARM.Game.helpers.reachedTime(this.stoppedTimer, this.stoppedDuration)) {
            this.stopped = false;
            this.stoppedTimer = -1;
            this.stoppedDuration = 0;
        }
    },

    changeType : function() {
        var result, count, type;
        
        count = 0;
        for (type in this.sprites) {
            if (Math.random() < 1/++count) {
                result = type;
            }
        }
        
        this.sprite.rect = this.sprites[result];
    },

    /*
     *  Change direction of creature. If no argument, a random angle will be generated.
     */
    changeDirection : function(dt, angle) {
        if(angle === undefined) angle = Math.random()*Math.PI*2;

        this.dirX = Math.cos(angle);
        this.dirY = Math.sin(angle);
        this.angle = angle;

        this.velocity = cc.ccpMult(this.baseVelocity, new cc.Point(this.dirX, this.dirY));
        this.sprite.runAction(new cc.RotateTo({ duration: 0/*.15*/, angle :-cc.radiansToDegrees(angle) + 90 }));
    },

    move : function(dt) {
        var pos;

        if(this.stopped) return;

        pos = cc.copy(this.position);
        pos.x += dt * this.velocity.x;
        pos.y += dt * this.velocity.y;

        if(this.stressedTimer > 0) {
            pos.x += FARM.Game.helpers.getSign(this.velocity.x);
            pos.y += FARM.Game.helpers.getSign(this.velocity.y);
        }

        this.position = pos;
    },

    die : function() {
        if(!this.dead) this.dead = true;
    },

    rush : function() {
        if(this.affected === false) {
            this.affected = FARM.Game.effects.SPEEDED;
            this.affectedTimer = new Date().getTime();
            this.run();
        }
    },

    run : function() {
        this.baseVelocity = cc.ccpMult(this.baseVelocity, new cc.Point(this.runMultiplyer, this.runMultiplyer));
        this.velocity = cc.ccpMult(this.velocity, new cc.Point(this.runMultiplyer, this.runMultiplyer));
    },

    walk : function() {
        this.baseVelocity = cc.ccpMult(this.baseVelocity, new cc.Point(1/this.runMultiplyer, 1/this.runMultiplyer));
        this.velocity = cc.ccpMult(this.velocity, new cc.Point(1/this.runMultiplyer, 1/this.runMultiplyer));
    },

    stay : function(angle) {
        if(!this.stopped) {
            this.stopped = true;
            this.collisionAngle = angle;
        }     
    },

    turnAround : function() {                 
        this.changeDirection(0, cc.degreesToRadians(-(this.sprite.rotation-90) + 180)); // turn 180
    },

    becomeStressed : function() {
        if(this.stressedTimer < 0) {
            this.stressedTimer = new Date().getTime();
            this.addChild(this.stressedSprite);
            this.turnAround();
            this.stay();
        }
    },

    removeStress : function() {
        this.stressedTimer = -1;
        this.removeChild(this.stressedSprite);
    },

    attack : function() {
        this.level++;
        this.levelSprite.string = this.level;
    }
});