import "./App.css";
import AppContainer from "./components/appContainer/AppContainer";
import FEMProvider from "./state/FEMProvider";

function App() {
	return (
		<div className="App">
			<FEMProvider>
				<AppContainer />
			</FEMProvider>
		</div>
	);
}

export default App;
