

import Notesoverview from "@/components/notes-overview";

async function fetchlistofnotes() {
    try {
        const apiResponse = await fetch("http://localhost:3000/api/getnotes", { method: "GET", cache: "no-store" });

        const result = await apiResponse.json();
        return result?.data;
    } catch (error) {
        throw new Error(error);
    }
}


async function Notes() {

    const noteslist = await fetchlistofnotes()

    return (<Notesoverview noteslist={noteslist} />);


}
export default Notes;