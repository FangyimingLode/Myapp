import React, { Component } from 'react';
import { Icon, ThemeProvider, Button } from 'react-native-elements';

export default class HeaderRight extends Component {

    handleonPress = () => {
        console.log(this.props)
    }
    render(){
        return(
            <Button 
                icon={{
                    name: 'add'
                }}
                type="clear"
                onPress={this.handleonPress}
            />
        )
    }
}