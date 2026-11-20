import {WEAPONS,CHARACTERS} from './progression.js';
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export function bladePositions(g){const lv=g.weapons.blade||0;if(!lv)return [];const count=2+Math.floor(lv/2)+(g.evolved.blade?3:0),r=g.evolved.blade?150:90;return Array.from({length:count},(_,i)=>({x:g.player.x+Math.cos(g.time*3+i*Math.PI*2/count)*r,y:g.player.y+Math.sin(g.time*3+i*Math.PI*2/count)*r}));}
export function updateWeapons(g,dt){const p=g.player,c=CHARACTERS[g.character];for(const [id,lv] of Object.entries(g.weapons)){g.timers[id]=(g.timers[id]||0)-dt;if(g.timers[id]>0)continue;const cfg=WEAPONS[id],evo=g.evolved[id],range=cfg.range+(lv-1)*15;const targets=g.enemies.filter(e=>e.hp>0&&dist(e,p)<range).sort((a,b)=>dist(a,p)-dist(b,p));const damage=cfg.damage*(1+(lv-1)*.3)*(evo?2:1)*(id==='fire'&&g.character==='fire'?1.25:1);g.timers[id]=cfg.interval*Math.pow(.9,g.upgrades.haste||0)*c.haste/(g.fever>0?1.7:1);
 if(id==='fire'){for(const e of targets.slice(0,1+Math.floor(lv/2)+(evo?3:0)))g.bullets.push({x:p.x,y:p.y,target:e.id,life:2.4,damage,evo});}
 if(id==='lightning'){let from=p;for(const e of targets.slice(0,cfg.count+Math.floor(lv/2)+(g.character==='thunder'?1:0)+(evo?5:0))){g.damage(e,damage);g.effects.push({x:from.x,y:from.y,x2:e.x,y2:e.y,color:cfg.color,life:.22});from=e;}}
 if(id==='blade'){for(const e of g.enemies)if(e.hp>0&&bladePositions(g).some(b=>dist(b,e)<e.radius+22))g.damage(e,damage);}
 if(id==='poison'){g.zones.push({x:p.x,y:p.y,r:range,life:2,damage:damage*.5,tick:0});}
 if(id==='shadow'){for(const e of targets.slice(0,1+Math.floor(lv/2))){g.damage(e,damage);g.effects.push({x:p.x,y:p.y,x2:e.x,y2:e.y,color:cfg.color,life:.5,shadow:true});}}
 }
 for(const b of g.bullets){b.life-=dt;const e=g.enemies.find(e=>e.id===b.target&&e.hp>0);if(!e){b.life=0;continue;}const d=dist(e,b)||1;b.x+=(e.x-b.x)/d*440*dt;b.y+=(e.y-b.y)/d*440*dt;if(d<e.radius+8+440*dt){g.damage(e,b.damage);if(b.evo){g.zones.push({x:e.x,y:e.y,r:110,damage:b.damage*.3,life:1.5,tick:0,fire:true});}b.life=0;}}
 g.bullets=g.bullets.filter(b=>b.life>0);for(const z of g.zones){z.life-=dt;z.tick-=dt;if(z.tick<=0){for(const e of g.enemies)if(e.hp>0&&dist(e,z)<z.r+e.radius)g.damage(e,z.damage);z.tick=.5;}}g.zones=g.zones.filter(z=>z.life>0);
}
