import bcrypt from "bcryptjs";
import { sanity } from "../../src/utils";
import { ILoginInfo } from "../../src/types";

export const registerUser = async (loginInfo: ILoginInfo, setIsUserExist: (isExist: boolean) => void) => {
  try {
    const hashedPassword = await bcrypt.hash(loginInfo.password as string, 10);

    await sanity.create({
      _type: 'autorization',
      ...loginInfo,
      password: hashedPassword,
      publishedAt: new Date().toISOString(),
      id: new Date().getTime(),
    });

    setIsUserExist(true);
  } catch (err) {
    console.error(err);
  }
};