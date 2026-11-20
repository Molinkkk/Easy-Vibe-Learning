export const CHARACTERS={
 fire:{name:'赤焰蛇',weapon:'fire',hp:100,attack:1.2,haste:1,reduction:0,color:'#ef9661',passive:'火焰伤害 +25%'},
 thunder:{name:'雷霆蛇',weapon:'lightning',hp:90,attack:1,haste:.8,reduction:0,color:'#b4a3ff',passive:'闪电连锁 +1 · 攻速 +25%'},
 armor:{name:'玄甲蛇',weapon:'blade',hp:150,attack:1,haste:1,reduction:.2,color:'#8fcbb8',passive:'受到伤害降低 20%'}
};
export const WEAPONS={
 fire:{name:'火焰弹',damage:18,interval:.65,range:520,count:1,color:'#ffad61'},
 lightning:{name:'雷电链',damage:15,interval:1.2,range:420,count:3,color:'#baadff'},
 blade:{name:'旋刃',damage:12,interval:.5,range:90,count:2,color:'#c9e4e3'},
 poison:{name:'毒雾',damage:8,interval:.6,range:130,count:1,color:'#a9d775'},
 shadow:{name:'蛇影分身',damage:30,interval:2,range:650,count:1,color:'#d692f3'}
};
export const EVOLUTIONS=[
 {weapon:'fire',level:5,core:'fireCore',name:'地狱火雨',color:'#ff714a'},
 {weapon:'lightning',level:5,core:'energyCore',name:'天罚雷暴',color:'#e1ccff'},
 {weapon:'blade',level:5,core:'windCore',name:'虚空风暴',color:'#7bfff0'}
];
export const CORES={fireCore:'火焰核心',energyCore:'能量核心',windCore:'风之核心'};
export function evolve(g){for(const e of EVOLUTIONS)if((g.weapons[e.weapon]||0)>=e.level&&g.cores[e.core])g.evolved[e.weapon]=true;}
export function weaponChoices(g){return Object.entries(WEAPONS).filter(([id])=>(g.weapons[id]||0)<5).map(([id,w])=>({id:'weapon:'+id,name:w.name+' Lv.'+((g.weapons[id]||0)+1),description:`${g.weapons[id]?'强化伤害、数量与范围':'获得新武器'} · 上限 Lv.5`}));}
export function coreChoices(g){return Object.entries(CORES).filter(([id])=>!g.cores[id]).map(([id,name])=>({id:'core:'+id,name,description:'对应武器达到 Lv.5 时自动进化'}));}
export function registerKill(g){if(g.time-g.lastKill>3)g.combo=0;g.lastKill=g.time;g.combo++;g.maxCombo=Math.max(g.maxCombo,g.combo);if(g.combo>=30&&g.time>=g.feverReady){g.fever=6;g.feverReady=g.time+18;}}
export const comboMultiplier=g=>1+Math.min(1,Math.floor(g.combo/10)*.1);
