import { Text, View, StyleSheet } from 'react-native';

export default function Admin() {
  return (
    <View style={styles.view}>
      <Text>Admin Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});