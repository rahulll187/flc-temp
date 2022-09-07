import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ArrowHeadIcon, BubbleIcon } from '../icons';
import AnimatedBar from '../animated-bar';
import { Colors } from '../../constants'

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    height: 133.5,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
    backgroundColor: Colors.white
  },
  listItemIcon: {
    marginLeft: 20,
    marginRight: 20
  },
  listItemDetails: {
    flex: 1
  },
  listItemDetailsHeader: {
    flexDirection: 'row',
    marginBottom: 7
  },
  listItemSubject: {
    marginTop: 5
  },
  listItemMessage: {
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'relative',
    maxHeight: 35,
    marginTop: 10,
    overflow: 'hidden'
  },
  listItemIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 60,
    paddingRight: 10
  }
});

export default () => {
  const listItems = [];

  for (let i = 0; i < 6; i++) {
    listItems.push(
      <View key={i} style={styles.listItem}>
        <BubbleIcon style={styles.listItemIcon} fill="#bbbbbb" width="40" height="46" />
        <View style={styles.listItemDetails}>
          <View style={styles.listItemDetailsHeader}>
            <AnimatedBar style={{ marginRight: 20 }} duration={1000} height={10} width={50} backgroundColor={'#E5E4E4'} />
            <AnimatedBar duration={1000} height={10} width={80} backgroundColor={'#E5E4E4'} />
          </View>
          <View style={styles.listItemSubject}>
            <AnimatedBar duration={1000} height={15} width={200} backgroundColor={'rgba(25, 25, 25, 0.3)'} />
          </View>
          <View style={styles.listItemMessage}>
            <AnimatedBar duration={1000} height={30} width={180} backgroundColor={'#E5E4E4'} />
          </View>
        </View>
        <View style={styles.listItemIndicator}>
          <ArrowHeadIcon fill="#a0a0a0" width="12" height="12" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {listItems}
    </View>
  );
};
