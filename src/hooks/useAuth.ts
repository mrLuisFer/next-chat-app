import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from 'context/UserContext'

interface IUseAuth {
	authorized: boolean
	setAuthorized: Dispatch<SetStateAction<boolean>>
}

export const useAuth = (): IUseAuth => {
	const [authorized, setAuthorized] = useState<boolean>(false)
	const { username, userError } = useUserContext()
	const router = useRouter()

	useEffect(() => {
		console.log(`${username.length} ${authorized}`)
		if (userError && userError !== null) {
			router.push('/login')
			return
		}
		setAuthorized(true)
	}, [])

	return {
		authorized,
		setAuthorized
	}
}