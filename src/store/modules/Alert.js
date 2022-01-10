const state = {
    alertShow: false,
    pageOverMode: false,
    alertText: ''
};
const mutations = {
    OPEN_ALERT(state, alertMessage) {
        state.alertText = alertMessage;
        state.alertShow = true;
    },
    OPEN_ALERT_PAGE_OVER_MODE(state, alertMessage){
        state.alertText = alertMessage;
        state.alertShow = true;
        state.pageOverMode = true;
    }
}

export default {state, mutations};