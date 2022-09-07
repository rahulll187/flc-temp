import React, { Component } from 'react'
import { Text, View, StyleSheet, Image,FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { Colors } from '../../constants'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker } from 'react-native-maps'
import Map from '../icons/map'
import Calendar from '../icons/calendar'
import ClockIcon from '../icons/clock'
import Moment from 'moment'
import { parseApiDate } from '../../utils'

const profilePictureSize = 90

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    display: 'flex',
    flex: 1
  },
  mapContainer: {
    marginTop: 20,
    backgroundColor: Colors.white,
    height: '50%'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  profileContainer: {
    marginHorizontal: 10,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  profilePictureImage: {
    width: profilePictureSize,
    height: profilePictureSize,
    borderRadius: 10
  },
  detailContainer: {
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  gridStyle: {
    width: '33%',
    backgroundColor: 'transparent',
    margin: 0.5,
    borderColor: '#D2D2D2',
    borderWidth: 1
  },
  checkInDetailStyle:{ 
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  checkInDetailTextStyle:{ 
    color: Colors.appThemeColor,
    textAlign: 'center' 
  },
  checkInDetailTextStyle1:{ 
    color: '#807F80',
    textAlign: 'center' 
  },
  noRecordFoundStyle:{ 
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  promoterGridStyle:{ 
    marginTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: "row",
    backgroundColor: 'transparent' 
  }
});

class Monitoring extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentMarker: this.props.arrCheckinUser.length ? this.props.arrCheckinUser[0] : null
    }
    this.onPromoterPressed = this.onPromoterPressed.bind(this)
    this._renderItem = this._renderItem.bind(this)
  }

  onPromoterPressed(promoter) {
    this.setState({ currentMarker: promoter })
  }

  _renderItem(promoter) {
    return (<View style ={{  marginHorizontal:8, backgroundColor:'transparent'}} key = {promoter.item.PromoterId}>
      <TouchableOpacity onPress={() => this.onPromoterPressed(promoter.item)}>
        <View style={styles.profileContainer}>
          <Image style={styles.profilePictureImage}
            source={{ uri: promoter.item.FilePath }}
          />
          <Text style={{ marginTop: 5, textAlign: 'center', fontSize: 12, color: '#807F80' }}>{promoter.item.FirstName} {promoter.item.LastName}</Text>
        </View>
      </TouchableOpacity>
    </View>)
  }

  render() {
    const { StoreLocation,StoreName } = this.props.projectDetail.ProjectDetail.StoreDetail
    let checkinDate = ''
    let checkinTime = ''

    if (this.state.currentMarker) {
      let start_date = Moment(parseApiDate(this.state.currentMarker.CheckInDate1))
      checkinDate = start_date && start_date.isValid() && start_date.format('MMM DD, YYYY')

      var time24hours1 = Moment(this.state.currentMarker.CheckInTime, "h:mm:ss")
      checkinTime = time24hours1.format("hh:mm A")
    }

    return (
      <View style={styles.mainContainer}>

        {this.state.currentMarker &&
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              annotations={this.props.arrCheckinUser}
              showsScale={true}
              showsCompass={true}
              onRegionChangeComplete={this.onRegionChange}
              region={{
                latitude: parseFloat(this.state.currentMarker.Latitude),
                longitude: parseFloat(this.state.currentMarker.Longitude),
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              }}
            >

              {this.props.arrCheckinUser.map(marker => (

                <Marker
                  key={marker.PromoterId}
                  coordinate={{
                    latitude: parseFloat(marker.Latitude),
                    longitude: parseFloat(marker.Longitude)
                  }}
                  pinColor={'red'}
                  onPress={() => { this.setState({ currentMarker: marker }) }}
                >
                </Marker>
              ))}
            </MapView>
          </View>
        }

        {this.state.currentMarker &&
          <ScrollView>
            <View style={styles.promoterGridStyle}>

              <FlatList
                horizontal={true}
                data={this.props.arrCheckinUser}
                keyExtractor={item => item.PromoterId}
                renderItem={this._renderItem}
                removeClippedSubviews={false}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={21}

              />
            </View>

            <View style={styles.detailContainer}>

              <View style={styles.gridStyle}>
                <View style={styles.checkInDetailStyle}>
                  <Map fill={Colors.appThemeColor} width={40} height={40} />
                </View>
                <Text style={styles.checkInDetailTextStyle}>{StoreLocation}</Text>
                <Text style={styles.checkInDetailTextStyle1}>{StoreName}</Text>
              </View>

              <View style={styles.gridStyle}>
                <View style={styles.checkInDetailStyle}>
                  <Calendar fill={Colors.appThemeColor} width={40} height={40} />
                </View>
                <Text style={styles.checkInDetailTextStyle}>{checkinDate}</Text>
              </View>

              <View style={styles.gridStyle}>
                <View style={styles.checkInDetailStyle}>
                  <ClockIcon fill={Colors.appThemeColor} width={40} height={40} />
                </View>
                <Text style={styles.checkInDetailTextStyle}>{checkinTime}</Text>
                <Text style={styles.checkInDetailTextStyle1}>{this.state.currentMarker.CheckInStatus}</Text>
              </View>
            </View>
          </ScrollView>
          || <View style={styles.noRecordFoundStyle}>
            <Text style={{ fontSize: 20 }} >No record found</Text>
          </View>
        }
      </View>
    );
  }
}
export default Monitoring
