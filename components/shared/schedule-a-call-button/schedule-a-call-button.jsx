import Link from 'next/link'
const ScheduleACallButton = () => {
  return (
    <Link
      className=" opacity-0 animate-fade-in bg-green-500 text-white px-6 py-2 rounded-full "
      href="/contact"
    >
      Schedule a Call
    </Link>
  )
}
export default ScheduleACallButton
