import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import SearchResults from './SearchResults';
import axiosClient from '../config/axios'

const icon = <FontAwesomeIcon icon={faSearch} />

const submitUrl = async (e) => {
    e.preventDefault();
    await axiosClient.post('http://localhost:4000/shortUrls');
}


function SearchBox() {
    const [results, setResults] = useState("");

    useEffect(() => {
        async function getUrls() {
            try {
                const url = 'http://localhost:4000/'
                const response = await axiosClient.get(url);
                console.log("response.data", response.data);
                setResults(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        getUrls();
    }, [])

    return (
        <div className="searchbox">
            <h1 className="text-center pb-4">Post a URL</h1>
            <form form action="/shortUrls" method="POST" className="search" onSubmit={submitUrl}>
                <label for="fullUrl" className="sr-only">Url</label>
                <input required placeholder="Url" type="url" name="fullUrl" id="fullUrl" className="form-control col mr-2" />
                <button className="searchButton " type="submit">
                    Shorten
                </button>
            </form>


            <table className="table table-striped table-responsive">
                <thead>
                    <tr>
                        <th>Full Url</th>
                        <th>Short Url</th>
                        <th>registered_at</th>
                        <th>last access</th>
                        <th>Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {results.forEach(shortUrl => {
                        <tr>
                            <td><a href={shortUrl.full}>{shortUrl.full}</a></td>
                            <td><a href={shortUrl.short}>{shortUrl.short}</a></td>
                            <td>{shortUrl.registered_at}</td>
                            <td>{shortUrl.last_access}</td>
                            <td>clicks</td>
                        </tr>
                    })} */}
                </tbody>
            </table>
        </div>
    )
}

export default SearchBox;
