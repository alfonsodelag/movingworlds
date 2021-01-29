import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from 'moment';
import env from "react-dotenv";
import Spinner from './Spinner/Spinner';


function Stats(props) {
    const { shortCode } = props.match.params;
    const [alert, setAlert] = useState(false);
    const [changedName, setChangedName] = useState("");
    const [stats, setStats] = useState(false);

    // const backendLink = env.BACKEND_LINK;
    // console.log("backEndLink", backendLink);

    const changeInput = (e) => {
        setChangedName(e.target.value);
    }

    // console.log("alert", alert);

    const changeUrl = async (e, shortCode) => {
        e.preventDefault();
        try {
            const url = `http://localhost:4000/${shortCode}/modify`
            const response = await axios.post(url, { changedName: changedName });
            props.history.push(`/${shortCode}/stats`);
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


    useEffect(() => {
        async function getStats() {
            try {
                const url = `http://localhost:4000/${shortCode}/stats`
                const response = await axios.get(url);
                const responseData = response.data;
                setStats(responseData);
                // setHideStats(!hideStats);
                // console.log("stats after setting stats", stats);
            } catch (error) {
                console.log(error.message);
            }
        }
        getStats();
    }, [shortCode]);

    return (
        <>
            {
                stats ?
                    (
                        <>
                            <table className="table table-striped table-responsive d-flex flex-column align-items-center mb-5">
                                <thead>
                                    <tr>
                                        <th>Registered At</th>
                                        <th>Last Access</th>
                                        <th>Clicks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{moment(stats.registeredAt).format("YYYY-MM-DD HH:mm:ss")}</td>
                                        <td>{stats.lastAccess ? moment(stats.lastAccess).format("YYYY-MM-DD HH:mm:ss") : "Never"}</td>
                                        <td>{stats.clicks}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <form onSubmit={(e) => changeUrl(e, stats.short)} action="" className="url-form">
                                <input required placeholder="Please change the URL here..." type="text" name="changedName" id="changedName" onChange={changeInput} value={changedName} className="form-control col mr-2" />
                                <button onClick={showAlert} className="button" type="submit">Change Url</button>
                            </form>
                            <div>
                                <Link to="/" className="button go-back mt-5" >Go Back</Link>
                            </div>
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
                    (
                        <>
                            <Spinner />
                        </>
                    )
            }
        </>
    )
}

export default Stats;
