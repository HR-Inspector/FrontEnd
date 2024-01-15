const authHeader = () => {
  const token = JSON.parse(localStorage.getItem("authToken") as string);

  return token ? { Authorization: "Bearer " + token } : {};
};

export default authHeader;
