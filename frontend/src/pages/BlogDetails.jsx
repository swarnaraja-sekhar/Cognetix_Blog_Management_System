import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import AuthContext from '../context/AuthContext';
import { Trash2, Edit } from 'lucide-react';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [claps, setClaps] = useState(0);
  const [hasClapped, setHasClapped] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogAndComments = async () => {
      try {
        const [blogRes, commentsRes] = await Promise.all([
          API.get(`/blogs/${id}`),
          API.get(`/blogs/${id}/comments`)
        ]);
        setBlog(blogRes.data);
        setComments(commentsRes.data);
        setClaps(blogRes.data.claps || 0);

        // Check if user has already clapped
        const clappedPosts = JSON.parse(localStorage.getItem('clappedPosts')) || [];
        if (clappedPosts.includes(id)) {
          setHasClapped(true);
        }

      } catch (err) {
        setError('Failed to fetch blog details');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndComments();
  }, [id]);

  const handleClap = async () => {
    if (hasClapped) {
      alert("You've already clapped for this post!");
      return;
    }
    try {
      const { data } = await API.post(`/blogs/${id}/clap`);
      setClaps(data.claps);
      setHasClapped(true);
      // Store clapped post in local storage
      const clappedPosts = JSON.parse(localStorage.getItem('clappedPosts')) || [];
      localStorage.setItem('clappedPosts', JSON.stringify([...clappedPosts, id]));
    } catch (error) {
      alert('Failed to clap for the post.');
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this blog post: ${blog.title}`;
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(blog.title)}&summary=${encodeURIComponent(blog.content.substring(0, 100))}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const { data } = await API.post(`/blogs/${id}/comments`, { content: newComment });
      setComments([...comments, data]);
      setNewComment('');
    } catch (error) {
      alert('Failed to post comment');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await API.delete(`/blogs/${id}`);
        navigate('/');
      } catch (err) {
        alert('Failed to delete blog');
      }
    }
  };

  if (loading) return <div className="text-center mt-20 font-serif italic text-slate-400">Loading story...</div>;
  if (error) return <div>{error}</div>;
  if (!blog) return <div>Blog not found</div>;

  const isAuthor = user && blog.author && user._id === blog.author._id;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <article>
        <h1 className="text-5xl font-bold mb-4 font-serif">{blog.title}</h1>
        <div className="flex items-center text-slate-500 mb-8">
          <p>By <Link to={`/profile/${blog.author._id}`} className="font-semibold hover:underline">{blog.author.name}</Link></p>
          <span className="mx-2">•</span>
          <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <button 
            onClick={handleClap} 
            disabled={hasClapped}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
              hasClapped 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <span>👏</span>
            <span>{claps} Claps</span>
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-slate-500">Share:</span>
            <button onClick={() => handleShare('twitter')} className="text-blue-400 hover:text-blue-500">Twitter</button>
            <button onClick={() => handleShare('facebook')} className="text-blue-600 hover:text-blue-700">Facebook</button>
            <button onClick={() => handleShare('linkedin')} className="text-blue-800 hover:text-blue-900">LinkedIn</button>
          </div>
        </div>

        {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-96 object-cover rounded-lg mb-8" />}

        {isAuthor && (
            <div className="flex justify-center space-x-6 mb-12 border-y border-gray-100 py-4">
                <Link
                    to={`/edit/${blog._id}`}
                    className="flex items-center text-sm font-semibold uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors"
                >
                    <Edit className="w-4 h-4 mr-2" /> Edit
                </Link>
                <button
                    onClick={handleDelete}
                    className="flex items-center text-sm font-semibold uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors"
                >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                </button>
            </div>
        )}

        <div className="prose prose-lg prose-slate mx-auto font-serif first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900 first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px] first-letter:font-playfair">
            {blog.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-6 leading-8 text-gray-800 text-lg">
                    {paragraph}
                </p>
            ))}
        </div>
      </article>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
            <button type="submit" className="mt-2 px-4 py-2 bg-gray-800 text-white rounded">Post Comment</button>
          </form>
        ) : (
          <p className="mb-8">
            <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link> to post a comment.
          </p>
        )}
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment._id} className="p-4 bg-gray-100 rounded">
              <p className="font-semibold">
                <Link to={`/profile/${comment.author._id}`} className="hover:underline">
                  {comment.author.name}
                </Link>
              </p>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 pt-10 border-t border-gray-200 text-center">
        <Link to="/" className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
            &larr; Back to Journal
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;
