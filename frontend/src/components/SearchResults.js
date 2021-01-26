import React from 'react'
// import shortUrl from '../../../backend/models/shortUrl';

function SearchResults() {
    return (
        <>
            <form action="/shortUrls" method="POST">
                <label for="fullUrl" className="sr-only">Url</label>
                <input required placeholder="Url" type="url" name="fullUrl" id="fullUrl" className="form-control col mr-2" />
                <button></button>
            </form>


            {/*             
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
                    {shortUrls.forEach(shortUrl => {
                        <tr>
                            <td><a href="www.test.com">www.test.com</a></td>
                            <td><a href="/12345">12345</a></td>
                            <td>Mon Jan 25 2021 19:43:07 GMT+0100 (Central European Standard Time)</td>
                            <td>Fri Jan 29 2021 19:43:07 GMT+0100 (Central European Standard Time)</td>
                            <td>clicks</td>
                        </tr>
                    })}

                </tbody>
            </table> */}
        </>
    );
}

export default SearchResults;
