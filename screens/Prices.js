import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../constants'

const Prices = () => {
    return (
        <View style={styles.container}>
            <Text>Prices Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightGray
    }
})

export default Prices
