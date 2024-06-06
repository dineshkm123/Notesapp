'use client'

import Notesoverview from "@/components/notes-overview";
import { useEffect, useState } from "react";

async function fetchlistofnotes() {
    try {
        // const { data, error } = useSWR('/api/getnotes', fetcher);
        const baseUrl = window.location.origin;
        const apiUrl = `${baseUrl}/api/getnotes`;
        const apiResponse = await fetch(apiUrl, { method: "GET", cache: "no-store" });
        const result = await apiResponse.json();
        return result?.data;
    } catch (error) {
        throw new Error(error);
    }
}


function Notes() {
    const [noteslist, setNoteslist] = useState([])
    console.log(noteslist)
    useEffect(() => {
        const fn = async () => {

            const result = await fetchlistofnotes()
            if (result)
                setNoteslist(result)
        }
        fn()

    }, [])
    return (<Notesoverview noteslist={noteslist} />);
}
export default Notes;
