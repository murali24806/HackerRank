import React, { useState } from 'react';
import { submitApplication } from '../api';

export default function JoinSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    registrationNo: '',
    domain: ''
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');

    const res = await submitApplication(formData);
    setLoading(false);
    if (res && res.message) {
      setFeedback(res.message);
      setFormData({ name: '', email: '', registrationNo: '', domain: '' });
    }
  };

  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <div className="contact-card glass-card reveal active">
          <div className="contact-header">
            <span className="eyebrow-tag">Level Up With Us</span>
            <h2>Ready to Join HackerRank VIIT?</h2>
            <p>
              Whether you are taking your first steps in C++ or solving Hard level Dynamic Programming, there is a place for you in our community.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="user-name">Full Name</label>
                <input
                  type="text"
                  id="user-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Varma"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="user-email">College Email</label>
                <input
                  type="email"
                  id="user-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@vignan.edu"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="user-reg">Registration No.</label>
                <input
                  type="text"
                  id="user-reg"
                  name="registrationNo"
                  value={formData.registrationNo}
                  onChange={handleChange}
                  placeholder="e.g. 23L31A05XX"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="user-domain">Primary Interest</label>
                <select
                  id="user-domain"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Track</option>
                  <option value="cp">Competitive Programming</option>
                  <option value="web">Full Stack Web Development</option>
                  <option value="ai">AI / Data Science</option>
                  <option value="management">Event Management & PR</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary btn-block" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application →"}
            </button>

            {feedback && (
              <div className="form-feedback success" style={{ display: 'block', marginTop: '16px' }}>
                {feedback}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
