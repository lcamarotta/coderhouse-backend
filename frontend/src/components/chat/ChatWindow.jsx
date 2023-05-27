import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';

const ChatWindow = ({ socket }) => {
	const [user, setUser] = useState([]);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on('messageLog', ( payload ) => {
			const lastMessage = payload[payload.length - 1]
			setUser((prev) => {	return [...prev, lastMessage.user];	});
			setMessages((prev) => {	return [...prev, lastMessage.message]; });
		});
		return () => socket.off('messageLog'); 
	}, []);

	return (
		<>
		{ 
			user.map( (user, index) => {
				return <ListGroup.Item key={index}>{user}: {messages[index]}</ListGroup.Item>;
			})
		}
		</>
	);
};

export default ChatWindow