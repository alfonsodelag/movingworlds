import React, { useEffect, useState } from 'react';
import axios from '../config/axios';
import moment from 'moment';
import Stats from './Stats';
import env from "react-dotenv";
import { Link } from "react-router-dom"

function SearchBox() {
    const [results, setResults] = useState([]);
    // const backendLink = env.BACKEND_LINK;

    // console.log("backEndLink", backendLink);


    useEffect(() => {
        async function getUrls() {
            try {
                const response = await axios.get("http://localhost:4000/latest");
                // console.log("response.data", response.data);
                const responseData = response.data;
                setResults(responseData);
            } catch (error) {
                console.log(error.message);
            }
        }
        getUrls();
    }, [setResults]);

    return (

        <>
            <div className="urlbox">
                <h1 className="text-center pb-4">Post a URL</h1>
                <form action="http://localhost:4000/shortUrls" method="POST" className="url-form">
                    <label htmlFor="fullUrl" className="sr-only">Url</label>
                    <input required placeholder="Please enter a URL here..." type="url" name="fullUrl" id="fullUrl" className="form-control col mr-2" />
                    <button className="button" type="submit">
                        Shorten
                </button>
                </form>


                <table className="table table-striped table-responsive d-flex flex-column align-items-center">
                    <thead>
                        <tr>
                            <th>Full Url</th>
                            <th>Short Url</th>
                            <th>Stats</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results?.map((result, index) => (
                                <tr key={index}>
                                    <td ><a href={result.full}>{result.full}</a></td>
                                    <td ><a href={`http://localhost:4000/${result.short}`}>{result.short}</a></td>
                                    <td><Link to={`/${result.short}/stats`} className="button stats" >See Stats and Modify Url</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SearchBox;
