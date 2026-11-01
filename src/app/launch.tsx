import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Image, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop, SvgXml } from 'react-native-svg';
import { whiteLogo, lawmaSymbol, lawmaWordmark, lawmaCaption, rule } from '../splash-assets';
import { useStore } from '../store';
import { useReducedMotion } from '../ui';
import { Text } from '../text';

export default function Launch() {
  const params = useLocalSearchParams();
  const { model, ready } = useStore();
  const [progress] = useState(() => new Animated.Value(0));
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(false);
  useEffect(() => { if (reduced === undefined) return; Animated.timing(progress, { toValue: 1, duration: reduced ? 0 : 1200, useNativeDriver: true }).start(); const timer = setTimeout(() => setElapsed(true), 3200); return () => clearTimeout(timer); }, [progress, reduced]);
  useEffect(() => { if (!ready || !elapsed) return; let active = true; AsyncStorage.getItem('sw360-welcome-v2').catch(() => null).then(seen => { if (active) router.replace(params.intro === '1' || !seen ? '/welcome' : model.name && model.premiseId ? '/(tabs)' : '/setup'); }); return () => { active = false; }; }, [ready, elapsed, model.name, model.premiseId, params.intro]);
  return <View style={{ flex: 1, backgroundColor: '#EF6200', overflow: 'hidden' }}>
    <Image source={require('../../assets/splash/bins.png')} accessibilityLabel="Smart waste bins at a Lagos residence" resizeMode="stretch" style={{ position: 'absolute', left: '-111.01%', top: '-85.83%', width: '304.45%', height: '187.22%' }} />
    <Svg pointerEvents="none" style={{ position: 'absolute', top: '-1.89%', left: 0, width: '100%', height: '101.89%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
      <Defs><LinearGradient id="splashWash" x1="0%" y1="0%" x2="0%" y2="100%"><Stop offset="0%" stopColor="#893800" stopOpacity="0"/><Stop offset="68.623%" stopColor="#EF6200" stopOpacity="1"/></LinearGradient></Defs><Rect width="100" height="100" fill="url(#splashWash)" />
    </Svg>
    <View style={{ position: 'absolute', top: '50%', left: 0, right: 0, marginTop: -29, height: 58, alignItems: 'center', overflow: 'hidden' }}>
      <Animated.View accessibilityLabel="SmartWaste360" style={{ opacity: progress, transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [58, 0] }) }] }}>
        <SvgXml xml={whiteLogo} />
      </Animated.View>
    </View>
    <View style={{ position: 'absolute', top: '89.56%', alignSelf: 'center', width: 112, gap: 7 }}>
      <View style={{ flexDirection: 'row', gap: 7.596, alignItems: 'center' }}>
        <SvgXml xml={lawmaSymbol} />
        <View style={{ gap: 3.292 }}><SvgXml xml={lawmaWordmark} /><SvgXml xml={lawmaCaption} /></View>
      </View>
      <View style={{ gap: 2 }}><SvgXml xml={rule} /><Text numberOfLines={1} style={{ color: '#FFFFFF', fontSize: 10, lineHeight: 11.77, letterSpacing: 0.4 }}>Powered by LAWMA</Text><SvgXml xml={rule} /></View>
    </View>
  </View>;
}
