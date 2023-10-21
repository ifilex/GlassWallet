var FARM = FARM || {};

(function() {
    FARM.Game = {
        creatures : [],
        fighters : [],
        items : [],

        // effects from items
        effects : {
            SPEED : 'speed',
            DEATH : 'death',
            CHANGE : 'change'
        },

        genders : {
            MALE : 'male',
            FEMALE : 'female'
        },

        colors : {
            BLACK : 'black',
            BROWN : 'brown',
            WHITE : 'white'
        },

        helpers : {
            ZERO : new cc.Point(0,0),
            reachedTime : function(start, duration) {
                return (start >= 0 && new Date().getTime() - start >= duration) ? true : false;
            },
            // Fisher-Yates algorithm
            shuffle : function(o) {
                for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                return o;
            },

            // Picks a random property from an object
            pickRandom : function(obj) {
                var result, count = 0;

                for (var prop in obj)
                    if (Math.random() < 1/++count)
                       result = prop;
                return result;
            },

            distance : function(obj1, obj2) {
                var xterm, yterm;
                xterm = Math.abs(Math.pow(obj1.position.x - obj2.position.x, 2));
                yterm = Math.abs(Math.pow(obj1.position.y - obj2.position.y, 2));

                return Math.sqrt(xterm + yterm);
            },

            getSign : function(number) {
                return number && number / Math.abs(number);
            },

            angle : function(obj1, obj2) {
                var xterm, yterm;
                xterm = obj2.position.x - obj1.position.x;
                yterm = obj2.position.y - obj1.position.y;

                var hej = Math.atan2(yterm, xterm);

                return Math.atan2(yterm, xterm);   
            }
        },

        addMessage: function(msg) {
            document.getElementById('instructions').innerHTML = msg;
        },

        removeMessage: function() {
            document.getElementById('instructions').innerHTML = '&nbsp;';
        },
    };

    // enums
    Object.freeze(FARM.Game.effects);
    Object.freeze(FARM.Game.genders);
    Object.freeze(FARM.Game.colors);
})();
