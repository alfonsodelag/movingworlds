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



<svg aria-hidden="true" title="MovingWorlds Logo" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg">
    <svg id="logo" viewBox="0 0 120 120">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M59.5902396,5.47944516e-06 C48.1089155,5.47944516e-06 37.4471122,3.28820721 28.4270237,8.767653 L35.5357819,24.9317496 L52.2091953,64.1099213 L75.991367,92.602771 C71.071561,95.0689216 65.6045176,96.7123554 59.5902369,96.7123554 C39.0888243,96.7123554 22.6876942,80.274018 22.6876942,59.7260962 C22.6876942,52.6032167 24.6016924,46.3017225 28.1547376,40.8222767 L18.0401743,16.9868217 C7.10608757,27.6714725 0,43.0141893 0,60.000337 C0,93.1505841 26.7879794,120 59.862523,120 C71.3438471,120 82.0056505,116.712467 91.025739,110.95878 L85.0114582,96.4387831 L67.5158507,54.7944607 L43.7363469,26.5758491 C48.6561529,24.1096985 54.1231963,23.0140751 59.862523,23.0140751 C80.3639356,23.0140751 96.7650657,39.4524125 96.7650657,60.0003342 C96.7650657,66.5754007 94.8510675,73.1511384 91.8452597,78.9041538 L102.232109,103.01385 C113.166196,92.3291987 120,77.2607228 120,60.5481446 C119.452763,26.8494187 92.6647832,0 59.5902396,0 L59.5902396,5.47944516e-06 Z M59.5902396,55.8907526 C61.5042378,55.8907526 63.1432848,57.5341864 63.1432848,59.4525267 C63.1432848,61.3708669 61.5042406,63.0136322 59.5902396,63.0136322 C57.6762414,63.0136322 56.0371945,61.3701984 56.0371945,59.4525267 C55.4899571,57.5341864 57.6762387,55.8907526 59.5902396,55.8907526 Z" fill="#51C7F1" fill-rule="nonzero"></path>
        </g>
    </svg>
</svg>