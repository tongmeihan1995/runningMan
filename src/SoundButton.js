/**
 * Created by tmh on 16/7/28.
 */
var SoundButton = cc.MenuItemToggle.extend({
    ctor:function(){
        var sprite = new cc.Sprite('#soundOn00.jpg');
        var sprite2 = new cc.Sprite('#soundOn01.jpg');
        //sprite.setScaleX(0.5);
        //sprite.setScaleY(0.5);
        /*var animation = new cc.Animation();
        animation.addSpriteFrame(sprite);
        animation.addSpriteFrame(sprite2);
        animation.setDelayPerUnit(1/2);
        var action = cc.animate(animation).repeatForever();
        sprite.runAction(action);*/
        this._super(new cc.MenuItemSprite(sprite),new cc.MenuItemImage("#soundOff.jpg"));
        this.setCallback(this._soundOnOff,this);
    },
    _soundOnOff:function(){
        Sound.toggleOnOff();
    }
})