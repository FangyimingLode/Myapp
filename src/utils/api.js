// 定义全局api列表
import AsyncStorge from '@react-native-community/async-storage';

const CUSTOM_USER = 'custom-user';

export const setLoginUser = params => {
	return AsyncStorge.setItem(CUSTOM_USER, params);
};

export const getLoginUser = () => {
	return AsyncStorge.getItem(CUSTOM_USER)
		.then(res => {
			return res;
		})
		.catch(error => error);
};

// api 列表
export const LOGINUSER = '/login/loginUser';

