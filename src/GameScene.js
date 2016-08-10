/**
 * Created by tmh on 16/7/28.
 */
var GameScene = cc.Layer.extend({
    _girl:null,
    _ui:null,
    _gameOverUI:null,
    _background:null,
    itemBatchLayer:null,
    _touchY:0,
    //_touchX:0,
    _foodManager:null,
    _obstacleManager:null,


    ctor:function(){
        this._super();
        var layer = new cc.Layer();
        this.addChild(layer,0);

        this._background =new GameBackground();
        layer.addChild(this._background,0);

        this._girl = new Girl();
        this.addChild(this._girl,1);

        //this.itemBatchLayer = new cc.SpriteBatchNode("res/texture.jpg");
        this.itemBatchLayer = new cc.Layer();
        this.addChild(this.itemBatchLayer,2);

        //var sprite = new cc.Sprite("#start1.jpg");
        //this.itemBatchLayer.addChild(sprite);

        this._ui = new GameSceneUI();
        this.addChild(this._ui);
        this._ui.update();

        this._foodManager = new FoodManager(this);
        this._obstacleManager = new ObstacleManager(this);

        this.init();

        this._gameOverUI = new GameOverUI(this);
        this.addChild(this._gameOverUI,5);
        this._gameOverUI.setVisible(false);

        return true;
    },

    init:function(){
        this._foodManager.init();
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
        //this._girl.y -= (this._girl.y-this._touchY)*0.1;
        //this._girl.x -= (this._girl.x-this._touchX)*0.1;
        this._foodManager.update(this._girl,elapsed);
        this._obstacleManager.update(this._girl,elapsed);

        var winSize = cc.director.getWinSize();
        switch(Game.gameState){
            case GameConstants.GAME_STATE_IDLE:
                if(this._girl.x<winSize.width/2.5){
                    this._girl.x+=((winSize.width/2.5+10)-this._girl.x)*0.05;
                    Game.user.heroSpeed+=(GameConstants.HERO_MIN_SPEED-Game.user.heroSpeed)*0.05;
                    this._background.speed = Game.user.heroSpeed * elapsed;
                }else{
                    Game.gameState = GameConstants.GAME_STATE_FLYING;
                    this._girl.state = GameConstants.HERO_STATE_FLYING;
                }
                this._ui.update();
                this._handleHeroPose();
                break;
            case GameConstants.GAME_STATE_FLYING:
                if(Game.user.Money>0){//加速
                    Game.user.heroSpeed +=(GameConstants.HERO_MAX_SPEED-Game.user.heroSpeed)*0.2;//这里可以控制快速加速
                    Game.user.Money -= elapsed;
                }
                if(Game.user.hitObstacle<=0){
                    this._girl.state = GameConstants.HERO_STATE_FLYING;
                    this._girl.y -= (this._girl.y-this._touchY)*0.1;//这里控制小仙女跟随鼠标上下移动
                    this._handleHeroPose();//这里控制小仙女朝向根据鼠标的位置改变
                    //这里控制小仙女进入加速动画
                    if(Game.user.heroSpeed>GameConstants.HERO_MIN_SPEED+100){
                        this._girl.toggleSpeed(true);
                    }
                    else{
                        this._girl.toggleSpeed(false);
                    }
                }
                else{//如果撞击的话
                    if(Game.user.Money<=0){//如果没有进入急速状态,这种状态下是需要管障碍物的
                        if(this._girl.state!=GameConstants.HERO_STATE_HIT){
                            this._girl.state=GameConstants.HERO_STATE_HIT;
                        }
                        this._girl.y -= (this._girl.y-winSize.width/2)*0.1;
                        if(this._girl.y>winSize.width/2){
                            this._girl.rotation -= Game.user.hitObstacle*1;//这里可以控制转的越来越慢
                        }
                        else{
                            this._girl.rotation += Game.user.hitObstacle*1;
                        }
                    }
                    Game.user.hitObstacle--;
                }
                if(Game.user.hitObstacle>0){
                    this.x = parseInt(Math.random()*Game.user.hitObstacle-Game.user.hitObstacle*0.5);
                    this.y = parseInt(Math.random()*Game.user.hitObstacle-Game.user.hitObstacle*0.5);
                }
                else if(this.x!=0){
                    this.x=0;
                    this.y=0;
                }

                if(Game.user.lovely>0){
                    Game.user.lovely -= elapsed;
                }
                Game.user.heroSpeed -=(Game.user.heroSpeed-GameConstants.HERO_MIN_SPEED)*0.01;//就是同一速度回慢慢回到最小速度
                this._background.speed = Game.user.heroSpeed*elapsed;
                Game.user.distance += (Game.user.heroSpeed*elapsed)*0.1;
                this._ui.update();
                break;
            case GameConstants.GAME_STATE_OVER:
                this._foodManager.removeAll();
                this._obstacleManager.removeAll();
                this._girl.setRotation(30);
                if(this._girl.y>-this._girl.height/2){
                    Game.user.heroSpeed -= Game.user.heroSpeed*elapsed;
                    this._girl.y -= winSize.height*elapsed;
                }
                else{
                    Game.user.heroSpeed = 0;
                    this.unscheduleUpdate();
                    this._gameOver();
                }
                this._background.speed = Game.user.heroSpeed*elapsed;
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

    },

    endGame:function(){
        Game.gameState = GameConstants.GAME_STATE_OVER;
    },

    _gameOver:function(){
        this._gameOverUI.setVisible(true);
        this._gameOverUI.init();
        Sound.playLose();
    }

});