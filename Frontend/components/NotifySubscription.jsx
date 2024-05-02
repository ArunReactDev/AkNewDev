import React from 'react'
import { Alert } from 'react-bootstrap'
import Link from 'next/link';

function NotifySubscription({description , subdescription}) {
  return (
    <Alert variant="warning">
        <Alert.Heading>Alert!</Alert.Heading>
        <p className='clsx-notifyalert-text mt-3'>
            {description}
        </p>
        <hr />
        <p className="mb-0 clsx-notifyalert-text">
            {subdescription}.
            <span className='px-2'><Link href="/subscription" className="btn btn-outline-primary btn-sm">Subscribe Now</Link></span>
        </p>
    </Alert>
  )
}

export default NotifySubscription