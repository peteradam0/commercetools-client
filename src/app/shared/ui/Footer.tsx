'use client'

import { PrimaryButton } from '@commercetools-frontend/ui-kit'
import FlatButton from '@commercetools-uikit/flat-button'
import Spacings from '@commercetools-uikit/spacings'
import Text from '@commercetools-uikit/text'
import React from 'react'

export default function Footer() {
  const customerServiceLinks = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'FAQ', href: '/faq' },
  ]

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Sustainability', href: '/sustainability' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ]

  return (
    <footer className='bg-gray-50 border-t border-gray-200'>
      <div className='max-w-screen-xl mx-auto px-4 pt-12 pb-6'>
        <Spacings.Stack scale='xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr'>
            <Spacings.Stack scale='m'>
              <Text.Headline as='h3'>Logo</Text.Headline>
              <Text.Body>
                Your trusted clothing destination. Quality fashion for everyone.
              </Text.Body>
            </Spacings.Stack>

            <Spacings.Stack scale='s'>
              <Text.Subheadline as='h4'>Customer Service</Text.Subheadline>
              <Spacings.Stack scale='xs'>
                {customerServiceLinks.map(link => (
                  <FlatButton
                    key={link.name}
                    as='a'
                    href={link.href}
                    label={link.name}
                    tone='secondary'
                  />
                ))}
              </Spacings.Stack>
            </Spacings.Stack>

            <Spacings.Stack scale='s'>
              <Text.Subheadline as='h4'>Company</Text.Subheadline>
              <Spacings.Stack scale='xs'>
                {companyLinks.map(link => (
                  <FlatButton
                    key={link.name}
                    as='a'
                    href={link.href}
                    label={link.name}
                    tone='secondary'
                  />
                ))}
              </Spacings.Stack>
            </Spacings.Stack>

            <Spacings.Stack scale='s'>
              <Text.Subheadline as='h4'>Stay Updated</Text.Subheadline>
              <Text.Body>
                Subscribe to get updates on new arrivals and exclusive offers.
              </Text.Body>
              <Spacings.Stack scale='xs'>
                <div className='flex gap-2'>
                  <input
                    type='email'
                    placeholder='Enter your email'
                    className='flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent'
                  />
                  <>
                    <PrimaryButton label={'Subscribe'} tone='primary' />
                  </>
                </div>
              </Spacings.Stack>
            </Spacings.Stack>
          </div>

          <div className='border-t border-gray-200 pt-6'>
            <Spacings.Stack scale='m'>
              <div className='flex flex-wrap gap-4 justify-center items-center'>
                {legalLinks.map((link, index) => (
                  <React.Fragment key={link.name}>
                    <FlatButton
                      as='a'
                      href={link.href}
                      label={link.name}
                      tone='secondary'
                      size='small'
                    />
                    {index < legalLinks.length - 1 && (
                      <span className='text-gray-400'>•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className='text-center'>
                <Text.Detail tone='secondary'>
                  © 2025 All rights reserved.
                </Text.Detail>
              </div>
            </Spacings.Stack>
          </div>
        </Spacings.Stack>
      </div>
    </footer>
  )
}
