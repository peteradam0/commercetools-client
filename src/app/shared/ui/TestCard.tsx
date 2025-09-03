'use client'

import Card from '@commercetools-uikit/card'
import Grid from '@commercetools-uikit/grid'
import { ExportIcon } from '@commercetools-uikit/icons'
import PrimaryButton from '@commercetools-uikit/primary-button'

export default function MyComponent() {
  return (
    <Card theme='light' type='raised'>
      <Grid>
        <PrimaryButton
          label='Export Data'
          iconLeft={<ExportIcon />}
        />
      </Grid>
    </Card>
  )
}
