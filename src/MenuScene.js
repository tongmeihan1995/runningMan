/**
 * Created by tmh on 16/7/28.
 */
var MenuScene = cc.Scene.extend({
    _hero:null,
    _playBtn:null,
    _aboutBtn:null,
    _scoreText:null,
    ctor:function() {
        this._super();
        var layer = new cc.Layer();
        this.addChild(layer);
        var winSize = cc.director.getWinSize();
        var bgWelcome = new cc.Sprite('#bg1.jpg');
        bgWelcome.x = winSize.width / 2;
        bgWelcome.y = winSize.height / 2;
        bgWelcome.setScaleX(winSize.width/bgWelcome.width);
        bgWelcome.setScaleY(winSize.height/bgWelcome.height);
        layer.addChild(bgWelcome);

        // var snow = new cc.ParticleSnow();
        // snow.texture = cc.textureCache.addImage("res/snow.jpg");
        // layer.addChild(snow);
        var goldEmitter_0 = new cc.ParticleSystem("res/gold_0.plist");
        goldEmitter_0.texture = cc.textureCache.addImage("res/snow.jpg");
        goldEmitter_0.attr({
            x: winSize.width / 2,
            y: winSize.height/2,
            anchorX: 0.5,
            anchorY: 0
        });
        goldEmitter_0.setAutoRemoveOnFinish(true);
        goldEmitter_0.setPositionType(cc.ParticleSystem.TYPE_GROUPED);
        layer.addChild(goldEmitter_0);


        var title = new cc.Sprite('#welcome.jpg');
        title.x = 800;
        title.y = 555;
        layer.addChild(title);

        this._hero = new cc.Sprite('#girl.jpg');
        var change = 0.2;
        this._hero.setScaleX(change);
        this._hero.setScaleY(change);
        this._hero.x = -this._hero.width / 2*change;
        this._hero.y = 400;

        layer.addChild(this._hero);
        var move = cc.moveTo(2,cc.p(this._hero.width/20+200,this._hero.y)).easing(cc.easeOut(2));
        this._hero.runAction(move);

        this._playBtn = new cc.MenuItemImage('#play.jpg', '#play.jpg', this._play);
        this._playBtn.x = 700;
        this._playBtn.y = 350;
        this._playBtn.setScaleX(0.3);
        this._playBtn.setScaleY(0.3);

        this._aboutBtn = new cc.MenuItemImage('#play.jpg', '#play.jpg', this._about);
        this._aboutBtn.x = 500;
        this._aboutBtn.y = 250;
        this._aboutBtn.setScaleX(0.3);
        this._aboutBtn.setScaleY(0.3);

        var soundButton = new SoundButton();
        var change = 0.5;
        soundButton.setScaleX(change);
        soundButton.setScaleY(change);
        soundButton.x = soundButton.width/2*change;
        soundButton.y = winSize.height - soundButton.height/2*change;

        Sound.playMenuBgMusic();

        var menu = new cc.Menu(this._playBtn, this._aboutBtn, soundButton);
        layer.addChild(menu);
        menu.x = menu.y = 0;
        this.scheduleUpdate();



    },
    _play:function(){
        Sound.playMEat();
        cc.director.runScene(new GameScene());
    },
    _about:function(){
        Sound.playEatMoney();
        cc.director.runScene(new AboutScene());

    },
    update:function(){
        /*这里是让整体上下浮动的动画*/
        var currentDate = new Date();
        this._hero.y=400 +(Math.cos(currentDate.getTime()*0.002))*25;
        this._playBtn.y=350 +(Math.cos(currentDate.getTime()*0.002))*10;
        this._aboutBtn.y=250+(Math.cos(currentDate.getTime()*0.002))*10;
    }
});