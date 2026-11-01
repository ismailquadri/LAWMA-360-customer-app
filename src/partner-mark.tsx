import { Text } from './text';
import { View } from 'react-native';

const colors = ['#D8E9D3', '#F3E0D4', '#D9E7E6', '#E7E3F1', '#F0E8CD', '#DCE8D7', '#D7E2F0', '#F2DDDC'];

export function PartnerMark({ name, size = 52 }: { name: string; size?: number }) {
  const index = Math.abs([...name].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % colors.length;
  const initials = name.split(/\s+/).filter(word => !['and', 'the', 'services', 'co.'].includes(word.toLowerCase())).slice(0, 2).map(word => word[0]).join('').toUpperCase();
  return <View accessibilityLabel={`${name} logo`} style={{ width: size, height: size, borderRadius: size * 0.32, backgroundColor: colors[index], alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#FFFFFF' }}>
    <View style={{ width: size * 0.48, height: size * 0.48, borderRadius: size * 0.24, backgroundColor: '#FFFFFFA8', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#174A37', fontSize: size * 0.23, fontWeight: '700', letterSpacing: -0.5 }}>{initials}</Text></View>
    <View style={{ position: 'absolute', bottom: size * 0.12, right: size * 0.12, width: size * 0.12, height: size * 0.12, borderRadius: size, backgroundColor: '#E56322', borderWidth: 1, borderColor: colors[index] }} />
  </View>;
}
