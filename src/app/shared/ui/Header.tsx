'use client'

import FlatButton from '@commercetools-uikit/flat-button'
import IconButton from '@commercetools-uikit/icon-button'
import {
  AngleLeftIcon,
  CartIcon,
  CloseIcon,
  SearchIcon,
  StackIcon,
  UserFilledIcon,
} from '@commercetools-uikit/icons'
import Spacings from '@commercetools-uikit/spacings'
import Text from '@commercetools-uikit/text'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const DesktopNavigationElements = styled.div`
  display: flex;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`

const ButtonWrapper = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isActive',
})<{ isActive?: boolean }>`
  ${({ isActive }) =>
    isActive &&
    `
      & > button {
        background-color: #f0f0f0 !important;
        font-weight: bold !important;
        border-bottom: 2px solid #007acc !important;
      }
    `}
`

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = React.useState<string>('')
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const menCategories = ['T-Shirts', 'Shirts', 'Pants']
  const womenCategories = ['T-Shirts', 'Blouses', 'Dresses']

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCategoryClick = (category: string) => {
    const categoryLower = category.toLowerCase()
    router.push(`/en-US/products?category=${categoryLower}`)
  }

  const isActiveCategory = (category: string) => {
    if (!mounted) return false
    const categoryParam = searchParams.get('category')
    return categoryParam === category.toLowerCase()
  }

  return (
    <header className='bg-white border-b-2 mt-0 mb-auto'>
      <div className='max-w-full mx-36'>
        <Spacings.Inline
          justifyContent='space-between'
          alignItems='center'
          scale='m'
        >
          <Link href={'/en-US/home'}>
            <Text.Headline as='h1'>Logo</Text.Headline>
          </Link>
          <div className='md:block'>
            <Spacings.Inline scale='xxl'>
              <ButtonWrapper isActive={isActiveCategory('women')}>
                <FlatButton
                  as='button'
                  label='WOMEN'
                  onClick={() => handleCategoryClick('WOMEN')}
                />
              </ButtonWrapper>
              <ButtonWrapper isActive={isActiveCategory('men')}>
                <FlatButton
                  as='button'
                  label='MEN'
                  onClick={() => handleCategoryClick('MEN')}
                />
              </ButtonWrapper>
              <ButtonWrapper isActive={isActiveCategory('kids')}>
                <FlatButton
                  as='button'
                  label='KIDS'
                  onClick={() => handleCategoryClick('KIDS')}
                />
              </ButtonWrapper>
              <ButtonWrapper isActive={isActiveCategory('baby')}>
                <FlatButton
                  as='button'
                  label='BABY'
                  onClick={() => handleCategoryClick('BABY')}
                />
              </ButtonWrapper>
            </Spacings.Inline>
          </div>

          <Spacings.Inline alignItems='center' scale='s'>
            <DesktopNavigationElements>
              <IconButton
                icon={<SearchIcon />}
                label='Search'
                onClick={() => {}}
              />
              <IconButton
                icon={<UserFilledIcon />}
                label='My Account'
                onClick={() => {}}
              />
            </DesktopNavigationElements>
            <IconButton icon={<CartIcon />} label='Cart' onClick={() => {}} />

            <div>
              <IconButton
                icon={isMenuOpen ? <CloseIcon /> : <StackIcon />}
                label='Menu'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </Spacings.Inline>
        </Spacings.Inline>

        {isMenuOpen && (
          <div className='mt-2 pt-2 border-t-2 bg-white'>
            <Spacings.Stack scale='s'>
              <div className='pt-2 pb-3 border-t-slate-200'>
                <Text.Detail tone='secondary'>Locale: </Text.Detail>
              </div>

              {!activeCategory && (
                <Spacings.Stack scale='xs'>
                  <FlatButton
                    label='Men'
                    onClick={() => setActiveCategory('men')}
                  />
                  <FlatButton
                    label='Women'
                    onClick={() => setActiveCategory('women')}
                  />
                </Spacings.Stack>
              )}

              {activeCategory && (
                <Spacings.Stack scale='xs'>
                  <Spacings.Inline alignItems='center' scale='xs'>
                    <IconButton
                      icon={<AngleLeftIcon />}
                      label='Back'
                      onClick={() => setActiveCategory('')}
                      size='small'
                    />
                    <Text.Subheadline as='h4'>
                      {activeCategory}
                    </Text.Subheadline>
                  </Spacings.Inline>

                  <Spacings.Stack scale='xs'>
                    {(activeCategory === 'men'
                      ? menCategories
                      : womenCategories
                    ).map(category => (
                      <FlatButton
                        key={category}
                        as='a'
                        href={`/${activeCategory}/${category
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`}
                        label={category}
                      />
                    ))}
                  </Spacings.Stack>
                </Spacings.Stack>
              )}
            </Spacings.Stack>
          </div>
        )}
      </div>
    </header>
  )
}
