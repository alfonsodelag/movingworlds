import React, { useEffect, useState } from 'react';
import axiosClient from '../config/axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

const icon = <FontAwesomeIcon icon={faInfo} />


function SearchBox() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        async function getUrls() {
            try {
                const response = await axiosClient.get("/latest");
                const responseData = response.data;
                setResults(responseData);
            } catch (error) {
                console.log(error.message);
            }
        }
        getUrls();
    }, [setResults]);

    return (
        <div className="urlbox">
            <h1 className="text-center pb-4">Post a URL</h1>
            <div className="container mt-4">
                <form action={process.env.REACT_APP_BACKEND_URL + "/shortUrls"} method="POST" className="url-form">
                    <label htmlFor="fullUrl" className="sr-only">Url</label>
                    <input required placeholder="Please enter a URL" type="url" name="fullUrl" id="fullUrl" className="form-control col mr-2" />
                    <button className="button" type="submit">
                        Shorten
                </button>
                </form>

                <div className="row justify-content-center">
                    <div className="col-auto">
                        <table className="table table-striped table-responsive text-center">
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
                                            <td ><a href={`${process.env.REACT_APP_BACKEND_URL}/${result.short}`}>{result.short}</a></td>
                                            <td className="text"><Link to={`/${result.short}/stats`} className="button">URL Stats and Modification</Link></td>
                                            <td className="icon"><Link to={`/${result.short}/stats`} className="button">{icon}</Link></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBox;


