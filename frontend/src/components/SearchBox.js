import React, { useEffect, useState } from 'react';
import axiosClient from '../config/axios';
import moment from 'moment';
import Stats from './Stats';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function SearchBox() {
    const [results, setResults] = useState([]);
    const [stats, setStats] = useState(false);
    const [hideStats, setHideStats] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        async function getUrls() {
            try {
                const url = 'http://localhost:4000/'
                const response = await axiosClient.get(url);
                // console.log("response.data", response.data);
                const responseData = response.data;
                setResults(responseData);
            } catch (error) {
                console.log(error.message);
            }
        }
        getUrls();
    }, [setResults]);

    const getStats = async (shortUrl) => {
        try {
            const url = `http://localhost:4000/${shortUrl}/stats`
            const response = await axiosClient.get(url);
            const responseData = response.data;
            setStats(responseData);
            setHideStats(!hideStats);
            console.log("stats after setting stats", stats);
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div className="searchbox">
            <h1 className="text-center pb-4">Post a URL</h1>
            <form action="http://localhost:4000/shortUrls" method="POST" className="search">
                <label htmlFor="fullUrl" className="sr-only">Url</label>
                <input required placeholder="Please enter a URL here..." type="url" name="fullUrl" id="fullUrl" className="form-control col mr-2" />
                <button className="button" type="submit">
                    Shorten
                </button>
            </form>

            {hideStats ?

                <table className="table table-striped table-responsive">
                    <thead>
                        <tr>
                            <th>Full Url</th>
                            <th>Short Url</th>
                            <th>Registered At</th>
                            <th>Last Access</th>
                            <th>Clicks</th>
                            <th>Stats</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results?.map((result, index) => (
                                <tr key={index}>
                                    <td ><a href={result.full}>{result.full}</a></td>
                                    <td ><a href={`http://localhost:4000/${result.short}`}>{result.short}</a></td>
                                    <td >{moment(result.registered_at).format('DD/MM/YY')}</td>
                                    <td >{moment(result.last_access).format('DD/MM/YY')}</td>
                                    <td >{result.clicks}</td>
                                    <td><Link><button className="button stats" onClick={() => getStats(result.short)}>See Stats and Modify Url</button></Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                :

                <Stats
                    stats={stats}
                    hideStats={hideStats}
                    setHideStats={setHideStats}
                    results={results}
                />
            }
        </div>
    )
}

export default SearchBox;
