import { ArrowRightIcon } from '@sanity/icons'
import { Box, Flex, Text } from '@sanity/ui'
import { useCallback, useMemo } from 'react'
import { FieldMember, MemberField } from 'sanity'

export function DurationInput(props) {
  const { members, renderInput, renderItem, renderPreview } = props

  const fieldMembers = useMemo(
    () => members.filter((mem) => mem.kind === 'field'),
    [members],
  )

  const start = fieldMembers.find((mem) => mem.name === 'start')
  const end = fieldMembers.find((mem) => mem.name === 'end')

  const renderField = useCallback((props) => props.children, [])

  const renderProps = useMemo(
    () => ({ renderField, renderInput, renderItem, renderPreview }),
    [renderField, renderInput, renderItem, renderPreview],
  )

  return (
    <Flex align="center" gap={3}>
      <Box flex={1}>
        {start && <MemberField {...renderProps} member={start} />}
      </Box>
      <Box>
        <Text muted>
          <ArrowRightIcon />
        </Text>
      </Box>
      <Box flex={1}>{end && <MemberField {...renderProps} member={end} />}</Box>
    </Flex>
  )
}
