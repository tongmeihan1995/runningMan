/**
 * Created by tmh on 16/7/28.
 */
var GameOverUI = cc.Layer.extend({
    _gameScene: null,
    _distanceText:null,
    _scoreText:null,
    ctor: function (gameScene) {
        this._super();
        this._gameScene=gameScene;
        var winSize = cc.director.getWinSize();
        var bg = new cc.LayerColor(cc.color(0,0,0,200),winSize.width,winSize.height);
        this.addChild(bg);
        var title = new cc.LabelTTF("Girl Was Die!","Arial",'18');
        this.addChild(title);
        title.setColor(cc.color(243,231,95));
        title.x=winSize.width/2;
        title.y=winSize.height-120;

        this._distanceText = new cc.LabelTTF("Distance Travel:000000","Arial",'18');
        this.addChild(this._distanceText);
        //this._distanceText.setColor(cc.color(243,231,95));
        this._distanceText.x=winSize.width/2;
        this._distanceText.y=winSize.height-220;

        this._scoreText = new cc.LabelTTF("Score:000000","Arial",'18');
        this.addChild(this._scoreText);
        //this._scoreText.setColor(cc.color(243,231,95));
        this._scoreText.x=winSize.width/2;
        this._scoreText.y=winSize.height-270;

        var replayBtn = new cc.MenuItemImage("res/reply.jpg","res/reply.jpg",this._replay());
        var aboutBtn = new cc.MenuItemImage("res/about.jpg","res/about.jpg",this._about());
        var returnBtn = new cc.MenuItemImage("#welcome.jpg","#welcome.jpg",this._return());

    },
    init:function(){
        this._distanceText.setString("Distance Travel:"+parseInt(Game.user.distance));
        this._scoreText.setString("Score:"+parseInt(Game.user.score));
    },
    _replay:function(){
        this._gameScene.init();
    },
    _about:function(){
        cc.director.runScene(new AboutScene());
    },
    _return:function(){
        cc.director.runScene(new MenuScene());
    }
})
