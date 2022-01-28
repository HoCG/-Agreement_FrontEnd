const state = {
  isObjectHangOnMouse: false,
};

const mutations = {
  takeObject() {
    state.isObjectHangOnMouse = true;
  },

  leaveObject() {
    state.isObjectHangOnMouse = false;
  },
};

export default { state, mutations };
