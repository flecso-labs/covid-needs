import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {

    render() {
        return (
            <div id="wrapper">
                <ul className="sidebar navbar-nav">
                <li className="nav-item active">
                        <Link to={'/'} className="nav-link"><i className="fas"></i>
                            <span>&nbsp;Information & Resources</span></Link>
                    </li>
                    <li className="nav-item active">
                        <Link to={'/dashboard'} className="nav-link"><i className="fas"></i>
                            <span>&nbsp;Add Requirement</span></Link>
                    </li>

                    <li className="nav-item">
                        <Link to={'/Doctor'} className="nav-link"><i class="fas"></i>
                            <span>&nbsp;Consultation Requirements</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/Oxygen'} className="nav-link"><i class="fas fa-add"></i>
                            <span>&nbsp;Oxygen Requirements</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/Food'} className="nav-link"><i class="fas fa-aa"></i>
                            <span>&nbsp;Food Requirements</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/Medicine'} className="nav-link"><i class="fas fa-aa"></i>
                            <span>&nbsp;Medicine Requirements</span></Link>
                    </li>

                    <li className="nav-item">
                        <Link to={'/CT'} className="nav-link"><i class="fas fa-"></i>
                            <span>&nbsp;CT Scan</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/Bed'} className="nav-link"><i class="fas fa-"></i>
                            <span>&nbsp;Bed Requirements</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/Plasma'} className="nav-link"><i class="fas fa-"></i>
                            <span>&nbsp;Plasma Requirements</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/Test'} className="nav-link"><i class="fas fa-"></i>
                            <span>&nbsp;Covid Test</span></Link>
                    </li>
                </ul>
            </div>
        );
    }
}
