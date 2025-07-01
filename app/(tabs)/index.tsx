import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={ styles.view } >
      <Text>The posts will be shown here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});