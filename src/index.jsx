import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from "react-bootstrap/Container";
import { store } from "./redux/store";
import { Provider } from 'react-redux';


// bundle index.scss
import "./index.scss";

//Main component
const MyFlixApplication = () => {
	return ( 
		<Provider store={store}>
			<Container>
				<MainView />
			</Container>
		</Provider>
	);
};

//Finds root of the App
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render the app in the root DOM element
root.render(<MyFlixApplication/>);