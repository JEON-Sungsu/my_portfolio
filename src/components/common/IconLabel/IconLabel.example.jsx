import React from 'react'
import styled from 'styled-components'
import IconLabel, { icons } from './IconLabel'

const ExampleContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  flex-wrap: wrap;
`

// 사용 예시 1: 개별 아이콘 사용
function Example1() {
  return (
    <ExampleContainer>
      <IconLabel iconPath="/assets/icons/ic_mobile.svg" label="Mobile" />
      <IconLabel iconPath="/assets/icons/ic_tablet.svg" label="Tablet" />
      <IconLabel iconPath="/assets/icons/ic_laptop.svg" label="Laptop" />
    </ExampleContainer>
  )
}

// 사용 예시 2: icons 객체 사용
function Example2() {
  return (
    <ExampleContainer>
      {Object.entries(icons).map(([key, { path, label }]) => (
        <IconLabel key={key} iconPath={path} label={label} />
      ))}
    </ExampleContainer>
  )
}

// 사용 예시 3: 사이즈 조절 및 클릭 이벤트
function Example3() {
  const handleClick = (label) => {
    console.log(`${label} clicked!`)
  }

  return (
    <ExampleContainer>
      <IconLabel
        iconPath={icons.mobile.path}
        label={icons.mobile.label}
        size="80px"
        onClick={() => handleClick('Mobile')}
      />
      <IconLabel
        iconPath={icons.codeBlock.path}
        label={icons.codeBlock.label}
        size="100px"
        onClick={() => handleClick('Code Block')}
      />
    </ExampleContainer>
  )
}

export { Example1, Example2, Example3 }
