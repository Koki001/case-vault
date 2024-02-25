import { db } from "@/lib/db";

interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  password: string; // Add password field to the User interface
  badgeNumber: string;
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};
