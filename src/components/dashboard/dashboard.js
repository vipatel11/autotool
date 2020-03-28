import React, { Component } from 'react'
import Notifications from './Notifications'
import TestPlanList from '../projects/TestPlanList'
class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <TestPlanList />
                    </div>
                    <div className="col s12 m5 offset-m1"></div>
                    <Notifications />
                </div>
            </div>
        )

    }
}
export default Dashboard