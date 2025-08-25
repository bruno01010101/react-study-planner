import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';

function ThemeToggle() {
	const dispatch = useDispatch();
	const { theme } = useSelector((state) => state.theme);

	const isDark = theme === 'dark';

	return (
		<button
			onClick={() => dispatch(toggleTheme())}
			className='flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors'
			aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
		>
			<span className='material-icons text-white text-lg'>
				{isDark ? 'light_mode' : 'dark_mode'}
			</span>
		</button>
	);
}

export default ThemeToggle;
