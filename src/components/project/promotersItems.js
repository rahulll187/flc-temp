import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Colors } from '../../constants'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import CircleIcon from '../icons/circle'
import CustomButton from '../../components/customButton'
import CircleDefault from '../icons/circle1'

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    display: 'flex',
    flex: 1
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ecf0f1'
  },
  listView: {
    top: 30,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  loginButtonContainer: {
    marginTop: 10,
    width: '60%',
    height: 44,
    borderRadius: 8,
    marginHorizontal: 60,
  },
  noRecordFoundStyle: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemNameStyle: {
    color: Colors.appThemeColor,
    fontWeight: 'bold'
  },
  itemContainer1: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  itemContainer2: {
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
});

class PromotersItems extends Component {

  constructor(props) {
    super(props)

    this.state = {
      productItem: [],
      SelectedProductList: []
    }
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.projectsDetailState.Items.length != nextProps.projectsDetailState.Items.length) {
      this.setState({
        SelectedProductList: [],
        productItem: []
      })

      var tempArray = [];

      for (var i = 0; i < nextProps.projectsDetailState.Items.length; i++) {
        const { ItemId, ItemName, PromoterEmailId } = nextProps.projectsDetailState.Items[i]

        const items = {
          id: i,
          check: false,
          name: ItemName,
          itemId: ItemId,
          PromoterEmailId: PromoterEmailId
        }
        tempArray.push(items)
      }

      this.setState({
        SelectedProductList: [],
        productItem: tempArray
      })
      return true
    }
    return Actions.currentScene === 'ProjectDetails'
  }

  componentWillMount() {
    for (var i = 0; i < this.props.projectsDetailState.Items.length; i++) {
      const { ItemId, ItemName, PromoterEmailId } = this.props.projectsDetailState.Items[i]
      this.state.productItem.push({
        id: i,
        check: false,
        name: ItemName,
        itemId: ItemId,
        PromoterEmailId: PromoterEmailId
      })
    }
  }

  onSaveHandler = () => {
    this.props.onItemInsertHandler(this.state.SelectedProductList)
  }

  press = (hey) => {
    // if (!this.props.IsCheckedIn) {
    //   return
    // }
    this.state.productItem.map((item) => {
      if (item.id === hey.id) {
        item.check = !item.check
        if (item.check === true) {
          this.state.SelectedProductList.push(item)
          console.log('selected:' + item.name)
        } else if (item.check === false) {
          const i = this.state.SelectedProductList.indexOf(item)
          if (1 != -1) {
            this.state.SelectedProductList.splice(i, 1)
            console.log('unselect:' + item.name)
            return this.state.SelectedProductList
          }
        }
      }
    })
    this.setState({ productItem: this.state.productItem })
  }

  render() {
    return (
      <View style={styles.mainContainer}>

        {this.state.productItem.length == 0 &&
          <View style={styles.noRecordFoundStyle}>
            <Text style={{ fontSize: 20 }} >No record found</Text>
          </View>
        }

        <FlatList
          data={this.state.productItem}
          keyExtractor={item => String(item.id)}
          extraData={this.state}
          style={styles.listView}
          renderItem={({ item }) => {
            return <TouchableOpacity style={styles.itemContainer} onPress={() => { this.press(item) }}>

              <View style={styles.itemContainer2}>
                {item.check
                  ? (<Text style={styles.itemNameStyle}>{`${item.name}`}</Text>)
                  : (<Text>{`${item.name}`}</Text>)}
              </View>

              <View style={styles.itemContainer1}>
                {item.check
                  ? (<CircleIcon fill={Colors.appThemeColor} width={25} height={25} />)
                  : (<CircleDefault fill={Colors.black} width={25} height={25} />)}
              </View>

            </TouchableOpacity>
          }} />

        <View>
          {(this.state.SelectedProductList.length > 0)
            ? (
              <View style={styles.buttonContainer}>

                  <CustomButton
                    busy={this.props.projectsState.isLoading}
                    title={this.props.loginState.response.userRole == 1 ? "CLOSE" : "SUBMIT"}
                    bgColor={Colors.appThemeColor}
                    color={Colors.white}
                    styles={styles.loginButtonContainer}
                    onPress={this.onSaveHandler}
                    textAlign="center"
                  />
                
              </View>
            )
            : null
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  projectsState: state.projects,
  loginState: state.login,
  projectsDetailState: state.projects.projectDetail
});

export default connect(mapStateToProps)(PromotersItems);
