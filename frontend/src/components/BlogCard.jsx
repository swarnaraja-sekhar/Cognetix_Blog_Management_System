import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BlogCard = ({ blog }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white transform hover:-translate-y-1 hover:border-indigo-500 hover:border-l-4">
      <Link to={`/blog/${blog._id}`}>
        <img src={blog.image || 'https://via.placeholder.com/400x250'} alt={blog.title} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-6">
        {blog.category && (
          <p className="text-sm text-indigo-600 font-semibold mb-2">{blog.category}</p>
        )}
        <h2 className="text-2xl font-bold font-serif mb-2">
          <Link to={`/blog/${blog._id}`} className="hover:text-indigo-600 transition-colors duration-300">{blog.title}</Link>
        </h2>
        <p className="text-slate-500 mb-4 text-sm">
          By <Link to={`/profile/${blog.author._id}`} className="font-semibold hover:underline">{blog.author.name}</Link> on {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <p className="text-slate-600 mb-4">{blog.content.substring(0, 100)}...</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags && blog.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        <div className="mt-4 relative z-10">
          <Link
            to={`/blogs/${blog._id}`}
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-white bg-gray-800 hover:bg-gray-900 px-5 py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Read More <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
