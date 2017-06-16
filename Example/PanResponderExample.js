
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    PanResponder,
    Animated,
    Image
} from 'react-native';


export default class PanResponderExample extends  Component{
    constructor(props) {
        super(props)
        this.panResponder={}
    }
    componentWillMount(){
        this.animatedvalue=new Animated.ValueXY()
        this._value = {x: 0, y: 0}
        this.animatedvalue.addListener((value) => this._value = value);
        this.panResponder=PanResponder.create({
            onStartShouldSetPanResponder:(evt, gestureState) => true,
            onStartShouldSetResponderCapture:(evt,gestureState)=>true,
            onPanResponderGrant:(e, gestureState) => {
                this.animatedvalue.setOffset({
                    x: this._value.x,
                    y: this._value.y,
                })
                this.animatedvalue.setValue({ x: 0, y: 0})
            },
            onPanResponderMove: Animated.event([
                null, { dx: this.animatedvalue.x, dy: this.animatedvalue.y}
            ]),

        })
    }
    render(){
        const animatedStyle = {
            transform: this.animatedvalue.getTranslateTransform()
        }
        return(
            <View style={{flex:1, paddingTop:64}}>
                <Animated.View style={[styles.circle,animatedStyle]}
                      { ...this.panResponder.panHandlers }
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    circle: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: 'rgb(255,90,95)'
    }
})