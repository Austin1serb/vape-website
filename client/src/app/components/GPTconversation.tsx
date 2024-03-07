import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';

interface GPTConversationProps {
    initialPrompt: string; // The starting prompt for the conversation
    onResponse: (response: string) => void; // Callback to handle the final response
}

const GPTConversation: React.FC<GPTConversationProps> = ({ initialPrompt, onResponse }) => {
    const [loading, setLoading] = useState(false);

    const fetchGPTConversation = async () => {
        setLoading(true);
        try {
            const apiKey = process.env.NEXT_PUBLIC_GPT_API_KEY;
            // First GPT call
            let response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo-instruct',
                    prompt: initialPrompt,
                    temperature: 0.7,
                    max_tokens: 256,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                }),
            });
            let data = await response.json();
            let firstResponse = data.choices[0].text;
            // Second GPT call using the first response as prompt
            response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo-instruct',
                    prompt: firstResponse, // Use the first response as the next prompt
                    temperature: 0.7,
                    max_tokens: 256,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                }),
            });
            data = await response.json();
            const secondResponse = data.choices[0].text;
            onResponse(secondResponse); // Use the second response as the final output
        } catch (error) {
            console.error('Failed to fetch GPT conversation:', error);
            onResponse(''); // Consider providing a more descriptive error to the user
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button disabled={loading} color='success' fullWidth sx={{ height: '36.5px', width: '110.5px' }} variant="contained" onClick={fetchGPTConversation}>
                {loading ? <CircularProgress size={30} /> : 'Start Conversation'}
            </Button>
        </div>
    );
};

export default GPTConversation;
