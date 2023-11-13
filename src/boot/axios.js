import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:8000/api' })

// Add token
api.interceptors.request.use(
    function(config) {
        config.headers.Authorization = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGI0MTFiNjIxMjUzYTQzYThkOTQ1MjUyNTU2M2UzNjZmZDI0NjE4ZTFhOWRiNWNkNGQ4NWZmZjMxYTJmMGNhZGZmMTg5NDQ2Zjk1ZjQ0NDAiLCJpYXQiOjE2OTk5MDYzMTMuNjg3ODkyLCJuYmYiOjE2OTk5MDYzMTMuNjg3ODk1LCJleHAiOjE3MzE1Mjg3MTMuNjczOTkyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.SmdoGABbzh7oPKaCO8eQszCOdm6hs7LcHbPweILfE7ZEqOiBNdgbV7JzmIUTOLce9XVx1ocS8qUZlANiK4cXHaG9YmqmN177dPqFpVayhHfF6ZBETtMG2QtNxlXYYDQzFtlZZUAo933kIHiN5m2AK0bCkCipGAiPotLomTeZGjVlmaSL2jM5ywWok5wImm5jcA7oca2YLII4l_rstsQomr9jap0JdzhOue1sbbaV0-vKvoguDp9MuAbLiveslXkw7eYY0NMShg4xAPkINGaaqPYFHEhRMVT4u_7StRgJ_5Pz-wyE6jrosjdzMCrdA2knreMCznR_eYPW3pU-fSnWkMToC-c8NJ_vr0cGciGarpcbK3bgYRUaHdjz3HlvHzyAWfP97SxUipt12tuPAF6GMT4ZJjHqvYsWY_Opo6dMVo_k-JFEbUByOmmqQwsAPLxbxPcv_v5Km5-ybBnHcmASqPeKiirNcsG63o9qeLmJdDcofM6KfyhrEiUYMze6Aj3fEB5MYQG55OO0eAC8WrCyjwA43WNJQIyFk1b2h1sw1keykV69LIQi8-uOYvze9GnDKh_DULGtlBjtm4ZpJuFMvXSOOkvbK6gDCeyXQDs5wh8aBwkyo0KMeBC-UAeKykzYht6ej9h1TV_VjZ_3qYCR036mA1DN05jzV7E8Smb05ds';

        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
