import apiFetch from './client';

export const askAssistant = async (question, language, setAnswer, setError, setLoading) => {
  try {
    const response = await apiFetch('/api/assistant', {
      method: 'POST',
      body: JSON.stringify({ question, language }),
    });
    setAnswer(response.answer || 'No answer available.');
  } catch (error) {
    setError(error.message || 'Unable to fetch assistant response');
  } finally {
    setLoading(false);
  }
};
