import React from 'react'
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity, 
    Platform} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS, FONTS, icons, SIZES } from '../constants'

const HeaderBar = ({right}) => {

    const {goBack} = useNavigation();

    return (
        <View style={styles.headerContainer}>
            <View style={styles.backNavWrapper}>
                <TouchableOpacity
                    style={styles.backTouchable}
                    onPress={() => goBack()}
                >
                    <Image
                        source={icons.back_arrow_ios}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.gray
                        }}
                    />
                    <Text style={{ marginLeft: 3, ...FONTS.h2}}>Back</Text>
                </TouchableOpacity>
            </View>
            {right && 
            <View style={styles.starView}>
                <TouchableOpacity>
                    <Image
                        source={icons.star}
                        style={{
                            height: 30,
                            width: 30,
                        }}
                    />
                </TouchableOpacity>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: Platform.OS === 'android' ? 48 : 0,
        paddingHorizontal: 15,
        flexDirection: 'row'
    },
    backNavWrapper: {
        flex: 1,
        alignItems: 'flex-start'
    },
    backTouchable: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    starView: {
        flex: 1,
        alignItems: 'flex-end'
    }
})

export default HeaderBar
