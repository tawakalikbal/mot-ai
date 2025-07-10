"use client";
import { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
export default function Page() {
  return (
    <section className="min-h-[200vh] bg-slate-700 relative p-20">
      <ChatbotWidget />
    </section>
  );
}

const ChatbotWidget = () => {
  const [showChat, setShowChat] = useState(false);
  const handleWidgetClick = () => {
    setShowChat((prev) => !prev);
  };
  const chatBubblesRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const [chatData, setChatData] = useState([
    {
      sender: "bot",
      message: "Hi, I'm AiYU, your travel assistant. How can i help you today?",
    },
  ]);

  useEffect(() => {
    if (chatBubblesRef.current) {
      chatBubblesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatData]);

  return (
    <>
      <div
        className="size-10 bg-gradient-to-r from-[#02b9da] to-[#09d99d] rounded-full fixed bottom-10 right-10 cursor-pointer z-100"
        onClick={handleWidgetClick}
      />

      <div
        className={cn("fixed inset-0 bg-black/20", { invisible: !showChat })}
        onClick={handleWidgetClick}
      >
        <section
          className={cn(
            "max-w-[500px] w-full h-[600px] flex flex-col fixed bottom-20 right-20 transition ease-out opacity-100 duration-150 origin-bottom-right",
            {
              "scale-0 translate-x-[20px] translate-y-[20px] opacity-0 ease-in":
                !showChat,
            }
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className=" p-4 bg-gradient-to-r from-[#02b9da] to-[#09d99d] flex items-center justify-between">
            <p className="font-semibold">AiYU - Your AI Travel Assistant</p>
            <X
              size={24}
              className="cursor-pointer"
              onClick={handleWidgetClick}
            />
          </div>
          <div className="flex flex-col overflow-auto py-8 px-4 flex-1 bg-[#fdfdfd] gap-4 custom-scrollbar">
            {chatData.map(({ sender, message }, idx) => (
              <ChatBubble
                sender={sender}
                message={message}
                key={idx}
                isLoading={isLoading}
              />
            ))}

            {isLoading && (
              <p className="text-gray-500 px-5 animate-pulse">Typing...</p>
            )}
            <div ref={chatBubblesRef}></div>
          </div>
          <ChatInput setData={setChatData} setIsLoading={setIsLoading} />
        </section>
      </div>
    </>
  );
};

const ChatBubble = ({ sender = "bot", message }) => {
  return (
    <div
      className={cn("flex gap-3 w-full max-w-[90%]", {
        "ml-auto max-w-[80%]": sender === "user",
      })}
    >
      {sender === "bot" && (
        <>
          <div className="size-10 bg-gradient-to-r shrink-0 from-[#02b9da] to-[#09d99d] rounded-full" />
          <div className="flex flex-col text-black">
            <p className="font-semibold ">AiYu</p>

            <div className="bg-[#f1f5fa] px-5 py-5 rounded-xl rounded-tl-none whitespace-pre-wrap">
              <p>{message}</p>
            </div>
          </div>
        </>
      )}
      {sender === "user" && (
        <>
          <div className="flex flex-col ml-auto ">
            <p className="font-semibold text-right text-black">You</p>
            <div className="bg-[#334054] px-4 py-3 rounded-xl rounded-tr-none text-[#e6e9ee] whitespace-pre-wrap">
              {message}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ChatInput = ({ setData, setIsLoading }) => {
  const [input, setInput] = useState("");
  const timeoutRef = useRef(null);

  const onHandleInput = (e) => {
    setInput(e.target.value);
  };

  const onHandleSubmit = (e) => {
    const { key } = e;
    if (key == "Enter" || e.target.name == "send") {
      setInput("");
      setIsLoading(true);
      setData((prev) => [
        ...prev,
        {
          sender: "user",
          message: input,
        },
      ]);

      if (timeoutRef.current) return;
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        setData((prev) => [
          ...prev,
          {
            sender: "bot",
            message:
              "Hi there! 👋 \nThank you for reaching out.\n\nUnfortunately, our chatbot is currently undergoing maintenance. We appreciate your patience, talk to you soon!",
          },
        ]);
        timeoutRef.current = null; // Reset after execution
      }, 2000);
    }
  };

  return (
    <div className="py-5 px-6 bg-[#fdfdfd] border-t-2 flex gap-4 items-center ">
      <input
        onKeyDown={(e) => onHandleSubmit(e)}
        className="text-black  outline-none w-full "
        placeholder="Write your question here..."
        onChange={(e) => onHandleInput(e)}
        value={input}
      />
      <div name="send" onClick={(e) => onHandleSubmit(e)}>
        <Send className="size-6 shrink-0  cursor-pointer" color="blue" />
      </div>
    </div>
  );
};
