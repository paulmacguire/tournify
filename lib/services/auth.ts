import axios from "axios";

interface RegisterData {
  email: string;
  password: string;
  role: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function login(loginData: LoginData): Promise<any> {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
      loginData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function register(registerData: RegisterData): Promise<any> {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/register`,
      registerData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
