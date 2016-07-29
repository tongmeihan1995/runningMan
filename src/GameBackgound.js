/**
 * Created by tmh on 16/7/28.
 */
var GameBackground = cc.Layer.extend({
    _bg:null,
    speed:5,
    ctor:function () {
        this._super();
        this.scheduleUpdate();
        var bbbb = function(texture){
            var winSize = cc.director.getWinSize();
            var layer=new cc.Layer;
            var bg1 = new cc.Sprite(texture);
            bg1.x=cc.director.getWinSize().width /2;
            bg1.y=cc.director.getWinSize().height /2;
            bg1.setScaleX ( winSize.width / bg1.width );
            bg1.setScaleY(winSize.height/bg1.height);
            layer.addChild(bg1);
            var bg2 = new cc.Sprite(texture);
            bg2.x=(cc.director.getWinSize().width/2)*3;
            bg2.y=cc.director.getWinSize().height /2;
            bg2.setScaleX (winSize.width / bg2.width );
            bg2.setScaleY(winSize.height/bg2.height);
            layer.addChild(bg2);
            return layer;
        };
        this._bg = bbbb("#bg2.jpg");
        this.addChild(this._bg);


        /*this._bg.x=winSize.width/2;
        this._bg.y=winSize.height/2;
        this._bg.setScaleX(winSize.width/this._bg.width);
        this._bg.setScaleY(winSize.height/this._bg.height);*/
    },
    //这里是让背景无限滚动起来时，每帧需要执行的函数
    update:function(dt){
        var winSize = cc.director.getWinSize();
        this._bg.x-=Math.ceil(this.speed*0.2);
        if(this._bg.x < -parseInt(winSize.width)){
            this._bg.x=0;
        }
    }


});