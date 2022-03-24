import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../constants'

const TransactionHistory = ({ customContainerStyle, history }) => {

    function renderhistory({item, index}) {
        return (
            <TouchableOpacity
                style={styles.historyItemContainer}
                onPress={() => alert(`Item ${index} history!`)}
            >
                <Image
                    source={icons.transaction}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.primary
                    }}
                />
                <View style={{ flex: 1, marginLeft: SIZES.radius}}>
                    <Text style={{ ...FONTS.h3, fontWeight: 'bold' }}>{item.description}</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body4}}>{item.date}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    height: '100%',
                    alignItems: 'center'
                }}>
                    <Text 
                    style={{ color: item.type === "B" ? COLORS.green : COLORS.black, ...FONTS.h3}}
                    >
                        {item.amount} {item.currency}
                    </Text>
                    <Image 
                        source={icons.right_arrow}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.transactionContainer, {...customContainerStyle}]}>
            <Text style={{ color: COLORS.black, ...FONTS.h2, fontWeight: 'bold'}}>Transaction History</Text>
            <FlatList
                contentContainerStyle={{ marginTop: SIZES.radius}}
                scrollEnabled={false}
                data={history}
                keyExtractor={item => `${item.id}`}
                renderItem={renderhistory}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                    <View style={{ width: '100%', height: 1, backgroundColor: COLORS.lightGray}}/>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    transactionContainer: {
        marginTop: 15,
        marginHorizontal: 15,
        padding: 20,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
    },
    historyItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZES.base
    }
})

export default TransactionHistory