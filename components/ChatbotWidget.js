import { cn } from '@/lib/utils/cn'
import { getOrCreateSessionId, getOrCreateUserId } from '@/utils/session'
import { Send, X } from 'lucide-react'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'


export const ChatbotWidget = forwardRef((props, ref) => {
  const [showChat, setShowChat] = useState(false)
  const handleWidgetClick = () => {
    setShowChat((prev) => !prev)
  }
  const chatBubblesRef = useRef(null)
  const { onItineraryUpdate } = props;

  const [isLoading, setIsLoading] = useState(false)
  const [chatData, setChatData] = useState([
    {
      sender: 'bot',
      message: "Hi, I'm MaiA, your travel assistant. How can i help you today?",
    },
  ])

  // This allows parent components to call `ref.current.openChat()`
  useImperativeHandle(ref, () => ({
    openChat: () => setShowChat(true),
    closeChat: () => setShowChat(false),
    toggleChat: () => setShowChat((prev) => !prev),
    sendChat: (message) => {
      setShowChat(true)
      setIsLoading(true)
      setChatData((prev) => [...prev, { sender: 'user', message }])

      // Simulate bot response
      setTimeout(() => {
        setIsLoading(false)
        setChatData((prev) => [
          ...prev,
          {
            sender: 'bot',
            message:
              'Hi there! 👋 \nThank you for reaching out.\n\nUnfortunately, our chatbot is currently undergoing maintenance. We appreciate your patience, talk to you soon!',
          },
        ])
      }, 2000)
    },
  }))

  useEffect(() => {
    if (chatBubblesRef.current) {
      chatBubblesRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatData])

  return (
    <>
      <div
        className='size-10 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full fixed bottom-10 right-10 cursor-pointer z-100'
        onClick={handleWidgetClick}
      />

      <div
        className={cn('fixed inset-0 bg-black/20  z-[101]', {
          invisible: !showChat,
        })}
        onClick={handleWidgetClick}
      >
        <section
          className={cn(
            'max-w-[500px] w-full h-[600px] flex flex-col fixed bottom-20 right-20 transition ease-out opacity-100 duration-150 origin-bottom-right',
            {
              'scale-0 translate-x-[20px] translate-y-[20px] opacity-0 ease-in': !showChat,
            }
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className=' p-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 flex items-center justify-between'>
            <p className='font-semibold text-white'>MaiA - Your AI Travel Assistant</p>
            <X size={24} className='cursor-pointer' onClick={handleWidgetClick} />
          </div>
          <div className='flex flex-col overflow-auto py-8 px-4 flex-1 bg-[#fdfdfd] gap-4 custom-scrollbar'>
            {chatData.map(({ sender, message }, idx) => (
              <ChatBubble sender={sender} message={message} key={idx} isLoading={isLoading} />
            ))}

            {isLoading && <p className='text-gray-500 px-5 animate-pulse'>Typing...</p>}
            <div ref={chatBubblesRef}></div>
          </div>
          <ChatInput setData={setChatData} setIsLoading={setIsLoading} onItineraryUpdate={onItineraryUpdate} />
        </section>
      </div>
    </>
  )
})

const ChatBubble = ({ sender = 'bot', message }) => {
  return (
    <div
      className={cn('flex gap-3 w-full max-w-[90%]', {
        'ml-auto max-w-[80%]': sender === 'user',
      })}
    >
      {sender === 'bot' && (
        <>
          <div className='size-10 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 shrink-0 rounded-full' />
          <div className='flex flex-col text-black'>
            <p className='font-semibold '>MaiA</p>

            <div className='bg-[#f1f5fa] px-5 py-5 rounded-xl rounded-tl-none whitespace-pre-wrap'>
              <p>{message}</p>
            </div>
          </div>
        </>
      )}
      {sender === 'user' && (
        <>
          <div className='flex flex-col ml-auto '>
            <p className='font-semibold text-right text-black'>You</p>
            <div className='bg-[#334054] px-4 py-3 rounded-xl rounded-tr-none text-[#e6e9ee] whitespace-pre-wrap'>
              {message}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const ChatInput = ({ setData, setIsLoading, onItineraryUpdate }) => {
  const [input, setInput] = useState('')
  const timeoutRef = useRef(null)

  const onHandleInput = (e) => {
    setInput(e.target.value)
  }

  const onHandleSubmit = async (e) => {
    const userId = getOrCreateUserId();
    const sessionId = getOrCreateSessionId();

    const { key } = e
    if (key === 'Enter' || e.target?.name === 'send') {
      if (!input.trim()) return // prevent empty input

      const userMessage = input.trim()
      setInput('')
      setIsLoading(true)

      // Append user message
      setData((prev) => [
        ...prev,
        {
          sender: 'user',
          message: userMessage,
        },
      ])

      const apiChatbot = async () => {
        try {
          const res = await sendText(userId, sessionId, userMessage)

          // Example: get bot reply from response
          const botMessage = res || 'Sorry, I didn’t understand that.'

          setData((prev) => [
            ...prev,
            {
              sender: 'bot',
              message: botMessage,
            },
          ])
        } catch (err) {
          console.error("Gagal ambil data", err)
          setData((prev) => [
            ...prev,
            {
              sender: 'bot',
              message: 'Oops! Something went wrong.',
            },
          ])
        } finally {
          setIsLoading(false)
        }
      }

      apiChatbot()
    }
  }

  let sampleItinerary = {
    days: [],
    end_date: "",
    start_date: "",
    trip_image_url: "",
    trip_name: ""
  }

  async function sendText(userId, sessionId, text) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2 * 60 * 1000); // 2 menit timeout

    try {
      const res = await fetch("https://mot-maia-engine-v2-928113580262.asia-southeast2.run.app/run_sse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "appName": "maia",
          "userId": userId,
          "sessionId": sessionId,
          "newMessage": {
            "parts": [
              {
                "thought": false,
                "text": text
              }
            ],
            "role": "user"
          },
          "streaming": false
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.startsWith("data:")) {
            const jsonString = line.slice(5).trim();
            if (jsonString === "[DONE]") break;

            try {
              const parsed = JSON.parse(jsonString);
              const isText = parsed.content.parts[0].text;
              const isFunctionResponse = parsed.content.parts[0].functionResponse;
              if (isText) {
                console.log("istext", isText)
                setData((prev) => [
                  ...prev,
                  {
                    sender: 'bot',
                    message: isText,
                  },
                ])
              }
              if (isFunctionResponse) {
                const keysToCheck = Object.keys(sampleItinerary);
                const isMatch = keysToCheck.every(key => key in isFunctionResponse.response);
                if (isMatch) {
                   onItineraryUpdate(isFunctionResponse.response)
                }
              }
              // console.log(parsed.content.parts[0])
              // return parsed.content.parts[0].text;3
            } catch (e) {
              console.log("Gagal parse JSON SSE:", e, jsonString);
            }
          }
        }
      }

    } catch (error) {
      clearTimeout(timeout);
      console.error("Fetch failed:", error);
      throw error;
    }
  }

  return (
    <div className='py-5 px-6 bg-[#fdfdfd] border-t-2 border-slate-200 flex gap-4 items-center '>
      <input
        onKeyDown={(e) => onHandleSubmit(e)}
        className='text-black  outline-none w-full '
        placeholder='Write your question here...'
        onChange={(e) => onHandleInput(e)}
        value={input}
      />
      <div name='send' onClick={(e) => onHandleSubmit(e)}>
        <Send className='size-6 shrink-0  cursor-pointer' color='blue' />
      </div>
    </div>
  )
}
