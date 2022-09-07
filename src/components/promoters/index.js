import React, { PureComponent } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Colors } from '../../constants'
import Image from 'react-native-image-progress'
import * as Progress from 'react-native-progress'

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    display: 'flex',
    borderWidth: 1,
    borderColor: 'rgba(18,18,18,0.14)',
    marginBottom: 10,
    marginHorizontal: 10
  },
  mainContainerWithoutBorder: {
    backgroundColor: Colors.white,
    display: 'flex',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(18,18,18,0.14)',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent'
  },
  contentContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    padding: 4
  },
  thumbImage: {
    width: 80,
    height: 80,
    borderRadius: 10
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
  designationStyle: {
    fontSize: 14,
    color: Colors.appThemeColor,
    marginBottom: 4
  },
  nameStyle: {
    fontSize: 14,
    color: '#4A4A4A',
    marginBottom: 4
  },
  imageStyle: {
    top: -5,
    right: 5
  }
});

class PromoterHeaderCell extends PureComponent {

  constructor(props) {
    super(props)
  }

  render() {
    const { name, headerIndex, sectionIndex, profilePicture } = this.props

    return (
      <View style={[headerIndex === sectionIndex ? styles.mainContainerWithoutBorder : styles.mainContainer]}>

        <View style={styles.contentContainer}>

          <Image style={styles.thumbImage}
            source={{ uri: profilePicture }}
            indicator={Progress.Pie}
            indicatorProps={{
              size: 40,
              borderWidth: 0,
              color: Colors.appThemeColor,
              unfilledColor: 'rgba(200, 200, 200, 0.2)'
            }}
          />

          <View style={styles.headerContent}>
            <Text style={styles.nameStyle}>{name}</Text>
            <Text style={styles.designationStyle}>{this.props.userDetail.designation}</Text>
          </View>

          <View style={styles.arrowContainer}>
            {(headerIndex === sectionIndex) &&
              <Image
                style={styles.imageStyle}
                source={require("../../images/expand_less_arrow.png")}
              />
              ||
              <Image
                style={styles.imageStyle}
                source={require("../../images/expand_more_arrow.png")}
              />
            }
          </View>
        </View>
      </View>
    );
  }
}

export default PromoterHeaderCell
