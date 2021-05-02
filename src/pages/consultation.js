import React, { useState, useEffect, useContext } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import axios from 'axios';
import { AuthContext } from "../firebase/Auth";
import { Link, Redirect,useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import S3 from "react-aws-s3";
import Firebase from '../firebase/Firebase.js'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

// import {}


export const db = Firebase.firestore();


function Consultations() {

    const [allConsultationData, setAllConsultationData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloadLoading, setDownloadLoading] = useState(false);
    const [searchVal, setSearchVal] = useState(null);
    const location = useLocation();
    console.log(location.pathname.replaceAll("/",""));
    const [status, setStatus] = useState("")
    const [reason, setReason] = useState("")
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [modifiedIndex, setmodifiedIndex] = useState(null)
    const [rejectLoading, setRejectLoading] = useState([]); 

    const handleClose = () => {
        setShowRejectModal(false)
        setReason("")
        setmodifiedIndex(null)
    }
    const handleOpen = (index) => {
        setShowRejectModal(true)
        setmodifiedIndex(index)
    }

    useEffect(() => {
        // console.log(isLoading)
        //console.log(typeof(cutoff))
        setIsLoading(true);
        const needsRed = db.collection("needs");
        const nameFilter = needsRed.where("need", "==",location.pathname.replaceAll("/","")).where("status", "!=",'Complete').orderBy("status").orderBy("createdAt", "desc" );
        nameFilter.get().then(snapshot => {
            // The snapshot returned by `where().get()` does not have a `data()` reference since it returns multiple documents, it has `docs` property which is an array of all the documents matched
            var docs = [];
            snapshot.docs.forEach(doc => {
              const docData = { ...doc.data(), id: doc.id };
              docs.push(docData);
              console.log(docData);
              
         })
         setAllConsultationData(docs);
         setIsLoading(false);
        });

    }, []);

    const handleDownload = event => {
    

    };

    const handleStatusChange = async () => {
        var rejectArray = rejectLoading
        rejectArray[modifiedIndex] = true
        setRejectLoading(rejectArray)
        setShowRejectModal(false)
    
        console.log(allConsultationData[modifiedIndex].id);
        await db.collection('needs/').doc(allConsultationData[modifiedIndex].id).update({
			"status":"Complete",
            "statusNotes":reason,
            "volunteerDetails":status,
			 updatedAt: new Date()
		});
        rejectArray[modifiedIndex]=false;
        setmodifiedIndex(null);
        setRejectLoading(rejectArray);

    };

    const Filter = () => {

        var input, filter, table, tr, emp, name, i, txtValueEMP, txtValueNAME ;
        input = document.getElementById("searchbox");
        filter = input.value.toUpperCase();
        table = document.getElementById("dataTable");
        tr = table.getElementsByTagName("tr");
      
        for (i = 0; i < tr.length; i++) {
          name = tr[i].getElementsByTagName("td")[0];
          if (name) {
            txtValueNAME = name.textContent || name.innerText;
            if (txtValueNAME.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }
      }

    const renderRedirect = () => {
    };
    
    return (
        <div>
          {renderRedirect()}
            <Header />
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper">
                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to={'/dashboard'}>Dashboard</Link>
                            </li>
                            {/* <li className="breadcrumb-item active">Employee Data</li> */}
                            {//<li className="ml-auto"><Link to={'add'}>Add Employee</Link></li>
                            }
                        </ol>
                        <div className="card mb-3">
                            <div className="card-header"><i class="fas fa-thumbtack"></i>
                                &nbsp;&nbsp;Actions
                            </div>
                            <div className="card-body">
                                {/* <Button onClick={handleDownload} variant="primary" disabled={isDownloadLoading ? true : false}><i class="fas fa-download"></i> Download Data  {isDownloadLoading ? (
                                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        ) : (
                                                            <span></span>
                                                        )}
                                                        </Button>{'  '}
                                <Link to="/fileupload"><Button variant="secondary"><i class="fas fa-file-upload"></i> Upload File</Button>{'  '}</Link> */}
                                <Link to="/dashboard"><Button variant="success"><i class="fas fa-user-plus"></i> Add Requirement</Button>{'  '}</Link>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-header"><i className="fas fa-table"></i>
                                &nbsp;&nbsp;
                            </div>
                            <div className="card-body">
                                <div class="form-outline">
                                    <input type="search" id="searchbox" onChange={Filter} class="form-control" placeholder="Search By Name" aria-label="Search" style={{width: "300px"}}/>
                                </div>
                                <br></br>
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Age</th>
                                                <th>Need</th>
                                                <th>Oxygen Level</th>
                                                <th>Attendant Name</th>
                                                <th>Attendant Number</th>
                                                <th>Place</th>
                                                <th>Addition Details</th>
                                            </tr>
                                        </thead>
                                        {
                                            (!isLoading) ? allConsultationData.map((employee, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{employee.name}</td>
                                                        <td>{employee.age}</td>
                                                        <td>{employee.need}</td>
                                                        <td>{employee.ol}</td>
                                                        <td>{employee.attName}</td>
                                                        <td>{employee.attContact}</td>
                                                        <td>{employee.place}</td>
                                                        <td>{employee.additional}</td>
                                                        <td>
                                                        <Button onClick={() => handleOpen(index)} variant="danger" disabled={rejectLoading[index] ? true : false}>Mark Complete &nbsp;
                                                        {rejectLoading[index] ? (
                                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        ) : (
                                                            <span></span>
                                                        )}
                                                        </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            }) : (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            )
                                        }
                                    </table>
                                </div>
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
            <Modal
                show={showRejectModal}
                onHide={handleClose}
                backdrop="static"
                centered="true"
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <br/><br/>
                <Form>  
                    <Form.Group controlId="VolunteerName">
                        <Form.Label>Volunteer Name and Contact:</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={e => setStatus (e.target.value)} />
                    </Form.Group>
                    {/* <Form.Text className="text-muted">
                        This pop-up cannot be escaped, kindly enter a reason or navigate away using keys provided or the escape key.
                    </Form.Text> */}
                    <Form.Group controlId="Details">
                        <Form.Label>Details:</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={e => setReason (e.target.value)} />
                    </Form.Group>
                    <Form.Text className="text-muted">
                        This pop-up cannot be escaped, kindly enter a reason or navigate away using keys provided or the escape key.
                    </Form.Text>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Back</Button>
                <Button variant="primary" onClick={handleStatusChange}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}


// const Consultations = Consultation("Doctor");
export default Consultations
