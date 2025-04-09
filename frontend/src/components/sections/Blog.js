import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BlogSection = styled.section`
  min-height: 100vh;
  padding: 120px 40px;
  background: var(--primary);
  position: relative;
  overflow: hidden;
`;

const Title = styled(motion.h2)`
  font-size: 4rem;
  text-align: center;
  margin-bottom: 60px;
  color: var(--text);

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const BlogGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled(motion.div)`
  background: var(--secondary);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${BlogCard}:hover & img {
    transform: scale(1.1);
  }
`;

const BlogContent = styled.div`
  padding: 20px;
`;

const BlogTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text);
  margin-bottom: 10px;
`;

const BlogExcerpt = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 20px;
`;

const BlogDate = styled.span`
  font-size: 0.9rem;
  color: var(--accent);
`;

const Blog = () => {
  const posts = [
    {
      title: 'Jak zostać pilotem?',
      excerpt: 'Poznaj kroki, które musisz podjąć, aby zostać pilotem.',
      date: '2023-04-01',
      image: '/images/blog-1.jpg'
    },
    {
      title: 'Symulatory lotu',
      excerpt: 'Dowiedz się więcej o symulatorach lotu i ich zaletach.',
      date: '2023-04-02',
      image: '/images/blog-2.jpg'
    },
    {
      title: 'Historia lotnictwa',
      excerpt: 'Poznaj fascynującą historię lotnictwa od początku do dziś.',
      date: '2023-04-03',
      image: '/images/blog-3.jpg'
    }
  ];

  return (
    <BlogSection data-scroll-section>
      <Title
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Blog
      </Title>
      <BlogGrid>
        {posts.map((post, index) => (
          <BlogCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <BlogImage>
              <img src={post.image} alt={post.title} />
            </BlogImage>
            <BlogContent>
              <BlogTitle>{post.title}</BlogTitle>
              <BlogExcerpt>{post.excerpt}</BlogExcerpt>
              <BlogDate>{post.date}</BlogDate>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogSection>
  );
};

export default Blog; 