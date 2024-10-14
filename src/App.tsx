import './App.sass'
import {Table} from "./components/Table.tsx";
import {AddNewSection} from "./components/AddNewSection.tsx";


function App() {

    return <>
        <div className="App">
            <div className="content">
                <AddNewSection/>
                <Table/>
            </div>
        </div>
    </>

}

export default App
