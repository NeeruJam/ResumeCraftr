import React from 'react';
import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';


function ViewResume(){
const params= useParams();
const [data, setData] = useState([]);
useEffect(function () {
    fetch(`/api/${params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);


    return(
        <div className='View-resume'>
            <div className='personal-details'>
            <h3> {data.fullName}</h3>
            <h5>{data.currentDesignation}</h5>
            <h6>{data.currentLocation}</h6>
            <h6>{data.emailId}</h6>
            <h6>{data.phone}</h6>
            <h6>{data.website}</h6>
            </div>
            <div className='about-me'>
                <h4>About Me</h4>
                <p>{data.aboutMe}</p>
            </div>
            <div className='education'>
                <h4>Education</h4>
                {data.length !==0 && data.education.map((item) =>(
                    <div className='company'>
                        <h5>{item.degree}</h5>
                        <h6>{item.instituteName}</h6>
                        <h6>{item.year}</h6>
                    </div>
                ))}
            </div>
            <div className='organization'>
                <h4>Work Experience</h4>
                {data.length !==0 && data.organization.map((item) =>(
                    <div className='company'>
                        <h5>{item.designation}</h5>
                        <h6>{item.name}</h6>
                        <h6>{item.location}</h6>
                        <h6>{item.tenure}</h6>
                        <p>{item.writeUp}</p>
                    </div>
                ))}         
            </div>
            <div className='projects'>
                <h4>Project Details</h4>
                {data.length !==0 && data.projects.map((item) =>(
                    <div className='company'>
                        <h5>{item.title}</h5>
                        <h6>{item.tenure}</h6>
                        <h6>{item.url}</h6>
                        <p>{item.description}</p>
                    </div>
                ))}         
            </div>
            <div className='skills'>
                <h4>Skills</h4>
                {data.length !==0 && data.skills.map((item) =>(
                    <div className='company'>
                        
                        <h6>{item}</h6>
                       
                    </div>
                ))}         
            </div>
            
        </div>
        
    )
}

export default ViewResume;