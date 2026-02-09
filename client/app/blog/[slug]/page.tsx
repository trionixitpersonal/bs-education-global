import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Facebook, Twitter, Linkedin } from "lucide-react";
import { getBlogPost, getRelatedPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b pt-32 pb-12">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full font-medium text-sm">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={post.authorImage}
                    fill
                    alt={post.author}
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{post.author}</div>
                  <div className="text-sm text-gray-600">{post.authorBio}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors" aria-label="Share on Facebook">
                  <Facebook className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors" aria-label="Share on Twitter">
                  <Twitter className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors" aria-label="Share on LinkedIn">
                  <Linkedin className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative w-full h-[400px] lg:h-[600px]">
        <Image
          src={post.image}
          fill
          alt={post.title}
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Content */}
      <article className="py-16 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-ul:my-6 prose-ul:space-y-2
                prose-li:text-gray-700
                prose-strong:text-gray-900 prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      {/* Author Bio */}
      <section className="py-12 bg-gray-50 border-y">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={post.authorImage}
                  fill
                  alt={post.author}
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">About {post.author}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {post.authorBio}. With extensive experience in guiding students through 
                  the university application process, she has helped thousands achieve their 
                  dreams of studying abroad.
                </p>
                <div className="flex gap-3">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View All Posts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <Link
                  key={index}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        fill
                        alt={relatedPost.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Your Application?
            </h2>
            <p className="text-xl text-blue-100">
              Get personalized guidance from our expert education consultants
            </p>
            <Link
              href="/support"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
