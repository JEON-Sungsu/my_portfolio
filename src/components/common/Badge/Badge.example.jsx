import React from 'react'
import styled from 'styled-components'
import Badge from './Badge'

const ExampleContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xxl};
  flex-wrap: wrap;
  background-color: #0a0a0a;
`

// 사용 예시 1: 기본 사용
function Example1() {
  return (
    <ExampleContainer>
      <Badge>Devices</Badge>
      <Badge>Mobile App</Badge>
      <Badge>Web Platform</Badge>
    </ExampleContainer>
  )
}

// 사용 예시 2: 프로젝트 카테고리
function Example2() {
  const categories = [
    'Company Project',
    'Personal Project',
    'Open Source',
    'Freelance',
  ]

  return (
    <ExampleContainer>
      {categories.map((category) => (
        <Badge key={category}>{category}</Badge>
      ))}
    </ExampleContainer>
  )
}

// 사용 예시 3: 프로젝트 타입
function Example3() {
  const types = ['Mobile', 'Web', 'Desktop', 'Full Stack', 'Frontend', 'Backend']

  return (
    <ExampleContainer>
      {types.map((type) => (
        <Badge key={type}>{type}</Badge>
      ))}
    </ExampleContainer>
  )
}

export { Example1, Example2, Example3 }
