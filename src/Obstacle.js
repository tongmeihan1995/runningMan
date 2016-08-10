/**
 * Created by tmh on 16/8/5.
 */
var Obstacle = cc.Sprite.extend({
    showLookOut:false,
    position:"",
    speed:0,
    distance:0,
    type:0,
    alreadyHit:false,
   ctor:function(type,showLookOut,position,speed,distance){
       this._super();
       this.reuse(type,showLookOut,position,speed,distance);
       return true;
   },
   reuse:function(type,showLookOut,position,speed,distance){
       cc.log("obstacle reuse");
       this.setSpriteFrame("obstacle"+type+".jpg");
       this.setScale(GameConstants.OBSTACLE_SCALE);
       this.showLookOut = showLookOut;
       this.showLookOut = showLookOut;
       this.position = position;
       this.speed = speed;
       this.distance = distance;
       this.type = type;
       this.alreadyHit = false;
       if(showLookOut){
           if(!this._lookOutSprite){
               this._lookOutSprite = new cc.Sprite("#lookOut.png");
               this.addChild(this._lookOutSprite);
           }
           else{
               this._lookOutSprite.setVisible(true);
           }
           this._lookOutSprite.x = -0.65*this._lookOutSprite.width;
           this._lookOutSprite.y = this._lookOutSprite.height/2;
       }
   },
    unuse:function(){
        this.stopAllActions();
        this.setRotation(0);
        this.hideLookOut();
    },
    hideLookOut:function(){
        if(this._lookOutSprite){
            this._lookOutSprite.setVisible(false);
        }
    },
    crash:function(){
        this.stopAllActions();
        this.setSpriteFrame("obstacle"+this.type+"_crash.jpg");
    }

});

Obstacle.create = function(type,showLookOut,position,speed,distance){
    if(cc.pool.hasObject(Obstacle)){
        return cc.pool.getFromPool(Obstacle,type,showLookOut,position,speed,distance)
    }
    else{
        return new Obstacle(type,showLookOut,position,speed,distance);
    }

};