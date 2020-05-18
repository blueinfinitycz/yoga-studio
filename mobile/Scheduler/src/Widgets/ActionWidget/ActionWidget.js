import React from 'react'
import {Text, StatusBar, StyleSheet} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
// import {SafeAreaProvider } from 'react-native-safe-area-context'

const ActionWidget = () => {
    
    return(
        <>
            <StatusBar barStyle="light-content" backgroundColor="#68a4ff" />
            <Text>ActionWidget</Text>
            </>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  });

export default ActionWidget