import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../store';
import { C, useReducedMotion } from '../../ui';
import { Icon, IconName } from '../../icons';
const icons: Record<string,IconName> = { index:'home',bins:'bins',wallet:'wallet',activity:'activity',more:'you' };
export default function TabLayout() {
 const inset = useSafeAreaInsets(); const reduced = useReducedMotion(); const {model,ready}=useStore(); if(!ready)return <View style={{flex:1,justifyContent:'center'}}><ActivityIndicator color={C.green}/></View>; if(!model.name || !model.premiseId)return <Redirect href="/setup"/>;
 return <Tabs screenOptions={({route})=>({headerShown:false,animation:reduced===false?'fade':'none',tabBarActiveTintColor:C.ink,tabBarInactiveTintColor:C.muted,tabBarStyle:{position:'absolute',bottom:Math.max(inset.bottom,12),left:0,right:0,marginHorizontal:16,height:76,borderRadius:26,paddingTop:8,paddingBottom:9,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#E9EBE3',shadowColor:'#143C2A',shadowOpacity:.08,shadowRadius:16,shadowOffset:{width:0,height:5},elevation:5},tabBarLabelStyle:{fontFamily:'DM_Medium',fontSize:11,marginTop:2},tabBarIcon:({focused})=><View style={{width:44,height:32,borderRadius:13,alignItems:'center',justifyContent:'center',backgroundColor:focused?C.peach:'transparent'}}><Icon name={icons[route.name]} size={22} color={focused?C.orange:C.muted}/></View>})}><Tabs.Screen name="index" options={{title:'Home'}}/><Tabs.Screen name="bins" options={{title:'Bins'}}/><Tabs.Screen name="wallet" options={{title:'Wallet'}}/><Tabs.Screen name="activity" options={{title:'Activity'}}/><Tabs.Screen name="more" options={{title:'You'}}/></Tabs>;
}
