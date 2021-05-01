import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import Menu from './menu';
import firebase from './Firebase.js'
import { confirmAlert } from 'react-confirm-alert';

// import {}


export const db = firebase.firestore();
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

	const handleNote= (event) => {
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
			additional: additional
		  });
		  setIsLoading(true);
		  window.alert("Submitted Successfully");
		  window.location.reload(false);

	}






	return (
		<div>
			<section className="appointment">
				<div className="form__container show">
					<form className="dashboard wrapper" onSubmit={handleSubmit}>
						<div className="form--option">
							<label>
								<input placeholder="Patient Name/रोगी का नाम" type="text" id="name" required />
							</label>
							<label>
								<input placeholder="Patient Age/रोगी की आयु" type="text" id="age"  required />
							</label>
							<label>
								<input placeholder="Oxygen Level/ऑक्सीजन स्तर" type="text" id="ol"required />
							</label>
							<label>
								<input placeholder="Place/जगह" type="text" id="place" required />
							</label>
							<label>
								<select class="custom-select custom-select-lg mb-3" id="need" placeholder="What are you looking for?/आप क्या ढूंढ रहे हैं?">
								    <option value=''>Requirement/आवश्यकता</option>
									<option value="Oxygen">Oxygen</option>
									<option value="Food">Food</option>
									<option value="Medicine">Medicine</option>
									<option value="CT">CT Scan</option>
									<option value="Doctor">Doctor Consultation</option>
									<option value="Bed">Bed</option>
									<option value="Plasma">Plasma</option>

								</select>
							</label>
							<label>
								<input placeholder="Attendant Name/अटेंडेंट का नाम" type="text" id="attName" required />
							</label>
							<label>
								<input placeholder="Attendant Contact/अटेंडेंट संपर्क" type="text" id="attContaxt" required />
							</label>
								Addition Details(Medicine Name, Address)/अतिरिक्त विवरण (चिकित्सा नाम, पता):
          						<textarea  id="additional" required/>
						
						</div>
						<div className="form--option">
							<input className="button button--next button--submit" type="submit" value="Submit" disabled={isLoading ? true : false}/>
							{isLoading ? (
                                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        ) : (
                                                            <span></span>
                                                        )}
						</div>
					</form>
				</div>

			</section>
			{/* <Menu showMenu={this.showMenu} hideMenu={this.hideMenu} toggleMenu={this.state.toggleMenu} addAppointment={this.addAppointment}/> */}
		</div>
	)


}

export default Dashboard