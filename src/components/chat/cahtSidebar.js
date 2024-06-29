import { List, ListItem, ListItemText, Divider, Avatar } from '@mui/material';
import { baseurl } from '../shared/baseUrl';
import { useEffect, useState } from 'react';
import { PropaneSharp } from '@mui/icons-material';
import { io } from 'socket.io-client';

export default function RecentChatsSidebar(props) {
const [allChats,setAllChats]=useState([])
const [selectedChat,setSelectedChat]=useState()
  const [newMessage, setNewMessage] = useState('');
const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);


    async function getAllChats() {
        const response = await fetch(`${baseurl}/chats/read`);
        const chats = await response.json();
        console.log(chats,"=============chats=============");
        setAllChats(chats?.users);
    }
   
    useEffect(()=>{
getAllChats()
    },[messages])
    const handleChatSelection=(id)=>{
        props.selectedChat(id)
        setSelectedChat(id)
    }
  return (
    <div className="h-[900px] w-64 bg-gray-100 mt-20 overflow-auto">
      <List>
        {allChats.map((chat) => (
          <ListItem key={chat.id} onClick={()=>handleChatSelection(chat.id)}  className='cursor-pointer'>
            <Avatar src='https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'/>
            <ListItemText primary={chat.name} secondary={chat.last_message} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};