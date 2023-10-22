import apiClient from '../apiClient';

const userServices = {
  getUsers,
};
export default userServices;

async function getUsers() {
  const response = await apiClient.get('/');
  console.log(response);
}
