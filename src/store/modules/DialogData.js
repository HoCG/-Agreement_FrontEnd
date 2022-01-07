const state = {
    DialogShow: false,
    ImageID: '',
    ImageWidth: null,
    ImageHeight: ""
};
const mutations = {
    OPEN_DIALOG(state, ImageID) {
        state.ImageID = ImageID;
        state.DialogShow = true;
    },
    GET_WIDTH(state, ImageWidth){
        state.ImageWidth = ImageWidth;
        console.log(ImageWidth);
    },
    GET_HEIGHT(state, ImageHeight){
        state.ImageHeight = ImageHeight;
        console.log(ImageHeight);
    }
}

export default {state, mutations};