import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

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

const Description = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Email = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.gradientStart};
  }
`

const EmailIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
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

          <Description variants={itemVariants}>
            Seasoned Full Stack Software Engineer with over 8 years of hands-on experience in designing
            and implementing robust, scalable, and innovative web solutions. Adept at leveraging a
            comprehensive skill set encompassing front-end and back-end technologies.
          </Description>

          <Email
            href="mailto:abmcodehub@gmail.com"
            variants={itemVariants}
          >
            <EmailIcon>✉</EmailIcon>
            abmcodehub@gmail.com
          </Email>

          <SocialLinks variants={itemVariants}>
            <SocialIcon
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </SocialIcon>
            <SocialIcon
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </SocialIcon>
            <SocialIcon
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </SocialIcon>
          </SocialLinks>
        </motion.div>
      </Container>
    </ContactSection>
  )
}

export default Contact
