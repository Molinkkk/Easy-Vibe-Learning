export function updateWeapons(g,dt){g.cooldown-=dt;const p=g.player;if(g.cooldown<=0){const target=g.enemies.filter(e=>e.hp>0).sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y))[0];if(target && Math.hypot(target.x-p.x,target.y-p.y)<520){g.bullets.push({x:p.x,y:p.y,target:target.id,life:2.4,damage:18*(1+0.2*(g.upgrades.power||0))});g.cooldown=0.65*Math.pow(0.9,g.upgrades.haste||0);}}
 for(const b of g.bullets){b.life-=dt;const e=g.enemies.find(e=>e.id===b.target&&e.hp>0);if(!e){b.life=0;continue;}const d=Math.hypot(e.x-b.x,e.y-b.y)||1;b.x+=(e.x-b.x)/d*440*dt;b.y+=(e.y-b.y)/d*440*dt;if(d<e.radius+8+440*dt){g.damage(e,b.damage);b.life=0;}}
 g.bullets=g.bullets.filter(b=>b.life>0);
}
