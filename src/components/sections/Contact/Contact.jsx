import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const ContactSection = styled.section`
  width: 100%;
  min-height: 60vh;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  background-color: #1a1a1a;
  scroll-margin-top: ${({ theme }) => theme.spacing.xxl};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
`

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
`

const SocialIcon = styled.a`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  color: ${({ theme }) => theme.colors.white};
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.gradientStart};
    transform: translateY(-4px);
  }
`

function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <ContactSection id="contact">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionTitle variants={itemVariants}>
            Contact
          </SectionTitle>

          <SocialLinks variants={itemVariants}>
            <SocialIcon
              href="https://github.com/JEON-Sungsu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="https://github.com/JEON-Sungsu"
            >
              <FaGithub />
            </SocialIcon>
            <SocialIcon
              href="https://www.linkedin.com/in/sungsu-jeon-9abb45201/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="https://www.linkedin.com/in/sungsu-jeon-9abb45201/"
            >
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon
              href="mailto:anagma@naver.com"
              aria-label="Email"
              title="anagma@naver.com"
            >
              <FaEnvelope />
            </SocialIcon>
          </SocialLinks>
        </motion.div>
      </Container>
    </ContactSection>
  )
}

export default Contact
