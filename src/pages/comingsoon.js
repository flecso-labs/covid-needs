import React, {Component} from 'react'
import Header from "../elements/header"
import Sidebar from "../elements/sidebar"
import {Link} from "react-router-dom"
import {withRouter} from 'react-router-dom'

class ComingSoon extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'}>Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Under Construction</li>
                            </ol>

                            <h1 className="display-1">Coming Soon</h1>
                            <p className="lead">This page is under construction. </p>
                                <Link to={'/dashboard'}>Back to dashboard</Link>
                        </div>

                        <footer className="sticky-footer">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                <span>Copyright © Flecso <div> {(new Date().getFullYear())}</div></span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ComingSoon)
