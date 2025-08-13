'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, MessageCircle, Send } from 'lucide-react';
import { animateHero } from '@/lib/animations';

export default function NPSQuestionPage() {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    animateHero();
  }, []);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="p-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sandbox
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="hero-content text-center space-y-8">
            {/* Project Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              NPS Question
            </div>
            
            {/* Title */}
            <h1 className="text-3xl font-bold text-foreground">
              How likely are you to recommend us?
            </h1>
            
            {/* Subtitle */}
            <p className="text-muted-foreground">
              Your feedback helps us improve our service
            </p>
          </div>

          {/* NPS Form */}
          <div className="hero-cta mt-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Rating Section */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-foreground block">
                    Rate your experience (0-10)
                  </label>
                  
                  {/* Rating Stars */}
                  <div className="flex justify-center gap-2">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleRatingClick(value)}
                        className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-sm font-semibold ${
                          rating === value
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'border-border text-muted-foreground hover:border-primary/50 hover:text-primary'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  
                  {/* Rating Labels */}
                  <div className="flex justify-between text-xs text-muted-foreground px-2">
                    <span>Not likely</span>
                    <span>Very likely</span>
                  </div>
                </div>

                {/* Feedback Section */}
                <div className="space-y-4">
                  <label htmlFor="feedback" className="text-sm font-medium text-foreground block">
                    Tell us more (optional)
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="What could we improve?"
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={rating === null}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </button>
              </form>
            ) : (
              /* Success State */
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Thank you!
                  </h2>
                  <p className="text-muted-foreground">
                    Your feedback has been submitted successfully.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setRating(null);
                    setFeedback('');
                    setSubmitted(false);
                  }}
                  className="px-6 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                >
                  Submit Another
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
