import axios from "./api";

const AuthService = {
  async getProducts() {
    const response = await axios.get("/products");
    return response.data;
  },
};
export default AuthService;
