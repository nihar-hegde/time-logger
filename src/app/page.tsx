import Calender from '@/components/Calender'
import Navbar from '@/components/Navbar'
import { NewLog } from '@/components/NewLog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div className='p-5 space-y-10'>
        <Navbar/>
        <NewLog/>
        <Calender/>
      </div>
    </main>
  )
}
