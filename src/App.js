import React, { useState, Fragment,useEffect } from 'react'
import  axios from 'axios';
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import UserTable from './tables/UserTable'


const App = () => {

	const initialFormState = { id: null, name: '', email: '' }

	// Setting state
	const [ users, setUsers ] = useState([])
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	useEffect(() => {
		try{
		axios.get('http://node-postgres-crud-api-nirmesh-openshift-crud.apps.ocp4.ds.blr.lab/users')
		//axios.get('http://172.30.193.9/users')
		//axios.get('http://node-postgres-crud-api/users')
		.then((response) => {
			console.log("i m success");
			setUsers(response.data);
		});
	}catch(e){
		console.log("here is the issue::",e)
	}
	}, []);

	// CRUD operations
	const addUser = user => {
		user.id = users.length + 1
		setUsers([ ...users, user ])
	}

	const deleteUser = id => {
		setEditing(false)

		setUsers(users.filter(user => user.id !== id))
	}

	const updateUser = (id, updatedUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id, name: user.name, email: user.email })
	}

	return (
		<div className="container">
			<h1>Welcome to Dell OpenShift Demo</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add user</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View users</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
}

export default App
