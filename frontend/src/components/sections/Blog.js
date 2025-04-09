import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Section = styled.section`
  min-height: ${props => props.fullPage ? '100vh' : 'auto'};
  padding: ${props => props.fullPage ? '120px 20px' : '80px 20px'};
  background: var(--primary);
  color: var(--text);
  position: relative;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: 4rem;
  margin-bottom: 4rem;
  text-align: left;
  font-weight: 700;
  background: linear-gradient(45deg, var(--accent), #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.fullPage ? 'repeat(auto-fit, minmax(400px, 1fr))' : 'repeat(2, 1fr)'};
  gap: ${props => props.fullPage ? '4rem' : '2rem'};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.article)`
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  height: ${props => props.fullPage ? '500px' : '300px'};
  
  &:hover {
    .card-image {
      transform: scale(1.05);
    }
    
    .card-content {
      background: rgba(0, 0, 0, 0.9);
    }
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => `url(${props.src}) center/cover no-repeat`};
  transition: transform 0.5s ease;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${props => props.fullPage ? '3rem' : '2rem'};
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  transition: background 0.3s ease;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CardCategory = styled.span`
  font-size: 0.9rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CardDate = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`;

const CardTitle = styled.h3`
  font-size: ${props => props.fullPage ? '2rem' : '1.5rem'};
  font-weight: 700;
  margin-bottom: 1rem;
  color: #fff;
`;

const CardText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  max-width: ${props => props.fullPage ? '80%' : '100%'};
  display: ${props => props.fullPage ? 'block' : '-webkit-box'};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background: var(--accent);
  color: var(--primary);
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  margin-top: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  }
`;

const Blog = ({ fullPage = false }) => {
  const posts = [
    {
      title: 'Jak zacząć przygodę z indoor skydiving?',
      text: 'Poznaj podstawowe kroki, które pomogą Ci rozpocząć przygodę z lataniem w tunelu aerodynamicznym. Od pierwszej wizyty do samodzielnych lotów.',
      date: '2024-04-09',
      category: 'Poradnik',
      image: 'https://images.unsplash.com/photo-1599251037554-8a01d0ca0137?q=80'
    },
    {
      title: 'Techniki latania dla zaawansowanych',
      text: 'Zaawansowane techniki i triki, które pomogą Ci osiągnąć wyższy poziom w indoor skydiving. Poznaj sekrety profesjonalistów.',
      date: '2024-04-08',
      category: 'Technika',
      image: 'https://images.unsplash.com/photo-1578774296842-c45e472b3028?q=80'
    },
    {
      title: 'Bezpieczeństwo w tunelu aerodynamicznym',
      text: 'Wszystko co musisz wiedzieć o bezpieczeństwie podczas latania w tunelu. Procedury, sprzęt i najważniejsze zasady.',
      date: '2024-04-07',
      category: 'Bezpieczeństwo',
      image: 'https://images.unsplash.com/photo-1600679472829-3044539ce8ed?q=80'
    }
  ];

  const displayPosts = fullPage ? posts : posts.slice(0, 2);

  return (
    <Section id="blog" fullPage={fullPage}>
      <Container>
        <Title
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {fullPage ? 'Blog' : 'Z naszego bloga'}
        </Title>
        <Grid fullPage={fullPage}>
          {displayPosts.map((post, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              fullPage={fullPage}
            >
              <CardImage src={post.image} className="card-image" />
              <CardContent className="card-content" fullPage={fullPage}>
                <CardMeta>
                  <CardCategory>{post.category}</CardCategory>
                  <CardDate>{new Date(post.date).toLocaleDateString('pl-PL')}</CardDate>
                </CardMeta>
                <CardTitle fullPage={fullPage}>{post.title}</CardTitle>
                <CardText fullPage={fullPage}>{post.text}</CardText>
                {!fullPage && <Button to="/blog">Czytaj więcej</Button>}
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Blog; 