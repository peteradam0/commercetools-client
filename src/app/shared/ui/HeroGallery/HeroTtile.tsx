import styled from 'styled-components'

export const HeroTitle = styled.div`
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: 0.05em;

    @media (min-width: 768px) {
      font-size: 4rem;
    }

    @media (min-width: 1024px) {
      font-size: 5rem;
    }
  }
`

export const HeroSubtitle = styled.div`
  h2 {
    font-size: 1.125rem;
    max-width: 42rem;
    margin: 0 auto;

    @media (min-width: 768px) {
      font-size: 1.25rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.5rem;
    }
  }
`
