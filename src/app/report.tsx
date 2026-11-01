import { Text } from '../text';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { useStore } from '../store';
import { Back, Button, C, Field, Header, Notice, S, Screen, Success } from '../ui';
const types = ['Missed pickup', 'Bin damaged or missing', 'Payment question', 'Partner conduct', 'Other service issue'];
export default function Report() {
  const { report, premise } = useStore(); const [type, setType] = useState(types[0]); const [detail, setDetail] = useState(''); const [message, setMessage] = useState(''); const [reference, setReference] = useState('');
  return <Screen><Back onPress={() => router.back()} /><Header eyebrow="WE’RE HERE TO HELP" title="Let’s put it right." sub="Tell us what happened. Your report will stay linked to your home’s service record." /><Text style={[S.small, { marginTop: 12, marginBottom: 10 }]}>{premise?.address}</Text>{types.map(t => <Pressable key={t} accessibilityRole="radio" accessibilityState={{ checked: type === t }} onPress={() => setType(t)} style={[S.row, { paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: C.line }]}><Text style={S.body}>{t}</Text><Text style={{ color: C.green }}>{type === t ? '●' : '○'}</Text></Pressable>)}<Field label="What would you like us to know?" value={detail} onChangeText={setDetail} placeholder="Tell us a little about the issue…" multiline /><Button title="Send report" style={{ marginTop: 24 }} onPress={() => { if (detail.trim().length < 8) { setMessage('Add a few details so the team can understand the issue.'); return; } setReference(report(type, detail)); }} />{message ? <Notice text={message} /> : null}<Text style={[S.small, { marginTop: 18 }]}>You can follow updates to this report in your account.</Text><Success visible={!!reference} title="We’ve recorded your concern." detail={`Your reference is ${reference}. You can find this report and its status in your account.`} action="View my reports" onClose={() => { setReference(''); router.replace('/(tabs)/more'); }} /></Screen>;
}
