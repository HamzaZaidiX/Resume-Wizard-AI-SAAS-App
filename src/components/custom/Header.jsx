import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <div className='flex justify-between p-3 px-5 shadow-md'>
             <Link to={'/dashboard'}>
            <img src='/logo.svg' className='cursor-pointer' width={200} height={100} />
            </Link>
            {isSignedIn ?
                <div className='flex items-center gap-2'>
                    <Link to={'/dashboard'}>
                        <Button variant="outline">Dashboard</Button>
                    </Link>
                    <UserButton />
                </div> :
                <Link to={'/auth/sign-in'}>
                    <Button>Get Started</Button>
                </Link>
            }

        </div>
    )
}

export default Header