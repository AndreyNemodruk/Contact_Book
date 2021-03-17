import axios from "axios";

const api = {
  contacts: {
    getAll: () => axios.get("/api/all_contacts"),
    create: (contact) =>
      axios.post("/api/contact_create", contact).then((res) => res.data),
    update: (contact) => axios.put(`/api/edit_contact/${contact._id}`, contact),
    delete: (contact) => axios.delete(`/api/del_conact/${contact._id}`),
    byGroup: (id) => axios.get(`/api/group_contacts/${id}`),
    birthday: () => axios.get("/api//all_contacts/birthday"),
  },
  users: {
    create: (user) => axios.post("/api/auth/register", user),
    login: (credentials) =>
      axios.post("/api/auth/login", credentials).then((res) => res.data),
    update: (user) => axios.post("/api/auth/edit_user", user),
  },
  group: {
    create: (groupName) => axios.post("/api/group_create", groupName),
    getAll: () => axios.get("/api/get_groups"),
    delete: (group) => axios.delete(`/api/delete_group/${group._id}`),
    update: (group) => axios.put(`/api/edit_group/${group._id}`, group),
  },
  image: {
    upload: (formData) => axios.post("/api/upload", formData),
  },
  inst: (userName) => axios.get(`/api/get_inst/${userName}`),
};

export const setAuthorizationHeader = (token = null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    console;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default api;
