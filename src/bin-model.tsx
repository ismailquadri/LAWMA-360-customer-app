import { useMemo, useState } from 'react';
import { PanResponder, View } from 'react-native';
import Svg, { Ellipse, Polygon } from 'react-native-svg';
import { Text } from './text';
import { Button, C, S } from './ui';
type Point = [number, number, number];
type Face = { points: Point[]; color: string };
function box(x: number,y:number,z:number,w:number,h:number,d:number,colors:string[]): Face[] {
 const v:Point[]=[[-w,-h,-d],[w,-h,-d],[w,h,-d],[-w,h,-d],[-w,-h,d],[w,-h,d],[w,h,d],[-w,h,d]].map(p=>[p[0]+x,p[1]+y,p[2]+z] as Point);
 return [[0,1,2,3],[4,5,6,7],[0,4,7,3],[1,5,6,2],[3,2,6,7],[0,1,5,4]].map((ids,i)=>({points:ids.map(id=>v[id]),color:colors[i%colors.length]}));
}
export function BinModel() {
 const [rotation,setRotation]=useState({yaw:.55,pitch:.18,startYaw:.55,startPitch:.18});const {yaw,pitch}=rotation;const [open,setOpen]=useState(false);
 const setYaw=(change:number|((n:number)=>number))=>setRotation(s=>({...s,yaw:typeof change==='function'?change(s.yaw):change}));
 const setPitch=(pitch:number)=>setRotation(s=>({...s,pitch}));
 const pan=useMemo(()=>PanResponder.create({onStartShouldSetPanResponder:()=>true,onMoveShouldSetPanResponder:()=>true,onPanResponderGrant:()=>setRotation(s=>({...s,startYaw:s.yaw,startPitch:s.pitch})),onPanResponderMove:(_,g)=>setRotation(s=>({...s,yaw:s.startYaw+g.dx*.012,pitch:Math.max(-.3,Math.min(.7,s.startPitch+g.dy*.005))}))}),[]);
 let faces=box(0,0,0,.58,.82,.43,['#163D30','#2A6049','#214C3A','#387055','#42765B']); faces=faces.map(f=>({...f,points:f.points.map(([x,y,z])=>[y<0?x*.82:x,y,y<0?z*.82:z] as Point)}));
 const lid=box(0,.88,0,.66,.07,.51,['#D35419','#EB702D','#C9521C','#F18B46','#F69B5B']);
 if(open) lid.forEach(f=>f.points=f.points.map(([x,y,z])=>{const a=-1.1,dy=y-.88,dz=z+.5;return [x,.88+dy*Math.cos(a)-dz*Math.sin(a),-.5+dy*Math.sin(a)+dz*Math.cos(a)];}));
 faces=faces.concat(lid,box(0,1.02,-.38,.25,.045,.05,['#274A37']),box(0,.23,.445,.17,.22,.01,['#DEE9CE']));
 [-.57,.57].forEach(x=>{[-.095,.095].forEach(side=>faces.push({color:'#162A21',points:Array.from({length:16},(_,i)=>[x+side,-.83+Math.sin(i*Math.PI/8)*.2,-.29+Math.cos(i*Math.PI/8)*.2] as Point)}));for(let i=0;i<16;i++){const a=i*Math.PI/8,b=(i+1)*Math.PI/8;faces.push({color:i%2?'#1C2B23':'#2B3B31',points:[[x-.09,-.83+Math.sin(a)*.2,-.29+Math.cos(a)*.2],[x+.09,-.83+Math.sin(a)*.2,-.29+Math.cos(a)*.2],[x+.09,-.83+Math.sin(b)*.2,-.29+Math.cos(b)*.2],[x-.09,-.83+Math.sin(b)*.2,-.29+Math.cos(b)*.2]]});} });
 const transformed=faces.map(f=>{const pts=f.points.map(([x,y,z])=>{const xx=x*Math.cos(yaw)+z*Math.sin(yaw),zz=-x*Math.sin(yaw)+z*Math.cos(yaw);return [xx,y*Math.cos(pitch)-zz*Math.sin(pitch),y*Math.sin(pitch)+zz*Math.cos(pitch)] as Point;});return {color:f.color,depth:pts.reduce((n,p)=>n+p[2],0)/pts.length,points:pts.map(([x,y,z])=>`${160+x*460/(5-z)},${190-y*460/(5-z)}`).join(' ')};}).sort((a,b)=>a.depth-b.depth);
 return <><View {...pan.panHandlers} accessibilityLabel="Interactive three dimensional household bin. Use the rotation buttons below as an alternative to dragging." style={{height:330,backgroundColor:'#EAF0E4',borderRadius:24,overflow:'hidden',marginVertical:18}}><Svg width="100%" height="100%" viewBox="0 0 320 330"><Ellipse cx="160" cy="289" rx="74" ry="14" fill="#CAD5BC"/>{transformed.map((f,i)=><Polygon key={i} points={f.points} fill={f.color} stroke={f.color} strokeWidth={.5}/>)}</Svg></View><Text style={[S.small,{textAlign:'center',marginBottom:15}]}>Drag to rotate · 3D concept model</Text><View style={{flexDirection:'row',gap:8}}><Button title="Rotate left" variant="outline" style={{flex:1,paddingHorizontal:7}} onPress={()=>setYaw(y=>y-.5)}/><Button title={open?'Close lid':'Open lid'} variant="secondary" style={{flex:1,paddingHorizontal:7}} onPress={()=>setOpen(!open)}/><Button title="Rotate right" variant="outline" style={{flex:1,paddingHorizontal:7}} onPress={()=>setYaw(y=>y+.5)}/></View><Button title="Reset view" variant="outline" style={{marginTop:10,borderColor:C.line}} onPress={()=>{setYaw(.55);setPitch(.18);setOpen(false);}}/></>;
}
