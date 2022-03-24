import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../constants'

const PriceAlert = ({customContainerStyle}) => {
    return (
        <TouchableOpacity 
            style={[styles.priceAlert, customContainerStyle, styles.shadow]}
            onPress={() => alert('Price Alert Set! You will be notified of any significant price changes!')}
        >
            <Image
                source={icons.notification_color}
                style={{
                    width: 25,
                    height: 25
                }}
            />
            <View style={{ flex: 1, marginLeft: 15}}>
                <Text style={{...FONTS.h3, fontWeight: 'bold'}}>Set Price Alert</Text>
                <Text style={{ ...FONTS.body4}}>Get notified when your coins are gaining</Text>
            </View>
            <Image
                source={icons.right_arrow}
                style={{
                    width: 25,
                    height: 25,
                    tintColor: COLORS.gray
                }}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65
    },
    priceAlert: {
        marginTop: SIZES.padding * 4.5,
        paddingVertical: 15,
        marginHorizontal: 15,
        paddingHorizontal: SIZES.radius,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default PriceAlert
