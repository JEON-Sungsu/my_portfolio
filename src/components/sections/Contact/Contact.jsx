import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'

const ContactSection = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.gray};
  scroll-margin-top: ${({ theme }) => theme.spacing.xxl};
`

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  border: 2px solid ${({ theme }) => theme.colors.grayDark};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: border-color ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Textarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  border: 2px solid ${({ theme }) => theme.colors.grayDark};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  min-height: 150px;
  resize: vertical;
  font-family: inherit;
  transition: border-color ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color ${({ theme }) => theme.transition.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: transform ${({ theme }) => theme.transition.fast};

  &:hover {
    transform: translateX(8px);
  }
`

const Icon = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  color: ${({ theme }) => theme.colors.primary};
`

const InfoLink = styled.a`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.text};
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: 폼 제출 로직 구현 (EmailJS, Formspree 등)
    console.log('Form submitted:', formData)
    alert('메시지가 전송되었습니다!')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <ContactSection id="contact">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </SectionTitle>

        <ContactContainer>
          <Form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Input
              type="text"
              name="name"
              placeholder="이름"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="메시지"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <SubmitButton type="submit">보내기</SubmitButton>
          </Form>

          <ContactInfo
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <InfoItem>
              <Icon>
                <FaEnvelope />
              </Icon>
              <InfoLink href="mailto:your@email.com">your@email.com</InfoLink>
            </InfoItem>
            <InfoItem>
              <Icon>
                <FaGithub />
              </Icon>
              <InfoLink
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/yourusername
              </InfoLink>
            </InfoItem>
            <InfoItem>
              <Icon>
                <FaLinkedin />
              </Icon>
              <InfoLink
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/yourusername
              </InfoLink>
            </InfoItem>
          </ContactInfo>
        </ContactContainer>
      </Container>
    </ContactSection>
  )
}

export default Contact
