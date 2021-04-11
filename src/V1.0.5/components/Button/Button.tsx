import './style.scss';

interface ButtonProps {
	clickHandler: () => void;
	content: JSX.Element | string;
	color?: 'main' | 'success' | 'danger';
	size?: 'small' | 'medium' | 'large';
	style?: React.CSSProperties;
	className?: string;
}

export const Button = ({
	clickHandler,
	color = 'main',
	size = 'medium',
	content,
	style = {},
	className = ''
}: ButtonProps) => {
	const buttonColors = {
		main: '#116294',
		success: '#4EA688',
		danger: '#E2372B'
	};

	return (
		<button
			onClick={clickHandler}
			className={`btn btn-${size}`}
			style={{ background: buttonColors[color], ...style }}
		>
			{content}
		</button>
	);
};

export default Button;
