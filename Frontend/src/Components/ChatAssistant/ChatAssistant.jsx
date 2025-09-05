import React, { useState } from "react";
import axios from "axios";
import { MessageCircle, X, ArrowLeft } from "lucide-react";
import "./ChatAssistant.css";
import toast from "react-hot-toast";

const ChatAssistant = () => {
    const apiUrl = import.meta.env.VITE_Backend_URL;
    const notifyA = (e) => toast.success(e);
    const notifyB = (e) => toast.error(e);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notSatisfied, setNotSatisfied] = useState(false);
    const [userIssue, setUserIssue] = useState("");

    // Get user ID from localStorage
    const userId = localStorage.getItem("userId");

    const handleSend = async () => {
        if (!query.trim()) return;

        const newMessages = [...messages, { sender: "user", text: query }];
        setMessages(newMessages);
        setQuery("");
        setLoading(true);

        try {
            const { data } = await axios.post(`${apiUrl}/api/help/chat`, { query });
            setTimeout(() => {
                setMessages([...newMessages, { sender: "bot", text: data.response }]);
                setLoading(false);
            }, 2000);
        } catch (error) {
            setTimeout(() => {
                setMessages([...newMessages, { sender: "bot", text: "Something went wrong. Try again later." }]);
                setLoading(false);
            }, 2000);
        }
    };

    const handleSubmitIssue = async () => {

        const response = await fetch(`${apiUrl}/api/auth/user`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            return notifyB("Please login first.");
        }

        if (!userIssue.trim()) return;

        try {
            await axios.post(`${apiUrl}/api/help/submit`, { userId, issue: userIssue });
            notifyA("Your issue has been submitted. Our team will contact you within 24 to 48 hours.");
            setUserIssue("");
            setNotSatisfied(false);
        } catch (error) {
            notifyB("Failed to submit the issue. Please try again later.");
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setOpen(!open)}
                className="chat-button"
            >
                <MessageCircle size={30} />
            </button>

            {/* Chatbox */}
            {open && (
                <div className="chat-box">
                    <div className="chat-header">
                        <h5 className="chat-title">🤖 SkillVedaa Assistant</h5>
                        <button onClick={() => setOpen(false)} className="close-button">
                            <X size={20} />
                        </button>
                    </div>

                    {!notSatisfied ? (
                        <>
                            <div className="chat-body">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.sender}`}>
                                        {msg.text}
                                    </div>
                                ))}
                                {loading && <div className="message bot">Typing...</div>}
                            </div>

                            <div className="chat-footer">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="form-control chat-input"
                                    placeholder="Type your question..."
                                />
                                <button onClick={handleSend} className="primary-button chat-send">Send</button>
                            </div>

                            {/* Not Satisfied Button */}
                            <button className="not-satisfied-button" onClick={() => setNotSatisfied(true)}>Not Satisfied?</button>
                        </>
                    ) : (
                        <div className="help-section">
                            <div className="help-header">
                                <button onClick={() => setNotSatisfied(false)} className="back-button">
                                    <ArrowLeft size={20} />
                                </button>
                                <h3 className="help-title">Help</h3>
                                <button onClick={() => setOpen(false)} className="close-button">
                                    <X size={20} />
                                </button>
                            </div>
                            <p className="help-text">If you are not satisfied with our bot, write your query below and submit it. Our team will reach out to you within 24 to 48 hours.</p>
                            <textarea
                                type="text"
                                value={userIssue}
                                onChange={(e) => setUserIssue(e.target.value)}
                                className="form-control issue-input"
                                placeholder="Describe your issue..."
                                rows={10}
                            />
                            <button onClick={handleSubmitIssue} className="primary-button submit-issue">Submit</button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ChatAssistant;
