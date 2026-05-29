/** @jsx React.createElement */
import React, { useState } from "react";
import { useCreateCase } from "../../hooks/use-cases";

const CreateCase = () => {
    const [title, setTitle] = useState("");
    const mutation = useCreateCase();

    const handleSubmit = () => {
        mutation.mutate({
            case_title: title,
        });
    };

    return React.createElement('div', null,
        React.createElement('h2', null, 'Create Case'),
        React.createElement('input', {
            value: title,
            onChange: (e) => setTitle(e.target.value)
        }),
        React.createElement('button', { onClick: handleSubmit }, 'Create')
    );
};

export default CreateCase;
