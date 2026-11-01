import { Text } from '../text';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useStore } from '../store';
import { Back, Button, C, Card, Confirmation, Field, Header, Notice, S, Screen, Sheet } from '../ui';

const topics = ['Track my bin', 'My collection', 'Wallet & refunds', 'Moving home'];

export default function Support() {
  const { model, partner, addSupportMessage, report } = useStore();
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [escalate, setEscalate] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [ticket, setTicket] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function ask(question: string) {
    if (thinking || !question.trim()) return;
    addSupportMessage('customer', question);
    setInput('');
    setThinking(true);
    const q = question.toLowerCase();
    let answer = 'I can help with your bin, collection, wallet or a recent move. Tell me a little more, or ask for a person to review your service record.';
    if (/bin|delivery/.test(q)) answer = model.bins.length ? `Your household has ${model.bins.length} bin(s). ${model.bins.some(b => b.state !== 'Active') ? 'Your delivery is being updated. I can help you check the next step.' : 'They are ready for collection. Open Bins to view your allocation and inspect a bin.'} If a bin is missing or damaged, I can help you raise a case.` : 'Request your building’s bins from the Bins tab after choosing a collection partner. We check the residence allocation first so neighbours do not create duplicate requests.';
    else if (/pay|wallet|money|refund/.test(q)) answer = 'Your wallet reserves the collection amount when you request a pickup. The partner is paid on acceptance. A declined or cancelled request returns the reservation. For an incorrect settled charge, I can open a case with your transaction reference attached.';
    else if (/pickup|collect/.test(q)) answer = model.pickups[0] ? `Your latest collection is ${model.pickups[0].status.toLowerCase()} with ${model.pickups[0].partner}. Open Activity for its timeline. If the crew missed a visit, tell me what happened and I’ll prepare a service case.` : `There is no pickup in progress. ${partner ? `Your collection partner is ${partner.name}.` : 'Choose a collection partner first.'} You can request a collection from Home when a household bin is active.`;
    else if (/move|address|home/.test(q)) answer = 'If you have moved, update your address in You → Edit profile → I’ve moved to a new apartment. We’ll show which bin association ends and keep your past service records before you confirm.';
    timer.current = setTimeout(() => { addSupportMessage('assistant', answer); setThinking(false); }, 800);
  }

  return <Screen>
    <Back onPress={() => router.back()} />
    <Header eyebrow="SMARTWASTE CARE" title="We’re here to help." sub="Start with a quick answer. Bring in a person whenever you need one." />
    <View style={[S.row,{marginTop:8,marginBottom:18}]}>
      <Text style={[S.small,{flex:1}]}>For urgent service issues</Text>
      <Button title="Urgent help" style={{minHeight:44,paddingHorizontal:18,backgroundColor:C.orange}} onPress={()=>{setUrgent(true);setEscalate(true);}} />
    </View>
    <Card style={{backgroundColor:C.dark,borderWidth:0,padding:20,overflow:'hidden'}}>
      <View pointerEvents="none" style={{position:'absolute',right:12,top:10,opacity:0.15}}><Svg width={105} height={105} viewBox="0 0 105 105"><Circle cx="52" cy="52" r="42" fill="none" stroke="#E6EDDC" strokeWidth="1.5"/><Path d="M30 47c0-12 9-20 22-20s22 8 22 20-9 20-22 20H42l-12 9v-18" fill="none" stroke="#E6EDDC" strokeWidth="2" strokeLinejoin="round"/><Circle cx="44" cy="48" r="2" fill="#E6EDDC"/><Circle cx="53" cy="48" r="2" fill="#E6EDDC"/><Circle cx="62" cy="48" r="2" fill="#E6EDDC"/></Svg></View>
      <Text style={{color:'#D4E3C9',fontSize:10,fontWeight:'600',letterSpacing:1.2}}>SMARTWASTE ASSISTANT</Text>
      <Text style={{color:'#FFFFFF',fontSize:21,lineHeight:27,fontWeight:'600',marginTop:13,maxWidth:250}}>Let’s get your service back on track.</Text>
      <Text style={{color:'#D4E3D9',fontSize:14,lineHeight:21,marginTop:8,maxWidth:280}}>Ask about your bin, a collection, a wallet payment or a new address.</Text>
    </Card>
    <Text style={[S.eyebrow,{marginTop:24,marginBottom:10}]}>START WITH A TOPIC</Text>
    <View style={{flexDirection:'row',flexWrap:'wrap',gap:9}}>{topics.map(topic=><Pressable key={topic} accessibilityRole="button" disabled={thinking} onPress={()=>ask(topic)} style={({pressed})=>({minHeight:44,justifyContent:'center',paddingHorizontal:14,borderRadius:15,borderWidth:1,borderColor:'#F0D8C8',backgroundColor:'#FFF8F1',opacity:pressed?0.72:1})}><Text style={{color:C.ink,fontSize:12,fontWeight:'500'}}>{topic}</Text></Pressable>)}</View>
    {model.supportMessages.map(message=><View key={message.id} style={{alignSelf:message.role==='customer'?'flex-end':'stretch',maxWidth:message.role==='customer'?'90%':'100%',backgroundColor:message.role==='customer'?C.green:'#FFFFFF',borderWidth:message.role==='customer'?0:1,borderColor:C.line,borderRadius:20,padding:16,marginTop:14,borderBottomRightRadius:message.role==='customer'?7:20,borderBottomLeftRadius:message.role==='assistant'?7:20}}>
      <Text style={{fontSize:10,color:message.role==='customer'?'#D4E2CC':C.orange,fontWeight:'700',letterSpacing:0.6,marginBottom:7}}>{message.role==='customer'?'YOU':'SMARTWASTE CARE'}</Text>
      <Text style={[S.body,{color:message.role==='customer'?'white':C.ink,fontSize:14,lineHeight:21}]}>{message.text}</Text>
    </View>)}
    {thinking?<View accessibilityLiveRegion="polite" style={[S.row,{justifyContent:'flex-start',marginTop:16}]}><ActivityIndicator color={C.orange}/><Text style={S.small}>Checking your service details…</Text></View>:null}
    <Field label="Your message" value={input} onChangeText={setInput} placeholder="Tell us what’s happening…" multiline />
    <Button title="Send message" disabled={thinking||!input.trim()} onPress={()=>ask(input)} style={{marginTop:12}}/>
    <Pressable accessibilityRole="button" onPress={()=>{setUrgent(false);setEscalate(true);}} style={{paddingVertical:18,alignItems:'center'}}><Text style={{color:C.green,fontSize:14,fontWeight:'600'}}>Talk to a person</Text></Pressable>
    <Button title="Submit a detailed service report" variant="outline" onPress={()=>router.push('/report')}/>
    <Sheet visible={escalate} title={ticket?'Support case created':urgent?'Urgent service support':'Connect with the support team'} onClose={()=>{setEscalate(false);setTicket('');}}>
      {ticket?<Confirmation title="Your case is in the queue." detail={`Reference ${ticket}. Your conversation is attached. Find the case in your account.`} onClose={()=>{setEscalate(false);setTicket('');}}/>:<><Text style={S.body}>{urgent?'Skip the assistant and create a priority service case.':'Your conversation will be included so you don’t have to repeat yourself.'}</Text>{urgent?<Notice text="For immediate danger, contact local emergency services directly. This service cannot dispatch an emergency response."/>:null}<Text style={[S.small,{marginTop:16,marginBottom:22}]}>Your case will include the details you have shared and stay visible in your support history.</Text><Button title={urgent?'Create priority case':'Request human support'} onPress={()=>{const ref=report(urgent?'Urgent support':'Human support',model.supportMessages.map(m=>`${m.role}: ${m.text}`).join('\n')||'Customer requested direct support.');setTicket(ref);}}/></>}
    </Sheet>
  </Screen>;
}
