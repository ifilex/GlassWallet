var FARM = FARM || {};

/* @class Arena */
FARM.Arena = function Arena() {
    Arena.superclass.constructor.call(this);

    if (cc.Director.sharedDirector.isTouchScreen) {        
        //this.isTouchEnabled = true;
    } else {
        this.isMouseEnabled = true;    
    }

    this.size = cc.Director.sharedDirector.winSize;
    this.nextGenderIsMale = true;
   
    this.scheduleUpdate();
    this.schedule({method: this.addItem, interval: 5 });

}

FARM.Arena.inherit(cc.Layer, {
    update : function(dt) {
        this.checkCreatureCollisions();
        this.checkEatenItems();
        //this.handleFights();
    },

    checkCreatureCollisions: function() {
        var area        = this.boundingBox.size, 
            creatures   = FARM.Game.creatures, 
            i, j;

        for(i=0; i<creatures.length; i++) {
            // avoid creatures
            for(j=0; j<creatures.length; j++) {
                if(creatures[i] === creatures[j]) 
                    continue;

                if (cc.rectOverlapsRect(creatures[i].boundingBox, creatures[j].boundingBox) &&
                    (Math.abs(creatures[i].angle - FARM.Game.helpers.angle(creatures[i], creatures[j])) < Math.PI/2 ||
                        Math.abs(creatures[i].angle - FARM.Game.helpers.angle(creatures[i], creatures[j])) > 3*Math.PI/2)) {

                    creatures[i].stay();
                    creatures[i].changeDirection();
                    break;
                } else {
                    creatures[i].stopped = false;
                }
            }

            // avoid edges
            if (creatures[i].velocity.y > 0 && cc.rectGetMaxY(creatures[i].boundingBox) > area.height ||
                creatures[i].velocity.y < 0 && cc.rectGetMinY(creatures[i].boundingBox) < 0 ||
                creatures[i].velocity.x < 0 && cc.rectGetMinX(creatures[i].boundingBox) < 0 ||
                creatures[i].velocity.x > 0 && cc.rectGetMaxX(creatures[i].boundingBox) > area.width) {
                   creatures[i].changeDirection();
            }                
        }
    },

    checkEatenItems : function() {
        var i, j, items, creatures;

        items = FARM.Game.items;
        creatures = FARM.Game.creatures;

        for(i=items.length-1; i >= 0; i--) {
            for(j=creatures.length-1; j >= 0; j--) {
                if(cc.rectOverlapsRect(items[i].boundingBox, creatures[j].boundingBox)) {
                    switch(items[i].type) {
                        case 'SPEED':   creatures[j].rush();
                                        break;
                        case 'DEATH':   this.removeChild(creatures[j]);
                                        creatures.splice(j, 1);
                                        break;
                    }


                    // remove eaten item
                    this.removeChild(items[i]);
                    items.splice(i, 1);
                    break;
                }
            }
        }
    },

    handleFights : function() {
        var fighters, i, j, female;
        fighters = FARM.Game.fighters;

        FARM.Game.helpers.shuffle(fighters);

        for(i=0; i<fighters.length; i++) {
            if(fighters[i].dead) 
                break;

            for(j=i+1; j<fighters.length; j++) {
                if(fighters[j].dead) 
                    break;

                if(cc.rectOverlapsRect(fighters[i].boundingBox, fighters[j].boundingBox)) {
                    if(fighters[i].gender === fighters[j].gender) {
                        fighters[i].attack();
                        fighters[j].die();   
                    }                    
                }
            }
        }

        // remove dead creatures
        for(i = FARM.creatures.length-1; i >= 0; i--) {
            if(FARM.creatures[i].dead) {
                this.removeChild(FARM.creatures[i]);
                FARM.creatures.splice(i, 1);
            } else {
                FARM.creatures[i].aggressive = false;
            }
        }

        FARM.fighters = [];
    },

    mouseUp : function(e) {
        var location;
       
        location = cc.Director.sharedDirector.convertEventToCanvas(e);
        this.addCreature(location);
    },

    collisionOnAdd : function(newCreature) {
        var i, creatures;
        creatures = FARM.Game.creatures;

        for(i=0; i<creatures.length; i++) {
            if(cc.rectOverlapsRect(creatures[i].boundingBox, newCreature.boundingBox)) {
                return true;
            }
        }

        return false;
    },

    addCreature : function(location) {
        var cow, sex;

        sex = (this.nextGenderIsMale=!this.nextGenderIsMale) ? FARM.Game.genders.FEMALE : FARM.Game.genders.MALE;

        cow = new FARM.Cow({position:location, gender:sex});

        if (this.collisionOnAdd(cow)) {
            delete cow;
            FARM.Game.addMessage('Oops, you cannot create a creature on top of another!');
        } else {
            FARM.Game.creatures.push(cow);
            this.addChild(cow);
        }
    },

    addItem : function() {
        var item, rndX, rndY;

        if(FARM.Game.items.length >= 3) return;

        rndX = Math.floor(Math.random() * this.size.width);
        rndY = Math.floor(Math.random() * this.size.height);

        item = new FARM.Item(new cc.Point(rndX, rndY), FARM.Game.helpers.pickRandom(FARM.Game.effects));

        FARM.Game.items.push(item);
        this.addChild(item);
    }
});