import React from 'react'
import { 
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'

const CurrencyLabel = ({currency, icon, code}) => {
    return (
        <View
            style={styles.currencyLabelContainer}
        >
            <Image
                source={icon}
                style={{
                    width: 25,
                    height: 25,
                    marginTop: 5
                }}
                resizeMode='cover'
            />
            <View style={{
                marginLeft: SIZES.base
            }}>
                <Text style={{ ...FONTS.h3, fontWeight: 'bold'}}>{currency}</Text>
                <Text style={{ color: COLORS.gray, ...FONTS.body4, fontWeight: 'bold' }}>{code}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    currencyLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default CurrencyLabel
