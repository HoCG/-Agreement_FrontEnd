import axios from "axios";

function requestProject() {
    return axios.get(`${process.env.VUE_APP_BASEURL}/api/projects`)
}

function postProject(project) {
    let form = new FormData();
    console.log(project.src);
    const blob = new Blob([project.src], {
        type: 'application/pdf'
    });
    form.append("file_pdf", blob)
    console.log(form)
    return axios.post(`${process.env.VUE_APP_BASEURL}/api/projects`, form, {
        headers: {
            "Content-Type": "multipart/form-data; boundary=" + form._boundary
        }
    });
}

export {
    requestProject,
    postProject
}