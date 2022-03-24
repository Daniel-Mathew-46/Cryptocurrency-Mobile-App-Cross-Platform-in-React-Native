import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Portfolio from '../screens/Portfolio'
import Transaction from '../screens/Transaction'
import Settings from '../screens/Settings'
import Prices from '../screens/Prices'
import Trade from '../screens/Trade'
import { COLORS, icons } from '../constants'

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                top: -20,
                width: 40,
                height: 40,
                borderRadius: 30,
                backgroundColor: COLORS.primary
            }}
        >
            {children}
        </TouchableOpacity>
    )
}

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    right: 0,
                    left: 0,
                    bottom: 0,
                    elevation: 0,
                    height: 60,
                    backgroundColor: COLORS.white,
                    borderTopWidth: 2 
                }
            }}
        >
            <Tab.Screen
                name = "Homee"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconView }>
                            <Image
                                source={icons.home}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                            <Text
                                style={{color: focused ? COLORS.primary : COLORS.black, fontWeight: 'bold'}}
                            >Home</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name = "Portfolio"
                component={Portfolio}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconView }>
                            <Image
                                source={icons.pie_chart}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                            <Text
                                style={{color: focused ? COLORS.primary : COLORS.black, fontWeight: 'bold'}}
                            >Portfolio</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name = "Transaction"
                component={Trade}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.transaction}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: COLORS.white
                            }}
                        />
                    ),
                    tabBarButton: (props) => <TabBarCustomButton {...props}/>
                }}
            />
            <Tab.Screen
                name = "Prices"
                component={Prices}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconView }>
                            <Image
                                source={icons.line_graph}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                            <Text
                                style={{color: focused ? COLORS.primary : COLORS.black, fontWeight: 'bold'}}
                            >Prices</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name = "Setttings"
                component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconView }>
                            <Image
                                source={icons.settings}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                            <Text
                                style={{color: focused ? COLORS.primary : COLORS.black, fontWeight: 'bold'}}
                            >settings</Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    iconView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default Tabs
