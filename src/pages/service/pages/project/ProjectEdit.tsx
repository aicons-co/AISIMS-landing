import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

type EditProjectValues = {
	name: string;
	client: string;
	site: string;
	period: string;
	code: string;
	pm: string;
	unitSystem: string;
	codeStandard: string;
};

export function ProjectEdit() {
	const { id } = useParams();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<EditProjectValues>({
		defaultValues: { name: 'Sample', client: 'ACON', site: '서울', period: '2025-01 ~ 2025-12', code: 'ATWR', pm: '김PM', unitSystem: 'metric', codeStandard: 'KDS' },
	});

	const onSubmit = (values: EditProjectValues) => {
		// Placeholder: call API to update project
		// eslint-disable-next-line no-console
		console.log('Update project', id, values);
		navigate(`/projects/${id}/dashboard`);
	};

	return (
		<section className="auth-section">
			<h2>프로젝트 정보수정</h2>
			<form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
				<label>
					프로젝트명
					<input 
						type="text" 
						className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
						{...register('name', { required: '프로젝트명을 입력하세요.' })} 
					/>
					{errors.name && <span className="error-text">{errors.name.message}</span>}
				</label>
				<label>
					발주처
					<input 
						type="text" 
						className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
						{...register('client', { required: '발주처를 입력하세요.' })} 
					/>
					{errors.client && <span className="error-text">{errors.client.message}</span>}
				</label>
				<label>
					현장명
					<input 
						type="text" 
						className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
						{...register('site', { required: '현장명을 입력하세요.' })} 
					/>
					{errors.site && <span className="error-text">{errors.site.message}</span>}
				</label>
				<label>
					기간
					<input 
						type="text" 
						placeholder="YYYY-MM ~ YYYY-MM"
						className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
						{...register('period', { required: '기간을 입력하세요.' })} 
					/>
					{errors.period && <span className="error-text">{errors.period.message}</span>}
				</label>
				<label>
					코드명
					<input 
						type="text" 
						className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
						{...register('code', { required: '코드명을 입력하세요.' })} 
					/>
					{errors.code && <span className="error-text">{errors.code.message}</span>}
				</label>
				<label>
					PM(담당자)명
					<input 
						type="text" 
						className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2"
						{...register('pm', { required: 'PM명을 입력하세요.' })} 
					/>
					{errors.pm && <span className="error-text">{errors.pm.message}</span>}
				</label>
				<label>
					단위계
					<select 
						className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2 w-full"
						{...register('unitSystem', { required: '단위계를 선택하세요.' })} 
					>
						<option value="metric">미터법 (m, kg, N)</option>
						<option value="imperial">야드파운드법 (ft, lb, lbf)</option>
					</select>
					{errors.unitSystem && <span className="error-text">{errors.unitSystem.message}</span>}
				</label>
				<label>
					코드기준
					<select 
						className="!bg-white dark:!bg-neutral-800 !text-neutral-900 dark:!text-neutral-100 border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2 w-full"
						{...register('codeStandard', { required: '코드기준을 선택하세요.' })} 
					>
						<option value="KDS">KDS (한국설계기준)</option>
						<option value="ACI">ACI (미국 콘크리트 협회)</option>
						<option value="Eurocode">Eurocode (유럽설계기준)</option>
					</select>
					{errors.codeStandard && <span className="error-text">{errors.codeStandard.message}</span>}
				</label>
				<div className="row">
					<button type="button" onClick={() => navigate(-1)}>
						취소
					</button>
					<button type="submit" disabled={isSubmitting}>
						저장
					</button>
				</div>
			</form>
		</section>
	);
}

