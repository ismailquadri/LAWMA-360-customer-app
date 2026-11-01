import { Text } from '../../text';
import { WalletPass } from '../../wallet-pass';
import { router } from 'expo-router';
import { Image, Pressable, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { PartnerMark } from '../../partner-mark';
import { money, useStore } from '../../store';
import { BinArt, C, ListRow, photos, S, Screen, TextButton } from '../../ui';

export default function Home() {
  const { model, premise, partner } = useStore();
  const active = model.bins.some(b => b.state === 'Active');
  const pickup = model.pickups[0];
  const open = pickup && !['Completed', 'Declined', 'Cancelled'].includes(pickup.status);
  const discovering = !partner && !!model.discoveryUntil;
  const orangeHero = !partner;
  const title = !partner ? discovering ? 'Your partners\nare almost ready.' : 'Your partners\nare ready.' : !active ? 'From our hands\nto your doorstep.' : open ? 'Your pickup\nis in progress.' : 'Let’s make room\nfor a cleaner day.';
  const action = !partner ? 'Choose a partner' : !active ? 'Get my home ready' : open ? 'Track my pickup' : 'Request a pickup';
  const photo = !partner ? photos.delivery : !active ? photos.delivery : photos.collection;

  return <Screen>
    <View style={S.row}>
      <View><Text style={{ color: C.muted, fontSize: 10, letterSpacing: 1.4, fontWeight: '600' }}>MY RESIDENCE</Text><Text style={[S.body, { fontWeight: '600', marginTop: 4 }]}>{premise?.address || 'Your home'}</Text></View>
      <Pressable accessibilityRole="button" accessibilityLabel="Open my account" onPress={() => router.push('/(tabs)/more')} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: C.pale, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: C.green, fontWeight: '600' }}>{model.name.split(' ').map(n => n[0]).join('').slice(0, 2) || 'ME'}</Text></Pressable>
    </View>
    <Text style={[S.title, { fontSize: 27, marginTop: 25 }]}>Hello, {model.name.split(' ')[0] || 'neighbour'}.</Text>
    <Text style={[S.small, { marginTop: 4, fontSize: 14 }]}>A little less waste. A little more peace of mind.</Text>

    <View style={{ aspectRatio: 702 / 875, borderRadius: 27, overflow: 'hidden', marginTop: 22, backgroundColor: orangeHero ? '#F26313' : '#064834' }}>
      <Image source={photo} accessibilityLabel={!partner ? 'A resident and collection partner beside a smart waste bin' : !active ? 'A collection partner delivering bins to a resident' : 'Collection crew loading a household waste bin'} resizeMode="cover" style={{ position: 'absolute', left: '-7.5%', top: '-12%', width: '115%', height: '115%' }} />
      <Svg pointerEvents="none" style={{ position: 'absolute', width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <Defs><LinearGradient id="homeHeroWash" x1="0%" y1="0%" x2="0%" y2="100%"><Stop offset="0%" stopColor={orangeHero ? '#E65C00' : '#003D30'} stopOpacity="0.10"/><Stop offset="35%" stopColor={orangeHero ? '#E65C00' : '#003D30'} stopOpacity="0.40"/><Stop offset="70%" stopColor={orangeHero ? '#E65C00' : '#003D30'} stopOpacity="1"/><Stop offset="100%" stopColor={orangeHero ? '#E65C00' : '#003D30'} stopOpacity="1"/></LinearGradient></Defs>
        <Rect width="100" height="100" fill="url(#homeHeroWash)" />
      </Svg>
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 22, paddingTop: 23, paddingBottom: 18 }}>
        <View>
        <View style={[S.row, { marginBottom: 17 }]}><Text style={{ color: '#FFF7EE', fontSize: 11, fontWeight: '500', letterSpacing: 0.8 }}>{open ? pickup.status.toUpperCase() : !partner ? 'YOUR NEXT STEP' : !active ? 'A BIN FOR YOUR BUILDING' : 'COLLECTION AT YOUR DOOR'}</Text><View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}><Svg width={15} height={18} viewBox="0 0 24 28"><Path d="M12 0C5.8 0 1 4.8 1 11c0 8 11 17 11 17s11-9 11-17C23 4.8 18.2 0 12 0Z" fill="white"/><Circle cx="12" cy="10.5" r="4" fill={orangeHero ? '#F26313' : '#003D30'}/></Svg><Text style={{ color: '#FFFFFF', fontSize: 13 }}>{premise?.area}</Text></View></View>
          <Text accessibilityRole="header" style={{ color: '#FFFFFF', fontSize: 28, lineHeight: 31, fontWeight: '700', letterSpacing: -0.7 }}>{title}</Text>
          <Text style={{ color: '#FFF7EE', fontSize: 15, lineHeight: 22, marginTop: 11 }}>{!partner ? discovering ? 'Checking collection coverage for your address. We’ll show your local options shortly.' : 'Compare collection partners serving your address and choose the right fit.' : !active ? 'Request smart bins for your residence. Your service partner takes care of delivery.' : open ? `${pickup.partner} has your request. See what happens next.` : `${partner.name} · from ${money(partner.charge)} per collection.`}</Text>
          <Pressable accessibilityRole="button" accessibilityLabel={action} onPress={() => router.push(!partner ? '/provider' : !active ? '/(tabs)/bins' : open ? '/(tabs)/activity' : '/pickup')} style={({ pressed }) => ({ marginTop: 28, minHeight: 54, backgroundColor: '#FFFFFF', borderRadius: 21, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.84 : 1 })}><Text style={{ color: orangeHero ? '#EF6511' : '#07513B', fontSize: 17, fontWeight: '600' }}>{action}</Text></Pressable>
        </View>
      </View>
    </View>

    <WalletPass balance={model.balance} reserved={model.reserved} compact onAdd={() => router.push('/(tabs)/wallet?topup=1')} />
    <Pressable accessibilityRole="button" accessibilityLabel="View household bins" onPress={() => router.push('/(tabs)/bins')} style={({ pressed }) => ({ minHeight: 116, borderRadius: 24, backgroundColor: '#EEF0E3', overflow: 'hidden', marginTop: 15, justifyContent: 'center', opacity: pressed ? 0.88 : 1 })}>
      <View pointerEvents="none" style={{ position: 'absolute', right: 3, bottom: -47, opacity: 0.14 }}><BinArt size={184} /></View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, gap: 15 }}>
        <View style={{ width: 72, height: 78, borderRadius: 20, backgroundColor: '#F5F7E5', alignItems: 'center', justifyContent: 'center' }}><BinArt size={62} /></View>
        <View style={{ flex: 1 }}><Text style={[S.heading, { fontSize: 19 }]}>{model.bins.length ? `${model.bins.length} household bins` : 'My smart bins'}</Text><Text style={[S.small, { marginTop: 6 }]}>{model.bins.length ? active ? 'View your allocation' : 'Delivery in progress' : 'Start an allocation'}  ›</Text></View>
      </View>
    </Pressable>

    <View style={[S.row, { marginTop: 23 }]}><Text style={S.heading}>Your service partner</Text><TextButton title="Manage" onPress={() => router.push('/provider')} /></View>
    <Pressable accessibilityRole="button" accessibilityLabel="View service partner options" onPress={() => router.push('/provider')} style={{ marginTop: 5, borderWidth: 1, borderColor: C.line, borderRadius: 22, backgroundColor: '#FFFFFF', minHeight: 91, paddingHorizontal: 17, paddingVertical: 15, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <View style={{ flex: 1 }}><Text style={[S.body, { fontWeight: '600' }]}>{partner?.name || (discovering ? 'Checking your area…' : 'Partners available')}</Text><Text style={[S.small, { marginTop: 5 }]}>{partner ? `Next available · ${partner.eta}` : discovering ? 'Matching trusted local services to your address.' : 'Choose from providers serving your address.'}</Text></View>
      {partner ? <PartnerMark name={partner.name} size={58} /> : <View pointerEvents="none" style={{ width: 64, height: 52, alignItems: 'center', justifyContent: 'center' }}><Svg width={62} height={48} viewBox="0 0 62 48"><Path d="M5 36C18 36 18 12 31 12s13 24 26 24" fill="none" stroke="#D5E2CF" strokeWidth="3" strokeLinecap="round"/><Circle cx="5" cy="36" r="4" fill={C.orange}/><Circle cx="31" cy="12" r="4" fill={C.green}/><Circle cx="57" cy="36" r="4" fill={C.orange}/></Svg></View>}
    </Pressable>
    <View style={{ marginTop: 14 }}><ListRow title="Something not right?" detail="We’re here to help with your service." right="Get help" onPress={() => router.push('/support')} /></View>
  </Screen>;
}
