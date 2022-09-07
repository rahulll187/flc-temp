import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import Accordion from "react-native-collapsible/Accordion"
import { Colors } from '../../constants'
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    display: 'flex',
    flex: 1
  },
  tableView: {
    marginTop: 30
  },
  headerStyle: {
    height: 64,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 15,
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0.5
    },
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: 'rgba(18,18,18,0.14)',
    backgroundColor: Colors.white,
    marginBottom: 10
  },
  stockAlertContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    marginHorizontal: 20,
    marginBottom: 10,
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0.5
    },
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: 'rgba(18,18,18,0.14)',
    backgroundColor: 'transparent'
  },
  contentContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    padding: 4
  },
  headerContent: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 20,
    marginRight: 10
  },
  arrowContainer: {
    width: 44,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    top: -5,
    right: 5
  }
});

class Items extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false,
      headerIndex: -1,
      selectedItemId: -1,
    }
    this._setSection = this._setSection.bind(this)
    this.onCheckMarkHandler = this.onCheckMarkHandler.bind(this)
    this._renderContent = this._renderContent.bind(this)
    this.onSaveButtonHandler = this.onSaveButtonHandler.bind(this)
  }

  _renderHeader(section) {
    return (
      <View style={styles.headerStyle}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContent}>
            <Text style={{ left: 20 }}> {section.headerTitle}</Text>
          </View>

          <View style={styles.arrowContainer}>
            {(this.state.headerIndex === section.index) &&
              <Image
                style={styles.imageStyle}
                source={require("../../images/expand_more_arrow.png")}
              />
              ||
              <Image
                style={styles.imageStyle}
                source={require("../../images/expand_less_arrow.png")}
              />
            }
          </View>
        </View>
      </View>
    );
  }

  onCheckMarkHandler(item) {
    this.setState({
      selectedItemId: item
    })
  }

  onSaveButtonHandler() {
    if (this.state.selectedItemId >= 0) {
      Alert.alert('Project Name', 'Sent items!', [
        { text: 'Ok' }
      ]);
    } else {
      Alert.alert('Project Name', 'Please select the item to send!', [
        { text: 'Ok' }
      ]);
    }

  }
  _renderContent(section) {
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        {
          section.items.map(stockItem => (

            <View style={styles.stockAlertContainer} key={stockItem.title} >
              <Text style={{ left: 20 }}>{stockItem.title} </Text>
            </View>
          ))
        }
      </View>);
  }

  _setSection(section) {
    this.setState({
      isExpanded: true,
      headerIndex: section
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.tableView}>
            <Accordion
              underlayColor="transparent"
              sections={this.props.outOfStockItems}
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


export default Items
