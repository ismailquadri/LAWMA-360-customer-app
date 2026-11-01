import { Text } from '../text';
import { router } from 'expo-router';
import { View } from 'react-native';
import { money, useStore } from '../store';
import { Back, Card, Header, S, Screen } from '../ui';

export default function Handoff() {
  const { model, premise, partner } = useStore();
  const pickup = model.pickups[0], bin = model.bins[0], issue = model.issues[0];
  const rows = [
    { who: 'Customer', title: 'My home and service', detail: `${premise?.address || 'No home'} · ${bin ? `${model.bins.length} bin(s), ${bin.state.toLowerCase()}` : 'bin needed'} · ${pickup ? `pickup ${pickup.status.toLowerCase()}` : 'no pickup yet'}` },
    { who: 'Collection partner', title: partner?.name || 'No partner selected', detail: partner ? `${bin ? `Bin fulfilment: ${bin.state}` : 'Bin request not submitted'} · ${pickup ? `Pickup ${pickup.id}: ${pickup.status}` : 'No pickup request'}` : 'An eligible partner will appear when coverage opens.' },
    { who: 'LAWMA', title: 'Service assurance', detail: `${premise?.id || 'No premise ID'} · ${partner?.id || 'No provider'} · ${pickup ? `${pickup.id}, ${money(pickup.amount)}` : 'no pickup'} · ${issue ? `${issue.id} open` : 'no open case'}` },
  ];
  return <Screen><Back onPress={() => router.back()} label="Account" /><Header eyebrow="CONNECTED SERVICE RECORD" title="One request. Three clear views." sub="This is how the same customer action would flow to the collection partner and LAWMA." />
    {rows.map((r, i) => <Card key={r.who}><Text style={S.eyebrow}>{`${i + 1} / ${r.who}`}</Text><Text style={S.heading}>{r.title}</Text><Text style={[S.body, { marginTop: 9 }]}>{r.detail}</Text></Card>)}
    <View style={[S.hero, { marginTop: 23 }]}><Text style={[S.heroTitle,{fontSize:23,lineHeight:29}]}>One clear service record.</Text><Text style={S.heroBody}>In the live product, these records require a shared backend, authenticated roles and event delivery. This screen demonstrates the intended handoff using the customer’s current service record.</Text></View>
  </Screen>;
}
