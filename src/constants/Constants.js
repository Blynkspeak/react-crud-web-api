const baseURL = 'https://r7hvl6uiue.execute-api.ap-south-1.amazonaws.com/'
const api = {
	getOtp : baseURL+ 'loginemail',
	sendOtp : baseURL+ 'loginotp',
	selectAccount : baseURL+ 'chooseactiveaccount',

};
export default api;

