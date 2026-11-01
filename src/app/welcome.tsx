import { Text } from '../text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { useStore } from '../store';
import { photos, useReducedMotion } from '../ui';

const slides = [
  { photo: photos.home, tag: 'YOUR HOME IS CONNECTED.', title: 'A cleaner home.\nOne less worry.', text: 'Your household’s waste service, from the first bin to the next collection.', label: 'Resident at home beside a smart waste bin' },
  { photo: photos.delivery, tag: 'A BIN FOR YOUR BUILDING', title: 'From our hands\nto your doorstep.', text: 'Request smart bins for your home. Your service partner takes care of delivery.', label: 'A collection partner delivering a bin to a resident' },
  { photo: photos.collection, tag: 'COLLECTION, MADE CLEAR', title: 'Know who’s coming.\nKnow what’s next.', text: 'Choose a local partner, request a pickup and follow every step. All in one place.', label: 'Collection crew loading a household waste bin' },
];
const onboardingOrange = '#F2630B';

export default function Welcome() {
  const { width } = useWindowDimensions();
  const [w, setWidth] = useState(width);
  const [page, setPage] = useState(0);
  const pager = useRef<ScrollView>(null);
  const reduced = useReducedMotion();
  const { model, premise } = useStore();
  const finish = async () => {
    await AsyncStorage.setItem('sw360-welcome-v2', 'seen').catch(() => undefined);
    router.replace(model.name && model.premiseId ? '/(tabs)' : '/setup');
  };
  const selectPage = (next: number) => {
    setPage(next);
    pager.current?.scrollTo({ x: w * next, animated: reduced === false });
  };

  return <SafeAreaView onLayout={event => { const nextWidth = event.nativeEvent.layout.width; setWidth(nextWidth); pager.current?.scrollTo({ x: page * nextWidth, animated: false }); }} edges={[]} style={{ flex: 1, backgroundColor: onboardingOrange, overflow: 'hidden' }}>
    <ScrollView ref={pager} horizontal pagingEnabled showsHorizontalScrollIndicator={false} onMomentumScrollEnd={e => setPage(Math.round(e.nativeEvent.contentOffset.x / w))} style={{ flex: 1 }}>
      {slides.map((slide, i) => <View key={slide.tag} accessibilityElementsHidden={page !== i} importantForAccessibility={page === i ? 'auto' : 'no-hide-descendants'} style={{ width: w, height: '100%', backgroundColor: onboardingOrange, overflow: 'hidden' }}>
        <Image source={slide.photo} accessibilityLabel={slide.label} resizeMode="cover" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '76%' }} />
        <Svg pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '76%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
          <Defs><LinearGradient id={`welcomeWash${i}`} x1="0" y1="0" x2="0" y2="1"><Stop offset="0%" stopColor={onboardingOrange} stopOpacity="0.08"/><Stop offset="42%" stopColor={onboardingOrange} stopOpacity="0.16"/><Stop offset="76%" stopColor={onboardingOrange} stopOpacity="0.92"/><Stop offset="100%" stopColor={onboardingOrange} stopOpacity="1"/></LinearGradient></Defs>
          <Rect width="100" height="100" fill={`url(#welcomeWash${i})`} />
        </Svg>
        <View style={{ position: 'absolute', top: 24, left: 36, right: 36, flexDirection: 'row', gap: 6 }}>
          {slides.map((s, index) => <Pressable key={s.tag} accessibilityRole="button" accessibilityLabel={`Go to welcome screen ${index + 1}`} accessibilityState={{ selected: page === index }} onPress={() => selectPage(index)} style={{ height: 5, flex: 1, borderRadius: 4, backgroundColor: index <= page ? '#FF6B17' : '#FFFFFFE8' }} />)}
        </View>
        <View style={{ position: 'absolute', left: 28, right: 28, bottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 17 }}>
            <Text style={{ color: '#FFF8EF', fontSize: 12, fontWeight: '500', letterSpacing: 0.7 }}>{slide.tag}</Text>
            <Text style={{ color: '#FFF8EF', fontSize: 12, fontWeight: '500' }}>{premise ? `${premise.area}, Lagos` : ''}</Text>
          </View>
          <Text accessibilityRole="header" style={{ color: '#FFFFFF', fontSize: w < 370 ? 32 : 35, lineHeight: w < 370 ? 37 : 40, fontWeight: '700', letterSpacing: -1 }}>{slide.title}</Text>
          <Text style={{ color: '#FFF8EF', fontSize: 15, lineHeight: 22, marginTop: 14, maxWidth: 350 }}>{slide.text}</Text>
          <Pressable accessibilityRole="button" onPress={() => page === 2 ? finish() : selectPage(page + 1)} style={({ pressed }) => ({ backgroundColor: '#FFFFFF', marginTop: 27, minHeight: 64, borderRadius: 22, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}><Text style={{ color: onboardingOrange, fontSize: 17, fontWeight: '600' }}>{page === 2 ? 'Let’s get started' : 'Continue'}  →</Text></Pressable>
          <View style={{ alignItems: 'center', marginTop: 4 }}><Pressable accessibilityRole="button" onPress={finish} hitSlop={12} style={{ minHeight: 38, justifyContent: 'center', paddingHorizontal: 4 }}><Text style={{ color: '#FFF8EF', fontSize: 13, fontWeight: '600' }}>Skip</Text></Pressable></View>
        </View>
      </View>)}
    </ScrollView>
  </SafeAreaView>;
}
