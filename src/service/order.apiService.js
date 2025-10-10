import axios from "./api";

const OrderService = {
  order(data) {
    return axios.post("/orders", data);
  },

  getOrders() {
    const response = axios.get("/my-orders");
    return response;
  },
};

export default OrderService;

