import {RULES,UPGRADES,threshold} from './config.js';
import {createPlayer,updatePlayer} from './player.js';
import {spawnEnemy,updateEnemies} from './enemies.js';
import {updateWeapons} from './weapons.js';
import {updateDrops} from './drops.js';
export class Game {
 constructor(random=Math.random){this.random=random;this.reset();}
 reset(){this.player=createPlayer();updatePlayer(this.player,{x:0,y:0},0);this.enemies=[];this.bullets=[];this.drops=[];this.effects=[];this.time=0;this.kills=0;this.level=1;this.xp=0;this.cooldown=0;this.spawn=0;this.nextId=1;this.upgrades={};this.choices=[];this.status='menu';this.result=null;}
 start(){this.reset();this.status='playing';}
 pause(){if(this.status==='playing')this.status='paused';}
 resume(){if(this.status==='paused')this.status='playing';}
 damage(enemy,value){if(enemy.hp<=0)return;enemy.hp-=value;enemy.flash=0.1;this.effects.push({x:enemy.x,y:enemy.y,text:Math.round(value),color:'#ffe5a3',life:0.65});if(enemy.hp<=0){this.kills++;this.drops.push({x:enemy.x,y:enemy.y,value:enemy.xp});for(let i=0;i<5;i++)this.effects.push({x:enemy.x,y:enemy.y,vx:(this.random()-.5)*140,vy:(this.random()-.5)*140,color:enemy.color,life:0.45});}}
 offer(){const pool=UPGRADES.filter(u=>(this.upgrades[u.id]||0)<u.max);this.choices=[];while(pool.length&&this.choices.length<3)this.choices.push(pool.splice(Math.floor(this.random()*pool.length),1)[0]);if(this.choices.length)this.status='upgrade';else{this.player.hp=Math.min(this.player.maxHp,this.player.hp+20);}}
 choose(id){if(this.status!=='upgrade'||!this.choices.some(c=>c.id===id))return;this.upgrades[id]=(this.upgrades[id]||0)+1;const p=this.player;if(id==='length')p.segments+=3;if(id==='health'){p.maxHp+=25;p.hp=Math.min(p.maxHp,p.hp+35);}if(id==='speed')p.speed=210*(1+.08*this.upgrades.speed);this.choices=[];this.status='playing';}
 tick(dt,input={x:0,y:0}){if(this.status!=='playing')return;dt=Math.min(Math.max(dt,0),0.05);this.time+=dt;updatePlayer(this.player,input,dt);this.spawn-=dt;if(this.spawn<=0&&this.enemies.length<RULES.maxEnemies){spawnEnemy(this,this.time>25&&this.random()<.3?'skeleton':this.random()<.3?'beast':'slime');this.spawn=Math.max(.18,.8-this.time*.006);}updateWeapons(this,dt);updateEnemies(this,dt);this.enemies=this.enemies.filter(e=>e.hp>0);updateDrops(this,dt);for(const e of this.effects){e.life-=dt;e.y+=(e.vy||-24)*dt;e.x+=(e.vx||0)*dt;}this.effects=this.effects.filter(e=>e.life>0);if(this.player.hp<=0){this.status='ended';this.result='defeat';}else if(this.time>=RULES.duration){this.status='ended';this.result='victory';}else if(this.xp>=threshold(this.level)){this.xp-=threshold(this.level);this.level++;this.offer();}}
}
