import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from "react-bootstrap/Container";


// bundle index.scss
import "./index.scss";

//Main component
const MyFlixApplication = () => {
	return ( 
		<Container>
			<MainView />
		</Container>
	);
};

//Finds root of the App
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render the app in the root DOM element
root.render(<MyFlixApplication/>);