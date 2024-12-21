import { Timestamp } from "firebase/firestore";

const formatDate = (timestamp: Timestamp | number | undefined): string => {
    if (!timestamp) {
        return "-"; // Return a placeholder for undefined values
    }

    let date: Date;

    if (timestamp instanceof Timestamp) {
        date = timestamp.toDate(); // Firestore Timestamp object
    } else if (typeof timestamp === "number") {
        date = new Date(timestamp); // Unix timestamp
    } else {
        console.error("Invalid timestamp value");
        return "-";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

export default formatDate;
