import { VirtualDiffViewer } from 'virtual-react-json-diff';

type JsonDiffProps = {
	oldData: any;
	newData: any;
};

export function JsonDiff({ oldData, newData }: JsonDiffProps) {
	return (
		<div className="w-full">
			<VirtualDiffViewer
				oldValue={oldData}
				newValue={newData}
				height={600}
				showLineCount={true}
				className="diff-viewer-container"
			/>
		</div>
	);
}

