import React, {useEffect, useState} from 'react';
import Navbar from "../componets/Navbar.jsx";
import RateLimitedUi from "../componets/RateLimited.jsx";
import toast from "react-hot-toast";
import NoteCard from "../componets/NoteCard.jsx";
import api from "../lib/axios.js";
import NotesNotFound from "../componets/NotesNotFound.jsx";

const HomePage = () => {
    const [isRateLimited, setRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");
                setNotes(res.data);
                setLoading(false);
                console.log(res.data);
            } catch (err) {
                console.log("Error fetching notes...", err);
                if(err.response?.status === 429) {
                    setRateLimited(true)
                } else {
                    toast.error("Failed to fetch notes.");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchNotes()
    },[])

    return (
        <div className="min-h-screen">
            <Navbar />

            {isRateLimited ? <RateLimitedUi /> : null}

            <div className={`max-w-7xl mx-auto p-4 mt-6"`}></div>
            {loading && <div className={`text-center text-primary py-10`}>Loading notes....</div>}

            {notes.length === 0 && !isRateLimited && <NotesNotFound />}

            {notes.length > 0 && !isRateLimited && (
                <div className={`max-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                    {notes.map((note) => (
                        <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;