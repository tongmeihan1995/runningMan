/**
 * Created by tmh on 16/7/29.
 */
var FoodManager = cc.Class.extend({
    _container:null,
    _gameScene:null,
    _itemToAnimate:null,
    _pattern:0,//排列顺序,1表示水平,2表示垂直,3表示之字形,4表示随机
    _patternPosY:0,//当前食物的纵坐标
    _patternStep:0,//每个食物的垂直距离
    _patternDirection:0,//用于之字排列的方向
    _patternGap:0,//每个食物水平距离
    _patternGapCount:0,//水平距离计数
    _patternChangeDistance:0,//当前食物组的水平跨度
    _patternLength:0,//垂直状态下的食物状态
    _patternOnce:true,//垂直状态下逻辑控制
    _patternPosYstart:0,//垂直装填下的食物y起始坐标


    ctor:function(gameScene){
        this._gameScene = gameScene;
        this._container = gameScene.itemBatchLayer;
        this._itemToAnimate = new Array();
        //星星一些参数的坐标
        this._pattern = 1;
        this._patternPosY = cc.director.getWinSize().height - GameConstants.GAME_AREA_TOP_BOTTOM;
        this._patternStep = 15;
        this._patternDirection = 1;
        this._patternGap = 20;
        this._patternGapCount = 0;
        this._patternChangeDistance = 0;
        this._patternLength = 50;
        this._patternOnce = true;
    },
    init:function(){
        this.removeAll();
        Game.user.lovely=Game.user.Money=0;
    },
    removeAll:function(){
        if(this._itemToAnimate.length>0){
            for(var i=0;i<this._itemToAnimate.length;i++){
                var item = this._itemToAnimate[i];
                this._itemToAnimate.splice(i,1);
                cc.pool.putInPool(item);
                this._container.removeChild(item);
            }
        }
    },
    update:function(hero,elapsed){
        this._setFoodPattern(elapsed);
        this._createFoodPattern(elapsed);
        this._animateFoodItems(hero,elapsed);
    },
    _setFoodPattern:function(elapsed){
        if(this._patternChangeDistance>0){
            this._patternChangeDistance -= Game.user.heroSpeed*elapsed;
        }
        else{
            //this._pattern = Math.ceil(Math.random()*4);
            this._pattern = 1;
            if(this._pattern == 1){
                this._patternChangeDistance = Math.random()*500+500;
            }
            else if(this._pattern == 2){
                this._patternOnce = true;
                this._patternStep = 40;
                this._patternChangeDistance = this._patternGap * Math.random()*3+5;
            }
            else if(this._pattern == 3){
                this._patternStep = Math.round(Math.random()*2+2)*10;//这样求出来的数值应该是2,3,4
                if(Math.random()>0.5){
                    this._patternDirection *= -1;
                }
                this._patternChangeDistance = Math.random()*800+800;
            }
            else if(this._pattern == 4){
                this._patternChangeDistance = Math.random()*400+400;
            }
            else{
                this._patternChangeDistance = 0;
            }
        }
    },
    _createFoodPattern:function(elapsed){
        if(this._patternGapCount<this._patternGap){
            this._patternGapCount += Game.user.speed * elapsed;
        }
        else if(this._pattern!=0){
            this._patternGapCount=0;
            var winSize = cc.director.getWinSize();
            var item = null;
            switch(this._pattern){
                case 1:
                    if(Math.random()>90){//有10%的概率改变纵坐标
                        this._patternPosY=Math.floor(Math.random()*(winSize-2*GameConstants.GAME_AREA_TOP_BOTTOM)+GameConstants.GAME_AREA_TOP_BOTTOM);
                    }
                    item = Item.create(Math.ceil(Math.random()*4));
                    item.x = winSize.width+item.width;
                    item.y = this._patternPosY;

                    this._itemToAnimate.push(item);
                    this._container.addChild(item,1);
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                default:
                    break;
            }

        }
    },
    _animateFoodItems:function(hero,elapsed){
        var item;
        for(var i=this._itemToAnimate.length-1;i>=0;i--){
            item = this._itemToAnimate[i];
            if(item){
                if(Game.user.lovely>0&&item.type<GameConstants.NORMAL_STAR_NUMBER){//这里是星星向仙女移动,但是有特殊效果的星星除外
                    item.x -= (item.x-hero.x)*0.2;
                    item.y -= (item.y-hero.y)*0.2;
                }
                else{//这是星星正常向左移动
                    item.x -= Game.user.heroSpeed*elapsed;
                }
                if(item.x<-80||Game.gameState==GameConstants.GAME_STATE_OVER){
                    this._itemToAnimate.splice(i,1);
                    cc.pool.putInPool(item);
                    this._container.removeChild(item);
                    //continue;
                }
                else{
                    var heroItem_xDist = item.x-hero.x;
                    var heroItem_yDist = item.y-hero.y;
                    var heroItem_squerDist = heroItem_xDist*heroItem_xDist+heroItem_yDist*heroItem_yDist;
                    if(heroItem_squerDist<5000){//发生了碰撞
                        if(item.type<GameConstants.NORMAL_STAR_NUMBER){
                            Game.user.score += item.type;
                            Sound.playEatHat();
                        }
                        else if(item.type==GameConstants.MONEY_TYPE){
                            Game.user.Money = 5;
                            Game.user.score += 1;
                            Sound.playEatMoney();
                        }
                        else if(item.type==GameConstants.LOVELY_TYPE){
                            Game.user.lovely = 4;
                            Game.user.score += 1;
                            Sound.playMEat();
                        }
                        this._itemToAnimate.splice(i,1);
                        cc.pool.putInPool(item);
                        this._container.removeChild(item);
                    }
                }
            }
        }
    }
});