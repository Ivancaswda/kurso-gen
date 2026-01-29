'use client'
import React, {useEffect, useRef, useState} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {toast} from "sonner";
import {Textarea} from "@/components/ui/textarea";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useAuth} from "../../context/useAuth";
import {FaBook, FaRobot} from "react-icons/fa";
import {LoaderOne} from "@/components/ui/loader";

const FloatingAssistant = () => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const [open, setOpen] = useState(false)
    const {user} = useAuth()
    const [loading, setLoading] = useState<boolean>(false)
    const [input, setInput] = useState('')
    const [supportInput, setSupportInput] = useState('')
    const [supportMode, setSupportMode] = useState(false)
    const [thinking, setThinking] = useState<boolean>(false)
    const [email, setEmail] = useState('')
    const [messages, setMessages] = useState<
        { role: 'user' | 'assistant'; content: string }[]
    >([
        {
            role: 'assistant',
            content: 'Привет 👋 Я КурсоСап. Чем могу помочь?',
        },
    ])
    console.log('suuportInput', supportInput)

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setThinking(true);

        try {
            const res = await fetch('/api/ai-assistant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });

            if (!res.ok) {
                let errorMessage = 'Произошла ошибка. Попробуйте позже.';
                if (res.status === 503)
                    errorMessage = 'Сервис временно недоступен. Попробуйте чуть позже.';
                if (res.status === 409)
                    errorMessage =
                        'Закончились токены или лимиты. Попробуйте позже или обновите ключ API.';

                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: errorMessage },
                ]);
                return;
            }

            const data = await res.json();

            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: data.content },
            ]);
        } catch (err) {
            console.log(err);
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content:
                        'Произошла ошибка при подключении к AI-сервису. Попробуйте позже.',
                },
            ]);
        } finally {
            setThinking(false);
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
        })
    }, [messages])

    return (
        <div id='support'>

            <motion.button
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-orange-500 text-white shadow-xl flex items-center justify-center"
            >
                <MessageCircle />
            </motion.button>


            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.25 }}
                        className="fixed bottom-24 right-6 z-50 w-[340px] rounded-2xl border bg-background shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/50">
                            <div className="font-semibold flex items-center gap-2">
                                <FaRobot className="text-orange-500 text-2xl"/> КурсоСап
                            </div>
                            <button onClick={() => setOpen(false)}>
                                <X className="h-5 w-5 text-muted-foreground" />
                            </button>
                        </div>


                        <div className="h-64 overflow-y-auto p-4 space-y-3">
                            {messages.map((msg, i) => {
                                const isLoading = thinking && i === messages.length - 1 && msg.role === 'assistant';

                                return (
                                    <div
                                        key={i}
                                        className={`flex ${
                                            msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                        } gap-2`}
                                    >
                                        <Avatar className="bg-orange-500 flex items-center justify-center text-white">
                                            {msg.role === 'user' ? (
                                                <AvatarImage src={user?.avatarUrl} />
                                            ) : (
                                                <FaRobot className="text-white text-2xl" />
                                            )}
                                            {msg.role === 'user' && !user?.avatarUrl && (
                                                <AvatarFallback className="bg-orange-500 text-white">
                                                    {user?.userName[0].toUpperCase()}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>

                                        <div
                                            className={`text-sm rounded-lg px-3 py-2 max-w-[85%] ${
                                                msg.role === 'user' ? 'ml-auto bg-orange-500 text-white' : 'bg-muted'
                                            }`}
                                        >
                                            {isLoading ? (
                                                <div className="flex gap-1">
                                                    <span className="animate-pulse">.</span>
                                                    <span className="animate-pulse delay-75">.</span>
                                                    <span className="animate-pulse delay-150">.</span>
                                                </div>
                                            ) : (
                                                msg.content
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>


                        <div className="p-3 border-t flex gap-2 items-center justify-between">
                            <Input
                                placeholder="Задайте вопрос..."
                                value={input}
                                className='w-full'
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') sendMessage()
                                }}
                            />
                            <Button size="icon" className='bg-orange-500 hover:bg-orange-400' onClick={sendMessage}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>


                        <div className="p-3 border-t bg-muted/40">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setSupportMode(true)}
                            >
                                <Mail className="h-4 w-4 mr-2" />
                                Связаться с поддержкой
                            </Button>
                        </div>
                        {supportMode && (
                            <div className="p-3 space-y-2">
                                <Input
                                    placeholder="Ваш email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Textarea
                                    placeholder="Сообщение..."
                                    value={supportInput}
                                    required={true}
                                    className='w-full'
                                    onChange={(e) => setSupportInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') sendMessage()
                                    }}
                                />
                                <Button  disabled={loading && !supportInput.trim()}
                                    className="w-full bg-orange-500"
                                    onClick={async () => {
                                        try {
                                            if (!supportInput.trim()) {
                                                return
                                            }


                                            setLoading(true)
                                            await fetch('/api/support', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                    email,
                                                    message: supportInput,
                                                }),
                                            })

                                            setSupportMode(false)
                                            setMessages((prev) => [
                                                ...prev,
                                                {
                                                    role: 'assistant',
                                                    content:
                                                        'Спасибо! Мы получили сообщение и скоро ответим 🙌',
                                                },
                                            ])
                                            setLoading(false)
                                            setSupportInput('')
                                        } catch (err) {
                                            setLoading(false)
                                            toast.error('Не удалось отправить письмо, выключите впн!')
                                            console.log(err)
                                        }

                                    }}
                                >
                                    {loading? 'Подождите...' : 'Отправить'}

                                </Button>

                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FloatingAssistant

