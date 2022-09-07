import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Colors } from '../../constants';
import ArrowRight from '../../components/icons/arrowRight';
import GroupChatIcon from '../../components/icons/group-chat';

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#D2D2D2',
    marginHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    marginHorizontal: 3,
    flex: 1,
    backgroundColor: 'transparent',
  },

});

class GroupMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onGroupChatPress = this.onGroupChatPress.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return Actions.currentScene === 'ChatMembers';
  }

  onGroupChatPress() {
    Actions.Chat({
      ChatTypeId: 2,
      toEmailId: 'hkkhkhk',
      userOnline: true
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onGroupChatPress}>
        <View style={styles.mainContainer}>

          <View style={styles.groupContainer}>

            <View style={{ marginHorizontal: 5 }}>
              <GroupChatIcon fill="black" width={50} height={50} />
            </View>

            <View style={{ flex: 1, marginHorizontal: 5, backgroundColor: 'transparent' }}>
              <Text style={{ fontSize: 17 }}>{this.props.projectDetail.ProjectName}</Text>
            </View>
            <ArrowRight fill="black" width={24} height={24} />
          </View>

        </View>
      </TouchableOpacity>
    );
  }
}

GroupMember.propTypes = {
};

GroupMember.defaultProps = {
};

export default GroupMember;
