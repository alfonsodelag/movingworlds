import React, { useState } from 'react';
import axiosClient from '../config/axios';


function Stats({ stats, setHideStats, hideStats, results }) {
    const [alert, setAlert] = useState(true);
    const [changedName, setChangedName] = useState("");

    const changehideStats = () => {
        setHideStats(!hideStats);
    }

    const changeInput = (e) => {
        setChangedName(e.target.value)
    }

    console.log("alert", alert);

    const changeUrl = async (e, shortUrl) => {
        e.preventDefault();
        try {
            const url = `http://localhost:4000/${shortUrl}/modify`
            const response = await axiosClient.post(url, { changedName: changedName });
            const responseData = response.data;
            setAlert(responseData);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            {
                stats ?
                    (
                        <>
                            <table className="table table-striped table-responsive">
                                <thead>
                                    <tr>
                                        <th>Registered At</th>
                                        <th>Last Access</th>
                                        <th>Clicks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{stats.registeredAt}</td>
                                        <td>{stats.lastAccess}</td>
                                        <td>{stats.clicks}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="button" onClick={changehideStats}>Go Back</button>
                            { alert ?
                                null
                                :
                                (
                                    <>
                                        <p>Text must be at least 4 characters long</p>
                                    </>
                                )
                            }
                        </>
                    )
                    :
                    null
            }
            {
                results ?

                    (
                        <>
                            <form onSubmit={(e) => changeUrl(e, stats.short)} action="" className="search">
                                <input required placeholder="Please change the URL here..." type="text" name="changedName" id="changedName" onChange={changeInput} value={changedName} className="form-control col mr-2" />
                                <button className="button" type="submit">Change Url</button>
                            </form>
                        </>

                    )
                    :
                    null
            }
        </>
    )
}

export default Stats;
