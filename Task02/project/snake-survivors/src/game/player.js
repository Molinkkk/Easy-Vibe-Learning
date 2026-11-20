import {RULES} from './config.js';
export function createPlayer(){return {x:1200,y:900,hp:100,maxHp:100,speed:210,radius:13,segments:10,angle:0,invulnerable:0,trail:Array.from({length:400},(_,i)=>({x:1200-i*2,y:900})),body:[]};}
export function updatePlayer(p,input,dt){
 const m=Math.hypot(input.x,input.y); const dx=m>1?input.x/m:input.x,dy=m>1?input.y/m:input.y;
 const old={x:p.x,y:p.y};p.x=Math.max(24,Math.min(RULES.width-24,p.x+dx*p.speed*dt));p.y=Math.max(24,Math.min(RULES.height-24,p.y+dy*p.speed*dt));
 const distance=Math.hypot(p.x-old.x,p.y-old.y);
 if(distance>0){p.angle=Math.atan2(dy,dx);const steps=Math.ceil(distance/2);for(let i=1;i<=steps;i++)p.trail.unshift({x:old.x+(p.x-old.x)*i/steps,y:old.y+(p.y-old.y)*i/steps});}
 let length=0,index=0;p.body=[];
 for(let n=1;n<=p.segments;n++){const target=n*RULES.spacing;while(index<p.trail.length-1){const a=p.trail[index],b=p.trail[index+1],d=Math.hypot(a.x-b.x,a.y-b.y);if(length+d>=target){const t=d?(target-length)/d:0;p.body.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});break;}length+=d;index++;}}
 p.trail=p.trail.slice(0,Math.max(index+10,400));p.invulnerable=Math.max(0,p.invulnerable-dt);
}
