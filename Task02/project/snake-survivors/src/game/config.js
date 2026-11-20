export const RULES = { width:2400, height:1800, duration:90, spacing:14, segments:10, maxEnemies:160 };
export const ENEMIES = {
 slime:{hp:20,speed:48,damage:8,radius:15,color:'#8cbb65',xp:5},
 beast:{hp:15,speed:105,damage:12,radius:12,color:'#e3a45d',xp:6},
 skeleton:{hp:42,speed:65,damage:16,radius:17,color:'#d5d7c3',xp:10}
};
export const threshold = level => Math.round(16 + level * 9 + level * level * 1.1);
export const UPGRADES = [
 {id:'power',name:'灼热之牙',description:'火焰伤害 +20% · 最多 5 次',max:5},
 {id:'haste',name:'迅捷本能',description:'攻击间隔缩短 10% · 最多 5 次',max:5},
 {id:'length',name:'生长蜕变',description:'增加 3 节蛇身，接触伤害随长度提升',max:6},
 {id:'health',name:'生命之泉',description:'最大生命 +25，并恢复 35 点生命',max:5},
 {id:'speed',name:'逐风鳞片',description:'移动速度 +8% · 最多 4 次',max:4}
];
