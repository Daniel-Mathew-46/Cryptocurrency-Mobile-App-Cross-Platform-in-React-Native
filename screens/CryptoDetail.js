import React, { useEffect, useState } from 'react'
import { 
  View, 
  Text, 
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated,
  StyleSheet } from 'react-native'
import { CurrencyLabel, HeaderBar, PriceAlert, TextButton } from '../components';
import { COLORS, dummyData, FONTS, icons, SIZES } from '../constants';
import { VictoryAxis, VictoryScatter, VictoryChart, VictoryLine } from 'victory-native'
import { VictoryCustomTheme } from '../styles'

const CryptoDetail = ({route: {params}, navigation: {navigate}}) => {

    const currency = params?.currency;

    const [selectedCurrency, setSelectedCurrency] = useState(null);

    const [chartOptions, setChartOptions] = useState(dummyData.chartOptions);

    const [selectedOption, setSelectedOption] = useState(chartOptions[0]);

    const scrollX = new Animated.Value(0);

    const numberOfCharts = [1, 2, 3];

    useEffect(() => {
      setSelectedCurrency(currency);
    }, [])

    const renderHeaderBar = () => {
      return (
        <HeaderBar right={true}/>
      )
    }

    const renderDots = () => {

      const dotsPosition = Animated.divide(scrollX, SIZES.width)

      return (
        <View style={styles.dotsContainerWrapper}>
          <View style={styles.dotsStyle}>
            {numberOfCharts.map((item, index) => {
              const opacity = dotsPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
              })

              const dotSize = dotsPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                extrapolate: 'clamp'
              })

              const dotColor = dotsPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [COLORS.gray, COLORS.primary, COLORS.gray],
                extrapolate: 'clamp'
              })

              return (
                <Animated.View
                  key={`opt-${index}`}
                  opacity={opacity}
                  style={{
                    borderRadius: SIZES.radius,
                    marginHorizontal: 6,
                    width: dotSize,
                    height: dotSize,
                    backgroundColor: dotColor
                  }}
                >
                </Animated.View>
              )
            })}
          </View>
        </View>
      )
    }

    const renderChart = () => {
      return (
        <View style={[styles.chartContainer, styles.shadow]}>

          {/* Header */}
          <View style={{ 
            flexDirection: 'row',
            marginTop: SIZES.padding - 4,
            paddingHorizontal: 15
          }}>
            <View style={{ flex: 1 }}>
              <CurrencyLabel 
                icon={selectedCurrency?.image}
                currency={selectedCurrency?.currency}
                code={selectedCurrency?.code}
              />
            </View>
            <View>
              <Text style={{ ...FONTS.h3, fontWeight: 'bold' }}>{selectedCurrency?.amount}</Text>
              <Text style={{ 
                fontWeight: 'bold',
                color: selectedCurrency?.type === "I" ? COLORS.green : COLORS.red,
                ...FONTS.body3,
                }}
              >{selectedCurrency?.changes}</Text>
            </View>
          </View>

          {/* Chart */}
          <Animated.ScrollView
            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            snapToAlignment="center"
            snapToInterval={SIZES.width - 40}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            onScroll={Animated.event([
              {nativeEvent: {contentOffset: {x: scrollX}}}
            ], {useNativeDriver: false})}
          >
            {numberOfCharts.map((item, index) => (
              <View
                key={`Chart-${index}`}
                style={{
                  marginLeft: index === 0 ? SIZES.base : 0
                }}
              >
                <View style={{ marginTop: -25}}>
                  <VictoryChart
                    theme={VictoryCustomTheme}
                    height={220}
                    width={SIZES.width - 40}
                  >
                    <VictoryLine
                      style={{
                        data: {
                          stroke: COLORS.secondary
                        },
                        parent: {
                          border: "1px solid #ccc"
                        }
                      }}
                      data={selectedCurrency?.chartData}
                      categories={{
                        x: ["15 MIN", "30 MIN", "45 MIN", "60 MIN"],
                        y: ["15", "30", "45"]
                      }}
                    />
                    <VictoryScatter
                      data={selectedCurrency?.chartData}
                      size={7}
                      style={{
                        data: {
                          fill: COLORS.secondary
                        }
                      }}
                    />
                    <VictoryAxis
                      style={{
                        grid: {
                          stroke: "transparent"
                        }
                      }}
                    />
                    <VictoryAxis
                      dependentAxis
                      style={{
                        axis: {
                          stroke: "transparent"
                        },
                        grid: {
                          stroke: "gray"
                        }
                      }}
                    />
                  </VictoryChart>
              </View>
              </View>
            ))}
          </Animated.ScrollView>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {chartOptions.map((option) => (
              <TextButton
                key={`Option-${option.id}`}
                label={option.label}
                customContainerStyle={{
                  height: 30,
                  width: 60,
                  borderRadius: 15,
                  backgroundColor: selectedOption.id === option.id ? COLORS.primary : COLORS.lightGray
                }}
                customLabelStyle={{
                  color: selectedOption.id === option.id ? COLORS.white : COLORS.gray,
                  ...FONTS.body5,
                  fontWeight: "bold"
                }}
                onPress={() => setSelectedOption(option)}
              />
            ))}
          </View>

          {/* Dots Section */}
          {renderDots()}
        </View>
      )
    }

    const renderBuySection = () => {
      return (
        <View style={[styles.buyContainer, styles.shadow]}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 0
          }}>
            {/* Currency */}
            <View style={{ flex: 1 }}>
              <CurrencyLabel
                icon={selectedCurrency?.image}
                currency={`${selectedCurrency?.currency} Wallet`}
                code={selectedCurrency?.code}
              />
            </View>

            {/* Amount */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <View style={{
                marginRight: SIZES.base
              }}>
                <Text style={{...FONTS.h3, fontWeight: 'bold'}}>{selectedCurrency?.wallet.value}</Text>
                <Text style={{textAlign: 'right', ...FONTS.body4, color: COLORS.gray}}>{selectedCurrency?.wallet.crypto}{selectedCurrency?.code}</Text>
              </View>
              <Image
                source={icons.right_arrow}
                resizeMode='cover'
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.gray
                }}
              />
            </View>
          </View>
          <TextButton
            label="Buy"
            customContainerStyle={{
              marginTop: SIZES.radius
            }}
            onPress={() => navigate('Transactions', {currency: selectedCurrency})}
          />
        </View>
      )
    }

    const renderAboutSection = () => {
      return (
        <View style={[styles.aboutContainer, styles.shadow]}>
          <Text style={{ ...FONTS.h3, fontWeight: 'bold' }}>About {selectedCurrency?.currency}</Text>
          <Text style={{ ...FONTS.body3, marginTop: SIZES.base }}>{selectedCurrency?.description}</Text>
        </View>
      )
    }

    const renderPriceAlert = () => {
      return <PriceAlert customContainerStyle={{ marginTop: SIZES.padding - 8, marginHorizontal: SIZES.radius}}/>
    }

    return (
        <SafeAreaView
          style={styles.container}
        >
          {renderHeaderBar()}
          <ScrollView>
            <View style={styles.scrollContainer}>
              {renderChart()}
              {renderBuySection()}
              {renderAboutSection()}
              {renderPriceAlert()}
            </View>
          </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray1,
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: SIZES.padding - 8
  },
  chartContainer: {
    marginTop: 15,
    marginHorizontal: SIZES.radius,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    alignItems: 'center'
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65
  },
  optionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
  },
  dotsContainerWrapper: {
    height: 30,
    marginTop: 15,
  },
  dotsStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buyContainer: {
    marginTop: 15,
    marginHorizontal: SIZES.radius,
    padding: SIZES.radius,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  aboutContainer: {
    marginTop: 15,
    marginHorizontal: SIZES.radius,
    padding: SIZES.radius,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  }
  });

export default CryptoDetail
