import { useState } from "react";

export const useSubjects = () => {
    const [subjectOptions] = useState(["Personal", "Work", "Study", "Shopping", "Health"]);

    return {
        subjectOptions,
    };
}

export default useSubjects
