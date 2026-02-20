import { useForm } from 'react-hook-form';

type ProfileFormValues = {
	email: string;
	name: string;
	phone: string;
	newPassword?: string;
};

export function Profile() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ProfileFormValues>({
		defaultValues: { email: '', name: '', phone: '', newPassword: '' },
	});

	const onSubmit = (values: ProfileFormValues) => {
		// Placeholder: call API here
		// eslint-disable-next-line no-console
		console.log('AUTH-003 profile update submit', values);
	};

	return (
		<section className="auth-section max-w-sm mx-auto">
			<h2>회원정보변경 (AUTH-003)</h2>
			<form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
				<label>
					이메일 (읽기전용)
					<input type="email" readOnly placeholder="you@example.com" className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2" {...register('email')} />
				</label>
				<label>
					이름
					<input type="text" placeholder="홍길동" className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2" {...register('name', { required: '이름을 입력하세요.' })} />
					{errors.name && <span className="error-text">{errors.name.message}</span>}
				</label>
				<label>
					연락처
					<input type="tel" placeholder="010-1234-5678" className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2" {...register('phone', { required: '연락처를 입력하세요.' })} />
					{errors.phone && <span className="error-text">{errors.phone.message}</span>}
				</label>
				<label>
					새 비밀번호 (선택)
					<input type="password" placeholder="원하면 변경" className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2" {...register('newPassword', { minLength: { value: 8, message: '8자 이상 입력하세요.' } })} />
					{errors.newPassword && <span className="error-text">{errors.newPassword.message}</span>}
				</label>
				<button type="submit" disabled={isSubmitting}>
					변경 저장
				</button>
			</form>
		</section>
	);
}

