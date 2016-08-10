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
        var title = new cc.LabelTTF("Girl Was Die!","Arial",'36');
        this.addChild(title);
        title.setColor(cc.color(243,231,95));
        title.x=winSize.width/2;
        title.y=winSize.height-120;

        this._distanceText = new cc.LabelTTF("Distance Travel:000000","Arial",'36');
        this.addChild(this._distanceText);
        //this._distanceText.setColor(cc.color(243,231,95));
        this._distanceText.x=winSize.width/2;
        this._distanceText.y=winSize.height-200;

        this._scoreText = new cc.LabelTTF("Score:000000","Arial",'36');
        this.addChild(this._scoreText);
        //this._scoreText.setColor(cc.color(243,231,95));
        this._scoreText.x=winSize.width/2;
        this._scoreText.y=winSize.height-250;

        //var replayBtn = new cc.MenuItemImage("res/replay.jpg","res/replay.jpg",this._replay(),this);
        var replayBtn = new cc.MenuItemFont("播放", this._replay(),this);
        var aboutBtn = new cc.MenuItemImage("res/about.jpg","res/about.jpg",this._about(),this);
        var returnBtn = new cc.MenuItemImage("#welcome.jpg","#welcome.jpg",this._return(),this);

        var menuContain = new cc.Menu();
        menuContain.addChild(replayBtn);
        replayBtn.x = winSize.width/2;
        replayBtn.y = winSize.height/6*3;
        replayBtn.setScale(0.8);

        menuContain.addChild(aboutBtn);
        aboutBtn.x = winSize.width/2;
        aboutBtn.y = winSize.height/6*2;
        aboutBtn.setScaleY(0.4);
        aboutBtn.setScaleX(0.3);

        menuContain.addChild(returnBtn);
        returnBtn.x = winSize.width/2;
        returnBtn.y =winSize.height/6;
        returnBtn.setScaleY(0.5);
        returnBtn.setScaleX(1.1);

        this.addChild(menuContain);
        menuContain.x=0;
        menuContain.y=0;

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
});
