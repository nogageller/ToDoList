import { useState } from "react";

export const UseSubjects = () => {
    const [subjectOptions] = useState(["Personal", "Work", "Study", "Shopping", "Health"]);

    return {
        subjectOptions,
    };
}

export default UseSubjects
