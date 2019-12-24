import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Alert,
    Dimensions,
    Image,
    Animated,
    Vibration,
    InteractionManager
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { get } from '../../../utils/global'
export default class CameraSacn extends Component {
    state = {
        visiable: false,
        animation: new Animated.Value(0),
    }
    barcodeReceived (e) {
        console.warn(e, '搜啊吗');
        get(`${e.data}`).then(res => {
            Alert.alert(res)
        })
    }
    render () {
        return (

            <RNCamera
                style={ styles.preview }
                type={ RNCamera.Constants.Type.back }
                googleVisionBarcodeType={ RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE }
                flashMode={ RNCamera.Constants.FlashMode.auto }
                onBarCodeRead={ (e) => this.barcodeReceived(e) }
            >
                <View style={ { height: (height - 244) / 3, width: width, backgroundColor: 'rgba(0,0,0,0.5)', } }>
                </View>
                <View style={ { flexDirection: 'row' } }>
                    <View style={ styles.itemStyle } />
                    <View style={ styles.rectangle }>
                        <Image
                            style={ [styles.rectangle, { position: 'absolute', left: 0, top: 0 }] }
                            source={ require('../../image/icon_scan_rect.png') }
                        />
                        <Animated.View style={ [styles.animatedStyle, {
                            transform: [{
                                translateY: this.state.animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 200]
                                })
                            }]
                        }] }>
                        </Animated.View>
                    </View>
                    <View style={ styles.itemStyle } />
                </View>
                <View style={ { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: width, alignItems: 'center' } }>
                    <Text style={ styles.textStyle }>将二维码放入框内，即可自动扫描</Text>
                </View>
            </RNCamera>
        )
    }
}
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    icon: {
        marginRight: 8,
    },
    text: {
        marginHorizontal: 5
    },
    container: {
        width: width,
        height: height,
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        width: width,
        height: height,
    },
    itemStyle: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: (width - 200) / 2,
        height: 200
    },
    textStyle: {
        color: '#fff',
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 18
    },
    animatedStyle: {
        height: 2,
        backgroundColor: '#00c050'
    },
    rectangle: {
        height: 200,
        width: 200,
    }
})
