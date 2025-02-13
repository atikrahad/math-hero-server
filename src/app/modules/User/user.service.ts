import { Users } from './user.model';



const getUserById = async (id: string) => {
  const result = await Users.findById(id);
  return result;
}

export const userServices = {
  getUserById,
};