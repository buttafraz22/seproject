import React from 'react'
import DOMPurify from 'dompurify'

export default function FeedbackDisplay({feedback, index}) {
    const sanitizedContent = DOMPurify.sanitize(feedback.content);
    const date = feedback.date.slice(0,10).split('-')
  return (

    <div className="card my-5">
        <div className="card-header"> <h4>{index + 1} : {date[2]}-{date[1]}-{date[0]}</h4></div>
        <div className='card-body' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        <div className="card-footer">
            <footer>
                Feedback By : <p>{feedback.authorName} , {feedback.authorCnic} </p>
            </footer>
        </div>
    </div>

  )
}
