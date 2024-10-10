import './App.sass'
import {Table} from "./components/Table.tsx";
import {Company, RootState} from "../types.tsx";
import {connect, useDispatch} from "react-redux";
import {actions} from "../store.tsx";
import {useEffect} from "react";
import {AddNewSection} from "./components/AddNewSection.tsx";

const mapStateToProps = (state: RootState) => ({
    visibleCompanies: state.company.visibleCompanies
});

function App(
    {
        visibleCompanies,
    }: {
        visibleCompanies: Company[]
    }) {

    const dispatch = useDispatch()

    const handleScroll = () => {
        const bottom: boolean = window.innerHeight + window.pageYOffset + 200 >= document.documentElement.scrollHeight;
        if (bottom) {
            dispatch(actions.loadMoreCompanies())
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return <>
        <div className="App">
            <div className="content">
                <AddNewSection/>
                {visibleCompanies.length > 0 &&
                    <Table
                        visibleCompanies={visibleCompanies}
                    />
                }
            </div>
        </div>
    </>

}

export default connect(mapStateToProps)(App)
