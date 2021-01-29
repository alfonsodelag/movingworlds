import React, { useState } from 'react';
import axiosClient from '../config/axios';


function Stats({ stats, setHideStats, hideStats, results }) {
    const [alert, setAlert] = useState(false);
    const [changedName, setChangedName] = useState("");

    const changehideStats = () => {
        setHideStats(!hideStats);
    }

    const changeInput = (e) => {
        setChangedName(e.target.value);
    }

    console.log("alert", alert);

    const changeUrl = async (e, shortUrl) => {
        e.preventDefault();
        try {
            const url = `http://localhost:4000/${shortUrl}/modify`
            const response = await axiosClient.post(url, { changedName: changedName });
        } catch (error) {
            console.log(error.message);
        }
    }

    const showAlert = (e) => {
        if (changedName.length < 4) {
            setAlert(true);
        } else if (changedName.length >= 4) {
            setAlert(false);
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
                            <form onSubmit={(e) => changeUrl(e, stats.short)} action="" className="search">
                                <input required placeholder="Please change the URL here..." type="text" name="changedName" id="changedName" onChange={changeInput} value={changedName} className="form-control col mr-2" />
                                <button onClick={showAlert} className="button" type="submit">Change Url</button>
                            </form>
                            <button className="button" onClick={changehideStats}>Go Back</button>
                            { alert ?
                                (
                                    <>
                                        <p>Text must be at least 4 characters long!!!!!</p>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <p></p>
                                    </>
                                )
                            }
                        </>
                    )
                    :
                    null
            }
        </>
    )
}

export default Stats;
