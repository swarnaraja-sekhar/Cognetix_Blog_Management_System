import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../services/api';
import BlogCard from '../components/BlogCard';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();
  const pageNumber = query.get('pageNumber') || 1;
  const keyword = query.get('keyword') || '';

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/blogs?keyword=${keyword}&pageNumber=${pageNumber}`);
        setBlogs(data.blogs);
        setPage(data.page);
        setPages(data.pages);
      } catch (err) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [keyword, pageNumber]);

  useEffect(() => {
    const fetchCategories = async () => {
      // This is a mock fetch. In a real app, you'd fetch this from your backend.
      const uniqueCategories = [...new Set(blogs.map(blog => blog.category).filter(Boolean))];
      setCategories(['All', ...uniqueCategories]);
    };
    fetchCategories();
  }, [blogs]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/dashboard?keyword=${searchTerm}`);
    } else {
      navigate('/dashboard');
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredBlogs = selectedCategory && selectedCategory !== 'All'
    ? blogs.filter(blog => blog.category === selectedCategory)
    : blogs;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold font-serif mb-4">Blog Sphere</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">A space for ideas, stories, and perspectives on technology, design, and innovation.</p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
        <form onSubmit={handleSearch} className="flex-grow max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles..."
            className="w-full p-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </form>
      </div>

      <div className="mb-12 flex justify-center flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>


      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            {pages > 1 && (
              <div className="flex rounded-md shadow-sm">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    key={x + 1}
                    to={`/dashboard?keyword=${keyword}&pageNumber=${x + 1}`}
                    className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                      x + 1 === page
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
