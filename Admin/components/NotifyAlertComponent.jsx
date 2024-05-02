import React from 'react'
import { Alert } from 'react-bootstrap'

function NotifyAlertComponent({description , subdescription}) {
  return (
    <Alert variant="success">
        <Alert.Heading>Well done!</Alert.Heading>
        <p className='clsx-notifyalert-text mt-3'>
            {description}
        </p>
        <hr />
        <p className="mb-0 clsx-notifyalert-text">
            {subdescription}
        </p>
    </Alert>
  )
}

export default NotifyAlertComponent