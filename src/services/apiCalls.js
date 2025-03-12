//make api calls with axios interceptor
//SAMPLE REQUEST
//NEED API CALL :{ url:'/', method:'POST/GET', params:true/false, query:true/false }
export const API_URLS = {
  userSignup: { url: "/user/signup", method: "POST" },
  loginUser: { url: "/user/login", method: "POST" },
  addProduct: { url: "/product/addProduct", method: "POST" },
  getAllProductList: { url: "/product/getAllProductList", method: "GET" },
};
