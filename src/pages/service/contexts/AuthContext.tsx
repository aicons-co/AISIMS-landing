import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios, { type AxiosResponse } from 'axios';

type User = {
  id: string;
  email: string;
  name: string;
  profilePhoto?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  // ✅
  const serverUrl = import.meta.env.VITE_API_SERVER;

  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
  }, [user]);

  // 변경 전 코드
  // const login3 = async (email: string, password: string) => {
  // 실제 구현 시에는 API 호출
  // 여기서는 샘플 사용자 데이터로 로그인 처리
  // password는 실제 구현 시 사용될 예정
  // void password // 명시적으로 사용하지 않음을 표시
  //   const sampleUser: User = {
  //     id: '1',
  //     email,
  //     name: email.split('@')[0],
  //     profilePhoto: undefined,
  //   }
  //   setUser(sampleUser)
  // }

  /*
    axios.post(
    url, // URL
    data, // Body (POST payload)
    config // Headers + 옵션
  )
  */
  const login = async (email: string, password: string) => {
    try {
      const response: AxiosResponse<{ user: User }> = await axios.post(
        `${serverUrl}/api/v1/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const { accessToken, refreshToken } = response.data.data;
      // console.log('accessToken: ', accessToken)
      // console.log('refreshToken: ', refreshToken)

      setUser(response.data.user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ?? '로그인에 실패했습니다.',
        );
      }

      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
