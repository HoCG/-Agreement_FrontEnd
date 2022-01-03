const state = {
    DialogShow: false,
    ImageID: ''
};
const mutations = {
    OPEN_DIALOG(state, ImageID) {
        state.ImageID = ImageID;
        state.DialogShow = true;
    }
}

export default {state, mutations};