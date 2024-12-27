import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useStreamerSubmission } from '../hooks/useStreamerSubmission';
import { useLanguage } from '../hooks/useLanguage';

export function StreamerSubmitter() {
  const [streamerName, setStreamerName] = useState('');
  const { language } = useLanguage();
  const { isOpen, setIsOpen, loading, error, success, submitStreamer, canSubmit } = useStreamerSubmission();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (streamerName.trim()) {
      submitStreamer(streamerName.trim());
      setStreamerName('');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#26262C] h-10 w-10"
        type="button"
        disabled={!canSubmit}
      >
        <UserPlus className="h-5 w-5" />
        <span className="sr-only">Submit streamer</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[#18181B] rounded-lg shadow-lg p-4 z-50">
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium mb-2">
              {language === 'fa' ? 'نام استریمر' : 'Streamer Name'}
            </label>
            <input
              type="text"
              value={streamerName}
              onChange={(e) => setStreamerName(e.target.value)}
              placeholder={language === 'fa' ? 'نام استریمر را وارد کنید' : 'Enter streamer name'}
              className="w-full bg-[#26262C] text-white placeholder-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              dir={language === 'fa' ? 'rtl' : 'ltr'}
            />
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
            {success && (
              <p className="text-green-400 text-sm mt-2">
                {language === 'fa' 
                  ? 'پس از تایید در لیست قرار خواهد گرفت. با تشکر از شما'
                  : 'Will be added to the list after review. Thank you!'}
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !streamerName.trim()}
              className="mt-4 w-full bg-purple-500 text-white rounded-md py-2 px-4 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {language === 'fa' ? 'در حال ارسال...' : 'Submitting...'}
                </span>
              ) : (
                language === 'fa' ? 'ارسال درخواست' : 'Submit Request'
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}