(function() {
    function init () {
        var director, scene, layer, i, gameIsRunning;

        director = cc.Director.sharedDirector;
        director.attachInView(document.getElementById('cocos2d'));
        director.displayFPS = false;
        director.isKeyboardEnabled = true;
        director.backgroundColor = 'rgb(90, 190, 40)';

        

        scene = new cc.Scene();
        layer = new FARM.Arena();

        scene.addChild(layer);

        gameIsRunning = false;
        FARM.Game.addMessage('Click to make a cow!');

        document.onclick = function(e) {
            //FARM.Game.removeMessage();               
        };

        director.runWithScene(scene); 

        // window looses focus - pause
        window.onblur = function(e) {
            // Game should pause, but functionality is missing in Cocos2D.js
        }        
    }

    
    window.onload = init;
})();