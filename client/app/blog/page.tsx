import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Globe } from "lucide-react";
import { getBlogPosts, getFeaturedPost } from "@/lib/blog-data";

export default function BlogPage() {
  const featuredPost = getFeaturedPost();
  const blogPosts = getBlogPosts().filter(post => !post.featured);

  const categories = [
    { name: "University Rankings", icon: TrendingUp, count: 24 },
    { name: "Visa Guide", icon: Globe, count: 18 },
    { name: "Application Tips", icon: BookOpen, count: 32 },
    { name: "Scholarships", icon: TrendingUp, count: 15 },
    { name: "Study Destinations", icon: Globe, count: 28 },
    { name: "Career Advice", icon: BookOpen, count: 21 },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold lg:text-5xl">
              Education Insights & Resources
            </h1>
            <p className="text-xl text-blue-100 font-light">
              Expert advice, tips, and news about studying abroad
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={featuredPost.image}
                fill
                alt={featuredPost.title}
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">
                  {featuredPost.category}
                </span>
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  {featuredPost.readTime}
                </div>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {featuredPost.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  By <span className="font-semibold text-gray-900">{featuredPost.author}</span>
                </div>
              </div>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Read Full Article
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-y bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <button
                  key={index}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-full transition-colors group"
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm opacity-60">({category.count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link key={index} href={`/blog/${post.slug}`}>
              <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.image}
                    fill
                    alt={post.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium text-xs">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="pt-4 border-t flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="text-blue-600 font-semibold group-hover:text-blue-700 flex items-center gap-1 text-sm">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-xl text-blue-100">
              Get the latest articles, tips, and study abroad news delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-blue-200">
              Join 10,000+ students receiving our weekly insights
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
