import React from 'react';
import { Text, View, StyleSheet , ActivityIndicator} from 'react-native';
import { Colors } from '../../constants';

const styles = StyleSheet.create({
  chat: {
    flex: 1,
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicator: {
    backgroundColor: "transparent",
    flex: 1
  }
});

const LoadingChat = () => (
  <View style={styles.chat}>
    <ActivityIndicator
          color={Colors.black}
          animating
          style={styles.indicator}
          size="large"
        />
  </View>
);

export default LoadingChat;
