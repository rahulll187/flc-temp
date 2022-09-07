import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { Colors } from '../../constants'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    display: 'flex',
    flex: 1
  },
  listView: {
    marginTop: 60,
    flexGrow: 1,
    marginHorizontal: 30,
    backgroundColor: 'transparent'
  },
  cellContainer1: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    borderLeftWidth: 1,
    borderLeftColor: '#B0B0B0'
  },
  cellContainer: {
    marginHorizontal: 5,
    marginTop: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    marginBottom: 10
  },
});

class Details extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      arrDetail: []
    }
  }

  componentWillMount() {
    const { ClientName, ProjectName } = this.props.projectsDetailState
    const { StoreLocation, StoreName } = this.props.projectsDetailState.StoreDetail
    var productUsed = this.props.projectsDetailState.ProductsUsed.map((obj) => `${obj.ProductName}`).join(', ')

    this.state.arrDetail.push({
      id: 1,
      name: 'PROJECT NAME',
      locationName: ProjectName
    })
    this.state.arrDetail.push({
      id: 2,
      name: 'LOCATION',
      locationName: StoreLocation
    })

    this.state.arrDetail.push({
      id: 3,
      name: 'CLIENT NAME',
      locationName: ClientName
    })

    this.state.arrDetail.push({
      id: 4,
      name: 'PRODUCT USED',
      locationName: productUsed
    })

    this.state.arrDetail.push({
      id: 5,
      name: 'STORE NAME',
      locationName: StoreName
    })
  }

  renderListItem(projects) {
    const { name, locationName, id } = projects.item
    return (
      <View style={styles.cellContainer1}>
        <View style={styles.cellContainer} key={name}>

          <View style={{ marginHorizontal: 20, backgroundColor: 'transparent' }} key={name}>
            <Text style={{ color: '#807F80' }}>{name}</Text>
            <Text style={{ color: Colors.appThemeColor, marginTop: 5 }}>{locationName}</Text>
          </View>

        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={{ left: 30, top: 40, color: Colors.appThemeColor }}>PROJECT NAME</Text>
        <FlatList
          data={this.state.arrDetail}
          keyExtractor={item => item.name}
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

const mapStateToProps = state => ({
  projectsDetailState: state.projects.projectDetail.ProjectDetail
});

export default connect(mapStateToProps)(Details)
