import React from 'react';

function Stats({ stats, setComponent, component }) {

    const changeComponent = () => {
        setComponent(!component);
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
                            <button className="button" onClick={changeComponent}>Go Back</button>
                        </>
                    )
                    :
                    null
            }
        </>
    )
}

export default Stats;
