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
function Information() {

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
				<div className="Resources container-fluid">
					<h1 className="heading">Resources</h1>

					<div className="banner">
						The objective of this page is to help people gain access to vital
						resources by sharing information only. However, we request the
						beneficiaries to use their discretion and verify the leads on their own
						before taking any action. If you find inaccurate information or any lead
						engaging in illegal practices, kindly inform us at
						satnacovidrelief@gmail.com. We will take it down as soon as possible. We
						will not be responsible for the actions you take using the information
						on this page. We are just mediating information and are no way
						responsible for what is being shared. Please avoid sharing and
						contacting black market resources. We strongly encourage to AVOID black
						market.
      </div>
	  <br></br>

					<div className="resources">
					<a  href="https://satnasmartcity.org/Webcontroller/custom_page/24" target="_noblank"
							className="resource">
							<div className="title">Satna Covid Tracker
							</div>
							<div className="link">https://satnasmartcity.org/Webcontroller/custom_page/24</div>
						</a>
						<br></br>
						<a  href="https://docs.google.com/spreadsheets/d/1E1IT4T3fE7cfgmSq5PuFrlWeN3pdVV4cWj5A_wBZ5WU/edit?usp=sharing" target="_noblank"
							className="resource">
							<div className="title">Important Contacts
							</div>
							<div className="link">https://docs.google.com/spreadsheets/d/1E1IT4T3fE7cfgmSq5PuFrlWeN3pdVV4cWj5A_wBZ5WU/edit?usp=sharing</div>
						</a>
					</div>
				</div>
			</div>
		</div>);
}

export default Information
