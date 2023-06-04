import React , {useState, useEffect} from 'react';
import { MdClose } from "react-icons/md"
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';

function CreateResume({showHome}){
   
    const [fullName, setFullName] = useState("");
    const [currentDesignation, setCurrentDesignation] = useState("");
    const [currentLocation, setCurrentLocation] = useState("");
    const [emailId, setEmailId] = useState("");
    const [phone, setPhone] = useState();
    const [website, setWebsite] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const [organization, setOrganization] = useState([{ designation: "", name: "", tenure: "", location:"", writeUp:""}]);
    const [education, setEducation] = useState([{ degree: "", instituteName: "", year: ""}]);
    const [projects, setProjects] = useState([{ title: "", duration: "", url: "", description:""}]);
    const [error, setError] = useState("");
    const [skills, setSkills] = useState([]);
    const [data, setData] = useState([]);
    
   
    const AddCompany = () =>
    setOrganization([...organization, { designation: "", name: "", tenure: "", location:"", writeUp:""}]);


    const RemoveCompany = (index) => {
    const list = [...organization];
    list.splice(index, 1);
    setOrganization(list);
};

    const UpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...organization];
    list[index][name] = value;
    setOrganization(list);
};

const AddEducation = () =>
    setEducation([...education, { degree: "", instituteName: "", year: ""}]);


    const RemoveEducation = (index) => {
    const list = [...education];
    list.splice(index, 1);
    setEducation(list);
};

    const UpdateEducation = (e, index) => {
    const { name, value } = e.target;
    const list = [...education];
    list[index][name] = value;
    setEducation(list);
};

const AddProjects = () =>
    setProjects([...projects, { title: "", duration: "", url: "", description:""}]);


    const RemoveProjects = (index) => {
    const list = [...projects];
    list.splice(index, 1);
    setProjects(list);
};

    const UpdateProjects = (e, index) => {
    const { name, value } = e.target;
    const list = [...projects];
    list[index][name] = value;
    setProjects(list);
};

const addSkills =  event => {
    if (event.key === "Enter" && event.target.value !== "" ) {
        setSkills([...skills, event.target.value]);
        event.target.value = "";
    }
    else if (event.key === "Backspace" && skills.length && event.target.value === 0){
        const skillsCopy = [...skills];
        skillsCopy.pop();
        event.preventDefault();
        setSkills(skillsCopy);
    }
    else if(skills.length < 1 && event.key === "Backspace"){
        setError("Since there is no tags you can't able to delete any tags");
    }
    
    else if(event.target.value === "" && event.key === "Enter"){
        setError("The tag should be one character long!");
    }
};



const removeSkills = index => {
    setSkills([...skills.filter(tag => skills.indexOf(tag) !== index)]);
};
const handleError = () => {
    setError("");
}
const navigate = useNavigate();
const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    await fetch(`/api`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id:uuidv4(),
        fullName, 
        currentDesignation,
        currentLocation,
        emailId, 
        phone,
        website,
        aboutMe,
        organization,
        education,
        projects,
        skills
    }),
    
    })
    .then((res) => res.json())
        .then((newData) => setData([...data, newData]))
        
        .finally(() => {
          e.target.value = '';
        });
        showHome();
        navigate('/*');
  }


 
    return(
        <div className='create-resume'>
            <h2>Enter Your details</h2>
            <form
                onSubmit={handleFormSubmit}
                method='POST'
                encType='multipart/form-data'
            >
            <div className='profile'>
                <label htmlFor='fullName'>Name </label>
                <input
                    type='text'
                     required
                    name='fullName'
                    id='fullName'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <div className='nestedContainer'>
                    <div>
                        <label htmlFor='currentDesignation'>Current Designation </label>
                        <input
                            type='text'
                            required
                            name='currentDesignation'
                            className='currentInput'
                            id='currentDesignation'
                            value={currentDesignation}
                            onChange={(e) => setCurrentDesignation(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='currentLocation'>Location </label>
                        <input
                            type='text'
                             required
                            name='currentLocation'
                            id='currentLocation'
                            className='currentInput'
                            value={currentLocation}
                            onChange={(e) => setCurrentLocation(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='emailId'>Email-Id </label>
                        <input
                            type="email"
                            required
                            name='emailId'
                            id='emailId'
                            className='currentInput'
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='phone'>Contact no. </label>
                        <input
                            type='tel'
                            required
                            name='phone'
                            id='phone'
                            className='currentInput'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='website'>Website </label>
                        <input
                            type='text'
                            // required
                            name='website'
                            id='website'
                            className='currentInput'
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>
                </div>
                
            </div>

            
            <label htmlFor='aboutMe'>About Me </label>
                <textarea
                    type='text'
                    // required
                    name='aboutMe'
                    id='aboutMe'
                    rows={10}
                    cols={40}
                    maxLength={500}
                    minLength={100}
                    value={aboutMe}
                    placeholder='Write a brief description about yourself (max words 500)'
                    onChange={(e) => setAboutMe(e.target.value)}
                />
            
            
            
                <h4>Education Details</h4>
            {education.map((edu, index) => (
                <div className='nestedContainer' key={index}>
                    <div className='companies'>
                        <label htmlFor='degree'>Degree </label>
                        <input
                            type='text'
                            name='degree'
                            id='degree'
                            // required
                            onChange={(e) => UpdateEducation(e, index)}
                        />
                    </div>
                    <div className='companies'>
                        <label htmlFor='instituteName'>Institute name </label>
                        <input
                            type='text'
                            name='instituteName'
                            id='instituteName'
                            // required
                            onChange={(e) => UpdateEducation(e, index)}
                        />
                    </div>
                    <div className='companies'>
                        <label htmlFor='year'>Year of passing </label>
                        
                        <input
                            type='text'
                            name='year'
                            id='year'
                            // required
                            onChange={(e) => UpdateEducation(e, index)}
                        />
                    </div>
                    

                    <div className='btn__group'>
                        {education.length - 1 === index && education.length < 4 && (
                            <button id='addBtn' onClick={AddEducation}>
                                Add
                            </button>
                        )}
                        {education.length > 1 && (
                            <button id='deleteBtn' onClick={() => RemoveEducation(index)}>
                                Del
                            </button>
                        )}
                    </div>
                </div>
            ))}

            

            <div className='organizations'>
            <h4>Work Experience</h4>
            {organization.map((company, index) => (
                <div className='nestedContainer' key={index}>
                    <div className='companies'>
                        <label htmlFor='designation'>Designation </label>
                        <input
                            type='text'
                            name='designation'
                            id='designation'
                            // required
                            onChange={(e) => UpdateCompany(e, index)}
                        />
                    </div>
                    <div className='companies'>
                        <label htmlFor='name'>Name of the organization </label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            // required
                            onChange={(e) => UpdateCompany(e, index)}
                        />
                    </div>
                    <div className='companies'>
                        <label htmlFor='tenure'>Tenure </label>
                        
                        <input
                            type='number'
                            name='tenure'
                            id='tenure'
                            // required
                            onChange={(e) => UpdateCompany(e, index)}
                        />
                        
                    </div>
                    <div className='companies'>
                        <label htmlFor='location'>Location </label>
                        <input
                            type='text'
                            name='location'
                            id='location'
                            // required
                            onChange={(e) => UpdateCompany(e, index)}
                        />
                    </div>
                    <div>
                    <label htmlFor='writeUp'>Job description </label>
                    <textarea
                      type='text'
                    // required
                    name='writeUp'
                    id='writeUp'
                    rows={10}
                    cols={40}
                    maxLength={500}
                    minLength={100}
                    placeholder='Write a brief description about your job role'
                    onChange={(e) => UpdateCompany(e, index)}
                />  
                </div>

                    <div className='btn__group'>
                        {organization.length - 1 === index && organization.length < 4 && (
                            <button id='addBtn' onClick={AddCompany}>
                                Add
                            </button>
                        )}
                        {organization.length > 1 && (
                            <button id='deleteBtn' onClick={() => RemoveCompany(index)}>
                                Del
                            </button>
                        )}
                    </div>
                </div>
            ))}

            </div>

            <h4>Project Details</h4>
            {projects.map((edu, index) => (
                <div className='nestedContainer' key={index}>
                    <div className='companies'>
                        <label htmlFor='title'>Title </label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            // required
                            onChange={(e) => UpdateProjects(e, index)}
                        />
                    </div>
                    <div className='companies'>
                        <label htmlFor='duration'>Duration </label>
                        <input
                            type='text'
                            name='duration'
                            id='duration'
                            // required
                            onChange={(e) => UpdateProjects(e, index)}
                        />
                    </div>
                    <div className='companies'>
                        <label htmlFor='url'>URL </label>
                        
                        <input
                            type='url'
                            name='url'
                            id='url'
                            // required
                            onChange={(e) => UpdateProjects(e, index)}
                        />
                    </div>
                    <label htmlFor='description'>Project Description </label>
                    <textarea
                    type='text'
                    name='description'
                    id='description'
                    rows={10}
                    cols={40}
                    maxLength={1000}
                    minLength={100}
                    placeholder='Project Summary'
                    onChange={(e) => UpdateProjects(e, index)}
                />

                    <div className='btn__group'>
                        {projects.length - 1 === index && projects.length < 4 && (
                            <button id='addBtn' onClick={AddProjects}>
                                Add
                            </button>
                        )}
                        {projects.length > 1 && (
                            <button id='deleteBtn' onClick={() => RemoveProjects(index)}>
                                Del
                            </button>
                        )}
                    </div>
                </div>
            ))}

            

<h4>Skills</h4>
            {skills.map((tag, index) => (
                <div className="single-tag" key={index}>
                    <span>{tag}</span>
                    <i
                        onClick={() => removeSkills(index)} 
                    >
                        <MdClose />
                    </i>
                </div>
            ))}
            
            <input
                type="text"
                onKeyDown={event => addSkills(event)}
                onChange={handleError}
                placeholder="Enter skills to add"
            />
            
                <div className='btn__group'>
                <button type='submit'   >Submit</button>
                
                </div>
            </form>
        </div>
    )
}

export default CreateResume;
