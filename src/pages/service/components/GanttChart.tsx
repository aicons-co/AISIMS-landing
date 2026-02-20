import { Gantt, WillowDark } from '@svar-ui/react-gantt';
import '@svar-ui/react-gantt/all.css';

export type GanttTask = {
	id?: string | number;
	// start is mandatory in incoming data; end or duration is optional - but one of them must be
	start?: Date;
	end?: Date;
	duration?: number;
	// data?: ITask[];

	open?: boolean;
	text?: string;
	details?: string;
	progress?: number;
	type?: 'task' | 'summary' | 'milestone' | string;
	parent?: string | number;

	[key: string]: any;
};

export type GanttLink = {
	id: string | number;
	source: string | number;
	target: string | number;
	type: number;
};

export type GanttScale = {
	unit: string;
	step: number;
	format: string;
};

type GanttChartProps = {
	tasks: GanttTask[];
	links?: GanttLink[];
	scales?: GanttScale[];
};

export function GanttChart({ tasks, links, scales }: GanttChartProps) {
	return (
		<div
			style={{
				width: '100%',
				height: '600px',
				minWidth: '800px',
				position: 'relative',
				overflow: 'visible',
				backgroundColor: 'transparent',
			}}
		>
			<WillowDark>
				<Gantt tasks={tasks} links={links} scales={scales} />
			</WillowDark>
		</div>
	);
}
