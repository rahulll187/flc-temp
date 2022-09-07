import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { Colors } from '../../constants'
import Moment from 'moment'

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    display: 'flex',
    flex: 1
  },
  listView: {
    top: 30,
    flexGrow: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'transparent'
  },
  cellContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#B0B0B0',
    marginBottom: 15
  }
});

class Issues extends PureComponent {

  constructor(props) {
    super(props);
  }


  renderListItem(projects) {
    const { FirstName, LastName, Comments, Id, CreatedDateTime } = projects.item
    var time24hours1 = Moment(CreatedDateTime, "MM/DD/YYYY hh:mm:ss A");
    let start_date1 = time24hours1.format('MMM DD, YYYY hh:mm A')

    return (
      <View style={styles.cellContainer} key={CreatedDateTime}>
        <View style={{ backgroundColor: 'transparent', marginHorizontal: 10, marginTop: 10 }} key={CreatedDateTime}>
          <Text style={{ marginBottom: 10, color: Colors.appThemeColor, fontSize: 17 }}>{FirstName} {LastName}</Text>
          <Text style={{ marginBottom: 10, color: '#7E7E7E' }}>{start_date1}</Text>
          <Text style={{ marginBottom: 10, color: '#4A4A4A' }}>{Comments}</Text>
        </View>
      </View>
    );
  }


  render() {
    return (

      <View style={styles.mainContainer}>

        {this.props.arrProjectIssues.length == 0 &&
          <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>No record found</Text>
          </View>
        }

        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.props.arrProjectIssues}
          keyExtractor={item => item.CreatedDateTime}
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

export default Issues;
