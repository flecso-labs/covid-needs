import React, { useState, useEffect, useContext } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../firebase/Auth";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Firebase from '../firebase/Firebase.js'
// import {}


export const db = Firebase.firestore();
function Dashboard() {

	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [level, setLevel] = useState("");
	const [place, setPlace] = useState("");
	const [attname, setAttname] = useState("");
	const [attcont, setAttcont] = useState("");
	const [need, setNeed] = useState("");
	const [note, setNote] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleNote = (event) => {
		this.setNote(event.target.value);
	}


	const handleSubmit = async (event) => {
		event.preventDefault();
		const name = document.getElementById('name').value;
		const age = document.getElementById('age').value;
		const ol = document.getElementById('ol').value;
		const place = document.getElementById('place').value;
		const need = document.getElementById('need').value;
		const attName = document.getElementById('attName').value;
		const attContaxt = document.getElementById('attContaxt').value;
		const additional = document.getElementById('additional').value;
		const idNumber = document.getElementById('idNumber').value;
		if (!need || need === '') {
			window.alert("Select Requirement");
			return;
		}
		setIsLoading(true);
		await db.collection('needs').add({
			name: name,
			age: age,
			ol: ol,
			place: place,
			need: need,
			attName: attName,
			attContact: attContaxt,
			additional: additional,
			idNumber: idNumber,
			status: "New",
			createdAt: new Date()
		});
		setIsLoading(true);
		window.alert("Submitted Successfully");
		window.location.reload(false);

	}

	useEffect(() => {


	}, []);

	const renderRedirect = () => {

	};



	return (
		<div>
			{renderRedirect()}
			<Header />
			<div id="wrapper">
				<Sidebar></Sidebar>
				<div id="content-wrapper">
					<div className="container-fluid">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<Link to={'/dashboard'}>Dashboard</Link>
							</li>
							<li className="breadcrumb-item active">Overview</li>
						</ol>
						<div className="container-fluid">
							<div className="card mx-auto">
								<div className="card-header">Add Requirement</div>
								<div className="card-body">
									<form onSubmit={handleSubmit}>
										<div className="form-group">
											<div className="form-row">
												<div className="col-md-6">
													<div className="form-label-group">
														<input type="text" id="name" className="form-control" placeholder="Patient Name/रोगी का नाम" required="required" autoFocus="autofocus" />
														<label htmlFor="name">Patient Name/रोगी का नाम</label>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-label-group">
														<input type="number" id="age" className="form-control" placeholder="Patient Age/रोगी की आयु" required="required" />
														<label htmlFor="age">Patient Age/रोगी की आयु</label>
													</div>
												</div>
											</div>
										</div>
										<div className="form-group">
											<div className="form-row">
												<div className="col-md-6">
													<div className="form-label-group">
														<input type="number" id="ol" className="form-control" placeholder="Oxygen Level/ऑक्सीजन स्तर" required="required" />
														<label htmlFor="ol">Oxygen Level/ऑक्सीजन स्तर</label>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-label-group">
														<input type="text" id="place" className="form-control" placeholder="Address/जगह" required="required" />
														<label htmlFor="place">Address/जगह</label>
													</div>
												</div>
											</div>
										</div>

										<div className="form-group">
											<div className="form-row">
												<div className="col-md-6">
													<div className="form-label-group">
														<input type="text" id="problem" className="form-control" placeholder="Problem/तकलीफ" required="required" />
														<label htmlFor="problem">Problem/तकलीफ</label>
													</div>
												</div>
												<div className="col-md-2">
													<div className="form-label-group">
														<label htmlFor="need">What are you looking for?/आप क्या ढूंढ रहे हैं?: </label>
													</div>
												</div>
												<div className="col-md-4">
													<div className="form-label-group">
														<select class="custom-select custom-select-lg mb-3" id="need" placeholder="What are you looking for?/आप क्या ढूंढ रहे हैं?">
															<option value="Oxygen">Oxygen</option>
															<option value="Food">Food</option>
															<option value="Medicine">Medicine</option>
															<option value="CT">CT Scan</option>
															<option value="Doctor">Doctor Consultation</option>
															<option value="Bed">Bed</option>
															<option value="Plasma">Plasma</option>
														</select>
													</div>
												</div>
											</div>
										</div>
										<div className="form-group">
											<div className="form-row">
												<div className="col-md-6">
													<div className="form-label-group">
														<input type="text" id="attName" className="form-control" placeholder="Attendant Name/अटेंडेंट का नाम" required="required" autoFocus="autofocus" />
														<label htmlFor="attName">Attendant Name/अटेंडेंट का नाम</label>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-label-group">
														<input type="number" id="attContaxt" className="form-control" placeholder="Attendant Contact/अटेंडेंट संपर्क" required="required" />
														<label htmlFor="attContaxt">Attendant Contact/अटेंडेंट संपर्क</label>
													</div>
												</div>
											</div>
										</div>
										<div className="form-group">
											<div className="form-row">
											<div className="col-md-6">
													<div className="form-label-group">
														<input type="text" id="idNumber" className="form-control" placeholder="Id Number/आईडी नंबर (Aadhar, Pan)" autoFocus="autofocus" />
														<label htmlFor="idNumber">Id Number/आईडी नंबर (Aadhar, Pan)</label>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-label-group">
														<label htmlFor="additional"></label>
														<textarea id="additional" className="form-control" placeholder="Addition Details(Medicine Name, Address)/अतिरिक्त विवरण (चिकित्सा नाम, पता)" required="required" />
													</div>
												</div>

											</div>
										</div>

										<button className="btn btn-primary btn-block" type="submit" disabled={isLoading ? true : false}>Submit &nbsp;&nbsp;&nbsp;
                                                        {isLoading ? (
												<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
											) : (
												<span></span>
											)}
										</button>
									</form>
								</div>
							</div>
						</div>

						<div className="card-footer small text-muted">Updated Today at 11:59 PM</div>
					</div>

				</div>

				<footer className="sticky-footer">
					<div className="container my-auto">
						<div className="copyright text-center my-auto">
{/* //							<span>Copyright © Flecso <div>{(new Date().getFullYear())}</div></span> */}
						</div>
					</div>
				</footer>
			</div>
		</div>);
}

export default Dashboard
