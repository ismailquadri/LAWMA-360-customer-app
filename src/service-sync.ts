import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import type { Model } from './store';
const API='https://vercel-release-eight.vercel.app/api/service';
const fields=['premiseId','partnerId','providerChangeId','capacityRequest','bins','balance','reserved','pickups','entries','issues','notices','requestBinOnMove','archives','supportMessages'] as const;
type Shared=Pick<Model,typeof fields[number]>;
type Doc={revision:number;state:Shared;error?:string};
const pick=(m:Model)=>Object.fromEntries(fields.map(k=>[k,m[k]])) as Shared;
export function useServiceSync(model:Model,setModel:Dispatch<SetStateAction<Model>>,ready:boolean){
 const [session,setSession]=useState(''),[status,setStatus]=useState('On this device');
 const latest=useRef(model),previous=useRef<Shared|null>(null),remote=useRef<Doc|null>(null),pending=useRef<Partial<Shared>>({}),busy=useRef(false),loaded=useRef(false);
 useEffect(()=>{latest.current=model},[model]);
 useEffect(()=>{let active=true;AsyncStorage.getItem('sw-service-room').then(saved=>{const param=typeof window!=='undefined'?new URLSearchParams(window.location.search).get('session'):null;const code=param||saved||'';if(active&&/^[a-f0-9]{32}$/.test(code)){setSession(code);AsyncStorage.setItem('sw-service-room',code).catch(()=>undefined)}});return()=>{active=false}},[]);
 useEffect(()=>{if(!ready)return;const current=pick(model);if(loaded.current&&previous.current){for(const k of fields)if(JSON.stringify(current[k])!==JSON.stringify(previous.current[k]))Object.assign(pending.current,{[k]:current[k]})}previous.current=current},[model,ready]);
 useEffect(()=>{
  if(!session||!ready)return;let active=true;
  const apply=(d:Doc)=>{remote.current=d;const shared={...d.state,...pending.current};previous.current=shared;setModel(s=>({...s,...shared,binDeliveryUntil:0}));};
  const tick=async()=>{
   if(busy.current||!active)return;busy.current=true;
   try{
    if(!loaded.current){const r=await fetch(API,{headers:{Authorization:'Bearer '+session}}),d=await r.json();if(!r.ok)throw Error(d.error);remote.current=d;loaded.current=true;if(d.revision===0){pending.current=pick(latest.current)}else apply(d)}
    const patch={...pending.current};
    if(Object.keys(patch).length){
     setStatus('Sending update…');const r=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+session},body:JSON.stringify({revision:remote.current?.revision||0,eventId:'C-'+Date.now()+'-'+Math.random().toString(36).slice(2),patch})}),d=await r.json();
     if(r.status===409){if(d.state){for(const k of fields)if(k in patch&&JSON.stringify(d.state[k])!==JSON.stringify(remote.current?.state[k]))delete pending.current[k];apply(d)}else loaded.current=false;setStatus('A newer service update arrived. Please review it.');return}
     if(!r.ok)throw Error(d.error);
     for(const k of fields)if(JSON.stringify(pending.current[k])===JSON.stringify(patch[k]))delete pending.current[k];apply(d);
    }else{const r=await fetch(API,{headers:{Authorization:'Bearer '+session}}),d=await r.json();if(!r.ok)throw Error(d.error);if(d.revision!==remote.current?.revision)apply(d)}
    if(active)setStatus('Connected to your service team');
   }catch(e){if(active)setStatus(e instanceof Error?e.message:'Waiting to reconnect. Your changes are saved here.')}finally{busy.current=false}
  };void tick();const timer=setInterval(tick,5000);return()=>{active=false;clearInterval(timer)};
 },[session,ready,setModel]);
 async function connect(value:string){const code=value.match(/[a-f0-9]{32}/)?.[0];if(!code)return false;await AsyncStorage.setItem('sw-service-room',code);loaded.current=false;pending.current={};previous.current=null;remote.current=null;setSession(code);setStatus('Connecting…');return true}
 async function disconnect(){await AsyncStorage.removeItem('sw-service-room');setSession('');loaded.current=false;pending.current={};setStatus('On this device')}
 return {session,status,connect,disconnect};
}
