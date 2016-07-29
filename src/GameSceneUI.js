/**
 * Created by tmh on 16/7/28.
 */
var GameSceneUI = cc.Layer.extend({
    _lifeText:null,
    _distanceText:null,
    _scoreText:null,
    ctor:function(){
        this._super();
        var fnt = "res/myFont2.fnt";
        var winSize = cc.director.getWinSize();
        //var lifeLabel = new cc.LabelBMFont("L I V E S",fnt);
        var lifeLabel = new cc.LabelTTF("L I V E S","Arial",'22');
        this.addChild(lifeLabel);
        lifeLabel.x=420;
        lifeLabel.y=winSize.height-25;
        //this._lifeText = new cc.LabelBMFont("0",fnt);
        this._lifeText = new cc.LabelTTF("0","Arial",'22');
        this.addChild(this._lifeText);
        this._lifeText.x=420;
        this._lifeText.y=winSize.height-60;

        //var distanceLabel = new cc.LabelBMFont("D I S T A N C E",fnt);
        var distanceLabel = new cc.LabelTTF("D I S T A N C E","Arial",'22');
        this.addChild(distanceLabel);
        distanceLabel.x=680;
        distanceLabel.y=winSize.height-25;
        //this._distanceText = new cc.LabelBMFont("0",fnt);
        this._distanceText = new cc.LabelTTF("0","Arial",'22');
        this.addChild(this._distanceText);
        this._distanceText.x=680;
        this._distanceText.y=winSize.height-60;

        //var scoreLabel = new cc.LabelBMFont("S C O R E",fnt);
        var scoreLabel = new cc.LabelTTF("S C O R E","Arial",'22');
        this.addChild(scoreLabel);
        scoreLabel.x=915;
        scoreLabel.y=winSize.height-25;
        //this._scoreText = new cc.LabelBMFont("0",fnt);
        this._scoreText = new cc.LabelTTF("0","Arial",'22');
        this.addChild(this._scoreText);
        this._scoreText.x=915;
        this._scoreText.y=winSize.height-60;

        var pauseButton = new cc.MenuItemImage('#soundOn01.jpg','#soundOn01.jpg',this._pauseResume);
        pauseButton.setScaleX(0.5);
        pauseButton.setScaleY(0.5);
        var soundButton = new SoundButton();
        soundButton.setScaleX(0.5);
        soundButton.setScaleY(0.5);
        var menu = new cc.Menu(soundButton,pauseButton);
        menu.alignItemsHorizontallyWithPadding(30);
        menu.x=120;
        menu.y=winSize.height-40;
        this.addChild(menu);
        return true;
    },
    update:function(){
        //cc.log(Game.user.distance);
        this._lifeText.setString(Game.user.lives.toString());
        this._distanceText.setString(parseInt(Game.user.distance).toString());
        this._scoreText.setString(Game.user.score.toString());
    },
    _pauseResume:function () {
        if(cc.director.isPaused()){
            cc.director.resume();
        }
        else{
            cc.director.pause();
        }

    }
});