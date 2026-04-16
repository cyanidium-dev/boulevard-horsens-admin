import {TextInput} from '@sanity/ui'
import {set, type StringInputProps, unset} from 'sanity'

export function TimeInput(props: StringInputProps) {
  const {elementProps, onChange, value} = props

  return (
    <TextInput
      {...elementProps}
      type="time"
      step={60}
      value={typeof value === 'string' ? value : ''}
      onChange={(event) => {
        const nextValue = event.currentTarget.value
        onChange(nextValue ? set(nextValue) : unset())
      }}
    />
  )
}
