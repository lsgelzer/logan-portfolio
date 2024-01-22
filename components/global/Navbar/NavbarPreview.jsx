'use client'

import { useSettings } from '../../../sanity/loader/useQuery'
import NavbarLayout from './NavbarLayout'

export default function NavbarPreview(props) {
  const { data } = useSettings(props.initial)

  return <NavbarLayout data={data} />
}
