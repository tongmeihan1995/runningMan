/**
 * Created by tmh on 16/7/28.
 */
var AboutScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        var layer = new cc.Layer;
        this.addChild(layer);
        var winSize = cc.director.getWinSize();
        var bgAbout = new cc.Sprite('#bg3.jpg');
        bgAbout.x=winSize.width/2;
        bgAbout.y=winSize.height/2;
        bgAbout.setScaleX(winSize.width/bgAbout.width);
        bgAbout.setScaleY(winSize.height/bgAbout.height);
        layer.addChild(bgAbout);
        var aboutText="Hungry Hero is a free and open source game built on Adobe Flash at first\n\n"+
                "and this is a Cocos2d-JS version modified by Tmh\n\n"+
                "The concept is very simple.\n\nThe girl is pretty much curious about star and you need to feed him with as many as possible star\n\n"+
                "You get scores when your fairy girl touch star and there are several obstacles that fly with \"Look out\"\n\n"+
                "try to travel as long as possible\n\n"+
                "good luck!";
        //var helloLabel = new cc.LabelBMFont(aboutText,"res/myFont2.fnt",50,cc.TEXT_ALIGNMENT_CENTER);
        var helloLabel = new cc.LabelTTF(aboutText,"Arial",18);
        helloLabel.x=winSize.width/2;
        helloLabel.y=winSize.height/4*3;
        layer.addChild(helloLabel);
        var backButton = new cc.MenuItemImage('#welcome.jpg','#welcome.jpg',this._back);
        backButton.setScaleX(0.6);
        backButton.setScaleY(0.6);
        backButton.x =winSize.width/4*3;
        backButton.y=winSize.height/2;
        var menu =new cc.Menu(backButton);
        menu.x=menu.y=0;
        layer.addChild(menu);
        return true;
    },
    _back:function(){
        Sound.playEatMoney();
        cc.director.runScene(new MenuScene());
    }
});