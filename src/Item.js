/**
 * Created by tmh on 16/7/29.
 */
var Item = cc.Sprite.extend({
    type:0,
    ctor:function(type){
        this._super("#start"+type +".jpg");
        this.setScaleX(GameConstants.ITEM_SCALE);
        this.setScaleY(GameConstants.ITEM_SCALE);
        this.type = type;
        return true;
    },

    reuse:function(type){
        //cc.log("star reuse");
        this.setSpriteFrame("start"+type+".jpg");
        this.setScaleX(GameConstants.ITEM_SCALE);
        this.setScaleY(GameConstants.ITEM_SCALE);
        this.type = type;
    },

    unuse:function(){
        //cc.log("star unuse");
    }

});

Item.create = function(type){
    //cc.log("type"+type);
    if(cc.pool.hasObject(Item)){
        return cc.pool.getFromPool(Item,type);
    }
    else{
        return new Item(type);
    }
};