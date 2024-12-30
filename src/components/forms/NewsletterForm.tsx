import { useState } from 'react';
import type { FormEvent } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error'; 

interface FormValues {
  email: string;
  first_name: string;
}

export default function NewsletterForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const values: FormValues = {
      email: formData.get('email') as string,
      first_name: formData.get('first_name') as string,
    };

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }
      setStatus('success');
      // @ts-ignore
      window.fathom?.trackGoal('IACNIPCU', 0);
      form.reset();
    } catch (err) {
      setError('Something went wrong! Please try again.');
      setStatus('error');
    }
  }

  return (
    <div className="w-full">
      {status === 'success' ? (
        <div className="text-green-600 font-medium">
          Thanks for subscribing! Please check your email to confirm.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="first_name" className="sr-only">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Garak"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="garak@ds9.station"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="md:self-end bg-brand hover:bg-brand-dark text-white font-bold py-2 px-6 rounded disabled:opacity-50"
          >
            {status === 'loading' ? 'Processing...' : 'Sign Up'}
          </button>
        </form>
      )}
      {error && <div className="mt-2 text-red-600">{error}</div>}
    </div>
  );
} 