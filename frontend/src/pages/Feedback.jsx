import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import axios from 'axios';
import UserNavbar from '../components/UserNavbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import routesPaths from '../router-config/routes-paths';
import UserCarousel from '../components/CarouselUser';

export default function Feedback() {
    const [content, setContent] = useState('');
    const navigate = useNavigate()

    const handleEditorChange = (value) => {
        setContent(value);
    };

    const handleSubmit = async () => {
        try {
            const userDetails = JSON.parse(Cookies.get('userBankingApp'));
            const accountId = userDetails.account._id
            const date = new Date()
            const response = await axios.post('http://localhost:3005/feedback', { content, accountId, date});
            // console.log(response)
            
            alert('Feedback sent successfully!');
            navigate(routesPaths.userHome)
        } catch (error) {
            console.error('Error sending feedback:', error);
        }
    };

    return (
        <div>
            <UserNavbar />
            <div className='bs align-items-center justify-content-center'>
                <h2 className='mt-2'>Feedback</h2>
                <ReactQuill value={content} onChange={handleEditorChange} className='my-5' />

                <button className='btn btn-primary my-5' type='button'
                    onClick={handleSubmit}>Submit Feedback</button>
            </div>
        </div>
    );
}
