const state = {
    object: initObject(),
    SignObjectName: "SignObjectArea",
    SignObjectArray: [],
    SignObjectCheck: false,
    SignObjectID: 1,
};
const mutations = {
    ADD_OBJECT(state, getObject){
        getObject = makeObject(getObject);
        state.objects.push(getObject);
        state.object = initObject();
    }
}

export default {state, mutations};
const makeObject = (object) => {
    return {
        id: object.id,
        title: object.title,
        width: object.width,
        height: object.height,
        x: object.x,
        y: object.y
    }
};

function initObject() {
    return {
        id: "",
        title: "",
        width: "",
        height: "",
        x: "",
        y: ""
    }
}