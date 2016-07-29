/**
 * Created by tmh on 16/7/28.
 */
var Sound = {
    silence:false,
    _eatEffect:0,
    _menuBgMusic:false,
    playMenuBgMusic:function(){
        if(!Sound.silence){
            if(!Sound._menuBgMusic){
                cc.audioEngine.playMusic("res/bgMusic.mp3",true);
                Sound._menuBgMusic=true;
            }

        }
    },
    playGameBgMusic:function(){
        if(!Sound.silence){
            cc.audioEngine.playMusic("res/gameMusic.mp3",true);
        }
    },
    playMEat:function(){
        if(!Sound.silence){
            if(Sound._eatEffect) {
                cc.audioEngine.stopEffect(Sound._eatEffect);
                Sound._eatEffect = cc.audioEngine.playEffect("res/eat1.mp3", false);
            }
        }
    },
    playEatMoney:function(){
        if(!Sound.silence){
            cc.audioEngine.playEffect("res/eat2.mp3",false);
        }
    },
    playEatHat:function(){
        if(!Sound.silence){
            cc.audioEngine.playEffect("res/eat3.mp3",false);
        }
    },
    playHit:function(){
        if(!Sound.silence){
            cc.audioEngine.playEffect("res/hit.mp3",true);
        }
    },
    playHurt:function(){
        if(!Sound.silence){
            cc.audioEngine.playEffect("res/hit.mp3",true);
        }
    },
    playLose:function(){
        if(!Sound.silence){
            cc.audioEngine.playMusic("res/lose.mp3",true);
        }
    },
    stop:function(){
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic();
        Sound._menuBgMusic=false;
    },
    toggleOnOff:function(){
        if(Sound.silence){
            Sound.silence=false;
            cc.audioEngine.setEffectsVolume(1);
            cc.audioEngine.setMusicVolume(1);
        }
        else{
            Sound.silence=true;
            cc.audioEngine.setEffectsVolume(0);
            cc.audioEngine.setMusicVolume(0);
        }
    }

}