"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import { Calendar, User, Eye, ArrowLeft, Tag, Clock, Share2 } from "lucide-react";
import blogService from "@/services/blog.service";
import toast from "react-hot-toast";

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);

  useEffect(() => {
    if (params.slug && params.slug !== 'undefined') {
      loadBlog();
      loadRelatedBlogs();
    } else {
      toast.error('Invalid blog URL');
      setTimeout(() => {
        router.push('/blog');
      }, 1000);
    }
  }, [params.slug]);

  const loadBlog = async () => {
    try {
      setLoading(true);
      const response = await blogService.getBlogBySlug(params.slug);
      if (response.data) {
        setBlog(response.data);
      } else {
        throw new Error('Blog not found');
      }
    } catch (error: any) {
      console.error("Failed to load blog:", error);
      toast.error(error.message || "Blog not found");
      
      // Redirect after showing error
      setTimeout(() => {
        router.push("/blog");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedBlogs = async () => {
    try {
      const response = await blogService.getLatestBlogs(3);
      setRelatedBlogs(response.data || []);
    } catch (error) {
      console.error("Failed to load related blogs:", error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  // Prepare meta data for SEO
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const metaTitle = `${blog.title} | Launder Remedy Blog`;
  const metaDescription = blog.meta_description || blog.excerpt || blog.content.substring(0, 160);
  const metaImage = blog.featured_image || "/og-image.jpg";

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        {/* Basic Meta Tags */}
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={blog.tags?.join(", ")} />
        <meta name="author" content={blog.author_name || "Launder Remedy"} />

        {/* OpenGraph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Launder Remedy" />
        
        {/* Article Specific */}
        <meta property="article:published_time" content={blog.published_date || blog.createdAt} />
        <meta property="article:author" content={blog.author_name} />
        {blog.tags?.map((tag: string) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />

        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800">
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blog.title,
              description: metaDescription,
              image: metaImage,
              datePublished: blog.published_date || blog.createdAt,
              dateModified: blog.updatedAt || blog.createdAt,
              author: {
                "@type": "Person",
                name: blog.author_name || "Launder Remedy",
              },
              publisher: {
                "@type": "Organization",
                name: "Launder Remedy",
                logo: {
                  "@type": "ImageObject",
                  url: "/logo.png",
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": pageUrl,
              },
            }),
          }}
        />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            {blog.title}
          </motion.h1>

          {/* Category Badge */}
          {blog.category && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-medium">
                {blog.category.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </span>
            </motion.div>
          )}

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8"
          >
            {blog.author_name && (
              <span className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {blog.author_name}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {formatDate(blog.published_date || blog.createdAt)}
            </span>
            <span className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {blog.views || 0} views
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {Math.ceil(blog.content.split(" ").length / 200)} min read
            </span>
          </motion.div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {blog.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Share Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={sharePost}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-700 transition-colors mb-8"
          >
            <Share2 className="w-4 h-4" />
            Share Article
          </motion.button>

          {/* Featured Image */}
          {blog.featured_image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12"
            >
              <Image
                src={blog.featured_image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="prose prose-lg dark:prose-invert max-w-none mb-16 prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground"
          >
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </motion.article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 px-4 bg-card/50">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog._id}
                  href={`/blog/${relatedBlog.slug}`}
                  className="group"
                >
                  <div className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 bg-muted">
                      {relatedBlog.featured_image ? (
                        <Image
                          src={relatedBlog.featured_image}
                          alt={relatedBlog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800">
                          <span className="text-4xl">📝</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedBlog.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      </div>
    </>
  );
}
