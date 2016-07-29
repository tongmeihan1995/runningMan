/**
 * Created by tmh on 16/7/29.
 */
var Item = cc.Sprite.extend({
    type:0,
    ctor:function(type){
        this._super("#star"+type +".jpg");
        this.type = type;
        return true;
    },

    reuse:function(type){
        cc.log("star reuse");
        this.setSpriteFrame("#star"+type+".jpg");
        this.type = type;
    },

    unuse:function(){
        cc.log("star unuse");
    }

});

Item.create = function(){
    if(cc.pool.hasObject(Item)){
        return cc.pool.getFromPool(Item,type);
    }
    else{
        return new Item(type);
    }
};