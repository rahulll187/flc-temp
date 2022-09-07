import React, { PureComponent } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Colors } from '../../constants'
import { Actions } from 'react-native-router-flux'
import Email from '../icons/email'
import Call from '../icons/call'
import FlagIcon from '../icons/flag'
import CustomButton from '../../components/customButton'

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(18,18,18,0.14)',
    marginHorizontal: 10,
    borderTopWidth: 0
  },
  contentText: {
    fontSize: 15,
    marginLeft: 20,
    color: '#393535'
  },
  contentHeaderContainer1: {
    marginTop: 20,
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 44
  },
  contentHeaderContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 44
  },
  loginButtonContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: '60%',
    height: 44,
    borderRadius: 3,
    marginHorizontal: 60
  },
});

class PromoterDetailCell extends PureComponent {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    Actions.Evaluation({
      PromoterEmailId: this.props.detail.emailId
    });
  }

  renderEvaluation = () => {
    if (this.props.userRole == 1) {
      return (
        <CustomButton
          title="Evaluation"
          bgColor={Colors.appThemeColor}
          color={Colors.white}
          styles={styles.loginButtonContainer}
          onPress={(this.onSubmit)}
          textAlign="center"
        />
      );
    }
  }
  render() {
    const { emailId, citizanship, mobileNumber, designation } = this.props.detail

    return (
      <View style={styles.contentContainer}>

        <View style={styles.contentHeaderContainer1}>
          <FlagIcon fill={Colors.appThemeColor} width={32} height={32} />
          <Text style={styles.contentText}>{citizanship}</Text>
        </View>

        <View style={styles.contentHeaderContainer}>
          <Email fill={Colors.appThemeColor} width={24} height={24} />
          <Text style={styles.contentText}>{emailId}</Text>
        </View>

        <View style={styles.contentHeaderContainer}>
          <Call fill={Colors.appThemeColor} width={24} height={24} />
          <Text style={styles.contentText}>{mobileNumber}</Text>
        </View>

        {designation == 'Promoter' &&
          <View>
            {this.renderEvaluation()}
          </View>
        }
      </View>
    );
  }
}

export default PromoterDetailCell
