import React, { Component } from 'react'
import { Text, View, StyleSheet ,ScrollView} from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../../constants'
import Accordion from "react-native-collapsible/Accordion"
import Header from '../../components/header'
import PromoterHeaderCell from '../../components/promoters'
import PromoterDetailCell from '../../components/promoters/detail'

const styles = StyleSheet.create({
  container:{
    position: 'relative',
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerTitleContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 44,
    backgroundColor: Colors.appThemeColor
  },
  headerTitle:{
    fontSize: 18,
    color:Colors.white
  },
  tableView: {
    marginTop: 30
  }
});

class Promoters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      headerIndex: -1,
  };
    this._setSection = this._setSection.bind(this);
    this._renderContent = this._renderContent.bind(this);
  }

  _renderHeader(section) {
      return (
        <PromoterHeaderCell
          userDetail = {section}
          name = {section.name}
          profilePicture = {section.profilePicture}
          headerIndex = {this.state.headerIndex}
          sectionIndex = {section.index}
        />
      );
    }

    _renderContent(section) {
      return (
        <PromoterDetailCell
          detail = {section}
          userRole = {this.props.loginState.response.userRole}
          IsCheckedIn = {this.props.IsCheckedIn}
        />
      );
    }

    _setSection(section) {
      this.setState({
        isExpanded: true,
        headerIndex: section
      });
    }

  render() {
    return (
            <View style={styles.container}>

            {!this.props.hideHeader &&
              <View>
              <Header title ={this.props.title}  titleStyle ={{color:Colors.white}} arrowColor = {Colors.white}  background={Colors.appThemeColor} onBackPress={this.handleCancel} />
                <View style={styles.headerTitleContainer}>
                  <Text style={styles.headerTitle}>All promoters assigned to you</Text>
                </View>
              </View>
              }

                <ScrollView>
                    <View style={styles.tableView}>
                      <Accordion
                        underlayColor="transparent"
                        sections={this.props.arrUsers}
                        renderHeader={this._renderHeader.bind(this)}
                        renderContent={this._renderContent}
                        onChange={this._setSection.bind(this)}
                      />
                    </View>
                  </ScrollView>
            </View>
    );
  }
}

Promoters.propTypes = {
};

Promoters.defaultProps = {
};

const mapStateToProps = state => ({
  loginState: state.login,
  projectDetail:state.projects.projectDetail
});

export default connect(mapStateToProps)(Promoters);
