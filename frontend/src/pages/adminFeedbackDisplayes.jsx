import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNavbar from '../components/AdminNavbar'
import FeedbackDisplay from '../components/FeedbackDisplay'

export default function AdminFeedbackDisplayes() {
    const [feedbacks, setFeedbacks] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('http://localhost:3005/feedback');

            if (response.status === 200) {
                setFeedbacks(response.data.feedbackList)
            }
        }
        getData();
    }, [])
    return (
        <div>
            <AdminNavbar></AdminNavbar>
            {feedbacks ? <>
                {feedbacks.map((feedback, index) => (
                    <FeedbackDisplay key={index} feedback={feedback} index={index} />
                ))}
            </> : <>
                <h1> No Feedbacks to display right now.</h1>
            </>}
        </div>
    )
}
