var FARM = FARM || {};

/* @class Item */
FARM.Item = function Item(pos, type) {
    Item.superclass.constructor.call(this);

    this.sprites = {
        speed : new cc.Rect(0, 600, 20, 20),
        death : new cc.Rect(0, 0, 20, 20),
        change : new cc.Rect(0, 100, 20, 20)
    }

    this.sprite = new cc.Sprite({ url: 'assets/graphics/sprite.png', rect: this.sprites[FARM.Game.effects[type]] || this.sprites.speed });
    this.sprite.position = cc.ccpAdd(this.sprite.position, new cc.Point(10, 10));
    
    this.position = cc.ccpAdd(pos, new cc.Point(-10, -10));
    this.contentSize = this.sprite.contentSize;
    this.type = type;
    
    this.addChild(this.sprite);
}

FARM.Item.inherit(cc.Node);