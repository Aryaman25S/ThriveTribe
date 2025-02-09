let username = "";
export const getUsername = () => username;
export const setUsername = (email) => {username = email.split("@")[0];}