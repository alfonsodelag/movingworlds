import React, { useEffect, useState } from 'react';
import axiosClient from '../config/axios';
import moment from 'moment';

function SearchBox() {
    const [results, setResults] = useState([]);
    const [shortUrl, setShortUrl] = useState("");

    useEffect(() => {
        async function getUrls() {
            try {
                const url = 'http://localhost:4000/'
                const response = await axiosClient.get(url);
                console.log("response.data", response.data);
                const responseData = response.data;
                setResults(responseData);
            } catch (error) {
                console.log(error.message);
            }
        }
        getUrls();
    }, [setResults]);

    const getShortUrl = async (e) => {
        const shortUrlCode = e.currentTarget.textContent;
        try {
            const url = `http://localhost:4000/${shortUrlCode}`
            const response = await axiosClient.get(url);
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
                <button className="searchButton " type="submit">
                    Shorten
                </button>
            </form>


            <table className="table table-striped table-responsive">
                <thead>
                    <tr>
                        <th>Full Url</th>
                        <th>Short Url</th>
                        <th>Registered At</th>
                        <th>Last Access</th>
                        <th>Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        results?.map((result, index) => (
                            <tr >
                                <td ><a href={result.full}>{result.full}</a></td>
                                <td ><a href={result.full}>{result.short}</a></td>
                                <td >{moment(result.registered_at).format('DD/MM/YY')}</td>
                                <td >{moment(result.last_access).format('DD/MM/YY')}</td>
                                <td >{result.clicks}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default SearchBox;
