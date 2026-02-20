import LoginBackground from '../../../../../public/assets/auth/login-bg.png';
import LogoWhite from '../../../landing/assets/Logo-white.svg';

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // ContextAPI
import { useAuthStore } from '../../store/authStore'; // Zustand

type LoginFormValues = {
  email: string;
  password: string;
};

export function Login() {
  const navigate = useNavigate();
  // const { login } = useAuth() // MEMO: ContextAPI
  const { login } = useAuthStore(); // MEMO: Zustand

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    console.log('values.email:', values.email);
    console.log('values.password:', values.password);
    try {
      await login(values.email, values.password);
      navigate('/projects');
    } catch (error) {
      // 에러 처리
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    // <section className="relative min-h-screen bg-neutral-900">
    <section className="bg-neutral-900">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${LoginBackground})` }}
      />
      <div className="relative flex flex-col items-center min-h-screen max-w-[1920px] z-10 mx-auto">
        {/* <div className="flex justify-between items-start flex-1 w-full max-w-[1400px] mx-auto"> */}
        <div className="flex flex-col flex-1 justify-center w-full">
          {/* <div className="flex justify-between items-start w-full max-w-[1920px] mx-auto px-25"> */}
          <div className="flex justify-between items-start w-full  mx-auto px-25">
            <div className="text-[55px] text-white">
              <img
                src={LogoWhite}
                alt="AISIMS 로고 흰색"
                className="h-auto w-[200px] mb-12.5"
              />
              <p>The Artificial Intelligence</p>
              <p>Behind Precision.</p>
            </div>

            <div className="w-[700px] h-[720px]  py-25 px-30 rounded-[20px] bg-white">
              <h3>Login</h3>
              <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <label>
                  이메일
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="!bg-white !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
                    {...register('email', { required: '이메일을 입력하세요.' })}
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email.message}</span>
                  )}
                </label>
                <label>
                  비밀번호
                  <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    className="!bg-white !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
                    {...register('password', {
                      required: '비밀번호를 입력하세요.',
                    })}
                  />
                  {errors.password && (
                    <span className="error-text">
                      {errors.password.message}
                    </span>
                  )}
                </label>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? '로그인 중...' : '로그인'}
                </button>
              </form>
              <div className="auth-links flex justify-between items-center">
                <Link to="/auth/forgot-password" className="ml-auto">
                  비밀번호 찾기
                </Link>
                <Link to="/auth/register">회원가입</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-amber-200">footer</div>
      </div>
    </section>
  );
}
