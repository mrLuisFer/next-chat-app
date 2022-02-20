import type { NextPage } from "next";
import { firestore } from 'lib/Firebase'
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";

const Login: NextPage = () => {

	const getUsers = async () => {
		const usersCollection = collection(firestore, 'user')
		const usersQuery = query(usersCollection, where('authorized', '==', true), limit(10));
		const querySnapshot = await getDocs(usersQuery);
		const result: QueryDocumentSnapshot<DocumentData>[] = [];
		
		querySnapshot.forEach((snapshot) => {
			result.push(snapshot);
		})
		console.log(result);
	}

	getUsers()

	return (
		<div>
			<p>Login</p>
		</div>
	);
};

export default Login;
