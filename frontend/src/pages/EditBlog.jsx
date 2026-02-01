import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

const EditBlog = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', content: '', image: '', category: '', tags: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await API.get(`/blogs/${id}`);
        setFormData({ 
          title: data.title, 
          content: data.content, 
          image: data.image || '',
          category: data.category || '',
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : ''
        });
      } catch (err) {
        setError('Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
      };
      await API.put(`/blogs/${id}`, postData);
      navigate(`/blogs/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-20 font-serif italic text-slate-400">Loading story...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-playfair font-black text-slate-900 mb-8 text-center">Edit Story</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {error && <div className="text-red-500 text-sm font-serif">{error}</div>}
        
        <div className="group">
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="Title"
            className="block w-full border-b-2 border-slate-200 py-3 text-4xl font-playfair font-bold text-slate-900 placeholder-slate-300 focus:border-slate-800 focus:outline-none transition-colors bg-transparent"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="group">
          <input
            type="text"
            name="image"
            id="image"
            placeholder="Image URL (optional)"
            className="block w-full border-b-2 border-slate-200 py-3 text-lg font-serif text-slate-700 placeholder-slate-300 focus:border-slate-800 focus:outline-none transition-colors bg-transparent"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group">
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              className="block w-full border-b-2 border-slate-200 py-3 text-lg font-serif text-slate-700 placeholder-slate-300 focus:border-slate-800 focus:outline-none transition-colors bg-transparent"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="group">
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="Tags (comma separated)"
              className="block w-full border-b-2 border-slate-200 py-3 text-lg font-serif text-slate-700 placeholder-slate-300 focus:border-slate-800 focus:outline-none transition-colors bg-transparent"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="group">
          <textarea
            name="content"
            id="content"
            required
            rows={12}
            placeholder="Tell your story..."
            className="block w-full py-3 text-lg font-serif text-slate-700 placeholder-slate-300 resize-y focus:outline-none bg-transparent leading-relaxed"
            value={formData.content}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? 'Save Changes' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
