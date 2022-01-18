import axios from "axios";

function requestProject() {
    return axios.get(`${process.env.VUE_APP_BASEURL}/api/projects`)
}

function requestProjectsWriter(projectName) {
    return axios.get(`${process.env.VUE_APP_BASEURL}/api/projects/${projectName}/submittees`)
}


function postProject(project) {
    let form = new FormData();
    console.log(project.src);
    // const blob = new Blob([project.src], {
    //     type: 'application/pdf'
    // });
    form.append("file_pdf", project.src)
    console.log(form)
    return axios.post(`${process.env.VUE_APP_BASEURL}/api/projects`, form, {
        headers: {
            "Content-Type": "multipart/form-data; boundary=" + form._boundary
        }
    });
}

function changeStateProject(projectName, state){
    return axios.put(`${process.env.VUE_APP_BASEURL}/api/projects/${projectName}/state?state=${state}`
    );
}

export {
    changeStateProject,
    requestProjectsWriter,
    requestProject,
    postProject
}