/**
 * Created by tmh on 16/7/28.
 */
var GameScene = cc.Layer.extend({
    _girl:null,
    _ui:null,
    _background:null,
    itemBatchLayer:null,
    _touchY:0,
    //_touchX:0,

    ctor:function(){
        this._super();
        var layer = new cc.Layer();
        this.addChild(layer,0);

        this._background =new GameBackground();
        layer.addChild(this._background,0);

        this._girl = new Girl();
        this.addChild(this._girl,1);

        this.itemBatchLayer = new cc.SpriteBatchNode("res/texture.jpg");
        this.addChild(this.itemBatchLayer,2);

        this._ui = new GameSceneUI();
        this.addChild(this._ui);
        this._ui.update();

        this.init();

        return true;
    },

    init:function(){
        this.scheduleUpdate();
        Sound.playGameBgMusic();
        Game.user.lives = GameConstants.HERO_LIVES;
        Game.user.score = GameConstants.HERO_SCORE;
        Game.user.distance = GameConstants.HERO_DISTANCE;
        Game.gameState = GameConstants.GAME_STATE_IDLE;
        Game.user.heroSpeed = this._background.speed = 5;
        var winSize = cc.director.getWinSize();
        this._girl.x = -winSize.width/2;
        this._girl.y = winSize.height/2;
        this._girl.setScaleX(0.15);
        this._girl.setScaleY(0.15);
        this._touchY = this._girl.y;
        //this._touchX = winSize.width/4;

        if("touches" in cc.sys.capabilities){
            cc.eventManager.addListener({
                event:cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesMoved:this._onTouchMoved.bind(this)
            },this);
        }
    },

    _onTouchMoved:function (touches,event) {
        if(Game.gameState!=GameConstants.GAME_STATE_OVER) {
            this._touchY = touches[0].getLocation().y;
            //this._touchX = touches[0].getLocation().x;
        }
    },

    update:function(elapsed){
        this._girl.y -= (this._girl.y-this._touchY)*0.1;
        //this._girl.x -= (this._girl.x-this._touchX)*0.1;
        this._handleHeroPose();
        //cc.log(this._touchX);
        //cc.log(this._girl.x);
        var winSize = cc.director.getWinSize();
        switch(Game.gameState){
            case GameConstants.GAME_STATE_IDLE:
                if(this._girl.x<winSize.width/4){
                    this._girl.x+=((winSize.width/4+10)-this._girl.x)*0.05;
                    Game.user.heroSpeed+=(GameConstants.HERO_MIN_SPEED-Game.user.heroSpeed)*0.05;
                    this._background.speed = Game.user.heroSpeed * elapsed;
                }else{
                    Game.gameState = GameConstants.GAME_STATE_FLYING;
                    this._girl.state = GameConstants.HERO_STATE_FLYING;
                }
                this._ui.update();
                break;
        }
    },

    _handleHeroPose:function(){
        var winSize = cc.director.getWinSize();
        if(Math.abs((this._touchY-this._girl.y)*0.2<30)){
            this._girl.setRotation((this._girl.y-this._touchY)*0.2);
        }
        if(this._girl.y<this._girl.height*GameConstants.GIRL_SCALE/2){
            this._girl.y=this._girl.height*GameConstants.GIRL_SCALE/2;
            this._girl.setRotation(0);
        }
        if(this._girl.y>winSize.height-this._girl.height*GameConstants.GIRL_SCALE/2){
            this._girl.y=winSize.height-this._girl.height*GameConstants.GIRL_SCALE/2;
            this._girl.setRotation(0);
        }

    }

});