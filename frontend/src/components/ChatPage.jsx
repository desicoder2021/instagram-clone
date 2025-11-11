import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setSelectedUser } from "@/redux/authSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessageCircleCode } from "lucide-react";
import Messages from "./Messages";

const ChatPage = () => {
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const isOnline = true;
  const [textMessage, setTextMessage] = useState("");
  const sendMessageHandler = () => {
    // Logic to send message
  };
  return (
    <div className='flex ml-[16%] h-screen'>
      <section className='w-full md:w-1/4 my-8'>
        <h1 className='mb-4 font-bold px-3 text-xl'>{user?.username}</h1>
        <hr className='mb-4 border-gray-300' />
        <div className='overflow-y-auto h-[80vh]'>
          {suggestedUsers.map((suggestedUser) => {
            return (
              <div
                className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
              >
                <Avatar className='w-14 h-14'>
                  <AvatarImage src={suggestedUser?.profilePicture} alt='User' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <span className='font-medium'>{suggestedUser?.username}</span>
                  <span
                    className={`text-xs font-bold ${
                      isOnline ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {selectedUser ? (
        <section className='flex-1 border-1 border-gray-300 flex flex-col h-full'>
          <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
            <Avatar>
              <AvatarImage src={selectedUser?.profilePicture} alt='User' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <span>{selectedUser?.username}</span>
            </div>
          </div>
          <Messages selectedUser={selectedUser} />
          <div className='flex items-center p-4 border-t border-gray-300'>
            <Input
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              type='text'
              placeholder='Type a message...'
              className='flex-1 mr-2 focus-visible:ring-transparent'
            />
            <Button onClick={() => sendMessageHandler(selectedUser?._id)}>
              Send
            </Button>
          </div>
        </section>
      ) : (
        <div className='flex flex-col items-center justify-center mx-auto'>
          <MessageCircleCode className='w-32 h-32 my-4' />
          <h1 className='font-medium'>Your message</h1>
          <span>Send a message to start chatting</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
