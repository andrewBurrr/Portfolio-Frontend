import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ApiRequest() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/posts')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h2>API Response:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
export default ApiRequest
