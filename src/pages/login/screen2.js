import React, { Component } from 'react';
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { LinearGradient } from '../components/LinearGradient';
import { post } from '../../utils/global';
import { setLoginUser } from '../../utils/api';
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class LoginScreen3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedType: null,
      userName: '',
      userPassword: '',
      emailValid: true,
      userPasswordValid: true,
      userNameValid: true,
      confirmationuserPasswordValid: true,
    };
  }
  componentDidMount () {
    console.log(this.props)
  }
  /**
   * @description: 登录
   * @name: Fangyiming
   * @Date: 2019-12-12 23:04:04
   * @param {string} userName - 用户名
   * @oaram {string} userPassword - 密码 
   * @return {Promise}
   */
  fetchUserLogin = (userName, passowrd) => {
    return post('http://172.16.41.138:8080/login/userLogin', {
      userName: userName,
      userPassword: passowrd
    })
  }
  setStorge = async (token) => {
    await AsyncStorage.setItem('token', token)
  }
  signup = () => {
    LayoutAnimation.easeInEaseOut();
    const userNameValid = this.validateuserName();
    const userPasswordValid = this.validateuserPassword();
    if (
      userPasswordValid &&
      userNameValid
    ) {
      this.setState({ isLoading: true });
      const { userPassword, userName } = this.state;
      this.fetchUserLogin(userName, userPassword).then(res => {
        console.log(res);
        this.setState({ isLoading: false });
        setLoginUser(res.data).then(() => this.props.navigation.navigate('Home'))
        //this.props.navigation.navigate('Home');
      }).catch(err => {
        console.log(err)
      })
    }
  }

  validateuserName = () => {
    const { userName } = this.state;
    const userNameValid = userName.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ userNameValid });
    userNameValid || this.userNameInput.shake();
    return userNameValid;
  }

  // validateEmail() {
  //   const { email } = this.state;
  //   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   const emailValid = re.test(email);
  //   LayoutAnimation.easeInEaseOut();
  //   this.setState({ emailValid });
  //   emailValid || this.emailInput.shake();
  //   return emailValid;
  // }

  validateuserPassword = () => {
    const { userPassword } = this.state;
    const userPasswordValid = userPassword.length >= 3;
    LayoutAnimation.easeInEaseOut();
    this.setState({ userPasswordValid });
    userPasswordValid || this.userPasswordInput.shake();
    return userPasswordValid;
  }

  // validateConfirmationuserPassword = () => {
  //   const { userPassword, confirmationuserPassword } = this.state;
  //   const confirmationuserPasswordValid = userPassword === confirmationuserPassword;
  //   LayoutAnimation.easeInEaseOut();
  //   this.setState({ confirmationuserPasswordValid });
  //   confirmationuserPasswordValid || this.confirmationuserPasswordInput.shake();
  //   return confirmationuserPasswordValid;
  // }

  setSelectedType = selectedType =>
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType });

  render () {
    const {
      isLoading,
      userPassword,
      userPasswordValid,
      userName,
      userNameValid,
    } = this.state;

    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={ styles.container }
      >
        <KeyboardAvoidingView
          behavior="position"
          contentContainerStyle={ styles.formContainer }
        >
          <Text style={ styles.signUpText }>Sign up</Text>
          <View style={ { width: '100%', alignItems: 'center' } }>
            <FormInput
              refInput={ input => (this.userNameInput = input) }
              icon="user"
              value={ userName }
              onChangeText={ userName => this.setState({ userName }) }
              placeholder="用户名"
              returnKeyType="next"
              errorMessage={
                userNameValid ? null : "用户名不能有空格"
              }
              onSubmitEditing={ () => {
                this.validateuserName();
                this.emailInput.focus();
              } }
            />
            <FormInput
              refInput={ input => (this.userPasswordInput = input) }
              icon="lock"
              value={ userPassword }
              onChangeText={ userPassword => this.setState({ userPassword }) }
              placeholder="密码"
              secureTextEntry
              returnKeyType="next"
              errorMessage={
                userPasswordValid ? null : '密码不少于4位'
              }
              onSubmitEditing={ () => {
                this.validateuserPassword();
                this.confirmationuserPasswordInput.focus();
              } }
            />
          </View>
          <Button
            loading={ isLoading }
            title="SIGNUP"
            containerStyle={ { flex: -1 } }
            buttonStyle={ styles.signUpButton }
            ViewComponent={ LinearGradient }
            titleStyle={ styles.signUpButtonText }
            onPress={ this.signup }
            disabled={ isLoading }
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export const UserTypeItem = props => {
  const { image, label, labelColor, selected, ...attributes } = props;
  return (
    <TouchableOpacity { ...attributes }>
      <View
        style={ [
          styles.userTypeItemContainer,
          selected && styles.userTypeItemContainerSelected,
        ] }
      >
        <Text style={ [styles.userTypeLabel, { color: labelColor }] }>
          { label }
        </Text>
        <Image
          source={ image }
          style={ [
            styles.userTypeMugshot,
            selected && styles.userTypeMugshotSelected,
          ] }
        />
      </View>
    </TouchableOpacity>
  );
};

export const FormInput = props => {
  const { icon, refInput, ...otherProps } = props;
  return (
    <Input
      { ...otherProps }
      ref={ refInput }
      inputContainerStyle={ styles.inputContainer }
      leftIcon={
        <Icon name={ icon } type={ 'simple-line-icon' } color="#7384B4" size={ 18 } />
      }
      inputStyle={ styles.inputStyle }
      autoFocus={ false }
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={ styles.errorInputStyle }
      autoCorrect={ false }
      blurOnSubmit={ false }
      placeholderTextColor="#7384B4"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#293046',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 28,
    //fontFamily: 'UbuntuLight',
  },
  whoAreYouText: {
    color: '#7384B4',
    //fontFamily: 'UbuntuBold',
    fontSize: 14,
  },
  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  userTypeItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  userTypeItemContainerSelected: {
    opacity: 1,
  },
  userTypeMugshot: {
    margin: 4,
    height: 70,
    width: 70,
  },
  userTypeMugshotSelected: {
    height: 100,
    width: 100,
  },
  userTypeLabel: {
    color: 'yellow',
    //fontFamily: 'UbuntuBold',
    fontSize: 11,
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    ////fontFamily: 'UbuntuLight',
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  signUpButtonText: {
    ////fontFamily: 'UbuntuBold',
    fontSize: 13,
  },
  signUpButton: {
    width: 250,
    borderRadius: Math.round(45 / 2),
    height: 45,
  },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {
    ////fontFamily: 'UbuntuLightItalic',
    fontSize: 12,
    color: 'white',
  },
  loginHereText: {
    color: '#FF9800',
    ////fontFamily: 'UbuntuLightItalic',
    fontSize: 12,
  },
});
