import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (role: string) => void;
  logout: () => void;
}

// 明确返回类型，并使用 Immer 的方式更新状态
const authInitializer: StateCreator<AuthState, [], [["zustand/immer", never]]> = (set) => ({
  isAuthenticated: false,
  userRole: null,
  login: (role: string) => set((state) => ({ ...state, isAuthenticated: true, userRole: role })),
  logout: () => set({ isAuthenticated: false, userRole: null })
});

// 将泛型参数传递给 immer
export const useAuthStore = create<AuthState>()(
  immer(authInitializer as any) // 注意：这里使用了 'as any' 来绕过类型错误，理想情况下，immer 应该能正确处理泛型。
);
