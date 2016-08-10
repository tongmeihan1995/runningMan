/**
 * Created by tmh on 16/8/5.
 */
var ObstacleManager = cc.Class.extend({
    _container :null,
    _gameScene:null,
    _obstaclesToAnimate:null,
    _obstacleGapCount:0,
    ctor:function(gameScene){
        this._container = gameScene.itemBatchLayer;
        this._gameScene = gameScene;
        this._obstaclesToAnimate = new Array();
        cc.spriteFrameCache.addSpriteFrames(res.Obstacle_plist,res.Obstacle_png);
    },
    init:function(){
        this.removeAll();
        Game.user.hitObstacle = 0;
    },

    removeAll:function(){
        if(this._obstaclesToAnimate.length>0){
            for(var i=this._obstaclesToAnimate.length-1;i>=0;i--){
                var item = this._obstaclesToAnimate[i];
                this._obstaclesToAnimate.splice(i,1);
                cc.pool.putInPool(item);
                this._container.removeChild(item);
            }
        }
    },

    update:function(hero,elapsed){
        if(this._obstacleGapCount < GameConstants.OBSTACLE_GAP){
            this._obstacleGapCount += Game.user.heroSpeed*elapsed;
        }
        else if(this._obstacleGapCount!=0){
            this._obstacleGapCount = 0;
            this._createObstacle(Math.ceil(Math.random()*3),Math.random()*1000+1000);
        }
        this._animateObstacles(hero,elapsed);
    },

    _animateObstacles:function(hero,elapsed){
        var obstacle;
        for(var i = this._obstaclesToAnimate.length-1;i>=0;i--){
            obstacle = this._obstaclesToAnimate[i];
            if(obstacle.distance>0){
                obstacle.distance -= Game.user.heroSpeed*elapsed;
            }
            else{
                obstacle.hideLookOut();
                obstacle.x -= (Game.user.heroSpeed+obstacle.speed)*elapsed;
                this._hitTest(hero,obstacle);
            }
            if(obstacle.x<-obstacle.width||Game.gameState==GameConstants.GAME_STATE_OVER){
                this._obstaclesToAnimate.splice(i,1);
                cc.pool.putInPool(obstacle);
                this._container.removeChild(obstacle);
            }
        }
    },

    _hitTest:function(hero,obstacle){
        var heroObstacle_xDist = obstacle.x - hero.x;
        var heroObstacle_yDist = obstacle.y - hero.y;
        var heroObstacle_sqDist = heroObstacle_xDist*heroObstacle_xDist+heroObstacle_yDist*heroObstacle_yDist;
        if(heroObstacle_sqDist<12000&&!obstacle.alreadyHit){
            obstacle.alreadyHit=true;
            obstacle.crash();
            Sound.playHit();
            if(Game.user.Money>0){
                if(obstacle.position=="bottom")
                    obstacle.setRotation(100);
                else
                    obstacle.setRotation(-100);
                Game.user.heroSpeed *= 0.8;
            }
            else{
                if(obstacle.position=="bottom")
                    obstacle.setRotation(70);
                else
                    obstacle.setRotation(-70);
                Game.user.heroSpeed *= 0.5;
                Game.user.hitObstacle = 30;
                Sound.playHurt();
                if(Game.user.lives>0){
                    Game.user.lives--;
                }
                else{
                    Game.user.lives=0;
                    this._gameScene.endGame();
                }
            }
        }
    },

    _createObstacle:function(type,distance){
        var winSize = cc.director.getWinSize();
        var x = winSize.width;
        var y = 0;
        var position = null;
        if (type<=2){
            if(Math.random()>0.5){
                y = winSize.height - GameConstants.GAME_AREA_TOP_BOTTOM;
                position = "top";
            }
            else{
                y = GameConstants.GAME_AREA_TOP_BOTTOM;
                position = "bottom";
            }
        }
        else{
            y = Math.floor(Math.random()*(winSize.height-2*GameConstants.GAME_AREA_TOP_BOTTOM))+GameConstants.GAME_AREA_TOP_BOTTOM;
            position = "middle";
        }
        var obstacle = Obstacle.create(type,true,position,GameConstants.OBSTACLE_SPEED,distance);
        obstacle.x = x+obstacle.width/2;
        obstacle.y = y;
        this._obstaclesToAnimate.push(obstacle);
        this._container.addChild(obstacle);
    }
});