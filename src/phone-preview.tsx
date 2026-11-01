import React from 'react';
import { useSegments } from 'expo-router';
import { SheetHost } from './sheet-overlay';
import { Platform, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';
import { C } from './ui';

const phone: Metrics = {
  frame: { x: 0, y: 0, width: 402, height: 874 },
  insets: { top: 58, right: 0, bottom: 34, left: 0 },
};

export function PhonePreview({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowDimensions();
  const segments = useSegments();
  const splash = segments[0] === 'launch' || segments[0] === 'index';
  if (Platform.OS !== 'web') return <>{children}</>;
  if (width <= 600) return <SheetHost><SafeAreaProvider><View style={{ flex: 1, backgroundColor: C.bg }}>{children}</View></SafeAreaProvider></SheetHost>;

  const scale = Math.min(1, (width - 28) / 422, (height - 28) / 894);
  const deviceWidth = 402 * scale;
  const deviceHeight = 874 * scale;

  return (
    <View style={{ flex: 1, backgroundColor: '#E9E8E3', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <View style={{ alignItems: 'center' }}>
      <View style={{ width: deviceWidth + 20 * scale, height: deviceHeight + 20 * scale, borderRadius: 62 * scale, padding: 9 * scale, backgroundColor: '#34302D', borderWidth: 1, borderColor: '#88817B', shadowColor: '#171612', shadowOpacity: 0.24, shadowRadius: 30 * scale, shadowOffset: { width: 0, height: 18 * scale }, elevation: 18 }}>
        <View style={{ flex: 1, borderRadius: 53 * scale, backgroundColor: '#111', padding: 3 * scale, overflow: 'hidden' }}>
          <View style={{ flex: 1, borderRadius: 50 * scale, overflow: 'hidden', backgroundColor: C.bg }}>
            <SheetHost><SafeAreaProvider initialMetrics={phone}>
              <View style={{ flex: 1, paddingTop: splash ? 0 : 58 * scale }}>{children}</View>
            </SafeAreaProvider>
            <View pointerEvents="none" style={{ position: 'absolute', zIndex: 20, top: 0, left: 0, right: 0, height: 56 * scale, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingTop: 13 * scale, paddingHorizontal: 28 * scale }}>
              <Text style={{ opacity: splash ? 0 : 1, color: '#1A211D', fontSize: 14 * scale, lineHeight: 17 * scale, fontWeight: '700' }}>9:41</Text>
              <View style={{ position: 'absolute', alignSelf: 'center', top: 8 * scale, left: '50%', marginLeft: -65 * scale, width: 130 * scale, height: 36 * scale, borderRadius: 22 * scale, backgroundColor: '#050505', borderWidth: 1, borderColor: '#292929', alignItems: 'flex-end', justifyContent: 'center', paddingRight: 13 * scale }}>
                <View style={{ width: 7 * scale, height: 7 * scale, borderRadius: 4 * scale, backgroundColor: '#101722', borderWidth: 1, borderColor: '#253140' }} />
              </View>
              <View style={{ opacity: splash ? 0 : 1, flexDirection: 'row', alignItems: 'center', gap: 5 * scale, height: 18 * scale }}>
                <View style={{ height: 8 * scale, flexDirection: 'row', alignItems: 'flex-end', gap: 1.5 * scale }}>
                  {[4, 6, 8, 10].map((h, i) => <View key={i} style={{ width: 2.5 * scale, height: h * scale, borderRadius: 1, backgroundColor: '#1A211D' }} />)}
                </View>
                <Text style={{ color: '#1A211D', fontSize: 12 * scale, fontWeight: '700' }}>Wi‑Fi</Text>
                <View style={{ width: 19 * scale, height: 10 * scale, borderRadius: 3 * scale, borderWidth: 1 * scale, borderColor: '#1A211D', padding: 1.5 * scale, justifyContent: 'center' }}><View style={{ width: '82%', height: '100%', backgroundColor: '#1A211D', borderRadius: 1 }} /></View>
              </View>
            </View>
            <View pointerEvents="none" style={{ position: 'absolute', zIndex: 60, bottom: 8 * scale, alignSelf: 'center', width: 135 * scale, height: 5 * scale, borderRadius: 5 * scale, backgroundColor: '#111' }} />
            </SheetHost>
          </View>
        </View>
        <View pointerEvents="none" style={{ position: 'absolute', left: -2 * scale, top: 138 * scale, width: 3 * scale, height: 58 * scale, borderRadius: 2 * scale, backgroundColor: '#625B55' }} />
        <View pointerEvents="none" style={{ position: 'absolute', left: -2 * scale, top: 210 * scale, width: 3 * scale, height: 38 * scale, borderRadius: 2 * scale, backgroundColor: '#625B55' }} />
        <View pointerEvents="none" style={{ position: 'absolute', left: -2 * scale, top: 258 * scale, width: 3 * scale, height: 38 * scale, borderRadius: 2 * scale, backgroundColor: '#625B55' }} />
        <View pointerEvents="none" style={{ position: 'absolute', right: -2 * scale, top: 212 * scale, width: 3 * scale, height: 82 * scale, borderRadius: 2 * scale, backgroundColor: '#625B55' }} />
      </View>
      <Text style={{ marginTop: 12 * scale, color: '#6F706C', fontSize: 9 * scale, fontWeight: '600', letterSpacing: 2 * scale }}>IPHONE 17 PRO · CUSTOMER APP</Text>
      </View>
    </View>
  );
}
