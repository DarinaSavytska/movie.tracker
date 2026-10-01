import { sanity } from "@/src/utils/sanityClient";
import bcrypt from "bcryptjs";

export const checkUserInfo = async (login: string, password: string) => {
  try {
    const query = '*[_type == "autorization" && login == $login][0]';
    const params = { login };

    const user = await sanity.fetch(query, params);

    if (!user) {
      return false;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return user;
    }

    return false;
  } catch (err) {
    console.error("Помилка при запиті:", err);
    return false;
  }
};
