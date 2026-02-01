import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import BlogCard from '../components/BlogCard';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const [userRes, blogsRes] = await Promise.all([
          API.get(`/users/${id}`),
          API.get(`/users/${id}/blogs`)
        ]);
        setUser(userRes.data);
        setBlogs(blogsRes.data);
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!user) return <div className="text-center mt-8">User not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-serif mb-2">{user.name}</h1>
        <p className="text-slate-500">{user.email}</p>
      </div>

      <h2 className="text-2xl font-bold font-serif mb-6">Blogs by {user.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.length > 0 ? (
          blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p>This user has not posted any blogs yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
