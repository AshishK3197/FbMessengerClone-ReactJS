import "./App.css";
import React, { useEffect, useState } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	const [userName, setUserName] = useState("");
	// console.log(messages);

	const sendMessage = (event) => {
		//all the logic to send the message goes here.
		// setMessages([...messages, { userName: userName, message: input }]);
		setInput("");
		db.collection("messages").add({
			message: input,
			userName: userName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		event.preventDefault();
	};

	useEffect(() => {
		//when [] means this code runs once when the app component reloads
		//when [input] means this code runs every single time input changes.
		setUserName(prompt("Please Enter your Name"));
	}, []);

	useEffect(() => {
		db.collection("messages")
			.orderBy("timestamp", "asc")
			.onSnapshot((snapshot) => {
				// console.log(
				// 	snapshot.docs.map((doc) => {
				// 		return doc.data();
				// 	})
				// );
				setMessages(
					snapshot.docs.map((doc) => {
						console.log({ id: doc.id, message: doc.data() });
						return { id: doc.id, message: doc.data() };
					})
				);
			});
	}, []);

	return (
		<div className="App">
			<img
				src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100"
				alt="Facebook Messenger Clone 💻"
			/>
			<h1>The Messenger App</h1>
			<h5>Welcome {userName}</h5>
			<form className="app__form">
				<FormControl className="app__formcontrol">
					{/* <InputLabel>Enter the Message:</InputLabel> */}
					<Input
						className="app__input"
						placeholder="Enter your Message"
						type="text"
						value={input}
						onChange={(event) => {
							setInput(event.target.value);
						}}
					/>
					{/* <Button
						type="submit"
						disabled={!input}
						onClick={sendMessage}
						color="primary"
						variant="contained"
					>
						Send
					</Button> */}
					<IconButton
						className="app__iconbutton"
						type="submit"
						disabled={!input}
						onClick={sendMessage}
						color="primary"
						variant="contained"
					>
						<SendIcon />
					</IconButton>
				</FormControl>
			</form>

			<FlipMove>
				{messages.map(({ message, id }) => {
					return <Message key={id} userName={userName} message={message} />;
				})}
			</FlipMove>
		</div>
	);
}

export default App;
