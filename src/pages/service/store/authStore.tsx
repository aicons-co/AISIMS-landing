import { create } from 'zustand'
import axios, { type AxiosResponse } from 'axios'

type User = {
  id: string
  email: string
  name: string
  profilePhoto?: string
}

type AuthState = {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const serverUrl = import.meta.env.VITE_API_SERVER

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      const response: AxiosResponse<{
        data: {
          user: User
          accessToken: string
          refreshToken: string
        }
      }> = await axios.post(
        `${serverUrl}/api/v1/users/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const { user, accessToken } = response.data.data

      // Zustand state에 저장 (state에 저장 = 메모리에 저장)
      set({
        user,
        accessToken,
        isAuthenticated: true,
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ?? '로그인에 실패했습니다.'
        )
      }
      throw new Error('오류가 발생했습니다.')
    }
  },

  logout: () => {
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    })
  },
}))
