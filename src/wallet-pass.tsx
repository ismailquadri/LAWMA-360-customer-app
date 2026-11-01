import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { Text } from './text';
import { Icon } from './icons';
import { money } from './store';
export function WalletPass({balance,reserved,onAdd,compact=false}:{balance:number;reserved:number;onAdd:()=>void;compact?:boolean}){
 const [hidden,setHidden]=useState(false);
 return <View style={{borderRadius:28,backgroundColor:'#14231D',borderWidth:1,borderColor:'#2D4034',padding:24,marginTop:20,overflow:'hidden'}}>
  <View style={{alignItems:'center'}}><View style={{borderRadius:20,paddingVertical:7,paddingHorizontal:13,backgroundColor:'#2B3C31',flexDirection:'row',gap:8,alignItems:'center'}}><View style={{width:15,height:11,backgroundColor:'white',borderLeftWidth:5,borderRightWidth:5,borderColor:'#008753'}}/><Text style={{fontSize:12,color:'#DCE9DD',fontWeight:'500'}}>NGN wallet</Text></View>
  <View style={{flexDirection:'row',alignItems:'center',marginTop:compact?9:16,gap:4}}><Text style={{fontSize:12,color:'#BCC9BF'}}>Available balance</Text><Pressable accessibilityRole="button" accessibilityLabel={hidden?'Show balance':'Hide balance'} onPress={()=>setHidden(!hidden)} style={{width:44,height:44,alignItems:'center',justifyContent:'center'}}><Icon name="eye" size={17} color="#BCC9BF"/></Pressable></View>
  <Text adjustsFontSizeToFit numberOfLines={1} style={{fontSize:compact?38:44,lineHeight:55,fontWeight:'600',color:'#FCFCF7',letterSpacing:-1.7}}>{hidden?'••••••':money(balance)}</Text><Text style={{fontSize:11,color:'#96AD9E',marginTop:4}}>Ready for your next collection</Text></View>
  <View style={{flexDirection:'row',gap:10,marginTop:25}}>{[{label:'Add money',icon:'plus' as const,action:onAdd,primary:true},{label:'Activity',icon:'activity' as const,action:()=>router.push('/(tabs)/wallet'),primary:false}].map(a=><Pressable key={a.label} accessibilityRole="button" onPress={a.action} style={({pressed})=>({flex:1,minHeight:74,borderRadius:19,backgroundColor:a.primary?'#F5F5ED':'#23362B',borderWidth:1,borderColor:a.primary?'#F5F5ED':'#364A3B',justifyContent:'center',alignItems:'center',gap:7,opacity:pressed?.75:1,transform:[{scale:pressed?.97:1}]})}><Icon name={a.icon} size={20} color={a.primary?'#15251C':'#F5F5ED'}/><Text style={{fontSize:13,fontWeight:'600',color:a.primary?'#15251C':'#F5F5ED'}}>{a.label}</Text></Pressable>)}</View>
  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:12,borderTopWidth:1,borderColor:'#344638',paddingTop:18,marginTop:20}}><Text style={{fontSize:11,color:'#B8CABC',flex:1}}>Set aside for pickups</Text><Text style={{fontSize:14,color:'#F5F5ED',fontWeight:'600'}}>{hidden?'••••':money(reserved)}</Text></View>
 </View>;
}
