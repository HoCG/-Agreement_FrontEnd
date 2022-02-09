import axios from "axios";

function requestProject(page) {
    return axios.get(`${process.env.VUE_APP_BASEURL}/api/projects?page=${page}`);
}

function requestProjectSubmittees(projectName) {
    return axios.get(
        `${process.env.VUE_APP_BASEURL}/api/projects/${projectName}/submittees`
    );
}

function requestProjectInfo(projectName) {
    return axios.get(`${process.env.VUE_APP_BASEURL}/api/projects/${projectName}`);
}

function updateProjectInfo(projectName, jsonData) {
    return axios.post(
        `${process.env.VUE_APP_BASEURL}/api/projects/${projectName}/objects`,
        jsonData,
        {
            headers: {
                "Content-Type": `application/json`
            }
        }
    )
}

function postProject(project) {
    let form = new FormData();
    console.log(project.src);
    form.append("file_pdf", project.src);
    console.log(form);
    return axios.post(`${process.env.VUE_APP_BASEURL}/api/projects`, form, {
        headers: {
            "Content-Type": "multipart/form-data; boundary=" + form._boundary
        }
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
        {responseType: "blob"}
    );
}

function getSubmitteeProject(submitteeName) {
    return axios.get(
        `${process.env.VUE_APP_BASEURL}/api/projects/submittees/${submitteeName}`
    )
}

function postSubmitteeProject(document_name, form) {
    return axios.post(
        `${process.env.VUE_APP_BASEURL}/api/submittees/projects/${document_name}`,
        form,
        {
            responseType: "blob"
        },
        {
            headers: {
                "Content-Type": "multipart/form-data; boundary=" + form._boundary + ";"
            }
        }
    )
}

export {
    changeStateProject,
    requestProjectSubmittees,
    requestProject,
    postProject,
    requestProjectInfo,
    getSubmitteePdf,
    postSubmitteeProject,
    getSubmitteeProject,
    updateProjectInfo
};
