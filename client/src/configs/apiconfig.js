import axios from 'axios';

// export const getAxiosClient = apiUrl => {
//   const options = {
//     baseURL: apiUrl || `${process.env.API_URL}`,
//     'Content-type': 'application/json',
//     validateStatus: function(status) {
//       // `validateStatus` defines whether to resolve or reject the promise for a given
//       // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
//       // or `undefined`), the promise will be resolved; otherwise, the promise will be
//       // rejected.
//       return status >= 200 && status < 500;
//     },
//   };
//   const token = localStorage.getItem('token') || null;
//   if (token) {
//     options.headers = { 'Authorization':`Token ${token}` };
//   }
//   // returns an axios client
//   return axios.create(options);
// };

const token = localStorage.getItem('token');
if(token) {
axios.defaults.headers.common['Authorization'] =`Token ${token}`
}

const instance = axios.create({
    baseURL:'http://127.0.0.1:8000/v1'
})


export default instance