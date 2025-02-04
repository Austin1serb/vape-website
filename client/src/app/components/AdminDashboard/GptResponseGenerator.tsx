import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';

interface GPTResponseGeneratorProps {
    prompt: string;
    onResponse: (response: string) => void;
   
    data?: any;
    setError?: any;
    error?: any;
}


const GPTResponseGenerator: React.FC<GPTResponseGeneratorProps> = ({ prompt, onResponse, data, setError, error }) => {
    const [loading, setLoading] = useState(false);

    const fetchGPTResponse = async () => {
        if (data.name === '' && data.brand === '') {
            setError({ ...error, name: 'Add product name to generate', brand: 'Add brand name to generate' });
            return;
        }

        setLoading(true);
        try {
            const apiKey = process.env.NEXT_PUBLIC_GPT_API_KEY;
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo-instruct',
                    prompt: prompt,
                    temperature: 0.7,
                    max_tokens: 256,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                }),
            });

            const data = await response.json();
            const res = data.choices[0].text;
            onResponse(JSON.parse(res));

        } catch (error) {
            console.error('Failed to fetch GPT response:', error);
            onResponse('');
        } finally {
            setLoading(false);
        }
    };

    return (
       
            <Button disabled={loading} color='success'  variant="contained" onClick={fetchGPTResponse}>
                {loading ? <CircularProgress size={30} /> : 'Generate'}
            </Button>
    
    );
};

export default GPTResponseGenerator;
