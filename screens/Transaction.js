import React, { useEffect, useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native'

import { CurrencyLabel, HeaderBar, TextButton, TransactionHistory } from '../components'
import { COLORS, FONTS, SIZES } from '../constants';

const Transaction = ({route: {params}, navigation: {navigate}}) => {

    const currency = params?.currency;

    const [selectedCurrency, setSelectedCurrency] = useState(null)

    useEffect(() => {
      setSelectedCurrency(currency);
    }, [])

    const renderTrade = () => {
      return (
        <View style={[styles.tradeContainer, styles.shadow]}>
          <CurrencyLabel
            icon={selectedCurrency?.image}
            currency={selectedCurrency?.currency}
            code={selectedCurrency?.code}
          />
          <View style={{
            marginTop: SIZES.padding - 10,
            marginBottom: SIZES.padding * .9,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{ ...FONTS.h2, fontWeight: 'bold' }}>{selectedCurrency?.wallet.crypto}{selectedCurrency?.code}</Text>
            <Text style={{ color: COLORS.gray, ...FONTS.body3, fontWeight: 'bold' }}>${selectedCurrency?.wallet.value}</Text>
          </View>
          <TextButton
          label={"Trade"}
          onPress={() => alert("You wanna buy Crypto!")}
          />
        </View>
      )
    }

    const renderTransactionHistory = () => {
      return (
        <TransactionHistory
          customContainerStyle={{...styles.shadow}}
          history={selectedCurrency?.transactionHistory}
        />
      )
    }

    return (
        <SafeAreaView style={styles.container}>
          <HeaderBar right={false}/>
          <ScrollView>
            <View style={{ flex: 1, paddingBottom: SIZES.padding - 8 }}>
              {renderTrade()}
              {renderTransactionHistory()}
            </View>
          </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8
    },
    tradeContainer: {
      marginTop: 15,
      marginHorizontal: 15,
      padding: 20,
      backgroundColor: COLORS.white,
      borderRadius: SIZES.radius
    }
  });

export default Transaction
