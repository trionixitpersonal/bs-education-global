"use server";

import { writeFile, readFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

// About Us Actions
export async function updateAboutData(data: any) {
  try {
    const filePath = path.join(process.cwd(), "lib", "about-data.json");
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    revalidatePath("/about");
    revalidatePath("/admin/about");
    return { success: true, message: "About page updated successfully" };
  } catch (error) {
    console.error("Error updating about data:", error);
    return { success: false, message: "Failed to update about page" };
  }
}

export async function getAboutData() {
  try {
    const filePath = path.join(process.cwd(), "lib", "about-data.json");
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading about data:", error);
    return null;
  }
}

// Careers Actions
export async function updateCareersData(data: any) {
  try {
    const filePath = path.join(process.cwd(), "lib", "careers-data.json");
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    revalidatePath("/careers");
    revalidatePath("/admin/careers");
    return { success: true, message: "Careers page updated successfully" };
  } catch (error) {
    console.error("Error updating careers data:", error);
    return { success: false, message: "Failed to update careers page" };
  }
}

export async function getCareersData() {
  try {
    const filePath = path.join(process.cwd(), "lib", "careers-data.json");
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading careers data:", error);
    return null;
  }
}

// Blog Actions
export async function updateBlogData(posts: any[]) {
  try {
    const filePath = path.join(process.cwd(), "lib", "blog-data.ts");
    
    // Construct the file content
    const newContent = `export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorImage: string;
  authorBio: string;
  content: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};

export function getBlogPosts() {
  return blogPosts;
}

export function getFeaturedPost() {
  return blogPosts.find(post => post.featured) || blogPosts[0];
}

export function getBlogPost(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3) {
  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit);
}

export function getBlogPostsByCategory(category: string) {
  return blogPosts.filter(post => post.category === category);
}
`;
    
    await writeFile(filePath, newContent, "utf-8");
    revalidatePath("/blog");
    revalidatePath("/admin/dashboard/blog");
    return { success: true, message: "Blog posts updated successfully" };
  } catch (error) {
    console.error("Error updating blog data:", error);
    return { success: false, message: "Failed to update blog posts" };
  }
}
