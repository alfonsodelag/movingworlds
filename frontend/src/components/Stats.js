import React, { useState, useEffect } from 'react';
import axiosClient from '../config/axios';
import { Link } from "react-router-dom";
import moment from 'moment';
import Spinner from './Spinner/Spinner';

function Stats(props) {
    const { shortCode } = props.match.params;
    const [alert, setAlert] = useState(false);
    const [changedName, setChangedName] = useState("");
    const [stats, setStats] = useState(false);
    const [urlChanged, setUrlChanged] = useState(false);

    const changeInput = (e) => {
        setChangedName(e.target.value);
    }

    const changeUrl = async (e, shortCode) => {
        e.preventDefault();

        if (changedName.length < 4) {
            setAlert(true);
            return;
        }

        setAlert(false);

        try {
            const url = `/${shortCode}/modify`
            await axiosClient.post(url, { changedName: changedName });
            setUrlChanged(true);
            setTimeout(() => {
                setUrlChanged(false);
            }, 3000);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        async function getStats() {
            try {
                const url = `/${shortCode}/stats`
                const response = await axiosClient.get(url);
                const responseData = response.data;
                setStats(responseData);
            } catch (error) {
                console.log(error.message);
            }
        }
        getStats();
    }, [shortCode]);

    return stats ?
        (
            <div className="urlbox">
                <h1 className="text-center mb-4">Stats</h1>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <table className="table table-striped table-responsive text-center mb-4">
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
                    </div>
                </div>
                <form onSubmit={(e) => changeUrl(e, stats.short)} action="" className="url-form">
                    <div className="col-md-8 mx-auto d-flex text-center">
                        <input required placeholder="Please change the URL here..." type="text" name="changedName" id="changedName" onChange={changeInput} value={changedName} className="form-control col mr-2" />
                        <button className="button" type="submit">Change Url</button>
                    </div>
                </form>
                <div className=" text-center mt-5">
                    <Link to="/" className="button mt-5 btn-lg" >Go Back</Link>
                </div>

                {
                    urlChanged ?
                        (
                            <p>You have succesfully changed the URL</p>
                        )
                        :
                        null
                }
                <p>{alert ? "Text must be at least 4 characters long!" : null}</p>
            </div>
        )
        :
        (
            <Spinner />
        )
}


export default Stats;