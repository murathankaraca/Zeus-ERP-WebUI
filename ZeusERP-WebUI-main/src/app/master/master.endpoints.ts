export const endpoints = {
    root: 'http://localhost:52199/api',
    accountRoot: 'http://localhost:52199',
    contactEndpoints: {
        get: 'Contacts/Get',
        getAsync: 'Contacts/GetAsync',
        getAll: 'Contacts/GetAll',
        getAllAsync: 'Contacts/GetAllAsync',
        add: 'Contacts/Add',
        addAsync: 'Contacts/AddAsync',
        update: 'Contacts/Update',
        updateAsync: 'Contacts/UpdateAsync',
        delete: 'Contacts/Delete',
        deleteAsync: 'Contacts/DeleteAsync',
    },
    userEndpoints: {
        get: 'Account/GetAllUsers',
        login: 'Account/Login',
        register: 'Account/Register',
        forgotPw: 'Account/ForgotPassword',
        getAllUsers: 'Account/GetAllUsers'
    },
};
