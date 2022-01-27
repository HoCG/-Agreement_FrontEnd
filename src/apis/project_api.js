import axios from "axios";

function requestProject() {
  return axios.get(`${process.env.VUE_APP_BASEURL}/api/projects`);
}

function requestProjectsWriter(projectName) {
  return axios.get(
    `${process.env.VUE_APP_BASEURL}/api/projects/${projectName}/submittees`
  );
}

function requestProjectInfo(projectName) {
  return axios.get(
    `${process.env.VUE_APP_BASEURL}/api/projects/${projectName}`
  );
}

function postProject(project) {
  let form = new FormData();
  console.log(project.src);
  // const blob = new Blob([project.src], {
  //     type: 'application/pdf'
  // });
  form.append("file_pdf", project.src);
  console.log(form);
  return axios.post(`${process.env.VUE_APP_BASEURL}/api/projects`, form, {
    headers: {
      "Content-Type": "multipart/form-data; boundary=" + form._boundary,
    },
  });
}

function changeStateProject(projectName, state) {
  return axios.put(
    `${process.env.VUE_APP_BASEURL}/api/projects/${projectName}/state?state=${state}`
  );
}

function getSubmitteePdf(submitteeName) {
  return axios.get(
    `${process.env.VUE_APP_BASEURL}/api/projects/submittees/${submitteeName}/pdf`,
    { responseType: "blob" }
  );
}

export {
  changeStateProject,
  requestProjectsWriter,
  requestProject,
  postProject,
  requestProjectInfo,
  getSubmitteePdf,
};
