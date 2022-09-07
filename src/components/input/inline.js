import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';
import ErrorMessage from './error';
import { Colors } from '../../constants';

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.white,
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    height: 36,
    flex: 3,
    fontSize: 14
  },
  error: {
    position: 'absolute',
    right: 0
  }
});

class InlineInput extends Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const hasError = nextProps.meta.touched && !nextProps.meta.valid;
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.meta.touched !== this.props.meta.touched ||
      (nextProps.meta.valid !== this.props.meta.valid && hasError) ||
      (nextProps.meta.error !== this.props.meta.error && hasError)
    );
  }

  focus() {
    this.input.focus();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.focus}>
        <View style={[styles.input, this.props.style]}>
          <Text style={styles.label}>
            {this.props.label.toUpperCase()}
          </Text>
          <TextInput
            autoCapitalize={'sentences'}
            ref={c => {
              this.input = c;
            }}
            placeholder={this.props.placeholder}
            style={styles.text}
            onChangeText={this.props.input.onChange}
            underlineColorAndroid="transparent"
            autoGrow
            {...this.props.input}
          />
          {this.props.meta.touched &&
            !this.props.meta.valid &&
            <ErrorMessage style={styles.error} />}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

InlineInput.defaultProps = {
  style: null,
  placeholder: null
};

InlineInput.propTypes = {
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  meta: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  style: PropTypes.any,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

export default InlineInput;
