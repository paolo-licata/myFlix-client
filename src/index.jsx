import { createRoot } from 'react-dom/client';

// bundle index.scss
import "./index.scss";

//Main component
const MyFlixApplication = () => {
	return (
		<div className="my-flix">
			<div>Good morning</div>
		</div>
	);
};

//Finds root of the App
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render the app in the root DOM element
root.render(<MyFlixApplication/>);