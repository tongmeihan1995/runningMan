/**
 * Created by tmh on 16/7/29.
 */
var Girl = cc.Sprite.extend({
    _animation:null,
    _fast:0,
    state:0,
    ctor:function(){
        this._super("#girl.jpg");

        /*this._animation = new cc.Animation();
        for(var i=1;i<20;i++){
            this._animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("girl_00"+(i<10?('0'+i):i)+".jpg"));
        }
        this._animation.setDelayPerUnit(1/20);
        var action = cc.animate(this._animation).repeatForever();
        this.runAction(action);*/
        return true;
    },
    toggleSpeed:function(fast){
        if(fast==this._fast){
            return;
        }
        this._fast=fast;
        this.stopAllActions();
        if(!fast){
            //this._animation.setDelayPerUnit(20);
            cc.log("lower");
        }
        else{
            //this._animation.setDelayPerUnit(60);
            cc.log("fast");
        }
        var action = cc.animate(this._animation).repeatForever();
        this.runAction(action);
    }

});