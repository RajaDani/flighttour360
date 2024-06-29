import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Grid } from "@mui/material";
import Breadcrumb from "../shared/Breadcrumb";
import io from 'socket.io-client';
import RecentChatsSidebar from './cahtSidebar'
import ChatScreen from './Chatbos'
import { baseurl } from '../shared/baseUrl';

export default function BookedFlights() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null); // Assuming you track the selected user
const [userChat,setUserChat]=useState([])


  
    const handleChat=(id)=>{
        setSelectedUserId(id)
        // getChatByUser(id)
}
  return (
      <Grid container spacing={2}>
      <Grid item xs={2}>
        <RecentChatsSidebar selectedChat={(id)=>handleChat(id)} />
      </Grid>
      <Grid item xs={10}>
        <ChatScreen selectedUserId={selectedUserId} chatUpdate={(caht)=>{}}/>
      </Grid>
    </Grid>
    // <Box className="b-10 w-full -ml-10 pr-10 mt-16">
    //   <Breadcrumb path={"Booked Flights"} title={"Booked Flights"} />
      
    //   <div>
    //     <h2>Admin Panel</h2>
    //     <div>
    //       {messages.map((msg, index) => (
    //         <div key={index}>
    //           <p>{msg.message.text}</p>
    //         </div>
    //       ))}
    //     </div>
    //     <TextField
    //       label="Reply"
    //       variant="outlined"
    //       fullWidth
    //       multiline
    //       rows={3}
    //       value={replyText}
    //       onChange={(e) => setReplyText(e.target.value)}
    //       style={{ marginBottom: '10px' }}
    //     />
    //     <Button variant="contained" color="primary" onClick={sendMessageToUser}>
    //       Send Reply
    //     </Button>
    //   </div>
    // </Box>
  );
}
