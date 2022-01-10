import React, {useContext, useEffect} from 'react';
import './App.scss';
import {useFetchPost} from "./services/api/customHooks/useFetchPost";

function App() {
    const queryResult = useFetchPost(1)

    useEffect(() => {
        if(queryResult.againExecute !== undefined) {
            queryResult.againExecute()?.then()
        }
    }, [])
    return (
        <div className="App">
            <span role={"isLoadingSpan"}>
            {
                queryResult.isLoading && "로딩중입니다.."
            }
            </span>
            <span role={"isErrorSpan"}>
            {
                queryResult.isError && `오류가 발생했습니다.${queryResult.error?.message}`
            }
            </span>
            <span role={"isResultSpan"}>
                {
                    queryResult.data !== undefined && `data: ${JSON.stringify(queryResult.data)}`
                }
            </span>
        </div>
    );
}

export default App;
