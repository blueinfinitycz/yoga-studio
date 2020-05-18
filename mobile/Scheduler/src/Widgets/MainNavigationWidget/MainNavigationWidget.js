import * as React  from 'react'
import {StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native'

const MainNavigationWidget = ({navigation}) =>{

    return(
      <View style={styles.MenuContainer}>

        <View style={styles.MenuItemContainer}>
          <TouchableNativeFeedback onPress={()=> navigation.navigate('ActionWidget')}>
            <View style={styles.MenuItemView}>
              <Text style={styles.MenuItem}>Akce</Text>
            </View>
          </TouchableNativeFeedback>
        </View>


        <View style={styles.MenuItemContainer}>
          <TouchableNativeFeedback onPress={()=> navigation.navigate('PrashadWidget')}>
            <View style={styles.MenuItemView}>
              <Text style={styles.MenuItem}>Prashád</Text>
            </View>
        </TouchableNativeFeedback>
        </View>
        
        <View style={styles.MenuItemContainer}>
          <TouchableNativeFeedback onPress={()=> navigation.navigate('CleaningWidget')}>
            <View style={styles.MenuItemView}>
              <Text style={styles.MenuItem}>Úklid</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        
      </View>
    )
}

const styles = StyleSheet.create({
    MenuContainer: {
      flex:1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems:'stretch'
    },
    MenuItemContainer: {
      flex:3,
      backgroundColor: 'powderblue',
      borderWidth: 1,
      borderColor:'steelblue',
      textAlign:'center'
    },
    MenuItemView: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    MenuItem: {
      color: 'steelblue',
      fontSize: 45,
    }
  })
  

export default MainNavigationWidget