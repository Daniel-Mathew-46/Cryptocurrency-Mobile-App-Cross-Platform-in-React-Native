import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  ImageBackground,
  Platform,
  LogBox} from 'react-native'
import { PriceAlert, TransactionHistory } from '../components';
  import { COLORS, dummyData, SIZES, icons, images, FONTS } from '../constants'

const Home = ({navigation : {navigate}}) => {

    const [trending, setTrending] = useState(dummyData.trendingCurrencies);

    const [transactionHistory, setTransactionHistory] = useState(dummyData.transactionHistory);

    function renderTrending ({item, index}) {
      return (
        <TouchableOpacity 
          style={[styles.flatlistItem, {marginLeft: index === 0 ? 15 : 0}, styles.shadow]}
          onPress={() => navigate('CryptoDetail', {currency: item})}
        >
          <View style={{ flexDirection: 'row', marginLeft: 10}}>
            <View>
              <Image
                source={item.image}
                resizeMode='cover'
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 5
                }}
              />
            </View>
            <View style={{
              marginLeft: SIZES.base
            }}>
              <Text style={{ ...FONTS.h3}}>{item.currency}</Text>
              <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>{item.code}</Text>
            </View>
          </View>
          <View style={{ marginTop: SIZES.base + 2, marginLeft: 10 }}>
            <Text style={{ ...FONTS.h2 }}>${item.amount}</Text>
            <Text style={{ color: item.type === "I" ? COLORS.green : COLORS.red, ...FONTS.h3}}>{item.changes}</Text>
          </View>
        </TouchableOpacity>
      )
    }

    function renderHeader () {
      return (
        <View style={[styles.shadow, styles.headerView]}>
          <ImageBackground 
            source={images.banner}
            resizeMode='cover'
            style={{
              flex: 1,
              alignItems: 'center'
            }}
          >
            {/* HeaderBar */}
            <View style={styles.notificationView}>
              <TouchableOpacity 
              style={styles.notificationIcon}
              onPress={() => alert("Notification Pressed!")}
              >
                <Image
                  source={icons.notification_white}
                  resizeMode='contain'
                  style={{
                    flex: 1,
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* Balance */}
            <View style={ styles.balanceSection }>
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Your Portfolio Balance</Text>
              <Text style={{ color: COLORS.white, ...FONTS.h1 }}>${dummyData.portfolio.balance}</Text>
              <Text style={{ color: COLORS.white, ...FONTS.body4, fontWeight: 'bold' }}>{dummyData.portfolio.changes} Last 24 Hrs</Text>
            </View>

            {/* Trending */}
            <View style={styles.trendingView}>
              <Text style={{ color: COLORS.white, ...FONTS.h2, marginLeft: 15 }}>Trending</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  marginTop: SIZES.base
                }}
                data={trending}
                renderItem={renderTrending}
                keyExtractor={(item) => `${item.id}`}
              />
            </View>
          </ImageBackground>
        </View>
      )
    }

    function renderAlert () {
      return (
        <PriceAlert/>
      )
    }

    function renderNotice() {
      return (
        <View style={[styles.noticeStyle, styles.shadow]}>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>Investing Safety</Text>
          <Text style={{ color: COLORS.white, ...FONTS.body4, lineHeight: 18, marginTop: 7}}
          >
            It's very difficult to time an investment, especially when the market is
            very volatile.Learn how to use dollar cost averaging to your advantage.
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 3
            }}
            onPress={() => alert("You wanna learn!")}
          >
            <Text style={{
              textDecorationLine:"underline",
              color: COLORS.green,
              ...FONTS.h3
            }}>Learn More</Text>
          </TouchableOpacity>
        </View>
      )
    }

    function renderTransactionHistory() {
      return (
          <TransactionHistory 
            customContainerStyle={{...styles.shadow}}
            history={transactionHistory}
          />
      )
    }

    return (
        <ScrollView>
          <View style={styles.container}>
            {renderHeader()}
            {renderAlert()}
            {renderNotice()}
            {renderTransactionHistory()}
          </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 70,
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
    headerView: {
      width: '100%',
      height: 290,
    },
    notificationView: {
      width: '100%',
      paddingHorizontal: SIZES.padding,
      alignItems: 'flex-end',
      marginTop: Platform.OS === 'android' ? 48 : 35,
    },
    notificationIcon: {
      width: 35,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center'
    },
    balanceSection: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    trendingView: {
      position: 'absolute',
      bottom: '-30%'
    },
    flatlistItem: {
      width: 180,
      paddingVertical: SIZES.padding,
      marginRight: SIZES.radius,
      backgroundColor: COLORS.white,
      borderRadius: 10
    },
    noticeStyle: {
      marginTop: 20,
      marginHorizontal: 15,
      padding: 20,
      backgroundColor: COLORS.secondary,
      borderRadius: SIZES.radius
    }
  });

export default Home
