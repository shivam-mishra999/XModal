import React, {useState, useEffect} from 'react';
import "./Modal.css";


export default function Modal(){
    const [openForm, setOpenForm] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");

    const handleOpenForm = (event) => {
        console.log("opened")
        event.stopPropagation();
        setOpenForm(true);
    }

    const handleCloseForm = () => {
        console.log("closed form")
        setOpenForm(false);
    }

    const handleSubmit = () => {
        const emailInput = document.getElementById('email');

        if (!email.includes('@')) {
            emailInput.setCustomValidity(`Please include an '@' in the email address. ${email} is missing an '@'.`);
        } else {
            emailInput.setCustomValidity('');
        }
        
        if(phone.length !== 10){
            alert("Invalid phone number. Please enter a 10-digit phone number.")
            return;
        }
        const currentDate = new Date();
        const inputDate = new Date(dob);
        if(inputDate > currentDate){
            alert("Invalid date of birth. Date of birth cannot be in the future.")
        }
        handleCloseForm();
    }

    useEffect(()=>{
        const handleClickOutside = (event)=>{
            const modalContent = document.querySelector('.modal');
        
            if (openForm && !modalContent.contains(event.target)) {
                handleCloseForm();
            }
        };
        document.addEventListener("click", handleClickOutside);

        return (()=>{
            document.removeEventListener("click", handleClickOutside);
        })

    },[openForm])

    return (
        <div className='container'>  
            
                <div>
                    <h1>User Details Modal</h1>
                    <button onClick={handleOpenForm}>Open Form</button>
                </div>
                

                {openForm && (
                 <form>  
                    <div className="modal"> 
                        <div className="modal-content">
                            
                            <h2>Fill Details</h2>
                            <label htmlFor="username">Username:</label>
                            <input id="username" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required />

                            <label htmlFor="email">Email Address:</label>
                            <input 
                             id="email"
                             type="email"
                             value={email} 
                             onChange={(e)=> setEmail(e.target.value)} 
                             required 
                             title={`Please include an '@' in the email address. ${email} is missing an '@'.`}
                             />

                            <label htmlFor="phone">Phone Number:</label>
                            <input id="phone" type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} required />

                            <label htmlFor="dob">Date of Birth:</label>
                            <input id="dob" type="date" value={dob} onChange={(e)=>setDob(e.target.value)} required />

                            <button className="submit-button" onClick={handleSubmit}>Submit</button>
                            
                        
                        </div>
                    </div>
                </form>
            )}
                
            
        </div>
    )
};