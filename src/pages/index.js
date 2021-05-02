import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import Modal from './editemployeemodal'
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import Firebase from 'firebase';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class Index extends Component {
    constructor(props){
        super(props)
        this.state = {
            toDashboard: false,
            data:[],
            dataLoaded:false,
            edit : false,
            editIndex: 0,
            error:''
        };
        this.replaceModalItem = this.replaceModalItem.bind(this);
        this.saveModalDetails = this.saveModalDetails.bind(this);
    }
    componentDidMount = () => {
        const token = localStorage.getItem('token')
        var currentUser = Firebase.auth().currentUser;
        let userId = currentUser.uid;
        var userUrl = "https://5oxwdnmjvj.execute-api.ap-south-1.amazonaws.com/Prod/user/" + userId;
        axios.get(userUrl, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              // "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'bearer ' + token
            }
          }).then(response => {
            const user = response.data[0];
            var url = "https://5oxwdnmjvj.execute-api.ap-south-1.amazonaws.com/Prod/employee?orgId="+user.org_code;
            axios.get(url,{
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    //                              "Access-Control-Allow-Credentials": true,
                                    "Access-Control-Allow-Headers": "*",
                                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': 'bearer ' + token
                                  }
                              }).then(response => {
                        const employees = response.data;
                        this.setState({
                            data:employees,
                            dataLoaded:true
                        })
                      }).catch(error => {
                        this.setState({dataLoaded:false})
                        
            });
          }).catch(error => {
            this.setState({dataLoaded:false})
            
        });
    }

    replaceModalItem(index) {
        this.setState({
          edit:true,
          editIndex: index

        });
    }

    saveModalDetails(newState) {
        let editIndex = this.state.editIndex
        let tempState = this.state.data
        let editted_array = tempState[editIndex]
        editted_array.status = newState.status
        editted_array.mobile_number = newState.mobile_number
        editted_array.ofc_email = newState.ofc_email
        editted_array.personal_email = newState.personal_email
        editted_array.leaving_date = newState.leaving_date
        editted_array.allow_advance = newState.allow_advance
        editted_array.month_salary = newState.month_salary
        tempState[editIndex] = editted_array
        this.setState({ data : tempState,
                        edit:false });
        var payload = {
            "id": editted_array.id,
            "employeeNumber": editted_array.emp_id,
            "employeeName": editted_array.name,
            "joinDate": editted_array.join_date,
            "bday": editted_array.birth_date,
            "status": editted_array.status,
            "gender": editted_array.gender,
            "mobileNumber": editted_array.mobile_number,
            "email": editted_array.ofc_email,
            "personalEmail": editted_array.personal_email,
            "pan": editted_array.pan,
            "leavingDate": editted_array.leaving_date,
            "nationality": editted_array.nationality,
            "noticePeriod": editted_array.notice_period,
            "allowAdvancePay": editted_array.allow_advance,
            "salary": editted_array.month_salary,
            "aadhar": editted_array.aadhar,
            "orgId": editted_array.org_id
        }
        const token = localStorage.getItem('token')
        var url = "https://5oxwdnmjvj.execute-api.ap-south-1.amazonaws.com/Prod/employee?orgId="+editted_array.org_id;
        const headers = {
            "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
          }
        axios.post(url, payload, {headers}).then(response => {
                }).catch(error => {
                    
        });
    }
    
    delete(index){
        confirmAlert({
        customUI: ({ onClose }) => {
            return (
              <div className='custom-ui'>
                <h1>Are you sure you want to Delete this Employee?</h1>
                <div className="d-flex justify-content-between">
                    <button onClick={() => {
                        this.deleteEmployee(index)
                        onClose()
                    }}>Yes, Delete Employee</button>
                    <button onClick={onClose}>No, Cancel Operation</button>
                </div>
              </div>
            )
          }
        })
      };
    

    deleteEmployee(index) {
        let tempState = this.state.data
        let deletedEmployee = tempState.splice(index,1)
        this.setState({ data : tempState });
        deletedEmployee = deletedEmployee[0]
        var payload = {
            "id": deletedEmployee.id,
            "employeeNumber": deletedEmployee.emp_id,
            "employeeName": deletedEmployee.name,
            "joinDate": deletedEmployee.join_date,
            "bday": deletedEmployee.birth_date,
            "status": "Deleted",
            "gender": deletedEmployee.gender,
            "mobileNumber": deletedEmployee.mobile_number,
            "email": deletedEmployee.ofc_email,
            "personalEmail": deletedEmployee.personal_email,
            "pan": deletedEmployee.pan,
            "leavingDate": deletedEmployee.leaving_date,
            "nationality": deletedEmployee.nationality,
            "noticePeriod": deletedEmployee.notice_period,
            "allowAdvancePay": deletedEmployee.allow_advance,
            "salary": deletedEmployee.month_salary,
            "aadhar": deletedEmployee.aadhar,
            "orgId": deletedEmployee.org_id
        }
        
        const token = localStorage.getItem('token')
        var url = "https://5oxwdnmjvj.execute-api.ap-south-1.amazonaws.com/Prod/employee?orgId="+deletedEmployee.org_id;
        const headers = {
            "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
          }
        axios.post(url, payload, {headers}).then(response => {
            
                }).catch(error => {
                    
        });
    
    }

    render() {
        //if (this.state.toDashboard === true) {
        //    return <Redirect to='/' />
        //}
        var employeeData = this.state.data
        const empDataTable = employeeData.map((employee,index) => {
            return(
                <tr key={index}>
                    <td>{employee.emp_id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.mobile_number}</td>
                    <td>{employee.ofc_email}</td>
                    <td>{employee.month_salary}</td>
                    <td>{employee.allow_advance}</td>
                    <td className="text-center">
                    <button className="btn btn-sm btn-info" data-toggle="modal" data-target="#editModal"
                            onClick={() => this.replaceModalItem(index)}>Edit</button>
                            &nbsp; | &nbsp;
                    <button className="btn btn-sm btn-danger" onClick={()=>this.delete(index)}>Delete</button></td>
                </tr>
            )
        });
        const editIndex = this.state.editIndex
        let modalData = this.state.data[editIndex]
        let edit
        if (this.state.edit){
        edit = 
            <Modal
            status= {modalData.status}
            mobile_number= {modalData.mobile_number}
            ofc_email= {modalData.ofc_email}
            personal_email= {modalData.personal_email}
            leaving_date= {modalData.leaving_date}
            allow_advance= {modalData.allow_advance}
            month_salary= {modalData.month_salary}
            saveModalDetails={this.saveModalDetails}
            />
        }
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
//                                <li className="breadcrumb-item active"></li>
                                {//<li className="ml-auto"><Link to={'add'}>Add Employee</Link></li>
                                }
                            </ol>
                            <div className="card mb-3">
                                <div className="card-header"><i className="fas fa-table"></i>
                                    &nbsp;&nbsp;Employees List
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th>EMP ID</th>
                                            <th>Name</th>
                                            <th>Mobile Number</th>
                                            <th>Email ID</th>
                                            <th>Salary</th>
                                            <th>Allow Advance</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        { empDataTable }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                            </div>
                        </div>
                        <footer className="sticky-footer">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                <span>Copyright © Flecso <div>{(new Date().getFullYear())}</div></span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
                {edit}
            </div>
        );
    }
}