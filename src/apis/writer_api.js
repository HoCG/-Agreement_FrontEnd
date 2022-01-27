import axios from "axios";

function requestLogin(writer) {
  return axios.post(`${process.env.VUE_APP_BASEURL}/api/user/authentication`, {
    id: writer.id,
    password: writer.password,
  });
}

export { requestLogin };
