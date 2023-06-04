import React from 'react';
import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MdClose } from "react-icons/md"

function EditResume(){
    const [data, setData] = useState({
    fullName:"",
    currentDesignation:"",
    currentLocation:"",
    emailId:"", 
    phone:"",
    website:"",
    aboutMe:"",
    organization:[{ designation: "", name: "", tenure: "", location:"", writeUp:""}],
    education:[{ degree: "", instituteName: "", year: ""}],
    projects:[{ title: "", duration: "", url: "", description:""}],
    skills:[]});
    const params= useParams();
    
    useEffect( function () {
         fetch(`/api/${params.id}`)
          .then((res) => res.json())
          .then((data) => setData(data));
      }, []);
      
      
      
      
      const handleFormSubmit = async (e) => {
        e.preventDefault()
        
          await fetch(`/api/${params.id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then((res) => res.json())
          .then((newData) => setData(newData))
          .finally(() => {
              e.target.value = '';
            });
           
      }
      const AddEducation = () =>
      setData([...data.education, { degree: "", instituteName: "", year: ""}]);
  
  
      const RemoveEducation = (index) => {
      const list = [...data.education];
      list.splice(index, 1);
      setData(...data, list);
  };
  const AddProjects = () =>
    setData([...data.projects, { title: "", duration: "", url: "", description:""}]);


    const RemoveProjects = (index) => {
    const list = [...data.projects];
    list.splice(index, 1);
    setData(list);
};

const AddCompany = () =>
    setData([...data.organization, { designation: "", name: "", tenure: "", location:"", writeUp:""}]);


    const RemoveCompany = (index) => {
    const list = [...data.organization];
    list.splice(index, 1);
    setData(list);
};

const addSkills =  event => {
  if (event.key === "Enter" && event.target.value !== "" ) {
      setData([...data.skills, event.target.value]);
      event.target.value = "";
  }
  else if (event.key === "Backspace" && data.skills.length && event.target.value === 0){
      const skillsCopy = [...data.skills];
      skillsCopy.pop();
      event.preventDefault();
      setData(skillsCopy);
  }
  
};




const removeSkills = index => {
  setData([...data.skills.filter(tag => data.skills.indexOf(tag) !== index)]);
};

    return(
        
        <div className='edit-resume'>
           <form
                onSubmit={handleFormSubmit}
                encType='multipart/form-data'
            >
            <div className='profile'>
                <label htmlFor='fullName'>Name: </label>
                <input
                    type='text'
                    required
                    name='fullName'
                    id='fullName'
                    value={data.fullName}
                    onChange={(e) => setData({...data, fullName:e.target.value})}
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
                            value={data.currentDesignation}
                            onChange={(e) => setData({...data, currentDesignation:e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor='currentLocation'>Location </label>
                        <input
                            type='text'
                            // required
                            name='currentLocation'
                            id='currentLocation'
                            className='currentInput'
                            value={data.currentLocation}
                            onChange={(e) => setData({...data, currentLocation:e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor='emailId'>Email-Id</label>
                        <input
                            type="email"
                            required
                            name='emailId'
                            id='emailId'
                            className='currentInput'
                            value={data.emailId}
                            onChange={(e) => setData({...data, emailId:e.target.value})}
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
                            value={data.phone}
                            onChange={(e) => setData({...data, phone:e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor='website'>Website</label>
                        <input
                            type='text'
                            // required
                            name='website'
                            id='website'
                            className='currentInput'
                            value={data.website}
                            onChange={(e) => setData({...data, website:e.target.value})}
                        />
                    </div>
                </div> 
                
            </div>
            <div className='about-me'>
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
                    value={data.aboutMe}
                    placeholder='Write a brief description about yourself'
                    onChange={(e) => setData({...data, aboutMe:e.target.value})}
                />
            </div>
           
            <div className='education'>
              {data.education.map((edu, index) => (
                <div className='nestedContainer' key={index}>
                    <div className='companies'>
                        <label htmlFor='degree'>Degree</label>
                        <input
                            type='text'
                            name='degree'
                            id='degree'
                            value={data.education[index].degree}
                            // required
                            onChange={(e) =>setData({...data, degree:e.target.value})}
                        />
                    </div>
                    <div className='companies'>
                        <label htmlFor='instituteName'>Institute name</label>
                        <input
                            type='text'
                            name='instituteName'
                            id='instituteName'
                            // required
                            onChange={(e) =>setData({...data, instituteName:e.target.value})}
                        />
                    </div>
                    <div className='companies'>
                        <label htmlFor='year'>Year of passing</label>
                        
                        <input
                            type='number'
                            name='year'
                            id='year'
                            // required
                            onChange={(e) => setData({...data, year:e.target.value})}
                        />
                    </div>
                    

                    <div className='btn__group'>
                        {data.education.length - 1 === index && data.education.length < 10 && (
                            <button id='addBtn' onClick={AddEducation}>
                                Add
                            </button>
                        )}
                        {data.education.length > 1 && (
                            <button id='deleteBtn' onClick={() => RemoveEducation(index)}>
                                Del
                            </button>
                        )}
                    </div>
                </div>
            ))}

            </div>

            <div className='organizations'>
            {data.organization.map((company, index) => (
                <div className='nestedContainer' key={index}>
                    <div className='companies'>
                        <label htmlFor='designation'>Designation</label>
                        <input
                            type='text'
                            name='designation'
                            id='designation'
                            // required
                            onChange={(e) =>setData({...data, designation:e.target.value})}
                        />
                    </div>
                    <div className='companies'>
                        <label htmlFor='name'>Name of the organization</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            // required
                            onChange={(e) => setData({...data, name:e.target.value})}
                        />
                    </div>
                    <div className='companies'>
                        <label htmlFor='tenure'>Tenure</label>
                        
                        <input
                            type='text'
                            name='tenure'
                            id='tenure'
                            // required
                            onChange={(e) =>setData({...data, tenure:e.target.value})}
                        />
                        
                    </div>
                    <div className='companies'>
                        <label htmlFor='location'>Location </label>
                        <input
                            type='text'
                            name='location'
                            id='location'
                            // required
                            onChange={(e) => setData({...data, location:e.target.value})}
                        />
                    </div>
                    <label htmlFor='writeUp'>Job description </label>
                    <textarea
                      type='text'
                    // required
                    name='writeUp'
                    id='writeUp'
                    rows={10}
                    cols={40}
                    maxLength={1000}
                    minLength={100}
                    placeholder='Write a brief description about your job role'
                    onChange={(e) => setData({...data, writeUp:e.target.value})}
                />  

                    <div className='btn__group'>
                        {data.organization.length - 1 === index && data.organization.length < 10 && (
                            <button id='addBtn' onClick={AddCompany}>
                                Add
                            </button>
                        )}
                        {data.organization.length > 1 && (
                            <button id='deleteBtn' onClick={() => RemoveCompany(index)}>
                                Del
                            </button>
                        )}
                    </div>
                </div>
            ))}

            </div>

            <div className='projects'>
            {data.projects.map((edu, index) => (
                <div className='nestedContainer' key={index}>
                    <div className='companies'>
                        <label htmlFor='title'>Title </label>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            // required
                            onChange={(e) => setData({...data, title:e.target.value})}
                        />
                    </div>
                    <div className='companies'>
                        <label htmlFor='duration'>Duration</label>
                        <input
                            type='text'
                            name='duration'
                            id='duration'
                            // required
                            onChange={(e) => setData({...data, duration:e.target.value})}
                        />
                    </div>
                    <div className='companies'>
                        <label htmlFor='url'>URL</label>
                        
                        <input
                            type='url'
                            name='url'
                            id='url'
                            // required
                            onChange={(e) => setData({...data, url:e.target.value})}
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
                    onChange={(e) => setData({...data, description:e.target.value})}
                />

                    <div className='btn__group'>
                        {data.projects.length - 1 === index && data.projects.length < 4 && (
                            <button id='addBtn' onClick={AddProjects}>
                                Add
                            </button>
                        )}
                        {data.projects.length > 1 && (
                            <button id='deleteBtn' onClick={() => RemoveProjects(index)}>
                                Del
                            </button>
                        )}
                    </div>
                </div>
            ))}

            </div>

            <div className='skills'>
            {data.skills.map((tag, index) => (
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
                
                placeholder="Enter skills to add"
            />
            </div>
            <div className='btn__group'>
            <button type='submit'   >Submit</button>
            </div>
            </form>
        </div>
    )
}

export default EditResume;