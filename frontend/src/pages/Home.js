import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
`;

const HeroSection = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  margin: 0;
  padding: 0;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')
      center/cover no-repeat;
    opacity: 0.2;
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 40px;
  opacity: 0.9;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
`;

const Button = styled(Link)`
  background: #ff4081;
  color: white;
  padding: 15px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 64, 129, 0.4);

  &:hover {
    background: #f50057;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 64, 129, 0.6);
    color: white;
    text-decoration: none;
  }
`;

const Section = styled.section`
  padding: 100px 20px;
  text-align: center;
  position: relative;
  width: 100%;
  margin: 0;
  background: ${props => (props.gray ? '#f5f5f5' : 'white')};
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #1a237e;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background: #ff4081;
    margin: 15px auto 0;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 60px;
  color: #555;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const PricingCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: ${props => props.color || '#1a237e'};
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Price = styled.div`
  font-size: 3rem;
  color: #1a237e;
  margin: 20px 0;
  font-weight: 700;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 30px;
  text-align: left;

  li {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;

    &:before {
      content: '✓';
      color: #ff4081;
      margin-right: 10px;
      font-weight: bold;
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const BlogCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 20px;
`;

const BlogTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #1a237e;
`;

const BlogExcerpt = styled.p`
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Fly Web</HeroTitle>
          <HeroSubtitle>Profesjonalne treningi i zajęcia dla skoczków spadochronowych</HeroSubtitle>
          <Button to="/visualization">Zobacz wizualizację</Button>
        </HeroContent>
      </HeroSection>

      <Section id="about">
        <SectionTitle>O Nas</SectionTitle>
        <SectionSubtitle>
          Jesteśmy zespołem doświadczonych instruktorów i pasjonatów skoków spadochronowych. Nasza
          misja to dzielenie się wiedzą i doświadczeniem z każdym, kto chce rozwijać się w tej
          dziedzinie.
        </SectionSubtitle>
        <div className="row">
          <div className="col-md-4">
            <div className="info">
              <div className="icon icon-primary">
                <i className="nc-icon nc-air-baloon"></i>
              </div>
              <div className="description">
                <h4 className="info-title">Doświadczenie</h4>
                <p>
                  Ponad 10 lat doświadczenia w szkoleniu skoczków spadochronowych na różnych
                  poziomach zaawansowania.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <div className="icon icon-success">
                <i className="nc-icon nc-badge"></i>
              </div>
              <div className="description">
                <h4 className="info-title">Certyfikacje</h4>
                <p>
                  Wszyscy nasi instruktorzy posiadają międzynarodowe certyfikacje i regularnie
                  uczestniczą w szkoleniach.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info">
              <div className="icon icon-danger">
                <i className="nc-icon nc-satisfied"></i>
              </div>
              <div className="description">
                <h4 className="info-title">Pasja</h4>
                <p>Kochamy to, co robimy i zarażamy naszą pasją każdego, kto do nas dołącza.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="pricing" className="section-gray">
        <SectionTitle>Cennik</SectionTitle>
        <SectionSubtitle>
          Wybierz pakiet dopasowany do Twoich potrzeb i rozpocznij swoją przygodę ze skokami
          spadochronowymi
        </SectionSubtitle>
        <PricingGrid>
          <PricingCard color="#1a237e">
            <h3>Pakiet Basic</h3>
            <Price>700 zł</Price>
            <FeatureList>
              <li>4 treningi w miesiącu</li>
              <li>Podstawowe techniki</li>
              <li>Wsparcie online</li>
              <li>Dostęp do materiałów szkoleniowych</li>
              <li>Ubezpieczenie podczas treningów</li>
            </FeatureList>
            <Button to="/contact">Wybierz pakiet</Button>
          </PricingCard>

          <PricingCard color="#ff4081">
            <h3>Pakiet Pro</h3>
            <Price>900 zł</Price>
            <FeatureList>
              <li>8 treningów w miesiącu</li>
              <li>Zaawansowane techniki</li>
              <li>Priorytetowe wsparcie</li>
              <li>Dostęp do materiałów premium</li>
              <li>Ubezpieczenie podczas treningów</li>
              <li>Analiza wideo skoków</li>
            </FeatureList>
            <Button to="/contact">Wybierz pakiet</Button>
          </PricingCard>

          <PricingCard color="#00bcd4">
            <h3>Pakiet Indywidualny</h3>
            <Price>Cena indywidualna</Price>
            <FeatureList>
              <li>Dostosowany program</li>
              <li>Elastyczny harmonogram</li>
              <li>Maksymalne wsparcie</li>
              <li>Wszystkie materiały szkoleniowe</li>
              <li>Ubezpieczenie podczas treningów</li>
              <li>Analiza wideo skoków</li>
              <li>Konsultacje indywidualne</li>
            </FeatureList>
            <Button to="/contact">Kontakt</Button>
          </PricingCard>
        </PricingGrid>
      </Section>

      <Section id="blog">
        <SectionTitle>Blog</SectionTitle>
        <SectionSubtitle>
          Artykuły, porady i inspiracje dla skoczków spadochronowych na każdym poziomie
          zaawansowania
        </SectionSubtitle>
        <BlogGrid>
          <BlogCard>
            <BlogImage
              src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Blog post"
            />
            <BlogContent>
              <BlogTitle>Podstawy skoków spadochronowych</BlogTitle>
              <BlogExcerpt>
                Poznaj podstawowe techniki i zasady bezpieczeństwa, które powinien znać każdy
                początkujący skoczek spadochronowy.
              </BlogExcerpt>
              <Button to="/blog/1">Czytaj więcej</Button>
            </BlogContent>
          </BlogCard>

          <BlogCard>
            <BlogImage
              src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Blog post"
            />
            <BlogContent>
              <BlogTitle>Zaawansowane techniki</BlogTitle>
              <BlogExcerpt>
                Jak zostać profesjonalnym skoczkiem? Poznaj zaawansowane techniki, które pomogą Ci
                osiągnąć kolejny poziom.
              </BlogExcerpt>
              <Button to="/blog/2">Czytaj więcej</Button>
            </BlogContent>
          </BlogCard>

          <BlogCard>
            <BlogImage
              src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Blog post"
            />
            <BlogContent>
              <BlogTitle>Bezpieczeństwo w powietrzu</BlogTitle>
              <BlogExcerpt>
                Najważniejsze zasady bezpieczeństwa, które powinien znać każdy skoczek
                spadochronowy, niezależnie od poziomu zaawansowania.
              </BlogExcerpt>
              <Button to="/blog/3">Czytaj więcej</Button>
            </BlogContent>
          </BlogCard>
        </BlogGrid>
      </Section>
    </HomeContainer>
  );
};

export default Home;
