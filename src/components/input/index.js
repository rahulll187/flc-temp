import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import ErrorMessage from './error';
import { Colors } from '../../constants';

const styles = StyleSheet.create({
  input: {
    height: 70,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    display: 'flex',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    height: 46,
    marginLeft: 10,
    marginRight: 17,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {
    flex: 12,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  label: {
    fontSize: 10,
    color: Colors.borderColor
  },
  text: {
    width: '100%',
    // height: 36,
    lineHeight: 18,
    zIndex: 1,
    paddingBottom: 0,
    paddingTop: 8,
    paddingLeft: 0,
  },
  readonly: {
    color: '#a5a5a5'
  }
});

class Input extends Component {


  shouldComponentUpdate(nextProps) {
    const hasError = nextProps.meta.touched && !nextProps.meta.valid;
    return nextProps.input.value !== this.props.input.value
      || nextProps.meta.touched !== this.props.meta.touched
      || (nextProps.meta.valid !== this.props.meta.valid && hasError)
      || (nextProps.meta.error !== this.props.meta.error && hasError);
  }


  render() {
    const hasError = this.props.meta.touched && !this.props.meta.valid;
    const longError = hasError && this.props.meta.error.length > 60;
    return (
      <View
        style={[
          styles.input,
          { height: hasError ? (longError ? 128 : 98) : 70 },
          this.props.style
        ]}
      >
        <View style={styles.icon}>
          {this.props.icon}
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.label}>
            {this.props.label.toUpperCase()}
          </Text>
          <TextInput
            multiline = {false}
            placeholderTextColor={'#b2b2b2'}
            secureTextEntry={this.props.masked}
            placeholder={this.props.placeholder}
            editable={this.props.editable}
            autoCapitalize={this.props.autoCapitalize}
            maxLength={this.props.maxLength}
            keyboardType={this.props.keyboardType}
            style={[styles.text, this.props.editable ? {} : styles.readonly]}
            onChangeText={this.props.input.onChange}
            underlineColorAndroid="transparent"
            autoGrow
            {...this.props.input}
          />
          {hasError && <ErrorMessage message={this.props.meta.error} />}
        </View>
      </View>
    );
  }
}

Input.defaultProps = {
  style: null,
  masked: false,
  placeholder: '',
  editable: true,
  keyboardType: 'default',
  autoCapitalize: 'sentences',
  maxLength: null
};

Input.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  style: PropTypes.any,
  icon: PropTypes.element.isRequired,
  masked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  editable: PropTypes.bool,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.oneOf([
    'default',
    'email-address',
    'numeric',
    'phone-pad'
  ]),
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters'])
};

export default Input;
