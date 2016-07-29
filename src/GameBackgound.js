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
            var layer=new cc.Layer;
            var bg1 = new cc.Sprite(texture);
            bg1.x=cc.director.getWinSize().width /2;
            bg1.y=bg1.height/2;
            bg1.setScaleX ( cc.director.getWinSize().width / bg1.width );

            layer.addChild(bg1);
            var bg2 = new cc.Sprite(texture);
            bg2.x=(cc.director.getWinSize().width/2)*3;
            bg2.y=bg2.height/2;
            bg2.setScaleX ( cc.director.getWinSize().width / bg2.width );
            layer.addChild(bg2);
            return layer;
        };
        this._bg = bbbb("#bg3.jpg");
        this.addChild(this._bg);
    },
    //这里是让背景动起来时，每帧需要执行的函数
    update:function(dt){
        var winSize = cc.director.getWinSize();
        this._bg.x-=Math.ceil(this.speed*0.2);
        if(this._bg.x < -parseInt(winSize.width)){
            this._bg.x=0;
        }
    }


});