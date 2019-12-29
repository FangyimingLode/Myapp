import React, { Component, Fragment } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Popover, Icon, Button } from '@ant-design/react-native';

const Item = Popover.Item
export default class Default extends Component {
    static navigationOptions = ( {navigation} ) => {
        return {
            headerTitle: '会议',
            headerRight: <>
                <Button
                    style={styles.button}
                >
                    管理
                </Button>
                <Popover
                    placement="bottom"
                    overlay={<Fragment>
                        <Button
                            style={styles.button}
                        >
                            发起会议
                        </Button>
                        <Button
                            style={styles.button}    
                        >
                            <Icon name="camera" />
                            <Text>扫一扫</Text>
                        </Button>
                        
                    </Fragment>}
                >
                    <Icon name='ellipsis' />
                </Popover>
            </>
        }
    }
    render() {
        return (
            <View>
                <Text>asdasdas</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        borderColor: "#fff",
        height: 30,
    }
})
