import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  ActivityIndicator
} from 'react-native';
import {  Colors } from '../../constants';

const styles = StyleSheet.create({
  response: {
    display: 'flex',
     justifyContent: 'space-between',
    backgroundColor: 'transparent',
    shadowColor: 'rgba(0, 0, 0, 0.09)',
    shadowOffset: {
      width: 0,
      height: 0.5
    },
    shadowRadius: 23,
    shadowOpacity: 1,
    flexDirection: 'row',
  },
  textBox: {
    // ...Fonts.normal,
    lineHeight: 20,
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    paddingTop: 8,
    width: '100%',
    color: '#000',
  },
  textBoxReadOnly: {
    color: '#a5a5a5',
  },
  textBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    paddingLeft: 15,
    paddingRight: 0,
    borderRadius: 7,
    flex:1,
    backgroundColor: 'transparent'
  },
  sendButton: {
    borderColor: 'black',
    borderWidth: 0,
    height: '100%',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton: {
    borderColor: 'black',
    borderWidth: 0,
    height: '100%',
    width: 40,
    marginTop:5,
    marginLeft:10,

  }
});

class Input extends PureComponent {
  constructor(props) {
    super(props);
    this.updateSize = this.updateSize.bind(this);
    this.state = {
      height: 40
    };
  }

  updateSize(e) {
    const extraHeight = Platform.OS === 'ios' ? 18 : 0;
    const { contentSize } = e.nativeEvent;
    if (contentSize.height && contentSize.height < 230) {
      this.setState({
        height: contentSize.height + extraHeight
      });
    }
  }

  render() {
    return (
      <View style={styles.response}>
        <View style={[styles.textBoxContainer, { height: this.state.height }]}>
          <TextInput
            style={[
              styles.textBox,
              this.props.isSending ? styles.textBoxReadOnly : {}
            ]}
            underlineColorAndroid="transparent"
            placeholder="Type something..."
            placeholderTextColor={'rgba(37, 37, 37, 0.5)'}
            editable={!this.props.isSending}
            value={this.props.message}
            onContentSizeChange={this.updateSize}
            multiline
            onChangeText={this.props.onChangeText}
          />
          {this.props.isSending
            ? <View style={styles.sendButton}>
              <ActivityIndicator animating color={'black'} size="small" />
            </View>
            : <TouchableOpacity
              style={styles.sendButton}
              onPress={this.props.onMessageSend}
            >
            </TouchableOpacity>}
        </View>

      </View>
    );
  }
}

Input.propTypes = {
  isSending: PropTypes.bool,
  message: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
};

Input.defaultProps = {
  isSending: false,
  message: ''
};

export default Input;
