import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Colors } from '../../constants';
import ArrowRight from '../../components/icons/arrowRight';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Ripple from 'react-native-material-ripple';
import PersonIcon from '../../components/icons/person';

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 20,
    flex: 1,
    display: 'flex',
    backgroundColor: 'transparent'
  },
  groupContainer: {
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    width: '100%',
    backgroundColor: 'transparent'
  },
  cellContainer: {
    flex: 1,
    marginHorizontal: 2,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D2D2D2',
    marginBottom: 10,
  },
  thumbImage: {
    width: 80,
    height: 80,
    backgroundColor: 'red'
  },
  listView: {
    flex: 1,
    flexGrow: 1,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'transparent'
  }
});

class IndividualMember extends Component {
  constructor(props) {
    super(props)

    this.renderListItem = this.renderListItem.bind(this)
    this.onIndvidualChatPress = this.onIndvidualChatPress.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return Actions.currentScene === 'ChatMembers'
  }

  onIndvidualChatPress(data) {
    Actions.Chat({
      ChatTypeId: 1,
      toEmailId: data.Email,
      userOnline: data.Status === 'False' ? false : true
    });
  }


  renderListItem(data) {

    const { FirstName, LastName, UserId, Status } = data.item
    let imageURI = null

    let color = 'black'
    if (Status === "True")
      color = 'green'

    return (
      <View style={styles.cellContainer} key={UserId}>
        <Ripple rippleOpacity={0.1} onPress={() => { this.onIndvidualChatPress(data.item) }}>

          <View style={styles.groupContainer}>
            {imageURI &&
              <Image style={styles.thumbImage}
                source={{ uri: imageURI }}
                indicator={Progress.Pie}
                indicatorProps={{
                  size: 40,
                  borderWidth: 0,
                  color: Colors.appThemeColor,
                  unfilledColor: 'rgba(200, 200, 200, 0.2)'
                }}
              />
              || <PersonIcon fill={color} width={50} height={50} />
            }


            <View style={{ flex: 1, marginHorizontal: 5, backgroundColor: 'transparent' }}>
              <Text style={{ color: 'black', fontSize: 17 }}>{FirstName} {LastName}</Text>
            </View>

            <View style={{ marginRight: 5, backgroundColor: 'transparent', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <ArrowRight fill="black" width={24} height={24} />
            </View>

          </View>
        </Ripple>

      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.props.arrChatUser}
          keyExtractor={item => item.UserId}
          renderItem={this.renderListItem}
          style={styles.listView}
          removeClippedSubviews={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={21}
        />
      </View>
    );
  }
}



IndividualMember.propTypes = {
};

IndividualMember.defaultProps = {
};

export default IndividualMember
