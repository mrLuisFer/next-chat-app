import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from 'context/UserContext'

interface IUseAuth {
	authorized: boolean
	setAuthorized: Dispatch<SetStateAction<boolean>>
}

export const useAuth = (): IUseAuth => {
	const [authorized, setAuthorized] = useState<boolean>(false)
	const { username } = useUserContext()
	const router = useRouter()

	useEffect(() => {
		console.log(`${username.length} ${authorized}`)
		if (username.length > 2) {
			setAuthorized(true)
		} else {
			router.push('/login')
		}
	}, [])

	return {
		authorized,
		setAuthorized
	}
}